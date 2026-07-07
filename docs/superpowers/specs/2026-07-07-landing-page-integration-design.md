# Design Specification: Landing Page Integration & Localized Routing

## 1. Context & Objectives
The goal of this task is to integrate the newly added landing page components (which are currently static and hardcoded in French) into the existing CVPilot application architecture. 
The application utilizes `next-intl` for internationalization with locale prefixes (e.g., `/fr`, `/en`) and a root `proxy.ts` wrapper. We need to:
- Harmonize the landing page components with the existing bilingual routing structures.
- Keep the landing page copy as-is in French (as requested by the user, ignoring translation files for the landing page body for now).
- Point all key CTA buttons and navigation elements to the login page (`/login`) using the Next.js `next-intl` Link wrapper to ensure that the current user locale is preserved (e.g., `/fr/login` or `/en/login`).
- Ensure all styling, types, and Next.js standards are followed perfectly.

## 2. Architecture & Routing Integration
The application routes are matched under `/app/[locale]`. The main landing page is rendered at `/app/[locale]/page.tsx`.
To preserve the current locale during navigation, we must import and use the custom Link component:
```tsx
import { Link } from "@/i18n/routing";
```
This wrapper intercepts the URL and prefixes the path with the active locale automatically.

### CTA Directives
The following CTAs will be redirected to the login page `/login`:
1. **Header (NavBar):** "Connexion" & "Essai Gratuit" (Desktop and Mobile viewports).
2. **Hero Section:** "Analyser mon CV (Gratuit)" & "Créer un CV de zéro".
3. **Pricing Section:** "Analyser mon CV" (Free) & "Débloquer Premium" (Premium).
4. **Final CTA Section:** "Analyser mon CV maintenant".

The following navigation elements will point to home:
1. **Header (NavBar):** Main Logo image.
2. **Footer Section:** Footer Logo image.

The following elements will point to hash anchors on the homepage:
1. **Header (NavBar):** "Fonctionnalités" (`#features`), "Modèles" (`#templates`), "Tarifs" (`#pricing`), "Comment ça marche" (`#how-it-works`).
2. **Final CTA Section:** "Découvrir l'outil" (`#features`).

## 3. Detailed Component Modifications

### 3.1 NavBar (`components/navbar.tsx`)
- **File Type:** Client Component (`"use client"`)
- **Changes:**
  - Import `Link` from `@/i18n/routing`.
  - Wrap Logo with `<Link href="/">`.
  - Change "Connexion" and "Essai Gratuit" `<button>` tags to `<Link href="/login">` with equivalent styling.

### 3.2 Hero Content (`components/hero/hero-content.tsx`)
- **File Type:** Client Component (`"use client"`)
- **Changes:**
  - Import `Link` from `@/i18n/routing`.
  - Replace CTA `<button>` elements with `<Link>` components pointing to `/login`.
  - Pass the GSAP animation refs (`ctaPrimaryRef`, `ctaSecondaryRef`) directly to `<Link>`.

### 3.3 Pricing (`components/pricing.tsx`)
- **File Type:** Client/Server Component (currently default)
- **Changes:**
  - Import `Link` from `@/i18n/routing`.
  - Replace CTA `<button>` tags with `<Link href="/login">` components.

### 3.4 Final CTA (`components/final-cta.tsx`)
- **File Type:** Client/Server Component (currently default)
- **Changes:**
  - Import `Link` from `@/i18n/routing`.
  - Replace "Analyser mon CV maintenant" `<button>` with `<Link href="/login">`.
  - Replace "Découvrir l'outil" `<button>` with `<Link href="/#features">`.

### 3.5 Footer (`components/footer.tsx`)
- **File Type:** Client/Server Component (currently default)
- **Changes:**
  - Import `Link` from `@/i18n/routing`.
  - Wrap Logo with `<Link href="/">`.

## 4. Verification Plan
- **Verification 1:** Perform `npx tsc --noEmit` to ensure zero typescript compile errors.
- **Verification 2:** Start local server via `npm run dev` and test links using browser automation to verify that:
  - Accessing `/` redirects to `/fr` and shows the landing page.
  - Clicking "Connexion", "Essai Gratuit", and other landing page CTAs successfully navigates to `/fr/login`.
  - Logo links successfully navigate to `/fr`.
  - If a user manually visits `/en`, clicking CTAs navigates to `/en/login`.
