import { type NextAuthConfig } from "next-auth";
import { APP_ROUTES, DEFAULT_AUTH_PROVIDER } from "@/constants";
import prisma from "@/lib/db";

/**
 * Custom callbacks for Auth.js.
 *
 * signIn  — handles all account-linking conflict scenarios (Scenarios 1–6).
 * jwt     — attaches the database user.id to the token on first sign-in.
 * session — exposes user.id from the token to every session read.
 *
 * WARNING: This file runs in Node.js runtime only.
 * Do NOT import it from lib/auth/auth.config.ts (Edge-compatible file).
 */
export const authCallbacks: NextAuthConfig["callbacks"] = {
  /**
   * Runs before NextAuth finalizes a sign-in or account-linking operation.
   *
   * Returns:
   *  - true             → allow the flow to proceed normally
   *  - string (URL)     → abort and redirect the user to that URL
   *  - false            → abort silently (we avoid this; always redirect instead)
   */
  async signIn({ user, account }) {
    // Guard: account must always be present for OAuth flows
    if (!account || !user.email) return false;

    // ─── Detect whether the user has an active session ───────────────────────
    // Lazily imported to avoid a circular dependency (auth.ts → callbacks.ts → auth.ts).
    const { auth } = await import("@/lib/auth/auth");
    const session = await auth();

    // ═════════════════════════════════════════════════════════════════════════
    // PATH A — Active session present → this is an explicit account-linking
    //           request coming from /dashboard/settings (Scenarios 4 & 5).
    //
    // SECURITY: This is the ONLY code path that may write a new Account row
    // to an existing User. It is unreachable from the public /login flow.
    // ═════════════════════════════════════════════════════════════════════════
    if (session?.user?.id) {
      const existingAccount = await prisma.account.findUnique({
        where: {
          provider_providerAccountId: {
            provider: account.provider,
            providerAccountId: account.providerAccountId,
          },
        },
        select: { userId: true },
      });

      if (existingAccount) {
        if (existingAccount.userId === session.user.id) {
          // Scenario 5 — This provider is already linked to the current user.
          // No-op: redirect back to settings with a benign status indicator.
          return `${APP_ROUTES.dashboardSettings}?status=already-connected`;
        }
        // Scenario 4 (blocked) — The provider account belongs to a DIFFERENT user.
        // Abort and surface a clean error; do not write anything.
        return `${APP_ROUTES.dashboardSettings}?error=AccountAlreadyLinked`;
      }

      // Scenario 4 (success) — Provider not yet linked to anyone.
      // NextAuth + PrismaAdapter will write the new Account row using
      // session.user.id as the foreign key. User.email / name / image are
      // NOT touched — the adapter only creates an Account row here.
      return true;
    }

    // ═════════════════════════════════════════════════════════════════════════
    // PATH B — No active session → public sign-in flow from /login
    //           (Scenarios 1, 2, 3, 6).
    // ═════════════════════════════════════════════════════════════════════════

    // Step 1 — Has this exact (provider, providerAccountId) been used before?
    // If yes → Scenario 2 (returning user). NextAuth resolves the existing User
    // directly; no email lookup is needed or performed.
    const providerAccount = await prisma.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider: account.provider,
          providerAccountId: account.providerAccountId,
        },
      },
      select: { userId: true },
    });

    if (providerAccount) {
      // Scenario 2 — Known provider/account pair. Proceed normally.
      return true;
    }

    // Step 2 — Unknown provider account. Check if this email is already
    // registered under a DIFFERENT provider (Scenarios 3 & 6).
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
      select: {
        id: true,
        accounts: {
          select: { provider: true },
          orderBy: { provider: "asc" },
        },
      },
    });

    if (!existingUser) {
      // Scenario 1 — Brand new user. No conflict. Proceed normally.
      // PrismaAdapter will create a new User row + new Account row.
      return true;
    }

    // A User with this email exists, but NOT linked to the current provider.
    // Scenarios 3 & 6 — Email conflict on the public login screen.
    //
    // Determine the first-linked provider to surface in the UI message.
    // We do NOT hardcode "google" — it could be "linkedin" (Scenario 6).
    const existingProvider = existingUser.accounts[0]?.provider ?? DEFAULT_AUTH_PROVIDER;

    // Abort sign-in. Redirect to /login with enough context to render a
    // helpful, provider-aware message. The email is intentionally omitted
    // from the URL to prevent PII leakage into server logs / browser history.
    return `${APP_ROUTES.login}?error=AccountConflict&existingProvider=${existingProvider}`;
  },

  // ─── JWT callback ─────────────────────────────────────────────────────────
  async jwt({ token, user, trigger, session }) {
    // On first sign-in, the `user` object is available from the adapter.
    // Attach the database user.id to the token for all subsequent requests.
    if (user?.id) {
      token.id = user.id;
    }

    // Support client-side session updates (e.g. name change).
    if (trigger === "update" && session?.name) {
      token.name = session.name;
    }

    return token;
  },

  // ─── Session callback ──────────────────────────────────────────────────────
  async session({ session, token }) {
    // Propagate the database user.id from the token to the session object.
    // This ensures session.user.id is available everywhere via auth().
    if (token.id && session.user) {
      session.user.id = token.id as string;
    }

    return session;
  },
};
