import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ArrowLeft, ArrowRight, Check, ExternalLink, Quote, Star } from 'lucide-react';
import CtaBand from '@/components/CtaBand';
import Gallery from '@/components/Gallery';
import ProjectCard from '@/components/ProjectCard';
import ProjectPicture from '@/components/ProjectPicture';
import Reveal from '@/components/Reveal';
import WebsitePreview from '@/components/WebsitePreview';
import { getProject, getProjects } from '@/lib/cms';
import { pageMetadata } from '@/lib/seo';
import { toLocale } from '@/lib/site';

type ProjectPageProps = {
  params: Promise<{ locale: string; id: string }>;
};

const content = {
  en: {
    back: 'All projects',
    visit: 'Visit the live website',
    start: 'Start a project like this',
    facts: { client: 'Client', industry: 'Industry', year: 'Year', services: 'What we did', website: 'Website' },
    overview: 'Project overview',
    story: [
      { key: 'challenge', label: 'The challenge' },
      { key: 'solution', label: 'What we built' },
      { key: 'result', label: 'The result' },
    ],
    features: 'Key features',
    technologies: 'Built with',
    previewTitle: 'See the finished website',
    previewBody: 'This is the real home page, scrolling from top to bottom just as a visitor would see it.',
    galleryTitle: 'More from this project',
    satisfaction: 'Client satisfaction',
    rating: (n: number) => `Rated ${n} out of 5 by the client`,
    more: 'More projects',
    preview: {
      play: 'Play the preview',
      pause: 'Pause the preview',
      hint: 'Scrolling automatically — hover or touch to pause, and scroll it yourself',
    },
    gallery: { open: 'Open image', close: 'Close', prev: 'Previous image', next: 'Next image' },
  },
  ar: {
    back: 'جميع المشاريع',
    visit: 'زيارة الموقع',
    start: 'ابدأ مشروعاً مماثلاً',
    facts: { client: 'العميل', industry: 'القطاع', year: 'السنة', services: 'ما قمنا به', website: 'الموقع' },
    overview: 'نبذة عن المشروع',
    story: [
      { key: 'challenge', label: 'التحدي' },
      { key: 'solution', label: 'ما بنيناه' },
      { key: 'result', label: 'النتيجة' },
    ],
    features: 'أبرز المزايا',
    technologies: 'التقنيات المستخدمة',
    previewTitle: 'شاهد الموقع بعد اكتماله',
    previewBody: 'هذه هي الصفحة الرئيسية الفعلية، تتحرك من الأعلى إلى الأسفل كما يراها الزائر.',
    galleryTitle: 'صور أخرى من المشروع',
    satisfaction: 'رضا العميل',
    rating: (n: number) => `تقييم العميل ${n} من 5`,
    more: 'مشاريع أخرى',
    preview: {
      play: 'تشغيل المعاينة',
      pause: 'إيقاف المعاينة',
      hint: 'تتحرك تلقائياً — مرّر المؤشر أو المس للإيقاف، ويمكنك التمرير بنفسك',
    },
    gallery: { open: 'فتح الصورة', close: 'إغلاق', prev: 'الصورة السابقة', next: 'الصورة التالية' },
  },
} as const;

