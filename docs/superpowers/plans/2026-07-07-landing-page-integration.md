# Landing Page Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate the French static landing page components with next-intl localized routing and redirect all major CTAs to the login page.

**Architecture:** Modify static landing page components to import and utilize the Next.js `next-intl` custom `Link` component from `@/i18n/routing`. This ensures client-side prefetching, layout preservation, and automatic retention of the locale prefix (e.g. `/fr` or `/en`) on all internal navigations (such as `/login` or `/`).

**Tech Stack:** Next.js 16+ (App Router), React 19, next-intl, Tailwind CSS, GSAP.

## Global Constraints

- Preserve all existing hardcoded French landing page copy without translating them.
- Import `Link` exclusively from `@/i18n/routing` for internal page transitions.
- Ensure all components pass TypeScript validation.

---

### Task 1: Update NavBar Navigation Links

**Files:**
- Modify: `components/navbar.tsx`

**Interfaces:**
- Consumes: none
- Produces: Localized header navigation links pointing to `/login` and `/`

- [ ] **Step 1: Perform the code changes in components/navbar.tsx**

Replace `components/navbar.tsx` content to import `Link` and wrap logo/buttons in `Link` components.

```tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";

const navLinks = [
  { label: "Fonctionnalités", href: "#features" },
  { label: "Modèles", href: "#templates" },
  { label: "Tarifs", href: "#pricing" },
  { label: "Comment ça marche", href: "#how-it-works" },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-5 left-0 right-0 z-50 px-4 sm:px-6 md:px-8 pointer-events-none">
      <nav className="mx-auto max-w-7xl w-full bg-white/70 backdrop-blur-xl border border-white/30 rounded-full px-4 sm:px-6 py-2.5 shadow-[0_12px_40px_rgba(11,19,43,0.06)] pointer-events-auto transition-all duration-300">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 pl-2">
            <Image src="/main_logo.svg" alt="PROCV" width={32} height={32} className="h-8 w-auto" priority />
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-semibold text-text-secondary hover:text-brand-blue transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-3 pr-2">
            <Link href="/login" className="text-xs font-bold text-brand-navy hover:text-brand-blue px-3 py-1.5 transition-colors duration-200">
              Connexion
            </Link>
            <Link href="/login" className="flex items-center gap-1.5 bg-brand-navy hover:bg-brand-blue text-white text-xs font-bold px-4 py-2 rounded-full transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]">
              Essai Gratuit
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex md:hidden pr-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-full p-1.5 text-text-secondary hover:bg-brand-bg hover:text-brand-navy focus:outline-none transition-colors"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Ouvrir le menu</span>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="absolute top-16 left-4 right-4 md:hidden border border-border-light bg-white/95 backdrop-blur-md rounded-2xl p-5 space-y-4 shadow-xl pointer-events-auto">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-semibold text-text-secondary hover:bg-brand-bg hover:text-brand-navy transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <hr className="border-border-light" />
          <div className="flex flex-col gap-3 pt-1">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2 text-sm font-bold text-brand-navy hover:bg-brand-bg rounded-lg transition-colors"
            >
              Connexion
            </Link>
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2.5 bg-brand-navy hover:bg-brand-blue text-white text-sm font-bold rounded-full transition-colors shadow-sm"
            >
              Essai Gratuit
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Run verification**

Run: `npx tsc --noEmit`
Expected: PASS with no compile errors.

- [ ] **Step 3: Commit**

```bash
git add components/navbar.tsx
git commit -m "feat: link navbar actions to localized login route"
```

---

### Task 2: Update Hero Content CTAs and Refs

**Files:**
- Modify: `components/hero/hero-content.tsx`

**Interfaces:**
- Consumes: none
- Produces: Localized hero actions keeping animation refs intact.

- [ ] **Step 1: Perform the code changes in components/hero/hero-content.tsx**

Replace CTA `<button>` tags with `<Link>` components from `@/i18n/routing` while passing the `ref` to preserve GSAP animations.

```tsx
// Around line 3:
import { UploadCloud, FileEdit } from "lucide-react";
import InteractiveCvCard from "./interactive-cv-card";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@/i18n/routing";
```

```tsx
// Around line 148:
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/login"
                ref={ctaPrimaryRef}
                className="flex items-center justify-center gap-2 bg-brand-navy hover:bg-brand-blue text-white font-semibold px-8 py-4 rounded-full shadow-lg shadow-brand-navy/5 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                style={{ willChange: "transform, opacity" }}
              >
                <UploadCloud className="w-4 h-4" />
                <span>Analyser mon CV (Gratuit)</span>
              </Link>
              <Link
                href="/login"
                ref={ctaSecondaryRef}
                className="flex items-center justify-center gap-2 border border-brand-navy/20 hover:border-brand-navy text-brand-navy hover:bg-brand-navy/5 font-semibold px-8 py-4 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                style={{ willChange: "transform, opacity" }}
              >
                <FileEdit className="w-4 h-4" />
                <span>Créer un CV de zéro</span>
              </Link>
            </div>
