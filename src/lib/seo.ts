import type { Metadata } from 'next';
import { site, type Locale } from './site';

// Canonical + hreflang + social card for a page. `path` is the part after the locale ("" for home).
export function pageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  const url = `/${locale}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `/en${path}`,
        ar: `/ar${path}`,
        'x-default': `/en${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}
