"use client";

import { Controller, Control } from "react-hook-form";
import { ResumeContent } from "@/schemas/resume.schema";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { AIEnhanceButton } from "../AIEnhanceButton";

interface SummarySectionProps {
  control: Control<ResumeContent>;
}

export function SummarySection({ control }: SummarySectionProps) {
  const t = useTranslations("Builder");

  return (
    <section id="section-summary" className="animate-fadeIn">
      <SectionTitle>{t("summary")}</SectionTitle>
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
        <div className="flex justify-between items-center mb-1.5">
          <Label htmlFor="summary" className="font-medium text-[#0B132B]">
            {t("summary")}
          </Label>
        </div>
        <div className="relative group">
          <Controller
            control={control}
            name="summary"
            render={({ field }) => (
              <>
                <Textarea
                  {...field}
                  id="summary"
                  value={field.value ?? ""}
                  placeholder="e.g. Lead frontend engineer with 5 years experience..."
                  className="min-h-[120px] border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] text-sm text-[#0B132B] pb-10"
                />
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
                  <AIEnhanceButton
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    fieldName="summary"
                  />
                </div>
              </>
            )}
          />
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#64748B]">
      {children}
    </h2>
  );
}
