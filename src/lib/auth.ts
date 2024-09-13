import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { initAdmin } from "@/services/firebase-admin.service";
import { getAuth, UserRecord } from "firebase-admin/auth";

export async function getUser() {
  await initAdmin();
  const token = cookies().get("token")?.value;

  if (!token) {
    throw new Error("Unauthenticated.");
  }
  const { user_id }: any = jwtDecode(token);

  const user: UserRecord = await getAuth().getUser(user_id);
  return {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
  };
}
