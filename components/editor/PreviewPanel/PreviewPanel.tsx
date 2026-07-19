"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ResumeContent } from "@/schemas/resume.schema";
import { PreviewScaler } from "./PreviewScaler";
import { useTranslations } from "next-intl";

interface PreviewPanelProps {
  data: ResumeContent;
  children: React.ReactNode;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onTotalPages: (total: number) => void;
}

/**
 * PreviewPanel
 *
 * Pure sticky preview pane. Responsibilities:
 * - Thin header bar with live-sync indicator and optional page navigation.
 * - Delegates all scaling logic to PreviewScaler.
 * - Injects live form data into child template components.
 *
 * ResumeScore has been moved to the editor pane (HorizontalStepper completeness bar).
 */
export function PreviewPanel({
  data,
  children,
  currentPage,
  totalPages,
  onPageChange,
  onTotalPages,
}: PreviewPanelProps) {
  const t = useTranslations("Builder");

  // Inject live form data into the template child
  const renderedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { data } as Record<string, unknown>);
    }
    return child;
  });

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="flex-1 bg-neutral-100 h-full flex flex-col overflow-hidden relative">
      {/* ─── Header bar ─── */}
      <div className="h-10 border-b border-[#E2E8F0] bg-white flex items-center justify-between px-4 z-10 flex-shrink-0">
        {/* Live sync indicator */}
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse flex-shrink-0" />
          <span className="text-[10px] text-[#64748B] font-medium hidden sm:block">
            {t("syncing")}
          </span>
        </div>

        {/* Page navigation — only when multi-page */}
        {totalPages > 1 && (
          <PageNavigation
            currentPage={currentPage}
            totalPages={totalPages}
            canGoPrev={canGoPrev}
            canGoNext={canGoNext}
            onPrev={() => onPageChange(currentPage - 1)}
            onNext={() => onPageChange(currentPage + 1)}
            labelPrev={t("prevPage")}
            labelNext={t("nextPage")}
            labelPageOf={t("pageOf", { current: currentPage, total: totalPages })}
          />
        )}

        {/* Preview label */}
        <span className="text-[10px] font-semibold text-[#0B132B] uppercase tracking-wide">
          {t("livePreview")}
        </span>
      </div>

      {/* ─── Scaled preview area ─── */}
      <div className="flex-1 min-h-0 relative overflow-hidden">
        <PreviewScaler currentPage={currentPage} onTotalPages={onTotalPages}>
          {renderedChildren}
        </PreviewScaler>
      </div>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

interface PageNavigationProps {
  currentPage: number;
  totalPages: number;
  canGoPrev: boolean;
  canGoNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  labelPrev: string;
  labelNext: string;
  labelPageOf: string;
}

function PageNavigation({
  canGoPrev,
  canGoNext,
  onPrev,
  onNext,
  labelPrev,
  labelNext,
  labelPageOf,
}: PageNavigationProps) {
  return (
    <div className="flex items-center gap-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-1 py-0.5">
      <button
        type="button"
        onClick={onPrev}
        disabled={!canGoPrev}
        aria-label={labelPrev}
        className="w-5 h-5 flex items-center justify-center rounded text-[#64748B] hover:bg-[#E2E8F0] hover:text-[#0B132B] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
      >
        <ChevronLeft size={12} strokeWidth={2.5} />
      </button>

      <span className="text-[10px] font-semibold text-[#0B132B] min-w-[56px] text-center select-none">
        {labelPageOf}
      </span>

      <button
        type="button"
        onClick={onNext}
        disabled={!canGoNext}
        aria-label={labelNext}
        className="w-5 h-5 flex items-center justify-center rounded text-[#64748B] hover:bg-[#E2E8F0] hover:text-[#0B132B] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
      >
        <ChevronRight size={12} strokeWidth={2.5} />
      </button>
    </div>
  );
}
