import prisma from "@/lib/db";

export class UserService {
  /**
   * Retrieves a user by their ID.
   */
  static async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });
  }

  /**
   * Find a user by email.
   */
  static async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    });
  }

  /**
   * GET OR CREATE Profile Mechanism.
   * Ensures a profile exists for the user to avoid race conditions.
   * This is the "Lazy Profile Initialization" strategy.
   */
  static async getOrCreateProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    if (!user) throw new Error("User not found");

    if (user.profile) {
      return user.profile;
    }

    const nameParts = user.name?.split(" ") || [];
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // Lazy creation of profile if it doesn't exist
    return prisma.profile.create({
      data: {
        userId,
        firstName,
        lastName,
        image: user.image,
      },
    });
  }

  /**
   * Update user profile data.
   */
  static async updateProfile(userId: string, profileData: any) {
    // Ensure profile exists before updating
    await this.getOrCreateProfile(userId);

    return prisma.profile.update({
      where: { userId },
      data: profileData,
    });
  }
}
