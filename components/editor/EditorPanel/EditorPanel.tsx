"use client";

import React, { useCallback } from "react";
import { Control } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ResumeContent } from "@/schemas/resume.schema";
import { PersonalInfoSection } from "./sections/PersonalInfoSection";
import { SummarySection } from "./sections/SummarySection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { EducationSection } from "./sections/EducationSection";
import { SkillsSection } from "./sections/SkillsSection";
import { FinalizeStep } from "./sections/FinalizeStep";
import { HorizontalStepper, type Step } from "./HorizontalStepper";
import { useResumeInteraction } from "@/components/editor/interaction/ResumeInteractionContext";

interface EditorPanelProps {
  control: Control<ResumeContent>;
  liveData: ResumeContent;
  currentStep: number;
  onStepChange: (step: number) => void;
}

// ─── Step config ──────────────────────────────────────────────────────────────

const STEPS: Step[] = [
  { id: "personalInfo", label: "Personal Info",  shortLabel: "Info" },
  { id: "summary",      label: "Summary",        shortLabel: "Summary" },
  { id: "experience",   label: "Experience",     shortLabel: "Experience" },
  { id: "education",    label: "Education",      shortLabel: "Education" },
  { id: "skills",       label: "Skills",         shortLabel: "Skills" },
  { id: "finalize",     label: "Finalize",       shortLabel: "Finalize" },
];

