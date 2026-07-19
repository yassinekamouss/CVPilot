"use client";

import React, { useState } from "react";
import { Control, useFieldArray } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { ResumeContent } from "@/schemas/resume.schema";
import { LanguagesSection } from "./LanguagesSection";
import { CertificationsSection } from "./CertificationsSection";
import { ProjectsSection } from "./ProjectsSection";
import { InterestsSection } from "./InterestsSection";
import {
  Globe,
  Award,
  FolderGit2,
  Heart,
  PlusCircle,
  ChevronDown,
  FileText,
  List,
  Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormField } from "../FormField";
import { Controller } from "react-hook-form";
import { ResumeContent as RC } from "@/schemas/resume.schema";

interface FinalizeStepProps {
  control: Control<ResumeContent>;
  liveData: ResumeContent;
}

interface OptionalSectionConfig {
  id: keyof Pick<ResumeContent, "languages" | "certifications" | "projects" | "interests">;
  label: string;
  icon: React.ElementType;
  accentColor: string;
  description: string;
}

const OPTIONAL_SECTIONS: OptionalSectionConfig[] = [
  {
    id: "languages",
    label: "Languages",
    icon: Globe,
    accentColor: "#2563EB",
    description: "Languages you speak and your proficiency level",
  },
  {
    id: "certifications",
    label: "Certifications",
    icon: Award,
    accentColor: "#10B981",
    description: "Industry certifications that boost your credibility",
  },
  {
    id: "projects",
    label: "Projects",
    icon: FolderGit2,
    accentColor: "#8B5CF6",
    description: "Personal or professional projects to showcase your skills",
  },
  {
    id: "interests",
    label: "Interests",
    icon: Heart,
    accentColor: "#EF4444",
    description: "Personal interests that round out your profile",
  },
];

/**
 * FinalizeStep
 *
 * Step 6 of the editor. Surfaces all optional sections as toggleable cards.
 * When a card is toggled ON, the section form expands inline.
 * Also manages custom sections.
 *
 * SOLID — each optional section delegates rendering to its own component.
 */
