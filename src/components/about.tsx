import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { ArrowRight, BadgeCheck } from 'lucide-react';

type About = {
  locale: 'en' | 'ar';
};
// commm
const content = {
  en: {
    eyebrow: 'Why Brandraize',
    title: 'A technology partner that understands the Saudi market',
    body: 'Since inception, Brandraize has worked across software, digital marketing, data analysis, and project management — so strategy, design, engineering and growth sit in one team instead of four vendors.',
    cta: 'More about us',
    points: [
      {
        title: 'Business first',
        text: 'We start with discovery of your goals and customers before any build begins.',
      },
      {
        title: 'Clear delivery',
        text: 'Defined milestones and regular updates, so you always know where your project stands.',
      },
      {
        title: 'Built to last',
        text: 'Security, scalability, and maintainability are the default, not an extra.',
      },
      {
        title: 'One cross-functional team',
        text: 'Design, engineering, and marketing working on the same roadmap.',
      },
    ],
    processEyebrow: 'How We Work',
    processTitle: 'From first call to launch in four clear steps',
    steps: [
      {
        title: 'Free consultation',
        text: 'Tell us about your business and goals. We listen, ask questions, and advise on the right approach.',
      },
      {
        title: 'Scope & quote',
        text: 'You receive a tailored proposal with scope, timeline, and price — before you commit to anything.',
      },
      {
        title: 'Design & build',
        text: 'We design and develop in phases and share progress with you along the way.',
      },
      {
        title: 'Launch & support',
        text: 'We go live together, then stay on for maintenance, improvements, and marketing.',
      },
    ],
  },
  ar: {
    eyebrow: 'لماذا براندرايز',
    title: 'شريك تقني يفهم السوق السعودي',
    body: 'منذ تأسيسها، عملت براندرايز في تطوير البرمجيات والتسويق الرقمي وتحليل البيانات وإدارة المشاريع — لتجد الاستراتيجية والتصميم والهندسة والنمو في فريق واحد بدلاً من أربعة مورّدين.',
    cta: 'المزيد عنّا',
    points: [
      {
        title: 'أعمالك أولاً',
        text: 'نبدأ بفهم أهدافك وعملائك قبل البدء في أي تنفيذ.',
      },
      {
        title: 'تسليم واضح',
        text: 'مراحل محددة وتحديثات منتظمة لتعرف دائماً أين وصل مشروعك.',
      },
      {
        title: 'مبني ليدوم',
        text: 'الأمان وقابلية التوسع وسهولة الصيانة أساس في عملنا وليست إضافة.',
      },
      {
        title: 'فريق واحد متعدد التخصصات',
        text: 'التصميم والهندسة والتسويق يعملون على خارطة طريق واحدة.',
      },
    ],
    processEyebrow: 'كيف نعمل',
    processTitle: 'من أول اتصال إلى الإطلاق في أربع خطوات واضحة',
    steps: [
      {
        title: 'استشارة مجانية',
        text: 'حدّثنا عن أعمالك وأهدافك. نستمع ونسأل ثم نقترح الحل الأنسب.',
      },
      {
        title: 'النطاق وعرض السعر',
        text: 'تستلم عرضاً مخصصاً يوضح النطاق والمدة والتكلفة — قبل أي التزام.',
      },
      {
        title: 'التصميم والتطوير',
        text: 'نصمّم ونطوّر على مراحل ونشاركك التقدّم أولاً بأول.',
      },
      {
        title: 'الإطلاق والدعم',
        text: 'نطلق المشروع معاً ثم نستمر في الصيانة والتحسين والتسويق.',
      },
    ],
  },
};

export default function About({ locale }: About) {
  const t = content[locale];

  return (
    <>
      {/* ── Why us ── */}
      <section className="bg-ink-950 py-14 text-white sm:py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
          <Reveal variant="start">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold-400">{t.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">{t.title}</h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">{t.body}</p>
            <Link
              href={`/${locale}/about`}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              {t.cta}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </Reveal>

          <ul className="grid grid-cols-2 gap-3 sm:gap-5">
            {t.points.map((point, i) => (
              <li key={point.title}>
                <Reveal variant="end" delay={i * 110} className="h-full rounded-2xl border border-white/10 bg-ink-900 p-4 sm:rounded-3xl sm:p-6">
                  <BadgeCheck className="h-7 w-7 text-gold-400" aria-hidden="true" />
                  <h3 className="mt-3 text-base font-bold leading-snug sm:mt-4 sm:text-lg">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65 sm:text-[15px]">{point.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="bg-white py-14 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold-700">{t.processEyebrow}</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-ink-900 sm:text-4xl">
              {t.processTitle}
            </h2>
          </div>

          <ol className="mt-8 grid gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
            {t.steps.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 140} className="border-t-2 border-gold-500 pt-4 sm:pt-6">
                  <span className="text-sm font-extrabold tracking-widest text-gold-700" dir="ltr">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 text-xl font-bold text-ink-900">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{step.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
