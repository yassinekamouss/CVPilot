interface ContactItemProps {
    icon: React.ReactNode;
    label?: string;
}

export const ContactItem = ({ icon, label }: ContactItemProps) => {
    if (!label) return null;
    return (
        <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full border border-neutral-800 text-neutral-800 shrink-0">
                {icon}
            </span>
            <span className="text-sm text-neutral-800 break-all">{label}</span>
        </div>
    );
};