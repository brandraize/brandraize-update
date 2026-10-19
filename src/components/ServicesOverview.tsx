import Link from 'next/link';
import { ArrowDown, ArrowRight, BadgeCheck, Check } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import ContactLink from '@/components/ContactLink';
import CtaBand from '@/components/CtaBand';
import Faq from '@/components/Faq';
import Reveal from '@/components/Reveal';
import ServiceNav from '@/components/ServiceNav';
import TechSlider from '@/components/TechSlider';
import { getServiceGroups } from '@/lib/cms';
import { serviceFaqs, type Service } from '@/lib/services';
import { whatsappHref, type Locale } from '@/lib/site';

const content = {
  en: {
    eyebrow: 'Our Services',
    title: 'Everything your business needs to launch and grow online',
    description:
      'Pick what you need today — a website, an app, a system, or more customers — and add the rest when you are ready. One team handles all of it.',
    primary: 'Get a free consultation',
    secondary: 'See all services',
    groupCount: (n: number) => `${n} services`,
    navLabel: 'Services',
    bestFor: 'Best for',
    includes: 'What you get',
    quote: 'Get a quote',
    ask: 'Ask on WhatsApp',
    askText: (name: string) => `Hello Brandraize, I would like to know more about: ${name}`,
    whyEyebrow: 'Why Brandraize',
    whyTitle: 'What you can expect on every project',
    whyPoints: [
      'Business-first discovery before any build begins',
      'Clear milestones and delivery visibility',
      'Security, scalability, and maintainability by default',
      'Design, engineering, and growth in one team',
    ],
  },
  ar: {
    eyebrow: 'خدماتنا',
    title: 'كل ما تحتاجه أعمالك للانطلاق والنمو على الإنترنت',
    description:
      'اختر ما تحتاجه اليوم — موقعاً أو تطبيقاً أو نظاماً أو عملاء أكثر — وأضف الباقي عندما تكون جاهزاً. فريق واحد يتولى كل ذلك.',
    primary: 'احصل على استشارة مجانية',
    secondary: 'تصفّح جميع الخدمات',
    groupCount: (n: number) => `${n} خدمات`,
    navLabel: 'الخدمات',
    bestFor: 'مناسب لـ',
    includes: 'ماذا تحصل عليه',
    quote: 'اطلب عرض سعر',
    ask: 'اسأل عبر واتساب',
    askText: (name: string) => `مرحباً براندرايز، أرغب في معرفة المزيد عن: ${name}`,
    whyEyebrow: 'لماذا براندرايز',
    whyTitle: 'ما الذي تتوقعه في كل مشروع',
    whyPoints: [
      'فهم لأعمالك وأهدافك قبل بدء التنفيذ',
      'مراحل واضحة وشفافية في التسليم',
      'الأمان وقابلية التوسع وسهولة الصيانة كأساس',
      'التصميم والهندسة والنمو في فريق واحد',
    ],
  },
};

