import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
}

/**
 * Shared section heading used across all EditorPanel sections.
 * Displays an uppercase label with consistent typographic treatment.
 */
export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#64748B]">
      {children}
    </h2>
  );
}
