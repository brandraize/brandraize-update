import { setRequestLocale } from 'next-intl/server';
import About2 from '@/components/about2';
import CtaBand from '@/components/CtaBand';
import PageHero from '@/components/PageHero';
import { pageMetadata } from '@/lib/seo';
import { toLocale } from '@/lib/site';

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

const content = {
  en: {
    eyebrow: 'About Us',
    title: 'Empowering Innovation, Driving Success in Saudi Arabia',
    description:
      'Brandraize is a software development and digital marketing company in Saudi Arabia. We deliver custom software, mobile apps, ERP systems, SaaS platforms, AI solutions, and IT infrastructure support — helping businesses across KSA turn ideas into results.',
    metaTitle: 'About Brandraize — Software & Digital Agency in Saudi Arabia',
  },
  ar: {
    eyebrow: 'من نحن',
    title: 'تمكين الابتكار، دفع النجاح في المملكة العربية السعودية',
    description:
      'براندرايز شركة تطوير برمجيات وتسويق رقمي في المملكة العربية السعودية. نقدم برمجيات مخصصة، تطبيقات جوال، أنظمة ERP، منصات SaaS، حلول الذكاء الاصطناعي، ودعم البنية التحتية لتقنية المعلومات — لنساعد الشركات في أنحاء المملكة على تحويل الأفكار إلى نتائج.',
    metaTitle: 'عن براندرايز — شركة برمجيات ووكالة رقمية في السعودية',
  },
};

export async function generateMetadata({ params }: AboutPageProps) {
  const locale = toLocale((await params).locale);
  const t = content[locale];
  return pageMetadata(locale, '/about', t.metaTitle, t.description);
}

export default async function AboutPage({ params }: AboutPageProps) {
  const locale = toLocale((await params).locale);
  setRequestLocale(locale);
  const t = content[locale];

  return (
    <main>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <About2 locale={locale} />
      <CtaBand locale={locale} />
    </main>
  );
}
