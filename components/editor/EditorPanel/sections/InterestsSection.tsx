"use client";

import { Controller, Control, useFieldArray } from "react-hook-form";
import { ResumeContent } from "@/schemas/resume.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface InterestsSectionProps {
  control: Control<ResumeContent>;
}

export function InterestsSection({ control }: InterestsSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "interests" as any,
  });

  return (
    <section id="section-interests" className="scroll-mt-14">
      <SectionTitle>Interests</SectionTitle>
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <Controller
              control={control}
              name={`interests.${index}` as any}
              render={({ field: f }) => (
                <Input {...f} value={f.value ?? ""} placeholder="e.g. Photography, Hiking, Chess" />
              )}
            />
            <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
              <Trash2 size={12} />
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full border-dashed mt-2"
          onClick={() => append("" as any)}
        >
          <Plus size={14} />
          Add Interest
        </Button>
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
