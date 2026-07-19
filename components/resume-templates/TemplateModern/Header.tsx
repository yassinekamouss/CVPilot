"use client";

import { ResumeContent } from "@/schemas/resume.schema";
import { ContactList } from "./ContactList";
import { HtmlContent } from "@/components/resume-templates/HtmlContent";

interface HeaderProps {
    personalInfo?: ResumeContent["personalInfo"];
    summary?: string;
}

export const Header = ({ personalInfo, summary }: HeaderProps) => {
    const fullName = [personalInfo?.firstName, personalInfo?.lastName]
        .filter(Boolean)
        .join(" ");

    return (
        <header className="mb-3">
            <h1 className="text-[22pt] font-black uppercase leading-[0.9] tracking-tight text-neutral-900 break-words">
                {fullName || "Your Name"}
            </h1>

            {personalInfo?.jobTitle && (
                <p className="mt-1 text-[9pt] font-extrabold uppercase tracking-widest text-neutral-500">
                    {personalInfo.jobTitle}
                </p>
            )}

            {summary && (
                <HtmlContent
                    html={summary}
                    className="mt-1.5 text-[9pt] leading-snug text-neutral-600 [&_p]:my-0 [&_strong]:font-semibold [&_em]:italic"
                />
            )}

            <ContactList personalInfo={personalInfo} />
        </header>
    );
};