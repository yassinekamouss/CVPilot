"use client";

import * as React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <textarea
        className={`flex min-h-[100px] w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0B132B] placeholder:text-[#94A3B8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 resize-y ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
