import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localeDetection: true,
  localePrefix: 'always',
});

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  const locale = request.nextUrl.pathname.startsWith('/ar') ? 'ar' : 'en';
  response.headers.set('x-locale', locale);
  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
