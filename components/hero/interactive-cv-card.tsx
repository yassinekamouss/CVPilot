"use client";

import React, { useRef, useEffect } from "react";
import { CheckCircle2, User, Sparkles, Terminal } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BackgroundCVs from "./background-cvs";
import AtsScoreRing from "./ats-score-ring";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SCORE_MAX = 98;

const REWRITTEN_TEXT =
  "Pilotage d'une équipe agile de 8 ingénieurs, optimisant les cycles de déploiement de 25% via une refonte d'architecture.";

const KEYWORDS = ["Cloud Architecture", "Docker & K8s", "CI/CD Pipelines", "Python Scaling"];

export default function InteractiveCvCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgCv1Ref = useRef<HTMLDivElement>(null);
  const bgCv2Ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const atsBadgeRef = useRef<HTMLDivElement>(null);
  const crossedTextRef = useRef<HTMLParagraphElement>(null);
  const rewrittenRef = useRef<HTMLParagraphElement>(null);
  const scoreNumberRef = useRef<HTMLSpanElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const circlePercentRef = useRef<HTMLSpanElement>(null);
  const keywordRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rotateX = useRef(0);
  const rotateY = useRef(0);
  const lerpRX = useRef(0);
  const lerpRY = useRef(0);
  const tiltRaf = useRef<number | null>(null);
  const isHovered = useRef(false);
  const activeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loopTilt = () => {
      const ease = 0.08;
      lerpRX.current += (rotateX.current - lerpRX.current) * ease;
      lerpRY.current += (rotateY.current - lerpRY.current) * ease;
      if (cardRef.current) {
        const scale = isHovered.current ? 1.02 : 1;
        gsap.set(cardRef.current, {
          rotationX: lerpRX.current,
          rotationY: lerpRY.current,
          scale,
          transformPerspective: 1200,
          transformStyle: "preserve-3d",
          overwrite: "auto",
        });
      }
      tiltRaf.current = requestAnimationFrame(loopTilt);
    };
    tiltRaf.current = requestAnimationFrame(loopTilt);
    return () => {
      if (tiltRaf.current !== null) cancelAnimationFrame(tiltRaf.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    rotateX.current = -(y / (rect.height / 2)) * 10;
    rotateY.current = (x / (rect.width / 2)) * 10;
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    rotateX.current = 0;
    rotateY.current = 0;
  };

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
            const targets = [bgCv1Ref.current, bgCv2Ref.current, atsBadgeRef.current, rewrittenRef.current].filter(Boolean);
            if (targets.length > 0) {
              gsap.set(targets, { opacity: 1, filter: "blur(0px)", x: 0, y: 0 });
            }
            if (scoreNumberRef.current) scoreNumberRef.current.textContent = String(SCORE_MAX);
            if (circlePercentRef.current) circlePercentRef.current.textContent = `${SCORE_MAX}%`;
            if (circleRef.current) {
              gsap.set(circleRef.current, { strokeDashoffset: 2 * Math.PI * 24 * (1 - SCORE_MAX / 100) });
            }
            return;
          }

          if (bgCv1Ref.current) gsap.set(bgCv1Ref.current, { x: -50, y: 30, opacity: 0, filter: "blur(6px)" });
          if (bgCv2Ref.current) gsap.set(bgCv2Ref.current, { x: 50, y: -30, opacity: 0, filter: "blur(6px)" });

          if (bgCv1Ref.current) {
            gsap.to(bgCv1Ref.current, {
              x: 0, y: 0, opacity: 0.4, filter: "blur(0px)", duration: 1.4, delay: 1.0, ease: "expo.out",
              onComplete: () => {
                if (bgCv1Ref.current) {
                  gsap.to(bgCv1Ref.current, { y: "-=10", x: "+=4", duration: 4.5, ease: "sine.inOut", repeat: -1, yoyo: true });
                }
              },
            });
          }
          if (bgCv2Ref.current) {
            gsap.to(bgCv2Ref.current, {
              x: 0, y: 0, opacity: 0.4, filter: "blur(0px)", duration: 1.4, delay: 1.25, ease: "expo.out",
              onComplete: () => {
                if (bgCv2Ref.current) {
                  gsap.to(bgCv2Ref.current, { y: "+=12", x: "-=5", duration: 5.2, ease: "sine.inOut", repeat: -1, yoyo: true });
                }
              },
            });
          }

          if (crossedTextRef.current) gsap.set(crossedTextRef.current, { opacity: 0, x: -8 });
          if (rewrittenRef.current) gsap.set(rewrittenRef.current, { opacity: 0 });
          if (scoreNumberRef.current) gsap.set(scoreNumberRef.current, { opacity: 0 });
          if (circleRef.current) gsap.set(circleRef.current, { strokeDashoffset: 2 * Math.PI * 24 });
          if (circlePercentRef.current) gsap.set(circlePercentRef.current, { opacity: 0 });
          if (rewrittenRef.current) rewrittenRef.current.textContent = "";
          if (scoreNumberRef.current) scoreNumberRef.current.textContent = "0";
          keywordRefs.current.forEach((el) => {
            if (el) gsap.set(el, { opacity: 0.3, scale: 0.96 });
          });

          const runAiSequence = () => {
            const seq = gsap.timeline({ delay: 0.2 });
            if (crossedTextRef.current) {
              seq.to(crossedTextRef.current, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" });
            }
            if (rewrittenRef.current) {
              seq.to(rewrittenRef.current, { opacity: 1, duration: 0.3 }, "+=0.6");
            }
            seq.call(() => {
              if (!rewrittenRef.current) return;
              const fullText = `"${REWRITTEN_TEXT}"`;
              let i = 0;
              rewrittenRef.current.textContent = "";
              if (activeIntervalRef.current) {
                clearInterval(activeIntervalRef.current);
              }
              const typeInterval = setInterval(() => {
                if (!rewrittenRef.current) { clearInterval(typeInterval); return; }
                rewrittenRef.current.textContent = fullText.slice(0, i + 1);
                i++;
                if (i >= fullText.length) {
                  clearInterval(typeInterval);
                  activeIntervalRef.current = null;
                }
              }, 22);
              activeIntervalRef.current = typeInterval;
            }, undefined, "<");
            const typeDuration = (REWRITTEN_TEXT.length + 2) * 0.022 + 0.15;
            seq.to({}, { duration: typeDuration });
            keywordRefs.current.forEach((el, i) => {
              if (el) {
                seq.to(el, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.6)" }, `+=${i === 0 ? 0.3 : 0.18}`);
              }
            });
            const scoreProxy = { val: 0 };
            seq.to(scoreProxy, {
              val: SCORE_MAX, duration: 1.8, ease: "power2.out",
              onUpdate: () => {
                if (scoreNumberRef.current) scoreNumberRef.current.textContent = String(Math.round(scoreProxy.val));
                if (circlePercentRef.current) circlePercentRef.current.textContent = `${Math.round(scoreProxy.val)}%`;
              },
              onStart: () => {
                if (scoreNumberRef.current) gsap.to(scoreNumberRef.current, { opacity: 1, duration: 0.3 });
                if (circlePercentRef.current) gsap.to(circlePercentRef.current, { opacity: 1, duration: 0.3 });
              },
            }, "+=0.2");
            if (circleRef.current) {
              seq.to(circleRef.current, {
                strokeDashoffset: 2 * Math.PI * 24 * (1 - SCORE_MAX / 100),
                duration: 1.8, ease: "power2.out",
              }, "<");
            }
            seq.to({}, { duration: 3.5 });
            seq.call(() => {
              if (crossedTextRef.current) gsap.set(crossedTextRef.current, { opacity: 0, x: -8 });
              if (rewrittenRef.current) {
                gsap.set(rewrittenRef.current, { opacity: 0 });
                rewrittenRef.current.textContent = "";
              }
              if (scoreNumberRef.current) {
                gsap.set(scoreNumberRef.current, { opacity: 0 });
                scoreNumberRef.current.textContent = "0";
              }
              if (circleRef.current) gsap.set(circleRef.current, { strokeDashoffset: 2 * Math.PI * 24 });
              if (circlePercentRef.current) gsap.set(circlePercentRef.current, { opacity: 0 });
              keywordRefs.current.forEach((el) => { if (el) gsap.set(el, { opacity: 0.3, scale: 0.96 }); });
              gsap.delayedCall(1.0, runAiSequence);
            });
          };
          gsap.delayedCall(1.6, runAiSequence);

          const shimmerTl = gsap.timeline({ repeat: -1, repeatDelay: 4 });
          if (atsBadgeRef.current) {
            shimmerTl.fromTo(atsBadgeRef.current, { backgroundPosition: "-200% center" }, { backgroundPosition: "200% center", duration: 1.2, ease: "none", delay: 3 });
          }

          gsap.delayedCall(2.5, () => {
            keywordRefs.current.forEach((el, i) => {
              if (el) {
                gsap.to(el, {
                  boxShadow: "0 0 8px 1px rgba(16,185,129,0.25)",
                  duration: 0.6, delay: i * 0.4 + Math.random() * 1.5, ease: "sine.out", repeat: -1, yoyo: true, repeatDelay: 3 + i * 0.7,
                });
              }
            });
          });
        }
      );
      return () => {
        mm.revert();
        if (activeIntervalRef.current) {
          clearInterval(activeIntervalRef.current);
        }
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative w-full h-[520px] flex items-center justify-center select-none">
      <BackgroundCVs />
      <div
        ref={cardRef}
        className="relative z-20 w-[340px] md:w-[410px] h-[480px] bg-white border border-brand-navy/5 rounded-3xl shadow-[0_30px_60px_rgba(11,19,43,0.07)] p-6 md:p-7 flex flex-col justify-between cursor-pointer"
        style={{ willChange: "transform" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => { isHovered.current = true; }}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex justify-between items-center" style={{ transform: "translateZ(30px)" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-navy/5 flex items-center justify-center text-brand-navy">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-brand-navy text-xs leading-none">Alexandre Martin</h3>
              <p className="text-[10px] text-text-secondary mt-0.5">Lead Software Engineer</p>
            </div>
          </div>
          <div
            ref={atsBadgeRef}
            className="flex items-center gap-1 px-2.5 py-1 bg-brand-green/10 text-brand-green rounded-full text-[9px] font-bold tracking-wider overflow-hidden"
            style={{
              background: "linear-gradient(105deg, rgba(16,185,129,0.1) 0%, rgba(16,185,129,0.22) 50%, rgba(16,185,129,0.1) 100%)",
              backgroundSize: "400% 100%", backgroundPosition: "-200% center",
            }}
          >
            <CheckCircle2 className="w-3 h-3" />
            <span>ATS COMPATIBLE</span>
          </div>
        </div>

        <div className="space-y-4 my-auto pt-2" style={{ transform: "translateZ(40px)" }}>
          <div className="bg-brand-bg/50 rounded-2xl p-4 border border-brand-navy/5 space-y-3">
            <div className="flex items-center justify-between text-[10px] text-text-secondary font-bold tracking-wide uppercase">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-brand-blue" />
                Optimisation Sémantique
              </span>
              <span className="text-brand-blue flex items-center gap-0.5 font-bold">
                <Sparkles className="w-3 h-3 fill-current animate-pulse" /> IA Active
              </span>
            </div>
            <p
              ref={crossedTextRef}
              className="text-[11px] text-brand-navy/40 font-mono leading-relaxed line-through pl-2 border-l border-brand-navy/10"
              style={{ willChange: "transform, opacity" }}
            >
              {"\"J'étais responsable de l'équipe technique et du développement.\""}
            </p>
            <p
              ref={rewrittenRef}
              className="text-[11px] text-brand-blue font-mono font-medium leading-relaxed bg-brand-blue/5 p-2.5 rounded-lg border-l-2 border-brand-blue min-h-[2.5rem]"
              style={{ willChange: "opacity" }}
            />
          </div>

          <div className="grid grid-cols-2 gap-1.5 text-[10px]">
            {[
              { label: "Cloud Architecture", variant: "green" as const },
              { label: "Docker & K8s", variant: "green" as const },
              { label: "CI/CD Pipelines", variant: "green" as const },
              { label: "Python Scaling", variant: "blue" as const, badge: "MATCHED" },
            ].map(({ label, variant, badge }, i) => (
              <div
                key={label}
                ref={(el) => { keywordRefs.current[i] = el; }}
                className={`px-2.5 py-1.5 rounded-lg font-semibold flex items-center justify-between ${
                  variant === "green"
                    ? "bg-brand-green/5 border border-brand-green/10 text-brand-green"
                    : "bg-brand-blue/5 border border-brand-blue/10 text-brand-blue font-bold"
                }`}
                style={{ willChange: "transform, opacity, box-shadow" }}
              >
                <span>{label}</span>
                {badge ? (
                  <span className="text-[8px] bg-brand-blue/15 px-1 rounded font-extrabold uppercase">{badge}</span>
                ) : (
                  <span>✓</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <AtsScoreRing
          circleRef={circleRef}
          scoreNumberRef={scoreNumberRef}
          circlePercentRef={circlePercentRef}
        />
      </div>
    </div>
  );
}