export function FinalizeStep({ control, liveData }: FinalizeStepProps) {
  // Track which optional sections are "enabled" (open)
  const [enabled, setEnabled] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    if (liveData.languages && liveData.languages.length > 0) initial.add("languages");
    if (liveData.certifications && liveData.certifications.length > 0) initial.add("certifications");
    if (liveData.projects && liveData.projects.length > 0) initial.add("projects");
    if (liveData.interests && liveData.interests.length > 0) initial.add("interests");
    return initial;
  });

  const toggle = (id: string) => {
    setEnabled((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="mb-1">
        <h3 className="text-sm font-semibold text-[#0B132B]">Finalize Your Resume</h3>
        <p className="text-[11px] text-[#94A3B8] mt-0.5">
          Add optional sections to stand out. Toggle each section on to fill it in.
        </p>
      </div>

      {/* Optional section toggles */}
      {OPTIONAL_SECTIONS.map((sec) => {
        const isOn = enabled.has(sec.id);
        const Icon = sec.icon;
        return (
          <OptionalSectionCard
            key={sec.id}
            id={sec.id}
            label={sec.label}
            description={sec.description}
            icon={Icon}
            accentColor={sec.accentColor}
            isOn={isOn}
            onToggle={() => toggle(sec.id)}
          >
            {sec.id === "languages" && <LanguagesSection control={control} />}
            {sec.id === "certifications" && <CertificationsSection control={control} />}
            {sec.id === "projects" && <ProjectsSection control={control} />}
            {sec.id === "interests" && <InterestsSection control={control} />}
          </OptionalSectionCard>
        );
      })}

      {/* Custom sections */}
      <CustomSectionsManager control={control} liveData={liveData} />
    </div>
  );
}

// ─── Optional Section Toggle Card ────────────────────────────────────────────

interface OptionalSectionCardProps {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  accentColor: string;
  isOn: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function OptionalSectionCard({
  id,
  label,
  description,
  icon: Icon,
  accentColor,
  isOn,
  onToggle,
  children,
}: OptionalSectionCardProps) {
  return (
    <div
      className={[
        "rounded-xl border transition-all duration-200",
        isOn ? "border-[#2563EB]/30 bg-[#FAFBFF]" : "border-[#E2E8F0] bg-white",
      ].join(" ")}
    >
      {/* Header row */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer"
        onClick={onToggle}
        role="button"
        aria-expanded={isOn}
        aria-controls={`optional-section-${id}`}
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
          style={{
            backgroundColor: isOn ? `${accentColor}15` : "#F8FAFC",
            color: isOn ? accentColor : "#94A3B8",
          }}
        >
          <Icon size={14} strokeWidth={1.8} />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-semibold text-[#0B132B] leading-tight">{label}</p>
          <p className="text-[10px] text-[#94A3B8] leading-tight mt-0.5 truncate">{description}</p>
        </div>

        {/* Toggle pill */}
        <div
          className={[
            "w-9 h-5 rounded-full transition-all duration-200 flex-shrink-0 relative",
            isOn ? "bg-[#2563EB]" : "bg-[#E2E8F0]",
          ].join(" ")}
        >
          <motion.div
            className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm"
            animate={{ left: isOn ? "calc(100% - 18px)" : "2px" }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </div>
      </div>

      {/* Expanding form content */}
      <AnimatePresence initial={false}>
        {isOn && (
          <motion.div
            id={`optional-section-${id}`}
            key={`content-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-4 pb-4 pt-1 border-t border-[#F1F5F9] space-y-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Custom Sections Manager ──────────────────────────────────────────────────

function CustomSectionsManager({
  control,
  liveData,
}: {
  control: Control<RC>;
  liveData: RC;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "customSections",
  });

  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState<"bullet_list" | "description">("bullet_list");

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    append({
      title: newTitle.trim(),
      type: newType,
      items: newType === "bullet_list" ? [] : undefined,
      description: newType === "description" ? "" : "",
    });
    setNewTitle("");
    setIsAdding(false);
  };

  const [openSections, setOpenSections] = useState<Set<number>>(new Set());
  const toggleSection = (idx: number) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <div className="rounded-xl border border-dashed border-[#CBD5E1] bg-white">
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3">
        <div className="w-7 h-7 rounded-lg bg-[#F8FAFC] flex items-center justify-center text-[#94A3B8]">
          <PlusCircle size={14} strokeWidth={1.8} />
        </div>
        <div className="flex-1">
          <p className="text-[12px] font-semibold text-[#0B132B]">Custom Sections</p>
          <p className="text-[10px] text-[#94A3B8] mt-0.5">Add any section not listed above</p>
        </div>
      </div>

      {/* Existing custom sections */}
      {fields.length > 0 && (
        <div className="border-t border-[#F1F5F9] divide-y divide-[#F1F5F9]">
          {fields.map((field, idx) => {
            const entry = liveData.customSections?.[idx];
            const isOpen = openSections.has(idx);
            return (
              <div key={field.id}>
                {/* Custom section header */}
                <div
                  className="flex items-center gap-2 px-4 py-2.5 cursor-pointer hover:bg-[#FAFAFA] transition-colors"
                  onClick={() => toggleSection(idx)}
                >
                  {entry?.type === "bullet_list" ? (
                    <List size={12} className="text-[#94A3B8] flex-shrink-0" />
                  ) : (
                    <FileText size={12} className="text-[#94A3B8] flex-shrink-0" />
                  )}
                  <span className="flex-1 text-[12px] font-medium text-[#374151]">
                    {entry?.title || `Custom Section ${idx + 1}`}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); remove(idx); }}
                    className="p-1 rounded text-[#CBD5E1] hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <Trash2 size={11} />
                  </button>
                  <ChevronDown
                    size={12}
                    className={`text-[#94A3B8] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="px-4 pb-3 pt-1 space-y-2 bg-[#FAFBFF]">
                        <FormField id={`cs-${idx}-title`} label="Section Title">
                          <Controller
                            control={control}
                            name={`customSections.${idx}.title`}
                            render={({ field: f }) => (
                              <Input
                                {...f}
                                id={`cs-${idx}-title`}
                                value={f.value ?? ""}
                                placeholder="e.g. Volunteer Work, Publications..."
                                className="h-8 text-sm border-[#E2E8F0] rounded-lg focus:ring-1 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-all"
                              />
                            )}
                          />
                        </FormField>

                        {entry?.type === "bullet_list" ? (
                          <CustomBulletList control={control} sectionIndex={idx} />
                        ) : (
                          <FormField id={`cs-${idx}-desc`} label="Content">
                            <Controller
                              control={control}
                              name={`customSections.${idx}.description`}
                              render={({ field: f }) => (
                                <textarea
                                  {...f}
                                  id={`cs-${idx}-desc`}
                                  value={f.value ?? ""}
                                  placeholder="Write your content here..."
                                  rows={3}
                                  className="w-full text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 focus:ring-1 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-all resize-none outline-none text-[#0B132B] placeholder:text-[#CBD5E1]"
                                />
                              )}
                            />
                          </FormField>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}

      {/* Add new section form */}
      <div className="border-t border-[#F1F5F9] px-4 py-3">
        <AnimatePresence>
          {isAdding ? (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="space-y-2"
            >
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Section name (e.g. Volunteer Work)"
                className="h-8 text-sm border-[#E2E8F0] rounded-lg focus:ring-1 focus:ring-[#2563EB]/50 focus:border-[#2563EB]"
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                autoFocus
              />
              {/* Type selector */}
              <div className="flex gap-2">
                {(["bullet_list", "description"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setNewType(t)}
                    className={[
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium border transition-all cursor-pointer",
                      newType === t
                        ? "border-[#2563EB] bg-blue-50 text-[#2563EB]"
                        : "border-[#E2E8F0] text-[#64748B] hover:border-[#2563EB]/50",
                    ].join(" ")}
                  >
                    {t === "bullet_list" ? <List size={11} /> : <FileText size={11} />}
                    {t === "bullet_list" ? "Bullet List" : "Description"}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  onClick={handleAdd}
                  disabled={!newTitle.trim()}
                  className="h-7 px-3 text-[11px] rounded-lg bg-[#2563EB] hover:bg-[#1d4ed8] text-white"
                >
                  Add Section
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => { setIsAdding(false); setNewTitle(""); }}
                  className="h-7 px-3 text-[11px] rounded-lg text-[#64748B]"
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          ) : (
            <button
              type="button"
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 text-[11px] font-medium text-[#64748B] hover:text-[#2563EB] transition-colors cursor-pointer"
            >
              <PlusCircle size={13} />
              Add custom section
            </button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Custom Bullet List manager ───────────────────────────────────────────────

function CustomBulletList({
  control,
  sectionIndex,
}: {
  control: Control<RC>;
  sectionIndex: number;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `customSections.${sectionIndex}.items` as any,
  });

  return (
    <div className="space-y-1.5">
      {fields.map((item, idx) => (
        <div key={item.id} className="flex items-center gap-2">
          <span className="text-[#2563EB] text-xs flex-shrink-0">•</span>
          <Controller
            control={control}
            name={`customSections.${sectionIndex}.items.${idx}` as any}
            render={({ field: f }) => (
              <Input
                {...f}
                value={f.value ?? ""}
                placeholder="Add a bullet point..."
                className="flex-1 h-7 text-xs border-[#E2E8F0] rounded-lg focus:ring-1 focus:ring-[#2563EB]/50 focus:border-[#2563EB]"
              />
            )}
          />
          <button
            type="button"
            onClick={() => remove(idx)}
            className="text-[#CBD5E1] hover:text-red-400 transition-colors cursor-pointer p-1"
          >
            <Trash2 size={11} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append("" as any)}
        className="text-[11px] font-medium text-[#2563EB] hover:text-[#1d4ed8] transition-colors cursor-pointer flex items-center gap-1"
      >
        <PlusCircle size={11} />
        Add item
      </button>
    </div>
  );
}
