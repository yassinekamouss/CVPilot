"use client";

import React from "react";
import { ResumeContent } from "@/schemas/resume.schema";
import { PreviewScaler } from "./PreviewScaler";
import { useTranslations } from "next-intl";

interface PreviewPanelProps {
  data: ResumeContent;
  children: React.ReactNode;
}

export function PreviewPanel({ data, children }: PreviewPanelProps) {
  const t = useTranslations("Builder");

  // Dynamically inject live form data to any template component passed as a child
  const renderedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { data } as any);
    }
    return child;
  });

  return (
    <div className="flex-1 bg-[#F1F5F9] h-full flex flex-col overflow-hidden relative">
      {/* Header bar */}
      <div className="h-14 border-b border-[#E2E8F0] bg-white flex items-center justify-between px-6 z-10 flex-shrink-0">
        <h3 className="text-sm font-bold text-[#0B132B]">{t("livePreview")}</h3>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-xs text-[#64748B] font-medium">{t("syncing")}</span>
        </div>
      </div>

      {/* Dynamic scaled sandbox */}
      <div className="flex-grow overflow-hidden relative">
        <PreviewScaler>
          {renderedChildren}
        </PreviewScaler>
      </div>
    </div>
  );
}
