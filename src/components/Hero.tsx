import { getTranslations } from 'next-intl/server';

type HeroProps = {
  locale: 'en' | 'ar';
};

export default async function Hero({ locale }: HeroProps) {
  const t = await getTranslations({ locale });

  return (
    <section className="relative w-full min-h-[640px] flex items-center justify-center overflow-hidden font-sans">

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay so text remains readable */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Arc SVG */}
      {/* <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-20">
        <svg
          viewBox="0 0 1200 540"
          className="w-[200%] max-w-[2200px] absolute bottom-[30px]"
          fill="none"
        >
          <defs>
            <linearGradient id="ag" x1="100" y1="0" x2="0" y2="1200">
              <stop offset="0%" stopColor="#ceac24" />
              <stop offset="25%" stopColor="#fad51f" />
              <stop offset="50%" stopColor="#ceac24" />
              <stop offset="75%" stopColor="#387bff" />
              <stop offset="100%" stopColor="#00d7b7" />
            </linearGradient>
          </defs>

          <circle
            cx="600"
            cy="250"
            r="250"
            stroke="url(#ag)"
            strokeWidth="34"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div> */}

      {/* Content */}
      <div className="relative z-30 text-center max-w-[580px] px-6">
        <h1 className="text-[42px] font-extrabold text-white leading-tight mb-4">
          {t('heroTitle')}
        </h1>

        <p className="text-[15px] text-gray-200 leading-relaxed font-semibold mb-8">
          {t('heroSubtitle')}
        </p>

        {/* <button className="bg-gradient-to-r from-[#4e2a7e] to-[#ceac24] text-white px-10 py-4 rounded-full font-extrabold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
          {t('ctaConsultation')}
        </button> */}
      </div>
    </section>
  );
}