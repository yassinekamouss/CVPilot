"use client";

import { ResumeContent } from "@/schemas/resume.schema";
import { HtmlContent } from "@/components/resume-templates/HtmlContent";

type ExperienceEntry = NonNullable<ResumeContent["experience"]>[number];

interface ExperienceItemProps {
    experience: ExperienceEntry;
}

export const ExperienceItem = ({ experience }: ExperienceItemProps) => (
    <div className="mb-2.5 last:mb-0 preview-page-break-avoid">
        <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-[9.5pt] font-bold uppercase text-neutral-900 leading-tight">
                {experience.position}
            </h3>
            <span className="text-[8.5pt] text-neutral-500 shrink-0">
                {experience.startDate}
                {experience.current ? " – Present" : experience.endDate ? ` – ${experience.endDate}` : ""}
            </span>
        </div>
        <p className="text-[9pt] italic text-neutral-600 leading-tight">{experience.company}</p>

        {experience.description && (
            <HtmlContent
                html={experience.description}
                className="mt-1 text-[9pt] leading-snug text-neutral-600 [&_p]:my-0.5 [&_strong]:font-semibold [&_em]:italic [&_ul]:list-disc [&_ul]:pl-3 [&_li]:my-0.5"
            />
        )}

        {experience.bulletPoints && experience.bulletPoints.length > 0 && (
            <ul className="mt-1 space-y-0.5 pl-3">
                {experience.bulletPoints.map((point, idx) => (
                    <li key={idx} className="text-[9pt] leading-snug text-neutral-600 list-disc list-outside">
                        {point}
                    </li>
                ))}
            </ul>
        )}
    </div>
);