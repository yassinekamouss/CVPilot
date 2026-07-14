interface ContactItemProps {
    icon: React.ReactNode;
    label?: string;
    className?: string;
}

export const ContactItem = ({ icon, label, className = "" }: ContactItemProps) => {
    if (!label) return null;
    return (
        <div className={`flex items-center gap-2.5 ${className}`}>
            <span className="flex items-center justify-center w-7 h-7 rounded-full border border-neutral-800 text-neutral-800 shrink-0">
                {icon}
            </span>
            <span className="text-sm text-neutral-800 break-words">{label}</span>
        </div>
    );
};