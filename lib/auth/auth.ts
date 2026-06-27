import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db";
import { authConfig } from "./auth.config";
import { authCallbacks } from "./callbacks";

/**
 * Main Auth.js instance.
 * Combines configuration, adapter, and callbacks.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" }, // Strategic requirement for performance/edge compatibility
  callbacks: {
    ...authConfig.callbacks,
    ...authCallbacks,
  },
});
