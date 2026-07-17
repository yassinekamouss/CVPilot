import { ResumeContent } from "@/schemas/resume.schema";

type CertificationEntry = NonNullable<ResumeContent["certifications"]>[number];

interface CertificationItemProps {
    certification: CertificationEntry;
}

export const CertificationItem = ({ certification }: CertificationItemProps) => (
    <div className="mb-2 last:mb-0 preview-page-break-avoid">
        <h3 className="text-[9pt] font-bold uppercase text-neutral-900 leading-tight">
            {certification.name}
        </h3>
        {(certification.issuer || certification.date) && (
            <p className="text-[8.5pt] italic text-neutral-600 leading-tight mt-0.5">
                {[certification.issuer, certification.date].filter(Boolean).join(" | ")}
            </p>
        )}
    </div>
);