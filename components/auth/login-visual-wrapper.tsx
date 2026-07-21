"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import LanguageSwitcher from "../shared/language-switcher";

interface LoginVisualWrapperProps {
  children: React.ReactNode;
}

export default function LoginVisualWrapper({
  children,
}: LoginVisualWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const { reduceMotion } = ctx.conditions as { reduceMotion: boolean };
          const items = containerRef.current?.querySelectorAll(".animate-stagger-item");

          if (reduceMotion) {
            if (cardRef.current) gsap.set(cardRef.current, { opacity: 1, y: 0 });
            if (items && items.length > 0) gsap.set(items, { opacity: 1, y: 0 });
            return;
          }

          if (cardRef.current) gsap.set(cardRef.current, { y: 40, opacity: 0, scale: 0.98 });
          if (items && items.length > 0) gsap.set(items, { opacity: 0, y: 20 });

          const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

          if (cardRef.current) {
            tl.to(
              cardRef.current,
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
              },
              0.1
            );
          }

          if (items && items.length > 0) {
            tl.to(
              items,
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.08,
              },
              0.4
            );
          }
        }
      );
      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-[100dvh] w-full mx-auto items-center justify-center items-center overflow-hidden selection:bg-brand-blue/20 selection:text-brand-blue px-4 py-8 sm:px-6 lg:px-8"
    >

      <div className="absolute right-8 top-8 z-20">
        <LanguageSwitcher />
      </div>

      {/* Main SaaS Card */}
      <div
        ref={cardRef}
        className="relative z-10 flex w-full max-w-[1200px] overflow-hidden rounded-3xl bg-transparent"
        style={{ willChange: "transform, opacity" }}
      >
        {/* Auth Form */}
        <div className="flex w-full mx-auto flex-col justify-center px-6 py-12 sm:px-12 lg:w-1/2 xl:px-20">
          <div className="mx-auto w-full max-w-sm">{children}</div>
        </div>

      </div>
    </div>
  );
}