import { signIn } from "@/lib/auth/auth";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="w-full max-w-sm p-8 bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800">
        <h1 className="text-2xl font-bold text-center mb-8 dark:text-white">Sign In</h1>
        
        <form action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/dashboard" });
        }}>
          <button className="w-full flex items-center justify-center gap-2 py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg transition-all dark:bg-white dark:text-black dark:hover:bg-zinc-200">
            Continue with Google
          </button>
        </form>
        
        <p className="mt-4 text-center text-xs text-zinc-500">
          Only Google accounts are currently supported.
        </p>
      </div>
    </div>
  );
}
