"use server";

import { Contact, contactSchema } from "@/models/contact.model";
import { cookies } from "next/headers";

export async function createContact(
  values: Contact
): Promise<boolean | string> {
  const token = (await cookies()).get("token")?.value;

  if (!token) return "Usuário não autenticado";

  try {
    const parsed = contactSchema.safeParse(values);

    if (!parsed.success) {
      throw new Error(
        `Erro de validação: ${parsed.error.errors
          .map((e) => e.message)
          .join(", ")}`
      );
    }

    const { ...contactData } = parsed.data;

    const response = await fetch(
      "https://aniver-lembre-api-production.up.railway.app/contact",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      }
    );

    if (!response.ok) {
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return `${error.message}`;
    }
    return false;
  }
}

export async function findAllContact(): Promise<Contact[] | string> {
  const token = (await cookies()).get("token")?.value;

  if (!token) return "Usuário não autenticado";

  try {
    const response = await fetch("https://aniver-lembre-api-production.up.railway.app/contact", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return "Erro ao acessar";
    }
    
    return await response.json();
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return `${error.message}`;
    }
    return "Error";
  }
}
