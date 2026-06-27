import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { DEFAULT_LOGIN_REDIRECT, AUTH_ROUTES } from "@/constants/routes";

/**
 * Shared Auth.js configuration.
 * Contains providers and logic that works in the Edge runtime.
 */
export const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      
      if (isAuthRoute) {
        if (isLoggedIn) {
          return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return true;
      }

      if (isOnDashboard && !isLoggedIn) {
        return false; // Redirect to login
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
