import { auth, signOut } from "@/lib/auth/auth";
import { UserService } from "@/services/user.service";
import { Link } from "@/i18n/routing";
import { redirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { APP_ROUTES } from "@/constants/routes";
import LanguageSwitcher from "@/components/shared/language-switcher";

interface DashboardPageProps {
  params: Promise<{ locale: string }>;
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = await params;

  // Set request locale for static rendering optimization
  setRequestLocale(locale);

  const t = await getTranslations("Dashboard");
  const session = await auth();

  // Guard clause for type safety and defence in depth
  if (!session?.user?.id) {
    redirect(`/${locale}${APP_ROUTES.login}`);
  }

  // Lazy Profile Initialization
  const profile = await UserService.getOrCreateProfile(session.user.id);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 dark:text-white relative">
      {/* Top Controls Header */}
      <div className="flex justify-between items-center pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">{t("title")}</h1>
          <LanguageSwitcher />
        </div>

        <div className="flex items-center gap-4">
          <Link
            href={APP_ROUTES.dashboardSettings}
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition"
          >
            Settings
          </Link>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: `/${locale}` });
            }}
          >
            <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition cursor-pointer">
              {t("signOut")}
            </button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Details Card */}
        <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2 dark:border-zinc-700">
            {t("accountDetails")}
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-zinc-500 uppercase">{t("email")}</p>
              <p className="font-medium">{session.user.email}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase">{t("dbId")}</p>
              <p className="font-mono text-sm break-all">{session.user.id}</p>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2 dark:border-zinc-700">
            {t("profile")}
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-zinc-500 uppercase">{t("name")}</p>
              <p className="font-medium">
                {profile.firstName} {profile.lastName || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase">{t("status")}</p>
              <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                {t("sync")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Notice */}
      <div className="p-6 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl">
        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-400">
          {t("nextSteps")}
        </h3>
        <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
          {t("nextStepsDesc")}
        </p>
        <Link href="/" className="inline-block mt-4 text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400">
          {t("returnHome")}
        </Link>
      </div>
    </div>
  );
}
