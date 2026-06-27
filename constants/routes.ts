/**
 * Centralized route definitions for the application.
 */

export const PUBLIC_ROUTES = [
  "/",
  "/auth/error",
];

export const AUTH_ROUTES = [
  "/login",
];

export const API_AUTH_PREFIX = "/api/auth";

/**
 * The default redirect path after logging in.
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
