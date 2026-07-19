"use client";

import { Controller, Control, useFieldArray } from "react-hook-form";
import { ResumeContent } from "@/schemas/resume.schema";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { AIEnhanceButton } from "../AIEnhanceButton";

const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"] as const;

const LEVEL_COLORS: Record<string, string> = {
  Beginner: "#94A3B8",
  Intermediate: "#F59E0B",
  Advanced: "#2563EB",
  Expert: "#10B981",
};

interface SkillsSectionProps {
  control: Control<ResumeContent>;
}

export function SkillsSection({ control }: SkillsSectionProps) {
  const t = useTranslations("Builder");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  return (
    <div className="space-y-2">
      {/* Column headers */}
      {fields.length > 0 && (
        <div className="grid grid-cols-[1fr_110px_28px] gap-2 px-0.5">
          <span className="text-[9px] font-semibold uppercase tracking-wider text-[#94A3B8]">
            {t("skillName")}
          </span>
          <span className="text-[9px] font-semibold uppercase tracking-wider text-[#94A3B8]">
            {t("level")}
          </span>
          <span />
        </div>
      )}

      {/* Skill rows */}
      <div className="space-y-1.5">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-[1fr_110px_28px] gap-2 items-center"
          >
            {/* Skill name + AI enhance */}
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
                      className="h-8 rounded-lg border-[#E2E8F0] text-sm text-[#0B132B] pr-8 focus:ring-1 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-all placeholder:text-[#CBD5E1]"
                    />
                    <div className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
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

            {/* Level selector */}
            <Controller
              control={control}
              name={`skills.${index}.level`}
              render={({ field: f }) => (
                <Select
                  {...f}
                  value={f.value ?? ""}
                  onChange={(e) => f.onChange(e.target.value)}
                  className="h-8 rounded-lg border-[#E2E8F0] text-sm focus:ring-1 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-all appearance-none"
                  style={{ color: f.value ? LEVEL_COLORS[f.value] || "#0B132B" : "#94A3B8" }}
                >
                  <option value="">{t("level")}</option>
                  {SKILL_LEVELS.map((l) => (
                    <option key={l} value={l} style={{ color: "#0B132B" }}>
                      {l}
                    </option>
                  ))}
                </Select>
              )}
            />

            {/* Remove */}
            <button
              type="button"
              onClick={() => remove(index)}
              className="h-7 w-7 flex items-center justify-center rounded-lg text-[#CBD5E1] hover:text-red-400 hover:bg-red-50 transition-colors cursor-pointer flex-shrink-0"
            >
              <Trash2 size={12} />
            </button>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ name: "", level: undefined })}
        className="w-full h-8 rounded-lg border-dashed border-[#E2E8F0] text-[#64748B] hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-blue-50/50 transition-all font-medium text-xs"
      >
        <Plus size={12} className="mr-1.5" />
        {t("addSkill")}
      </Button>
    </div>
  );
}
