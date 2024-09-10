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
  // catch (error: any) {
  //   console.error("Erro ao processar o registro:", error);

  //   if (error.code) {
  //     return NextResponse.json(
  //       { message: `Erro Firebase: ${error.message}` },
  //       { status: 400 }
  //     );
  //   }

  //   return NextResponse.json(
  //     { message: "Erro ao processar a solicitação." },
  //     { status: 500 }
  //   );
  // }
}
