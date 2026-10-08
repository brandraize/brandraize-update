import { setRequestLocale } from 'next-intl/server';
import CtaBand from '@/components/CtaBand';
import PageHero from '@/components/PageHero';
import ProjectCard from '@/components/ProjectCard';
import Reveal from '@/components/Reveal';
import { getProjects } from '@/lib/cms';
import { pageMetadata } from '@/lib/seo';
import { toLocale } from '@/lib/site';

type ProjectsPageProps = {
  params: Promise<{ locale: string }>;
};

const content = {
  en: {
    eyebrow: 'Our Work',
    title: 'Projects we have delivered',
    description:
      'A look at websites and digital products we have built. Open any project to see the details, more pictures, and a preview of the finished website.',
    metaTitle: 'Projects — Websites and Digital Products by Brandraize',
  },
  ar: {
    eyebrow: 'أعمالنا',
    title: 'مشاريع نفّذناها',
    description:
      'نماذج من المواقع والمنتجات الرقمية التي بنيناها. افتح أي مشروع لمشاهدة التفاصيل وصور أكثر ومعاينة للموقع بعد اكتماله.',
    metaTitle: 'المشاريع — مواقع ومنتجات رقمية من براندرايز',
  },
};

export async function generateMetadata({ params }: ProjectsPageProps) {
  const locale = toLocale((await params).locale);
  const t = content[locale];
  return pageMetadata(locale, '/projects', t.metaTitle, t.description);
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const locale = toLocale((await params).locale);
  setRequestLocale(locale);
  const t = content[locale];
  const projects = await getProjects();

  return (
    <main>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} />

      <section className="bg-sand-50 py-10 sm:py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
          {projects.map((project, i) => (
            <Reveal key={project.id} variant="zoom" delay={(i % 3) * 110} className="h-full">
              <ProjectCard project={project} locale={locale} />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand locale={locale} />
    </main>
  );
}
