"use client";

import { Controller, Control, useFieldArray } from "react-hook-form";
import { ResumeContent } from "@/schemas/resume.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { CollapsibleCard } from "./CollapsibleCard";
import { AIEnhanceButton } from "../AIEnhanceButton";
import { RichTextEditor } from "./RichTextEditor";
import { FormField } from "../FormField";

interface ExperienceSectionProps {
  control: Control<ResumeContent>;
}

export function ExperienceSection({ control }: ExperienceSectionProps) {
  const t = useTranslations("Builder");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  return (
    <div className="space-y-2.5">
      {fields.map((field, index) => (
        <ExperienceEntry
          key={field.id}
          index={index}
          control={control}
          onRemove={() => remove(index)}
          defaultOpen={!field.company && !field.position}
        />
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() =>
          append({
            company: "",
            position: "",
            startDate: "",
            endDate: "",
            current: false,
            description: "",
            bulletPoints: [],
          })
        }
        className="w-full h-8 rounded-lg border-dashed border-[#E2E8F0] text-[#64748B] hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-blue-50/50 transition-all font-medium text-xs"
      >
        <Plus size={12} className="mr-1.5" />
        {t("addExperience")}
      </Button>
    </div>
  );
}

function ExperienceEntry({
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
  const { fields: bulletFields, append: appendBullet, remove: removeBullet } =
    useFieldArray({ control, name: `experience.${index}.bulletPoints` as any });

  return (
    <Controller
      control={control}
      name={`experience.${index}`}
      render={({ field: entryField }) => {
        const entry = entryField.value as any;
        const headline = entry?.company || "";
        const subline = entry?.position || "";
        const startDate = entry?.startDate || "";
        const endDate = entry?.current ? t("present") : (entry?.endDate || "");
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
            {/* Fields grid */}
            <div className="grid grid-cols-2 gap-3">
              <FormField id={`exp-${index}-position`} label={t("position")}>
                <Controller
                  control={control}
                  name={`experience.${index}.position`}
                  render={({ field: f }) => (
                    <Input
                      {...f}
                      id={`exp-${index}-position`}
                      value={f.value ?? ""}
                      placeholder="Product Designer"
                      className="h-8 text-sm border-[#E2E8F0] rounded-lg focus:ring-1 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-all placeholder:text-[#CBD5E1]"
                    />
                  )}
                />
              </FormField>
              <FormField id={`exp-${index}-company`} label={t("company")}>
                <Controller
                  control={control}
                  name={`experience.${index}.company`}
                  render={({ field: f }) => (
                    <Input
                      {...f}
                      id={`exp-${index}-company`}
                      value={f.value ?? ""}
                      placeholder="Acme Corp"
                      className="h-8 text-sm border-[#E2E8F0] rounded-lg focus:ring-1 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-all placeholder:text-[#CBD5E1]"
                    />
                  )}
                />
              </FormField>
              <FormField id={`exp-${index}-startDate`} label={t("startDate")}>
                <Controller
                  control={control}
                  name={`experience.${index}.startDate`}
                  render={({ field: f }) => (
                    <Input
                      {...f}
                      id={`exp-${index}-startDate`}
                      value={f.value ?? ""}
                      placeholder="Jan 2022"
                      className="h-8 text-sm border-[#E2E8F0] rounded-lg focus:ring-1 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-all placeholder:text-[#CBD5E1]"
                    />
                  )}
                />
              </FormField>

              {/* Current toggle */}
              <Controller
                control={control}
                name={`experience.${index}.current`}
                render={({ field }) => (
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wide block opacity-0 select-none">
                      &nbsp;
                    </span>
                    <div className="flex items-center h-8">
                      <Checkbox
                        id={`exp-current-${index}`}
                        label={t("currentlyWorking")}
                        checked={field.value ?? false}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    </div>
                  </div>
                )}
              />

              {/* End date */}
              <Controller
                control={control}
                name={`experience.${index}.current`}
                render={({ field: currentField }) =>
                  currentField.value ? (
                    <></>
                  ) : (
                    <FormField id={`exp-${index}-endDate`} label={t("endDate")}>
                      <Controller
                        control={control}
                        name={`experience.${index}.endDate`}
                        render={({ field: f }) => (
                          <Input
                            {...f}
                            id={`exp-${index}-endDate`}
                            value={f.value ?? ""}
                            placeholder="Mar 2024"
                            className="h-8 text-sm border-[#E2E8F0] rounded-lg focus:ring-1 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-all placeholder:text-[#CBD5E1]"
                          />
                        )}
                      />
                    </FormField>
                  )
                }
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wide block">
                {t("description")}
              </span>
              <Controller
                control={control}
                name={`experience.${index}.description`}
                render={({ field }) => (
                  <>
                    <RichTextEditor
                      id={`exp-rte-${index}`}
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      placeholder="Briefly describe your role and key responsibilities…"
                      minHeight="90px"
                    />
                    <div className="flex justify-end">
                      <AIEnhanceButton
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        fieldName="experience"
                      />
                    </div>
                  </>
                )}
              />
            </div>

            {/* Bullet points */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wide block">
                {t("bulletPoints")}
              </span>
              <div className="space-y-1.5">
                {bulletFields.map((bullet, bIndex) => (
                  <div key={bullet.id} className="flex items-center gap-2">
                    <span className="text-[#2563EB] text-sm flex-shrink-0">•</span>
                    <Controller
                      control={control}
                      name={`experience.${index}.bulletPoints.${bIndex}` as any}
                      render={({ field }) => (
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          placeholder="Increased conversion rate by 32%…"
                          className="flex-1 h-8 rounded-lg border-[#E2E8F0] text-sm focus:ring-1 focus:ring-[#2563EB]/50 focus:border-[#2563EB]"
                        />
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => removeBullet(bIndex)}
                      className="h-7 w-7 flex items-center justify-center rounded-lg text-[#CBD5E1] hover:text-red-400 hover:bg-red-50 transition-colors cursor-pointer flex-shrink-0"
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => appendBullet("" as any)}
                className="flex items-center gap-1 text-xs font-medium text-[#2563EB] hover:text-[#1d4ed8] hover:bg-blue-50 px-2 py-1 rounded-lg transition-colors cursor-pointer"
              >
                <Plus size={11} />
                {t("addBulletPoint")}
              </button>
            </div>
          </CollapsibleCard>
        );
      }}
    />
  );
}
