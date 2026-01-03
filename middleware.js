import { NextResponse } from "next/server";

// Minimal pass-through middleware for debugging
export function middleware(request) {
  try {
    // Log middleware hit for debugging (check Vercel deployment logs)
    console.log("middleware: hit", request.nextUrl.pathname);
    return NextResponse.next();
  } catch (err) {
    console.error("middleware runtime error:", err?.message || err);
    return NextResponse.next();
  }
}

// Match everything so we can isolate middleware compilation/runtime
export const config = {
  matcher: ["/(.*)"],
};
