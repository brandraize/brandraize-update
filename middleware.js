import { NextResponse } from "next/server";

const supportedLanguages = ["en", "ar"];

export function middleware(request) {
  try {
    const { pathname } = request.nextUrl;

    // Skip API routes, Next.js assets, and static files
    if (
      pathname.startsWith("/api/") ||
      pathname.startsWith("/_next/") ||
      pathname.includes(".")
    ) {
      return NextResponse.next();
    }

    // Handle /admin redirects to language-specific admin
    if (
      pathname === "/admin" ||
      supportedLanguages.some((lang) => pathname === `/${lang}/admin`)
    ) {
      const langFromPath = supportedLanguages.find(
        (lang) => pathname === `/${lang}/admin`
      );

      const langToUse =
        langFromPath ||
        (() => {
          const acceptLang = request.headers.get("Accept-Language") || "";
          const preferredLang = acceptLang.split(",")[0].split("-")[0];
          return supportedLanguages.includes(preferredLang)
            ? preferredLang
            : "en";
        })();

      const redirectUrl = new URL(request.url);
      redirectUrl.pathname = `/${langToUse}/admin/products`;
      return NextResponse.redirect(redirectUrl);
    }

    // Allow requests with supported language prefixes
    if (
      supportedLanguages.some(
        (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
      )
    ) {
      return NextResponse.next();
    }

    // Redirect root and non-language routes to preferred language
    const acceptLang = request.headers.get("Accept-Language") || "";
    const preferredLang = acceptLang.split(",")[0].split("-")[0];

    const langToUse = supportedLanguages.includes(preferredLang)
      ? preferredLang
      : "en";

    const redirectUrl = new URL(request.url);
    redirectUrl.pathname = `/${langToUse}${pathname}`;
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("Middleware error:", error);
    // Return default response on error instead of crashing
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
