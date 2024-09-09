import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const url = new URL(request.url);

  if (url.pathname.startsWith("/login") || url.pathname === "/register") {
    return NextResponse.next();
  }

  if (!token && url.pathname.startsWith("/")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*", "/((?!api|_next/static|_next/image|.*\\png$).*)"],
};
