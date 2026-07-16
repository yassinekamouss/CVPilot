import { ResumeContent } from "@/schemas/resume.schema";

type CertificationEntry = NonNullable<ResumeContent["certifications"]>[number];

interface CertificationItemProps {
    certification: CertificationEntry;
}

export const CertificationItem = ({ certification }: CertificationItemProps) => (
    <div className="mb-5 last:mb-0 preview-page-break-avoid">
        <h3 className="text-sm font-bold uppercase text-neutral-900">
            {certification.name}
        </h3>
        {(certification.issuer || certification.date) && (
            <p className="text-sm italic text-neutral-700">
                {[certification.issuer, certification.date].filter(Boolean).join(" | ")}
            </p>
        )}
    </div>
);