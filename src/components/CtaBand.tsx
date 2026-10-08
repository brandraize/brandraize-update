import Link from 'next/link';
import { Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import ContactLink from '@/components/ContactLink';
import { site, whatsappHref, type Locale } from '@/lib/site';

const content = {
  en: {
    title: 'Ready to grow your business online?',
    body: 'Book a free consultation. Tell us where you want to go and we will show you how we can get you there.',
    primary: 'Get a free consultation',
    whatsapp: 'WhatsApp us',
  },
  ar: {
    title: 'جاهز لتنمية أعمالك على الإنترنت؟',
    body: 'احجز استشارة مجانية. أخبرنا إلى أين تريد الوصول وسنوضح لك كيف نوصلك إلى هناك.',
    primary: 'احصل على استشارة مجانية',
    whatsapp: 'راسلنا على واتساب',
  },
};

// Closing call to action shown above the footer.
export default function CtaBand({ locale }: { locale: Locale }) {
  const t = content[locale];

  return (
    <section className="bg-sand-50 px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-ink-950 px-6 py-10 text-white sm:py-14 sm:px-12 lg:py-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_80%_at_100%_0%,rgba(56,112,224,0.38),transparent_70%)]" />
        <div className="flex flex-col gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">{t.title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/75">{t.body}</p>
          </div>

          <div className="flex flex-col gap-3 whitespace-nowrap sm:flex-row sm:flex-wrap">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center rounded-full bg-gold-500 px-7 py-3.5 text-base font-bold text-ink-950 transition-colors hover:bg-gold-400"
            >
              {t.primary}
            </Link>
            <ContactLink
              href={whatsappHref(locale)}
              method="whatsapp"
              source="cta_band"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-white/10"
            >
              <FaWhatsapp size={20} aria-hidden="true" />
              {t.whatsapp}
            </ContactLink>
            <ContactLink
              href={`tel:${site.phone}`}
              method="phone"
              source="cta_band"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-white/10"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span dir="ltr">{site.phoneDisplay}</span>
            </ContactLink>
          </div>
        </div>
      </div>
    </section>
  );
}
