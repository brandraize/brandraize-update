import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ArrowRight, Check } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import ContactLink from '@/components/ContactLink';
import CtaBand from '@/components/CtaBand';
import Faq from '@/components/Faq';
import ProjectCard from '@/components/ProjectCard';
import Reveal from '@/components/Reveal';
import { getProjects, getServiceGroups } from '@/lib/cms';
import { pageMetadata } from '@/lib/seo';
import { serviceSeo } from '@/lib/service-seo';
import { serviceGroups } from '@/lib/services';
import { locales, site, toLocale, whatsappHref, type Locale } from '@/lib/site';

type ServiceDetailProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const content = {
  en: {
    home: 'Home',
    services: 'Services',
    quote: 'Get a free quote',
    ask: 'Ask on WhatsApp',
    askText: (name: string) => `Hello Brandraize, I would like a quote for: ${name}`,
    includes: 'What you get',
    bestFor: 'Best for',
    work: 'Recent work',
    workTitle: 'Projects we have delivered',
    other: 'Other services',
  },
  ar: {
    home: 'الرئيسية',
    services: 'الخدمات',
    quote: 'اطلب عرض سعر مجاني',
    ask: 'اسأل عبر واتساب',
    askText: (name: string) => `مرحباً براندرايز، أرغب في عرض سعر لخدمة: ${name}`,
    includes: 'ماذا تحصل عليه',
    bestFor: 'مناسب لـ',
    work: 'من أعمالنا',
    workTitle: 'مشاريع نفّذناها',
    other: 'خدمات أخرى',
  },
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    serviceGroups.flatMap((group) => group.services.map((service) => ({ locale, slug: service.slug }))),
  );
}

async function findService(slug: string) {
  const groups = await getServiceGroups();
  const all = groups.flatMap((group) => group.services);
  return { service: all.find((s) => s.slug === slug), all };
}

export async function generateMetadata({ params }: ServiceDetailProps) {
  const { locale: rawLocale, slug } = await params;
  const locale = toLocale(rawLocale);
  const { service } = await findService(slug);
  if (!service) return {};

  const seo = serviceSeo[slug];
  return pageMetadata(
    locale,
    `/service/${slug}`,
    seo?.title[locale] ?? service.name[locale],
    seo?.description[locale] ?? service.description[locale],
  );
}

export default async function ServiceDetailPage({ params }: ServiceDetailProps) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = toLocale(rawLocale);
  setRequestLocale(locale);

  const { service, all } = await findService(slug);
  if (!service) notFound();

  const t = content[locale];
  const seo = serviceSeo[slug];
  const name = service.name[locale];
  const Icon = service.icon;
  const intro = seo?.intro[locale] ?? [service.description[locale]];

  const projects = (await getProjects()).filter((p) => seo?.projects.includes(p.id));
  const others = all.filter((s) => s.slug !== slug);

  const url = `${site.url}/${locale}/service/${slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name,
        serviceType: service.name.en,
        description: seo?.description[locale] ?? service.description[locale],
        url,
        inLanguage: locale,
        provider: { '@id': `${site.url}/#organization` },
        areaServed: [
          { '@type': 'Country', name: 'Saudi Arabia' },
          { '@type': 'City', name: 'Jeddah' },
          { '@type': 'City', name: 'Riyadh' },
          { '@type': 'City', name: 'Makkah' },
          { '@type': 'City', name: 'Dammam' },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name,
          itemListElement: service.includes[locale].map((item) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: item },
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: t.home, item: `${site.url}/${locale}` },
          { '@type': 'ListItem', position: 2, name: t.services, item: `${site.url}/${locale}/service` },
          { '@type': 'ListItem', position: 3, name, item: url },
        ],
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden bg-ink-950 text-white">
        <div className="absolute inset-0 -z-10">
          <div className="bg-dots absolute inset-0" />
          <div className="absolute -top-24 end-[-6rem] h-[28rem] w-[28rem] animate-glow rounded-full bg-[#3870e0]/30 blur-3xl" />
        </div>

        <div className="mx-auto max-w-5xl px-4 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-36 lg:px-8 lg:pt-44">
          <nav aria-label="Breadcrumb" className="animate-fade-up text-sm text-white/60">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href={`/${locale}`} className="hover:text-gold-400">{t.home}</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href={`/${locale}/service`} className="hover:text-gold-400">{t.services}</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-gold-400">{name}</li>
            </ol>
          </nav>

          <span className="mt-8 flex h-14 w-14 animate-fade-up items-center justify-center rounded-2xl bg-gold-500 text-ink-950">
            <Icon className="h-7 w-7" aria-hidden="true" />
          </span>
          <h1 className="mt-5 animate-fade-up text-3xl font-extrabold leading-[1.2] [animation-delay:120ms] sm:text-5xl">
            {seo?.h1[locale] ?? name}
          </h1>
          <p className="mt-4 animate-fade-up text-lg font-bold text-gold-400 [animation-delay:200ms] sm:text-xl">
            {service.tagline[locale]}
          </p>
          {intro.map((paragraph) => (
            <p key={paragraph} className="mt-5 max-w-3xl animate-fade-up text-lg leading-relaxed text-white/75 [animation-delay:260ms]">
              {paragraph}
            </p>
          ))}

          <div className="mt-8 flex animate-fade-up flex-col gap-3 [animation-delay:360ms] sm:flex-row">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-base font-bold text-ink-950 transition-colors hover:bg-gold-400"
            >
              {t.quote}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
            <ContactLink
              href={whatsappHref(locale, t.askText(name))}
              method="whatsapp"
              source={`service_page_${slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-white/10"
            >
              <FaWhatsapp size={18} aria-hidden="true" />
              {t.ask}
            </ContactLink>
          </div>
        </div>
      </section>

      {/* ── What you get ── */}
      <section className="bg-sand-50 py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <Reveal variant="start">
            <h2 className="text-3xl font-extrabold text-ink-900 sm:text-4xl">{t.includes}</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">{service.description[locale]}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
              <span className="font-bold text-ink-900">{t.bestFor}: </span>
              {service.bestFor[locale]}
            </p>
          </Reveal>
          <ul className="space-y-4 rounded-3xl border border-sand-200 bg-white p-6 sm:p-8">
            {service.includes[locale].map((item, i) => (
              <li key={item}>
                <Reveal variant="up" delay={i * 110} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-gold-500 text-ink-950">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span className="text-base font-medium text-ink-800">{item}</span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Proof ── */}
      {projects.length > 0 && (
        <section className="bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold-700">{t.work}</p>
            <h2 className="mt-3 text-3xl font-extrabold text-ink-900 sm:text-4xl">{t.workTitle}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}

      {seo && seo.faqs[locale].length > 0 && <Faq locale={locale} items={seo.faqs[locale]} />}

      {/* ── Other services, so every service page links to the rest ── */}
      <section className="bg-sand-50 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">{t.other}</h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {others.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/${locale}/service/${s.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-sand-200 bg-white px-5 py-2.5 text-sm font-bold text-ink-900 transition-colors hover:border-gold-500 hover:text-gold-700"
                >
                  {s.name[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand locale={locale} />
    </main>
  );
}
