"use client";

import React from "react";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { ResumeContent } from "@/schemas/resume.schema";

interface ResumeScoreProps {
  data: ResumeContent;
}

interface SectionStatus {
  id: string;
  label: string;
  filled: boolean;
  required: boolean;
  suggestion?: string;
}

function computeSectionStatuses(data: ResumeContent): SectionStatus[] {
  return [
    {
      id: "personalInfo",
      label: "Personal Information",
      required: true,
      filled: !!(
        data.personalInfo?.firstName ||
        data.personalInfo?.email ||
        data.personalInfo?.jobTitle
      ),
    },
    {
      id: "summary",
      label: "Professional Summary",
      required: true,
      filled: !!(data.summary && data.summary.trim().length > 30),
      suggestion: "Add a 2–3 sentence summary",
    },
    {
      id: "experience",
      label: "Work Experience",
      required: true,
      filled: !!(data.experience && data.experience.length > 0),
      suggestion: "Add at least one position",
    },
    {
      id: "education",
      label: "Education",
      required: true,
      filled: !!(data.education && data.education.length > 0),
      suggestion: "Add your highest degree",
    },
    {
      id: "skills",
      label: "Skills",
      required: true,
      filled: !!(data.skills && data.skills.length >= 3),
      suggestion: "Add 3+ skills",
    },
    {
      id: "projects",
      label: "Projects",
      required: false,
      filled: !!(data.projects && data.projects.length > 0),
      suggestion: "Projects boost ATS matching",
    },
    {
      id: "certifications",
      label: "Certifications",
      required: false,
      filled: !!(data.certifications && data.certifications.length > 0),
      suggestion: "Certifications increase credibility",
    },
  ];
}

/**
 * ResumeScore
 *
 * A compact widget rendered above the live preview.
 * Shows a completion percentage and per-section status.
 */
export function ResumeScore({ data }: ResumeScoreProps) {
  const sections = computeSectionStatuses(data);
  const filledCount = sections.filter((s) => s.filled).length;
  const total = sections.length;
  const score = Math.round((filledCount / total) * 100);

  const scoreColor =
    score >= 80 ? "#10B981" : score >= 50 ? "#F59E0B" : "#64748B";

  return (
    <div className="mx-4 mt-3 mb-2 rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden">
      {/* Header row */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#F1F5F9]">
        <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
          Resume Score
        </span>
        <div className="flex items-center gap-2">
          {/* Circular-ish score badge */}
          <div
            className="text-sm font-bold tabular-nums"
            style={{ color: scoreColor }}
          >
            {score}%
          </div>
          {/* Mini bar */}
          <div className="w-20 h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${score}%`, backgroundColor: scoreColor }}
            />
          </div>
        </div>
      </div>

      {/* Section list */}
      <div className="px-4 py-2.5 grid grid-cols-2 gap-x-4 gap-y-1">
        {sections.map((sec) => (
          <div key={sec.id} className="flex items-center gap-1.5">
            {sec.filled ? (
              <CheckCircle2 size={11} className="text-[#10B981] flex-shrink-0" strokeWidth={2.5} />
            ) : (
              <AlertTriangle size={11} className="text-amber-400 flex-shrink-0" strokeWidth={2.5} />
            )}
            <span
              className={[
                "text-[10px] font-medium truncate",
                sec.filled ? "text-[#64748B]" : "text-amber-600",
              ].join(" ")}
            >
              {sec.filled ? sec.label : sec.suggestion ?? sec.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
