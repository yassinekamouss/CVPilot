import type { ReactNode } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { notFound, redirect } from "next/navigation";

import { APP_ROUTES, AUTH_PROVIDER_BUTTON_CLASSES, AUTH_PROVIDER_LABELS, AUTH_PROVIDERS } from "@/constants";
import { auth, signIn } from "@/lib/auth/auth";
import prisma from "@/lib/db";
import { AuthError } from "next-auth";
import type { AuthProvider, SettingsSearchParams } from "@/types";
import LanguageSwitcher from "@/components/shared/language-switcher";

// ─── Provider display metadata ────────────────────────────────────────────────
const PROVIDER_META = {
  google: {
    label: AUTH_PROVIDER_LABELS.google,
    connectBtnClass: AUTH_PROVIDER_BUTTON_CLASSES.google,
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
      </svg>
    ),
  },
  linkedin: {
    label: AUTH_PROVIDER_LABELS.linkedin,
    connectBtnClass: AUTH_PROVIDER_BUTTON_CLASSES.linkedin,
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
} satisfies Record<AuthProvider, { label: string; connectBtnClass: string; icon: ReactNode }>;

const SUPPORTED_PROVIDERS = AUTH_PROVIDERS;

interface SettingsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SettingsSearchParams>;
}

export default async function SettingsPage({ params, searchParams }: SettingsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Settings");

  const session = await auth();
  if (!session?.user?.id) redirect(`/${locale}${APP_ROUTES.login}`);

  const resolvedSearchParams = await searchParams;
  const { error, status } = resolvedSearchParams;

  // Resolve status/error message using next-intl
  let statusMessage: { text: string; type: "error" | "success" } | null = null;
  if (error === "AccountAlreadyLinked") {
    statusMessage = {
      text: t("messages.AccountAlreadyLinked"),
      type: "error",
    };
  } else if (status === "already-connected") {
    statusMessage = {
      text: t("messages.alreadyConnected"),
      type: "success",
    };
  } else if (status === "linked") {
    statusMessage = {
      text: t("messages.linked"),
      type: "success",
    };
  }

  // Fetch the list of providers already linked to this user
  const linkedAccounts = await prisma.account.findMany({
    where: { userId: session.user.id },
    select: { provider: true },
  });
  const linkedProviders = new Set(linkedAccounts.map((a) => a.provider));

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-8 dark:text-white relative">
      {/* Language switcher & Back navigation */}
      <div className="flex items-center justify-between">
        <Link
          href={APP_ROUTES.dashboard}
          className="text-sm font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
        >
          ← Back to Dashboard
        </Link>
        <LanguageSwitcher />
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          {t("title")}
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          {t("subtitle")}
        </p>
      </div>

      {/* Status / Error banner */}
      {statusMessage && (
        <div
          role="alert"
          className={`flex gap-3 rounded-xl border p-4 text-sm ${
            statusMessage.type === "error"
              ? "border-red-200 bg-red-50 text-red-700 dark:border-red-800/60 dark:bg-red-950/30 dark:text-red-300"
              : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800/60 dark:bg-emerald-950/30 dark:text-emerald-300"
          }`}
        >
          <svg
            className="mt-0.5 h-4 w-4 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            {statusMessage.type === "error" ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.008v.008H12v-.008z" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            )}
          </svg>
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Connected Accounts card */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-100 dark:divide-zinc-800 shadow-sm">
        <div className="px-6 py-4">
          <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
            {t("signinMethods")}
          </h2>
        </div>

        {SUPPORTED_PROVIDERS.map((providerKey) => {
          const meta = PROVIDER_META[providerKey];
          const isConnected = linkedProviders.has(providerKey);

          return (
            <div
              key={providerKey}
              className="flex items-center justify-between px-6 py-4 gap-4"
            >
              {/* Provider identity */}
              <div className="flex items-center gap-3">
                {meta.icon}
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">
                    {meta.label}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {isConnected ? t("connected") : t("notConnected")}
                  </p>
                </div>
              </div>

              {/* Connect / Connected badge */}
              {isConnected ? (
                <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t("connected")}
                </span>
              ) : (
                <form
                  action={async () => {
                    "use server";
                    try {
                      await signIn(providerKey, {
                        redirectTo: `/${locale}${APP_ROUTES.dashboardSettings}?status=linked`,
                      });
                    } catch (err) {
                      if (err instanceof AuthError) throw err;
                      throw err;
                    }
                  }}
                >
                  <button
                    id={`btn-connect-${providerKey}`}
                    type="submit"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all active:scale-[0.97] cursor-pointer shadow-sm ${meta.connectBtnClass}`}
                  >
                    {t("connect", { provider: meta.label })}
                  </button>
                </form>
              )}
            </div>
          );
        })}
      </div>

      {/* Info note */}
      <p className="text-xs text-zinc-400 dark:text-zinc-600 text-center leading-relaxed">
        {t("infoNote")}
      </p>
    </div>
  );
}
