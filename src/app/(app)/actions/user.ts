"use server";

import { Auth, authSchema } from "@/models/auth.model";
import { User, userSchema } from "@/models/user.model";

export async function createUser(values: User): Promise<boolean | string> {
  try {
    const parsed = userSchema.safeParse(values);

    if (!parsed.success) {
      throw new Error(
        `Erro de validação: ${parsed.error.errors
          .map((e) => e.message)
          .join(", ")}`
      );
    }

    const { confirmPassword, ...userData } = parsed.data;

    const response = await fetch(
      "https://aniver-lembre-api-production.up.railway.app/user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      return false;
    }

    return true;
  } catch (error) {
    if (error instanceof Error) {
      return `${error.message}`;
    }
    return false;
  }
}

export async function signIn(values: Auth) {
  try {
    const parsed = authSchema.safeParse(values);

    if (!parsed.success) {
      throw new Error(
        `Erro de validação: ${parsed.error.errors
          .map((e) => e.message)
          .join(", ")}`
      );
    }

    const { ...authData } = parsed.data;

    const response = await fetch(
      "https://aniver-lembre-api-production.up.railway.app/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authData),
      }
    );

    if (!response.ok) {
      return "Erro ao realizar o login!";
    }

    const data = await response.json();

    return true;
  } catch (error) {
    if (error instanceof Error) {
      return `${error.message}`;
    }
    return false;
  }
}
