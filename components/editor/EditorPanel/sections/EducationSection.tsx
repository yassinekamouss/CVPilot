"use client";

import { Controller, Control, useFieldArray } from "react-hook-form";
import { ResumeContent } from "@/schemas/resume.schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, GripVertical } from "lucide-react";

interface EducationSectionProps {
  control: Control<ResumeContent>;
}

export function EducationSection({ control }: EducationSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  return (
    <section id="section-education" className="scroll-mt-14">
      <SectionTitle>Education</SectionTitle>
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-2xl border border-[#E2E8F0] bg-white p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#94A3B8]">
                <GripVertical size={14} />
                <span className="text-xs font-medium text-[#64748B]">Entry {index + 1}</span>
              </div>
              <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                <Trash2 size={13} />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <ControlledInput control={control} name={`education.${index}.school`} label="School / University" placeholder="MIT" className="col-span-2" />
              <ControlledInput control={control} name={`education.${index}.degree`} label="Degree" placeholder="Bachelor of Science" />
              <ControlledInput control={control} name={`education.${index}.fieldOfStudy`} label="Field of Study" placeholder="Computer Science" />
              <ControlledInput control={control} name={`education.${index}.startDate`} label="Start Date" placeholder="Sep 2018" />
              <ControlledInput control={control} name={`education.${index}.endDate`} label="End Date" placeholder="Jun 2022" />
            </div>

            <div>
              <Label htmlFor={`edu-desc-${index}`} className="mb-1.5 block">Description (optional)</Label>
              <Controller
                control={control}
                name={`education.${index}.description`}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    id={`edu-desc-${index}`}
                    value={field.value ?? ""}
                    placeholder="Honors, relevant coursework, thesis..."
                    className="min-h-[72px]"
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
          className="w-full border-dashed"
          onClick={() =>
            append({ school: "", degree: "", fieldOfStudy: "", startDate: "", endDate: "", description: "" })
          }
        >
          <Plus size={14} />
          Add Education
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
      <Label htmlFor={name} className="mb-1.5 block">{label}</Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input {...field} id={name} value={field.value ?? ""} placeholder={placeholder} />
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
