import '../globals.css';
import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { Tajawal } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import AiAgent from '@/components/AiAgent';
import Analytics from '@/components/Analytics';
import { WhatsAppFloat } from '@/components/ContactLink';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import { locales, site, toLocale } from '@/lib/site';

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-tajawal',
  display: 'swap',
});

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  applicationName: site.name,
  // Google Search Console "HTML tag" verification code, when set.
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
};

export const viewport: Viewport = {
  themeColor: '#07173d',
};

export default async function LocaleLayout({
  children,
  params,
}: Props) {
  const { locale: rawLocale } = await params;

  if (!(locales as readonly string[]).includes(rawLocale)) {
    notFound();
  }

  const locale = toLocale(rawLocale);
  setRequestLocale(locale);
  const messages = await getMessages();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${site.url}/#organization`,
        name: site.name,
        alternateName: site.alternateNames,
        url: site.url,
        logo: `${site.url}/logo%20b.png`,
        image: `${site.url}/${locale}/opengraph-image`,
        telephone: site.phone,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: site.phone,
          contactType: 'customer service',
          areaServed: 'SA',
          availableLanguage: ['Arabic', 'English'],
        },
        email: site.email,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Jeddah',
          addressRegion: 'Makkah',
          addressCountry: 'SA',
        },
        areaServed: 'SA',
        sameAs: Object.values(site.social),
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        name: site.name,
        alternateName: site.alternateNames,
        url: site.url,
        inLanguage: [...locales],
        publisher: { '@id': `${site.url}/#organization` },
      },
    ],
  };

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Browser extensions add attributes to <body> before React loads */}
      <body className={`${tajawal.variable} font-sans antialiased`} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        {/* Scroll-reveal content stays visible when JavaScript is unavailable */}
        <noscript>
          <style>{'[data-reveal]{opacity:1!important;transform:none!important}'}</style>
        </noscript>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header lang={locale} />

          {children}

          <Footer lang={locale} />
          <WhatsAppFloat locale={locale} />
         {/* <AiAgent locale={locale} /> */}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
