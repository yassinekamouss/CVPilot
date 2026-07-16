"use client";

import { Controller, Control, useFieldArray } from "react-hook-form";
import { ResumeContent } from "@/schemas/resume.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionTitle } from "./SectionTitle";

interface CertificationsSectionProps {
  control: Control<ResumeContent>;
}

export function CertificationsSection({ control }: CertificationsSectionProps) {
  const t = useTranslations("Builder");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "certifications",
  });

  return (
    <section id="section-certifications" className="animate-fadeIn">
      <SectionTitle>{t("certifications")}</SectionTitle>
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
              <div className="col-span-2">
                <Label htmlFor={`certifications.${index}.name`} className="mb-1.5 block font-medium text-[#0B132B]">
                  {t("certificationName")}
                </Label>
                <Controller
                  control={control}
                  name={`certifications.${index}.name`}
                  render={({ field: f }) => (
                    <Input
                      {...f}
                      id={`certifications.${index}.name`}
                      value={f.value ?? ""}
                      placeholder="AWS Certified Solutions Architect"
                      className="h-10 border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]"
                    />
                  )}
                />
              </div>

              <div>
                <Label htmlFor={`certifications.${index}.issuer`} className="mb-1.5 block font-medium text-[#0B132B]">
                  {t("issuer")}
                </Label>
                <Controller
                  control={control}
                  name={`certifications.${index}.issuer`}
                  render={({ field: f }) => (
                    <Input
                      {...f}
                      id={`certifications.${index}.issuer`}
                      value={f.value ?? ""}
                      placeholder="Amazon Web Services"
                      className="h-10 border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]"
                    />
                  )}
                />
              </div>

              <div>
                <Label htmlFor={`certifications.${index}.date`} className="mb-1.5 block font-medium text-[#0B132B]">
                  {t("date")}
                </Label>
                <Controller
                  control={control}
                  name={`certifications.${index}.date`}
                  render={({ field: f }) => (
                    <Input
                      {...f}
                      id={`certifications.${index}.date`}
                      value={f.value ?? ""}
                      placeholder="Jan 2023"
                      className="h-10 border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]"
                    />
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
          className="w-full border-dashed border-[#E2E8F0] text-[#0B132B] hover:border-[#2563EB] hover:text-[#2563EB] duration-200"
          onClick={() => append({ name: "", issuer: "", date: "" })}
        >
          <Plus size={14} className="mr-1" />
          {t("addCertification")}
        </Button>
      </div>
    </section>
  );
}


