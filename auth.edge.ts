import NextAuth from "next-auth";
import authConfig from "./auth.config";

// Edge-compatible auth configuration without database operations
// This is used specifically for middleware - no Prisma/database calls allowed
export const { auth } = NextAuth({
  ...authConfig,
  // Override any callbacks that might use database
  callbacks: {
    // Simple JWT handling for middleware
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // Basic session handling for middleware
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    }
  }
});