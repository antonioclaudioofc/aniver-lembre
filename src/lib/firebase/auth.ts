import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./firebase";
import { FirebaseError } from "firebase/app";

export async function signUpWithEmailAndPassword(
  name: string,
  email: string,
  password: string
) {
  try {
    const userCrdential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCrdential.user, { displayName: name });

    const idToken = await userCrdential.user.getIdToken();
    console.log(idToken);

    const response = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    });

    const textResponse = await response.json(); // Obtenha a resposta como texto
    console.log(textResponse);

    if (response.ok) {
      return true;
    } else return false;
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/email-already-in-use":
          return "Email already in use. Try logging in instead.";
        case "auth/invalid-email":
          return "Invalid email format. Please check your email.";
        case "auth/weak-password":
          return "Password is too weak. Please use a stronger password.";
        default:
          return "An error occurred. Please try again.";
      }
    }
    console.log(error);
    return false;
  }
}
