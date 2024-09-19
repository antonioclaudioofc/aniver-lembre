import { rekoveAllSessions } from "@/services/firebase-admin.service";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const sessionCookie = cookies().get("__session")?.value;

  if (!sessionCookie) {
    return NextResponse.json({ success: false });
  }

  cookies().delete("__session");

  await rekoveAllSessions(sessionCookie);

  return NextResponse.json({ success: true });
}
