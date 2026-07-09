"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

export function useLanguage() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale() as "en" | "fr";
  const [locale, setLocaleState] = useState<"en" | "fr">(currentLocale);

  // Synchronize state with next-intl active locale
  useEffect(() => {
    setLocaleState(currentLocale);
  }, [currentLocale]);

  // Handle first-visit language auto-detection
  useEffect(() => {
    // 1. Check if a language preference is already stored
    const savedLocale = localStorage.getItem("cvpilot-locale");

    if (savedLocale) {
      // Ensure the cookie is present and matches the saved preference for future SSR requests
      const cookieLocale = document.cookie
        .split("; ")
        .find((row) => row.startsWith("NEXT_LOCALE="))
        ?.split("=")[1];

      if (!cookieLocale || cookieLocale !== savedLocale) {
        document.cookie = `NEXT_LOCALE=${savedLocale}; path=/; max-age=31536000; SameSite=Lax`;
      }
      return;
    }

    // 2. No saved locale -> First-time visit auto-detection
    const browserLanguages = navigator.languages || [navigator.language];
    let detectedLocale: "en" | "fr" = "en"; // Default fallback is English

    for (const lang of browserLanguages) {
      const lowerLang = lang.toLowerCase();
      if (lowerLang.startsWith("fr")) {
        detectedLocale = "fr";
        break;
      } else if (lowerLang.startsWith("en")) {
        detectedLocale = "en";
        break;
      }
    }

    // Persist preference in localStorage & NEXT_LOCALE cookie
    localStorage.setItem("cvpilot-locale", detectedLocale);
    document.cookie = `NEXT_LOCALE=${detectedLocale}; path=/; max-age=31536000; SameSite=Lax`;

    // Perform client-side redirect if the current page locale doesn't match the browser's language
    if (currentLocale !== detectedLocale) {
      router.replace(pathname, { locale: detectedLocale });
    }
  }, [currentLocale, pathname, router]);

  // Method to explicitly update the language preference
  const changeLanguage = (newLocale: "en" | "fr") => {
    localStorage.setItem("cvpilot-locale", newLocale);
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    setLocaleState(newLocale);
    router.replace(pathname, { locale: newLocale });
  };

  return {
    locale,
    changeLanguage,
  };
}
