import React from "react";
import { Star } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function Stats() {
  const t = await getTranslations("Stats");

  const stats = [
    { value: t("stat1Value"), label: t("stat1Label") },
    { value: t("stat2Value"), label: t("stat2Label") },
    { value: t("stat3Value"), label: t("stat3Label") },
  ];

  const atsPartners = [
    "Workday",
    "Greenhouse",
    "Lever",
    "Taleo",
    "iCIMS",
    "BambooHR",
    "SmartRecruiters",
    "Jobvite",
    "Bullhorn",
    "SuccessFactors"
  ];

  return (
    <section className="bg-white py-16 md:py-24 border-y border-brand-navy/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 space-y-16">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 items-center">
          {/* Rating Card */}
          <div className="flex flex-col items-start gap-2 bg-brand-bg/25 border border-brand-navy/5 p-6 rounded-2xl">
            <div className="flex gap-0.5 text-brand-green">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mt-1">
              {t("ratingLabel")}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div 
                key={stat.label} 
                className="bg-brand-bg/15 border border-brand-navy/5 p-6 rounded-2xl hover:border-brand-blue/30 hover:scale-[1.01] transition-all duration-300"
              >
                <div className="text-3xl sm:text-4xl font-heading font-semibold text-brand-navy tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[10px] font-bold text-text-secondary uppercase tracking-widest pt-1.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Infinite Marquee of ATS Platforms */}
        <div className="pt-4 border-t border-brand-navy/5">
          <p className="text-center text-[10px] font-bold text-text-secondary/60 uppercase tracking-widest mb-8">
            {t("atsCompatibility")}
          </p>
          
          <div className="relative w-full flex items-center overflow-hidden py-4 mask-image-[linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            
            <div className="animate-marquee flex gap-16 select-none">
              {/* First loop */}
              {atsPartners.concat(atsPartners).map((partner, index) => (
                <span 
                  key={index} 
                  className="text-sm md:text-base font-heading font-medium tracking-widest text-text-secondary/40 hover:text-brand-blue transition-colors duration-300 cursor-default uppercase"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
