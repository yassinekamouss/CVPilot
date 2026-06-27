import { type NextAuthConfig } from "next-auth";

/**
 * Custom callbacks for Auth.js.
 * Specifically handles the Strategic Requirement of passing user.id through the token.
 */
export const authCallbacks: NextAuthConfig["callbacks"] = {
  async jwt({ token, user, trigger, session }) {
    // When the user signs in, the 'user' object is available.
    // We attach the database user.id to the JWT token.
    if (user) {
      token.id = user.id;
    }
    
    // Support for session updates if needed
    if (trigger === "update" && session?.name) {
      token.name = session.name;
    }
    
    return token;
  },
  
  async session({ session, token }) {
    // We pass the id from the token to the session object.
    // This makes it available on the client and server side via auth().
    if (token.id && session.user) {
      session.user.id = token.id as string;
    }
    
    return session;
  },
};
