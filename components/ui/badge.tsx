import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "navy" | "green" | "slate";
  icon?: React.ReactNode;
}

const variantStyles: Record<string, string> = {
  blue: "bg-brand-blue/5 border-brand-blue/10 text-brand-blue",
  navy: "bg-brand-navy/5 border-brand-navy/10 text-brand-navy",
  green: "bg-brand-green/5 border-brand-green/10 text-brand-green",
  slate: "bg-slate-100 text-[#64748B] border-[#E2E8F0]",
};

export default function Badge({ children, variant = "slate", icon }: BadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${variantStyles[variant]}`}
    >
      {icon && icon}
      <span>{children}</span>
    </div>
  );
}
