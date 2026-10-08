import Link from 'next/link';
import { getLocale } from 'next-intl/server';
import PageHero from '@/components/PageHero';
import { toLocale } from '@/lib/site';

const content = {
  en: {
    title: 'Page not found',
    description: 'The page you are looking for does not exist or has moved.',
    home: 'Back to home',
  },
  ar: {
    title: 'الصفحة غير موجودة',
    description: 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
    home: 'العودة للرئيسية',
  },
};

export default async function NotFound() {
  const locale = toLocale(await getLocale());
  const t = content[locale];

  return (
    <main>
      <PageHero eyebrow="404" title={t.title} description={t.description}>
        <Link
          href={`/${locale}`}
          className="inline-flex rounded-full bg-gold-500 px-7 py-3.5 text-base font-bold text-ink-950 transition-colors hover:bg-gold-400"
        >
          {t.home}
        </Link>
      </PageHero>
    </main>
  );
}
