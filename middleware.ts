import NextAuth from "next-auth";

import {
  DEFAULT_LOGIN_REDIRECT,
  authprefix,
  publicRoutes,
  authRoutes,
} from "@/routes";
import authconfig from "@/auth.config";

const auth = NextAuth(authconfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.user;
  const isApiAuthRoute = nextUrl.pathname.startsWith(authprefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
      return null;
    }
  }
  
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/sign-in", nextUrl));
  }
    return null;

});

export const config = {
  // copied from clerk
  matcher: [
    "/((?!.*\\..*|_next).*)", 
    "/", 
    "/(api|trpc)(.*)"
  ],
};
