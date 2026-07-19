"use client";

import React from "react";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  /** Input id — must match the htmlFor of the label */
  id: string;
  label: string;
  /** Optional hint shown below the field */
  hint?: string;
  children: React.ReactNode;
  /** Extra classes on the wrapper div */
  className?: string;
}

/**
 * FormField
 *
 * A shared, compact labeled-input wrapper used across all editor sections.
 * Eliminates the duplicated `ControlledInput` pattern present in every section file.
 *
 * SOLID — Single Responsibility: renders label + children + optional hint.
 * SOLID — Open/Closed: any input (Input, Select, Textarea, RichTextEditor) works as `children`.
 */
export function FormField({ id, label, hint, children, className = "" }: FormFieldProps) {
  return (
    <div className={`space-y-1 ${className}`}>
      <Label
        htmlFor={id}
        className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wide block"
      >
        {label}
      </Label>
      {children}
      {hint && (
        <p className="text-[10px] text-[#94A3B8] leading-tight">{hint}</p>
      )}
    </div>
  );
}
