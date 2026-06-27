import { DefaultSession } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

/**
 * Module augmentation for NextAuth types.
 * Ensures type safety for the custom user.id field.
 */
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string;
  }
}
