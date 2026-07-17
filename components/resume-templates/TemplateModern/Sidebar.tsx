"use client";

import { ResumeContent } from "@/schemas/resume.schema";
import { Avatar } from "./Avatar";
import { SectionHeading } from "./SectionHeading";
import { SkillGrid } from "./SkillGrid";
import { CertificationItem } from "./CertificationItem";
import { InterestsList } from "./InterestsList";
import { LanguagesList } from "./LanguagesList";
import { ResumeSection } from "@/components/editor/interaction/ResumeSection";

interface SidebarProps {
    data: ResumeContent;
}

export const Sidebar = ({ data }: SidebarProps) => (
    <div className="flex flex-col gap-4">
        {/* Avatar is part of personalInfo — not a separate section */}
        <Avatar
            src={data.personalInfo?.avatar}
            alt={`${data.personalInfo?.firstName ?? ""} ${data.personalInfo?.lastName ?? ""}`.trim()}
        />

        {data.skills && data.skills.length > 0 && (
            <ResumeSection id="skills">
                <SectionHeading>Skills</SectionHeading>
                <SkillGrid skills={data.skills} />
            </ResumeSection>
        )}

        {data.interests && data.interests.length > 0 && (
            <ResumeSection id="interests">
                <SectionHeading>Interests</SectionHeading>
                <InterestsList interests={data.interests} />
            </ResumeSection>
        )}

        {data.certifications && data.certifications.length > 0 && (
            <ResumeSection id="certifications">
                <SectionHeading>Certifications</SectionHeading>
                {data.certifications.map((cert, idx) => (
                    <CertificationItem key={idx} certification={cert} />
                ))}
            </ResumeSection>
        )}

        {data.languages && data.languages.length > 0 && (
            <ResumeSection id="languages">
                <SectionHeading>Languages</SectionHeading>
                <LanguagesList languages={data.languages} />
            </ResumeSection>
        )}
    </div>
);