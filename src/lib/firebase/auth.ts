import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";
import { FirebaseError } from "firebase/app";

export async function signUpWithEmailAndPassword(
  name: string,
  email: string,
  password: string
) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCredential.user, { displayName: name });

    const idToken = await userCredential.user.getIdToken();
    console.log(idToken);

    const response = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    });

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

export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const idToken = await userCredential.user.getIdToken();

    const response = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: {
        "Context-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    });

    if (response.ok) return true;
    else return false;
  } catch (error) {
    console.log(error);

    if (
      error instanceof FirebaseError &&
      error.code === "auth/account-exists-with-different-credential"
    ) {
      return "Account already exist with different provider. Try logging in with other provider and link your account";
    }
    return false;
  }
}

export async function signOut() {
  try {
    await auth.signOut();

    const response = await fetch("/api/auth/sign-out", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) return true;
    else return false;
  } catch (error) {
    return false;
  }
}
