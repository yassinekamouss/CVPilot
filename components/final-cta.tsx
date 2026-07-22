import React from "react";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export default async function FinalCta() {
  const t = await getTranslations("FinalCta");

  return (
    <section className="relative w-full py-24 md:py-32 bg-white overflow-hidden">
      {/* Subtle top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-slate-200" />

      {/* Decorative background grid (light mode version) */}
      <>
        <div
          className="
            absolute left-1/2 top-1/2
            h-[800px] w-[800px]
            -translate-x-1/2 -translate-y-1/2
            rounded-full
            bg-[#2563EB]/12
            blur-[180px]
            pointer-events-none
          "
        />

        <div
          className="
            absolute left-[35%] top-[25%]
            h-[320px] w-[320px]
            rounded-full
            bg-[#10B981]/8
            blur-[120px]
            pointer-events-none
          "
        />

        <div
          className="
            absolute right-[30%] bottom-[20%]
            h-[260px] w-[260px]
            rounded-full
            bg-[#2563EB]/8
            blur-[120px]
            pointer-events-none
          "
        />
      </>
      <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
        {/* Main CTA Card */}
        <div className="p-8 md:p-16 relative overflow-hidden">
          <div className="relative z-10 space-y-8 mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-brand-navy text-xs font-semibold tracking-wide uppercase border border-[#E2E8F0]">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
              <span>{t("badge")}</span>
            </div>

            {/* Headline */}
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-brand-navy leading-tight">
              {t("title")}
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-text-secondary font-normal max-w-xl mx-auto leading-relaxed">
              {t("description")}
            </p>

            {/* Value Props */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm font-medium text-[#0B132B]/80 pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>{t("prop1")}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>{t("prop2")}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>{t("prop3")}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/login" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0B132B] hover:bg-[#2563EB] text-white px-8 py-3.5 rounded-lg font-medium text-sm transition-colors duration-200 shadow-sm cursor-pointer">
                <span>{t("ctaPrimary")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/#features" className="w-full sm:w-auto inline-flex items-center justify-center border border-[#E2E8F0] hover:border-slate-400 text-[#0B132B] hover:bg-slate-50 px-8 py-3.5 rounded-lg font-medium text-sm transition-colors duration-200 cursor-pointer">
                {t("ctaSecondary")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
