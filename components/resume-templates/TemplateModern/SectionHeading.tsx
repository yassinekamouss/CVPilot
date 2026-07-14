interface SectionHeadingProps {
    children: React.ReactNode;
    className?: string;
}

export const SectionHeading = ({ children, className = "" }: SectionHeadingProps) => (
    <h2
        className={`text-base font-extrabold uppercase tracking-wide text-neutral-900 mb-3 ${className}`}
    >
        {children}
    </h2>
);