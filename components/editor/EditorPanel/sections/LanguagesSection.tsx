"use client";

import { Controller, Control, useFieldArray } from "react-hook-form";
import { ResumeContent } from "@/schemas/resume.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { FormField } from "../FormField";

interface LanguagesSectionProps {
  control: Control<ResumeContent>;
}

export function LanguagesSection({ control }: LanguagesSectionProps) {
  const t = useTranslations("Builder");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "languages",
  });

  return (
    <div className="space-y-2">
      {fields.length > 0 && (
        <div className="grid grid-cols-[1fr_1fr_28px] gap-2 px-0.5">
          <span className="text-[9px] font-semibold uppercase tracking-wider text-[#94A3B8]">
            {t("languageName")}
          </span>
          <span className="text-[9px] font-semibold uppercase tracking-wider text-[#94A3B8]">
            {t("level")}
          </span>
          <span />
        </div>
      )}

      <div className="space-y-1.5">
        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-[1fr_1fr_28px] gap-2 items-center">
            <Controller
              control={control}
              name={`languages.${index}.name`}
              render={({ field: f }) => (
                <Input
                  {...f}
                  value={f.value ?? ""}
                  placeholder="English"
                  className="h-8 text-sm border-[#E2E8F0] rounded-lg focus:ring-1 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-all placeholder:text-[#CBD5E1]"
                />
              )}
            />
            <Controller
              control={control}
              name={`languages.${index}.level`}
              render={({ field: f }) => (
                <Input
                  {...f}
                  value={f.value ?? ""}
                  placeholder="Native, B2, Fluent…"
                  className="h-8 text-sm border-[#E2E8F0] rounded-lg focus:ring-1 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-all placeholder:text-[#CBD5E1]"
                />
              )}
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="h-7 w-7 flex items-center justify-center rounded-lg text-[#CBD5E1] hover:text-red-400 hover:bg-red-50 transition-colors cursor-pointer"
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
        onClick={() => append({ name: "", level: "" })}
        className="w-full h-8 rounded-lg border-dashed border-[#E2E8F0] text-[#64748B] hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-blue-50/50 transition-all font-medium text-xs"
      >
        <Plus size={12} className="mr-1.5" />
        {t("addLanguage")}
      </Button>
    </div>
  );
}
