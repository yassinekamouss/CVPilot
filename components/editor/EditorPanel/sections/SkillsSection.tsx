"use client";

import { Controller, Control, useFieldArray } from "react-hook-form";
import { ResumeContent } from "@/schemas/resume.schema";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { AIEnhanceButton } from "../AIEnhanceButton";

interface SkillsSectionProps {
  control: Control<ResumeContent>;
}

const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"] as const;

export function SkillsSection({ control }: SkillsSectionProps) {
  const t = useTranslations("Builder");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  return (
    <section id="section-skills" className="animate-fadeIn">
      <SectionTitle>{t("skills")}</SectionTitle>
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 space-y-3 shadow-sm">
        {fields.length > 0 && (
          <div className="grid grid-cols-[1fr_140px_32px] gap-2 mb-1">
            <Label className="text-xs font-semibold text-[#64748B]">{t("skillName")}</Label>
            <Label className="text-xs font-semibold text-[#64748B]">{t("level")}</Label>
            <span />
          </div>
        )}

        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-[1fr_140px_32px] gap-2 items-center">
            <div className="relative group">
              <Controller
                control={control}
                name={`skills.${index}.name`}
                render={({ field: f }) => (
                  <>
                    <Input
                      {...f}
                      value={f.value ?? ""}
                      placeholder="e.g. Figma, React, Python"
                      className="h-10 pr-10 border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] text-sm text-[#0B132B]"
                    />
                    <div className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
                      <AIEnhanceButton
                        value={f.value ?? ""}
                        onChange={f.onChange}
                        fieldName="skills"
                      />
                    </div>
                  </>
                )}
              />
            </div>
            
            <Controller
              control={control}
              name={`skills.${index}.level`}
              render={({ field: f }) => (
                <Select
                  {...f}
                  value={f.value ?? ""}
                  onChange={(e) => f.onChange(e.target.value)}
                  className="h-10 border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] text-sm text-[#0B132B]"
                >
                  <option value="">{t("level")}</option>
                  {SKILL_LEVELS.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </Select>
              )}
            />
            
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => remove(index)}
              className="h-9 w-9 rounded-lg"
            >
              <Trash2 size={12} />
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full border-dashed border-[#E2E8F0] text-[#0B132B] hover:border-[#2563EB] hover:text-[#2563EB] duration-200 mt-2"
          onClick={() => append({ name: "", level: undefined })}
        >
          <Plus size={14} className="mr-1" />
          {t("addSkill")}
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
