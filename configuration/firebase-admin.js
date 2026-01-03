import admin from "firebase-admin";

// Initialize Firebase Admin only once
let authAdmin = null;
let db = null;

if (!admin.apps.length && process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  try {
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    authAdmin = admin.auth();
    db = admin.firestore();
  } catch (err) {
    console.error("Firebase Admin initialization error:", err.message);
    // Don't throw - let routes handle missing config gracefully
  }
} else if (admin.apps.length > 0) {
  // Firebase already initialized
  authAdmin = admin.auth();
  db = admin.firestore();
}

export { authAdmin, db };
