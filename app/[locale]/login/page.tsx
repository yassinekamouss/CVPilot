import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth/auth";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Image from "next/image";

import {
  APP_ROUTES,
  AUTH_PROVIDER_LABELS,
  DEFAULT_AUTH_PROVIDER,
} from "@/constants";
import type { LoginSearchParams } from "@/types";
import LoginVisualWrapper from "@/components/auth/login-visual-wrapper";

interface LoginPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<LoginSearchParams>;
}

export default async function LoginPage({
  params,
  searchParams,
}: LoginPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Login");
  const resolvedSearchParams = await searchParams;
  const { error, existingProvider } = resolvedSearchParams;

  let errorMessage: string | null = null;
  if (error) {
    if (error === "AccountConflict") {
      const providerLabel =
        (existingProvider &&
          AUTH_PROVIDER_LABELS[
            existingProvider as keyof typeof AUTH_PROVIDER_LABELS
          ]) ??
        existingProvider ??
        "another provider";
      errorMessage = t("errors.conflict", { provider: providerLabel });
    } else {
      const translationKey = `errors.${error}` as const;
      errorMessage = t.has(translationKey)
        ? t(translationKey)
        : t("errors.default");
    }
  }

  return (
    <LoginVisualWrapper>
      <div className="flex flex-col gap-10 ">      
        {/* Header: Logo & Controls */}
        <div className="flex w-full justify-center items-center justify-between animate-stagger-item">
          <Link href="/" className="group">
            <Image
              src="/main_logo.svg"
              alt="PROCV"
              width={240}
              height={99}
              priority
            />
          </Link>
        </div>

        {/* Hero Copy */}
        <div className="space-y-2 animate-stagger-item text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            {t("title")}
          </h1>
          <p className="text-base text-gray-500">
            {t("subtitle")}
          </p>
        </div>

        {/* Error State Alert */}
        {errorMessage && (
          <div
            role="alert"
            className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800 animate-stagger-item"
          >
            <svg
              className="h-5 w-5 shrink-0 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Authentication Providers */}
        <div className="space-y-3 animate-stagger-item">
          <form
            action={async () => {
              "use server";
              try {
                await signIn(DEFAULT_AUTH_PROVIDER, {
                  redirectTo: `/${locale}${APP_ROUTES.dashboard}`,
                });
              } catch (err) {
                if (err instanceof AuthError) throw err;
                throw err;
              }
            }}
          >
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-semibold text-gray-700 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 active:scale-[0.98]"
            >
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

          <form
            action={async () => {
              "use server";
              try {
                await signIn("linkedin", {
                  redirectTo: `/${locale}${APP_ROUTES.dashboard}`,
                });
              } catch (err) {
                if (err instanceof AuthError) throw err;
                throw err;
              }
            }}
          >
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-semibold text-gray-700 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 active:scale-[0.98]"
            >
              <svg className="h-5 w-5 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              {t("linkedin")}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="flex flex-col justify-center items-center w-full h-full gap-6 pt-2 animate-stagger-item">
          <p className="text-smtext-gray-500 leading-relaxed text-center">
            {t("footerNote")}
          </p>

          <div className="flex items-center justify-between border-t border-gray-100 pt-6">
            <Link
              href="/"
              className="group flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
            >
              <svg 
                className="h-4 w-4 transition-transform group-hover:-translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth="2" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to home
            </Link>
          </div>
        </div>

      </div>
    </LoginVisualWrapper>
  );
}