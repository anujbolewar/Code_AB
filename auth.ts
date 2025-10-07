import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import authConfig from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
    callbacks: {
        // Allow sign in for valid users
        async signIn({ user, account }) {
            if (!user || !account) return false;

            // Check if user exists in database
            const existingUser = await db.user.findUnique({
                where: { email: user.email! }
            });

            // Allow sign in if user exists or create new user through adapter
            return true;
        },
        
        // Handle JWT token
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        
        // Handle session
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
            }
            return session;
        }
    },
    secret: process.env.AUTH_SECRET,
    adapter: PrismaAdapter(db),
    ...authConfig
});