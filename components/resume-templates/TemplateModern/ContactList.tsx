import { ResumeContent } from "@/schemas/resume.schema";
import { ContactItem } from "./ContactItem";
import { PhoneIcon, MailIcon, MapPinIcon } from "./icons";

interface ContactListProps {
    personalInfo?: ResumeContent["personalInfo"];
}

export const ContactList = ({ personalInfo }: ContactListProps) => {
    if (!personalInfo) return null;

    return (
        <div className="grid grid-cols-2 gap-x-5 gap-y-2 mt-4">
            <ContactItem icon={<PhoneIcon />} label={personalInfo.phone} />
            <ContactItem icon={<MapPinIcon />} label={personalInfo.location} />
            <ContactItem
                icon={<MailIcon />}
                label={personalInfo.email}
                className="col-span-2"
            />
        </div>
    );
};
