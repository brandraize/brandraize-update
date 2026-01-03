export async function GET() {
  try {
    return new Response(JSON.stringify({ ok: true, time: new Date().toISOString() }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Ping error:", err);
    return new Response(JSON.stringify({ ok: false, error: err?.message || "unknown" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
