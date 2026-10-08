import { getTranslations, setRequestLocale } from 'next-intl/server';
import Hero from '@/components/Hero';
import About from '@/components/about';
import TechSlider from '@/components/TechSlider';
import Services from '@/components/services';
import Faq from '@/components/Faq';
import CtaBand from '@/components/CtaBand';
import ClientLogos from '@/components/ClientLogos';
import Testimonials from '@/components/Testimonials';
import Work from '@/components/Work';
import { getTestimonials } from '@/lib/cms';
import { pageMetadata } from '@/lib/seo';
import { toLocale } from '@/lib/site';

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: HomePageProps) {
  const locale = toLocale((await params).locale);
  const t = await getTranslations({ locale });

  return {
    ...pageMetadata(locale, '', t('metaTitle'), t('metaDescription')),
    title: { absolute: t('metaTitle') },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const locale = toLocale((await params).locale);
  setRequestLocale(locale);

  return (
    <main>
      <Hero locale={locale} />
      <ClientLogos locale={locale} />
      <Services locale={locale} />
      <Work locale={locale} />
      <About locale={locale} />
      <Testimonials locale={locale} reviews={await getTestimonials()} />
      <TechSlider locale={locale} />
      <Faq locale={locale} />
      <CtaBand locale={locale} />
    </main>
  );
}
