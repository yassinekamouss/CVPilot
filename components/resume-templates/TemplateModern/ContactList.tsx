import { ResumeContent } from "@/schemas/resume.schema";
import { ContactItem } from "./ContactItem";
import { PhoneIcon, MailIcon, MapPinIcon } from "./icons";

interface ContactListProps {
    personalInfo?: ResumeContent["personalInfo"];
}

export const ContactList = ({ personalInfo }: ContactListProps) => {
    if (!personalInfo) return null;

    return (
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-6">
            <ContactItem icon={<PhoneIcon />} label={personalInfo.phone} />
            <ContactItem icon={<MailIcon />} label={personalInfo.email} />
            <ContactItem icon={<MapPinIcon />} label={personalInfo.location} />
        </div>
    );
};
