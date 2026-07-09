# Login Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the login page to use a centered, double-bezel card layout with high-end ambient blurs, GSAP entrance staggers, and interactive mouse-parallax tilt, matching the visual identity of the marketing landing page.

**Architecture:** We will create a client-side wrapper `LoginVisualWrapper` that contains the layout visual assets, GSAP animations, and mouse-tilt logic. The existing `app/[locale]/login/page.tsx` remains a Server Component for handling localization, URL errors, and Next-Auth server actions, passing its login content as children to the wrapper.

**Tech Stack:** Next.js (App Router), React, GSAP, Tailwind CSS v4.

## Global Constraints

- Avoid neon and outer glows.
- Use primary navy `#0B132B` and primary blue `#2563EB` as core brand colors.
- Use `font-heading` (Poppins) for headers and `font-sans` (Inter) for body copy.
- No em-dashes anywhere in typography, copy, or comments. Use hyphens.
- Respect `prefers-reduced-motion` and disable motion if active.
- Do not use window scroll listeners in React state; isolate client-side animations.

---

### Task 1: Create the LoginVisualWrapper Component

**Files:**
- Create: `components/auth/login-visual-wrapper.tsx`

**Interfaces:**
- Produces: `LoginVisualWrapper` component
  - Props: `{ children: React.ReactNode, locale: string }`

- [ ] **Step 1: Create the client-side visual wrapper component**
  Write the complete code for `components/auth/login-visual-wrapper.tsx` with GSAP animations, responsive layout, double-bezel shell, and mouse-parallax tilt.

  ```tsx
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
  ```

- [ ] **Step 2: Verify the file is compiled cleanly**
  Check that there are no syntax errors or typings problems by importing it (this will be tested together with Task 2).

- [ ] **Step 3: Commit visual wrapper**
  ```bash
  git add components/auth/login-visual-wrapper.tsx
  git commit -m "feat: create client-side login visual wrapper with GSAP and parallax"
  ```

---

### Task 2: Refactor Login Page to use the Visual Wrapper

**Files:**
- Modify: `app/[locale]/login/page.tsx`

**Interfaces:**
- Consumes: `LoginVisualWrapper` from `components/auth/login-visual-wrapper`

- [ ] **Step 1: Modify login page to integrate LoginVisualWrapper**
  Replace the existing centering div layout in `app/[locale]/login/page.tsx` with `<LoginVisualWrapper>` and apply class `.animate-stagger-item` to the internal forms, headers, alerts, and back links so they stagger in correctly. Refine the button and form style.

  ```tsx
  import { AuthError } from "next-auth";
  import { signIn } from "@/lib/auth/auth";
  import { getTranslations, setRequestLocale } from "next-intl/server";
  import { Link } from "@/i18n/routing";
  import Image from "next/image";

  import { APP_ROUTES, AUTH_PROVIDER_LABELS, DEFAULT_AUTH_PROVIDER } from "@/constants";
  import type { LoginSearchParams } from "@/types";
  import LanguageSwitcher from "@/components/shared/language-switcher";
  import LoginVisualWrapper from "@/components/auth/login-visual-wrapper";

  interface LoginPageProps {
    params: Promise<{ locale: string }>;
    searchParams: Promise<LoginSearchParams>;
  }

  export default async function LoginPage({ params, searchParams }: LoginPageProps) {
    const { locale } = await params;
    
    // Set request locale for static rendering optimization
    setRequestLocale(locale);

    const t = await getTranslations("Login");
    
    const resolvedSearchParams = await searchParams;
    const { error, existingProvider } = resolvedSearchParams;

    // Resolve localized messages using next-intl
    let errorMessage: string | null = null;
    if (error) {
      if (error === "AccountConflict") {
        const providerLabel =
          (existingProvider &&
            AUTH_PROVIDER_LABELS[existingProvider as keyof typeof AUTH_PROVIDER_LABELS]) ??
          existingProvider ??
          "another provider";
        errorMessage = t("errors.conflict", { provider: providerLabel });
      } else {
        const translationKey = `errors.${error}` as const;
        errorMessage = t.has(translationKey)
          ? t(translationKey)
          : t("errors.default");
      }
    }

    return (
      <LoginVisualWrapper locale={locale}>
        {/* Floating Language Switcher in outer visual wrapper corner */}
        <div className="absolute top-6 right-6 z-20 pointer-events-auto">
          <LanguageSwitcher />
        </div>

        {/* Logo and Header info */}
        <div className="text-center space-y-4 animate-stagger-item">
          <div className="flex justify-center">
            <Link href="/" className="transition-transform duration-300 hover:scale-105 active:scale-95">
              <Image
                src="/main_logo.svg"
                alt="PROCV Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </Link>
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight text-brand-navy font-heading">
              {t("title")}
            </h1>
            <p className="text-sm text-text-secondary">
              {t("subtitle")}
            </p>
          </div>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div
            role="alert"
            className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50/50 p-4 text-sm text-amber-800 leading-relaxed animate-stagger-item"
          >
            <svg
              className="mt-0.5 h-4 w-4 shrink-0 text-amber-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Auth Provider Forms */}
        <div className="space-y-3 pt-2 animate-stagger-item">
          {/* Google form */}
          <form
            action={async () => {
              "use server";
              try {
                await signIn(DEFAULT_AUTH_PROVIDER, { redirectTo: `/${locale}${APP_ROUTES.dashboard}` });
              } catch (err) {
                if (err instanceof AuthError) throw err;
                throw err;
              }
            }}
          >
            <button
              id="btn-sign-in-google"
              type="submit"
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg border border-border-light bg-white hover:bg-zinc-50 text-brand-navy font-semibold text-sm transition-all duration-300 active:scale-[0.98] cursor-pointer shadow-xs hover:shadow-sm"
            >
              {/* Clean Google SVG */}
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>{t("google")}</span>
            </button>
          </form>

          {/* LinkedIn form */}
          <form
            action={async () => {
              "use server";
              try {
                await signIn("linkedin", { redirectTo: `/${locale}${APP_ROUTES.dashboard}` });
              } catch (err) {
                if (err instanceof AuthError) throw err;
                throw err;
              }
            }}
          >
            <button
              id="btn-sign-in-linkedin"
              type="submit"
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg bg-[#0a66c2] hover:bg-[#004182] text-white font-semibold text-sm transition-all duration-300 active:scale-[0.98] cursor-pointer shadow-xs hover:shadow-sm"
            >
              {/* Clean LinkedIn SVG */}
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span>{t("linkedin")}</span>
            </button>
          </form>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-text-secondary leading-relaxed pt-2 animate-stagger-item">
          {t("footerNote")}
        </p>

        {/* Return home link */}
        <div className="text-center pt-2 animate-stagger-item">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-brand-navy transition-colors duration-200"
          >
            ← {t("errors.Verification") ? t("title") : "Go back"}
          </Link>
        </div>
      </LoginVisualWrapper>
    );
  }
  ```

- [ ] **Step 2: Verify the Next.js compile is successful**
  Run: `npm run build` or start local server and verify there are no compilation errors.

- [ ] **Step 3: Commit page refactor**
  ```bash
  git add app/[locale]/login/page.tsx
  git commit -m "feat: refactor login page to leverage double-bezel wrapper and GSAP staggers"
  ```
