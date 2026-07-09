"use client";

import { Controller, Control } from "react-hook-form";
import { ResumeContent } from "@/schemas/resume.schema";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface SummarySectionProps {
  control: Control<ResumeContent>;
}

export function SummarySection({ control }: SummarySectionProps) {
  return (
    <section id="section-summary" className="scroll-mt-14">
      <SectionTitle>Professional Summary</SectionTitle>
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
        <Label htmlFor="summary" className="mb-1.5 block">
          Summary
        </Label>
        <Controller
          control={control}
          name="summary"
          render={({ field }) => (
            <Textarea
              {...field}
              id="summary"
              value={field.value ?? ""}
              placeholder="A brief, compelling summary of your professional background and key strengths..."
              className="min-h-[120px]"
            />
          )}
        />
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
