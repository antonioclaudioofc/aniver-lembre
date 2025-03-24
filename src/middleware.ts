import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { HOME, SIGNIN } from "./app/(app)/constants/routes";

const publicRoutes = [{ path: SIGNIN, whenAuthenticated: "redirect" }] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = SIGNIN;

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const authToken = request.cookies.get("token")?.value;

  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

    return NextResponse.redirect(redirectUrl);
  }

  if (
    authToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === "redirect"
  ) {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = HOME;

    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

    try {
      const decodedIdToken = jwtDecode(authToken);

      const currentTime = Date.now() / 1000;
      if (decodedIdToken.exp! < currentTime) {
        request.cookies.delete("token");
        const response = NextResponse.redirect(redirectUrl);
        response.cookies.delete("token");

        return response;
      }

      return NextResponse.next();
    } catch (error) {
      console.error(error);
      const response = NextResponse.redirect(redirectUrl);
      response.cookies.delete("token");

      return response;
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
