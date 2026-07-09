interface InterestsListProps {
    interests?: string[];
}

export const InterestsList = ({ interests }: InterestsListProps) => {
    if (!interests || interests.length === 0) return null;

    return (
        <ul className="flex flex-wrap gap-3">
            {interests.map((interest, idx) => (
                <li
                    key={idx}
                    className="inline-flex items-center rounded-full border border-neutral-800 px-4 py-2 text-sm text-neutral-800"
                >
                    {interest}
                </li>
            ))}
        </ul>
    );
};