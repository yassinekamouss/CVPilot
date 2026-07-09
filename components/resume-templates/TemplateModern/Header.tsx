import { ResumeContent } from "@/schemas/resume.schema";
import { ContactList } from "./ContactList";

interface HeaderProps {
    personalInfo?: ResumeContent["personalInfo"];
    summary?: string;
}

export const Header = ({ personalInfo, summary }: HeaderProps) => {
    const fullName = [personalInfo?.firstName, personalInfo?.lastName]
        .filter(Boolean)
        .join(" ");

    return (
        <header>
            <h1 className="text-6xl font-black uppercase leading-[0.95] tracking-tight text-neutral-900 break-words">
                {fullName || "Your Name"}
            </h1>

            {personalInfo?.jobTitle && (
                <p className="mt-4 text-base font-extrabold uppercase tracking-wide text-neutral-900">
                    {personalInfo.jobTitle}
                </p>
            )}

            {summary && (
                <p className="mt-3 text-sm leading-relaxed text-neutral-600 max-w-[46ch]">
                    {summary}
                </p>
            )}

            <ContactList personalInfo={personalInfo} />
        </header>
    );
};