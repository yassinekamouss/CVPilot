"use client";

/**
 * ResumeInteractionContext.tsx
 *
 * Single Responsibility: Own all section-interaction state and provide
 * a clean API to every consumer (EditorPanel, ResumeSection, useScrollSync).
 *
 * Nothing in here knows about specific templates — it is fully generic.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SectionId =
  | "personalInfo"
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "languages"
  | "certifications"
  | "projects"
  | "interests";

export const ALL_SECTION_IDS: SectionId[] = [
  "personalInfo",
  "summary",
  "experience",
  "education",
  "skills",
  "languages",
  "certifications",
  "projects",
  "interests",
];

interface ResumeInteractionContextValue {
  /** The currently active (editor-focused) section */
  activeSection: SectionId;

  /**
   * Registry of section DOM refs, keyed by SectionId.
   * Populated by <ResumeSection> on mount; removed on unmount.
   * Stored in a ref (not state) to avoid re-renders on registration.
   */
  sectionRefs: React.MutableRefObject<Map<SectionId, React.RefObject<HTMLElement | null>>>;

  /** Register a section's DOM ref (called by <ResumeSection> on mount) */
  registerSection: (id: SectionId, ref: React.RefObject<HTMLElement | null>) => void;

  /** Unregister a section's DOM ref (called by <ResumeSection> on unmount) */
  unregisterSection: (id: SectionId) => void;

  /**
   * Set the active section.
   * Editor → Preview: also triggers scroll sync via useScrollSync.
   * Preview → Editor: clicking a ResumeSection calls this, switching the editor panel.
   */
  focusSection: (id: SectionId) => void;

  /** The section currently being hovered in the preview (null if none) */
  hoveredSection: SectionId | null;
  setHoveredSection: (id: SectionId | null) => void;

  /**
   * Whether interactions in the current subtree should be suppressed.
   * Used by the hidden measurement render in PreviewScaler so it does not
   * compete with the visible render when registering refs.
   */
  suppressInteractions: boolean;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ResumeInteractionContext = createContext<ResumeInteractionContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

interface ResumeInteractionProviderProps {
  children: ReactNode;
  /** Initial active section (defaults to "personalInfo") */
  initialSection?: SectionId;
}

export function ResumeInteractionProvider({
  children,
  initialSection = "personalInfo",
}: ResumeInteractionProviderProps) {
  const [activeSection, setActiveSection] = useState<SectionId>(initialSection);
  const [hoveredSection, setHoveredSection] = useState<SectionId | null>(null);

  /**
   * Map stored in a ref so that registerSection / unregisterSection do NOT
   * trigger a re-render — the refs themselves are imperative handles.
   */
  const sectionRefs = useRef<Map<SectionId, React.RefObject<HTMLElement | null>>>(new Map());

  const registerSection = useCallback(
    (id: SectionId, ref: React.RefObject<HTMLElement | null>) => {
      sectionRefs.current.set(id, ref);
    },
    []
  );

  const unregisterSection = useCallback((id: SectionId) => {
    sectionRefs.current.delete(id);
  }, []);

  const focusSection = useCallback((id: SectionId) => {
    setActiveSection(id);
    // Scroll sync is handled by useScrollSync inside PreviewScaler
    // which observes activeSection from context.
  }, []);

  const value: ResumeInteractionContextValue = {
    activeSection,
    sectionRefs,
    registerSection,
    unregisterSection,
    focusSection,
    hoveredSection,
    setHoveredSection,
    suppressInteractions: false,
  };

  return (
    <ResumeInteractionContext.Provider value={value}>
      {children}
    </ResumeInteractionContext.Provider>
  );
}

// ─── Suppression wrapper ───────────────────────────────────────────────────────

/**
 * SuppressResumeInteractions
 *
 * Wraps children with a context override that marks interactions as suppressed.
 * Used by PreviewScaler's hidden measurement render so <ResumeSection> nodes
 * inside it do NOT register their refs (avoiding a conflict with the visible render).
 */
export function SuppressResumeInteractions({ children }: { children: ReactNode }) {
  const parent = useResumeInteraction();

  const suppressed: ResumeInteractionContextValue = {
    ...parent,
    suppressInteractions: true,
    // No-op overrides so suppressed tree never writes to the registry
    registerSection: () => {},
    unregisterSection: () => {},
    focusSection: () => {},
    setHoveredSection: () => {},
  };

  return (
    <ResumeInteractionContext.Provider value={suppressed}>
      {children}
    </ResumeInteractionContext.Provider>
  );
}

// ─── Consumer hook ────────────────────────────────────────────────────────────

/**
 * useResumeInteraction
 *
 * Consumes the ResumeInteractionContext.
 * Throws if used outside <ResumeInteractionProvider>.
 */
export function useResumeInteraction(): ResumeInteractionContextValue {
  const ctx = useContext(ResumeInteractionContext);
  if (!ctx) {
    throw new Error(
      "useResumeInteraction must be used inside <ResumeInteractionProvider>."
    );
  }
  return ctx;
}
