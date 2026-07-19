"use client";

import { Controller, Control, useFieldArray } from "react-hook-form";
import { ResumeContent } from "@/schemas/resume.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface InterestsSectionProps {
  control: Control<ResumeContent>;
}

export function InterestsSection({ control }: InterestsSectionProps) {
  const t = useTranslations("Builder");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "interests" as any,
  });

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-1.5">
            <Controller
              control={control}
              name={`interests.${index}` as any}
              render={({ field: f }) => (
                <Input
                  {...f}
                  value={f.value ?? ""}
                  placeholder="e.g. Photography, Hiking…"
                  className="h-8 rounded-lg border-[#E2E8F0] text-sm text-[#0B132B] focus:ring-1 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-all placeholder:text-[#CBD5E1]"
                />
              )}
            />
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
        onClick={() => append("" as any)}
        className="w-full h-8 rounded-lg border-dashed border-[#E2E8F0] text-[#64748B] hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-blue-50/50 transition-all font-medium text-xs mt-1"
      >
        <Plus size={12} className="mr-1.5" />
        {t("addInterest")}
      </Button>
    </div>
  );
}
