"use client";

import { ResumeContent } from "@/schemas/resume.schema";
import { TemplateModern } from "@/components/resume-templates/TemplateModern/TemplateModern";
import { PreviewScaler } from "./PreviewScaler";

interface PreviewPanelProps {
  data: ResumeContent;
}

export function PreviewPanel({ data }: PreviewPanelProps) {
  return (
    <div className="flex-1 bg-[#F1F5F9] h-screen flex flex-col overflow-hidden relative">
      <div className="h-14 border-b border-[#E2E8F0] bg-white flex items-center justify-between px-6 z-10">
        <h3 className="text-sm font-semibold text-[#0B132B]">Live Preview</h3>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-xs text-[#64748B] font-medium">Syncing in real-time</span>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <PreviewScaler>
          <TemplateModern data={data} />
        </PreviewScaler>
      </div>
    </div>
  );
}
