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

    const idToken = await getIdToken(user);

    return NextResponse.json({ idToken });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
