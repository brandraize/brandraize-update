import { Globe2, ShieldCheck, Sparkles } from 'lucide-react';

type AboutProps = {
  locale: 'en' | 'ar';
};

const cardIcons = [Sparkles, ShieldCheck, Globe2];

const content = {
  en: {
    missionTitle: 'Our Mission',
    missionText:
      'To empower businesses across Saudi Arabia with transformative technology solutions — from custom software development and mobile apps to ERP systems and AI automation — that solve complex challenges and fuel sustainable growth. We are dedicated to delivering high-quality software and intelligent systems that exceed expectations, create lasting value, and enable our clients to lead in an ever-evolving digital world.',
    visionTitle: 'Our Vision',
    visionText:
      'To be the premier software development company and technology partner for businesses navigating digital transformation in Saudi Arabia and the region. Renowned for our technical expertise, innovative solutions — including SaaS platforms, enterprise software, and AI development — and outstanding client service. We aim to redefine digital experiences and shape the future of technology across industries in KSA.',
    whyTitle: 'Why Choose BRANDRAIZE — Software Development Company in Saudi Arabia',
    whyText:
      'With specialized expertise in custom software, mobile app development, ERP systems, and IT infrastructure, our team delivers integrated technology services that empower businesses across Saudi Arabia. We combine experience, innovation, and trust to help our clients succeed — from startups to enterprise software companies in KSA.',
    whyLabel: 'why us',
    cards: [
      {
        title: 'Specialized Software Expertise',
        text: 'A team of certified professionals with extensive experience in custom software development, mobile apps, SaaS platforms, and ERP systems — delivering measurable results for businesses in Riyadh and across Saudi Arabia.',
      },
      {
        title: 'Reliable Security',
        text: 'Advanced security solutions and IT infrastructure support to protect your business — aligned with Saudi data protection regulations for peace of mind.',
      },
      {
        title: 'Wide Coverage Across KSA',
        text: 'Integrated software and IT services across multiple industries and regions in Saudi Arabia — from Riyadh to across the Kingdom, serving enterprises, SMEs, and government organizations.',
      },
    ],
  },
  ar: {
    missionTitle: 'مهمتنا',
    missionText:
      'تمكين الشركات في جميع أنحاء المملكة العربية السعودية عبر حلول تقنية تحويلية، من تطوير البرمجيات المخصصة وتطبيقات الجوال إلى أنظمة ERP وأتمتة الذكاء الاصطناعي، لحل التحديات المعقدة ودعم النمو المستدام. نلتزم بتقديم برمجيات وأنظمة ذكية عالية الجودة تتجاوز التوقعات، وتخلق قيمة طويلة المدى، وتمكن عملاءنا من الريادة في عالم رقمي دائم التطور.',
    visionTitle: 'رؤيتنا',
    visionText:
      'أن نكون شركة تطوير البرمجيات والشريك التقني الأول للأعمال التي تقود التحول الرقمي في المملكة والمنطقة. نطمح إلى التميز بخبرتنا التقنية، وحلولنا المبتكرة مثل منصات SaaS والأنظمة المؤسسية وتطوير الذكاء الاصطناعي، إلى جانب خدمة عملاء استثنائية تعيد تعريف التجارب الرقمية وتشكل مستقبل التقنية في مختلف القطاعات داخل المملكة.',
    whyTitle: 'لماذا تختار BRANDRAIZE كشركة تطوير برمجيات في السعودية',
    whyText:
      'بخبرة متخصصة في البرمجيات المخصصة، وتطوير تطبيقات الجوال، وأنظمة ERP، والبنية التحتية لتقنية المعلومات، يقدم فريقنا خدمات تقنية متكاملة تمكّن الأعمال في مختلف أنحاء السعودية. نحن نجمع بين الخبرة والابتكار والثقة لمساعدة عملائنا على النجاح، من الشركات الناشئة إلى المؤسسات الكبرى داخل المملكة.',
    whyLabel: 'لماذا نحن',
    cards: [
      {
        title: 'خبرة متخصصة في البرمجيات',
        text: 'فريق من المحترفين المعتمدين يمتلك خبرة واسعة في تطوير البرمجيات المخصصة، وتطبيقات الجوال، ومنصات SaaS، وأنظمة ERP مع نتائج ملموسة للشركات في الرياض وجميع أنحاء السعودية.',
      },
      {
        title: 'أمان موثوق',
        text: 'حلول أمنية متقدمة ودعم للبنية التحتية التقنية لحماية أعمالك بما يتوافق مع متطلبات حماية البيانات في السعودية، لتمنحك راحة وموثوقية أكبر.',
      },
      {
        title: 'تغطية واسعة داخل المملكة',
        text: 'خدمات برمجية وتقنية متكاملة لقطاعات ومناطق متعددة في السعودية، من الرياض إلى مختلف أنحاء المملكة، لخدمة الشركات الكبرى والمتوسطة والجهات الحكومية.',
      },
    ],
  },
} as const;

export default function About2({ locale }: AboutProps) {
  const isRtl = locale === 'ar';
  const copy = content[isRtl ? 'ar' : 'en'];

  return (
    <section className="bg-sand-50 px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-sand-200 bg-white p-8 sm:p-10">
            <h2 className="text-3xl font-extrabold leading-tight text-ink-900">
              {copy.missionTitle}
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              {copy.missionText}
            </p>
          </article>

          <article className="rounded-3xl bg-ink-950 p-8 text-white sm:p-10">
            <h2 className="text-3xl font-extrabold leading-tight text-gold-400">
              {copy.visionTitle}
            </h2>
            <p className="mt-5 text-base leading-8 text-white/75">
              {copy.visionText}
            </p>
          </article>
        </div>

        <div className="rounded-3xl border border-sand-200 bg-white p-8 sm:p-10">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-gold-700">
            {copy.whyLabel}
          </span>
          <h2 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight text-ink-900 sm:text-4xl">
            {copy.whyTitle}
          </h2>
          <p className="mt-5 max-w-4xl text-base leading-8 text-slate-600">
            {copy.whyText}
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {copy.cards.map((card, i) => {
              const Icon = cardIcons[i];

              return (
                <article key={card.title} className="rounded-2xl bg-sand-50 p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-900 text-gold-400">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-extrabold text-ink-900">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {card.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
