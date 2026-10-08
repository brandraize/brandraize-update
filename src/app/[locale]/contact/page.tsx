import { setRequestLocale } from 'next-intl/server';
import ContactUs from '@/components/ContactUs';
import { pageMetadata } from '@/lib/seo';
import { toLocale } from '@/lib/site';

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

const meta = {
  en: {
    title: 'Contact Brandraize — Free Consultation',
    description:
      'Talk to Brandraize about your website, app, or marketing project. Send the form, call, or message us on WhatsApp for a free consultation.',
  },
  ar: {
    title: 'تواصل مع براندرايز — استشارة مجانية',
    description:
      'تحدث مع براندرايز عن مشروع موقعك أو تطبيقك أو حملتك التسويقية. أرسل النموذج أو اتصل أو راسلنا على واتساب للحصول على استشارة مجانية.',
  },
};

export async function generateMetadata({ params }: ContactPageProps) {
  const locale = toLocale((await params).locale);
  return pageMetadata(locale, '/contact', meta[locale].title, meta[locale].description);
}

export default async function ContactPage({ params }: ContactPageProps) {
  const locale = toLocale((await params).locale);
  setRequestLocale(locale);

  return <ContactUs locale={locale} />;
}
