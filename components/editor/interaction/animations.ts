/**
 * animations.ts
 *
 * Single source of truth for all interaction animation constants.
 * Import from here whenever you need timing or easing values.
 */

/** Duration in ms for hover/focus transitions */
export const ANIMATION_DURATION_MS = 200;

/** CSS easing for all transitions */
export const ANIMATION_EASING = "ease-out";

/** Scale applied to the active section in the preview */
export const SCALE_ACTIVE = 1.02;

/** Default (resting) scale */
export const SCALE_DEFAULT = 1;

/** CSS transition shorthand — use on .resume-section elements */
export const SECTION_TRANSITION = `all ${ANIMATION_DURATION_MS}ms ${ANIMATION_EASING}`;
