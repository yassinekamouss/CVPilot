"use client";

/**
 * useScrollSync.ts
 *
 * Single Responsibility: When the active section changes, imperatively scroll
 * the preview scroll container so the matching registered ref is visible.
 *
 * Called inside PreviewScaler, which owns both the scroll container ref and
 * the current CSS scale factor — both needed to compute the correct scroll
 * position when the template is rendered via CSS transform.
 */

import { useEffect, useRef } from "react";
import { useResumeInteraction } from "./ResumeInteractionContext";

const SCROLL_PADDING_PX = 32; // pixels of breathing room above the section

interface UseScrollSyncParams {
  /** The scrollable container that wraps the scaled template */
  containerRef: React.RefObject<HTMLDivElement | null>;
  /** Current CSS scale factor (e.g. 0.72) applied to the template */
  scale: number;
  /** Top padding of the scroll workspace (added before the paper) */
  paddingTop?: number;
}

/**
 * useScrollSync
 *
 * Watches `activeSection` from context. When it changes, computes the correct
 * scroll offset (accounting for the CSS scale transform) and scrolls the
 * container to that position.
 *
 * Uses `offsetTop` of the registered ref — measured in the template's native
 * (pre-transform) coordinate space — then multiplies by `scale` to get the
 * visual position inside the scroll container.
 */
export function useScrollSync({
  containerRef,
  scale,
  paddingTop = 20,
}: UseScrollSyncParams): void {
  const { activeSection, sectionRefs } = useResumeInteraction();

  // Track previous activeSection to avoid scrolling on first render
  const prevSectionRef = useRef<string | null>(null);

  // Detect reduced-motion preference
  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  useEffect(() => {
    // Skip scroll on initial mount
    if (prevSectionRef.current === null) {
      prevSectionRef.current = activeSection;
      return;
    }

    if (prevSectionRef.current === activeSection) return;
    prevSectionRef.current = activeSection;

    const sectionRef = sectionRefs.current.get(activeSection);
    const container = containerRef.current;

    if (!sectionRef?.current || !container) return;

    // `offsetTop` is in the template's native coordinate space (pre-scale).
    // Multiply by scale to get the visual (post-scale) offset within the
    // scroll container.
    const nativeTop = sectionRef.current.offsetTop;
    const scaledTop = nativeTop * scale + paddingTop - SCROLL_PADDING_PX;

    container.scrollTo({
      top: Math.max(0, scaledTop),
      behavior: prefersReducedMotion ? "instant" : "smooth",
    });
  }, [activeSection, scale, paddingTop, containerRef, sectionRefs, prefersReducedMotion]);
}
