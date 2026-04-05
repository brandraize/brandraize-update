import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

type About = {
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

export default async function About({ locale }: About) {
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
