import { ResumeContent } from "@/schemas/resume.schema";

type EducationEntry = NonNullable<ResumeContent["education"]>[number];

interface EducationItemProps {
    education: EducationEntry;
}

export const EducationItem = ({ education }: EducationItemProps) => (
    <div className="mb-2.5 last:mb-0 preview-page-break-avoid">
        <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-[9.5pt] font-bold uppercase text-neutral-900 leading-tight">
                {education.degree}
                {education.fieldOfStudy ? ` in ${education.fieldOfStudy}` : ""}
            </h3>
            <span className="text-[8.5pt] text-neutral-500 shrink-0">
                {education.startDate}
                {education.endDate ? ` – ${education.endDate}` : ""}
            </span>
        </div>
        <p className="text-[9pt] italic text-neutral-600 leading-tight">
            {education.school}
        </p>
        {education.description && (
            <p className="mt-1 text-[9pt] leading-snug text-neutral-600">
                {education.description}
            </p>
        )}
    </div>
);