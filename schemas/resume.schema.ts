import { z } from "zod";


// Structure for custom sections user creates
const CustomSection = z.object({
  title: z.string().min(1, "Section title is required"),
  // Users can choose a layout: list of points, or a rich text description
  type: z.enum(["bullet_list", "description"]).default("bullet_list"),
  items: z.array(z.string()).optional(), // If type is bullet_list
  description: z.string(), // If type is description
});


/**
 * Strict Zod schema for the Resume.content JSONB field.
 * Ensures data integrity for all resume sections.
 */
export const resumeContentSchema = z.object({
  personalInfo: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    location: z.string().optional(),
    jobTitle: z.string().optional(),
    avatar: z.string().url().optional(),
  }).optional(),

  summary: z.string().optional(),

  experience: z.array(z.object({
    company: z.string(),
    position: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    current: z.boolean().optional(),
    description: z.string().optional(),
    bulletPoints: z.array(z.string()).optional(),
  })).optional(),

  education: z.array(z.object({
    school: z.string(),
    degree: z.string(),
    fieldOfStudy: z.string().optional(),
    startDate: z.string(),
    endDate: z.string().optional(),
    description: z.string().optional(),
  })).optional(),

  skills: z.array(z.object({
    name: z.string(),
    level: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"]).optional(),
  })).optional(),

  languages: z.array(z.object({
    name: z.string(),
    level: z.string().optional(),
  })).optional(),

  certifications: z.array(z.object({
    name: z.string(),
    issuer: z.string().optional(),
    date: z.string().optional(),
  })).optional(),

  projects: z.array(z.object({
    name: z.string(),
    description: z.string().optional(),
    link: z.string().url().optional(),
  })).optional(),

  interests: z.array(z.string()).optional(),

  // New array to hold user-defined sections
  customSections: z.array(CustomSection).default([]),
});

export type ResumeContent = z.infer<typeof resumeContentSchema>;