/** Returns 0–100 resume completeness score */
function computeCompleteness(data: ResumeContent): number {
  const checks = [
    !!(data.personalInfo?.firstName && data.personalInfo?.email),
    !!(data.summary && data.summary.trim().length > 30),
    !!(data.experience && data.experience.length > 0),
    !!(data.education && data.education.length > 0),
    !!(data.skills && data.skills.length >= 3),
    !!(
      (data.languages && data.languages.length > 0) ||
      (data.certifications && data.certifications.length > 0) ||
      (data.projects && data.projects.length > 0)
    ),
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

/** Returns a map of step.id → whether that step has some content */
function buildCompletionMap(data: ResumeContent): Record<string, boolean> {
  return {
    personalInfo: !!(data.personalInfo?.firstName || data.personalInfo?.email),
    summary: !!(data.summary && data.summary.trim().length > 10),
    experience: !!(data.experience && data.experience.length > 0),
    education: !!(data.education && data.education.length > 0),
    skills: !!(data.skills && data.skills.length > 0),
    finalize:
      !!(data.languages && data.languages.length > 0) ||
      !!(data.certifications && data.certifications.length > 0) ||
      !!(data.projects && data.projects.length > 0) ||
      !!(data.interests && data.interests.length > 0),
  };
}

/**
 * EditorPanel
 *
 * Left-pane workspace panel.
 * Architecture: linear step-based form driven by `currentStep` (controlled from EditorShell).
 * - `HorizontalStepper` sits at the top for navigation.
 * - The active step's form is rendered in the scrollable area below.
 * - Prev/Next buttons at the bottom.
 *
 * SOLID:
 * - Single Responsibility: only orchestrates step rendering and navigation.
 * - Open/Closed: new steps added by extending STEPS array + switch case.
 * - Dependency Inversion: depends on abstract Step config, not concrete components.
 */
export function EditorPanel({
  control,
  liveData,
  currentStep,
  onStepChange,
}: EditorPanelProps) {
  const completionMap = buildCompletionMap(liveData);
  const completenessScore = computeCompleteness(liveData);

  const { activeSection, focusSection } = useResumeInteraction();
  const isUserNavigatingRef = React.useRef(false);

  // Sync right-pane clicks -> left-pane steps
  React.useEffect(() => {
    if (isUserNavigatingRef.current) {
      isUserNavigatingRef.current = false;
      return;
    }
    const sectionToStep: Record<string, number> = {
      personalInfo: 0,
      summary: 1,
      experience: 2,
      education: 3,
      skills: 4,
      languages: 5,
      certifications: 5,
      projects: 5,
      interests: 5,
    };
    const targetStep = sectionToStep[activeSection];
    if (targetStep !== undefined && targetStep !== currentStep) {
      onStepChange(targetStep);
    }
  }, [activeSection]); // only trigger when activeSection changes from the right pane

  // Sync left-pane steps -> right-pane active section
  React.useEffect(() => {
    const stepToSection: Record<number, any> = {
      0: "personalInfo",
      1: "summary",
      2: "experience",
      3: "education",
      4: "skills",
    };
    const targetSection = stepToSection[currentStep];
    if (targetSection && targetSection !== activeSection) {
      focusSection(targetSection);
    }
  }, [currentStep, focusSection]); // remove activeSection to avoid reverse-trigger loops

  const handleStepChange = useCallback((step: number) => {
    isUserNavigatingRef.current = true;
    onStepChange(step);
  }, [onStepChange]);

  const goNext = useCallback(() => {
    handleStepChange(Math.min(currentStep + 1, STEPS.length - 1));
  }, [currentStep, handleStepChange]);

  const goPrev = useCallback(() => {
    handleStepChange(Math.max(currentStep - 1, 0));
  }, [currentStep, handleStepChange]);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-neutral-50">
      {/* ─── Stepper (sticky top) ─── */}
      <HorizontalStepper
        steps={STEPS}
        currentStep={currentStep}
        completionMap={completionMap}
        onStepChange={handleStepChange}
        completenessScore={completenessScore}
      />

      {/* ─── Step form area (scrollable) ─── */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="p-5 space-y-4"
          >
            {/* Step heading */}
            <div className="pb-1 border-b border-[#F1F5F9]">
              <h2 className="text-[13px] font-semibold text-[#0B132B]">
                {STEPS[currentStep]?.label}
              </h2>
              <p className="text-[11px] text-[#94A3B8] mt-0.5">
                <StepDescription stepId={STEPS[currentStep]?.id ?? ""} />
              </p>
            </div>

            {/* Section form */}
            <StepContent
              stepId={STEPS[currentStep]?.id ?? ""}
              control={control}
              liveData={liveData}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── Prev / Next navigation ─── */}
      <div className="flex-shrink-0 flex items-center justify-between px-5 py-3 border-t border-[#E2E8F0] bg-white">
        <button
          type="button"
          onClick={goPrev}
          disabled={currentStep === 0}
          className={[
            "flex items-center gap-1.5 text-[12px] font-semibold rounded-lg px-3 py-1.5 transition-all cursor-pointer",
            currentStep === 0
              ? "text-[#CBD5E1] cursor-not-allowed"
              : "text-[#64748B] hover:text-[#0B132B] hover:bg-[#F8FAFC]",
          ].join(" ")}
        >
          <ChevronLeft size={14} strokeWidth={2.5} />
          Previous
        </button>

        {/* Step count */}
        <span className="text-[10px] font-medium text-[#94A3B8] select-none">
          {currentStep + 1} / {STEPS.length}
        </span>

        {currentStep < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="flex items-center gap-1.5 text-[12px] font-semibold rounded-lg px-3 py-1.5 bg-[#2563EB] hover:bg-[#1d4ed8] text-white transition-all cursor-pointer"
          >
            Next
            <ChevronRight size={14} strokeWidth={2.5} />
          </button>
        ) : (
          <div className="w-20 flex items-center justify-end">
            <span className="text-[11px] font-semibold text-[#10B981]">✓ All done</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Step content router ──────────────────────────────────────────────────────

function StepContent({
  stepId,
  control,
  liveData,
}: {
  stepId: string;
  control: Control<ResumeContent>;
  liveData: ResumeContent;
}) {
  switch (stepId) {
    case "personalInfo":
      return <PersonalInfoSection control={control} />;
    case "summary":
      return <SummarySection control={control} />;
    case "experience":
      return <ExperienceSection control={control} />;
    case "education":
      return <EducationSection control={control} />;
    case "skills":
      return <SkillsSection control={control} />;
    case "finalize":
      return <FinalizeStep control={control} liveData={liveData} />;
    default:
      return null;
  }
}

// ─── Step descriptions ────────────────────────────────────────────────────────

function StepDescription({ stepId }: { stepId: string }) {
  const descriptions: Record<string, string> = {
    personalInfo: "Tell employers who you are and how to reach you.",
    summary: "A 2–4 sentence overview of your professional background.",
    experience: "Highlight your past roles, responsibilities, and impact.",
    education: "List your academic background and degrees.",
    skills: "Showcase your technical and soft skills.",
    finalize: "Add optional sections and review your resume.",
  };
  return <>{descriptions[stepId] ?? ""}</>;
}
