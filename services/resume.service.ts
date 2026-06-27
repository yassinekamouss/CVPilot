import prisma from "@/lib/db";
import { resumeContentSchema, type ResumeContent } from "@/schemas/resume.schema";

export class ResumeService {
  /**
   * Create a new resume
   */
  static async createResume(userId: string, title: string, templateId: string) {
    return prisma.resume.create({
      data: {
        userId,
        title,
        templateId,
        content: {}, // Initial empty content
      },
    });
  }

  /**
   * Get all resumes for a user
   */
  static async getUserResumes(userId: string) {
    return prisma.resume.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
    });
  }

  /**
   * Update resume content with strict Zod validation.
   * Ensures the JSONB structure is always correct for the templates.
   */
  static async updateResumeContent(resumeId: string, userId: string, content: any) {
    // Validate the content before saving using the dedicated central schema
    const validatedContent = resumeContentSchema.parse(content);

    return prisma.resume.update({
      where: { 
        id: resumeId,
        userId: userId // Authorization: Ensure user owns the resume
      },
      data: {
        content: validatedContent as any,
      },
    });
  }

  /**
   * Delete a resume
   */
  static async deleteResume(resumeId: string, userId: string) {
    return prisma.resume.delete({
      where: { 
        id: resumeId,
        userId: userId // Authorization check
      },
    });
  }
}
