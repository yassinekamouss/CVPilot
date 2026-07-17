import { ResumeContent } from "@/schemas/resume.schema";
import { MainColumn } from "./MainColumn";
import { Sidebar } from "./Sidebar";

interface TemplateModernProps {
    data: ResumeContent;
}

export const TemplateModern = ({ data }: TemplateModernProps) => {
    return (
        <div
            className="w-[210mm] min-h-[297mm] bg-white text-neutral-900 font-sans text-[10.5pt] leading-snug px-8 py-7 grid grid-cols-[2.6fr_1fr] gap-x-6"
        >
            <MainColumn data={data} />
            <Sidebar data={data} />
        </div>
    );
};

export default TemplateModern;