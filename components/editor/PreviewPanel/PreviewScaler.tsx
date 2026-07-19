"use client";

/**
 * PreviewScaler.tsx
 *
 * Responsibilities:
 * 1. Compute CSS scale ratio from container width via ResizeObserver.
 * 2. Measure the template's natural height using a hidden off-screen render.
 * 3. Render the full resume in a scrollable workspace (like Canva/Figma) —
 *    no more single-page clipping window.
 * 4. Show page-break guide lines at each A4 boundary within the paper.
 * 5. Emit totalPages upward via onTotalPages callback.
 * 6. Call useScrollSync so preview scrolls when the active section changes.
 */

import { useRef, useEffect, useState, useCallback } from "react";
import { SuppressResumeInteractions } from "@/components/editor/interaction/ResumeInteractionContext";
import { useScrollSync } from "@/components/editor/interaction/useScrollSync";

/** A4 paper dimensions at 96 dpi */
const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

/** Padding around the paper in the scrollable workspace */
const WORKSPACE_PADDING_V = 28; // top + bottom
const WORKSPACE_PADDING_H = 24;

export interface PreviewScalerProps {
  children: React.ReactNode;
  currentPage: number;
  onTotalPages: (total: number) => void;
}

export function PreviewScaler({
  children,
  currentPage,
  onTotalPages,
}: PreviewScalerProps) {
  /** Outer measurement/sizing container (full available width) */
  const containerRef = useRef<HTMLDivElement>(null);

  /** Hidden off-screen render — used to measure the template's natural height */
  const hiddenRef = useRef<HTMLDivElement>(null);

  /** The scrollable workspace div — passed to useScrollSync */
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const prevPagesRef = useRef<number>(1);

  const [scale, setScale] = useState(1);
  const [naturalHeight, setNaturalHeight] = useState(A4_HEIGHT_PX);
  const [totalPages, setTotalPages] = useState(1);

  // ─── Measurements ────────────────────────────────────────────────────────

  const measurePages = useCallback(() => {
    if (!hiddenRef.current) return;
    const h = hiddenRef.current.scrollHeight;
    const pages = Math.max(1, Math.ceil(h / A4_HEIGHT_PX));
    setNaturalHeight(h);
    setTotalPages(pages);
    
    if (prevPagesRef.current !== pages) {
      prevPagesRef.current = pages;
      onTotalPages(pages);
    }
  }, [onTotalPages]);

  const updateScale = useCallback(() => {
    if (!containerRef.current) return;
    const { width } = containerRef.current.getBoundingClientRect();
    const available = width - WORKSPACE_PADDING_H * 2;
    setScale(Math.min(available / A4_WIDTH_PX, 1));
  }, []);

  useEffect(() => {
    updateScale();
    measurePages();

    const ro = new ResizeObserver(() => {
      updateScale();
      measurePages();
    });

    if (containerRef.current) ro.observe(containerRef.current);
    if (hiddenRef.current) ro.observe(hiddenRef.current);

    return () => ro.disconnect();
  }, [updateScale, measurePages, children]);

  // ─── Scroll to page (via page-nav buttons in header) ─────────────────────

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const targetScrollTop =
      (currentPage - 1) * A4_HEIGHT_PX * scale + WORKSPACE_PADDING_V;
    container.scrollTo({ top: targetScrollTop, behavior: "smooth" });
  }, [currentPage, scale]);

  // ─── Scroll sync (editor → preview section) ──────────────────────────────

  useScrollSync({
    containerRef: scrollContainerRef,
    scale,
    paddingTop: WORKSPACE_PADDING_V,
  });

  // ─── Derived values ───────────────────────────────────────────────────────

  const scaledWidth = A4_WIDTH_PX * scale;
  const scaledHeight = naturalHeight * scale;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      aria-label="Resume preview"
    >
      {/* ─── Hidden measurement render ──────────────────────────────────── */}
      {/*
        Rendered off-screen at native A4 width so scrollHeight reflects the
        true content height. Wrapped in SuppressResumeInteractions so the
        ResumeSection nodes here do NOT compete with the visible render
        when registering their refs.
      */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "-9999px",
          width: `${A4_WIDTH_PX}px`,
          visibility: "hidden",
          zIndex: -1,
          pointerEvents: "none",
        }}
      >
        <SuppressResumeInteractions>
          <div ref={hiddenRef}>{children}</div>
        </SuppressResumeInteractions>
      </div>

      {/* ─── Scrollable workspace ───────────────────────────────────────── */}
      <div
        ref={scrollContainerRef}
        className="preview-workspace w-full h-full overflow-y-auto overflow-x-hidden"
        style={{ scrollBehavior: "smooth" }}
      >
        {/* Centre column — always at least as tall as the viewport */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: WORKSPACE_PADDING_V,
            paddingBottom: WORKSPACE_PADDING_V * 2,
            minHeight: "100%",
          }}
        >
          {/* ── The A4 paper ── */}
          <div
            className="preview-paper"
            style={{
              width: scaledWidth,
              height: scaledHeight,
              position: "relative",
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
            {/* Template rendered at native width, then CSS-scaled down */}
            <div
              style={{
                width: A4_WIDTH_PX,
                transformOrigin: "top left",
                transform: `scale(${scale})`,
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              {children}
            </div>

            {/* Page-break guide lines (inside the paper) */}
            {totalPages > 1 &&
              Array.from({ length: totalPages - 1 }).map((_, i) => (
                <PageBreakLine
                  key={i}
                  offsetY={(i + 1) * A4_HEIGHT_PX * scale}
                />
              ))}
          </div>

          {/* Page label below paper */}
          {totalPages > 1 && (
            <div className="mt-2 text-[10px] font-medium text-[#94A3B8] select-none">
              {totalPages} pages
            </div>
          )}
        </div>
      </div>

      {/* Zoom chip — always visible */}
      <ZoomChip scale={scale} />
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

/** Horizontal dashed rule at the A4 page boundary, overlaid on the paper */
function PageBreakLine({ offsetY }: { offsetY: number }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: offsetY,
        left: 0,
        right: 0,
        height: "2px",
        background:
          "repeating-linear-gradient(90deg, rgba(239,68,68,0.45) 0px, rgba(239,68,68,0.45) 6px, transparent 6px, transparent 10px)",
        zIndex: 2,
        pointerEvents: "none",
      }}
    />
  );
}

/** Small read-only chip showing the current zoom percentage */
function ZoomChip({ scale }: { scale: number }) {
  return (
    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm border border-[#E2E8F0] rounded-full px-2.5 py-1 text-[10px] font-semibold text-[#64748B] shadow-sm select-none pointer-events-none z-10">
      {Math.round(scale * 100)}%
    </div>
  );
}
