"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, GripVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CollapsibleCardProps {
  /** Primary label shown in the collapsed header (e.g. company or school name) */
  headline: string;
  /** Secondary label shown alongside the headline (e.g. position or degree) */
  subline?: string;
  /** Dates range shown at the end of the header row */
  dateRange?: string;
  /** Entry index (1-based) shown as fallback when headline is empty */
  index: number;
  /** Callback to delete this entry */
  onRemove: () => void;
  /** Remove confirmation label */
  removeLabel?: string;
  /** Full form content rendered inside the expanded card */
  children: React.ReactNode;
  /** Whether to start expanded */
  defaultOpen?: boolean;
}

/**
 * CollapsibleCard
 *
 * A premium, animated collapsible card used for repeatable entries
 * (Experience, Education, Projects, Certifications).
 *
 * - Collapsed: shows headline + subline + date range in a clean row
 * - Expanded: reveals full form via Framer Motion height animation
 * - Delete button with a small inline confirmation guard
 */
export function CollapsibleCard({
  headline,
  subline,
  dateRange,
  index,
  onRemove,
  removeLabel = "Delete",
  children,
  defaultOpen = false,
}: CollapsibleCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const displayHeadline =
    headline.trim() || `Entry ${index}`;

  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.05)] transition-shadow duration-200 hover:shadow-[0_2px_12px_rgba(0,0,0,0.08)] overflow-hidden">
      {/* ─── Card header ─── */}
      <div
        className="flex items-center gap-3 px-5 py-3.5 cursor-pointer select-none group"
        onClick={() => {
          setIsOpen((prev) => !prev);
          setConfirmDelete(false);
        }}
        role="button"
        aria-expanded={isOpen}
      >
        {/* Drag handle */}
        <GripVertical
          size={14}
          className="text-[#CBD5E1] flex-shrink-0 group-hover:text-[#94A3B8] transition-colors"
          aria-hidden
        />

        {/* Labels */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-sm font-semibold text-[#0B132B] truncate leading-tight">
              {displayHeadline}
            </span>
            {subline && (
              <>
                <span className="text-[#CBD5E1] text-xs">·</span>
                <span className="text-xs text-[#64748B] truncate">{subline}</span>
              </>
            )}
          </div>
          {dateRange && (
            <p className="text-[11px] text-[#94A3B8] mt-0.5 leading-tight">{dateRange}</p>
          )}
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0"
        >
          <ChevronDown size={15} className="text-[#94A3B8]" />
        </motion.div>
      </div>

      {/* ─── Expandable form content ─── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-5 pb-5 pt-1 space-y-4 border-t border-[#F1F5F9]">
              {children}

              {/* ─── Delete action ─── */}
              <div className="flex items-center justify-end pt-2 border-t border-[#F1F5F9]">
                {confirmDelete ? (
                  <div className="flex items-center gap-2 animate-fadeIn">
                    <span className="text-xs text-[#64748B]">Are you sure?</span>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="h-7 px-3 text-xs rounded-lg"
                      onClick={(e) => { e.stopPropagation(); onRemove(); }}
                    >
                      {removeLabel}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-7 px-3 text-xs rounded-lg text-[#64748B]"
                      onClick={(e) => { e.stopPropagation(); setConfirmDelete(false); }}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setConfirmDelete(true); }}
                    className="flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-red-500 transition-colors duration-150 cursor-pointer"
                  >
                    <Trash2 size={12} />
                    <span>{removeLabel}</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
