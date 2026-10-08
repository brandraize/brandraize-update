import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localeDetection: true,
  localePrefix: 'always',
});

export const config = {
  matcher: ['/((?!api|admin|_next|.*\\..*).*)'],
};
