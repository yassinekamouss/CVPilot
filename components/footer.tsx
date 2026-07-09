import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="relative bg-[#050816] overflow-hidden pt-12">
      {/* Ligne subtile en haut pour séparer proprement de la section précédente */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Effet de lueur ambiante très léger */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[300px] w-[600px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* TEXTE GÉANT - Fusionné avec le fond */}
      <div className="absolute inset-x-0 top-0 flex justify-center pointer-events-none select-none">
        <h2
          className="
            text-[clamp(6rem,22vw,24rem)]
            font-black
            uppercase
            tracking-tight
            leading-[0.85]
            text-white/[0.06]
            [mask-image:linear-gradient(to_bottom,black_10%,transparent_65%)]
            -webkit-mask-image:-webkit-linear-gradient(top,black_10%,transparent_65%)
          "
        >
          PROCV
        </h2>
      </div>

      {/* CONTENU DU FOOTER */}
      <div className="relative z-10 mx-auto max-w-7xl px-8 pt-32 pb-12 lg:pt-48">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          
          {/* Left: Logo & Tagline */}
          <div className="max-w-sm">
            <div className="mb-6 flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                <Image 
                  src="/main_logo_dark_mode.svg" 
                  alt="PROCV" 
                  width={32} 
                  height={32} 
                  className="h-8 w-auto" 
                />
              </Link>
            </div>

            <p className="text-sm leading-relaxed text-slate-400">
              {t("tagline")}
            </p>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-12 lg:gap-16">
            {/* Product Column */}
            <div>
              <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-slate-300">
                {t("productLabel")}
              </h3>
              <ul className="space-y-4 text-sm text-slate-500">
                <li>
                  <a href="#templates" className="hover:text-indigo-400 transition-colors duration-200">
                    {t("cvTemplates")}
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-indigo-400 transition-colors duration-200">
                    {t("atsScore")}
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-indigo-400 transition-colors duration-200">
                    {t("technicalProcess")}
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-slate-300">
                {t("companyLabel")}
              </h3>
              <ul className="space-y-4 text-sm text-slate-500">
                <li>
                  <a href="#pricing" className="hover:text-indigo-400 transition-colors duration-200">
                    {t("pricing")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-400 transition-colors duration-200">
                    {t("support")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-400 transition-colors duration-200">
                    {t("legal")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 flex flex-col items-center justify-between border-t border-white/10 pt-8 sm:flex-row">
          <span className="text-sm text-slate-500">
            {t("copyright")}
          </span>

          <div className="mt-4 flex gap-6 text-sm text-slate-500 sm:mt-0">
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