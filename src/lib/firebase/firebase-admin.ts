import { cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getAuth, SessionCookieOptions } from "firebase-admin/auth";
import { cookies } from "next/headers";

function formatPrivateKey(key: string) {
  return key.replace(/\\n/g, "\n");
}

export function firebaseApp() {
  const privateKey = formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY!);
  if (getApps().length === 0) {
    const serviceAccount = {
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey,
    };

    initializeApp({
      credential: cert(serviceAccount),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  }

  return getApp();
}

export const auth = getAuth(firebaseApp());

export async function isAuthenticated(session: string | undefined = undefined) {
  const _session = session ?? (await getSession());

  if (!_session) return false;

  try {
    const isRevoked = !(await auth.verifySessionCookie(_session));
    return !isRevoked;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getCurrentUser() {
  const session = await getSession();

  if (!(await isAuthenticated(session))) {
    return null;
  }

  const decodedIdToken = await auth.verifySessionCookie(session!);
  const currentUser = await auth.getUser(decodedIdToken.uid);

  return currentUser;
}

async function getSession() {
  try {
    return cookies().get("__session")?.value;
  } catch (error) {
    return undefined;
  }
}

export async function createSessionCookie(
  idToken: string,
  sessionCookieOptions: SessionCookieOptions
) {
  return await auth.createSessionCookie(idToken, sessionCookieOptions);
}

export async function rekoveAllSessions(session: string) {
  const decodedIdToken = await auth.verifySessionCookie(session);

  return await auth.revokeRefreshTokens(decodedIdToken.sub);
}
