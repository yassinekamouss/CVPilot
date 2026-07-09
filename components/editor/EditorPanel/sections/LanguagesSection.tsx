"use client";

import { Controller, Control, useFieldArray } from "react-hook-form";
import { ResumeContent } from "@/schemas/resume.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface LanguagesSectionProps {
  control: Control<ResumeContent>;
}

export function LanguagesSection({ control }: LanguagesSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "languages",
  });

  return (
    <section id="section-languages" className="scroll-mt-14">
      <SectionTitle>Languages</SectionTitle>
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 space-y-3">
        {fields.length > 0 && (
          <div className="grid grid-cols-[1fr_1fr_32px] gap-2 mb-1">
            <Label className="text-xs">Language</Label>
            <Label className="text-xs">Proficiency</Label>
            <span />
          </div>
        )}

        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-[1fr_1fr_32px] gap-2 items-center">
            <Controller
              control={control}
              name={`languages.${index}.name`}
              render={({ field: f }) => (
                <Input {...f} value={f.value ?? ""} placeholder="English" />
              )}
            />
            <Controller
              control={control}
              name={`languages.${index}.level`}
              render={({ field: f }) => (
                <Input {...f} value={f.value ?? ""} placeholder="Native, Fluent, B2..." />
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
          onClick={() => append({ name: "", level: "" })}
        >
          <Plus size={14} />
          Add Language
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
