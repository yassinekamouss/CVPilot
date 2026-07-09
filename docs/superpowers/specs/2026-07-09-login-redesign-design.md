# Design Specification: Premium Login Page Redesign

## 1. Executive Summary

This document specifies the design architecture for the redesign of the PROCV Login Page. The goal is to transform the existing generic centered card into a high-fidelity, premium SaaS authentication experience. The redesigned page will reflect the branding, typography, spacing, and motion design of the marketing landing page, ensuring a seamless user transition.

---

## 2. Layout & Aesthetics (Approach B2 - The "Airy Monolith")

The interface is centered around a focused card layout set against a responsive canvas that adapts to system themes and screen sizes.

### Background Atmosphere
- **Canvas Background:** Set to `#F1F5F9` (CSS variable `--color-brand-bg`).
- **Ambient Glows:** Two organic, low-opacity radial gradients overlay the corners:
  - Top-Left: `w-[50vw] aspect-square rounded-full bg-brand-blue/6 blur-[120px] pointer-events-none absolute left-[-10%] top-[-20%]`
  - Bottom-Right: `w-[60vw] aspect-square rounded-full bg-brand-green/4 blur-[150px] pointer-events-none absolute right-[-10%] bottom-[-10%]`
- **Text Watermark:** Giant typographic branding positioned behind the card container:
  - Text: "PROCV"
  - Styling: `text-[clamp(10rem,25vw,25rem)] font-black text-brand-navy/[0.015] select-none pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-heading tracking-tighter`

### Language Switcher
- Placed in the top-right corner of the page:
  - Position: `absolute top-6 right-6`
  - Style: A transparent glass capsule with subtle hover state transitions.

---

## 3. Card Enclosure (Double-Bezel Architecture)

To give the card physical depth and tactile quality, it uses a nested container hierarchy (Double-Bezel):

1. **Outer Shell:**
   - Class: `w-full max-w-md bg-white/40 p-2 rounded-3xl border border-border-light/40 backdrop-blur-md shadow-[0_24px_50px_-12px_rgba(11,19,43,0.08)]`
   - Purpose: Acts as a physical tray or bezel reflecting ambient background lighting.
2. **Inner Core:**
   - Class: `w-full bg-white border border-border-light/30 rounded-[calc(1.5rem-0.5rem)] p-8 space-y-6`
   - Purpose: Houses the main sign-in forms and copy elements.

---

## 4. Typography & Form Elements

### Header & Copy
- **Logo:** Display `main_logo.svg` centered above the header (`w-10 h-10`).
- **Title:** Localized header using `t("title")` (e.g., "Welcome to PROCV"), styled with `font-heading text-2xl font-semibold tracking-tight text-brand-navy`.
- **Subtitle:** Localized text `t("subtitle")` (e.g., "Sign in to build your AI-powered resume"), styled with `text-sm text-text-secondary font-normal`.

### Error Handling
- An alert container will display if there is an error in the search parameters (e.g., `errorMessage` is resolved).
- Styled with a subtle background and a clean icon:
  - Class: `flex gap-3 rounded-xl border border-amber-200 bg-amber-50/50 p-4 text-sm text-amber-800 leading-relaxed font-normal`

### Sign-in Buttons
- Form buttons must feel tactile with hover transitions and micro-interactions:
  - **Google Login Button:**
    - Styling: `bg-white hover:bg-zinc-50 border border-border-light text-brand-navy shadow-sm active:scale-[0.98] font-medium py-3 rounded-lg flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer`
  - **LinkedIn Login Button:**
    - Styling: `bg-[#0a66c2] hover:bg-[#004182] text-white shadow-sm active:scale-[0.98] font-medium py-3 rounded-lg flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer`

### Footer note & Back Link
- **Footer note:** Localized `t("footerNote")` in `text-center text-xs text-text-secondary leading-relaxed`.
- **Back link:** Navigates back to the homepage (`/`):
  - Styling: `text-xs font-semibold text-text-secondary hover:text-brand-navy transition-colors`
  - Text: Localized or default fallback (e.g., "Go back to home").

---

## 5. Motion Design & Interaction

### GSAP Entrance Timeline
- The page elements animate upon loading using GSAP:
  - Background elements (watermark and radial glows) fade in from `opacity: 0` to final opacity.
  - The outer card container slides up from `y: 40` to `y: 0` and fades in (`opacity: 0` to `1`) using `ease: "power4.out"` over `1.0s`.
  - Inner content elements (Logo, Title, Buttons, Footer) stagger-reveal with a delay of `0.08s` per element.
- **Accessibility:** If the user has enabled `prefers-reduced-motion`, all animations degrade to immediate opacity jumps and zero movement.

### Parallax Hover
- A lightweight mouse-movement tracker will apply a very subtle parallax tilt to the card container:
  - Tracks client X/Y coordinates relative to window center.
  - Lerps the values slightly and rotates the card (`rotateX`, `rotateY`) by a maximum of 3 degrees to simulate a 3D physical surface.
  - Cleaned up on component unmount to prevent resource leaks.

---

## 6. Implementation Checklist

- [ ] Add client-side logic to `app/[locale]/login/page.tsx` or wrap the UI elements in a client component.
- [ ] Implement the Double-Bezel nested tray structure for the card.
- [ ] Integrate GSAP entrance animation using the `@gsap/react` hook.
- [ ] Implement the mouse-parallax tilt effect with a strict cleanup function.
- [ ] Ensure full responsiveness and accessibility (reduced motion support).
- [ ] Maintain support for localized error alerts and existing login logic (forms submitting to server-actions).