```

- [ ] **Step 2: Run verification**

Run: `npx tsc --noEmit`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add components/hero/hero-content.tsx
git commit -m "feat: link hero section CTAs to login with animated refs"
```

---

### Task 3: Update Pricing Section CTAs

**Files:**
- Modify: `components/pricing.tsx`

**Interfaces:**
- Consumes: none
- Produces: Localized pricing action buttons.

- [ ] **Step 1: Perform the code changes in components/pricing.tsx**

Replace pricing `<button>` elements with `<Link>` components from `@/i18n/routing`.

```tsx
// Around line 1:
import React from "react";
import { Check, X, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/routing";
```

```tsx
// Around line 71:
            <Link href="/login" className="w-full text-center py-3.5 border border-brand-navy/10 text-brand-navy hover:bg-slate-50 rounded-xl font-bold text-xs transition-all active:scale-[0.98] uppercase tracking-wider block">
              Analyser mon CV
            </Link>
```

```tsx
// Around line 108:
            <Link href="/login" className="w-full text-center py-3.5 bg-brand-blue hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-md shadow-brand-blue/15 hover:shadow-lg transition-all active:scale-[0.98] uppercase tracking-wider block">
              Débloquer Premium
            </Link>
```

- [ ] **Step 2: Run verification**

Run: `npx tsc --noEmit`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add components/pricing.tsx
git commit -m "feat: link pricing actions to login"
```

---

### Task 4: Update Final CTA and Footer Links

**Files:**
- Modify: `components/final-cta.tsx`
- Modify: `components/footer.tsx`

**Interfaces:**
- Consumes: none
- Produces: Localized action links in CTA banner and footer logo.

- [ ] **Step 1: Perform the code changes in components/final-cta.tsx**

```tsx
// Around line 1:
import React from "react";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/routing";
```

```tsx
// Around line 82:
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/login" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0B132B] hover:bg-[#2563EB] text-white px-8 py-3.5 rounded-lg font-medium text-sm transition-colors duration-200 shadow-sm cursor-pointer">
                <span>Analyser mon CV maintenant</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/#features" className="w-full sm:w-auto inline-flex items-center justify-center border border-[#E2E8F0] hover:border-slate-400 text-[#0B132B] hover:bg-slate-50 px-8 py-3.5 rounded-lg font-medium text-sm transition-colors duration-200 cursor-pointer">
                Découvrir l'outil
              </Link>
            </div>
```

- [ ] **Step 2: Perform the code changes in components/footer.tsx**

```tsx
// Around line 1:
import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
```

```tsx
// Around line 9:
          <div className="md:col-span-6 space-y-4">
            <Link href="/" className="flex items-center gap-2 pl-2">
              <Image src="/main_logo_dark_mode.svg" alt="PROCV" width={32} height={32} className="h-8 w-auto" />
            </Link>
```

- [ ] **Step 3: Run verification**

Run: `npx tsc --noEmit`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add components/final-cta.tsx components/footer.tsx
git commit -m "feat: link final CTA and footer logo to correct paths"
```

---

### Task 5: Full Application Verification and Build

**Files:**
- Test: Build output and compilation checks.

- [ ] **Step 1: Check typescript compiler**

Run: `npx tsc --noEmit`
Expected: PASS with exit code 0.

- [ ] **Step 2: Run project production build**

Run: `npm run build`
Expected: Compilation completes successfully, generating static routes and SSR assets.