function ServiceCard({ service, locale, flip }: { service: Service; locale: Locale; flip: boolean }) {
  const t = content[locale];
  const Icon = service.icon;
  const name = service.name[locale];

  return (
    <Reveal variant={flip ? 'end' : 'start'}>
      <article
        id={service.slug}
        className="service-card group grid gap-5 rounded-3xl border border-sand-200 bg-white p-5 transition-shadow sm:gap-8 duration-300 hover:shadow-[0_24px_60px_rgba(11,18,32,0.10)] sm:p-9 lg:grid-cols-2 lg:gap-12"
      >
        {/* What it is */}
        <div className={flip ? 'lg:order-2' : ''}>
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-900 text-gold-400 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 sm:h-14 sm:w-14">
            <Icon className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
          </span>
          <h3 className="mt-4 text-xl font-extrabold text-ink-900 sm:mt-5 sm:text-[1.7rem]">
            <Link href={`/${locale}/service/${service.slug}`} className="transition-colors hover:text-gold-700">
              {name}
            </Link>
          </h3>
          <p className="mt-1.5 text-base font-bold leading-snug text-gold-700 sm:mt-2 sm:text-lg">{service.tagline[locale]}</p>
          <p className="mt-4 hidden text-base leading-relaxed text-slate-600 sm:block">{service.description[locale]}</p>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-600 sm:mt-4">
            <span className="font-bold text-ink-900">{t.bestFor}: </span>
            {service.bestFor[locale]}
          </p>

          <div className="mt-5 flex flex-wrap gap-2 sm:mt-7 sm:gap-3">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gold-500 px-4 py-3 sm:flex-none sm:px-6 text-sm font-bold text-ink-950 transition-colors hover:bg-gold-400"
            >
              {t.quote}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
            <ContactLink
              href={whatsappHref(locale, t.askText(name))}
              method="whatsapp"
              source={`service_${service.slug}`}
              className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-sand-200 px-4 py-3 text-sm font-bold text-ink-900 sm:flex-none sm:px-6 transition-colors hover:border-[#25d366] hover:text-[#128c4b]"
            >
              <FaWhatsapp size={18} aria-hidden="true" />
              {t.ask}
            </ContactLink>
          </div>
        </div>

        {/* What you get */}
        <div className="rounded-2xl bg-sand-50 p-5 sm:p-7">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">{t.includes}</p>
          <ul className="mt-4 space-y-3 sm:mt-5 sm:space-y-4">
            {service.includes[locale].map((item, i) => (
              <li key={item}>
                <Reveal variant="up" delay={150 + i * 110} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-gold-500 text-ink-950">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span className="text-[15px] font-medium text-ink-800 sm:text-base">{item}</span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  );
}

export default async function ServicesOverview({ locale }: { locale: Locale }) {
  const t = content[locale];
  const serviceGroups = await getServiceGroups();
  const allServices = serviceGroups.flatMap((group) => group.services);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden bg-ink-950 text-white">
        <div className="absolute inset-0 -z-10">
          <div className="bg-dots absolute inset-0" />
          <div className="absolute -top-24 end-[-6rem] h-[28rem] w-[28rem] animate-glow rounded-full bg-[#3870e0]/30 blur-3xl" />
          <div className="absolute bottom-[-10rem] start-[-8rem] h-[24rem] w-[24rem] animate-glow rounded-full bg-ink-700/70 blur-3xl [animation-delay:-3s]" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-36 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8 lg:pb-24 lg:pt-44">
          <div>
            <p className="animate-fade-up text-sm font-bold uppercase tracking-[0.18em] text-gold-400">
              {t.eyebrow}
            </p>
            <h1 className="mt-4 animate-fade-up text-4xl font-extrabold leading-[1.15] [animation-delay:120ms] sm:text-5xl">
              {t.title}
            </h1>
            <p className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-white/75 [animation-delay:240ms]">
              {t.description}
            </p>
            <div className="mt-8 flex animate-fade-up flex-col gap-3 [animation-delay:360ms] sm:flex-row">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center rounded-full bg-gold-500 px-7 py-3.5 text-base font-bold text-ink-950 transition-colors hover:bg-gold-400"
              >
                {t.primary}
              </Link>
              <a
                href="#all-services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-white/10"
              >
                {t.secondary}
                <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* The three things we do, as a map of the page */}
          <ol className="space-y-3 sm:space-y-4">
            {serviceGroups.map((group, i) => (
              <li
                key={group.id}
                className="animate-fade-up"
                style={{ animationDelay: `${420 + i * 140}ms` }}
              >
                <a
                  href={`#${group.id}`}
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-ink-900/80 p-4 transition-all sm:gap-5 sm:rounded-3xl sm:p-5 duration-300 hover:-translate-y-1 hover:border-gold-500/60"
                >
                  <span
                    className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-gold-500 text-xl font-extrabold text-ink-950"
                    dir="ltr"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1">
                    <span className="block text-xl font-extrabold">{group.title[locale]}</span>
                    <span className="mt-0.5 block text-[15px] text-white/65">{group.summary[locale]}</span>
                  </span>
                  <ArrowRight className="h-5 w-5 flex-none text-gold-400 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Jump to a service ── */}
      <ServiceNav
        label={t.navLabel}
        items={allServices.map((s) => ({ slug: s.slug, name: s.name[locale] }))}
      />

      {/* ── Services, grouped ── */}
      <div id="all-services" className="bg-sand-50">
        {serviceGroups.map((group, groupIndex) => (
          <section
            key={group.id}
            id={group.id}
            className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
          >
            <Reveal variant="up" className="flex items-center gap-4 border-b border-sand-200 pb-5 sm:items-end sm:gap-5 sm:pb-6">
              <span className="text-5xl font-extrabold leading-none text-gold-500 sm:text-7xl" dir="ltr">
                {String(groupIndex + 1).padStart(2, '0')}
              </span>
              <div>
                <h2 className="text-3xl font-extrabold text-ink-900 sm:text-4xl">{group.title[locale]}</h2>
                <p className="mt-1 text-lg text-slate-600">
                  {group.summary[locale]}{' '}
                  <span className="whitespace-nowrap text-sm font-bold text-gold-700">
                    · {t.groupCount(group.services.length)}
                  </span>
                </p>
              </div>
            </Reveal>

            <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-6">
              {group.services.map((service, i) => (
                <ServiceCard key={service.slug} service={service} locale={locale} flip={i % 2 === 1} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* ── Why us ── */}
      <section className="bg-ink-950 py-14 text-white sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal variant="up" className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold-400">{t.whyEyebrow}</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">{t.whyTitle}</h2>
          </Reveal>

          <ul className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-5 lg:grid-cols-4">
            {t.whyPoints.map((point, i) => (
              <li key={point}>
                <Reveal
                  variant="zoom"
                  delay={i * 120}
                  className="h-full rounded-2xl border border-white/10 bg-ink-900 p-4 sm:rounded-3xl sm:p-6"
                >
                  <BadgeCheck className="h-7 w-7 text-gold-400" aria-hidden="true" />
                  <p className="mt-3 text-[15px] font-bold leading-snug sm:mt-4 sm:text-lg">{point}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <TechSlider locale={locale} />
      <Faq locale={locale} items={serviceFaqs[locale]} />
      <CtaBand locale={locale} />
    </main>
  );
}
