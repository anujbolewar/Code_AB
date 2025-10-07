// Import at runtime and avoid strict typing issues with the beta package
// definitions by using `any` where necessary.
import NextAuthDefault from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import authConfig from "./auth.config";

// @ts-expect-error - shim: NextAuth beta types are incompatible in this setup; use a
// runtime cast to call NextAuth and re-export its helpers.
const NextAuthAny = (NextAuthDefault as any) as (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: Record<string, any>
) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
any;

// @ts-expect-error - call through the any shim above
const nextAuth = NextAuthAny({
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(db),
  ...authConfig,
});

// `nextAuth` should be an object containing helpers like `handlers`, `signIn`,
// `signOut`, and the middleware `auth` function. Re-export them for import
// elsewhere in the app.
export const { handlers, signIn, signOut, auth } = nextAuth;