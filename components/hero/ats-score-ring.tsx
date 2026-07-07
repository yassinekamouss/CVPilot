"use client";

import React, { forwardRef } from "react";

const CIRCLE_R = 24;
const CIRCLE_C = 2 * Math.PI * CIRCLE_R;

interface AtsScoreRingProps {
  circleRef?: React.RefObject<SVGCircleElement | null>;
  scoreNumberRef?: React.RefObject<HTMLSpanElement | null>;
  circlePercentRef?: React.RefObject<HTMLSpanElement | null>;
}

export default function AtsScoreRing({
  circleRef,
  scoreNumberRef,
  circlePercentRef,
}: AtsScoreRingProps) {
  return (
    <div className="flex items-center justify-between border-t border-brand-navy/5 pt-4" style={{ transform: "translateZ(50px)" }}>
      <div className="space-y-0.5">
        <span className="text-[9px] text-text-secondary uppercase tracking-widest font-bold">
          Diagnostic Score ATS
        </span>
        <div className="flex items-baseline gap-0.5">
          <span
            ref={scoreNumberRef}
            className="text-2xl font-heading font-extrabold text-brand-green"
            style={{ willChange: "opacity" }}
          >
            0
          </span>
          <span className="text-[10px] text-text-secondary font-medium">/100</span>
        </div>
      </div>

      <div className="relative w-14 h-14 flex items-center justify-center">
        <svg className="w-full h-full" style={{ transform: "rotate(-90deg)" }}>
          <circle
            cx="28"
            cy="28"
            r={CIRCLE_R}
            className="stroke-slate-100"
            strokeWidth="4"
            fill="transparent"
          />
          <circle
            ref={circleRef}
            cx="28"
            cy="28"
            r={CIRCLE_R}
            className="stroke-brand-green"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={CIRCLE_C}
            strokeDashoffset={CIRCLE_C}
            strokeLinecap="round"
            style={{ willChange: "stroke-dashoffset" }}
          />
        </svg>
        <span
          ref={circlePercentRef}
          className="absolute text-[10px] font-heading font-bold text-brand-green"
          style={{ willChange: "opacity" }}
        >
          0%
        </span>
      </div>
    </div>
  );
}
