import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/footer';

const locales = ['en', 'ar'];

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const validLocale = locale === 'ar' ? 'ar' : 'en';
  const t = await getTranslations({ locale: validLocale });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Props) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header lang={locale as 'en' | 'ar'} />
      
      {children}

      <Footer lang={locale as 'en' | 'ar'} />

    </NextIntlClientProvider>
  );
}
