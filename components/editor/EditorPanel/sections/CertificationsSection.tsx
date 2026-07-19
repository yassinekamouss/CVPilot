"use client";

import { Controller, Control, useFieldArray } from "react-hook-form";
import { ResumeContent } from "@/schemas/resume.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { CollapsibleCard } from "./CollapsibleCard";
import { FormField } from "../FormField";

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
    <div className="space-y-2.5">
      {fields.map((field, index) => (
        <CertificationEntry
          key={field.id}
          index={index}
          control={control}
          onRemove={() => remove(index)}
          defaultOpen={!field.name && !field.issuer}
        />
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ name: "", issuer: "", date: "" })}
        className="w-full h-8 rounded-lg border-dashed border-[#E2E8F0] text-[#64748B] hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-blue-50/50 transition-all font-medium text-xs"
      >
        <Plus size={12} className="mr-1.5" />
        {t("addCertification")}
      </Button>
    </div>
  );
}

function CertificationEntry({
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
      name={`certifications.${index}`}
      render={({ field: entryField }) => {
        const entry = entryField.value as any;
        const headline = entry?.name || "";
        const subline = entry?.issuer || "";
        const dateRange = entry?.date || "";

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
              <FormField id={`cert-${index}-name`} label={t("certificationName")}>
                <Controller
                  control={control}
                  name={`certifications.${index}.name`}
                  render={({ field: f }) => (
                    <Input
                      {...f}
                      id={`cert-${index}-name`}
                      value={f.value ?? ""}
                      placeholder="AWS Certified Solutions Architect"
                      className="h-8 text-sm border-[#E2E8F0] rounded-lg focus:ring-1 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-all placeholder:text-[#CBD5E1]"
                    />
                  )}
                />
              </FormField>

              <div className="grid grid-cols-2 gap-3">
                <FormField id={`cert-${index}-issuer`} label={t("issuer")}>
                  <Controller
                    control={control}
                    name={`certifications.${index}.issuer`}
                    render={({ field: f }) => (
                      <Input
                        {...f}
                        id={`cert-${index}-issuer`}
                        value={f.value ?? ""}
                        placeholder="Amazon Web Services"
                        className="h-8 text-sm border-[#E2E8F0] rounded-lg focus:ring-1 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-all placeholder:text-[#CBD5E1]"
                      />
                    )}
                  />
                </FormField>
                <FormField id={`cert-${index}-date`} label={t("date")}>
                  <Controller
                    control={control}
                    name={`certifications.${index}.date`}
                    render={({ field: f }) => (
                      <Input
                        {...f}
                        id={`cert-${index}-date`}
                        value={f.value ?? ""}
                        placeholder="Jan 2023"
                        className="h-8 text-sm border-[#E2E8F0] rounded-lg focus:ring-1 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-all placeholder:text-[#CBD5E1]"
                      />
                    )}
                  />
                </FormField>
              </div>
            </div>
          </CollapsibleCard>
        );
      }}
    />
  );
}
