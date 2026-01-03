import { del } from "@vercel/blob";

export async function POST(req) {
  try {
    const { path } = await req.json();

    if (!path) {
      return new Response(JSON.stringify({ error: "path is required" }), {
        status: 400,
      });
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return new Response(
        JSON.stringify({ error: "Blob storage not configured" }),
        { status: 503 }
      );
    }

    await del(path, { token: process.env.BLOB_READ_WRITE_TOKEN });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Delete failed:", err.message);
    return new Response(JSON.stringify({ error: "Delete failed", details: err.message }), {
      status: 500,
    });
  }
}
