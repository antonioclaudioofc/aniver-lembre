import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { token } = await request.json();

  try {
    const cookieExpiresInSeconds = 60 * 60 * 24 * 1;

    const redirectURL = new URL("/", request.url);

    const response = NextResponse.redirect(redirectURL);
    response.cookies.set("token", token, {
      path: "/",
      maxAge: cookieExpiresInSeconds,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return response;
  } catch (error: any) {
    NextResponse.json({ error: error.message }, { status: 400 });
  }
}
