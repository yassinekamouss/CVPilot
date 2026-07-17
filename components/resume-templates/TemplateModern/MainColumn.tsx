"use client";

import { ResumeContent } from "@/schemas/resume.schema";
import { Header } from "./Header";
import { SectionHeading } from "./SectionHeading";
import { EducationItem } from "./EducationItem";
import { ExperienceItem } from "./ExperienceItem";
import { ProjectItem } from "./ProjectItem";
import { ResumeSection } from "@/components/editor/interaction/ResumeSection";

interface MainColumnProps {
    data: ResumeContent;
}

export const MainColumn = ({ data }: MainColumnProps) => (
    <div className="flex flex-col gap-4">
        {/* personalInfo + summary live together in the Header */}
        <ResumeSection id="personalInfo">
            <Header personalInfo={data.personalInfo} summary={data.summary} />
        </ResumeSection>

        {data.education && data.education.length > 0 && (
            <ResumeSection id="education">
                <SectionHeading>Education</SectionHeading>
                {data.education.map((edu, idx) => (
                    <EducationItem key={idx} education={edu} />
                ))}
            </ResumeSection>
        )}

        {data.experience && data.experience.length > 0 && (
            <ResumeSection id="experience">
                <SectionHeading>Experience</SectionHeading>
                {data.experience.map((exp, idx) => (
                    <ExperienceItem key={idx} experience={exp} />
                ))}
            </ResumeSection>
        )}

        {data.projects && data.projects.length > 0 && (
            <ResumeSection id="projects">
                <SectionHeading>Projects</SectionHeading>
                {data.projects.map((project, idx) => (
                    <ProjectItem key={idx} project={project} />
                ))}
            </ResumeSection>
        )}
    </div>
);
