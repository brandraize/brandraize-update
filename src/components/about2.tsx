import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

type About = {
  locale: 'en' | 'ar';
};

type AboutProps = {
  locale: 'en' | 'ar';
};

const services = [
  {
    key: 'software',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7" stroke="white" strokeWidth="1.8">
        <rect x="6" y="10" width="36" height="26" rx="3" />
        <path d="M16 20l-5 4 5 4M32 20l5 4-5 4M22 30l4-12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: 'marketing',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7" stroke="white" strokeWidth="1.8">
        <path d="M8 34l8-10 8 6 8-12 8 6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 40h32M8 8v32" strokeLinecap="round" />
        <circle cx="38" cy="14" r="4" fill="white" fillOpacity="0.3" />
      </svg>
    ),
  },
];

const content = {
  en: {
    divider: 'Section Divider',
    missionLabel: 'our mission',
    visionLabel: 'our vision',
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
    divider: 'فاصل القسم',
    missionLabel: 'مهمتنا',
    visionLabel: 'رؤيتنا',
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

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#c9a227]/70 to-transparent" />
      <span className="rounded-full border border-[#c9a227]/30 bg-white px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1a3a6b]">
        {label}
      </span>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#c9a227]/70 to-transparent" />
    </div>
  );
}

export async function About({ locale }: About) {
  const t = await getTranslations({ locale });
  const isRtl = locale === 'ar';

  return (
    <section
      dir={isRtl ? 'rtl' : 'ltr'}
      className="relative bg-[#f7f8fc] overflow-hidden py-16 px-4"
      style={{ fontFamily: isRtl ? "'Noto Kufi Arabic', 'Tajawal', sans-serif" : "'DM Sans', 'Outfit', sans-serif" }}
    >
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#1a3a6b]/5 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#c9a227]/8 translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* ── LEFT: Image collage ── */}
        <div className={`relative flex items-end justify-center min-h-[420px] ${isRtl ? 'lg:order-2' : 'lg:order-1'}`}>

          {/* Main team photo placeholder */}
          <div className="relative w-[440px] h-[380px] rounded-2xl overflow-hidden shadow-2xl border border-white/60 bg-[#dde3ef]">
            <Image src="/about.png" alt={isRtl ? 'فريق براندرايز' : 'Brandraize Team'} fill className="object-cover" />
          </div>

          {/* Clients badge — bottom left */}
          <div
            className={`absolute bottom-0 ${isRtl ? 'right-4' : 'left-4'} bg-[#1a3a6b] text-white rounded-2xl px-5 py-4 shadow-xl min-w-[140px]`}
          >
            <p className="text-3xl font-extrabold tracking-tight leading-none">150+</p>
            <p className="text-xs font-medium mt-1 text-blue-200 whitespace-nowrap">
              {isRtl ? 'عميل حول العالم' : 'Worldwide Clients'}
            </p>
          </div>

          {/* Vision 2030 / city thumbnail — bottom right (overlapping) */}
          <div
            className={`absolute bottom-[-10px] ${isRtl ? 'left-[-10px]' : 'right-[-10px]'} w-[170px] h-[120px] rounded-2xl overflow-hidden shadow-xl border-2 border-white bg-[#0d1f3c]`}
          >

            <Image
              src="/bg_vision.png"
              alt={isRtl ? 'رؤية 2030' : 'Vision 2030'}
              fill className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-20 flex flex-col items-center justify-center h-full text-white">
              <p className="text-[8px] opacity-60 mt-0.5 tracking-wide">
              </p>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Content ── */}
        <div className={`flex flex-col gap-6 ${isRtl ? 'lg:order-1 text-right' : 'lg:order-2 text-left'}`}>

          {/* Eyebrow */}
          <p className="text-[#c9a227] font-semibold text-sm tracking-widest uppercase">
            {isRtl ? 'من نحن' : 'About Us'}
          </p>

          {/* Headline */}
          <h2 className="text-[2rem] sm:text-[2.4rem] font-extrabold text-[#0d1f3c] leading-tight">
            {isRtl
              ? 'براندرايز — الرائد في حلول التقنية بالسعودية.'
              : "Saudi Arabia's Leader In\n Brandraize IT Solutions."}
          </h2>

          {/* Body */}
          <p className="text-[#4a5568] text-[15px] leading-relaxed max-w-xl">
            {isRtl
              ? 'منذ تأسيسها، تميّزت براندرايز في تطوير البرمجيات، التسويق الرقمي، تحليل البيانات، وإدارة المشاريع.'
              : 'Since inception, Brandraize has excelled in software, digital marketing, data analysis, and project management.'}
          </p>

          {/* Services */}
          <div className="flex flex-col gap-5 mt-2">

            {/* Software */}
            <div className={`flex items-start gap-4 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className="flex-shrink-0 w-14 h-14 rounded-full border-2 border-dashed border-[#c9a227] flex items-center justify-center bg-[#1a3a6b]">
                {services[0].icon}
              </div>
              <div>
                <h3 className="text-[#0d1f3c] font-bold text-[15px]">
                  {isRtl ? 'تطوير البرمجيات والتصميم' : 'Software Development And Design'}
                </h3>
                <p className="text-[#718096] text-[13px] mt-0.5 leading-relaxed">
                  {isRtl
                    ? 'تطبيقات الجوال، المواقع الإلكترونية، التجارة الإلكترونية، الاستضافة، والدعم الفني.'
                    : 'Mobile apps, websites, e-commerce, hosting, and support.'}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#e2e8f0]" />

            {/* Marketing */}
            <div className={`flex items-start gap-4 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className="flex-shrink-0 w-14 h-14 rounded-full border-2 border-dashed border-[#c9a227] flex items-center justify-center bg-[#1a3a6b]">
                {services[1].icon}
              </div>
              <div>
                <h3 className="text-[#0d1f3c] font-bold text-[15px]">
                  {isRtl ? 'التسويق الرقمي' : 'Digital Marketing'}
                </h3>
                <p className="text-[#718096] text-[13px] mt-0.5 leading-relaxed">
                  {isRtl
                    ? 'التسويق الرقمي وتصميم الهوية البصرية للعلامة التجارية.'
                    : 'Digital marketing and brand identity design.'}
                </p>
              </div>
            </div>

          </div>

          {/* CTA */}
          <div className={`mt-2 ${isRtl ? 'self-end' : 'self-start'}`}>
            <button className="bg-[#1a3a6b] hover:bg-[#0d2550] text-white font-bold text-sm px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
              {isRtl ? 'اعرف المزيد عنّا' : 'Know More About Us'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function About2({ locale }: AboutProps) {
  const isRtl = locale === 'ar';
  const copy = content[isRtl ? 'ar' : 'en'];

  return (
    <section
      dir={isRtl ? 'rtl' : 'ltr'}
      className="relative overflow-hidden bg-[#f7f8fc] px-4 py-16 sm:px-6 lg:px-8"
      style={{ fontFamily: isRtl ? "'Noto Kufi Arabic', 'Tajawal', sans-serif" : "'DM Sans', 'Outfit', sans-serif" }}
    >
      <div className="absolute left-0 top-0 h-72 w-72 -translate-x-1/3 -translate-y-1/3 rounded-full bg-[#1a3a6b]/6 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 translate-x-1/4 translate-y-1/4 rounded-full bg-[#c9a227]/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10">
        <SectionDivider label={copy.divider} />

        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-[28px] border border-[#1a3a6b]/10 bg-white p-8 shadow-[0_20px_70px_rgba(17,37,70,0.08)]">
            <span className="inline-flex rounded-full bg-[#1a3a6b]/8 px-4 py-1 text-xs font-bold uppercase tracking-[0.28em] text-[#1a3a6b]">
              {copy.missionLabel}
            </span>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-[#0d1f3c] sm:text-[2.2rem]">
              {copy.missionTitle}
            </h2>
            <p className="mt-5 text-[15px] leading-8 text-[#4a5568] sm:text-base">
              {copy.missionText}
            </p>
          </article>

          <article className="rounded-[28px] border border-[#1a3a6b]/10 bg-[#0d1f3c] p-8 text-white shadow-[0_24px_80px_rgba(13,31,60,0.22)]">
            <span className="inline-flex rounded-full bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.28em] text-[#f4d16c]">
              {copy.visionLabel}
            </span>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-[2.2rem]">
              {copy.visionTitle}
            </h2>
            <p className="mt-5 text-[15px] leading-8 text-white/78 sm:text-base">
              {copy.visionText}
            </p>
          </article>
        </div>

        <SectionDivider label={copy.divider} />

        <div className="rounded-[32px] border border-[#1a3a6b]/10 bg-white p-8 shadow-[0_20px_70px_rgba(17,37,70,0.08)] sm:p-10">
          <span className="inline-flex rounded-full bg-[#c9a227]/15 px-4 py-1 text-xs font-bold uppercase tracking-[0.28em] text-[#9d7c10]">
            {copy.whyLabel}
          </span>
          <h2 className="mt-5 max-w-4xl text-3xl font-extrabold leading-tight text-[#0d1f3c] sm:text-[2.4rem]">
            {copy.whyTitle}
          </h2>
          <p className="mt-5 max-w-4xl text-[15px] leading-8 text-[#4a5568] sm:text-base">
            {copy.whyText}
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {copy.cards.map((card) => (
              <article
                key={card.title}
                className="rounded-[26px] border border-[#1a3a6b]/10 bg-[#f8faff] p-6 shadow-[0_12px_35px_rgba(17,37,70,0.06)]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1a3a6b] text-lg font-bold text-white">
                  {card.title.charAt(0)}
                </div>
                <h3 className="text-xl font-extrabold text-[#0d1f3c]">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#5b6679]">
                  {card.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
