import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { onAuthStateChanged, UserInfo } from "firebase/auth";

interface User extends UserInfo {}

export function getUser(): UserInfo {
  const token = cookies().get("token")?.value;

  if (!token) {
    throw new Error("Unauthenticated.");
  }
  const user: User = jwtDecode(token);

  return user;
}
