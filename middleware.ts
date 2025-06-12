import { auth } from "@/auth.edge";
import { NextRequest } from "next/server";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
} from "@/routes";

export default auth((req: NextRequest) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.user;
  // Check if the route is an API auth route (like /api/auth/signin, /api/auth/callback, etc.)
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      // User is already logged in, redirect to dashboard/home
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
    }
    // User is not logged in, allow access to auth routes (sign-in page)
    return null;
  }
  
  if (!isLoggedIn && !isPublicRoute) {
    // User is not logged in and trying to access protected route
    return Response.redirect(new URL("/auth/sign-in", nextUrl));
  }
  
  // Allow access to public routes or authenticated users
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
