"use client";

import { useEffect } from "react";

import type { GlobalErrorProps } from "@/types";

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Critical root-layout exception caught:", error);
  }, [error]);

  return (
    <html lang="en" className="h-full antialiased font-sans">
      <body className="min-h-full flex flex-col items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
        <div className="max-w-md w-full p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl space-y-6 text-center">
          {/* Warning Icon Ornament */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/30 text-red-650 dark:text-red-500">
            <svg
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m0-10.03V3m0 18h.008v.008H12V21zm0-3.75h.008v.008H12v-.008zM12 9h.008v.008H12V9z"
              />
            </svg>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              A critical error occurred
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              We encountered a system-level issue. Try refreshing or contact support if the issue persists.
            </p>
            {error.digest && (
              <p className="text-xs font-mono bg-zinc-150 dark:bg-zinc-850 p-2 rounded text-zinc-650 dark:text-zinc-450 select-all inline-block">
                Ref ID: {error.digest}
              </p>
            )}
          </div>

          <button
            onClick={() => reset()}
            className="w-full px-5 py-3 bg-red-600 hover:bg-red-555 dark:bg-red-500 dark:hover:bg-red-400 text-white font-medium text-sm rounded-lg transition-all active:scale-[0.98] cursor-pointer"
          >
            Attempt Application Restart
          </button>
        </div>
      </body>
    </html>
  );
}
