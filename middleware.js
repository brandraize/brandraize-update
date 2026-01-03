import { NextResponse } from "next/server";

const supportedLanguages = ["en", "ar"];

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Skip API routes and Next.js internals
  if (pathname.startsWith("/api") || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  // Check if pathname has a language prefix
  const hasLanguagePrefix = supportedLanguages.some(
    (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
  );

  if (hasLanguagePrefix) {
    return NextResponse.next();
  }

  // Get preferred language from Accept-Language header
  let preferredLang = "en";
  const acceptLanguage = request.headers.get("Accept-Language") || "";
  if (acceptLanguage) {
    const firstLang = acceptLanguage.split(",")[0].split("-")[0];
    if (supportedLanguages.includes(firstLang)) {
      preferredLang = firstLang;
    }
  }

  // Special handling for /admin without language prefix
  if (pathname === "/admin") {
    return NextResponse.redirect(
      new URL(`/${preferredLang}/admin/products`, request.url)
    );
  }

  // Redirect all other paths to language-prefixed version
  return NextResponse.redirect(
    new URL(`/${preferredLang}${pathname}`, request.url)
  );
}

export const config = {
  matcher: [
    // Match all paths except:
    "/((?!api|_next|favicon.ico|robots.txt|sitemap.xml|public).*)",
  ],
};
