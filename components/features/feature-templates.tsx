"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

export default function FeatureTemplates() {
  const t = useTranslations("FeatureTemplates");
  const [activeTemplate, setActiveTemplate] = useState<number>(0);

  const templates = [
    {
      title: t("template1Title"),
      desc: t("template1Desc"),
      image: "/cvs/cv5.jpeg",
      color: "from-blue-500/10 to-brand-navy/20",
    },
    {
      title: t("template2Title"),
      desc: t("template2Desc"),
      image: "/cvs/cv15.png",
      color: "from-emerald-500/10 to-brand-navy/20",
    },
    {
      title: t("template3Title"),
      desc: t("template3Desc"),
      image: "/cvs/cv14.png",
      color: "from-purple-500/10 to-brand-navy/20",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 sm:px-8 space-y-16">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1 text-brand-blue text-[10px] font-bold uppercase tracking-widest">
          <ShieldCheck className="w-4 h-4" />
          <span>{t("badge")}</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-brand-navy leading-tight">
          {t("title")}
        </h2>
        <p className="text-sm sm:text-base text-text-secondary font-normal max-w-xl mx-auto leading-relaxed">
          {t("description")}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-5 h-auto md:h-[480px] overflow-hidden w-full pt-4" onMouseLeave={() => setActiveTemplate(0)}>
        {templates.map((tpl, idx) => (
          <div
            key={tpl.title}
            onMouseEnter={() => setActiveTemplate(idx)}
            className={`w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden relative border rounded-2xl cursor-pointer flex flex-col justify-between p-6 md:p-8 min-h-[320px] md:min-h-0 ${
              activeTemplate === idx
                ? "md:flex-[2.4] border-brand-blue/20 bg-white shadow-lg"
                : "md:flex-1 border-border-light bg-slate-50/40"
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${tpl.color} transition-opacity duration-700 pointer-events-none z-0 ${
              activeTemplate === idx ? "opacity-100" : "opacity-0"
            }`} />

            <div className="relative z-10 space-y-2">
              <span className="text-[9px] font-bold text-text-secondary uppercase tracking-widest block">
                {t("templateLabel", { number: idx + 1 })}
              </span>
              <h3 className="font-heading font-semibold text-lg text-brand-navy">{tpl.title}</h3>
              <p className={`text-xs text-text-secondary leading-relaxed font-normal max-w-xs transition-all duration-500 delay-100 ${
                activeTemplate === idx ? "md:opacity-100" : "md:opacity-0"
              }`}>
                {tpl.desc}
              </p>
            </div>

            <div className={`relative z-10 w-full aspect-[4/3] md:aspect-auto md:h-[250px] rounded-xl overflow-hidden mt-6 border border-border-light shadow-sm transform transition-transform duration-500 ${
              activeTemplate === idx ? "scale-[1.02]" : ""
            }`}>
              <Image
                src={tpl.image}
                alt={tpl.title}
                fill
                className={`object-cover object-top transition-all duration-700 ${
                  activeTemplate === idx ? "grayscale-0" : "grayscale"
                }`}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className={`absolute inset-0 bg-brand-navy/15 transition-all duration-300 flex items-center justify-center ${
                activeTemplate === idx ? "opacity-100" : "opacity-0"
              }`}>
                <span className="bg-white text-brand-navy px-4 py-2 rounded-lg font-bold text-[10px] uppercase tracking-wider shadow-sm flex items-center gap-1 border border-border-light">
                  {t("useTemplate")}
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
