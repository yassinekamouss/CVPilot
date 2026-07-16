"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/shared/language-switcher";

interface EditorTopBarProps {
  /** Number of sections that have at least one filled field */
  filledSections: number;
  /** Total number of sections */
  totalSections: number;
  /** Mobile tab state (for the mobile edit/preview toggle) */
  activeTab: "edit" | "preview";
  onTabChange: (tab: "edit" | "preview") => void;
}

/**
 * EditorTopBar
 *
 * The global command bar for the resume builder.
 *
 * Responsibilities:
 * - Back navigation to dashboard.
 * - Editable resume title (inline, borderless until focused).
 * - Section completion progress indicator.
 * - Language switcher.
 * - Mobile edit/preview tab toggle.
 */
export function EditorTopBar({
  filledSections,
  totalSections,
  activeTab,
  onTabChange,
}: EditorTopBarProps) {
  const t = useTranslations("Builder");

  return (
    <header className="h-12 flex-shrink-0 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-4 gap-3 z-20">
      {/* ─── Left: Back link + Logo ─── */}
      <BackLink label={t("backToDashboard")} />

      {/* ─── Center: Editable title + completion ─── */}
      <div className="flex items-center gap-3 flex-1 min-w-0 justify-center">
        <ResumeTitle defaultTitle={t("resumeTitle")} />
        <CompletionPill filled={filledSections} total={totalSections} label={t("sectionsComplete", { filled: filledSections, total: totalSections })} />
      </div>

      {/* ─── Right: Lang switcher + mobile tab toggle ─── */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="hidden sm:block">
          <LanguageSwitcher />
        </div>
        {/* Mobile-only tab toggle */}
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

/** Back arrow + PROCV logo, links to /dashboard */
function BackLink({ label }: { label: string }) {
  return (
    <Link
      href="/dashboard"
      className="flex items-center gap-2 text-[#64748B] hover:text-[#0B132B] transition-colors duration-200 flex-shrink-0 group"
      aria-label={label}
    >
      <ArrowLeft
        size={15}
        className="transition-transform duration-200 group-hover:-translate-x-0.5"
        strokeWidth={2}
      />
      <Image
        src="/main_logo.svg"
        alt="PROCV"
        width={24}
        height={24}
        className="h-6 w-auto"
        priority
      />
    </Link>
  );
}

/**
 * ResumeTitle
 *
 * An inline-editable title field.
 * Appears as plain styled text at rest; reveals a text input on focus.
 */
function ResumeTitle({ defaultTitle }: { defaultTitle: string }) {
  const [value, setValue] = useState(defaultTitle);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={[
        "text-sm font-semibold text-[#0B132B] bg-transparent border-none outline-none",
        "placeholder:text-[#94A3B8] min-w-0 max-w-[160px] sm:max-w-[220px]",
        "focus:bg-[#F8FAFC] focus:border focus:border-[#E2E8F0] focus:rounded-md focus:px-2",
        "transition-all duration-150 cursor-text truncate",
      ].join(" ")}
      spellCheck={false}
      aria-label="Resume title"
    />
  );
}

/**
 * CompletionPill
 *
 * Shows "6 / 9 sections" with a green dot when all are complete,
 * or an amber dot when some are still empty.
 */
function CompletionPill({
  filled,
  total,
  label,
}: {
  filled: number;
  total: number;
  label: string;
}) {
  const isComplete = filled === total;

  return (
    <div
      className={[
        "hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border select-none flex-shrink-0",
        isComplete
          ? "bg-emerald-50 border-emerald-200 text-emerald-700"
          : "bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B]",
      ].join(" ")}
    >
      {isComplete ? (
        <CheckCircle2 size={11} className="text-emerald-500" strokeWidth={2.5} />
      ) : (
        <span
          className="h-1.5 w-1.5 rounded-full flex-shrink-0"
          style={{ background: filled > 0 ? "#F59E0B" : "#CBD5E1" }}
        />
      )}
      {label}
    </div>
  );
}

/**
 * MobileTabToggle
 *
 * Visible only on mobile (md:hidden).
 * Allows switching between the editor form and the live preview.
 */
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
            "px-3 py-1 text-[11px] font-semibold rounded-[5px] transition-all cursor-pointer",
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
