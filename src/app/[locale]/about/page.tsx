import About from '@/components/about';
import About2 from '@/components/about2';
import AboutBanner from '@/components/aboutbanner';

type AboutPageProps = {
  params: {
    locale: 'en' | 'ar';
  };
};

export default function AboutPage({ params }: AboutPageProps) {
  return (
    <>
      <AboutBanner locale={params.locale} />
      <About locale={params.locale} />
      <About2 locale={params.locale} />
    </>
  );
}
