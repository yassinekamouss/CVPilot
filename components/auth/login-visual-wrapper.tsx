"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

interface LoginVisualWrapperProps {
  children: React.ReactNode;
  locale: string;
}

export default function LoginVisualWrapper({ children }: LoginVisualWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const glow1Ref = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);

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

          if (reduceMotion) {
            // Instantly show everything without motion
            gsap.set([cardRef.current, watermarkRef.current, glow1Ref.current, glow2Ref.current], {
              opacity: 1,
              y: 0,
            });
            const items = containerRef.current?.querySelectorAll(".animate-stagger-item");
            if (items) {
              gsap.set(items, { opacity: 1, y: 0 });
            }
            return;
          }

          // Initial states
          gsap.set([watermarkRef.current, glow1Ref.current, glow2Ref.current], { opacity: 0 });
          gsap.set(cardRef.current, { y: 45, opacity: 0 });
          
          const items = containerRef.current?.querySelectorAll(".animate-stagger-item");
          if (items) {
            gsap.set(items, { opacity: 0, y: 15 });
          }

          // Timeline
          const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
          
          tl.to([glow1Ref.current, glow2Ref.current], {
            opacity: 1,
            duration: 1.4,
            stagger: 0.2,
          }, 0.1);

          tl.to(watermarkRef.current, {
            opacity: 0.015,
            duration: 1.2,
          }, 0.2);

          tl.to(cardRef.current, {
            y: 0,
            opacity: 1,
            duration: 1.0,
          }, 0.4);

          if (items && items.length > 0) {
            tl.to(items, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",
            }, 0.6);
          }

          // Subtle mouse parallax tilt (lerping)
          let mouseX = 0;
          let mouseY = 0;
          let currentX = 0;
          let currentY = 0;
          let animationFrameId: number | null = null;

          const onMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            // Center coordinates at 0, ranging from -1 to 1
            mouseX = (e.clientX / innerWidth - 0.5) * 2;
            mouseY = (e.clientY / innerHeight - 0.5) * 2;
          };

          const updateTilt = () => {
            const lerpFactor = 0.08;
            currentX += (mouseX - currentX) * lerpFactor;
            currentY += (mouseY - currentY) * lerpFactor;

            if (cardRef.current) {
              // Limit maximum rotation to 2.5 degrees for premium feel
              const rotateY = currentX * 2.5;
              const rotateX = -currentY * 2.5;
              gsap.set(cardRef.current, {
                transformPerspective: 1000,
                rotateX: rotateX,
                rotateY: rotateY,
              });
            }

            animationFrameId = requestAnimationFrame(updateTilt);
          };

          window.addEventListener("mousemove", onMouseMove);
          animationFrameId = requestAnimationFrame(updateTilt);

          return () => {
            window.removeEventListener("mousemove", onMouseMove);
            if (animationFrameId) {
              cancelAnimationFrame(animationFrameId);
            }
          };
        }
      );
      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center bg-brand-bg px-4 py-12 overflow-hidden selection:bg-brand-blue/10 selection:text-brand-navy"
    >
      {/* Glow ambient spots */}
      <div
        ref={glow1Ref}
        className="absolute top-[-20%] left-[-10%] w-[50vw] aspect-square rounded-full bg-brand-blue/6 blur-[120px] pointer-events-none"
      />
      <div
        ref={glow2Ref}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] aspect-square rounded-full bg-brand-green/4 blur-[150px] pointer-events-none"
      />

      {/* Big Watermark */}
      <div
        ref={watermarkRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-heading font-black text-[clamp(10rem,25vw,25rem)] select-none pointer-events-none tracking-tighter text-brand-navy"
        style={{ willChange: "opacity" }}
      >
        PROCV
      </div>

      {/* Double-Bezel Card Enclosure */}
      <div
        ref={cardRef}
        className="relative z-10 w-full max-w-md bg-white/40 p-2 rounded-3xl border border-border-light/40 backdrop-blur-md shadow-[0_24px_50px_-12px_rgba(11,19,43,0.08)] transition-shadow duration-300"
        style={{ willChange: "transform, opacity" }}
      >
        <div className="w-full bg-white border border-border-light/30 rounded-[calc(1.5rem-0.5rem)] p-8 space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
}
