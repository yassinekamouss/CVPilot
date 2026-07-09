"use client";

import { Controller, Control, useFieldArray } from "react-hook-form";
import { ResumeContent } from "@/schemas/resume.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, GripVertical } from "lucide-react";

interface CertificationsSectionProps {
  control: Control<ResumeContent>;
}

export function CertificationsSection({ control }: CertificationsSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "certifications",
  });

  return (
    <section id="section-certifications" className="scroll-mt-14">
      <SectionTitle>Certifications</SectionTitle>
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-2xl border border-[#E2E8F0] bg-white p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#94A3B8]">
                <GripVertical size={14} />
                <span className="text-xs font-medium text-[#64748B]">Certification {index + 1}</span>
              </div>
              <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                <Trash2 size={13} />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor={`certifications.${index}.name`} className="mb-1.5 block">Certification Name</Label>
                <Controller
                  control={control}
                  name={`certifications.${index}.name`}
                  render={({ field: f }) => (
                    <Input {...f} id={`certifications.${index}.name`} value={f.value ?? ""} placeholder="AWS Certified Solutions Architect" />
                  )}
                />
              </div>

              <div>
                <Label htmlFor={`certifications.${index}.issuer`} className="mb-1.5 block">Issuer</Label>
                <Controller
                  control={control}
                  name={`certifications.${index}.issuer`}
                  render={({ field: f }) => (
                    <Input {...f} id={`certifications.${index}.issuer`} value={f.value ?? ""} placeholder="Amazon Web Services" />
                  )}
                />
              </div>

              <div>
                <Label htmlFor={`certifications.${index}.date`} className="mb-1.5 block">Date</Label>
                <Controller
                  control={control}
                  name={`certifications.${index}.date`}
                  render={({ field: f }) => (
                    <Input {...f} id={`certifications.${index}.date`} value={f.value ?? ""} placeholder="Jan 2023" />
                  )}
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full border-dashed"
          onClick={() => append({ name: "", issuer: "", date: "" })}
        >
          <Plus size={14} />
          Add Certification
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
