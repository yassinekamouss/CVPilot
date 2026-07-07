import React, { type ReactNode } from "react";
import { Search, Plus, ChevronRight } from "lucide-react";

interface LaptopMockupProps {
  children: ReactNode;
}

function BrowserFrame({ children }: LaptopMockupProps) {
  return (
    <div className="flex-1 w-full h-full flex flex-col bg-[#0B132B] font-sans rounded-sm overflow-hidden">
      <div className="h-8 md:h-10 border-b border-slate-800 flex items-center justify-between px-3 md:px-4 shrink-0 bg-[#0B132B]">
        <div className="flex items-center gap-1.5 w-1/4">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-black/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-black/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-black/20" />
        </div>
        <div className="w-2/4 max-w-sm bg-slate-900 border border-slate-800 rounded-md px-2 py-1 flex items-center gap-2">
          <Search className="w-3 h-3 text-slate-500" />
          <span className="text-[9px] text-slate-500 font-medium truncate">procv.ai</span>
          <div className="w-[1px] h-2 bg-slate-800 mx-1" />
          <span className="text-[9px] text-slate-400 truncate hidden sm:block">Analyse Structurelle CV — Phase 01</span>
        </div>
        <div className="flex items-center gap-2 md:gap-3 w-1/4 justify-end text-slate-500">
          <Plus className="w-3 h-3" />
          <div className="flex items-center gap-1">
            <ChevronRight className="w-3 h-3 rotate-180" />
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>
      </div>
      <div className="flex-1 w-full h-full flex flex-col md:flex-row overflow-hidden relative">
        {children}
      </div>
    </div>
  );
}

export default function LaptopMockup({ children }: LaptopMockupProps) {
  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center mt-8 lg:mt-0 drop-shadow-2xl">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none z-0" />
      <div className="relative w-full aspect-[16/10] bg-black p-[6px] md:p-[8px] rounded-t-xl sm:rounded-t-2xl shadow-xl z-10 overflow-hidden ring-1 ring-white/10 flex flex-col">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 sm:w-28 h-3.5 sm:h-4 bg-black rounded-b-lg flex items-center justify-center z-50">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-800 border border-slate-700/50 shadow-inner" />
        </div>
        <BrowserFrame>{children}</BrowserFrame>
      </div>
      <div className="relative w-[105%] h-3 sm:h-4 bg-[#78879b] rounded-b-xl sm:rounded-b-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] z-20 flex justify-center items-start border-t border-[#9aa8b8]">
        <div className="w-16 sm:w-20 h-1 bg-[#5e6a7c] rounded-b-md shadow-inner" />
        <div className="absolute bottom-0 w-full h-[1px] bg-black/10 rounded-b-xl" />
      </div>
    </div>
  );
}
