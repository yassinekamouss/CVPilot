"use client";

import { Controller, Control, useFieldArray } from "react-hook-form";
import { ResumeContent } from "@/schemas/resume.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { CollapsibleCard } from "./CollapsibleCard";
import { RichTextEditor } from "./RichTextEditor";
import { AIEnhanceButton } from "../AIEnhanceButton";
import { FormField } from "../FormField";

interface ProjectsSectionProps {
  control: Control<ResumeContent>;
}

export function ProjectsSection({ control }: ProjectsSectionProps) {
  const t = useTranslations("Builder");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  return (
    <div className="space-y-2.5">
      {fields.map((field, index) => (
        <ProjectEntry
          key={field.id}
          index={index}
          control={control}
          onRemove={() => remove(index)}
          defaultOpen={!field.name}
        />
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ name: "", description: "", link: "" })}
        className="w-full h-8 rounded-lg border-dashed border-[#E2E8F0] text-[#64748B] hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-blue-50/50 transition-all font-medium text-xs"
      >
        <Plus size={12} className="mr-1.5" />
        {t("addProject")}
      </Button>
    </div>
  );
}

function ProjectEntry({
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
      name={`projects.${index}`}
      render={({ field: entryField }) => {
        const entry = entryField.value as any;
        const headline = entry?.name || "";
        let subline = "";
        try {
          subline = entry?.link ? new URL(entry.link).hostname : "";
        } catch {}

        return (
          <CollapsibleCard
            headline={headline}
            subline={subline}
            index={index + 1}
            onRemove={onRemove}
            removeLabel={t("delete")}
            defaultOpen={defaultOpen}
          >
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <FormField id={`proj-${index}-name`} label={t("projectName")}>
                  <Controller
                    control={control}
                    name={`projects.${index}.name`}
                    render={({ field: f }) => (
                      <Input
                        {...f}
                        id={`proj-${index}-name`}
                        value={f.value ?? ""}
                        placeholder="AI SaaS Platform"
                        className="h-8 text-sm border-[#E2E8F0] rounded-lg focus:ring-1 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-all placeholder:text-[#CBD5E1]"
                      />
                    )}
                  />
                </FormField>
                <FormField id={`proj-${index}-link`} label={t("projectLink")}>
                  <Controller
                    control={control}
                    name={`projects.${index}.link`}
                    render={({ field: f }) => (
                      <Input
                        {...f}
                        id={`proj-${index}-link`}
                        value={f.value ?? ""}
                        placeholder="https://github.com/..."
                        className="h-8 text-sm border-[#E2E8F0] rounded-lg focus:ring-1 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-all placeholder:text-[#CBD5E1]"
                      />
                    )}
                  />
                </FormField>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wide block">
                  {t("description")}
                </span>
                <Controller
                  control={control}
                  name={`projects.${index}.description`}
                  render={({ field }) => (
                    <>
                      <RichTextEditor
                        id={`proj-rte-${index}`}
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        placeholder="Briefly describe the project, tech stack, and your role…"
                        minHeight="80px"
                      />
                      <div className="flex justify-end mt-1.5">
                        <AIEnhanceButton
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          fieldName="projects"
                        />
                      </div>
                    </>
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
