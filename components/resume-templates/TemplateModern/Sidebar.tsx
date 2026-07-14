import { ResumeContent } from "@/schemas/resume.schema";
import { Avatar } from "./Avatar";
import { SectionHeading } from "./SectionHeading";
import { SkillGrid } from "./SkillGrid";
import { CertificationItem } from "./CertificationItem";
import { InterestsList } from "./InterestsList";
import { LanguagesList } from "./LanguagesList";

interface SidebarProps {
    data: ResumeContent;
}

export const Sidebar = ({ data }: SidebarProps) => (
    <div className="flex flex-col gap-8">
        <Avatar
            src={data.personalInfo?.avatar}
            alt={`${data.personalInfo?.firstName ?? ""} ${data.personalInfo?.lastName ?? ""}`.trim()}
        />

        {data.skills && data.skills.length > 0 && (
            <section>
                <SectionHeading>Skills</SectionHeading>
                <SkillGrid skills={data.skills} />
            </section>
        )}

        {data.interests && data.interests.length > 0 && (
            <section>
                <SectionHeading>Interests</SectionHeading>
                <InterestsList interests={data.interests} />
            </section>
        )}

        {data.certifications && data.certifications.length > 0 && (
            <section>
                <SectionHeading>Certifications</SectionHeading>
                {data.certifications.map((cert, idx) => (
                    <CertificationItem key={idx} certification={cert} />
                ))}
            </section>
        )}

        {data.languages && data.languages.length > 0 && (
            <section>
                <SectionHeading>Languages</SectionHeading>
                <LanguagesList languages={data.languages} />
            </section>
        )}
    </div>
);