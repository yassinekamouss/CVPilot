interface InterestsListProps {
    interests?: string[];
}

export const InterestsList = ({ interests }: InterestsListProps) => {
    if (!interests || interests.length === 0) return null;

    return (
        <ul className="flex flex-wrap gap-2.5">
            {interests.map((interest, idx) => (
                <li
                    key={idx}
                    className="inline-flex items-center rounded-full border border-neutral-800 px-3 py-1.5 text-sm text-neutral-800"
                >
                    {interest}
                </li>
            ))}
        </ul>
    );
};