"use client";

import { Controller, Control, useFieldArray } from "react-hook-form";
import { ResumeContent } from "@/schemas/resume.schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionTitle } from "./SectionTitle";

interface EducationSectionProps {
  control: Control<ResumeContent>;
}

export function EducationSection({ control }: EducationSectionProps) {
  const t = useTranslations("Builder");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  return (
    <section id="section-education" className="animate-fadeIn">
      <SectionTitle>{t("education")}</SectionTitle>
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-2xl border border-[#E2E8F0] bg-white p-6 space-y-4 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#94A3B8]">
                <GripVertical size={14} />
                <span className="text-xs font-semibold text-[#64748B]">
                  {t("entry", { number: index + 1 })}
                </span>
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => remove(index)}
                className="h-7 w-7 rounded-lg"
              >
                <Trash2 size={13} />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <ControlledInput control={control} name={`education.${index}.school`} label={t("school")} placeholder="MIT" className="col-span-2" />
              <ControlledInput control={control} name={`education.${index}.degree`} label={t("degree")} placeholder="Bachelor of Science" />
              <ControlledInput control={control} name={`education.${index}.fieldOfStudy`} label={t("fieldOfStudy")} placeholder="Computer Science" />
              <ControlledInput control={control} name={`education.${index}.startDate`} label={t("startDate")} placeholder="Sep 2018" />
              <ControlledInput control={control} name={`education.${index}.endDate`} label={t("endDate")} placeholder="Jun 2022" />
            </div>

            <div>
              <Label htmlFor={`edu-desc-${index}`} className="mb-1.5 block font-medium text-[#0B132B]">
                {t("description")}
              </Label>
              <Controller
                control={control}
                name={`education.${index}.description`}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    id={`edu-desc-${index}`}
                    value={field.value ?? ""}
                    placeholder="Honors, relevant coursework, thesis..."
                    className="min-h-[72px] border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]"
                  />
                )}
              />
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full border-dashed border-[#E2E8F0] text-[#0B132B] hover:border-[#2563EB] hover:text-[#2563EB] duration-200"
          onClick={() =>
            append({ school: "", degree: "", fieldOfStudy: "", startDate: "", endDate: "", description: "" })
          }
        >
          <Plus size={14} className="mr-1" />
          {t("addEducation")}
        </Button>
      </div>
    </section>
  );
}

function ControlledInput({
  control,
  name,
  label,
  placeholder,
  className,
}: {
  control: Control<ResumeContent>;
  name: any;
  label: string;
  placeholder: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={name} className="mb-1.5 block font-medium text-[#0B132B]">{label}</Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input
            {...field}
            id={name}
            value={field.value ?? ""}
            placeholder={placeholder}
            className="h-10 border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]"
          />
        )}
      />
    </div>
  );
}


