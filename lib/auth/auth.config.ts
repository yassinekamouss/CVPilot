import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin";
import { APP_ROUTES, AUTH_ROUTES, DEFAULT_LOGIN_REDIRECT } from "@/constants";

/**
 * Shared Auth.js configuration.
 * Contains providers and logic that works in the Edge runtime (middleware).
 *
 * NOTE: The `signIn` conflict-detection callback is NOT here — it requires
 * Prisma (Node.js runtime). It lives in lib/auth/callbacks.ts instead,
 * which is only loaded by the full NextAuth instance in lib/auth/auth.ts.
 */
export const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    LinkedIn({
      clientId: process.env.AUTH_LINKEDIN_ID,
      clientSecret: process.env.AUTH_LINKEDIN_SECRET,
    }),
  ],
  pages: {
    // All auth errors redirect to /login where we render contextual messages
    signIn: APP_ROUTES.login,
    error: APP_ROUTES.login,
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (isAuthRoute) {
        if (isLoggedIn) {
          return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return true;
      }

      if (isOnDashboard && !isLoggedIn) {
        return false; // Redirected to signIn page by NextAuth
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
