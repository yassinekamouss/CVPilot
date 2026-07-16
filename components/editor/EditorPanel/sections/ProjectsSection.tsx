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
import { AIEnhanceButton } from "../AIEnhanceButton";

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
    <section id="section-projects" className="animate-fadeIn">
      <SectionTitle>{t("projects")}</SectionTitle>
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-2xl border border-[#E2E8F0] bg-white p-6 space-y-4 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#94A3B8]">
                <GripVertical size={14} />
                <span className="text-xs font-semibold text-[#64748B]">
                  {t("project", { number: index + 1 })}
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
                <Label htmlFor={`projects.${index}.name`} className="mb-1.5 block font-medium text-[#0B132B]">
                  {t("projectName")}
                </Label>
                <Controller
                  control={control}
                  name={`projects.${index}.name`}
                  render={({ field: f }) => (
                    <Input
                      {...f}
                      id={`projects.${index}.name`}
                      value={f.value ?? ""}
                      placeholder="AI SaaS Platform"
                      className="h-10 border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]"
                    />
                  )}
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor={`projects.${index}.link`} className="mb-1.5 block font-medium text-[#0B132B]">
                  {t("projectLink")}
                </Label>
                <Controller
                  control={control}
                  name={`projects.${index}.link`}
                  render={({ field: f }) => (
                    <Input
                      {...f}
                      id={`projects.${index}.link`}
                      value={f.value ?? ""}
                      placeholder="https://github.com/username/project"
                      className="h-10 border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]"
                    />
                  )}
                />
              </div>

              <div className="col-span-2 relative group">
                <Label htmlFor={`projects.${index}.description`} className="mb-1.5 block font-medium text-[#0B132B]">
                  {t("description")}
                </Label>
                <Controller
                  control={control}
                  name={`projects.${index}.description`}
                  render={({ field: f }) => (
                    <>
                      <Textarea
                        {...f}
                        id={`projects.${index}.description`}
                        value={f.value ?? ""}
                        placeholder="Briefly describe the project, tech stack, and your role..."
                        className="min-h-[80px] border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] text-sm text-[#0B132B] pb-10"
                      />
                      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
                        <AIEnhanceButton
                          value={f.value ?? ""}
                          onChange={f.onChange}
                          fieldName="projects"
                        />
                      </div>
                    </>
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
          onClick={() => append({ name: "", description: "", link: "" })}
        >
          <Plus size={14} className="mr-1" />
          {t("addProject")}
        </Button>
      </div>
    </section>
  );
}


