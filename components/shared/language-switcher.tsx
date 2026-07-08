"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

/**
 * Client Component to switch application language.
 * Styled to match the existing brand design system.
 */
export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();

  const handleLanguageChange = (newLocale: "fr" | "en") => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-0.5 p-0.5 bg-brand-bg border border-border-light rounded-full">
      <button
        onClick={() => handleLanguageChange("fr")}
        className={`px-3 py-1 text-[10px] font-bold rounded-full transition-all duration-200 cursor-pointer ${
          currentLocale === "fr"
            ? "bg-brand-navy text-white shadow-sm"
            : "text-text-secondary hover:text-brand-navy"
        }`}
        aria-label="Changer la langue en français"
        aria-pressed={currentLocale === "fr"}
      >
        FR
      </button>
      <button
        onClick={() => handleLanguageChange("en")}
        className={`px-3 py-1 text-[10px] font-bold rounded-full transition-all duration-200 cursor-pointer ${
          currentLocale === "en"
            ? "bg-brand-navy text-white shadow-sm"
            : "text-text-secondary hover:text-brand-navy"
        }`}
        aria-label="Switch language to English"
        aria-pressed={currentLocale === "en"}
      >
        EN
      </button>
    </div>
  );
}
