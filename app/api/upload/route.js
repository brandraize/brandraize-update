import { put } from "@vercel/blob";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const path = formData.get("path");

    if (!file || !path) {
      return new Response(JSON.stringify({ error: "File or path missing" }), {
        status: 400,
      });
    }

    // Use environment variable for token - never hardcode tokens
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    
    if (!token) {
      console.error("BLOB_READ_WRITE_TOKEN not configured");
      return new Response(JSON.stringify({ error: "Upload service not configured" }), {
        status: 500,
      });
    }

    const blob = await put(path, file, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      token: token
    });

    return new Response(JSON.stringify({ url: blob.url }), { status: 200 });
  } catch (err) {
    console.error("Upload failed:", err);
    return new Response(JSON.stringify({ error: "Upload failed", details: err.message }), {
      status: 500,
    });
  }
}
