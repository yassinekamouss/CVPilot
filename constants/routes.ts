/**
 * Centralized route definitions for the application.
 */

export const APP_ROUTES = {
  home: "/",
  login: "/login",
  dashboard: "/dashboard",
  dashboardSettings: "/dashboard/settings",
  authError: "/auth/error",
} as const;



export const PUBLIC_ROUTES: readonly string[] = [
  APP_ROUTES.home,
  APP_ROUTES.authError,
];

export const AUTH_ROUTES: readonly string[] = [
  APP_ROUTES.login,
];


export const API_AUTH_PREFIX = "/api/auth";

/**
 * The default redirect path after logging in.
 */
export const DEFAULT_LOGIN_REDIRECT = APP_ROUTES.dashboard;
