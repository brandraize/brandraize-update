import Hero from '@/components/Hero';
import About from '@/components/about';
import TechSlider from '@/components/TechSlider';
import Services from '@/components/services';

export const dynamic = 'force-dynamic';

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  return (
    <main>
      <Hero locale={locale === 'ar' ? 'ar' : 'en'} />
      <About locale={locale === 'ar' ? 'ar' : 'en'} />
      <Services locale={locale === 'ar' ? 'ar' : 'en'} />
      <TechSlider locale={locale === 'ar' ? 'ar' : 'en'} />
    </main>
  );
}
