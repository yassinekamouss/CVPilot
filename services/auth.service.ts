import { auth } from "@/lib/auth/auth";
import { UserService } from "./user.service";

/**
 * Authentication Service.
 * Acts as a bridge between the Auth provider and the application's domain logic.
 */
export class AuthService {
  /**
   * Returns the current authenticated user session.
   * This is the "Unified Adapter" for fetching the current user.
   */
  static async getCurrentUser() {
    const session = await auth();
    
    if (!session?.user?.id) {
      return null;
    }

    return session.user;
  }

  /**
   * Ensures the user has a profile and returns it.
   * Leverages the Lazy Profile Initialization strategy.
   */
  static async getAuthenticatedProfile() {
    const user = await this.getCurrentUser();
    
    if (!user) {
      throw new Error("Unauthorized");
    }

    return UserService.getOrCreateProfile(user.id);
  }
}
