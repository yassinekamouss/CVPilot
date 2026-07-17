"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resumeContentSchema, type ResumeContent } from "@/schemas/resume.schema";
import { EditorPanel } from "./EditorPanel/EditorPanel";
import { PreviewPanel } from "./PreviewPanel/PreviewPanel";
import { EditorTopBar } from "./EditorTopBar";
import { TemplateModern } from "@/components/resume-templates/TemplateModern/TemplateModern";
import { PageOverflowToast } from "./PageOverflowToast";
import { ResumeInteractionProvider } from "@/components/editor/interaction/ResumeInteractionContext";

interface EditorShellProps {
  resumeId: string;
}

const DEFAULT_VALUES: ResumeContent = {
  personalInfo: {
    firstName: "Sarah",
    lastName: "Conner",
    email: "sarah.conner@gmail.com",
    phone: "+1 (555) 382-9901",
    location: "Los Angeles, CA",
    jobTitle: "Senior Frontend Engineer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
  },
  summary: "Highly skilled Frontend Architect with over 6 years of experience specializing in React, Next.js, and modern CSS frameworks. Proven track record of designing fluid user experiences, modular component libraries, and robust type-safe web applications.",
  experience: [
    {
      company: "InnovateTech Solutions",
      position: "Lead Frontend Engineer",
      startDate: "Jan 2022",
      endDate: "",
      current: true,
      description: "Spearheaded the migration of a legacy dashboard to Next.js App Router, increasing page load speed by 42% and developer velocity by 30%. Led a team of 4 junior developers and established code styling standards.",
      bulletPoints: [
        "Designed and maintained a centralized design system using Tailwind and Radix UI.",
        "Implemented real-time data sync using WebSockets for live status updates.",
        "Optimized bundle sizes by 35% through dynamic imports and code splitting.",
      ],
    },
    {
      company: "InnovateTech Solutions",
      position: "Lead Frontend Engineer",
      startDate: "Jan 2022",
      endDate: "",
      current: true,
      description: "Spearheaded the migration of a legacy dashboard to Next.js App Router, increasing page load speed by 42% and developer velocity by 30%. Led a team of 4 junior developers and established code styling standards.",
      bulletPoints: [
        "Designed and maintained a centralized design system using Tailwind and Radix UI.",
        "Implemented real-time data sync using WebSockets for live status updates.",
        "Optimized bundle sizes by 35% through dynamic imports and code splitting.",
      ],
    },
    {
      company: "InnovateTech Solutions",
      position: "Lead Frontend Engineer",
      startDate: "Jan 2022",
      endDate: "",
      current: true,
      description: "Spearheaded the migration of a legacy dashboard to Next.js App Router, increasing page load speed by 42% and developer velocity by 30%. Led a team of 4 junior developers and established code styling standards.",
      bulletPoints: [
        "Designed and maintained a centralized design system using Tailwind and Radix UI.",
        "Implemented real-time data sync using WebSockets for live status updates.",
        "Optimized bundle sizes by 35% through dynamic imports and code splitting.",
      ],
    },
  ],
  education: [
    {
      school: "University of California, Berkeley",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      startDate: "Sep 2016",
      endDate: "Jun 2020",
      description: "Graduated with Honors. Specialized in Human-Computer Interaction and Software Engineering.",
    },
    {
      school: "University of California, Berkeley",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      startDate: "Sep 2016",
      endDate: "Jun 2020",
      description: "Graduated with Honors. Specialized in Human-Computer Interaction and Software Engineering.",
    },
  ],
  skills: [
    { name: "TypeScript", level: "Expert" },
    { name: "React / Next.js", level: "Expert" },
    { name: "CSS / Tailwind", level: "Advanced" },
    { name: "GraphQL / Node.js", level: "Intermediate" },
  ],
  languages: [
    { name: "English", level: "Native" },
    { name: "Spanish", level: "Conversational" },
  ],
  certifications: [
    { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", date: "Feb 2023" },
  ],
  projects: [
    {
      name: "CVPilot Editor",
      description: "Built the frontend of an interactive split-pane resume builder using React Hook Form.",
      link: "https://github.com/cvpilot/editor",
    },
    {
      name: "CVPilot Editor",
      description: "Built the frontend of an interactive split-pane resume builder using React Hook Form.",
      link: "https://github.com/cvpilot/editor",
    },

    {
      name: "CVPilot Editor",
      description: "Built the frontend of an interactive split-pane resume builder using React Hook Form.",
      link: "https://github.com/cvpilot/editor",
    },
    {
      name: "CVPilot Editor",
      description: "Built the frontend of an interactive split-pane resume builder using React Hook Form.",
      link: "https://github.com/cvpilot/editor",
    },

    {
      name: "CVPilot Editor",
      description: "Built the frontend of an interactive split-pane resume builder using React Hook Form.",
      link: "https://github.com/cvpilot/editor",
    },


    {
      name: "CVPilot Editor",
      description: "Built the frontend of an interactive split-pane resume builder using React Hook Form.",
      link: "https://github.com/cvpilot/editor",
    },
    {
      name: "CVPilot Editor",
      description: "Built the frontend of an interactive split-pane resume builder using React Hook Form.",
      link: "https://github.com/cvpilot/editor",
    },
    {
      name: "CVPilot Editor",
      description: "Built the frontend of an interactive split-pane resume builder using React Hook Form.",
      link: "https://github.com/cvpilot/editor",
    },
    {
      name: "CVPilot Editor",
      description: "Built the frontend of an interactive split-pane resume builder using React Hook Form.",
      link: "https://github.com/cvpilot/editor",
    },
  ],
  interests: ["UI Design", "Open Source Contribution", "Hiking", "Photography"],
};

/**
 * EditorShell
 *
 * The root orchestrator for the resume builder page.
 *
 * Responsibilities:
 * - Wrap the entire layout in <ResumeInteractionProvider> (activeSection lives there).
 * - Own the react-hook-form instance and live data.
 * - Own page navigation state (currentPage, totalPages).
 * - Own mobile tab toggle state (activeTab).
 * - Compute section completion for the top bar.
 * - Show the page-overflow toast when the resume grows to 2+ pages.
 * - Compose EditorTopBar, EditorPanel, and PreviewPanel.
 */
export function EditorShell({ resumeId: _resumeId }: EditorShellProps) {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showOverflowToast, setShowOverflowToast] = useState(false);

  const { control, watch } = useForm<ResumeContent>({
    resolver: zodResolver(resumeContentSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onChange",
  });

  const liveData = watch();

  // ─── Page overflow detection ───────────────────────────────────────────────
  const prevTotalPagesRef = React.useRef(1);

  const handleTotalPages = useCallback((total: number) => {
    setTotalPages(total);
    if (total > 1 && prevTotalPagesRef.current === 1) {
      setShowOverflowToast(true);
    }
    prevTotalPagesRef.current = total;
    if (total === 1) setCurrentPage(1);
    setCurrentPage((p) => Math.min(p, total));
  }, []);

  // ─── Section completion ────────────────────────────────────────────────────
  const filledSections = computeFilledSections(liveData);
  const TOTAL_SECTIONS = 9;

  return (
    // ResumeInteractionProvider owns activeSection and the sectionRefs registry.
    // Both EditorPanel and ResumeSection (inside templates) consume this context.
    <ResumeInteractionProvider initialSection="personalInfo">
      <div className="flex h-screen w-screen overflow-hidden flex-col bg-white">
        {/* Global command bar */}
        <EditorTopBar
          filledSections={filledSections}
          totalSections={TOTAL_SECTIONS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Split-pane layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Editor (Left Pane) */}
          <div
            className={[
              "w-full md:w-[460px] lg:w-[500px] flex-shrink-0 border-r border-[#E2E8F0]",
              activeTab === "edit" ? "flex" : "hidden md:flex",
            ].join(" ")}
          >
            <EditorPanel control={control} liveData={liveData} />
          </div>

          {/* Live Preview (Right Pane) */}
          <div
            className={[
              "flex-1",
              activeTab === "preview" ? "flex" : "hidden md:flex",
            ].join(" ")}
          >
            <PreviewPanel
              data={liveData}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              onTotalPages={handleTotalPages}
            >
              <TemplateModern data={liveData} />
            </PreviewPanel>
          </div>
        </div>

        {/* Page overflow toast */}
        {showOverflowToast && (
          <PageOverflowToast onClose={() => setShowOverflowToast(false)} />
        )}
      </div>
    </ResumeInteractionProvider>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function computeFilledSections(data: ResumeContent): number {
  let count = 0;
  const pi = data.personalInfo;
  if (pi && (pi.firstName || pi.lastName || pi.email || pi.jobTitle)) count++;
  if (data.summary && data.summary.trim().length > 0) count++;
  if (data.experience && data.experience.length > 0) count++;
  if (data.education && data.education.length > 0) count++;
  if (data.skills && data.skills.length > 0) count++;
  if (data.languages && data.languages.length > 0) count++;
  if (data.certifications && data.certifications.length > 0) count++;
  if (data.projects && data.projects.length > 0) count++;
  if (data.interests && data.interests.length > 0) count++;
  return count;
}
