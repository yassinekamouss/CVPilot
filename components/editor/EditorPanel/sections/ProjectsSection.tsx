"use client";

import { Controller, Control, useFieldArray } from "react-hook-form";
import { ResumeContent } from "@/schemas/resume.schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, GripVertical } from "lucide-react";

interface ProjectsSectionProps {
  control: Control<ResumeContent>;
}

export function ProjectsSection({ control }: ProjectsSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  return (
    <section id="section-projects" className="scroll-mt-14">
      <SectionTitle>Projects</SectionTitle>
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-2xl border border-[#E2E8F0] bg-white p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#94A3B8]">
                <GripVertical size={14} />
                <span className="text-xs font-medium text-[#64748B]">Project {index + 1}</span>
              </div>
              <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                <Trash2 size={13} />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor={`projects.${index}.name`} className="mb-1.5 block">Project Name</Label>
                <Controller
                  control={control}
                  name={`projects.${index}.name`}
                  render={({ field: f }) => (
                    <Input {...f} id={`projects.${index}.name`} value={f.value ?? ""} placeholder="AI SaaS Platform" />
                  )}
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor={`projects.${index}.link`} className="mb-1.5 block">Project Link (optional)</Label>
                <Controller
                  control={control}
                  name={`projects.${index}.link`}
                  render={({ field: f }) => (
                    <Input {...f} id={`projects.${index}.link`} value={f.value ?? ""} placeholder="https://github.com/username/project" />
                  )}
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor={`projects.${index}.description`} className="mb-1.5 block">Description (optional)</Label>
                <Controller
                  control={control}
                  name={`projects.${index}.description`}
                  render={({ field: f }) => (
                    <Textarea
                      {...f}
                      id={`projects.${index}.description`}
                      value={f.value ?? ""}
                      placeholder="Briefly describe the project, tech stack, and your role..."
                      className="min-h-[72px]"
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
          className="w-full border-dashed"
          onClick={() => append({ name: "", description: "", link: "" })}
        >
          <Plus size={14} />
          Add Project
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
