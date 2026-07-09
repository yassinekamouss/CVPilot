"use client";

import * as React from "react";
import { Check } from "lucide-react";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = "", label, id, ...props }, ref) => {
    return (
      <label
        htmlFor={id}
        className="flex items-center gap-2.5 cursor-pointer group"
      >
        <div className="relative flex-shrink-0">
          <input
            type="checkbox"
            id={id}
            ref={ref}
            className="peer sr-only"
            {...props}
          />
          <div
            className={`h-4 w-4 rounded border border-[#E2E8F0] bg-white transition-all
              peer-checked:bg-[#2563EB] peer-checked:border-[#2563EB]
              peer-focus:ring-2 peer-focus:ring-[#2563EB] peer-focus:ring-offset-1
              group-hover:border-[#2563EB] ${className}`}
          />
          <Check
            size={10}
            strokeWidth={3}
            className="pointer-events-none absolute inset-0 m-auto text-white opacity-0 peer-checked:opacity-100 transition-opacity"
          />
        </div>
        {label && (
          <span className="text-sm text-[#0B132B]">{label}</span>
        )}
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
