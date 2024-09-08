import { SignupFormSchema } from "@/models/user.model";
import { auth } from "@/services/auth.service";
import {
  createUserWithEmailAndPassword,
  getIdToken,
  updateProfile,
} from "firebase/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = SignupFormSchema.parse(body);

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      parsed.email,
      parsed.password
    );

    const user = userCredential.user;
    await updateProfile(user, { displayName: parsed.name });

    const token = await getIdToken(user);

    const cookieExpiresInSeconds = 60 * 60 * 24 * 1;

    const baseURL = new URL(request.url);
    const redirectURL = new URL("/", baseURL.origin);

    const response = NextResponse.redirect(redirectURL.toString());

    response.headers.set(
      "Set-Cookie",
      `token=${token}; Path=/; Max-Age=${cookieExpiresInSeconds}; HttpOnly; Secure; SameSite=Strict`
    );

    return response;
  } catch (error) {
    console.error("Erro ao processar o registro:", error);
    return NextResponse.json(
      { message: "Erro ao processar a solicitação." },
      { status: 500 }
    );
  }
}
