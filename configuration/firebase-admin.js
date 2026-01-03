import admin from "firebase-admin";

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
      ),
    });
  } catch (err) {
    console.error("Firebase Admin initialization error:", err);
  }
}

export const authAdmin = admin.auth();
