"use client";

import { Controller, Control } from "react-hook-form";
import { ResumeContent } from "@/schemas/resume.schema";
import { Input } from "@/components/ui/input";
import { FormField } from "../FormField";
import { useTranslations } from "next-intl";

interface PersonalInfoSectionProps {
  control: Control<ResumeContent>;
}

/**
 * PersonalInfoSection
 *
 * Compact 2-column grid for personal information fields.
 * Uses FormField wrapper with dense h-8 inputs.
 */
export function PersonalInfoSection({ control }: PersonalInfoSectionProps) {
  const t = useTranslations("Builder");

  return (
    <div className="space-y-3">
      {/* Row 1: Name */}
      <div className="grid grid-cols-2 gap-3">
        <FormField id="pi-firstName" label={t("firstName")}>
          <Controller
            control={control}
            name="personalInfo.firstName"
            render={({ field }) => (
              <Input
                {...field}
                id="pi-firstName"
                value={field.value ?? ""}
                placeholder="Jane"
                className="h-8 text-sm border-[#E2E8F0] rounded-lg focus:ring-1 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-all placeholder:text-[#CBD5E1]"
              />
            )}
          />
        </FormField>
        <FormField id="pi-lastName" label={t("lastName")}>
          <Controller
            control={control}
            name="personalInfo.lastName"
            render={({ field }) => (
              <Input
                {...field}
                id="pi-lastName"
                value={field.value ?? ""}
                placeholder="Smith"
                className="h-8 text-sm border-[#E2E8F0] rounded-lg focus:ring-1 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-all placeholder:text-[#CBD5E1]"
              />
            )}
          />
        </FormField>
      </div>

      {/* Row 2: Contact */}
      <div className="grid grid-cols-2 gap-3">
        <FormField id="pi-email" label={t("email")}>
          <Controller
            control={control}
            name="personalInfo.email"
            render={({ field }) => (
              <Input
                {...field}
                id="pi-email"
                type="email"
                value={field.value ?? ""}
                placeholder="jane@example.com"
                className="h-8 text-sm border-[#E2E8F0] rounded-lg focus:ring-1 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-all placeholder:text-[#CBD5E1]"
              />
            )}
          />
        </FormField>
        <FormField id="pi-phone" label={t("phone")}>
          <Controller
            control={control}
            name="personalInfo.phone"
            render={({ field }) => (
              <Input
                {...field}
                id="pi-phone"
                value={field.value ?? ""}
                placeholder="+1 (555) 000-0000"
                className="h-8 text-sm border-[#E2E8F0] rounded-lg focus:ring-1 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-all placeholder:text-[#CBD5E1]"
              />
            )}
          />
        </FormField>
      </div>

      {/* Row 3: Location + Job Title */}
      <div className="grid grid-cols-2 gap-3">
        <FormField id="pi-location" label={t("location")}>
          <Controller
            control={control}
            name="personalInfo.location"
            render={({ field }) => (
              <Input
                {...field}
                id="pi-location"
                value={field.value ?? ""}
                placeholder="San Francisco, CA"
                className="h-8 text-sm border-[#E2E8F0] rounded-lg focus:ring-1 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-all placeholder:text-[#CBD5E1]"
              />
            )}
          />
        </FormField>
        <FormField id="pi-jobTitle" label={t("jobTitle")}>
          <Controller
            control={control}
            name="personalInfo.jobTitle"
            render={({ field }) => (
              <Input
                {...field}
                id="pi-jobTitle"
                value={field.value ?? ""}
                placeholder="Senior Product Designer"
                className="h-8 text-sm border-[#E2E8F0] rounded-lg focus:ring-1 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-all placeholder:text-[#CBD5E1]"
              />
            )}
          />
        </FormField>
      </div>

      {/* Row 4: Avatar URL */}
      <FormField
        id="pi-avatar"
        label={t("avatar")}
        hint="Optional — paste a direct image URL (HTTPS)"
      >
        <Controller
          control={control}
          name="personalInfo.avatar"
          render={({ field }) => (
            <Input
              {...field}
              id="pi-avatar"
              value={field.value ?? ""}
              placeholder="https://example.com/photo.jpg"
              className="h-8 text-sm border-[#E2E8F0] rounded-lg focus:ring-1 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-all placeholder:text-[#CBD5E1]"
            />
          )}
        />
      </FormField>
    </div>
  );
}
