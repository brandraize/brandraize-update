import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  Blocks,
  Bot,
  Building2,
  ChartNoAxesCombined,
  Code2,
  Globe,
  LayoutDashboard,
  MonitorSmartphone,
  Palette,
  PlaySquare,
  Rocket,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Workflow,
  Wrench,
} from "lucide-react";

type Locale = "en" | "ar";

type ServiceItem = {
  slug: string;
  name: string;
  kicker: string;
  description: string;
  icon: LucideIcon;
};

type Highlight = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type Copy = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  heroStats: Array<{ value: string; label: string }>;
  heroPanelTitle: string;
  heroPanelDescription: string;
  heroPanelPoints: string[];
  sectionIntro: string;
  sectionTitle: string;
  sectionDescription: string;
  services: ServiceItem[];
  spotlightEyebrow: string;
  spotlightTitle: string;
  spotlightDescription: string;
  spotlightBullets: string[];
  highlights: Highlight[];
  whyTitle: string;
  whyDescription: string;
  whyPoints: string[];
  techTitle: string;
  techDescription: string;
  technologies: string[];
  faqTitle: string;
  faqDescription: string;
  faqs: Array<{ question: string; answer: string }>;
};

const content: Record<Locale, Copy> = {
  en: {
    eyebrow: "Next Future Services",
    title: "Comprehensive Digital Transformation With Next Future",
    description:
      "Innovative solutions for development, design, marketing, and real estate and contracting management systems. We build connected digital ecosystems that help ambitious businesses scale with confidence.",
    primaryCta: "Discover Services",
    secondaryCta: "Contact Us",
    heroStats: [
      { value: "10+", label: "Core service lines" },
      { value: "End-to-end", label: "Delivery model" },
      { value: "Vision 2030", label: "Saudi-aligned solutions" },
    ],
    heroPanelTitle: "Premium Services",
    heroPanelDescription:
      "Development services focused on business outcomes, operational clarity, and long-term product growth.",
    heroPanelPoints: [
      "Web platforms, mobile apps, ERP, and business systems",
      "User-centered design with measurable conversion goals",
      "Marketing, automation, and infrastructure in one roadmap",
    ],
    sectionIntro: "Our Services",
    sectionTitle: "More Than Just Service",
    sectionDescription:
      "We take pride in offering a wide range of technology services designed around the real operational needs of growing businesses.",
    services: [
      {
        slug: "web-development",
        name: "Web Design & Development",
        kicker: "Web",
        description:
          "Build scalable and responsive websites tailored to your business needs.",
        icon: Globe,
      },
      {
        slug: "mobile-apps",
        name: "Mobile App Development",
        kicker: "Mobile",
        description:
          "Create intuitive and engaging mobile applications for iOS and Android platforms.",
        icon: Smartphone,
      },
      {
        slug: "it-solutions",
        name: "IT Solutions",
        kicker: "IT",
        description:
          "Implement robust IT infrastructure and solutions for seamless business operations.",
        icon: Wrench,
      },
      {
        slug: "erp-solutions",
        name: "ERP Solutions",
        kicker: "ERP",
        description:
          "Comprehensive enterprise resource planning systems to streamline your business operations.",
        icon: Workflow,
      },
      {
        slug: "digital-marketing",
        name: "Digital Marketing",
        kicker: "Marketing",
        description:
          "Boost your online presence with SEO, social media, PPC, and content strategies.",
        icon: ChartNoAxesCombined,
      },
      {
        slug: "ui-ux-design",
        name: "UI/UX Design",
        kicker: "Design",
        description:
          "Modern UI/UX design for intuitive and seamless digital experiences.",
        icon: Palette,
      },
      {
        slug: "motion-graphic",
        name: "Motion Graphic",
        kicker: "Motion",
        description:
          "Professional motion graphic videos that enhance your marketing messages.",
        icon: PlaySquare,
      },
      {
        slug: "construction-management-system",
        name: "Construction Management System",
        kicker: "Construction",
        description:
          "Integrated systems to manage construction projects efficiently.",
        icon: Building2,
      },
      {
        slug: "property-management-system",
        name: "Property Management System",
        kicker: "Property",
        description:
          "Smart solutions for managing real estate portfolios and property operations.",
        icon: LayoutDashboard,
      },
      {
        slug: "e-commerce-solutions",
        name: "E-Commerce Solutions",
        kicker: "E-Commerce",
        description:
          "Build powerful online stores with secure payments and inventory management.",
        icon: ShoppingCart,
      },
      {
        slug: "other-tech-services",
        name: "Other Tech Services",
        kicker: "Other Tech",
        description:
          "Scalable cloud infrastructure, integrations, and migration services for modern businesses.",
        icon: Blocks,
      },
    ],
    spotlightEyebrow: "Development Services",
    spotlightTitle: "Complete Development Solutions",
    spotlightDescription:
      "We provide end-to-end digital solutions including web, mobile, and marketing services to help your business grow. Our comprehensive approach ensures that every part of your digital presence is designed to perform.",
    spotlightBullets: [
      "End-to-end development lifecycle",
      "Scalable and future-proof architecture",
      "Enterprise-grade security standards",
      "Continuous support and maintenance",
    ],
    highlights: [
      {
        title: "Modern Web Development",
        description: "Cutting-edge websites with exceptional performance and conversion-focused journeys.",
        icon: Code2,
      },
      {
        title: "Mobile App Solutions",
        description: "Native and cross-platform mobile experiences built for growth and retention.",
        icon: MonitorSmartphone,
      },
      {
        title: "Digital Marketing Growth",
        description: "Data-driven campaigns that connect traffic, leads, and measurable revenue outcomes.",
        icon: Rocket,
      },
      {
        title: "UI/UX Design Excellence",
        description: "User-centered design systems that improve usability, trust, and conversion.",
        icon: Bot,
      },
    ],
    whyTitle: "Why Choose Our Development Services?",
    whyDescription:
      "We combine cutting-edge technology with delivery discipline and industry best practices to create solutions that drive real business results.",
    whyPoints: [
      "Business-first discovery before any build begins",
      "Clear milestones, governance, and delivery visibility",
      "Security, scalability, and maintainability by default",
      "Cross-functional teams covering design, engineering, and growth",
    ],
    techTitle: "Technologies We Use",
    techDescription:
      "We select practical, modern technologies that match your product goals, team workflows, and long-term scale requirements.",
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "Python",
      "React Native",
      "Flutter",
      "AWS",
      "MongoDB",
      "Tailwind CSS",
      "TypeScript",
    ],
    faqTitle: "Frequently Asked Questions",
    faqDescription: "Find answers to common questions about our services.",
    faqs: [
      {
        question: "Do you develop cross-platform iOS and Android apps?",
        answer:
          "Yes. We build both native and cross-platform applications based on your product goals, budget, and performance requirements.",
      },
      {
        question: "How long does it take to develop a website?",
        answer:
          "Timelines depend on scope, integrations, and approval cycles, but most business websites are delivered in phased milestones with a clear roadmap from discovery to launch.",
      },
      {
        question: "Do you provide post-launch support?",
        answer:
          "Yes. We offer maintenance, optimization, enhancements, and operational support after launch to keep your platform reliable and secure.",
      },
      {
        question: "Can you help with SEO and marketing?",
        answer:
          "Yes. Our team supports SEO, paid campaigns, content planning, analytics, and broader digital marketing strategy aligned with business KPIs.",
      },
      {
        question: "What technologies do you specialize in?",
        answer:
          "We work across modern web, mobile, cloud, and automation stacks including React, Next.js, Node.js, Python, React Native, Flutter, AWS, MongoDB, and TypeScript.",
      },
      {
        question: "Do you offer custom pricing?",
        answer:
          "Yes. We scope each engagement based on business goals, complexity, integrations, and support requirements, then prepare a tailored commercial proposal.",
      },
    ],
  },
  ar: {
    eyebrow: "خدمات نكست فيوتشر",
    title: "تحول رقمي متكامل مع نكست فيوتشر",
    description:
      "حلول مبتكرة للتطوير والتصميم والتسويق وأنظمة إدارة العقارات والمقاولات. نبني منظومات رقمية مترابطة تساعد الشركات الطموحة على النمو بثقة.",
    primaryCta: "اكتشف الخدمات",
    secondaryCta: "اتصل بنا",
    heroStats: [
      { value: "+10", label: "مسارات خدمية أساسية" },
      { value: "شامل", label: "نموذج تنفيذ متكامل" },
      { value: "رؤية 2030", label: "حلول متوافقة مع السوق السعودي" },
    ],
    heroPanelTitle: "خدمات متميزة",
    heroPanelDescription:
      "خدمات تطوير تركز على نتائج الأعمال ووضوح العمليات ونمو المنتجات على المدى الطويل.",
    heroPanelPoints: [
      "منصات ويب وتطبيقات جوال وERP وأنظمة أعمال متكاملة",
      "تصميم متمحور حول المستخدم مع أهداف تحويل قابلة للقياس",
      "التسويق والأتمتة والبنية التحتية ضمن خارطة طريق واحدة",
    ],
    sectionIntro: "خدماتنا",
    sectionTitle: "أكثر من مجرد خدمة",
    sectionDescription:
      "نفتخر بتقديم مجموعة واسعة من الخدمات التقنية المصممة حول الاحتياجات التشغيلية الحقيقية للشركات النامية.",
    services: [
      {
        slug: "web-development",
        name: "تصميم وتطوير المواقع",
        kicker: "ويب",
        description: "بناء مواقع سريعة ومتجاوبة وقابلة للتوسع بما يلائم احتياجات أعمالك.",
        icon: Globe,
      },
      {
        slug: "mobile-apps",
        name: "تطوير تطبيقات الجوال",
        kicker: "جوال",
        description: "إنشاء تطبيقات جذابة وسهلة الاستخدام لأنظمة iOS وAndroid.",
        icon: Smartphone,
      },
      {
        slug: "it-solutions",
        name: "حلول تقنية المعلومات",
        kicker: "تقنية",
        description: "تنفيذ بنية تحتية تقنية وحلول قوية لضمان تشغيل أعمالك بكفاءة.",
        icon: Wrench,
      },
      {
        slug: "erp-solutions",
        name: "حلول ERP",
        kicker: "ERP",
        description: "أنظمة تخطيط موارد مؤسسية متكاملة لتبسيط وإدارة عملياتك.",
        icon: Workflow,
      },
      {
        slug: "digital-marketing",
        name: "التسويق الرقمي",
        kicker: "تسويق",
        description: "تعزيز حضورك الرقمي عبر SEO ووسائل التواصل والإعلانات والمحتوى.",
        icon: ChartNoAxesCombined,
      },
      {
        slug: "ui-ux-design",
        name: "تصميم UI/UX",
        kicker: "تصميم",
        description: "تصميم واجهات وتجارب استخدام حديثة وسلسة ترفع جودة التفاعل.",
        icon: Palette,
      },
      {
        slug: "motion-graphic",
        name: "موشن جرافيك",
        kicker: "موشن",
        description: "فيديوهات موشن جرافيك احترافية تدعم رسائلك التسويقية بوضوح وتأثير.",
        icon: PlaySquare,
      },
      {
        slug: "construction-management-system",
        name: "نظام إدارة المقاولات",
        kicker: "مقاولات",
        description: "أنظمة متكاملة لإدارة مشاريع البناء والمقاولات بكفاءة أعلى.",
        icon: Building2,
      },
      {
        slug: "property-management-system",
        name: "نظام إدارة العقارات",
        kicker: "عقارات",
        description: "حلول ذكية لإدارة المحافظ العقارية وعمليات التشغيل العقاري.",
        icon: LayoutDashboard,
      },
      {
        slug: "e-commerce-solutions",
        name: "حلول التجارة الإلكترونية",
        kicker: "تجارة إلكترونية",
        description: "متاجر رقمية قوية مع مدفوعات آمنة وإدارة للمخزون والطلبات.",
        icon: ShoppingCart,
      },
      {
        slug: "other-tech-services",
        name: "خدمات تقنية أخرى",
        kicker: "تقنيات أخرى",
        description: "بنية سحابية قابلة للتوسع وتكاملات وترحيل أنظمة للأعمال الحديثة.",
        icon: Blocks,
      },
    ],
    spotlightEyebrow: "خدمات التطوير",
    spotlightTitle: "حلول تطوير متكاملة",
    spotlightDescription:
      "نقدم حلولاً رقمية شاملة تشمل الويب والجوال والتسويق لمساعدة أعمالك على النمو. نهجنا المتكامل يضمن أن كل جزء من حضورك الرقمي مصمم لتحقيق أداء فعلي.",
    spotlightBullets: [
      "دورة تطوير متكاملة من البداية إلى الإطلاق",
      "بنية قابلة للتوسع ومهيأة للمستقبل",
      "معايير أمان بمستوى مؤسسي",
      "دعم وصيانة مستمران بعد الإطلاق",
    ],
    highlights: [
      {
        title: "تطوير ويب حديث",
        description: "مواقع ومنصات متقدمة بأداء قوي وتجارب استخدام تركز على التحويل.",
        icon: Code2,
      },
      {
        title: "حلول تطبيقات الجوال",
        description: "تجارب جوال أصلية وعابرة للمنصات مصممة للنمو والاحتفاظ بالمستخدمين.",
        icon: MonitorSmartphone,
      },
      {
        title: "نمو عبر التسويق الرقمي",
        description: "حملات مبنية على البيانات تربط بين الزيارات والعملاء والعائد التجاري.",
        icon: Rocket,
      },
      {
        title: "تميز في تصميم UI/UX",
        description: "أنظمة تصميم متمحورة حول المستخدم لتحسين سهولة الاستخدام والثقة والتحويل.",
        icon: Bot,
      },
    ],
    whyTitle: "لماذا تختار خدماتنا التطويرية؟",
    whyDescription:
      "نمزج بين التقنية الحديثة والانضباط التنفيذي وأفضل الممارسات لنقدّم حلولاً تحقق نتائج أعمال حقيقية.",
    whyPoints: [
      "اكتشاف وتحليل للأعمال قبل بدء التنفيذ",
      "مراحل واضحة وحوكمة وشفافية في التسليم",
      "الأمان والقابلية للتوسع وسهولة الصيانة كمعيار أساسي",
      "فِرق متعددة التخصصات تشمل التصميم والهندسة والنمو",
    ],
    techTitle: "التقنيات التي نستخدمها",
    techDescription:
      "نختار تقنيات حديثة وعملية تتوافق مع أهداف منتجك وآليات عمل فريقك ومتطلبات التوسع على المدى الطويل.",
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "Python",
      "React Native",
      "Flutter",
      "AWS",
      "MongoDB",
      "Tailwind CSS",
      "TypeScript",
    ],
    faqTitle: "الأسئلة الشائعة",
    faqDescription: "إجابات مختصرة على أكثر الأسئلة شيوعاً حول خدماتنا.",
    faqs: [
      {
        question: "هل تطورون تطبيقات تعمل على iOS وAndroid؟",
        answer:
          "نعم. نطوّر تطبيقات أصلية أو متعددة المنصات بحسب أهداف المنتج والميزانية ومتطلبات الأداء.",
      },
      {
        question: "كم يستغرق تطوير موقع إلكتروني؟",
        answer:
          "تعتمد المدة على نطاق العمل والتكاملات ودورات الاعتماد، لكننا نعمل دائماً وفق مراحل واضحة من الاكتشاف وحتى الإطلاق.",
      },
      {
        question: "هل توفرون دعماً بعد الإطلاق؟",
        answer:
          "نعم. نقدم الصيانة والتحسينات والتطوير المستمر والدعم التشغيلي للحفاظ على استقرار المنصة وأمانها.",
      },
      {
        question: "هل يمكنكم المساعدة في SEO والتسويق؟",
        answer:
          "نعم. ندعم تحسين محركات البحث والحملات المدفوعة وصناعة المحتوى والتحليلات واستراتيجية التسويق الرقمي بشكل متكامل.",
      },
      {
        question: "ما التقنيات التي تتخصصون بها؟",
        answer:
          "نعمل على تقنيات الويب والجوال والسحابة والأتمتة مثل React وNext.js وNode.js وPython وReact Native وFlutter وAWS وMongoDB وTypeScript.",
      },
      {
        question: "هل تقدمون تسعيراً مخصصاً؟",
        answer:
          "نعم. نقوم بتسعير كل مشروع بناءً على الأهداف التجارية والتعقيد والتكاملات ومتطلبات الدعم، ثم نقدم عرضاً مناسباً.",
      },
    ],
  },
};

export default function ServicesPage({ locale }: { locale: Locale }) {
  const copy = content[locale];
  const isRTL = locale === "ar";

  return (
    <main
      dir={isRTL ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(18,158,196,0.16),_transparent_34%),linear-gradient(180deg,_#03101c_0%,_#061a28_38%,_#081422_100%)] text-white"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-amber-300/10 blur-3xl" />
      </div>

      <section className="relative mx-auto max-w-7xl px-4 pb-16 pt-36 sm:px-6 lg:px-8 lg:pb-24 lg:pt-44">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <span className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-1 text-sm tracking-[0.2em] text-cyan-100 uppercase">
              {copy.eyebrow}
            </span>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
              {copy.description}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href={`/${locale}/service#all-services`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d7b03c] px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#e2bf55]"
              >
                {copy.primaryCta}
                <ArrowRight className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/8 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/14"
              >
                {copy.secondaryCta}
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {copy.heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-white/10 bg-white/6 p-5 backdrop-blur-xl"
                >
                  <div className="text-2xl font-semibold text-white">{stat.value}</div>
                  <div className="mt-1 text-sm text-slate-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/7 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.3)] backdrop-blur-2xl sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">{copy.heroPanelTitle}</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">{copy.spotlightTitle}</h2>
              </div>
              <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-cyan-100">
                <ShieldCheck className="h-7 w-7" />
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-200">{copy.heroPanelDescription}</p>

            <div className="mt-6 space-y-3">
              {copy.heroPanelPoints.map((point) => (
                <div key={point} className="flex items-start gap-3 rounded-2xl bg-slate-950/35 px-4 py-3">
                  <BadgeCheck className="mt-0.5 h-5 w-5 flex-none text-cyan-300" />
                  <p className="text-sm leading-6 text-slate-100">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="all-services" className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">{copy.sectionIntro}</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{copy.sectionTitle}</h2>
          <p className="mt-4 text-base leading-8 text-slate-300">{copy.sectionDescription}</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {copy.services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                id={service.slug}
                key={service.slug}
                className="group rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-[linear-gradient(180deg,rgba(16,185,229,0.14),rgba(255,255,255,0.05))]"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-cyan-100">
                    {service.kicker}
                  </span>
                  <div className="rounded-2xl bg-cyan-300/12 p-3 text-cyan-100">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-white">{service.name}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{service.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[2rem] border border-[#d7b03c]/20 bg-[linear-gradient(180deg,rgba(215,176,60,0.15),rgba(255,255,255,0.04))] p-8">
            <p className="text-sm uppercase tracking-[0.24em] text-[#ecd57f]">{copy.spotlightEyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{copy.spotlightTitle}</h2>
            <p className="mt-5 text-base leading-8 text-slate-200">{copy.spotlightDescription}</p>

            <div className="mt-8 space-y-4">
              {copy.spotlightBullets.map((bullet) => (
                <div key={bullet} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3">
                  <BadgeCheck className="mt-0.5 h-5 w-5 flex-none text-[#f3cd56]" />
                  <span className="text-sm leading-6 text-white/90">{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {copy.highlights.map((highlight) => {
              const Icon = highlight.icon;

              return (
                <div
                  key={highlight.title}
                  className="rounded-[1.75rem] border border-white/10 bg-white/6 p-6 backdrop-blur-xl"
                >
                  <div className="inline-flex rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-cyan-100">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white">{highlight.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{highlight.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">{copy.whyTitle}</p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">{copy.whyDescription}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {copy.whyPoints.map((point) => (
              <div
                key={point}
                className="rounded-[1.5rem] border border-white/10 bg-slate-950/35 p-5 text-sm leading-7 text-slate-100"
              >
                <div className="mb-4 inline-flex rounded-xl bg-cyan-300/10 p-2 text-cyan-200">
                  <BadgeCheck className="h-5 w-5" />
                </div>
                {point}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="rounded-[2rem] border border-white/10 bg-white/6 p-8 backdrop-blur-xl sm:p-10">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">{copy.techTitle}</h2>
            <p className="mt-4 text-base leading-8 text-slate-300">{copy.techDescription}</p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {copy.technologies.map((technology) => (
              <div
                key={technology}
                className="rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-4 text-center text-sm font-medium text-white/90"
              >
                {technology}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">{copy.faqTitle}</h2>
          <p className="mt-4 text-base leading-8 text-slate-300">{copy.faqDescription}</p>
        </div>

        <div className="mt-10 space-y-4">
          {copy.faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-[1.5rem] border border-white/10 bg-white/6 p-6 backdrop-blur-xl"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-white marker:hidden">
                <span>{faq.question}</span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-sm text-cyan-200 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 text-sm leading-7 text-slate-300">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(6,182,212,0.16),rgba(215,176,60,0.18))] p-8 text-white sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">{copy.spotlightEyebrow}</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{copy.spotlightTitle}</h2>
              <p className="mt-4 text-base leading-8 text-white/80">{copy.description}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
              >
                {copy.secondaryCta}
              </Link>
              <Link
                href={`/${locale}/service#all-services`}
                className="inline-flex items-center justify-center rounded-full border border-slate-950/15 bg-white/55 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white/75"
              >
                {copy.primaryCta}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}