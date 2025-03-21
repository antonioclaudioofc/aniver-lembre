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

    console.log(userData);

    const response = await fetch("http://localhost:4444/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