// Only http(s) links from the admin become a clickable "visit" button.
const safeUrl = (url: string) => (/^https?:\/\//i.test(url) ? url : '');
const hostname = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
};
// The admin separates paragraphs with line breaks.
const paragraphs = (value: string) => value.split(/\n+/).map((p) => p.trim()).filter(Boolean);

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
  const others = (await getProjects()).filter((item) => item.id !== project.id).slice(0, 3);

  const facts = [
    { label: t.facts.client, value: project.client[locale] },
    { label: t.facts.industry, value: project.industry[locale] },
    { label: t.facts.year, value: project.year },
    { label: t.facts.services, value: project.services[locale].join(' · ') },
    { label: t.facts.website, value: hostname(url) },
  ].filter((fact) => fact.value);

  const overview = paragraphs(project.details[locale]);
  const story = t.story
    .map((part) => ({ label: part.label, body: paragraphs(project[part.key][locale]) }))
    .filter((part) => part.body.length > 0);
  const features = project.features[locale];
  const stats = project.stats[locale].slice(0, 4);
  const quote = project.clientQuote[locale];
  const hasSatisfaction = project.rating > 0 || Boolean(quote);

  return (
    <main>
      {/* ── Header: title on the left, the project picture on the right ── */}
      <section className="relative isolate overflow-hidden bg-ink-950 text-white">
        <div className="bg-dots absolute inset-0 -z-10" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(55%_60%_at_85%_0%,rgba(56,112,224,0.38),transparent_70%)]" />

        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-14 pt-28 sm:px-6 sm:pt-36 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8 lg:pb-20 lg:pt-40">
          <div>
            <Link
              href={`/${locale}/projects`}
              className="inline-flex animate-fade-up items-center gap-2 text-sm font-bold text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              {t.back}
            </Link>
            <p className="mt-6 animate-fade-up text-sm font-bold uppercase tracking-[0.18em] text-gold-400 [animation-delay:80ms]">
              {project.category[locale]}
            </p>
            <h1 className="mt-3 animate-fade-up text-4xl font-extrabold leading-tight [animation-delay:160ms] sm:text-5xl">
              {project.title[locale]}
            </h1>
            <p className="mt-5 max-w-xl animate-fade-up text-lg leading-relaxed text-white/75 [animation-delay:240ms]">
              {project.summary[locale]}
            </p>

            <div className="mt-8 flex animate-fade-up flex-col gap-3 [animation-delay:320ms] sm:flex-row sm:flex-wrap">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3.5 text-base font-bold text-ink-950 transition-colors hover:bg-gold-400"
              >
                {t.start}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-white/10"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  {t.visit}
                </a>
              )}
            </div>
          </div>

          <div className="animate-fade-up [animation-delay:300ms]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white shadow-[0_40px_90px_rgba(0,0,0,0.45)]">
<<<<<<< HEAD
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title[locale]}
                  fill
                  priority
                  sizes="(min-width: 1024px) 600px, 100vw"
                  unoptimized={project.image.startsWith('/api/')}
                  className="object-cover"
                />
              ) : (
                // No picture yet: show the project name instead of an empty image.
                <span className="bg-dots absolute inset-0 flex items-center justify-center bg-ink-950 px-8 text-center text-2xl font-extrabold text-gold-400 sm:text-3xl">
                  {project.title[locale]}
                </span>
              )}
=======
              <ProjectPicture
                project={project}
                locale={locale}
                alt={project.title[locale]}
                priority
                sizes="(min-width: 1024px) 600px, 100vw"
              />
