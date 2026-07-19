"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export interface Step {
  id: string;
  label: string;
  shortLabel: string;
}

interface HorizontalStepperProps {
  steps: Step[];
  currentStep: number;
  completionMap: Record<string, boolean>;
  onStepChange: (index: number) => void;
  /** Compact score bar: 0–100 */
  completenessScore: number;
}

/**
 * HorizontalStepper
 *
 * Pinned to the top of the left editor pane.
 * Shows numbered step chips connected by a progress track.
 * Completed steps show a check icon; active step is blue; future steps are neutral.
 * Clicking any chip navigates directly to that step.
 *
 * SOLID — Single Responsibility: navigation only, no form state.
 */
export function HorizontalStepper({
  steps,
  currentStep,
  completionMap,
  onStepChange,
  completenessScore,
}: HorizontalStepperProps) {
  const scoreColor =
    completenessScore >= 80
      ? "#10B981"
      : completenessScore >= 50
      ? "#F59E0B"
      : "#94A3B8";

  return (
    <div className="flex-shrink-0 bg-white border-b border-[#E2E8F0] px-4 pt-3 pb-2.5 select-none">
      {/* Step chips + connector track */}
      <div className="flex items-center gap-0">
        {steps.map((step, idx) => {
          const isCompleted = completionMap[step.id] && idx !== currentStep;
          const isActive = idx === currentStep;
          const isPast = idx < currentStep;

          return (
            <React.Fragment key={step.id}>
              {/* Step chip */}
              <button
                type="button"
                onClick={() => onStepChange(idx)}
                title={step.label}
                className="flex flex-col items-center gap-1 flex-shrink-0 group focus-visible:outline-none"
                aria-label={`Go to step ${idx + 1}: ${step.label}`}
                aria-current={isActive ? "step" : undefined}
              >
                {/* Circle */}
                <motion.div
                  animate={{
                    backgroundColor: isActive
                      ? "#2563EB"
                      : isCompleted || isPast
                      ? "#10B981"
                      : "#E2E8F0",
                    scale: isActive ? 1.08 : 1,
                  }}
                  transition={{ duration: 0.18 }}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold cursor-pointer"
                  style={{ color: isActive || isCompleted || isPast ? "#fff" : "#94A3B8" }}
                >
                  {isCompleted || isPast ? (
                    <Check size={11} strokeWidth={3} />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </motion.div>

                {/* Label */}
                <span
                  className={[
                    "text-[9px] font-semibold leading-none whitespace-nowrap transition-colors cursor-pointer",
                    isActive ? "text-[#2563EB]" : "text-[#94A3B8] group-hover:text-[#64748B]",
                  ].join(" ")}
                >
                  {step.shortLabel}
                </span>
              </button>

              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div className="flex-1 h-px mx-1 relative overflow-hidden bg-[#E2E8F0] rounded-full min-w-[8px]">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-[#10B981] rounded-full"
                    animate={{ width: isPast || isCompleted ? "100%" : "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Completeness bar */}
      <div className="flex items-center gap-2 mt-2.5">
        <span className="text-[9px] font-semibold text-[#94A3B8] uppercase tracking-wide whitespace-nowrap">
          Completeness
        </span>
        <div className="flex-1 h-1 bg-[#F1F5F9] rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: scoreColor }}
            animate={{ width: `${completenessScore}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <span
          className="text-[9px] font-bold tabular-nums"
          style={{ color: scoreColor }}
        >
          {completenessScore}%
        </span>
      </div>
    </div>
  );
}
