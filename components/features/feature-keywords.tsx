"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, CheckCircle2, Loader2 } from "lucide-react";
import ScrollRevealText from "./scroll-reveal-text";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Keywords {
  nextjs: boolean;
  typescript: boolean;
  graphql: boolean;
  tailwind: boolean;
}

export default function FeatureKeywords() {
  const visualRef = useRef<HTMLDivElement>(null);
  const [matchScore, setMatchScore] = useState(48);
  const [analyzing, setAnalyzing] = useState(false);
  const [keywords, setKeywords] = useState<Keywords>({
    nextjs: false,
    typescript: false,
    graphql: false,
    tailwind: false,
  });

  const runSimulation = useCallback(async () => {
    setAnalyzing(true);
    setMatchScore(48);
    setKeywords({ nextjs: false, typescript: false, graphql: false, tailwind: false });
    await new Promise((r) => setTimeout(r, 1000));
    setKeywords((prev) => ({ ...prev, nextjs: true }));
    setMatchScore(62);
    await new Promise((r) => setTimeout(r, 1000));
    setKeywords((prev) => ({ ...prev, typescript: true }));
    setMatchScore(75);
    await new Promise((r) => setTimeout(r, 1000));
    setKeywords((prev) => ({ ...prev, tailwind: true }));
    setMatchScore(88);
    setAnalyzing(false);
  }, []);

  useEffect(() => {
    runSimulation();
    const interval = setInterval(runSimulation, 8000);
    return () => clearInterval(interval);
  }, [runSimulation]);

  useGSAP(() => {
    if (!visualRef.current) return;
    gsap.fromTo(
      visualRef.current,
      { scale: 0.94, opacity: 0.5, y: 20 },
      { scale: 1, opacity: 1, y: 0, scrollTrigger: { trigger: visualRef.current, start: "top 95%", end: "bottom 80%", scrub: true } }
    );
  });

  const pillClass = (matched: boolean) =>
    `px-1.5 py-0.5 rounded text-[9px] font-semibold border transition-all duration-300 ${
      matched
        ? "bg-emerald-50 text-brand-green border-emerald-200"
        : "bg-slate-100 text-text-secondary/40 border-transparent"
    }`;

  return (
    <div className="mx-auto max-w-7xl px-6 sm:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-blue/5 border border-brand-blue/10 text-brand-blue rounded-full text-[10px] font-bold uppercase tracking-wider">
            <Target className="w-3.5 h-3.5" />
            <span>Ciblage Sémantique ATS</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-brand-navy leading-tight">
            Analyse d'écarts de mots-clés en temps réel
          </h2>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-normal">
            <ScrollRevealText text="Les algorithmes de recrutement filtrent les candidatures selon des critères précis. Notre outil compare votre CV avec la fiche de poste cible pour identifier instantanément les compétences techniques et méthodologiques manquantes." />
          </p>
          <ul className="space-y-4 pt-2">
            {[
              "Extraction sémantique directe de la fiche de poste",
              "Diagnostic de conformité et score de matching ATS",
              "Recommandations guidées pour combler les lacunes",
            ].map((text) => (
              <li key={text} className="flex items-center gap-3">
                <CheckCircle2 className="w-4.5 h-4.5 text-brand-green shrink-0" />
                <span className="text-sm font-medium text-brand-navy">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div ref={visualRef} className="lg:col-span-6 bg-brand-bg/40 rounded-3xl p-5 sm:p-8 flex items-center justify-center border border-border-light origin-center">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_8px_30px_rgba(11,19,43,0.03)] border border-border-light overflow-hidden font-sans">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-light bg-slate-50/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
                <span className="text-[10px] font-bold text-brand-navy uppercase tracking-widest">Diagnostic de Correspondance</span>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-50 text-brand-green px-2.5 py-0.5 rounded-full text-xs font-bold border border-emerald-100/50">
                <span>Match : {matchScore}%</span>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="space-y-2">
                  <div className="text-[9px] font-bold text-text-secondary uppercase tracking-widest">Fiche de Poste (Cible)</div>
                  <div className="bg-brand-bg/50 p-3 rounded-xl space-y-2.5 border border-border-light/60">
                    <p className="font-semibold text-brand-navy text-[11px] truncate">Senior Frontend Dev</p>
                    <div className="flex flex-wrap gap-1">
                      <span className="px-1.5 py-0.5 bg-brand-blue/10 text-brand-blue rounded text-[9px] font-semibold">Next.js</span>
                      <span className="px-1.5 py-0.5 bg-brand-blue/10 text-brand-blue rounded text-[9px] font-semibold">TypeScript</span>
                      <span className="px-1.5 py-0.5 bg-brand-blue/10 text-brand-blue rounded text-[9px] font-semibold">Tailwind</span>
                      <span className="px-1.5 py-0.5 bg-slate-200/60 text-text-secondary rounded text-[9px] font-semibold">GraphQL</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-[9px] font-bold text-text-secondary uppercase tracking-widest">Votre CV</div>
                  <div className="bg-brand-bg/50 p-3 rounded-xl space-y-2.5 border border-border-light/60">
                    <p className="font-semibold text-brand-navy text-[11px] truncate">Mon_CV_Frontend.pdf</p>
                    <div className="flex flex-wrap gap-1">
                      <span className={pillClass(keywords.nextjs)}>{keywords.nextjs ? "✓ Next.js" : "• Next.js"}</span>
                      <span className={pillClass(keywords.typescript)}>{keywords.typescript ? "✓ TypeScript" : "• TypeScript"}</span>
                      <span className={pillClass(keywords.tailwind)}>{keywords.tailwind ? "✓ Tailwind" : "• Tailwind"}</span>
                      <span className="px-1.5 py-0.5 bg-red-50 text-red-500 border border-red-100 rounded text-[9px] font-semibold">✗ GraphQL</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-border-light rounded-xl p-4 flex items-start gap-3">
                <div className="p-2 bg-brand-blue/5 text-brand-blue rounded-lg mt-0.5 border border-brand-blue/10">
                  {analyzing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Target className="w-3.5 h-3.5" />}
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-brand-navy">
                    {analyzing ? "Analyse sémantique en cours..." : "Action Corrective Recommandée"}
                  </p>
                  <p className="text-[10px] text-text-secondary leading-relaxed">
                    {analyzing
                      ? "Scan des mots-clés requis et comparaison avec votre historique professionnel..."
                      : 'Intégrez le terme "GraphQL" dans la section Projets (ex: projet Dashboard) pour augmenter la pertinence de +13%.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
