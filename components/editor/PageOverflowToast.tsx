"use client";

import React, { useEffect, useRef } from "react";
import { AlertTriangle, X } from "lucide-react";
import { useTranslations } from "next-intl";

interface PageOverflowToastProps {
  onClose: () => void;
}

/**
 * PageOverflowToast
 *
 * A non-blocking, auto-dismissing notification shown once when the resume
 * content overflows onto a second page. Reminds the user that recruiters
 * generally prefer single-page resumes.
 */
export function PageOverflowToast({ onClose }: PageOverflowToastProps) {
  const t = useTranslations("Builder");
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    timerRef.current = setTimeout(onClose, 6000);
    return () => clearTimeout(timerRef.current);
  }, [onClose]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        "fixed bottom-5 left-1/2 -translate-x-1/2 z-50",
        "flex items-start gap-3",
        "bg-white border border-amber-200 shadow-xl rounded-2xl px-4 py-3 max-w-sm w-[calc(100vw-2rem)]",
        "animate-slideUpFade",
      ].join(" ")}
    >
      <AlertTriangle
        size={16}
        className="text-amber-500 flex-shrink-0 mt-0.5"
        strokeWidth={2}
      />
      <p className="text-xs text-[#0B132B] leading-relaxed flex-1">
        {t("pageOverflowWarning")}
      </p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss"
        className="text-[#94A3B8] hover:text-[#0B132B] transition-colors cursor-pointer flex-shrink-0"
      >
        <X size={14} strokeWidth={2} />
      </button>
    </div>
  );
}
