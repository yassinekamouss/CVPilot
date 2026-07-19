"use client";

import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resumeContentSchema, type ResumeContent } from "@/schemas/resume.schema";
import { EditorPanel } from "./EditorPanel/EditorPanel";
import { PreviewPanel } from "./PreviewPanel/PreviewPanel";
import { BuilderTopBar } from "./BuilderTopBar";
import { TemplateModern } from "@/components/resume-templates/TemplateModern/TemplateModern";
import { PageOverflowToast } from "./PageOverflowToast";
import { ResumeInteractionProvider } from "@/components/editor/interaction/ResumeInteractionContext";

interface EditorShellProps {
  resumeId: string;
}

const DEFAULT_VALUES = {
  personalInfo: {
    firstName: "Sarah",
    lastName: "Conner",
    email: "sarah.conner@gmail.com",
    phone: "+1 (555) 382-9901",
    location: "Los Angeles, CA",
    jobTitle: "Senior Frontend Engineer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
  },
  summary: "<p>Highly skilled Frontend Architect with over 6 years of experience specializing in React, Next.js, and modern CSS frameworks. Proven track record of designing fluid user experiences, modular component libraries, and robust type-safe web applications.</p>",
  experience: [
    {
      company: "InnovateTech Solutions",
      position: "Lead Frontend Engineer",
      startDate: "Jan 2022",
      endDate: "",
      current: true,
      description: "<p>Spearheaded the migration of a legacy dashboard to Next.js App Router, increasing page load speed by 42% and developer velocity by 30%. Led a team of 4 junior developers and established code styling standards.</p>",
      bulletPoints: [
        "Designed and maintained a centralized design system using Tailwind and Radix UI.",
        "Implemented real-time data sync using WebSockets for live status updates.",
        "Optimized bundle sizes by 35% through dynamic imports and code splitting.",
      ],
    },
    {
      company: "Acme Corp",
      position: "Frontend Engineer",
      startDate: "Jan 2020",
      endDate: "Dec 2021",
      current: false,
      description: "<p>Developed and maintained customer-facing web applications using React and Redux.</p>",
      bulletPoints: [
        "Improved accessibility score from 75 to 98 across main flows.",
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
      description: "<p>Graduated with Honors. Specialized in Human-Computer Interaction and Software Engineering.</p>",
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
      description: "<p>Built the frontend of an interactive split-pane resume builder using React Hook Form.</p>",
      link: "https://github.com/cvpilot/editor",
    },
  ],
  interests: ["UI Design", "Open Source Contribution", "Hiking", "Photography"],
  customSections: [],
};

/**
 * EditorShell
 *
 * Root orchestrator for the resume builder page.
 *
 * Responsibilities:
 * - Wrap layout in <ResumeInteractionProvider>.
 * - Own the react-hook-form instance and live data.
 * - Own step navigation state (currentStep).
 * - Own page navigation state (currentPage, totalPages).
 * - Own mobile tab toggle state (activeTab).
 * - Show page-overflow toast when resume grows to 2+ pages.
 * - Compose BuilderTopBar, EditorPanel (left 50%), and PreviewPanel (right 50%).
 *
 * Auto-save has been intentionally removed.
 */
export function EditorShell({ resumeId: _resumeId }: EditorShellProps) {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [currentStep, setCurrentStep] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showOverflowToast, setShowOverflowToast] = useState(false);

  const { control, watch } = useForm<ResumeContent>({
    resolver: zodResolver(resumeContentSchema) as any,
    defaultValues: DEFAULT_VALUES as ResumeContent,
    mode: "onChange",
  });

  const liveData = watch();

  // ─── Page overflow detection ────────────────────────────────────────────────
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

  return (
    <ResumeInteractionProvider initialSection="personalInfo">
      <div className="flex h-screen w-screen overflow-hidden flex-col bg-neutral-100 font-sans">
        {/* Top bar */}
        <BuilderTopBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Split-pane workspace */}
        <div className="flex-1 flex overflow-hidden">
          {/* ─── Left Pane: Editor (50%) ─── */}
          <div
            className={[
              "w-full md:w-1/2 flex-shrink-0 border-r border-[#E2E8F0] flex flex-col",
              activeTab === "edit" ? "flex" : "hidden md:flex",
            ].join(" ")}
          >
            <EditorPanel
              control={control}
              liveData={liveData}
              currentStep={currentStep}
              onStepChange={setCurrentStep}
            />
          </div>

          {/* ─── Right Pane: Preview (50%) ─── */}
          <div
            className={[
              "md:w-1/2 flex-1",
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
