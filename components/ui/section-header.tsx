import React from "react";
import Badge from "./badge";

interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: "blue" | "navy" | "green" | "slate";
  badgeIcon?: React.ReactNode;
  title: string;
  description?: string;
  center?: boolean;
}

export default function SectionHeader({
  badge: badgeLabel,
  badgeVariant,
  badgeIcon,
  title,
  description,
  center = true,
}: SectionHeaderProps) {
  return (
    <div className={`space-y-4 ${center ? "text-center max-w-2xl mx-auto" : ""}`}>
      {badgeLabel && (
        <Badge variant={badgeVariant} icon={badgeIcon}>
          {badgeLabel}
        </Badge>
      )}
      <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-brand-navy leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-sm sm:text-base text-text-secondary font-normal max-w-xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
