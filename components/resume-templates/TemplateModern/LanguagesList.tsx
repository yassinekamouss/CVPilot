import { ResumeContent } from "@/schemas/resume.schema";

type LanguageEntry = NonNullable<ResumeContent["languages"]>[number];

interface LanguagesListProps {
    languages?: LanguageEntry[];
}

export const LanguagesList = ({ languages }: LanguagesListProps) => {
    if (!languages || languages.length === 0) return null;

    return (
        <div className="space-y-3">
            {languages.map((language, idx) => (
                <div key={idx} className="flex items-start justify-between gap-4">
                    <span className="text-sm font-semibold uppercase tracking-wide text-neutral-900">
                        {language.name}
                    </span>
                    {language.level && (
                        <span className="text-sm text-neutral-600 text-right">
                            {language.level}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
};