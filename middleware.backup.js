import { NextResponse } from "next/server";

const LANGUAGES = ["en", "ar"];

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Always allow API routes through
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Always allow internal Next.js routes
  if (pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  // Skip static files and public assets
  if (/\.(ico|png|jpg|jpeg|gif|svg|webp|css|js|woff|woff2|ttf|otf|eot)(\?.*)?$/.test(pathname)) {
    return NextResponse.next();
  }

  // If path already has language prefix, allow through
  if (pathname === "/en" || pathname === "/ar" || pathname.startsWith("/en/") || pathname.startsWith("/ar/")) {
    return NextResponse.next();
  }

  // Default to English
  let targetLang = "en";

  // Check Accept-Language header
  const acceptLang = request.headers.get("accept-language");
  if (acceptLang?.startsWith("ar")) {
    targetLang = "ar";
  }

  // Redirect to language path
  return NextResponse.redirect(new URL(`/${targetLang}${pathname}`, request.url));
}

export const config = {
  matcher: [
    // Match root and any path without a language prefix
    // Exclude: static files, api, next internals
    "/((?!api|_next|[^?]*\\.(?:html?|css|js(?!x)|jpe?g|png|gif|svg|webp|ico|woff2?|ttf|otf|eot)|favicon\\.ico).*)",
  ],
};
