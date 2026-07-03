import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth/auth";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";

import { APP_ROUTES, AUTH_PROVIDER_LABELS, DEFAULT_AUTH_PROVIDER } from "@/constants";
import type { LoginSearchParams } from "@/types";
import LanguageSwitcher from "@/components/shared/language-switcher";

interface LoginPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<LoginSearchParams>;
}

export default async function LoginPage({ params, searchParams }: LoginPageProps) {
  const { locale } = await params;
  
  // Set request locale for static rendering optimization
  setRequestLocale(locale);

  const t = await getTranslations("Login");
  
  const resolvedSearchParams = await searchParams;
  const { error, existingProvider } = resolvedSearchParams;

  // Resolve localized messages using next-intl
  let errorMessage: string | null = null;
  if (error) {
    if (error === "AccountConflict") {
      const providerLabel =
        (existingProvider &&
          AUTH_PROVIDER_LABELS[existingProvider as keyof typeof AUTH_PROVIDER_LABELS]) ??
        existingProvider ??
        "another provider";
      errorMessage = t("errors.conflict", { provider: providerLabel });
    } else {
      const translationKey = `errors.${error}` as const;
      // Use fallback error message if the specific key doesn't exist
      errorMessage = t.has(translationKey)
        ? t(translationKey)
        : t("errors.default");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-zinc-950 px-4 py-8 relative">
      {/* Language Switcher in top right corner */}
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-sm space-y-6">
        {/* Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {t("title")}
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {t("subtitle")}
            </p>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div
              role="alert"
              className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-800/60 dark:bg-amber-950/30 p-4 text-sm text-amber-800 dark:text-amber-300"
            >
              {/* Icon */}
              <svg
                className="mt-0.5 h-4 w-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
              <span className="leading-relaxed">{errorMessage}</span>
            </div>
          )}

          {/* Sign-in buttons */}
          <div className="space-y-3">
            {/* Google */}
            <form
              action={async () => {
                "use server";
                try {
                  await signIn(DEFAULT_AUTH_PROVIDER, { redirectTo: `/${locale}${APP_ROUTES.dashboard}` });
                } catch (err) {
                  if (err instanceof AuthError) throw err;
                  throw err;
                }
              }}
            >
              <button
                id="btn-sign-in-google"
                type="submit"
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-750 text-zinc-800 dark:text-zinc-100 font-medium text-sm transition-all active:scale-[0.98] cursor-pointer shadow-sm"
              >
                {/* Google SVG */}
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                {t("google")}
              </button>
            </form>

            {/* LinkedIn */}
            <form
              action={async () => {
                "use server";
                try {
                  // Redirect to localized dashboard URL
                  await signIn("linkedin", { redirectTo: `/${locale}${APP_ROUTES.dashboard}` });
                } catch (err) {
                  if (err instanceof AuthError) throw err;
                  throw err;
                }
              }}
            >
              <button
                id="btn-sign-in-linkedin"
                type="submit"
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-[#0a66c2] hover:bg-[#004182] text-white font-medium text-sm transition-all active:scale-[0.98] cursor-pointer shadow-sm"
              >
                {/* LinkedIn SVG */}
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                {t("linkedin")}
              </button>
            </form>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-zinc-400 dark:text-zinc-600 leading-relaxed">
            {t("footerNote")}
          </p>
        </div>

        {/* Back Link to Landing */}
        <div className="text-center">
          <Link
            href="/"
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            ← {t("errors.Verification") ? t("title") : "Go back"}
          </Link>
        </div>
      </div>
    </div>
  );
}
