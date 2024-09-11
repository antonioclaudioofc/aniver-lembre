import * as admin from "firebase-admin";

interface FirebaseAdminAppParams {
  projectId: string;
  clientEmail: string;
  storageBucket: string;
  privateKey: string;
}

function formatPrivateKey(key: string) {
  return key.replace(/\\n/g, "\n");
}

export function createFirebaseAdminApp(params: FirebaseAdminAppParams) {
  const privateKey = formatPrivateKey(params.privateKey);

  if (admin.apps.length === 0) {
    const cert = admin.credential.cert({
      projectId: params.projectId,
      clientEmail: params.clientEmail,
      privateKey,
    });

    admin.initializeApp({
      credential: cert,
      projectId: params.projectId,
      storageBucket: params.storageBucket,
    });
  }

  return admin.app();
}

export async function initAdmin() {
  const params: FirebaseAdminAppParams = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
    privateKey: process.env.FIREBASE_PRIVATE_KEY as string,
  };

  return createFirebaseAdminApp(params);
}
