import NextAuth from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authConfig from "./auth.config";
import { AUTH_ROUTES, LOGIN, PRIVATE_ROUTES, ROOT } from "./lib/routes";

const { auth } = NextAuth(authConfig);

export default auth((request: NextRequest) => {
  const { nextUrl } = request;
  const isAuthenticated = !!(request as any)?.auth;

  const isPrivateRoute = PRIVATE_ROUTES.find((route) =>
    nextUrl.pathname.startsWith(route),
  );

  const isAuthRoute = AUTH_ROUTES.find((route) =>
    nextUrl.pathname.startsWith(route),
  );

  if (!isAuthenticated && isPrivateRoute) {
    return NextResponse.redirect(new URL(LOGIN, nextUrl));
  }

  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL(ROOT, nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
