import { auth } from "@/services/auth.service";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export class AuthController {
  static instance: AuthController | null = null;

  private constructor() {}

  static async getInstance() {
    if (!this.instance) {
      this.instance = new AuthController();
    }
    return this.instance;
  }
  async signUpWithEmailAndPassword(
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
            return "E-mail já está em uso.";
          case "auth/invalid-email":
            return "Formato de e-mail inválido.";
          case "auth/weak-password":
            return "A senha é muito fraca.";
          case "auth/operation-not-allowed":
            return "O cadastro com este provedor está desativado.";
          default:
            return "Ocorreu um erro. Por favor, tente novamente.";
        }
      }
      return false;
    }
  }

  async signIn(email: string, password: string) {
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
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/user-not-found":
            return "Nenhum usuário encontrado com este e-mail.";
          case "auth/wrong-password":
            return "Senha incorreta. Por favor, tente novamente.";
          case "auth/user-disabled":
            return "Esta conta foi desativada por um administrador.";
          case "auth/too-many-requests":
            return "Muitas tentativas de login falharam. Por favor, tente novamente mais tarde.";
          case "auth/account-exists-with-different-credential":
            return "A conta já existe com outro provedor. Tente fazer login com outro provedor e vincular sua conta.";
          default:
            return "Ocorreu um erro. Por favor, tente novamente.";
        }
      }

      return false;
    }
  }

  async signOut() {
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
}
