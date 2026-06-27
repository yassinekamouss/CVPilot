import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth/auth.config";

/**
 * Encapsulated Authentication Middleware logic.
 */
export const authMiddleware = NextAuth(authConfig).auth;
