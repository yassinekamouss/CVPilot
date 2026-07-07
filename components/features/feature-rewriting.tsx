"use client";

import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Terminal, ArrowRight, Loader2 } from "lucide-react";
import ScrollRevealText from "./scroll-reveal-text";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FeatureRewriting() {
  const visualRef = useRef<HTMLDivElement>(null);
  const [rewriteTab, setRewriteTab] = useState<"before" | "after">("before");
  const [optimizing, setOptimizing] = useState(false);

  const handleOptimizeTrigger = () => {
    if (rewriteTab === "after") {
      setRewriteTab("before");
      return;
    }
    setOptimizing(true);
    setTimeout(() => {
      setOptimizing(false);
      setRewriteTab("after");
    }, 1200);
  };

  useGSAP(() => {
    if (!visualRef.current) return;
    gsap.fromTo(
      visualRef.current,
      { scale: 0.94, opacity: 0.5, y: 20 },
      { scale: 1, opacity: 1, y: 0, scrollTrigger: { trigger: visualRef.current, start: "top 95%", end: "bottom 80%", scrub: true } }
    );
  });

  return (
    <div className="mx-auto max-w-7xl px-6 sm:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div ref={visualRef} className="lg:col-span-6 bg-brand-bg/40 rounded-3xl p-5 sm:p-8 flex items-center justify-center border border-border-light order-2 lg:order-1 origin-center">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_8px_30px_rgba(11,19,43,0.03)] overflow-hidden border border-border-light font-sans">
            <div className="bg-slate-50 border-b border-border-light px-4 py-3 flex items-center justify-between">
              <div className="flex gap-1">
                <button
                  onClick={() => setRewriteTab("before")}
                  className={`px-3 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase transition-all ${
                    rewriteTab === "before"
                      ? "bg-white text-brand-navy shadow-sm border border-border-light"
                      : "text-text-secondary hover:text-brand-navy"
                  }`}
                >
                  Avant
                </button>
                <button
                  onClick={() => setRewriteTab("after")}
                  className={`px-3 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase transition-all ${
                    rewriteTab === "after"
                      ? "bg-white text-brand-navy shadow-sm border border-border-light"
                      : "text-text-secondary hover:text-brand-navy"
                  }`}
                >
                  Après PROCV
                </button>
              </div>
              <div className="flex items-center gap-1.5 text-[9px] font-bold text-brand-blue uppercase tracking-widest">
                <Terminal className="w-3.5 h-3.5" />
                Moteur STAR
              </div>
            </div>

            <div className="p-6 min-h-[190px] flex flex-col justify-between">
              <div className="space-y-4">
                {rewriteTab === "before" ? (
                  <div className="space-y-2.5 animate-fadeIn">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold text-text-secondary uppercase tracking-widest">Description passive du projet</span>
                      <span className="text-[9px] text-rose-500 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-100">Impact faible</span>
                    </div>
                    <p className="text-xs text-text-secondary italic leading-relaxed border-l-2 border-slate-350 pl-3 py-1 bg-slate-50/50 rounded-r-lg">
                      &quot;J&apos;étais responsable du développement de l&apos;application et de l&apos;encadrement de l&apos;équipe technique pour corriger les bugs.&quot;
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2.5 animate-fadeIn">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold text-text-secondary uppercase tracking-widest">Formulation orientée résultats (STAR)</span>
                      <span className="text-[9px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Impact maximal</span>
                    </div>
                    <div className="p-3 bg-emerald-50/20 border border-emerald-100 rounded-xl space-y-2">
                      <p className="text-xs font-semibold text-brand-navy leading-relaxed">
                        &quot;Direction d&apos;une équipe de 5 développeurs et livraison d&apos;une application SaaS sous Next.js, réduisant les temps de chargement de 40% et le taux d&apos;anomalies de 25%.&quot;
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-emerald-150/40">
                        <span className="text-[8px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/50 px-1.5 py-0.5 rounded">Action: &quot;Direction &amp; Livraison&quot;</span>
                        <span className="text-[8px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/50 px-1.5 py-0.5 rounded">Mesure: &quot;-40% Chargement&quot;</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handleOptimizeTrigger}
                disabled={optimizing}
                className="mt-6 w-full flex items-center justify-center gap-2 py-2 px-4 bg-brand-navy hover:bg-brand-blue text-white rounded-lg text-xs font-semibold transition-all shadow-sm group"
              >
                {optimizing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                    <span>Optimisation sémantique...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-brand-blue group-hover:text-white transition-colors" />
                    <span>{rewriteTab === "after" ? "Réinitialiser" : "Optimiser la phrase"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-navy/5 border border-brand-navy/10 text-brand-navy rounded-full text-[10px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
            <span>Aide à la Rédaction active</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-brand-navy leading-tight">
            Mise en valeur de l'impact et des résultats
          </h2>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-normal">
            <ScrollRevealText text="Les recruteurs recherchent des accomplissements concrets, pas des listes de tâches passives. Notre module structure vos expériences selon la méthode STAR (Situation, Tâche, Action, Résultat) en y intégrant des indicateurs de performance." />
          </p>
          <div className="pt-2">
            <a href="#how-it-works" className="inline-flex items-center gap-1 text-xs font-bold text-brand-blue hover:gap-2 transition-all group">
              <span>Découvrir la méthode de réécriture</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
