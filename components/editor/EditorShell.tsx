"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resumeContentSchema, type ResumeContent } from "@/schemas/resume.schema";
import { EditorPanel } from "./EditorPanel/EditorPanel";
import { PreviewPanel } from "./PreviewPanel/PreviewPanel";

interface EditorShellProps {
  resumeId: string;
}

const DEFAULT_VALUES: ResumeContent = {
  personalInfo: {
    firstName: "Sarah",
    lastName: "Conner",
    email: "sarah.conner@gmail.com",
    phone: "+1 (555) 382-9901",
    location: "Los Angeles, CA",
    jobTitle: "Senior Frontend Engineer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
  },
  summary: "Highly skilled Frontend Architect with over 6 years of experience specializing in React, Next.js, and modern CSS frameworks. Proven track record of designing fluid user experiences, modular component libraries, and robust type-safe web applications.",
  experience: [
    {
      company: "InnovateTech Solutions",
      position: "Lead Frontend Engineer",
      startDate: "Jan 2022",
      endDate: "",
      current: true,
      description: "Spearheaded the migration of a legacy dashboard to Next.js App Router, increasing page load speed by 42% and developer velocity by 30%. Led a team of 4 junior developers and established code styling standards.",
      bulletPoints: [
        "Designed and maintained a centralized design system using Tailwind and Radix UI.",
        "Implemented real-time data sync using WebSockets for live status updates.",
        "Optimized bundle sizes by 35% through dynamic imports and code splitting."
      ]
    },
    {
      company: "WebCraft Studio",
      position: "Frontend Developer",
      startDate: "Mar 2020",
      endDate: "Dec 2021",
      current: false,
      description: "Built pixel-perfect responsive landing pages and high-fidelity web app interfaces for enterprise B2B customers.",
      bulletPoints: [
        "Collaborated closely with product designers to implement interactive UI features.",
        "Wrote test suites with Jest and React Testing Library to achieve 90%+ code coverage."
      ]
    }
  ],
  education: [
    {
      school: "University of California, Berkeley",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      startDate: "Sep 2016",
      endDate: "Jun 2020",
      description: "Graduated with Honors. Specialized in Human-Computer Interaction and Software Engineering."
    }
  ],
  skills: [
    { name: "TypeScript", level: "Expert" },
    { name: "React / Next.js", level: "Expert" },
    { name: "CSS / Tailwind", level: "Advanced" },
    { name: "GraphQL / Node.js", level: "Intermediate" }
  ],
  languages: [
    { name: "English", level: "Native" },
    { name: "Spanish", level: "Conversational" }
  ],
  certifications: [
    { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", date: "Feb 2023" }
  ],
  projects: [
    { name: "CVPilot Editor", description: "Built the frontend of an interactive split-pane resume builder using React Hook Form.", link: "https://github.com/cvpilot/editor" }
  ],
  interests: ["UI Design", "Open Source Contribution", "Hiking", "Photography"]
};

export function EditorShell({ resumeId }: EditorShellProps) {
  const { control, register, watch } = useForm<ResumeContent>({
    resolver: zodResolver(resumeContentSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onChange",
  });

  const liveData = watch();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      {/* Editor Panel (Left Column) */}
      <EditorPanel control={control} register={register} />

      {/* Preview Panel (Right Column) */}
      <PreviewPanel data={liveData} />
    </div>
  );
}
