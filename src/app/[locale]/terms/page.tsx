import { setRequestLocale } from 'next-intl/server';
import LegalPage, { legal } from '@/components/LegalPage';
import { pageMetadata } from '@/lib/seo';
import { toLocale } from '@/lib/site';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const locale = toLocale((await params).locale);
  const doc = legal.terms[locale];
  return pageMetadata(locale, '/terms', doc.title, doc.intro);
}

export default async function Page({ params }: Props) {
  const locale = toLocale((await params).locale);
  setRequestLocale(locale);

  return <LegalPage doc={legal.terms[locale]} />;
}
