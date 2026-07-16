"use client";

import { Controller, Control, useFieldArray } from "react-hook-form";
import { ResumeContent } from "@/schemas/resume.schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { useTranslations } from "next-intl";
import { AIEnhanceButton } from "../AIEnhanceButton";

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
    <section id="section-experience" className="animate-fadeIn">
      <SectionTitle>{t("experience")}</SectionTitle>
      <div className="space-y-4">
        {fields.map((field, index) => (
          <ExperienceEntry
            key={field.id}
            index={index}
            control={control}
            onRemove={() => remove(index)}
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
          className="w-full border-dashed border-[#E2E8F0] text-[#0B132B] hover:border-[#2563EB] hover:text-[#2563EB] duration-200"
        >
          <Plus size={14} className="mr-1" />
          {t("addExperience")}
        </Button>
      </div>
    </section>
  );
}

function ExperienceEntry({
  index,
  control,
  onRemove,
}: {
  index: number;
  control: Control<ResumeContent>;
  onRemove: () => void;
}) {
  const t = useTranslations("Builder");
  const { fields: bulletFields, append: appendBullet, remove: removeBullet } =
    useFieldArray({ control, name: `experience.${index}.bulletPoints` as any });

  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 space-y-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between mb-1">
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
          onClick={onRemove}
          className="h-7 w-7 rounded-lg"
        >
          <Trash2 size={13} />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ControlledInput control={control} name={`experience.${index}.position`} label={t("position")} placeholder="Product Designer" />
        <ControlledInput control={control} name={`experience.${index}.company`} label={t("company")} placeholder="Acme Corp" />
        <ControlledInput control={control} name={`experience.${index}.startDate`} label={t("startDate")} placeholder="Jan 2022" />

        <Controller
          control={control}
          name={`experience.${index}.current`}
          render={({ field }) => (
            <div className="flex flex-col gap-1.5">
              <Label className="opacity-0 select-none hidden md:block">Current</Label>
              <div className="flex items-center h-10">
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

        <Controller
          control={control}
          name={`experience.${index}.current`}
          render={({ field: currentField }) =>
            currentField.value ? (
              <></>
            ) : (
              <ControlledInput
                control={control}
                name={`experience.${index}.endDate`}
                label={t("endDate")}
                placeholder="Mar 2024"
              />
            )
          }
        />
      </div>

      <div className="relative group">
        <Label htmlFor={`exp-desc-${index}`} className="mb-1.5 block font-medium text-[#0B132B]">
          {t("description")}
        </Label>
        <Controller
          control={control}
          name={`experience.${index}.description`}
          render={({ field }) => (
            <>
              <Textarea
                {...field}
                id={`exp-desc-${index}`}
                value={field.value ?? ""}
                placeholder="Briefly describe your role and responsibilities..."
                className="min-h-[90px] border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] text-sm text-[#0B132B] pb-10"
              />
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
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

      {/* Bullet Points */}
      <div>
        <Label className="mb-2 block font-medium text-[#0B132B]">{t("bulletPoints")}</Label>
        <div className="space-y-2">
          {bulletFields.map((bullet, bIndex) => (
            <div key={bullet.id} className="flex items-center gap-2">
              <span className="text-[#2563EB] mt-0.5 flex-shrink-0">•</span>
              <Controller
                control={control}
                name={`experience.${index}.bulletPoints.${bIndex}` as any}
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    placeholder="Increased conversion rate by 32%..."
                    className="h-9 border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]"
                  />
                )}
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeBullet(bIndex)}
                className="h-8 w-8 rounded-lg flex-shrink-0"
              >
                <Trash2 size={12} />
              </Button>
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="mt-2 text-[#2563EB] hover:text-[#1d4ed8] hover:bg-blue-50 font-medium"
          onClick={() => appendBullet("" as any)}
        >
          <Plus size={12} className="mr-1" />
          {t("addBulletPoint")}
        </Button>
      </div>
    </div>
  );
}

function ControlledInput({
  control,
  name,
  label,
  placeholder,
}: {
  control: Control<ResumeContent>;
  name: any;
  label: string;
  placeholder: string;
}) {
  return (
    <div>
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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#64748B]">
      {children}
    </h2>
  );
}
