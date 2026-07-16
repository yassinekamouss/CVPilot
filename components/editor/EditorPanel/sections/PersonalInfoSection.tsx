"use client";

import { Controller, Control } from "react-hook-form";
import { ResumeContent } from "@/schemas/resume.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

interface PersonalInfoSectionProps {
  control: Control<ResumeContent>;
}

export function PersonalInfoSection({ control }: PersonalInfoSectionProps) {
  const t = useTranslations("Builder");

  const fields: Array<{
    name: keyof NonNullable<ResumeContent["personalInfo"]>;
    labelKey: string;
    placeholder: string;
    type?: string;
  }> = [
    { name: "firstName", labelKey: "firstName", placeholder: "Jane" },
    { name: "lastName", labelKey: "lastName", placeholder: "Smith" },
    { name: "jobTitle", labelKey: "jobTitle", placeholder: "Senior Product Designer" },
    { name: "email", labelKey: "email", placeholder: "jane@example.com", type: "email" },
    { name: "phone", labelKey: "phone", placeholder: "+1 (555) 000-0000" },
    { name: "location", labelKey: "location", placeholder: "San Francisco, CA" },
    { name: "avatar", labelKey: "avatar", placeholder: "https://..." },
  ];

  return (
    <section id="section-personal" className="animate-fadeIn">
      <SectionTitle>{t("personalInfo")}</SectionTitle>
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {fields.map((field) => (
            <div
              key={field.name}
              className={field.name === "jobTitle" || field.name === "avatar" ? "col-span-2" : "col-span-1"}
            >
              <Label htmlFor={`personalInfo.${field.name}`} className="mb-1.5 block font-medium text-[#0B132B]">
                {t(field.labelKey)}
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
                    className="h-10 border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] text-sm text-[#0B132B]"
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
