// src/app/api/auth/sign-up/route.ts
import { createSessionCookie } from "@/lib/firebase/firebase-admin";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { idToken } = body;

    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    const sessionCookie = await createSessionCookie(idToken, { expiresIn });

    const cookieStore = cookies();
    cookieStore.set("__session", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating session cookie", error);
    return NextResponse.json(
      { success: false, error: "Failed to create session" },
      { status: 500 }
    );
  }
}
