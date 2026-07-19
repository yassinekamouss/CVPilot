"use client";

import { Controller, Control, useFieldArray } from "react-hook-form";
import { ResumeContent } from "@/schemas/resume.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { CollapsibleCard } from "./CollapsibleCard";
import { RichTextEditor } from "./RichTextEditor";
import { FormField } from "../FormField";

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
    <div className="space-y-2.5">
      {fields.map((field, index) => (
        <EducationEntry
          key={field.id}
          index={index}
          control={control}
          onRemove={() => remove(index)}
          defaultOpen={!field.school && !field.degree}
        />
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() =>
          append({ school: "", degree: "", fieldOfStudy: "", startDate: "", endDate: "", description: "" })
        }
        className="w-full h-8 rounded-lg border-dashed border-[#E2E8F0] text-[#64748B] hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-blue-50/50 transition-all font-medium text-xs"
      >
        <Plus size={12} className="mr-1.5" />
        {t("addEducation")}
      </Button>
    </div>
  );
}

function EducationEntry({
  index,
  control,
  onRemove,
  defaultOpen,
}: {
  index: number;
  control: Control<ResumeContent>;
  onRemove: () => void;
  defaultOpen: boolean;
}) {
  const t = useTranslations("Builder");

  return (
    <Controller
      control={control}
      name={`education.${index}`}
      render={({ field: entryField }) => {
        const entry = entryField.value as any;
        const headline = entry?.school || "";
        const subline = entry?.degree
          ? `${entry.degree}${entry.fieldOfStudy ? `, ${entry.fieldOfStudy}` : ""}`
          : "";
        const startDate = entry?.startDate || "";
        const endDate = entry?.endDate || "";
        const dateRange = startDate ? `${startDate}${endDate ? ` — ${endDate}` : ""}` : "";

        return (
          <CollapsibleCard
            headline={headline}
            subline={subline}
            dateRange={dateRange}
            index={index + 1}
            onRemove={onRemove}
            removeLabel={t("delete")}
            defaultOpen={defaultOpen}
          >
            <div className="space-y-3">
              {/* School */}
              <FormField id={`edu-${index}-school`} label={t("school")}>
                <Controller
                  control={control}
                  name={`education.${index}.school`}
                  render={({ field: f }) => (
                    <Input
                      {...f}
                      id={`edu-${index}-school`}
                      value={f.value ?? ""}
                      placeholder="MIT, Stanford, UC Berkeley…"
                      className="h-8 text-sm border-[#E2E8F0] rounded-lg focus:ring-1 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-all placeholder:text-[#CBD5E1]"
                    />
                  )}
                />
              </FormField>

              {/* Degree + Field */}
              <div className="grid grid-cols-2 gap-3">
                <FormField id={`edu-${index}-degree`} label={t("degree")}>
                  <Controller
                    control={control}
                    name={`education.${index}.degree`}
                    render={({ field: f }) => (
                      <Input
                        {...f}
                        id={`edu-${index}-degree`}
                        value={f.value ?? ""}
                        placeholder="Bachelor of Science"
                        className="h-8 text-sm border-[#E2E8F0] rounded-lg focus:ring-1 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-all placeholder:text-[#CBD5E1]"
                      />
                    )}
                  />
                </FormField>
                <FormField id={`edu-${index}-field`} label={t("fieldOfStudy")}>
                  <Controller
                    control={control}
                    name={`education.${index}.fieldOfStudy`}
                    render={({ field: f }) => (
                      <Input
                        {...f}
                        id={`edu-${index}-field`}
                        value={f.value ?? ""}
                        placeholder="Computer Science"
                        className="h-8 text-sm border-[#E2E8F0] rounded-lg focus:ring-1 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-all placeholder:text-[#CBD5E1]"
                      />
                    )}
                  />
                </FormField>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3">
                <FormField id={`edu-${index}-start`} label={t("startDate")}>
                  <Controller
                    control={control}
                    name={`education.${index}.startDate`}
                    render={({ field: f }) => (
                      <Input
                        {...f}
                        id={`edu-${index}-start`}
                        value={f.value ?? ""}
                        placeholder="Sep 2018"
                        className="h-8 text-sm border-[#E2E8F0] rounded-lg focus:ring-1 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-all placeholder:text-[#CBD5E1]"
                      />
                    )}
                  />
                </FormField>
                <FormField id={`edu-${index}-end`} label={t("endDate")}>
                  <Controller
                    control={control}
                    name={`education.${index}.endDate`}
                    render={({ field: f }) => (
                      <Input
                        {...f}
                        id={`edu-${index}-end`}
                        value={f.value ?? ""}
                        placeholder="Jun 2022"
                        className="h-8 text-sm border-[#E2E8F0] rounded-lg focus:ring-1 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-all placeholder:text-[#CBD5E1]"
                      />
                    )}
                  />
                </FormField>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wide block">
                  {t("description")}
                </span>
                <Controller
                  control={control}
                  name={`education.${index}.description`}
                  render={({ field }) => (
                    <RichTextEditor
                      id={`edu-rte-${index}`}
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      placeholder="Honors, relevant coursework, thesis…"
                      minHeight="70px"
                    />
                  )}
                />
              </div>
            </div>
          </CollapsibleCard>
        );
      }}
    />
  );
}
