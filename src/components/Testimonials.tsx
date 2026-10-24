import Image from 'next/image';
import { Quote } from 'lucide-react';
import Slider from '@/components/Slider';
import type { Review } from '@/lib/cms';
import { sampleTestimonials } from '@/lib/proof';
import type { Locale } from '@/lib/site';

const content = {
  en: {
    eyebrow: 'Client Feedback',
    title: 'What our clients say',
    prev: 'Previous review',
    next: 'Next review',
    sample: 'Sample — only visible on your computer. Add real reviews in /admin → Client feedback',
  },
  ar: {
    eyebrow: 'آراء العملاء',
    title: 'ماذا يقول عملاؤنا',
    prev: 'التقييم السابق',
    next: 'التقييم التالي',
    sample: 'نموذج تجريبي — يظهر على جهازك فقط. أضف التقييمات الحقيقية من /admin',
  },
};

type TestimonialsProps = {
  locale: Locale;
  // Published reviews from /admin → Client feedback.
  reviews: Review[];
};

export default function Testimonials({ locale, reviews }: TestimonialsProps) {
  const t = content[locale];

  // With no real reviews yet: hidden on the live site, sample cards on your own computer.
  const showSamples = reviews.length === 0 && process.env.NODE_ENV !== 'production';
  const items: Array<Omit<Review, 'id'>> = showSamples ? sampleTestimonials : reviews;
  if (items.length === 0) return null;

  return (
    <section className="relative isolate overflow-hidden bg-ink-950 py-14 text-white sm:py-20 lg:py-28">
      <div className="bg-dots absolute inset-0 -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold-400">{t.eyebrow}</p>
        <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">{t.title}</h2>

        {showSamples && (
          <p className="mt-5 rounded-xl border border-dashed border-gold-500/60 px-4 py-2 text-sm text-gold-300">
            {t.sample}
          </p>
        )}

        <div className="mt-8 sm:mt-10">
          <Slider perView={{ base: 1, sm: 2, lg: 3 }} tone="dark" labels={{ prev: t.prev, next: t.next }}>
            {items.map((item, i) => (
              <figure key={i} className="flex w-full flex-col rounded-3xl bg-white p-6 text-ink-900 sm:p-8">
                <Quote className="h-8 w-8 text-gold-500" aria-hidden="true" />
                <blockquote className="mt-4 flex-1 text-base leading-relaxed text-slate-700 sm:text-[17px]">
                  {item.quote[locale]}
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-4 border-t border-sand-200 pt-5">
                  {item.photo ? (
                    <Image
                      src={item.photo}
                      alt=""
                      width={56}
                      height={56}
                      className="h-14 w-14 flex-none rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-ink-900 text-lg font-extrabold text-gold-400">
                      {item.name[locale].trim().charAt(0)}
                    </span>
                  )}
                  <div>
                    <p className="text-lg font-extrabold leading-tight">{item.name[locale]}</p>
                    <p className="mt-0.5 text-sm font-medium text-gold-700">{item.project[locale]}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
