import { authMiddleware } from "@/lib/middlewares/auth.middleware";

/**
 * Root Proxy entry point for Next.js 16+.
 * Replaces the deprecated middleware.ts.
 */
export const proxy = authMiddleware;

export const config = {
  // Matches all routes except api, static, images, favicon, and png assets
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
