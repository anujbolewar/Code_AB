import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
} from "@/routes";
// use the middleware `auth` exported from `auth.ts` which is a callable
// middleware function (destructured from NextAuth inside `auth.ts`).
import { auth as authMiddleware } from "@/auth";

export default authMiddleware((req: Request) => {
  // `nextUrl` is available on the Next.js middleware `Request` via the NextURL
  // helper attached by the runtime. TS can't infer it here, so use any for
  // the destructured piece to avoid excessive typing in this small middleware.
  // Keep runtime usage the same.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { nextUrl }: any = req as any;
  // `auth` middleware augments the request with a `user` property at runtime.
  // Cast to any to access it without changing global types here.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isLoggedIn = !!(req as any).user;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
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
