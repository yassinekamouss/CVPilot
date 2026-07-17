import { ResumeContent } from "@/schemas/resume.schema";
import { SkillPill } from "./SkillPill";

interface SkillsGridProps {
    skills?: ResumeContent["skills"];
}

export const SkillGrid = ({ skills }: SkillsGridProps) => {
    if (!skills || skills.length === 0) return null;

    return (
        <div className="flex flex-wrap gap-1.5">
            {skills.map((skill, idx) => (
                <SkillPill key={idx} name={skill.name} />
            ))}
        </div>
    );
};