"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Activity, Check, FileText, BarChart, ChevronRight, ArrowRight } from "lucide-react";
import LaptopMockup from "./laptop-mockup";

const phases = [
  {
    id: "scan",
    title: "Analyse Structurelle",
    subtitle: "Phase 01 — Extraction",
    desc: "Notre moteur déconstruit votre CV pour identifier les lacunes de formatage et évaluer sa lisibilité par les algorithmes de recrutement.",
  },
  {
    id: "alignment",
    title: "Calibrage ATS",
    subtitle: "Phase 02 — Mapping",
    desc: "Comparaison sémantique instantanée entre vos expériences et les exigences techniques du poste cible pour garantir l'alignement des mots-clés.",
  },
  {
    id: "rewrite",
    title: "Ingénierie STAR",
    subtitle: "Phase 03 — Optimisation",
    desc: "Restructuration de vos accomplissements en affirmations quantifiées et orientées impact, maximisant votre taux de conversion en entretien.",
  },
];

export default function WorkflowContent() {
  const [activePhase, setActivePhase] = React.useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const scannerLineRef = useRef<HTMLDivElement>(null);
  const diffBubbleRef = useRef<HTMLDivElement>(null);
  const typedTextRef = useRef<HTMLParagraphElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const handlePhaseSelect = (idx: number) => {
    setActivePhase(idx);
    if (timelineRef.current) {
      timelineRef.current.play(`phase-${idx}`);
    }
  };

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.inOut" } });
        timelineRef.current = tl;
        tl.addLabel("phase-0")
          .call(() => setActivePhase(0))
          .fromTo(scannerLineRef.current, { top: "0%", opacity: 0 }, { top: "100%", opacity: 1, duration: 2.5, ease: "power1.inOut" })
          .to(scannerLineRef.current, { opacity: 0, duration: 0.2 })
          .addLabel("phase-1")
          .call(() => setActivePhase(1), undefined, "+=0.2")
          .to({ val: 0 }, { val: 1, duration: 1.5 })
          .addLabel("phase-2")
          .call(() => setActivePhase(2), undefined, "+=1.5")
          .fromTo(typedTextRef.current, { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.8 }, "+=0.3")
          .fromTo(diffBubbleRef.current, { opacity: 0, y: 10, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.5)" }, "-=0.2")
          .to({ val: 0 }, { val: 1, duration: 4.5 });
        return () => tl.kill();
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="how-it-works" className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-[#64748B] text-xs font-semibold tracking-wide uppercase border border-[#E2E8F0]">
            <Activity className="w-3.5 h-3.5" /> Technologie Propriétaire
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-brand-navy leading-tight">
            La science du recrutement, automatisée.
          </h2>
          <p className="text-sm sm:text-base text-text-secondary font-normal max-w-xl mx-auto leading-relaxed">
            Découvrez comment notre moteur d'intelligence artificielle analyse, calibre et réécrit votre profil pour le transformer en une candidature prioritaire.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-4 relative">
            <div className="sticky top-24 flex flex-col border-l border-slate-200 ml-2 md:ml-4">
              {phases.map((phase, idx) => (
                <button
                  key={phase.id}
                  onClick={() => handlePhaseSelect(idx)}
                  className={`group relative w-full text-left py-6 pl-8 pr-4 transition-all duration-500 ${
                    activePhase === idx ? "bg-gradient-to-r from-blue-50/50 to-transparent" : "hover:bg-slate-50/40"
                  }`}
                >
                  <div className={`absolute left-[-1px] top-0 bottom-0 w-[2px] bg-[#2563EB] origin-top transition-transform duration-500 ease-out ${
                    activePhase === idx ? "scale-y-100" : "scale-y-0"
                  }`} />
                  <div className={`absolute -left-[5px] top-8 w-2 h-2 rounded-full transition-all duration-500 ring-4 ring-white ${
                    activePhase === idx ? "bg-[#2563EB] scale-125 shadow-sm shadow-blue-500/50" : "bg-slate-200 scale-100 group-hover:bg-slate-300"
                  }`} />
                  <div className="flex flex-col gap-1.5">
                    <p className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${
                      activePhase === idx ? "text-[#2563EB]" : "text-slate-400 group-hover:text-slate-500"
                    }`}>
                      {phase.subtitle}
                    </p>
                    <h3 className={`text-xl md:text-2xl font-semibold tracking-tight transition-colors duration-300 ${
                      activePhase === idx ? "text-[#0B132B]" : "text-slate-400 group-hover:text-slate-600"
                    }`}>
                      {phase.title}
                    </h3>
                  </div>
                  <div className={`grid transition-all duration-500 ease-in-out ${
                    activePhase === idx ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
                  }`}>
                    <div className="overflow-hidden">
                      <p className="text-sm text-[#64748B] leading-relaxed pr-4">{phase.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 relative">
            <LaptopMockup>
              <div className="w-full md:w-[35%] bg-[#0B132B] border-r border-slate-800 flex flex-col z-20 h-full overflow-hidden">
                <div className="p-3 border-b border-slate-800 shrink-0">
                  <h3 className="text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-1">Cible d&apos;analyse</h3>
                  <p className="text-xs text-white font-medium flex items-center gap-1.5 truncate">
                    Senior Frontend Eng. <ChevronRight className="w-3 h-3 text-slate-600" /> Stripe
                  </p>
                </div>
                <div className="p-4 flex flex-col items-center justify-center border-b border-slate-800 bg-slate-900/20 shrink-0">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path className="text-slate-800" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path
                        className={`transition-all duration-1000 ease-out ${
                          activePhase === 0 ? "text-slate-600" : activePhase === 1 ? "text-amber-400" : "text-[#10B981]"
                        }`}
                        strokeDasharray={`${activePhase === 0 ? "0" : activePhase === 1 ? "62" : "96"}, 100`}
                        strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className={`text-lg sm:text-xl font-semibold font-mono tracking-tighter ${
                        activePhase === 0 ? "text-slate-400" : activePhase === 1 ? "text-amber-400" : "text-[#10B981]"
                      }`}>
                        {activePhase === 0 ? "--" : activePhase === 1 ? "62" : "96"}
                      </span>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 mt-2">Score ATS Global</span>
                </div>
                <div className="p-3 flex-1 flex flex-col justify-center overflow-hidden">
                  <h5 className="text-[9px] font-mono uppercase tracking-wider text-slate-500 mb-2.5">Mots-clés requis</h5>
                  <div className="space-y-1.5 text-[10px] sm:text-xs font-medium font-mono">
                    {[
                      { label: "React", matched: activePhase >= 1 },
                      { label: "TypeScript", matched: activePhase >= 1 },
                      { label: "Performance", matched: activePhase >= 2, partial: activePhase === 1 },
                    ].map(({ label, matched, partial }) => (
                      <div
                        key={label}
                        className={`px-2.5 py-1.5 rounded-md border flex items-center justify-between transition-all duration-500 ${
                          matched
                            ? "bg-[#10B981]/10 border-[#10B981]/20 text-[#10B981]"
                            : partial
                              ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                              : "bg-slate-900 border-slate-800 text-slate-400"
                        }`}
                      >
                        <span>{label}</span>
                        {matched ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : partial ? (
                          <span className="text-[8px] uppercase tracking-wider">Manquant</span>
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col relative bg-[#0B132B] h-full overflow-hidden">
                <div className="h-8 md:h-10 border-b border-slate-800 flex items-center justify-between px-3 md:px-4 z-20 bg-[#0B132B] shrink-0">
                  <div className="flex items-center gap-2">
                    <FileText className="w-3 h-3 text-slate-400" />
                    <span className="text-[10px] sm:text-xs font-mono text-slate-300 truncate">Alexandre_CV_Original.pdf</span>
                  </div>
                  <BarChart className="w-3 h-3 text-slate-500" />
                </div>
                <div className="flex-1 p-3 md:p-6 flex items-center justify-center bg-slate-900/50 overflow-hidden relative">
                  <div className={`w-full h-full bg-white rounded-md p-5 relative transition-transform duration-1000 z-10 shadow-lg ${
                    activePhase === 0 ? "scale-[0.98]" : "scale-100"
                  }`}>
                    <div ref={scannerLineRef} className="absolute top-0 left-0 right-0 h-[1px] bg-[#2563EB] shadow-[0_0_10px_2px_rgba(37,99,235,0.4)] pointer-events-none z-40" style={{ opacity: 0 }} />
                    <div className="space-y-4">
                      <div className="border-b border-slate-200 pb-2.5">
                        <h4 className="text-sm font-bold text-slate-900 tracking-tight">Alexandre Martin</h4>
                        <p className="text-[9px] text-slate-500 mt-0.5 font-mono uppercase tracking-wider">Senior Frontend Engineer</p>
                      </div>
                      <div className="space-y-3">
                        <h5 className="text-[9px] font-bold text-slate-800 tracking-widest border-b border-slate-100 pb-1 uppercase">Expérience</h5>
                        <div>
                          <div className="flex justify-between text-[10px] font-bold text-slate-900 mb-2">
                            <span>Frontend Engineer @ TechCorp</span>
                            <span className="text-slate-500 font-mono text-[8px]">2021 - Présent</span>
                          </div>
                          <div className="text-[10px] sm:text-[11px] leading-relaxed text-slate-600 relative min-h-[50px]">
                            {activePhase === 0 && (
                              <p className="transition-opacity duration-300">• Aidé les clients à développer des applications web et à résoudre les bogues techniques dans les délais.</p>
                            )}
                            {activePhase === 1 && (
                              <p className="transition-opacity duration-300">
                                • Aidé les clients à développer des applications <span className="bg-amber-100 text-amber-900 px-1 py-[1px] rounded-sm font-medium">React</span> et à résoudre les bogues dans les délais.
                              </p>
                            )}
                            {activePhase === 2 && (
                              <div ref={typedTextRef}>
                                <p className="text-slate-900 font-medium bg-[#10B981]/10 border border-[#10B981]/20 p-2.5 rounded-md shadow-sm">
                                  • Déployé <span className="text-[#10B981] font-bold">12 apps</span> en <span className="bg-[#10B981]/20 text-[#065f46] px-1 py-[1px] rounded-sm">React</span> et <span className="bg-[#10B981]/20 text-[#065f46] px-1 py-[1px] rounded-sm">TypeScript</span>, optimisant les perfs de <span className="text-[#10B981] font-bold">40%</span>.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1.5 pt-2 opacity-30">
                        <div className="h-1.5 w-full bg-slate-200 rounded-sm" />
                        <div className="h-1.5 w-5/6 bg-slate-200 rounded-sm" />
                        <div className="h-1.5 w-4/6 bg-slate-200 rounded-sm" />
                      </div>
                    </div>
                    <div
                      ref={diffBubbleRef}
                      className={`absolute -bottom-8 -right-4 sm:-right-8 w-52 sm:w-60 bg-[#0B132B] border border-slate-700 shadow-2xl rounded-lg overflow-hidden z-50 transition-all duration-500 ${
                        activePhase === 2 ? "opacity-100" : "opacity-0 pointer-events-none"
                      }`}
                    >
                      <div className="bg-slate-800/50 px-3 py-2 flex items-center justify-between border-b border-slate-700">
                        <span className="text-[9px] font-mono text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
                          <Activity className="w-2.5 h-2.5 text-[#10B981]" />
                          Impact STAR
                        </span>
                      </div>
                      <div className="p-3 space-y-3">
                        <p className="text-[10px] text-slate-300 leading-relaxed font-sans">
                          Quantification des résultats (+40%) et ajout de <span className="text-white font-medium">TypeScript</span> pour l&apos;ATS.
                        </p>
                        <button className="w-full bg-[#2563EB] hover:bg-blue-600 text-white text-[10px] font-medium py-1.5 rounded transition-colors flex items-center justify-center gap-1.5">
                          Appliquer <ArrowRight className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </LaptopMockup>
          </div>
        </div>
      </div>
    </section>
  );
}
