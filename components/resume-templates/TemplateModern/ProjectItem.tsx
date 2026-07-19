"use client";

import { ResumeContent } from "@/schemas/resume.schema";
import { HtmlContent } from "@/components/resume-templates/HtmlContent";

type ProjectEntry = NonNullable<ResumeContent["projects"]>[number];

interface ProjectItemProps {
    project: ProjectEntry;
}

export const ProjectItem = ({ project }: ProjectItemProps) => (
    <div className="mb-2.5 last:mb-0 preview-page-break-avoid">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <h3 className="text-[9.5pt] font-bold uppercase text-neutral-900 leading-tight">
                {project.name}
            </h3>

            {project.link && (
                <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[8pt] font-semibold uppercase tracking-widest text-neutral-500 underline decoration-neutral-300 underline-offset-2"
                >
                    Link
                </a>
            )}
        </div>

        {project.description && (
            <HtmlContent
                html={project.description}
                className="mt-1 text-[9pt] leading-snug text-neutral-600 [&_p]:my-0.5 [&_strong]:font-semibold [&_em]:italic [&_ul]:list-disc [&_ul]:pl-3 [&_li]:my-0.5"
            />
        )}
    </div>
);