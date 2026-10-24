import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales } from '@/lib/site';

export default createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true,
  localePrefix: 'always',
  // Each page already declares its hreflang links in the HTML and the sitemap.
  alternateLinks: false,
});

export const config = {
  matcher: ['/((?!api|admin|_next|.*\\..*).*)'],
};
