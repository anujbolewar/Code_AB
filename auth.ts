import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { db } from "./lib/db";
import { getUserById } from "./modules/auth/actions";

export const {handlers,signIn,signOut,auth} = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks:{
    async signIn({user, account}){
      if(!user || !account) return false;

      const ExistingUser = await db.user.findUnique({
        where:{email:user.email!}
      });

      if(!ExistingUser){
        const newUser = await db.user.create({
          data: {
            email: user.email!,
            name: user.name,
            image: user.image,
          }
        });
        
        await db.account.create({
          data: {
            userId: newUser.id,
            type: account.type,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            refresh_token: account.refresh_token,
            access_token: account.access_token,
            expires_at: account.expires_at,
            token_type: account.token_type,
            scope: account.scope,
            id_token: account.id_token,
            session_state: account.session_state as string,
          }
        });
      } else {
        const existingAccount = await db.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            }
          }
        });
        
        if (!existingAccount) {
          await db.account.create({
            data: {
              userId: ExistingUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              refresh_token: account.refresh_token,
              access_token: account.access_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
              session_state: account.session_state as string,
            }
          });
        }
      }
      
      return true;
    },
    async jwt({token}){
      if(!token.sub) return token;
      const existingUser = await getUserById(token.sub);
    },
    async session({session}){
      return session;
    }
  },
  
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(db),
});  