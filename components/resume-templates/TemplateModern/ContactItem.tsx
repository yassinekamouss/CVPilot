interface ContactItemProps {
    icon: React.ReactNode;
    label?: string;
    className?: string;
}

export const ContactItem = ({ icon, label, className = "" }: ContactItemProps) => {
    if (!label) return null;
    return (
        <div className={`flex items-center gap-1 ${className}`}>
            <span className="text-neutral-500 shrink-0 flex items-center">{icon}</span>
            <span className="text-[9pt] text-neutral-700 break-words">{label}</span>
        </div>
    );
};