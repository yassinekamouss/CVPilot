"use client";

import { useLanguage } from "@/lib/hooks/use-language";

export default function LanguageAutoDetector() {
  // Invokes the auto-detection hook globally
  useLanguage();
  return null;
}
