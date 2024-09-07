import { FormState, SignupFormSchema } from "@/models/user.model";
import { auth } from "@/services/auth.service";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { redirect } from "next/navigation";

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    await updateProfile(user, { displayName: name });

    console.log("Usuário criado:", user);

    const idToken = await user.getIdToken();

    await fetch("/app/api/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idToken,
      }),
    });

    redirect("/");
  } catch (error) {
    return {
      error,
    };
  }
}