>>>>>>> 02923ce677fe9014de603a43fa71606b69bac950
            </div>
          </div>
        </div>

        {/* Facts strip */}
        {facts.length > 0 && (
          <div className="border-t border-white/10 bg-ink-900/70">
            <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-x-8 gap-y-6 px-4 py-7 sm:px-6 lg:flex lg:flex-wrap lg:justify-between lg:px-8">
              {facts.map((fact) => (
                <div key={fact.label} className="min-w-0">
                  <dt className="text-xs font-bold uppercase tracking-[0.16em] text-gold-400">{fact.label}</dt>
                  <dd className="mt-1.5 break-words text-base font-bold leading-snug">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </section>

      {/* ── Headline numbers ── */}
      {stats.length > 0 && (
        <section className="border-b border-sand-200 bg-white">
          <ul className="mx-auto flex max-w-7xl flex-wrap justify-center gap-y-8 px-4 py-10 sm:px-6 lg:px-8">
            {stats.map((stat, i) => (
              <li key={stat.label} className="w-1/2 px-3 lg:w-1/4">
                <Reveal variant="zoom" delay={i * 110} className="text-center">
                  <p className="text-4xl font-extrabold text-gold-600 sm:text-5xl" dir="auto">{stat.value}</p>
                  <p className="mt-2 text-[15px] font-medium text-slate-600">{stat.label}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Overview ── */}
      {overview.length > 0 && (
        <section className="bg-white py-12 sm:py-16 lg:py-20">
          <Reveal className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">{t.overview}</h2>
            <div className="mt-5 space-y-4">
              {overview.map((paragraph, i) => (
                <p key={i} className="text-lg leading-relaxed text-slate-600">{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* ── The story: challenge, what we built, result ── */}
      {story.length > 0 && (
        <section className="bg-sand-50 py-12 sm:py-16 lg:py-20">
          <ol className={`mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:px-8 ${story.length > 1 ? 'lg:grid-cols-3' : ''}`}>
            {story.map((part, i) => (
              <li key={part.label}>
                <Reveal delay={i * 130} className="h-full rounded-3xl border border-sand-200 bg-white p-7 sm:p-8">
                  <span className="text-5xl font-extrabold leading-none text-gold-500" dir="ltr">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="mt-4 text-xl font-extrabold text-ink-900 sm:text-2xl">{part.label}</h2>
                  <div className="mt-3 space-y-3">
                    {part.body.map((paragraph, p) => (
                      <p key={p} className="text-base leading-relaxed text-slate-600">{paragraph}</p>
                    ))}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* ── Features and technologies ── */}
      {(features.length > 0 || project.technologies.length > 0) && (
        <section className="bg-white py-12 sm:py-16 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:px-8">
            {features.length > 0 && (
              <div>
                <Reveal>
                  <h2 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">{t.features}</h2>
                </Reveal>
                <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {features.map((feature, i) => (
                    <li key={feature}>
                      <Reveal delay={(i % 2) * 90 + Math.floor(i / 2) * 70} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-gold-500 text-ink-950">
                          <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                        </span>
                        <span className="text-base font-medium text-ink-800">{feature}</span>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.technologies.length > 0 && (
              <Reveal variant="end">
                <h2 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">{t.technologies}</h2>
                <ul className="mt-6 flex flex-wrap gap-2.5" dir="ltr">
                  {project.technologies.map((tech) => (
                    <li key={tech} className="rounded-full bg-ink-900 px-4 py-2 text-sm font-bold text-gold-300">
                      {tech}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* ── Auto-scrolling preview of the finished website ── */}
      {project.fullPage.length > 0 && (
        <section className="bg-sand-50 py-12 sm:py-16 lg:py-20">
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
        <section className="bg-white py-12 sm:py-16 lg:py-20">
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

      {/* ── Client satisfaction ── */}
      {hasSatisfaction && (
        <section className="relative isolate overflow-hidden bg-ink-950 py-14 text-white sm:py-20">
          <div className="bg-dots absolute inset-0 -z-10" />
          <Reveal variant="zoom" className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold-400">{t.satisfaction}</p>

            {project.rating > 0 && (
              <div className="mt-5 flex justify-center gap-1.5" role="img" aria-label={t.rating(project.rating)} dir="ltr">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    aria-hidden="true"
                    className={`h-8 w-8 ${i < project.rating ? 'fill-gold-400 text-gold-400' : 'text-white/25'}`}
                  />
                ))}
              </div>
            )}

            {quote && (
              <figure className="mt-7">
                <Quote className="mx-auto h-9 w-9 text-gold-500" aria-hidden="true" />
                <blockquote className="mt-4 text-xl font-medium leading-relaxed sm:text-2xl">{quote}</blockquote>
                {project.clientPerson[locale] && (
                  <figcaption className="mt-5 text-base font-bold text-gold-300">{project.clientPerson[locale]}</figcaption>
                )}
              </figure>
            )}
          </Reveal>
        </section>
      )}

      {/* ── More projects ── */}
      {others.length > 0 && (
        <section className="bg-sand-50 py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">{t.more}</h2>
            </Reveal>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((item, i) => (
                <Reveal key={item.id} variant="zoom" delay={i * 110} className="h-full">
                  <ProjectCard project={item} locale={locale} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand locale={locale} />
    </main>
  );
}
