import { NextResponse } from "next/server";

const LANGUAGES = ["en", "ar"];
const DEFAULT_LANGUAGE = "en";

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // 1. Skip API routes - never redirect
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // 2. Skip internal Next.js routes
  if (pathname.startsWith("/_next") || pathname.startsWith("/.well-known")) {
    return NextResponse.next();
  }

  // 3. Skip file requests (has extension)
  if (pathname.includes(".")) {
    return NextResponse.next();
  }

  // 4. Check if path starts with language prefix
  const pathStartsWithLang = LANGUAGES.some((lang) =>
    pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)
  );

  if (pathStartsWithLang) {
    return NextResponse.next();
  }

  // 5. Determine preferred language
  let lang = DEFAULT_LANGUAGE;
  const acceptLang = request.headers.get("accept-language") || "";
  
  if (acceptLang) {
    const userLang = acceptLang.split(",")[0].split("-")[0].toLowerCase();
    if (LANGUAGES.includes(userLang)) {
      lang = userLang;
    }
  }

  // 6. Redirect to language-prefixed path
  const newUrl = new URL(request.url);
  newUrl.pathname = `/${lang}${pathname}`;
  
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico|robots.txt|sitemap.xml).*)"],
};
