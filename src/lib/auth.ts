import { auth } from "@/services/auth.service";
import { cookies } from "next/headers";

export async function getUser() {
  const token = cookies().get("token")?.value;

  if (!token) {
    throw new Error("Unauthenticated.");
  }
}
