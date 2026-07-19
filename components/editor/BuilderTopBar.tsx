"use client";

import React from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/shared/language-switcher";

interface BuilderTopBarProps {
  activeTab: "edit" | "preview";
  onTabChange: (tab: "edit" | "preview") => void;
}

/**
 * BuilderTopBar
 *
 * Clean, minimal top bar for the resume builder workspace.
 * - Left: back arrow + PROCV logo
 * - Center: editable resume title
 * - Right: language switcher + mobile edit/preview toggle
 *
 * Auto-save indicator has been intentionally removed.
 */
export function BuilderTopBar({ activeTab, onTabChange }: BuilderTopBarProps) {
  const t = useTranslations("Builder");

  return (
    <header className="h-11 flex-shrink-0 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-4 gap-3 z-30">
      {/* Left: Back + Logo */}
      <Link
        href="/dashboard"
        className="flex items-center gap-2 text-[#64748B] hover:text-[#0B132B] transition-colors duration-200 flex-shrink-0 group"
        aria-label={t("backToDashboard")}
      >
        <ArrowLeft
          size={13}
          strokeWidth={2}
          className="transition-transform duration-200 group-hover:-translate-x-0.5"
        />
        <Image
          src="/main_logo.svg"
          alt="PROCV"
          width={20}
          height={20}
          className="h-[20px] w-auto"
          priority
        />
      </Link>

      {/* Center: editable title */}
      <div className="flex items-center gap-2 flex-1 min-w-0 justify-center">
        <ResumeTitle defaultTitle={t("resumeTitle")} />
      </div>

      {/* Right: lang switcher + mobile toggle */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="hidden sm:block">
          <LanguageSwitcher />
        </div>
        <MobileTabToggle
          activeTab={activeTab}
          onTabChange={onTabChange}
          editLabel={t("tabEdit")}
          previewLabel={t("tabPreview")}
        />
      </div>
    </header>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function ResumeTitle({ defaultTitle }: { defaultTitle: string }) {
  const [value, setValue] = React.useState(defaultTitle);

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={[
        "text-[12px] font-semibold text-[#0B132B] bg-transparent border-none outline-none",
        "placeholder:text-[#94A3B8] min-w-0 max-w-[160px] sm:max-w-[220px]",
        "hover:bg-[#F8FAFC] focus:bg-[#F8FAFC] focus:px-2 focus:rounded-md",
        "transition-all duration-150 cursor-text truncate text-center",
      ].join(" ")}
      spellCheck={false}
      aria-label="Resume title"
    />
  );
}

function MobileTabToggle({
  activeTab,
  onTabChange,
  editLabel,
  previewLabel,
}: {
  activeTab: "edit" | "preview";
  onTabChange: (tab: "edit" | "preview") => void;
  editLabel: string;
  previewLabel: string;
}) {
  return (
    <div className="flex md:hidden bg-[#F1F5F9] p-0.5 rounded-lg border border-[#E2E8F0]">
      {(["edit", "preview"] as const).map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onTabChange(tab)}
          className={[
            "px-3 py-1 text-[10px] font-semibold rounded-[5px] transition-all cursor-pointer",
            activeTab === tab
              ? "bg-white shadow-sm text-[#0B132B]"
              : "text-[#64748B]",
          ].join(" ")}
        >
          {tab === "edit" ? editLabel : previewLabel}
        </button>
      ))}
    </div>
  );
}
