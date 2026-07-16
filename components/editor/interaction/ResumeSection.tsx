"use client";

/**
 * ResumeSection.tsx
 *
 * Single Responsibility: A self-registering section wrapper.
 *
 * Templates wrap each logical section with <ResumeSection id="..."> and gain:
 *   - Ref registration with the interaction system
 *   - Click-to-edit (focuses matching editor panel)
 *   - Hover state + subtle highlight
 *   - Active state (scale + border) driven by context
 *   - Edit affordance chip on hover
 *   - Keyboard navigation (Enter/Space to focus)
 *   - Reduced-motion support
 *
 * NO interaction logic belongs inside the template itself.
 */

import { useEffect, useRef } from "react";
import { Pencil } from "lucide-react";
import {
  useResumeInteraction,
  type SectionId,
} from "./ResumeInteractionContext";

// ─── Props ────────────────────────────────────────────────────────────────────

interface ResumeSectionProps {
  id: SectionId;
  children: React.ReactNode;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * ResumeSection
 *
 * Usage in any template:
 *   <ResumeSection id="experience">
 *     <SectionHeading>Experience</SectionHeading>
 *     {data.experience.map(...)}
 *   </ResumeSection>
 */
export function ResumeSection({ id, children, className }: ResumeSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const {
    registerSection,
    unregisterSection,
    focusSection,
    hoveredSection,
    setHoveredSection,
    activeSection,
    suppressInteractions,
  } = useResumeInteraction();

  // Register / unregister the DOM ref with the central registry.
  // Suppressed renders (hidden measurement) are no-ops via context override.
  useEffect(() => {
    if (suppressInteractions) return;
    registerSection(id, ref as React.RefObject<HTMLElement | null>);
    return () => unregisterSection(id);
  }, [id, suppressInteractions, registerSection, unregisterSection]);

  if (suppressInteractions) {
    // In the hidden measurement render, just render a plain wrapper
    return <div className={className}>{children}</div>;
  }

  const isActive = activeSection === id;
  const isHovered = hoveredSection === id;
  // Dim this section when another section is hovered (not active)
  const isDimmed =
    hoveredSection !== null && hoveredSection !== id && !isActive;

  return (
    <div
      ref={ref}
      role="region"
      aria-label={id}
      aria-current={isActive ? "true" : undefined}
      tabIndex={0}
      onClick={() => focusSection(id)}
      onMouseEnter={() => setHoveredSection(id)}
      onMouseLeave={() => setHoveredSection(null)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          focusSection(id);
        }
      }}
      className={[
        "resume-section",
        isActive ? "section-active" : "",
        isHovered && !isActive ? "section-hovered" : "",
        isDimmed ? "section-dimmed" : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Edit affordance — shown on hover only */}
      {isHovered && !isActive && <EditChip />}
      {children}
    </div>
  );
}

// ─── Edit Chip ────────────────────────────────────────────────────────────────

/**
 * EditChip
 *
 * A small floating indicator that communicates "this section is interactive."
 * Appears in the top-right corner of a hovered section.
 */
function EditChip() {
  return (
    <div
      aria-hidden="true"
      className="edit-chip"
    >
      <Pencil size={10} strokeWidth={2} />
      <span>Edit</span>
    </div>
  );
}
