import { ResumeContent } from "@/schemas/resume.schema";
import { ContactItem } from "./ContactItem";
import { PhoneIcon, MailIcon, MapPinIcon } from "./icons";

interface ContactListProps {
    personalInfo?: ResumeContent["personalInfo"];
}

export const ContactList = ({ personalInfo }: ContactListProps) => {
    if (!personalInfo) return null;

    return (
        <div className="flex flex-row flex-wrap items-center gap-x-3 gap-y-0.5 mt-2">
            <ContactItem icon={<PhoneIcon />} label={personalInfo.phone} />
            {personalInfo.phone && personalInfo.location && <span className="text-neutral-400 text-[9pt]">|</span>}
            <ContactItem icon={<MapPinIcon />} label={personalInfo.location} />
            {(personalInfo.phone || personalInfo.location) && personalInfo.email && <span className="text-neutral-400 text-[9pt]">|</span>}
            <ContactItem icon={<MailIcon />} label={personalInfo.email} />
        </div>
    );
};
