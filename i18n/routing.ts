import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["fr", "en"],

  // Used when no locale matches (default fallback is fr)
  defaultLocale: "fr",

  // Force locale prefix in URLs (e.g. /fr/login, /en/login)
  localePrefix: "always",
});

// Lightweight wrappers around Next.js' navigation APIs
// that will automatically consider the routing config
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
