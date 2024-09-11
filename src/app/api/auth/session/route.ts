import { NextResponse } from "next/server";
import { initAdmin } from "@/services/firebase-admin.service";
import { getAuth } from "firebase-admin/auth";

export async function POST(request: Request) {
  await initAdmin();

  const { idToken } = await request.json();
  const cookieExpiresInSeconds = 60 * 60 * 24 * 1; // 1 dias em segundos

  try {
    const sessionCookie = await getAuth().createSessionCookie(idToken, {
      expiresIn: cookieExpiresInSeconds * 1000, // em milissegundos
    });

    const response = NextResponse.json({ status: "success" });
    response.cookies.set("token", sessionCookie, {
      maxAge: cookieExpiresInSeconds * 1000,
      httpOnly: true,
      secure: true,
    });

    return response;
  } catch (error) {
    console.error("Erro ao criar session cookie:", error);
    return NextResponse.json(
      { message: "UNAUTHORIZED REQUEST!" },
      { status: 401 }
    );
  }
}
