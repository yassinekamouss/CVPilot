"use client";

import { Controller, Control, useFieldArray } from "react-hook-form";
import { ResumeContent } from "@/schemas/resume.schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, GripVertical } from "lucide-react";

interface ExperienceSectionProps {
  control: Control<ResumeContent>;
}

export function ExperienceSection({ control }: ExperienceSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  return (
    <section id="section-experience" className="scroll-mt-14">
      <SectionTitle>Work Experience</SectionTitle>
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
          className="w-full border-dashed"
        >
          <Plus size={14} />
          Add Experience
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
  const { fields: bulletFields, append: appendBullet, remove: removeBullet } =
    useFieldArray({ control, name: `experience.${index}.bulletPoints` as any });

  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 space-y-4">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2 text-[#94A3B8]">
          <GripVertical size={14} />
          <span className="text-xs font-medium text-[#64748B]">
            Entry {index + 1}
          </span>
        </div>
        <Button type="button" variant="destructive" size="icon" onClick={onRemove}>
          <Trash2 size={13} />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ControlledInput control={control} name={`experience.${index}.position`} label="Position" placeholder="Product Designer" />
        <ControlledInput control={control} name={`experience.${index}.company`} label="Company" placeholder="Acme Corp" />
        <ControlledInput control={control} name={`experience.${index}.startDate`} label="Start Date" placeholder="Jan 2022" />

        <Controller
          control={control}
          name={`experience.${index}.current`}
          render={({ field }) => (
            <div className="flex flex-col gap-1.5">
              <Label className="opacity-0 select-none">Current</Label>
              <div className="flex items-center h-10">
                <Checkbox
                  id={`exp-current-${index}`}
                  label="Currently working here"
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
                label="End Date"
                placeholder="Mar 2024"
              />
            )
          }
        />
      </div>

      <div>
        <Label htmlFor={`exp-desc-${index}`} className="mb-1.5 block">Description</Label>
        <Controller
          control={control}
          name={`experience.${index}.description`}
          render={({ field }) => (
            <Textarea
              {...field}
              id={`exp-desc-${index}`}
              value={field.value ?? ""}
              placeholder="Briefly describe your role and responsibilities..."
              className="min-h-[80px]"
            />
          )}
        />
      </div>

      {/* Bullet Points */}
      <div>
        <Label className="mb-2 block">Key Achievements</Label>
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
                  />
                )}
              />
              <Button type="button" variant="destructive" size="icon" onClick={() => removeBullet(bIndex)}>
                <Trash2 size={12} />
              </Button>
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="mt-2 text-[#2563EB] hover:text-[#1d4ed8] hover:bg-blue-50"
          onClick={() => appendBullet("" as any)}
        >
          <Plus size={12} />
          Add bullet point
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
      <Label htmlFor={name} className="mb-1.5 block">{label}</Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input
            {...field}
            id={name}
            value={field.value ?? ""}
            placeholder={placeholder}
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
