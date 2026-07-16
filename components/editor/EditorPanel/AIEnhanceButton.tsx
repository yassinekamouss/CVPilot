"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Loader2, Check, Wand2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface AIEnhanceButtonProps {
  value: string;
  onChange: (val: string) => void;
  fieldName: "summary" | "experience" | "projects" | "skills";
  className?: string;
}

const REWRITES: Record<string, Record<string, string[]>> = {
  summary: {
    professional: [
      "Results-oriented Professional with 6+ years of expertise driving product lifecycle improvements, scaling modern UI platforms, and mentoring cross-functional engineering teams.",
      "Lead Software Architect specializing in frontend operations, cloud orchestration, and deploying highly optimized design systems that improve user conversion by up to 35%."
    ],
    action: [
      "Spearheaded enterprise-level design migrations, scaling frontend infrastructure by 40% while establishing robust TypeScript and Next.js testing patterns.",
      "Engineered responsive, highly performant web applications, slashing page load times by 50% and boosting overall customer satisfaction metrics."
    ],
    ats: [
      "ATS-compliant Frontend Engineer with core competencies in React, Next.js, TypeScript, GraphQL, Webpack, Tailwind CSS, CI/CD pipelines, and performance optimization."
    ]
  },
  experience: {
    professional: [
      "Spearheaded the engineering of the core application layout using Next.js and Tailwind CSS, increasing page load velocity by 45% and elevating SEO visibility rankings.",
      "Led technical execution of the dashboard refactoring, lowering bundle sizes by 35% and enhancing cross-browser compatibility across multiple core devices."
    ],
    action: [
      "Orchestrated cross-functional migration to Next.js App Router, driving developer velocity up by 25% and reducing system integration latency.",
      "Delivered production-ready TypeScript modules, cutting runtime errors by 40% and optimizing global state synchronization mechanisms."
    ],
    ats: [
      "Optimized frontend components using React and Tailwind CSS, ensuring 100% compliance with corporate accessibility (WCAG) and ATS performance benchmarks."
    ]
  },
  projects: {
    professional: [
      "Designed and deployed a state-of-the-art AI-powered editor, integrating real-time schema validation and responsive side-by-side rendering using Tailwind.",
      "Developed a robust full-stack resume optimizer platform, automating ATS score calculation and reducing database search query latency by 50%."
    ],
    action: [
      "Architected responsive split-pane editor system, boosting user retention rates by 30% and maximizing visual feedback consistency.",
      "Launched open-source Next.js template library, gaining 500+ GitHub stars and reducing project bootstrapping times for teams by 60%."
    ],
    ats: [
      "Created a scalable React application using TypeScript, Redux Toolkit, and standard REST/GraphQL APIs, fully optimized for search indexability and mobile compliance."
    ]
  },
  skills: {
    professional: [
      "React, Next.js, TypeScript, JavaScript, CSS3, Tailwind CSS",
      "State Management, Redux, Zustand, React Query, GraphQL"
    ],
    action: [
      "Frontend Development, Agile Methodologies, CI/CD, Jest Testing",
      "UI/UX Prototyping, Figma, Responsive Web Design, Web Accessibility"
    ],
    ats: [
      "React, Next.js, TypeScript, Tailwind CSS, REST APIs, Git, Unit Testing"
    ]
  }
};

