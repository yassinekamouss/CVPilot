"use client";

import Link from "next/link";
import { useEffect } from "react";

import { APP_ROUTES } from "@/constants";
import type { ErrorPageProps } from "@/types";

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log exception to logging provider
    console.error("Bound error caught at page level:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center bg-zinc-50 dark:bg-zinc-950 font-sans">
      <div className="max-w-md w-full p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl space-y-6">
        {/* Warning Icon Ornament */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-500">
          <svg
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            Something went wrong
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            An unexpected error occurred during rendering. We have logged this error and our team is looking into it.
          </p>
          {error.digest && (
            <p className="text-xs font-mono bg-zinc-100 dark:bg-zinc-800 p-2 rounded text-zinc-600 dark:text-zinc-400 select-all">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-850 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-black font-medium text-sm rounded-lg transition-all active:scale-[0.98] cursor-pointer"
          >
            Try Again
          </button>
          
          <Link
            href={APP_ROUTES.home}
            className="px-5 py-2.5 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-850 text-zinc-700 dark:text-zinc-300 font-medium text-sm rounded-lg transition-all text-center"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
