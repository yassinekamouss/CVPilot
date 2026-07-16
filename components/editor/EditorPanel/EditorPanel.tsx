"use client";

import { Control } from "react-hook-form";
import { ResumeContent } from "@/schemas/resume.schema";
import { PersonalInfoSection } from "./sections/PersonalInfoSection";
import { SummarySection } from "./sections/SummarySection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { EducationSection } from "./sections/EducationSection";
import { SkillsSection } from "./sections/SkillsSection";
import { LanguagesSection } from "./sections/LanguagesSection";
import { CertificationsSection } from "./sections/CertificationsSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { InterestsSection } from "./sections/InterestsSection";
import { useTranslations } from "next-intl";
import { User, AlignLeft, Briefcase, GraduationCap, Cpu, Globe, Award, FolderGit, Heart } from "lucide-react";

interface EditorPanelProps {
  control: Control<ResumeContent>;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const SECTIONS = [
  { id: "personalInfo", labelKey: "personalInfo", icon: User },
  { id: "summary", labelKey: "summary", icon: AlignLeft },
  { id: "experience", labelKey: "experience", icon: Briefcase },
  { id: "education", labelKey: "education", icon: GraduationCap },
  { id: "skills", labelKey: "skills", icon: Cpu },
  { id: "languages", labelKey: "languages", icon: Globe },
  { id: "certifications", labelKey: "certifications", icon: Award },
  { id: "projects", labelKey: "projects", icon: FolderGit },
  { id: "interests", labelKey: "interests", icon: Heart },
];

export function EditorPanel({ control, activeSection, setActiveSection }: EditorPanelProps) {
  const t = useTranslations("Builder");

  return (
    <div className="flex flex-1 overflow-hidden h-full bg-[#F8FAFC]">
      {/* Side Section Navigation */}
      <aside className="w-[72px] sm:w-[80px] bg-[#0B132B] flex flex-col items-center py-6 gap-2.5 flex-shrink-0 z-10 border-r border-[#1D2D44]">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          const IconComponent = sec.icon;

          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveSection(sec.id)}
              className={`w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-300 relative group outline-none ${
                isActive
                  ? "bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/25"
                  : "text-[#94A3B8] hover:text-white hover:bg-[#1D2D44]/60"
              }`}
            >
              <IconComponent size={18} className={`duration-300 ${isActive ? "scale-110" : "group-hover:scale-105"}`} />
              <span className="text-[8px] sm:text-[9px] font-semibold leading-none tracking-tight truncate max-w-full px-1">
                {t(sec.labelKey)}
              </span>
              
              {/* Tooltip on hover */}
              <div className="absolute left-[78px] bg-[#0B132B] text-white text-[10px] font-medium px-2 py-1 rounded shadow-lg border border-[#1D2D44] whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 duration-200 translate-x-1 group-hover:translate-x-0 hidden sm:block z-50">
                {t(sec.labelKey)}
              </div>
            </button>
          );
        })}
      </aside>

      {/* Active Section Content */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8 scroll-smooth pb-24">
        {activeSection === "personalInfo" && <PersonalInfoSection control={control} />}
        {activeSection === "summary" && <SummarySection control={control} />}
        {activeSection === "experience" && <ExperienceSection control={control} />}
        {activeSection === "education" && <EducationSection control={control} />}
        {activeSection === "skills" && <SkillsSection control={control} />}
        {activeSection === "languages" && <LanguagesSection control={control} />}
        {activeSection === "certifications" && <CertificationsSection control={control} />}
        {activeSection === "projects" && <ProjectsSection control={control} />}
        {activeSection === "interests" && <InterestsSection control={control} />}
      </main>
    </div>
  );
}
