"use client";

import * as React from "react";

type ButtonVariant = "primary" | "outline" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#2563EB] text-white hover:bg-[#1d4ed8] active:bg-[#1e40af]",
  outline:
    "border border-[#E2E8F0] bg-white text-[#0B132B] hover:bg-[#F1F5F9] hover:border-[#CBD5E1]",
  ghost:
    "bg-transparent text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0B132B]",
  destructive:
    "bg-transparent text-[#64748B] hover:text-red-500 hover:bg-red-50",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  icon: "h-8 w-8 p-0 flex items-center justify-center",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className = "", variant = "primary", size = "md", children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 cursor-pointer ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
