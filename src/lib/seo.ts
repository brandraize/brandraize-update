import type { Metadata } from 'next';
import { defaultLocale, site, type Locale } from './site';

// Canonical + hreflang + social card for a page. `path` is the part after the locale ("" for home).
export function pageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  const url = `/${locale}${path}`;
  // The phone number leads the description so it shows in the search result itself.
  const call = locale === 'ar' ? 'اتصل الآن' : 'Call';
  description = `${call} ${site.phoneDisplay} — ${description}`;
  // The shared card from app/[locale]/opengraph-image.tsx, repeated here because a page's own
  // openGraph settings replace the ones it would inherit.
  const image = { url: `/${locale}/opengraph-image`, width: 1200, height: 630, alt: site.name };

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `/en${path}`,
        ar: `/ar${path}`,
        'x-default': `/${defaultLocale}${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      type: 'website',
      images: [image],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}
