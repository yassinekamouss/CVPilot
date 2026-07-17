interface SectionHeadingProps {
    children: React.ReactNode;
    className?: string;
}

export const SectionHeading = ({ children, className = "" }: SectionHeadingProps) => (
    <h2
        className={`text-[9pt] font-extrabold uppercase tracking-widest text-neutral-900 border-b border-neutral-300 pb-0.5 mb-2 ${className}`}
    >
        {children}
    </h2>
);