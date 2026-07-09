"use client";

import { Controller, Control, useFieldArray } from "react-hook-form";
import { ResumeContent } from "@/schemas/resume.schema";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface SkillsSectionProps {
  control: Control<ResumeContent>;
}

const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"] as const;

export function SkillsSection({ control }: SkillsSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  return (
    <section id="section-skills" className="scroll-mt-14">
      <SectionTitle>Skills</SectionTitle>
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 space-y-3">
        {fields.length > 0 && (
          <div className="grid grid-cols-[1fr_140px_32px] gap-2 mb-1">
            <Label className="text-xs">Skill name</Label>
            <Label className="text-xs">Level</Label>
            <span />
          </div>
        )}

        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-[1fr_140px_32px] gap-2 items-center">
            <Controller
              control={control}
              name={`skills.${index}.name`}
              render={({ field: f }) => (
                <Input {...f} value={f.value ?? ""} placeholder="e.g. Figma, React, Python" />
              )}
            />
            <Controller
              control={control}
              name={`skills.${index}.level`}
              render={({ field: f }) => (
                <Select {...f} value={f.value ?? ""} onChange={(e) => f.onChange(e.target.value)}>
                  <option value="">Level</option>
                  {SKILL_LEVELS.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </Select>
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
          onClick={() => append({ name: "", level: undefined })}
        >
          <Plus size={14} />
          Add Skill
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
