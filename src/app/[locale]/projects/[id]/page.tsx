import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import CtaBand from '@/components/CtaBand';
import Gallery from '@/components/Gallery';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import WebsitePreview from '@/components/WebsitePreview';
import { getProject } from '@/lib/cms';
import { pageMetadata } from '@/lib/seo';
import { toLocale } from '@/lib/site';

type ProjectPageProps = {
  params: Promise<{ locale: string; id: string }>;
};

const content = {
  en: {
    back: 'All projects',
    about: 'About this project',
    visit: 'Visit the live website',
    start: 'Start a project like this',
    previewTitle: 'See the finished website',
    previewBody: 'This is the real home page, scrolling from top to bottom just as a visitor would see it.',
    galleryTitle: 'More from this project',
    preview: {
      play: 'Play the preview',
      pause: 'Pause the preview',
      hint: 'Scrolling automatically — hover or touch to pause, and scroll it yourself',
    },
    gallery: { open: 'Open image', close: 'Close', prev: 'Previous image', next: 'Next image' },
  },
  ar: {
    back: 'جميع المشاريع',
    about: 'عن هذا المشروع',
    visit: 'زيارة الموقع',
    start: 'ابدأ مشروعاً مماثلاً',
    previewTitle: 'شاهد الموقع بعد اكتماله',
    previewBody: 'هذه هي الصفحة الرئيسية الفعلية، تتحرك من الأعلى إلى الأسفل كما يراها الزائر.',
    galleryTitle: 'صور أخرى من المشروع',
    preview: {
      play: 'تشغيل المعاينة',
      pause: 'إيقاف المعاينة',
      hint: 'تتحرك تلقائياً — مرّر المؤشر أو المس للإيقاف، ويمكنك التمرير بنفسك',
    },
    gallery: { open: 'فتح الصورة', close: 'إغلاق', prev: 'الصورة السابقة', next: 'الصورة التالية' },
  },
};

// Only http(s) links from the admin become a clickable "visit" button.
const safeUrl = (url: string) => (/^https?:\/\//i.test(url) ? url : '');
const hostname = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
};

export async function generateMetadata({ params }: ProjectPageProps) {
  const { locale: rawLocale, id } = await params;
  const locale = toLocale(rawLocale);
  const project = await getProject(id);
  if (!project) return {};
  return pageMetadata(locale, `/projects/${id}`, project.title[locale], project.summary[locale]);
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale: rawLocale, id } = await params;
  const locale = toLocale(rawLocale);
  setRequestLocale(locale);

  const project = await getProject(id);
  if (!project) notFound();

  const t = content[locale];
  const url = safeUrl(project.url);
  const details = project.details[locale] || project.summary[locale];

  return (
    <main>
      <PageHero eyebrow={project.category[locale]} title={project.title[locale]} description={project.summary[locale]}>
        <Link
          href={`/${locale}/projects`}
          className="inline-flex items-center gap-2 text-sm font-bold text-white/75 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          {t.back}
        </Link>
      </PageHero>

      {/* ── Overview ── */}
      <section className="bg-white py-10 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-start lg:gap-14 lg:px-8">
          <Reveal variant="start">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-sand-50">
              <Image
                src={project.image}
                alt={project.title[locale]}
                fill
                priority
                sizes="(min-width: 1024px) 600px, 100vw"
                unoptimized={project.image.startsWith('/api/')}
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal variant="end">
            <h2 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">{t.about}</h2>
            {/* The admin separates paragraphs with line breaks. */}
            <div className="mt-4 space-y-4">
              {details.split(/\n+/).filter(Boolean).map((paragraph, i) => (
                <p key={i} className="text-lg leading-relaxed text-slate-600">{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-ink-800"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  {t.visit}
                </a>
              )}
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-bold text-ink-950 transition-colors hover:bg-gold-400"
              >
                {t.start}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Auto-scrolling preview of the finished website ── */}
      {project.fullPage.length > 0 && (
        <section className="bg-sand-50 py-10 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center">
              <h2 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">{t.previewTitle}</h2>
              <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-600">{t.previewBody}</p>
            </Reveal>
            <Reveal variant="zoom" className="mt-8">
              <WebsitePreview
                strips={project.fullPage}
                address={hostname(url) || project.title[locale]}
                labels={t.preview}
              />
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Gallery ── */}
      {project.gallery.length > 0 && (
        <section className="bg-white py-10 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">{t.galleryTitle}</h2>
            </Reveal>
            <div className="mt-8">
              <Gallery images={project.gallery} alt={project.title[locale]} labels={t.gallery} />
            </div>
          </div>
        </section>
      )}

      <CtaBand locale={locale} />
    </main>
  );
}
