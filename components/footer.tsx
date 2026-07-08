import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="bg-slate-950 text-slate-400 py-20 px-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2 pl-2">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/main_logo_dark_mode.svg" alt="PROCV" width={32} height={32} className="h-8 w-auto" />
              </Link>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm font-normal leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-white font-heading font-semibold text-[10px] uppercase tracking-wider">{t("productLabel")}</span>
            <a href="#templates" className="text-xs font-normal text-slate-400 hover:text-white transition-colors duration-200">
              {t("cvTemplates")}
            </a>
            <a href="#features" className="text-xs font-normal text-slate-400 hover:text-white transition-colors duration-200">
              {t("atsScore")}
            </a>
            <a href="#how-it-works" className="text-xs font-normal text-slate-400 hover:text-white transition-colors duration-200">
              {t("technicalProcess")}
            </a>
          </div>

          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-white font-heading font-semibold text-[10px] uppercase tracking-wider">{t("companyLabel")}</span>
            <a href="#pricing" className="text-xs font-normal text-slate-400 hover:text-white transition-colors duration-200">
              {t("pricing")}
            </a>
            <a href="#" className="text-xs font-normal text-slate-400 hover:text-white transition-colors duration-200">
              {t("support")}
            </a>
            <a href="#" className="text-xs font-normal text-slate-400 hover:text-white transition-colors duration-200">
              {t("legal")}
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-medium tracking-wide">
          <p>{t("copyright")}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors duration-200">
              {t("terms")}
            </a>
            <a href="#" className="hover:text-white transition-colors duration-200">
              {t("privacy")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
