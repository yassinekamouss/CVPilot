"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

/**
 * Client Component to switch application language.
 * Uses the localized router wrappers from next-intl configuration.
 */
export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();

  const handleLanguageChange = (newLocale: "fr" | "en") => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <button
        onClick={() => handleLanguageChange("fr")}
        className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
          currentLocale === "fr"
            ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
            : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
        }`}
        aria-label="Changer la langue en français"
      >
        FR
      </button>
      <button
        onClick={() => handleLanguageChange("en")}
        className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
          currentLocale === "en"
            ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
            : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
        }`}
        aria-label="Switch language to English"
      >
        EN
      </button>
    </div>
  );
}
