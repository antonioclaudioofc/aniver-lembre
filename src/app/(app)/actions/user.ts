"use server";

import { User, userSchema } from "@/models/user.model";

export async function createUser(values: User) {
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
