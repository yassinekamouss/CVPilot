import React from "react";
import { Check, X, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function Pricing() {
  const freeFeatures = [
    { text: "Analyse de score ATS illimitée", included: true },
    { text: "3 Modèles de base certifiés", included: true },
    { text: "Réécriture assistée par IA", included: false },
    { text: "Analyse des mots-clés manquants", included: false },
  ];

  const premiumFeatures = [
    { text: "Analyse de score ATS illimitée", included: true },
    { text: "Tous les modèles Premium", included: true },
    { text: "Réécriture complète illimitée", included: true },
    { text: "Optimisation mots-clés par poste", included: true },
    { text: "Support prioritaire 24/7", included: true },
  ];

  return (
    <section id="pricing" className="py-32 md:py-48 bg-brand-bg/35 border-t border-brand-navy/5">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-20 md:mb-28">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-brand-navy text-xs font-semibold tracking-wide uppercase border border-[#E2E8F0]">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest">TARIFS TRANSPARENTS</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-brand-navy leading-tight">
            Boostez vos chances d'entretien
          </h2>
          <p className="text-base text-text-secondary font-normal">
            Commencez gratuitement, puis passez au niveau supérieur pour maximiser vos candidatures.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          
          {/* Free Card */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-brand-navy/5 flex flex-col justify-between shadow-[0_12px_40px_rgba(11,19,43,0.02)] relative transition-all hover:shadow-[0_16px_48px_rgba(11,19,43,0.04)] duration-300">
            <div>
              <div className="mb-8">
                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest block mb-1">Accès d'essai</span>
                <h3 className="font-heading font-semibold text-xl text-brand-navy">Gratuit</h3>
                <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                  Pour analyser votre CV actuel et connaître votre score ATS initial.
                </p>
                <div className="flex items-baseline gap-1 mt-6">
                  <span className="text-4xl font-heading font-semibold text-brand-navy">0MAD</span>
                  <span className="text-text-secondary text-sm font-semibold">/mois</span>
                </div>
              </div>
              
              <ul className="space-y-4.5 mb-10 pt-4 border-t border-slate-100">
                {freeFeatures.map((feat, index) => (
                  <li key={index} className="flex gap-3 text-xs font-medium">
                    {feat.included ? (
                      <Check className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                    )}
                    <span className={feat.included ? "text-brand-navy" : "text-text-secondary/50 line-through"}>
                      {feat.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Link href="/login" className="w-full text-center py-3.5 border border-brand-navy/10 text-brand-navy hover:bg-slate-50 rounded-xl font-bold text-xs transition-all active:scale-[0.98] uppercase tracking-wider block">
              Analyser mon CV
            </Link>
          </div>

          {/* Premium Card */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-brand-blue/30 flex flex-col justify-between shadow-[0_20px_50px_rgba(37,99,235,0.06)] relative transition-all hover:shadow-[0_20px_60px_rgba(37,99,235,0.1)] duration-300">
            
            {/* Populaire Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-blue text-white px-4 py-1.5 rounded-full text-[9px] font-bold tracking-widest uppercase flex items-center gap-1 shadow-md shadow-brand-blue/10">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Recommandé</span>
            </div>

            <div>
              <div className="mb-8">
                <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block mb-1">Accès complet</span>
                <h3 className="font-heading font-semibold text-xl text-brand-navy">Premium</h3>
                <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                  L'arsenal complet pour aligner parfaitement votre profil avec les critères des recruteurs.
                </p>
                <div className="flex items-baseline gap-1 mt-6">
                  <span className="text-4xl font-heading font-semibold text-brand-blue">30MAD€</span>
                  <span className="text-text-secondary text-sm font-semibold">/mois</span>
                </div>
              </div>
              
              <ul className="space-y-4.5 mb-10 pt-4 border-t border-slate-100">
                {premiumFeatures.map((feat, index) => (
                  <li key={index} className="flex gap-3 text-xs font-medium text-brand-navy">
                    <Check className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                    <span>{feat.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Link href="/login" className="w-full text-center py-3.5 bg-brand-blue hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-md shadow-brand-blue/15 hover:shadow-lg transition-all active:scale-[0.98] uppercase tracking-wider block">
              Débloquer Premium
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
