import { ResumeContent } from "@/schemas/resume.schema";

type EducationEntry = NonNullable<ResumeContent["education"]>[number];

interface EducationItemProps {
    education: EducationEntry;
}

export const EducationItem = ({ education }: EducationItemProps) => (
    <div className="mb-5 last:mb-0">
        <h3 className="text-sm font-bold uppercase text-neutral-900">
            {education.degree}
            {education.fieldOfStudy ? ` in ${education.fieldOfStudy}` : ""}
        </h3>
        <p className="text-sm italic text-neutral-700">
            {education.school} | {education.startDate}
            {education.endDate ? `-${education.endDate}` : ""}
        </p>
        {education.description && (
            <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                {education.description}
            </p>
        )}
    </div>
);