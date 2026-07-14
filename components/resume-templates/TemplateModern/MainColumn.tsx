import { ResumeContent } from "@/schemas/resume.schema";
import { Header } from "./Header";
import { SectionHeading } from "./SectionHeading";
import { EducationItem } from "./EducationItem";
import { ExperienceItem } from "./ExperienceItem";
import { ProjectItem } from "./ProjectItem";

interface MainColumnProps {
    data: ResumeContent;
}

export const MainColumn = ({ data }: MainColumnProps) => (
    <div className="flex flex-col gap-8">
        <Header personalInfo={data.personalInfo} summary={data.summary} />

        {data.education && data.education.length > 0 && (
            <section>
                <SectionHeading>Education</SectionHeading>
                {data.education.map((edu, idx) => (
                    <EducationItem key={idx} education={edu} />
                ))}
            </section>
        )}

        {data.experience && data.experience.length > 0 && (
            <section>
                <SectionHeading>Experience</SectionHeading>
                {data.experience.map((exp, idx) => (
                    <ExperienceItem key={idx} experience={exp} />
                ))}
            </section>
        )}

        {data.projects && data.projects.length > 0 && (
            <section>
                <SectionHeading>Projects</SectionHeading>
                {data.projects.map((project, idx) => (
                    <ProjectItem key={idx} project={project} />
                ))}
            </section>
        )}
    </div>
);
