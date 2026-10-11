import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localeDetection: true,
  localePrefix: 'always',
  // Each page already declares its hreflang links in the HTML and the sitemap.
  alternateLinks: false,
});

export const config = {
  matcher: ['/((?!api|admin|_next|.*\\..*).*)'],
};
