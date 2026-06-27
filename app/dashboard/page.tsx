import { auth, signOut } from "@/lib/auth/auth";
import { UserService } from "@/services/user.service";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  // Test the Lazy Profile Initialization requirement
  const profile = await UserService.getOrCreateProfile(session.user.id);

  return (
    <div className="p-8 max-w-4xl mx-auto dark:text-white">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <form action={async () => {
          "use server";
          await signOut();
        }}>
          <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
            Sign Out
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2 dark:border-zinc-700">Account Details</h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-zinc-500 uppercase">Email Address</p>
              <p className="font-medium">{session.user.email}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase">Database ID</p>
              <p className="font-mono text-sm break-all">{session.user.id}</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2 dark:border-zinc-700">Profile (Lazy Init)</h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-zinc-500 uppercase">Name</p>
              <p className="font-medium">{profile.firstName} {profile.lastName || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase">Status</p>
              <p className="text-sm">✅ Profile synchronized with database</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl">
        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-400">Next Steps</h3>
        <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
          Your authentication layer is fully functional. The `user.id` is available in the session, 
          and your profile has been lazily created in the database.
        </p>
        <Link href="/" className="inline-block mt-4 text-sm font-semibold text-blue-600 hover:underline">
          Return to home
        </Link>
      </div>
    </div>
  );
}
