import { auth, signIn, signOut } from "@/lib/auth/auth";
import Link from "next/link";
import { APP_ROUTES, DEFAULT_AUTH_PROVIDER } from "@/constants";

/**
 * Simple Authentication Test Landing Page.
 */
export default async function LandingPage() {
  const session = await auth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800">
        <h1 className="text-2xl font-bold text-center mb-6 dark:text-white">CVPilot Auth Test</h1>
        
        {session ? (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm font-medium text-green-800 dark:text-green-400">✅ Authenticated</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Logged in as: {session.user?.email}</p>
              <p className="text-xs font-mono text-zinc-500 mt-2 truncate">User ID: {session.user?.id}</p>
            </div>
            
            <Link 
              href={APP_ROUTES.dashboard}
              className="block w-full text-center py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Go to Dashboard
            </Link>

            <form action={async () => {
              "use server";
              await signOut();
            }}>
              <button className="w-full py-2 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors dark:text-white">
                Sign Out
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-center text-zinc-500 dark:text-zinc-400">
              Please sign in to test the authentication layer.
            </p>
            
            <form action={async () => {
              "use server";
              await signIn(DEFAULT_AUTH_PROVIDER);
            }}>
              <button className="w-full flex items-center justify-center gap-2 py-3 bg-white hover:bg-zinc-100 border border-zinc-300 rounded-lg transition-colors text-black">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
