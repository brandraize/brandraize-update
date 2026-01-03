import { authAdmin, db } from "@/configuration/firebase-admin";

export async function POST(req) {
  try {
    if (!authAdmin || !db) {
      return new Response(
        JSON.stringify({ error: "Firebase service not configured" }),
        { status: 503 }
      );
    }

    const { uid } = await req.json();

    if (!uid) {
      return new Response(JSON.stringify({ error: "Missing admin UID" }), {
        status: 400,
      });
    }

    await authAdmin.deleteUser(uid);
    await db.collection("admins").doc(uid).delete();

    return new Response(
      JSON.stringify({ success: true, message: "Admin removed successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing admin:", error.message);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to remove admin", code: error.code }),
      { status: 500 }
    );
  }
}
