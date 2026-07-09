"use client";

import { Control, UseFormRegister } from "react-hook-form";
import { ResumeContent } from "@/schemas/resume.schema";
import { EditorNav } from "./EditorNav";
import { PersonalInfoSection } from "./sections/PersonalInfoSection";
import { SummarySection } from "./sections/SummarySection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { EducationSection } from "./sections/EducationSection";
import { SkillsSection } from "./sections/SkillsSection";
import { LanguagesSection } from "./sections/LanguagesSection";
import { CertificationsSection } from "./sections/CertificationsSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { InterestsSection } from "./sections/InterestsSection";

interface EditorPanelProps {
  control: Control<ResumeContent>;
  register: UseFormRegister<ResumeContent>;
}

export function EditorPanel({ control, register }: EditorPanelProps) {
  return (
    <aside className="w-[500px] flex-shrink-0 flex flex-col border-r border-[#E2E8F0] overflow-hidden bg-[#F8FAFC]">
      <EditorNav />
      <div className="flex-1 overflow-y-auto p-6 space-y-10 scroll-smooth pb-24">
        <PersonalInfoSection control={control} register={register} />
        <SummarySection control={control} />
        <ExperienceSection control={control} />
        <EducationSection control={control} />
        <SkillsSection control={control} />
        <LanguagesSection control={control} />
        <CertificationsSection control={control} />
        <ProjectsSection control={control} />
        <InterestsSection control={control} />
      </div>
    </aside>
  );
}
