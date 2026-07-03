import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { auth } from "@/lib/auth/auth";
import { APP_ROUTES } from "@/constants/routes";
import LanguageSwitcher from "@/components/shared/language-switcher";

interface LandingPageProps {
  params: Promise<{ locale: string }>;
}

export default async function LandingPage({ params }: LandingPageProps) {
  const { locale } = await params;

  // Set request locale for static rendering/caching optimization
  setRequestLocale(locale);

  // Fetch translations for the Landing Page namespace
  const t = await getTranslations("Landing");
  const session = await auth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* ─── HEADER (BUSINESS LOGIC INTEGRATED) ─────────────────────────────────── */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo / Brand */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              CVPilot
            </span>
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />

            {session ? (
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline text-sm text-zinc-500 dark:text-zinc-400">
                  {session.user?.email}
                </span>
                <Link
                  href={APP_ROUTES.dashboard}
                  className="px-4 py-2 text-sm font-semibold text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 rounded-lg transition-all"
                >
                  {t("dashboard")}
                </Link>
              </div>
            ) : (
              <Link
                href={APP_ROUTES.login}
                className="px-4 py-2 text-sm font-semibold text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-all"
              >
                {t("signIn")}
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* ─── MAIN CONTENT (PLACEHOLDERS FOR FRONTEND UI) ────────────────────────── */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 sm:py-32 bg-zinc-50 dark:bg-zinc-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            {/* Title & Subtitle */}
            <div className="max-w-3xl mx-auto space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
                {t("heroTitle")}
              </h1>
              <p className="text-lg text-zinc-500 dark:text-zinc-400">
                {t("heroSubtitle")}
              </p>
            </div>

            {/* Primary Action Call to Action */}
            <div>
              <Link
                href={session ? APP_ROUTES.dashboard : APP_ROUTES.login}
                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm active:scale-95"
              >
                {t("getStarted")}
              </Link>
            </div>

            {/* Visual Hero Placeholder for Frontend Developer */}
            <div className="mt-16 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl p-12 bg-white dark:bg-zinc-900">
              <div className="text-center space-y-2">
                <svg
                  className="mx-auto h-12 w-12 text-zinc-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {t("placeholderHero")}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-500">
                  💡 Frontend Dev: Replace this container with the actual hero illustration or SVG dashboard mockups.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 sm:py-32 border-t border-zinc-200 dark:border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                {t("featuresTitle")}
              </h2>
            </div>

            {/* Features Grid Placeholder */}
            <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl p-12 bg-white dark:bg-zinc-900 text-center">
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {t("placeholderFeatures")}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">
                💡 Frontend Dev: Style this as a 3-column feature grid with hover effects and animations.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ─────────────────────────────────────────────────────────────── */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <p>{t("footer")}</p>
          <div className="flex gap-4">
            <span className="hover:underline cursor-pointer">Terms</span>
            <span className="hover:underline cursor-pointer">Privacy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
