interface InterestsListProps {
    interests?: string[];
}

export const InterestsList = ({ interests }: InterestsListProps) => {
    if (!interests || interests.length === 0) return null;

    return (
        <ul className="flex flex-wrap gap-1.5">
            {interests.map((interest, idx) => (
                <li
                    key={idx}
                    className="inline-flex items-center rounded-sm bg-neutral-100 px-2 py-0.5 text-[9pt] text-neutral-800"
                >
                    {interest}
                </li>
            ))}
        </ul>
    );
};