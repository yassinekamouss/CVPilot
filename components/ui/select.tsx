"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={`flex h-10 w-full appearance-none rounded-lg border border-[#E2E8F0] bg-white px-3 pr-9 py-2 text-sm text-[#0B132B] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
          size={14}
        />
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };
