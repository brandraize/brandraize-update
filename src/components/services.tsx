import Image from "next/image";

type Locale = "en" | "ar";

type Feature = {
  title: string;
  description: string;
  image: string;
};

const content: Record<
  Locale,
  { eyebrow: string; title: string; description: string; features: Feature[] }
> = {
  en: {
    eyebrow: "Who We Are",
    title: "Our Expertise",
    description:
      "Brandraize is a creative digital agency delivering innovative IT solutions, marketing strategies, and scalable digital products that help businesses succeed in Saudi Arabia's competitive market.",
    features: [
      {
        title: "Web & App Development",
        description:
          "Building scalable, high-performance websites and applications trusted by businesses across Saudi Arabia to deliver powerful digital experiences.",
        image: "/services/digital.png",
      },
      {
        title: "Mobile App Development",
        description:
          "Intuitive iOS and Android apps tailored for Saudi Arabia — designed to engage, retain, and delight your users on every device.",
        image: "/services/Web_development_app.jpg",
      },
      {
        title: "Digital Marketing Solutions",
        description:
          "Data-driven SEO, social media, and performance marketing strategies to grow your brand across Saudi Arabia and the GCC.",
        image: "/services/digital_marketing_solutions.jpg",
      },
      {
        title: "Branding & Graphic Design",
        description:
          "Distinctive brand identities and visual designs that resonate with your audience and set your business apart in the Saudi market.",
        image: "/services/branding_design.jpg",
      },
      {
        title: "IT Solutions & Consulting",
        description:
          "End-to-end IT consulting and infrastructure solutions aligned with Saudi Vision 2030 — empowering your business with the right technology.",
        image: "/services/IT_solutions_consulting.jpg",
      },
      {
        title: "Video Production & Animation",
        description:
          "Professional video production and animated content that tells your brand story and captivates your audience across every platform.",
        image: "/services/video_production_animation.png",
      },
    ],
  },
  ar: {
    eyebrow: "من نحن",
    title: "شريكك في النمو الرقمي بالمملكة العربية السعودية",
    description:
      "براندرايز وكالة رقمية إبداعية تقدم حلول تقنية وتسويقية متكاملة تساعد الشركات على النجاح والنمو في السوق السعودي التنافسي.",
    features: [
      {
        title: "تطوير المواقع والتطبيقات",
        description:
          "بناء مواقع ويب قابلة للتطوير وتطبيقات عالية الأداء موثوقة من قبل الشركات في المملكة لتقديم تجارب رقمية متميزة.",
        image: "/services/digital.png",
      },
      {
        title: "تطوير تطبيقات الجوال",
        description:
          "تطبيقات iOS وAndroid مصممة خصيصاً للسوق السعودي — تجذب المستخدمين وتحافظ على ولائهم على كل جهاز.",
        image: "/services/Web_development_app.jpg",
      },
      {
        title: "حلول التسويق الرقمي",
        description:
          "استراتيجيات تسويق مبنية على البيانات وتحسين محركات البحث ووسائل التواصل الاجتماعي لتنمية علامتك في السعودية والخليج.",
        image: "/services/digital_marketing_solutions.jpg",
      },
      {
        title: "التصميم والهوية البصرية",
        description:
          "هويات تجارية مميزة وتصاميم بصرية احترافية تعكس شخصية علامتك وتميزك في السوق السعودي.",
        image: "/services/branding_design.jpg",
      },
      {
        title: "حلول تقنية المعلومات",
        description:
          "استشارات تقنية المعلومات وحلول البنية التحتية المتكاملة المتوافقة مع رؤية 2030 لتمكين أعمالك بالتكنولوجيا المناسبة.",
        image: "/services/IT_solutions_consulting.jpg",
      },
      {
        title: "إنتاج الفيديو والأنيميشن",
        description:
          "إنتاج فيديو احترافي ومحتوى متحرك يروي قصة علامتك التجارية ويأسر جمهورك عبر جميع المنصات.",
        image: "/services/video_production_animation.png",
      },
    ],
  },
};

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="group p-4 rounded-[28px] h-full">
      <div
        className="relative z-10 w-full rounded-[26px] bg-white/[0.08] backdrop-blur-xl p-8 h-full overflow-hidden border border-white/20"
        style={{
          boxShadow:
            "0 8px 32px 0 rgba(100,200,255,0.15), inset 0 1px 0 0 rgba(255,255,255,0.3), inset 0 -1px 0 0 rgba(255,255,255,0.1), 0 20px 60px -15px rgba(0,0,0,0.2)",
        }}
      >
        {/* Shimmer sweep */}
        <div
          className="absolute inset-0 rounded-[26px]"
          style={{
            background:
              "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
            animation: "shimmer 3s infinite",
            transform: "translateX(-100%)",
          }}
        />
        {/* Top highlight */}
        <div className="absolute top-0 left-0 right-0 h-2/5 rounded-t-[26px] bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none" />
        {/* Colour washes */}
        <div className="absolute inset-0 rounded-[26px] bg-gradient-to-br from-cyan-200/10 via-transparent to-blue-300/10 pointer-events-none" />
        <div className="absolute inset-0 rounded-[26px] bg-gradient-to-tl from-purple-300/[0.08] via-transparent to-pink-300/[0.08] pointer-events-none" />
        {/* Corner glow */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-white/[0.15] rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Image
                src={feature.image}
                alt={feature.title}
                width={200}
                height={192}
                className="w-auto h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                style={{
                  filter:
                    "drop-shadow(0 10px 40px rgba(100,200,255,0.4)) drop-shadow(0 0 20px rgba(255,255,255,0.3))",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 via-blue-400/30 to-purple-400/30 blur-3xl -z-10 group-hover:blur-2xl transition-all duration-500" />
            </div>
          </div>
          <h3
            className="md:text-3xl text-xl font-bold text-white mb-3 tracking-tight"
            style={{
              textShadow:
                "0 2px 20px rgba(255,255,255,0.4), 0 0 40px rgba(100,200,255,0.3)",
            }}
          >
            {feature.title}
          </h3>
          <p
            className="text-base text-white/95 leading-relaxed"
            style={{
              textShadow:
                "0 1px 10px rgba(255,255,255,0.3), 0 0 20px rgba(100,200,255,0.2)",
            }}
          >
            {feature.description}
          </p>
        </div>

        {/* Bottom fade + corner accents */}
        <div className="absolute bottom-0 left-0 right-0 h-[30%] rounded-b-[26px] bg-gradient-to-t from-white/[0.12] via-white/[0.04] to-transparent pointer-events-none" />
        <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-xl pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-20 h-20 bg-gradient-to-tr from-cyan-300/[0.15] to-transparent rounded-full blur-2xl pointer-events-none" />
      </div>
    </div>
  );
}

export default function Services({ locale }: { locale: Locale }) {
  const t = content[locale];
  const isRTL = locale === "ar";
  const row1 = t.features.slice(0, 2);
  const row2 = t.features.slice(2, 4);
  const row3 = t.features.slice(4, 6);

  return (
    <section
      className="relative overflow-hidden rounded-3xl py-10 mx-4 lg:mx-8 my-8"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Dark gradient background */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#0a0e28] via-[#050a1f] to-black" />

      {/* Section header */}
      <div className="relative z-10 text-center mb-20 px-4 mt-8">
       
        <h2 className="lg:text-5xl md:text-4xl text-3xl text-white font-semibold mb-4 max-w-3xl mx-auto leading-tight">
          {t.title}
        </h2>
        <p className="text-white/75 max-w-xl mx-auto text-base leading-relaxed px-4">
          {t.description}
        </p>
      </div>

      {/* Desktop grid (lg+) */}
      <div className="relative hidden lg:block max-w-6xl mx-auto px-4 z-10">
        {/* SVG connector lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <g>
            <path d="M 20 20 Q 25 10 48 45" stroke="#d1d5db" strokeWidth="0.08" fill="none" />
            <path d="M 20 20 Q 25 10 48 45" stroke="#3b82f6" strokeWidth="0.08" fill="none" strokeDasharray="100" strokeDashoffset="78" />
          </g>
          <g>
            <path d="M 80 20 Q 75 10 54 45" stroke="#d1d5db" strokeWidth="0.08" fill="none" />
            <path d="M 80 20 Q 75 10 54 45" stroke="#3b82f6" strokeWidth="0.08" fill="none" strokeDasharray="100" strokeDashoffset="16" />
          </g>
          <g>
            <path d="M 20 50 Q 35 50 43 50" stroke="#d1d5db" strokeWidth="0.08" fill="none" />
            <path d="M 20 50 Q 35 50 43 50" stroke="#3b82f6" strokeWidth="0.08" fill="none" strokeDasharray="100" strokeDashoffset="3" />
          </g>
          <g>
            <path d="M 80 50 Q 65 50 57 50" stroke="#d1d5db" strokeWidth="0.08" fill="none" />
            <path d="M 80 50 Q 65 50 57 50" stroke="#3b82f6" strokeWidth="0.08" fill="none" strokeDasharray="100" strokeDashoffset="54" />
          </g>
          <g>
            <path d="M 20 80 Q 25 90 48 56" stroke="#d1d5db" strokeWidth="0.08" fill="none" />
            <path d="M 20 80 Q 25 90 48 56" stroke="#3b82f6" strokeWidth="0.08" fill="none" strokeDasharray="100" strokeDashoffset="99" />
          </g>
          <g>
            <path d="M 80 80 Q 75 90 53 56" stroke="#d1d5db" strokeWidth="0.08" fill="none" />
            <path d="M 80 80 Q 75 90 53 56" stroke="#3b82f6" strokeWidth="0.08" fill="none" strokeDasharray="100" strokeDashoffset="78" />
          </g>
        </svg>

        {/* Centre logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <Image
            src="/B_logo.png"
            alt="Brandraize logo"
            width={176}
            height={176}
            className="w-44 h-44 object-cover p-2 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
          />
        </div>

        {/* Row 1 — 2 cards */}
        <div className="grid grid-cols-2 gap-10 mb-24">
          {row1.map((f, i) => (
            <FeatureCard key={i} feature={f} />
          ))}
        </div>

        {/* Row 2 — card | empty centre (logo) | card */}
        <div className="grid grid-cols-3 gap-10 mb-24 items-center">
          <FeatureCard feature={row2[0]} />
          <div />
          <FeatureCard feature={row2[1]} />
        </div>

        {/* Row 3 — 2 cards */}
        <div className="grid grid-cols-2 gap-10">
          {row3.map((f, i) => (
            <FeatureCard key={i} feature={f} />
          ))}
        </div>
      </div>

      {/* Mobile / tablet layout */}
      <div className="lg:hidden max-w-md mx-auto px-4 relative z-10">
        <div className="flex flex-col gap-6">
          {t.features.map((f, i) => (
            <FeatureCard key={i} feature={f} />
          ))}
        </div>
      </div>
    </section>
  );
}