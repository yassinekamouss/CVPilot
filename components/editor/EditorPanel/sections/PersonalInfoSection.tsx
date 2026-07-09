"use client";

import { Controller, Control, UseFormRegister } from "react-hook-form";
import { ResumeContent } from "@/schemas/resume.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PersonalInfoSectionProps {
  control: Control<ResumeContent>;
  register: UseFormRegister<ResumeContent>;
}

const fields: Array<{
  name: keyof NonNullable<ResumeContent["personalInfo"]>;
  label: string;
  placeholder: string;
  type?: string;
}> = [
  { name: "firstName", label: "First Name", placeholder: "Jane" },
  { name: "lastName", label: "Last Name", placeholder: "Smith" },
  { name: "jobTitle", label: "Job Title", placeholder: "Senior Product Designer" },
  { name: "email", label: "Email", placeholder: "jane@example.com", type: "email" },
  { name: "phone", label: "Phone", placeholder: "+1 (555) 000-0000" },
  { name: "location", label: "Location", placeholder: "San Francisco, CA" },
  { name: "avatar", label: "Avatar URL", placeholder: "https://..." },
];

export function PersonalInfoSection({ control }: PersonalInfoSectionProps) {
  return (
    <section id="section-personal" className="scroll-mt-14">
      <SectionTitle>Personal Information</SectionTitle>
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
        <div className="grid grid-cols-2 gap-4">
          {fields.map((field) => (
            <div
              key={field.name}
              className={field.name === "jobTitle" || field.name === "avatar" ? "col-span-2" : "col-span-1"}
            >
              <Label htmlFor={`personalInfo.${field.name}`} className="mb-1.5 block">
                {field.label}
              </Label>
              <Controller
                control={control}
                name={`personalInfo.${field.name}` as any}
                render={({ field: f }) => (
                  <Input
                    {...f}
                    id={`personalInfo.${field.name}`}
                    type={field.type ?? "text"}
                    placeholder={field.placeholder}
                    value={f.value ?? ""}
                  />
                )}
              />
            </div>
          ))}
        </div>
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