export function AIEnhanceButton({ value, onChange, fieldName, className = "" }: AIEnhanceButtonProps) {
  const t = useTranslations("Builder");
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleEnhance = (tone: "professional" | "action" | "ats") => {
    setIsOpen(false);
    setStatus("loading");

    // Simulated API latency
    setTimeout(() => {
      let resultText = "";
      const currentText = value ? value.trim() : "";

      if (currentText.length < 5) {
        // Fallback to high-quality template
        const presets = REWRITES[fieldName]?.[tone] || REWRITES[fieldName]?.professional || [];
        resultText = presets[Math.floor(Math.random() * presets.length)];
      } else {
        // Rule-based rewriting
        resultText = currentText;
        
        const ruleReplacements = [
          { regex: /responsible for/gi, replacement: "Spearheaded" },
          { regex: /helped with/gi, replacement: "Collaborated on the optimization of" },
          { regex: /worked on/gi, replacement: "Designed and engineered" },
          { regex: /made/gi, replacement: "Developed and launched" },
          { regex: /did/gi, replacement: "Executed" },
          { regex: /fixed bugs in/gi, replacement: "Resolved critical performance defects in" },
          { regex: /increased/gi, replacement: "Accelerated" },
          { regex: /decreased/gi, replacement: "Minimized" },
          { regex: /use/gi, replacement: "Utilize" },
          { regex: /good at/gi, replacement: "Expert in" },
          { regex: /i was/gi, replacement: "Led efforts to" },
          { regex: /led/gi, replacement: "Orchestrated" }
        ];

        ruleReplacements.forEach(({ regex, replacement }) => {
          resultText = resultText.replace(regex, replacement);
        });

        // Inject professional metrics/details
        if (tone === "professional" && !resultText.includes("%")) {
          resultText += ", improving overall platform responsiveness and boosting load speed by 25%.";
        } else if (tone === "action" && !resultText.match(/(delivered|engineered|orchestrated|spearheaded)/i)) {
          resultText = "Orchestrated execution: " + resultText.charAt(0).toLowerCase() + resultText.slice(1);
        } else if (tone === "ats" && !resultText.match(/(ATS|standard|industry)/i)) {
          resultText += " (Aligned with industry ATS semantic keywords).";
        }
      }

      // Typewriter simulation
      let currentIdx = 0;
      onChange(""); // Clear first
      
      const interval = setInterval(() => {
        onChange(resultText.slice(0, currentIdx + 1));
        currentIdx++;
        if (currentIdx >= resultText.length) {
          clearInterval(interval);
          setStatus("success");
          setTimeout(() => setStatus("idle"), 2000);
        }
      }, 15);
    }, 1200);
  };

  return (
    <div className={`relative inline-block ${className}`} ref={menuRef}>
      {status === "loading" && (
        <button
          type="button"
          disabled
          className="rounded-full bg-[#0B132B]/5 border border-[#E2E8F0] px-3 py-1 flex items-center gap-1.5 text-xs font-semibold text-[#64748B] select-none cursor-not-allowed"
        >
          <Loader2 size={12} className="animate-spin text-[#2563EB]" />
          <span>{t("enhancing")}</span>
        </button>
      )}

      {status === "success" && (
        <button
          type="button"
          disabled
          className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 select-none animate-pulse"
        >
          <Check size={12} className="stroke-[3]" />
          <span>{t("aiSuccess")}</span>
        </button>
      )}

      {status === "idle" && (
        <>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full bg-white text-[#0B132B] border border-[#E2E8F0] shadow-sm hover:border-[#2563EB] hover:text-[#2563EB] px-3 py-1 flex items-center gap-1.5 text-xs font-semibold select-none cursor-pointer duration-200 transition-all active:scale-95 hover:shadow-md"
          >
            <Sparkles size={12} className="text-[#2563EB] fill-[#2563EB]/10" />
            <span>{t("enhanceWithAI")}</span>
          </button>

          {isOpen && (
            <div className="absolute right-0 bottom-full mb-2 w-56 rounded-xl border border-[#E2E8F0] bg-white p-1.5 shadow-xl z-50 animate-fadeIn origin-bottom-right">
              <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#64748B] mb-1">
                {t("selectAITone")}
              </div>
              <button
                type="button"
                onClick={() => handleEnhance("professional")}
                className="w-full text-left rounded-lg px-2.5 py-1.5 text-xs text-[#0B132B] hover:bg-[#F1F5F9] transition-colors flex items-center gap-2 cursor-pointer font-medium"
              >
                <Wand2 size={12} className="text-[#2563EB]" />
                <span>{t("toneProfessional")}</span>
              </button>
              <button
                type="button"
                onClick={() => handleEnhance("action")}
                className="w-full text-left rounded-lg px-2.5 py-1.5 text-xs text-[#0B132B] hover:bg-[#F1F5F9] transition-colors flex items-center gap-2 cursor-pointer font-medium"
              >
                <Sparkles size={12} className="text-amber-500" />
                <span>{t("toneActionOriented")}</span>
              </button>
              <button
                type="button"
                onClick={() => handleEnhance("ats")}
                className="w-full text-left rounded-lg px-2.5 py-1.5 text-xs text-[#0B132B] hover:bg-[#F1F5F9] transition-colors flex items-center gap-2 cursor-pointer font-medium"
              >
                <Check size={12} className="text-emerald-500" />
                <span>{t("toneAtsOptimized")}</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
