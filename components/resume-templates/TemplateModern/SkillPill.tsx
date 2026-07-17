interface SkillPillProps {
    name: string;
}

export const SkillPill = ({ name }: SkillPillProps) => (
    <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-sm bg-neutral-100 text-[9pt] text-neutral-800 whitespace-nowrap">
        {name}
    </span>
);