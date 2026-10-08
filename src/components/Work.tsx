import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';
import Reveal from '@/components/Reveal';
import Slider from '@/components/Slider';
import { getProjects } from '@/lib/cms';
import type { Locale } from '@/lib/site';

const content = {
  en: {
    eyebrow: 'Our Work',
    title: 'Recent projects',
    all: 'View all projects',
    prev: 'Previous projects',
    next: 'Next projects',
  },
  ar: {
    eyebrow: 'أعمالنا',
    title: 'من مشاريعنا الأخيرة',
    all: 'عرض جميع المشاريع',
    prev: 'المشاريع السابقة',
    next: 'المشاريع التالية',
  },
};

// Featured projects, managed from /admin → Projects. Three cards show at once on a desktop,
// two on a tablet and one on a phone, and the row slides when there are more than fit.
export default async function Work({ locale }: { locale: Locale }) {
  const t = content[locale];
  const projects = await getProjects();
  if (projects.length === 0) return null;

  return (
    <section className="bg-white py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold-700">{t.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-ink-900 sm:text-4xl">{t.title}</h2>
          </div>
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 rounded-full border border-ink-900 px-6 py-3 text-sm font-bold text-ink-900 transition-colors hover:bg-ink-900 hover:text-white"
          >
            {t.all}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
        </Reveal>

        <Reveal className="mt-8 sm:mt-12">
          <Slider perView={{ base: 1, sm: 2, lg: 3 }} labels={{ prev: t.prev, next: t.next }} autoplayMs={5000}>
            {projects.map((project) => (
              <div key={project.id} className="w-full">
                <ProjectCard project={project} locale={locale} />
              </div>
            ))}
          </Slider>
        </Reveal>
      </div>
    </section>
  );
}
