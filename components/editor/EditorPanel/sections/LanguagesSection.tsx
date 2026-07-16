"use client";

import { Controller, Control, useFieldArray } from "react-hook-form";
import { ResumeContent } from "@/schemas/resume.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

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
    <section id="section-languages" className="animate-fadeIn">
      <SectionTitle>{t("languages")}</SectionTitle>
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 space-y-3 shadow-sm">
        {fields.length > 0 && (
          <div className="grid grid-cols-[1fr_1fr_32px] gap-2 mb-1">
            <Label className="text-xs font-semibold text-[#64748B]">{t("languageName")}</Label>
            <Label className="text-xs font-semibold text-[#64748B]">{t("level")}</Label>
            <span />
          </div>
        )}

        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-[1fr_1fr_32px] gap-2 items-center">
            <Controller
              control={control}
              name={`languages.${index}.name`}
              render={({ field: f }) => (
                <Input
                  {...f}
                  value={f.value ?? ""}
                  placeholder="English"
                  className="h-10 border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]"
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
                  placeholder="Native, Fluent, B2..."
                  className="h-10 border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]"
                />
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
          onClick={() => append({ name: "", level: "" })}
        >
          <Plus size={14} className="mr-1" />
          {t("addLanguage")}
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
