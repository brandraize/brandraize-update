import { authAdmin, db } from "@/configuration/firebase-admin";
import admin from "firebase-admin";

export async function POST(req) {
  try {
    // Validate environment and dependencies
    if (!authAdmin || !db) {
      return new Response(
        JSON.stringify({ error: "Firebase service not configured" }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return new Response(
        JSON.stringify({ error: "Email, password, and name are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Create the user
    const userRecord = await authAdmin.createUser({
      email,
      password,
    });

    // Set custom claim
    await authAdmin.setCustomUserClaims(userRecord.uid, { isAdmin: true });

    // Save in Firestore
    await db.collection("admins").doc(userRecord.uid).set({
      name,
      email,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return new Response(
      JSON.stringify({ message: `Admin ${name} created successfully` }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Create admin error:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to create admin",
        code: error.code || "UNKNOWN_ERROR"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
