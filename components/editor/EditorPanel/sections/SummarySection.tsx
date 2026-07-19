"use client";

import { Controller, Control } from "react-hook-form";
import { ResumeContent } from "@/schemas/resume.schema";
import { useTranslations } from "next-intl";
import { AIEnhanceButton } from "../AIEnhanceButton";
import { RichTextEditor } from "./RichTextEditor";

interface SummarySectionProps {
  control: Control<ResumeContent>;
}

/**
 * SummarySection
 *
 * Uses TipTap RichTextEditor for professional summary.
 * AI Enhance button sits below the editor.
 */
export function SummarySection({ control }: SummarySectionProps) {
  const t = useTranslations("Builder");

  return (
    <div className="space-y-2.5">
      <Controller
        control={control}
        name="summary"
        render={({ field }) => (
          <div className="space-y-2">
            <RichTextEditor
              id="rte-summary"
              value={field.value ?? ""}
              onChange={field.onChange}
              placeholder="e.g. Lead frontend engineer with 5 years of experience building fast, accessible web applications…"
              minHeight="120px"
            />
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-[#94A3B8]">
                Aim for 2–4 sentences. Focus on impact, not responsibilities.
              </p>
              <AIEnhanceButton
                value={field.value ?? ""}
                onChange={field.onChange}
                fieldName="summary"
              />
            </div>
          </div>
        )}
      />
    </div>
  );
}
