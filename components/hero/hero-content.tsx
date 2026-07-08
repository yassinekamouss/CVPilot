"use client";

import React, { useRef } from "react";
import { UploadCloud, FileEdit } from "lucide-react";
import InteractiveCvCard from "./interactive-cv-card";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HeroContent() {
  const t = useTranslations("Hero");

  const containerRef = useRef<HTMLElement>(null);
  const titleLine1Ref = useRef<HTMLDivElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);
  const cvThumbnailRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaPrimaryRef = useRef<HTMLAnchorElement>(null);
  const ctaSecondaryRef = useRef<HTMLAnchorElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const lerpX = useRef(0);
  const lerpY = useRef(0);
  const rafRef = useRef<number | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const { reduceMotion } = ctx.conditions as { reduceMotion: boolean; motion: boolean };
          if (reduceMotion) {
            gsap.set(
              [titleLine1Ref.current, titleLine2Ref.current, descRef.current, ctaPrimaryRef.current, ctaSecondaryRef.current, trustRef.current, cardContainerRef.current],
              { opacity: 1, y: 0, clipPath: "none" }
            );
            return;
          }

          const headerEl = document.querySelector("header");
          if (headerEl) gsap.set(headerEl, { y: -20, autoAlpha: 0 });

          gsap.set([titleLine1Ref.current, titleLine2Ref.current], { y: 60, opacity: 0, clipPath: "inset(0 0 100% 0)" });
          gsap.set(cvThumbnailRef.current, { scale: 0.9, rotation: -4, opacity: 0 });
          gsap.set(descRef.current, { y: 24, opacity: 0 });
          gsap.set([ctaPrimaryRef.current, ctaSecondaryRef.current], { y: 18, opacity: 0 });
          gsap.set(trustRef.current, { y: 12, opacity: 0 });
          gsap.set(cardContainerRef.current, { x: 60, y: 20, opacity: 0, scale: 0.95, rotation: 2.5 });

          const entranceTl = gsap.timeline({ defaults: { ease: "power4.out" } });
          if (headerEl) {
            entranceTl.fromTo(headerEl, { y: -20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: "expo.out" }, 0);
          }
          entranceTl.to(titleLine1Ref.current, { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1.0, ease: "expo.out" }, 0.3);
          entranceTl.to(titleLine2Ref.current, { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1.0, ease: "expo.out" }, 0.5);
          entranceTl.to(cvThumbnailRef.current, { scale: 1, rotation: 0, opacity: 1, duration: 0.9, ease: "back.out(1.4)" }, 0.65);
          entranceTl.to(descRef.current, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, 0.85);
          entranceTl.to([ctaPrimaryRef.current, ctaSecondaryRef.current], { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.12 }, 1.0);
          entranceTl.to(trustRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, 1.25);
          entranceTl.to(cardContainerRef.current, { x: 0, y: 0, opacity: 1, scale: 1, rotation: 0, duration: 1.2, ease: "expo.out" }, 0.55);

          entranceTl.call(() => {
            gsap.to(cardContainerRef.current, { y: -8, duration: 3.2, ease: "sine.inOut", repeat: -1, yoyo: true });
            gsap.to(ctaPrimaryRef.current, { scale: 1.012, duration: 2.4, ease: "sine.inOut", repeat: -1, yoyo: true });
          });

          const onMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            mouseX.current = (e.clientX / innerWidth - 0.5) * 2;
            mouseY.current = (e.clientY / innerHeight - 0.5) * 2;
          };
          window.addEventListener("mousemove", onMouseMove);

          const loopParallax = () => {
            const ease = 0.065;
            lerpX.current += (mouseX.current - lerpX.current) * ease;
            lerpY.current += (mouseY.current - lerpY.current) * ease;
            const mx = lerpX.current;
            const my = lerpY.current;
            gsap.set([titleLine1Ref.current, titleLine2Ref.current], { x: mx * 6, y: my * 4 });
            gsap.set(cardContainerRef.current, { x: mx * 18, y: my * 12 });
            rafRef.current = requestAnimationFrame(loopParallax);
          };
          rafRef.current = requestAnimationFrame(loopParallax);

          gsap.to(containerRef.current, {
            opacity: 0.5, ease: "none",
            scrollTrigger: { trigger: containerRef.current, start: "bottom 80%", end: "bottom 20%", scrub: 1.2 },
          });
          gsap.to(cardContainerRef.current, {
            y: -40, ease: "none",
            scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: 1.5 },
          });

          const leftCvEl = containerRef.current?.querySelector(".bg-cv-left");
          const rightCvEl = containerRef.current?.querySelector(".bg-cv-right");
          if (leftCvEl) {
            gsap.to(leftCvEl, { x: -30, y: -20, ease: "none", scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: 2 } });
          }
          if (rightCvEl) {
            gsap.to(rightCvEl, { x: 30, y: 20, ease: "none", scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: 2 } });
          }

          return () => {
            window.removeEventListener("mousemove", onMouseMove);
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
          };
        }
      );
      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative overflow-hidden pt-28 md:pt-40 pb-24 md:pb-36 px-6 sm:px-8 bg-brand-bg/30">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] aspect-square rounded-full bg-brand-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] aspect-square rounded-full bg-brand-green/5 blur-[150px] pointer-events-none" />
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          <div className="lg:col-span-7 space-y-10 text-left">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[4.25rem] font-medium tracking-tight text-brand-navy leading-[1.1] max-w-3xl">
              <span ref={titleLine1Ref} className="block overflow-hidden" style={{ willChange: "transform, opacity" }}>
                <span className="block">
                  {t("titleLine1")}{" "}
                  <span
                    ref={cvThumbnailRef}
                    className="inline-block w-[60px] sm:w-[85px] h-[30px] sm:h-[42px] rounded-full align-middle bg-cover bg-center mx-1 sm:mx-2 border border-brand-navy/15 shadow-sm hover:scale-110 transition-transform duration-300 cursor-help"
                    style={{ backgroundImage: "url(/cvs/cv1.jpeg)" }}
                    title={t("cvAlt")}
                  />
                </span>
              </span>
              <span ref={titleLine2Ref} className="block overflow-hidden" style={{ willChange: "transform, opacity" }}>
                <span className="block">{t("titleLine2")}</span>
              </span>
            </h1>
            <p ref={descRef} className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl font-normal" style={{ willChange: "transform, opacity" }}>
              {t("description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/login"
                ref={ctaPrimaryRef}
                className="flex items-center justify-center gap-2 bg-brand-navy hover:bg-brand-blue text-white font-semibold px-8 py-4 rounded-full shadow-lg shadow-brand-navy/5 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                style={{ willChange: "transform, opacity" }}
              >
                <UploadCloud className="w-4 h-4" />
                <span>{t("ctaPrimary")}</span>
              </Link>
              <Link
                href="/login"
                ref={ctaSecondaryRef}
                className="flex items-center justify-center gap-2 border border-brand-navy/20 hover:border-brand-navy text-brand-navy hover:bg-brand-navy/5 font-semibold px-8 py-4 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                style={{ willChange: "transform, opacity" }}
              >
                <FileEdit className="w-4 h-4" />
                <span>{t("ctaSecondary")}</span>
              </Link>
            </div>
            <div ref={trustRef} className="flex items-center gap-6 pt-4 text-[10px] font-bold uppercase tracking-wider text-text-secondary/70" style={{ willChange: "transform, opacity" }}>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                <span>{t("trustRGPD")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                <span>{t("trustFormat")}</span>
              </div>
            </div>
          </div>
          <div ref={cardContainerRef} className="lg:col-span-5 flex items-center justify-center relative" style={{ willChange: "transform, opacity" }}>
            <InteractiveCvCard />
          </div>
        </div>
      </div>
    </section>
  );
}
