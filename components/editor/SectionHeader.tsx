"use client";

import React from "react";

interface SectionHeaderProps {
  title: string;
  description: string;
}

/**
 * SectionHeader
 *
 * Rendered at the top of each expanded accordion section.
 * Provides contextual guidance so the user understands what to fill in.
 */
export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="mb-5">
      <h2 className="text-base font-bold text-[#0B132B] leading-tight">{title}</h2>
      <p className="text-sm text-[#64748B] mt-1 leading-relaxed">{description}</p>
    </div>
  );
}
