import { NextResponse } from "next/server";
import type { ApiErrorResponse } from "@/types";
import { AppError, ValidationError } from "./custom-errors";

/**
 * Parses and formats any caught exception into a standardized NEXT.js api response.
 * Safely masks database driver details or stack traces in production.
 */
export function handleApiError(error: unknown) {
  // Determine if it is a known operational application error
  if (error instanceof AppError) {
    const errorBody: ApiErrorResponse = {
      success: false,
      error: {
        code: error.code,
        message: error.message,
      },
    };

    if (error instanceof ValidationError && error.details) {
      errorBody.error.details = error.details;
    }

    // Log operational error if needed
    console.warn(`[AppError] ${error.code} (${error.statusCode}): ${error.message}`);
    
    return NextResponse.json(errorBody, { status: error.statusCode });
  }

  // Handle standard Javascript errors or unexpected system bugs
  const message = error instanceof Error ? error.message : "An unexpected server error occurred.";
  const stack = error instanceof Error ? error.stack : undefined;

  // Log full trace of the unexpected exception for diagnostics
  console.error("[UnhandledException] Critical error:", {
    message,
    stack,
    error,
  });

  // Always return a clean, obfuscated internal error state to the client
  return NextResponse.json(
    {
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected system error occurred. Please contact support.",
      },
    },
    { status: 500 }
  );
}
