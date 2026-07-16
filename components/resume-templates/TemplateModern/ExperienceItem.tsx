import { ResumeContent } from "@/schemas/resume.schema";

type ExperienceEntry = NonNullable<ResumeContent["experience"]>[number];

interface ExperienceItemProps {
    experience: ExperienceEntry;
}

export const ExperienceItem = ({ experience }: ExperienceItemProps) => (
    <div className="mb-4 last:mb-0 preview-page-break-avoid">
        <h3 className="text-sm font-bold uppercase text-neutral-900">
            {experience.position}
        </h3>
        <p className="text-sm italic text-neutral-700">
            {experience.company} | {experience.startDate}
            {experience.current ? " - Present" : experience.endDate ? `-${experience.endDate}` : ""}
        </p>

        {experience.description && (
            <p className="mt-1.5 text-sm leading-[1.45] text-neutral-600">
                {experience.description}
            </p>
        )}

        {experience.bulletPoints && experience.bulletPoints.length > 0 && (
            <ul className="mt-1.5 space-y-1.5">
                {experience.bulletPoints.map((point, idx) => (
                    <li key={idx} className="text-sm leading-relaxed text-neutral-600">
                        {point}
                    </li>
                ))}
            </ul>
        )}
    </div>
);