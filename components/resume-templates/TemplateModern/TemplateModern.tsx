import { ResumeContent } from "@/schemas/resume.schema";
import { MainColumn } from "./MainColumn";
import { Sidebar } from "./Sidebar";

interface TemplateModernProps {
    data: ResumeContent;
}

export const TemplateModern = ({ data }: TemplateModernProps) => {
    return (
        <div
            className="w-[210mm] min-h-[297mm] bg-[#f5f0e8] text-neutral-900 font-sans px-12 py-10 grid grid-cols-[1.55fr_1fr] gap-x-10"
        >
            <MainColumn data={data} />
            <Sidebar data={data} />
        </div>
    );
};

export default TemplateModern;