interface SkillPillProps {
    name: string;
}

export const SkillPill = ({ name }: SkillPillProps) => (
    <span className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-neutral-800 text-sm text-neutral-800 whitespace-nowrap">
        {name}
    </span>
);