import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProjectPicture from '@/components/ProjectPicture';
import ScrollingCover from '@/components/ScrollingCover';
import type { Project } from '@/lib/cms';
import type { Locale } from '@/lib/site';

const more = { en: 'See project details', ar: 'عرض تفاصيل المشروع' };

// A project teaser for the Projects page: picture, type, name, short description and a link to its page.
export default function ProjectCard({ project, locale }: { project: Project; locale: Locale }) {
  const href = `/${locale}/projects/${project.id}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-sand-200 bg-white transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(11,18,32,0.10)]">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden bg-sand-50" tabIndex={-1} aria-hidden="true">
        {project.fullPage.length > 0 ? (
          <ScrollingCover
            strips={project.fullPage}
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <ProjectPicture
            project={project}
            locale={locale}
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
            className="transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-bold text-gold-700">{project.category[locale]}</p>
        <h3 className="mt-1.5 text-xl font-extrabold text-ink-900">{project.title[locale]}</h3>
        <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-600">{project.summary[locale]}</p>
        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-2 self-start rounded-full bg-ink-900 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-ink-800"
        >
          {more[locale]}
          <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
