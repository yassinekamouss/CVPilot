import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { authMiddleware } from "./lib/middlewares/auth.middleware";
import { APP_ROUTES, AUTH_ROUTES } from "./constants/routes";

const intlMiddleware = createMiddleware(routing);

/**
 * Strips the locale prefix (e.g. /fr or /en) from the start of a pathname
 * to simplify route matching logic in the proxy.
 */
function getLocaleFreePath(pathname: string) {
  const segments = pathname.split("/");
  if (segments.length > 1 && routing.locales.includes(segments[1] as any)) {
    return "/" + segments.slice(2).join("/");
  }
  return pathname;
}

/**
 * Root Proxy entry point for Next.js 16+.
 * Replaces the deprecated middleware.ts.
 */
export const proxy = authMiddleware((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth?.user;
  const localeFreePath = getLocaleFreePath(nextUrl.pathname);

  const isAuthRoute = AUTH_ROUTES.includes(localeFreePath);
  const isOnDashboard = localeFreePath.startsWith(APP_ROUTES.dashboard);

  // Extract locale from the URL pathname or fallback to default Locale ('fr')
  const pathLocale = nextUrl.pathname.split("/")[1];
  const locale = routing.locales.includes(pathLocale as any)
    ? pathLocale
    : routing.defaultLocale;

  // 1. Authenticated user trying to access Auth Routes (e.g. /login)
  if (isAuthRoute) {
    if (isLoggedIn) {
      const dashboardUrl = new URL(`/${locale}${APP_ROUTES.dashboard}`, nextUrl.origin);
      return NextResponse.redirect(dashboardUrl);
    }
    return intlMiddleware(req);
  }

  // 2. Unauthenticated user trying to access Protected Dashboard Routes
  if (isOnDashboard) {
    if (!isLoggedIn) {
      const loginUrl = new URL(`/${locale}${APP_ROUTES.login}`, nextUrl.origin);
      return NextResponse.redirect(loginUrl);
    }
    return intlMiddleware(req);
  }

  // 3. For all other routes, let next-intl handle localization/redirection/rewrites
  return intlMiddleware(req);
});

export const config = {
  // Matches all routes except api, static, images, favicon, and other assets with file extensions
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
