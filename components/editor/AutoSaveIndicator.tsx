"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, AlertCircle } from "lucide-react";

type SaveStatus = "saved" | "saving" | "unsaved";

interface AutoSaveIndicatorProps {
  status: SaveStatus;
}

/**
 * AutoSaveIndicator
 *
 * Discreet badge showing the current save state.
 * Fades in/out smoothly using Framer Motion.
 */
export function AutoSaveIndicator({ status }: AutoSaveIndicatorProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={status}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 4 }}
        transition={{ duration: 0.2 }}
        className="hidden sm:flex items-center gap-1.5 select-none"
      >
        {status === "saving" && (
          <>
            <Loader2 size={11} className="animate-spin text-[#94A3B8]" />
            <span className="text-[11px] font-medium text-[#94A3B8]">Saving…</span>
          </>
        )}
        {status === "saved" && (
          <>
            <div className="h-1.5 w-1.5 rounded-full bg-[#10B981] flex-shrink-0" />
            <span className="text-[11px] font-medium text-[#64748B]">Saved</span>
          </>
        )}
        {status === "unsaved" && (
          <>
            <AlertCircle size={11} className="text-amber-400 flex-shrink-0" />
            <span className="text-[11px] font-medium text-amber-500">Unsaved</span>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export type { SaveStatus };
