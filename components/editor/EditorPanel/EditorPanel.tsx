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
import {
  User,
  AlignLeft,
  Briefcase,
  GraduationCap,
  Cpu,
  Globe,
  Award,
  FolderGit,
  Heart,
} from "lucide-react";

interface EditorPanelProps {
  control: Control<ResumeContent>;
  activeSection: string;
  setActiveSection: (section: string) => void;
  /** Live form data used to compute per-section completion dots */
  liveData: ResumeContent;
}

interface SectionConfig {
  id: string;
  labelKey: string;
  icon: React.ElementType;
  /** Returns true if this section has at least one meaningful value */
  hasSomeContent: (data: ResumeContent) => boolean;
}

const SECTIONS: SectionConfig[] = [
  {
    id: "personalInfo",
    labelKey: "personalInfo",
    icon: User,
    hasSomeContent: (d) =>
      !!(d.personalInfo?.firstName || d.personalInfo?.email || d.personalInfo?.jobTitle),
  },
  {
    id: "summary",
    labelKey: "summary",
    icon: AlignLeft,
    hasSomeContent: (d) => !!(d.summary && d.summary.trim().length > 0),
  },
  {
    id: "experience",
    labelKey: "experience",
    icon: Briefcase,
    hasSomeContent: (d) => !!(d.experience && d.experience.length > 0),
  },
  {
    id: "education",
    labelKey: "education",
    icon: GraduationCap,
    hasSomeContent: (d) => !!(d.education && d.education.length > 0),
  },
  {
    id: "skills",
    labelKey: "skills",
    icon: Cpu,
    hasSomeContent: (d) => !!(d.skills && d.skills.length > 0),
  },
  {
    id: "languages",
    labelKey: "languages",
    icon: Globe,
    hasSomeContent: (d) => !!(d.languages && d.languages.length > 0),
  },
  {
    id: "certifications",
    labelKey: "certifications",
    icon: Award,
    hasSomeContent: (d) => !!(d.certifications && d.certifications.length > 0),
  },
  {
    id: "projects",
    labelKey: "projects",
    icon: FolderGit,
    hasSomeContent: (d) => !!(d.projects && d.projects.length > 0),
  },
  {
    id: "interests",
    labelKey: "interests",
    icon: Heart,
    hasSomeContent: (d) => !!(d.interests && d.interests.length > 0),
  },
];

/**
 * EditorPanel
 *
 * Responsibilities:
 * - Render the dark sidebar with icon navigation.
 * - Show a completion dot on each icon when the section has content.
 * - Render the active section form in the main scroll area.
 */
export function EditorPanel({
  control,
  activeSection,
  setActiveSection,
  liveData,
}: EditorPanelProps) {
  const t = useTranslations("Builder");

  return (
    <div className="flex flex-1 overflow-hidden h-full bg-[#F8FAFC]">
      {/* ─── Sidebar icon navigation ─── */}
      <aside className="w-[64px] sm:w-[72px] bg-[#0B132B] flex flex-col items-center py-4 gap-1.5 flex-shrink-0 z-10 border-r border-[#1D2D44]">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          const isDone = sec.hasSomeContent(liveData);

          return (
            <SidebarButton
              key={sec.id}
              isActive={isActive}
              isDone={isDone}
              label={t(sec.labelKey)}
              icon={sec.icon}
              onClick={() => setActiveSection(sec.id)}
            />
          );
        })}
      </aside>

      {/* ─── Active section form ─── */}
      <main className="flex-1 overflow-y-auto px-4 py-6 md:px-6 md:py-8 scroll-smooth pb-24">
        <div className="animate-fadeInSlide">
          {activeSection === "personalInfo" && <PersonalInfoSection control={control} />}
          {activeSection === "summary" && <SummarySection control={control} />}
          {activeSection === "experience" && <ExperienceSection control={control} />}
          {activeSection === "education" && <EducationSection control={control} />}
          {activeSection === "skills" && <SkillsSection control={control} />}
          {activeSection === "languages" && <LanguagesSection control={control} />}
          {activeSection === "certifications" && <CertificationsSection control={control} />}
          {activeSection === "projects" && <ProjectsSection control={control} />}
          {activeSection === "interests" && <InterestsSection control={control} />}
        </div>
      </main>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

interface SidebarButtonProps {
  isActive: boolean;
  isDone: boolean;
  label: string;
  icon: React.ElementType;
  onClick: () => void;
}

/**
 * SidebarButton
 *
 * A single icon button in the navigation sidebar.
 * - Active state: left blue accent bar + blue background.
 * - Done state: small green completion dot in the top-right corner.
 * - Tooltip on hover (desktop).
 */
function SidebarButton({ isActive, isDone, label, icon: Icon, onClick }: SidebarButtonProps) {
  return (
    <div className="relative w-full flex justify-center">
      {/* Left accent bar (active indicator) */}
      <div
        className={[
          "absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-full transition-all duration-300",
          isActive ? "h-7 bg-[#2563EB]" : "h-0 bg-transparent",
        ].join(" ")}
      />

      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className={[
          "w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] rounded-xl flex items-center justify-center",
          "cursor-pointer transition-all duration-200 relative outline-none group",
          isActive
            ? "bg-[#2563EB]/15 text-white"
            : "text-[#94A3B8] hover:text-white hover:bg-[#1D2D44]/60",
        ].join(" ")}
      >
        <Icon
          size={18}
          className={["transition-transform duration-200", isActive ? "scale-110" : "group-hover:scale-105"].join(" ")}
        />

        {/* Completion dot */}
        {isDone && (
          <span
            className={[
              "absolute top-2 right-2 h-[7px] w-[7px] rounded-full border border-[#0B132B]",
              isActive ? "bg-[#10B981] border-[#2563EB]/30" : "bg-[#10B981]",
            ].join(" ")}
          />
        )}

        {/* Tooltip */}
        <span className="absolute left-[calc(100%+10px)] bg-[#0B132B] text-white text-[10px] font-semibold px-2 py-1 rounded-lg shadow-lg border border-[#1D2D44] whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 hidden sm:block z-50">
          {label}
        </span>
      </button>
    </div>
  );
}
