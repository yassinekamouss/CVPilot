import type { AuthProvider } from "@/types";

export const AUTH_PROVIDERS = ["google", "linkedin"] as const satisfies readonly AuthProvider[];

export const DEFAULT_AUTH_PROVIDER: AuthProvider = "google";

export const AUTH_PROVIDER_LABELS = {
  google: "Google",
  linkedin: "LinkedIn",
} satisfies Record<AuthProvider, string>;

export const AUTH_PROVIDER_BUTTON_CLASSES = {
  google:
    "border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-750 text-zinc-800 dark:text-zinc-100",
  linkedin: "bg-[#0a66c2] hover:bg-[#004182] text-white",
} satisfies Record<AuthProvider, string>;