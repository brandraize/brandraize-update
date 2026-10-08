import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import Slider from '@/components/Slider';
import { getProjects } from '@/lib/cms';
import type { Locale } from '@/lib/site';

const content = {
  en: {
    eyebrow: 'Our Work',
    title: 'Recent projects',
    cta: 'See project details',
    all: 'View all projects',
    prev: 'Previous project',
    next: 'Next project',
  },
  ar: {
    eyebrow: 'أعمالنا',
    title: 'من مشاريعنا الأخيرة',
    cta: 'عرض تفاصيل المشروع',
    all: 'عرض جميع المشاريع',
    prev: 'المشروع السابق',
    next: 'المشروع التالي',
  },
};

// Featured projects, managed from /admin → Projects, shown one at a time in a slider.
export default async function Work({ locale }: { locale: Locale }) {
  const t = content[locale];
  const projects = await getProjects();
  if (projects.length === 0) return null;

  return (
    <section className="bg-white py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold-700">{t.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-ink-900 sm:text-4xl">{t.title}</h2>
        </Reveal>

        <Reveal className="mt-8 sm:mt-12">
          <Slider labels={{ prev: t.prev, next: t.next }} autoplayMs={7000}>
            {projects.map((item) => (
              <article key={item.id} className="grid w-full items-center gap-8 lg:grid-cols-2 lg:gap-14">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-sand-50">
                  <Image
                    src={item.image}
                    alt={item.title[locale]}
                    fill
                    sizes="(min-width: 1024px) 560px, 100vw"
                    // Admin uploads are already compressed and served from /api/img.
                    unoptimized={item.image.startsWith('/api/')}
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="text-sm font-bold text-gold-700">{item.category[locale]}</p>
                  <h3 className="mt-2 text-2xl font-extrabold text-ink-900 sm:text-3xl">{item.title[locale]}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-slate-600">{item.summary[locale]}</p>
                  <Link
                    href={`/${locale}/projects/${item.id}`}
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-bold text-ink-950 transition-colors hover:bg-gold-400"
                  >
                    {t.cta}
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </Slider>
        </Reveal>

        <div className="mt-10 text-center">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 rounded-full border border-ink-900 px-6 py-3 text-sm font-bold text-ink-900 transition-colors hover:bg-ink-900 hover:text-white"
          >
            {t.all}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
