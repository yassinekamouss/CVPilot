"use client";

import { useRef, useEffect, useState, useCallback } from "react";

/** A4 paper dimensions at 96 dpi */
const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

/** Padding around the scaled page container */
const VIEWPORT_PADDING = 40;

export interface PreviewScalerProps {
  children: React.ReactNode;
  currentPage: number;
  onTotalPages: (total: number) => void;
}

/**
 * PreviewScaler
 *
 * Responsibilities (Single Responsibility Principle):
 * 1. Compute scale ratio from container width via ResizeObserver.
 * 2. Measure the template's natural rendered height to determine total A4 pages.
 * 3. Show only one A4 page at a time via a clipping window + translateY offset.
 * 4. Render page-break guide lines between pages in the visible area.
 * 5. Emit totalPages upward via onTotalPages callback.
 */
export function PreviewScaler({ children, currentPage, onTotalPages }: PreviewScalerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hiddenRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  /** Measure the template's natural height using a hidden off-screen render */
  const measurePages = useCallback(() => {
    if (!hiddenRef.current) return;
    const naturalHeight = hiddenRef.current.scrollHeight;
    const pages = Math.max(1, Math.ceil(naturalHeight / A4_HEIGHT_PX));
    setTotalPages(pages);
    onTotalPages(pages);
  }, [onTotalPages]);

  /** Compute the CSS scale factor to fit the A4 width into the container */
  const updateScale = useCallback(() => {
    if (!containerRef.current) return;
    const { width } = containerRef.current.getBoundingClientRect();
    const scaleFactor = (width - VIEWPORT_PADDING) / A4_WIDTH_PX;
    setScale(Math.min(scaleFactor, 1));
  }, []);

  useEffect(() => {
    updateScale();
    measurePages();

    const resizeObserver = new ResizeObserver(() => {
      updateScale();
      measurePages();
    });

    if (containerRef.current) resizeObserver.observe(containerRef.current);
    if (hiddenRef.current) resizeObserver.observe(hiddenRef.current);

    return () => resizeObserver.disconnect();
  }, [updateScale, measurePages, children]);

  // The visible page offset in the template's coordinate space (pre-scale)
  const pageOffsetY = (currentPage - 1) * A4_HEIGHT_PX;

  // The total scaled height of the visible A4 window
  const scaledWindowHeight = A4_HEIGHT_PX * scale;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden flex flex-col items-center bg-[#F1F5F9]"
    >
      {/* ─── Hidden measurement render ─── */}
      {/*
        Rendered off-screen with no clipping so scrollHeight reflects the
        template's true content height. Invisible to the user.
      */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          position: "absolute",
          top: 0,
          left: "-9999px",
          width: `${A4_WIDTH_PX}px`,
          visibility: "hidden",
          zIndex: -1,
        }}
      >
        <div ref={hiddenRef}>
          {children}
        </div>
      </div>

      {/* ─── Visible scaled A4 window ─── */}
      <div
        className="overflow-hidden flex-shrink-0 rounded-sm shadow-2xl"
        style={{
          width: `${A4_WIDTH_PX * scale}px`,
          height: `${scaledWindowHeight}px`,
          marginTop: `${VIEWPORT_PADDING / 2}px`,
        }}
      >
        {/*
          The template itself is rendered at its native 794px width, then
          scaled down and clipped. The translateY shifts it to show the
          correct page, with a smooth animated transition.
        */}
        <div
          style={{
            width: `${A4_WIDTH_PX}px`,
            transformOrigin: "top left",
            transform: `scale(${scale}) translateY(-${pageOffsetY}px)`,
            transition: "transform 300ms ease-in-out",
            willChange: "transform",
          }}
        >
          {children}
        </div>
      </div>

      {/* ─── Page-break guide lines (shown below the clipping window) ─── */}
      {/*
        We render visual guide dashes below the live window, one per break.
        They sit in the same horizontal column as the scaled page.
      */}
      {totalPages > 1 && (
        <div
          className="flex flex-col items-center w-full mt-2 gap-1"
          style={{ width: `${A4_WIDTH_PX * scale}px` }}
        >
          {Array.from({ length: totalPages - 1 }).map((_, i) => (
            <PageBreakGuide key={i} pageNumber={i + 1} totalPages={totalPages} />
          ))}
        </div>
      )}

      {/* ─── Zoom chip ─── */}
      <ZoomChip scale={scale} />
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

interface PageBreakGuideProps {
  pageNumber: number;
  totalPages: number;
}

/**
 * A visual separator indicating where one A4 page ends and the next begins.
 * Styled as a subtle dashed rule, similar to Canva's page break indicator.
 */
function PageBreakGuide({ pageNumber, totalPages }: PageBreakGuideProps) {
  return (
    <div className="flex items-center gap-2 w-full py-0.5">
      <div className="flex-1 border-t border-dashed border-red-300/60" />
      <span className="text-[10px] font-medium text-red-400/80 whitespace-nowrap select-none">
        Page {pageNumber} / {totalPages}
      </span>
      <div className="flex-1 border-t border-dashed border-red-300/60" />
    </div>
  );
}

interface ZoomChipProps {
  scale: number;
}

/** Small read-only chip showing the current zoom percentage. */
function ZoomChip({ scale }: ZoomChipProps) {
  return (
    <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm border border-[#E2E8F0] rounded-full px-2.5 py-1 text-[10px] font-semibold text-[#64748B] shadow-sm select-none">
      {Math.round(scale * 100)}%
    </div>
  );
}
