import { auth, signOut } from "@/lib/auth/auth";
import { UserService } from "@/services/user.service";
import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { APP_ROUTES } from "@/constants/routes";

interface DashboardPageProps {
  params: Promise<{ locale: string }>;
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = await params;

  // Set request locale for static rendering optimization
  setRequestLocale(locale);


  const session = await auth();

  // Guard clause for type safety and defence in depth
  if (!session?.user?.id) {
    redirect(`/${locale}${APP_ROUTES.login}`);
  }

  // Lazy Profile Initialization
  const profile = await UserService.getOrCreateProfile(session.user.id);

  return (
    <div className="flex flex-col h-screen items-center justify-center space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#0B132B]">
          You are successfully authenticated {profile.firstName} {profile.lastName || ""}
        </h1>
      </div>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: `/${locale}` });
        }}
      >
        <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition cursor-pointer">
          Sign Out
        </button>
      </form>
    </div>
  );
}
