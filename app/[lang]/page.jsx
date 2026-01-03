import dynamic from "next/dynamic";
import Hero from "../../components/Hero";
import Features from "../../components/Feature";
import Badge from "../../components/Badge/Badge";

const Products = dynamic(() => import("@/components/Products/Products"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const Services = dynamic(() => import("@/components/Services"));
const Market = dynamic(() => import("@/components/MarketLeader/Market"));
const Team = dynamic(() => import("@/components/Team/Team"));
const Skills = dynamic(() => import("@/components/Skills/Skills"));
const StartProject = dynamic(() =>
  import("@/components/StartProject/StartProject")
);

export default async function Home({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;

  const content = {
    en: {
      heroTitle: "Elevating Brands Above the Noise",
      heroDescription:
        "Brandraize is a creative digital agency led by Engr. Aman Shah. We specialize in digital marketing, web & app development, branding, and IT solutions to help businesses grow with measurable impact.",
      shopNow: "Get a Free Consultation",
      whyChooseTitle: "Why Choose Brandraize",
      whyChooseDescription:
        "We deliver results-driven solutions across industries, helping businesses achieve sustainable growth and brand recognition.",
      features: [
        {
          title: "Creative & Strategic",
          description:
            "Our work combines design innovation with data-driven strategies to maximize impact.",
        },
        {
          title: "Multi-Industry Expertise",
          description:
            "We have proven experience across technology, real estate, retail, healthcare, and more.",
        },
        {
          title: "Bilingual & Global Reach",
          description:
            "We craft solutions in both English and Arabic, enabling global accessibility.",
        },
        {
          title: "Results-Driven",
          description:
            "Every project is designed to deliver measurable growth and tangible ROI.",
        },
      ],
      discoverTitle: "Discover Our Services",
      discoverDescription:
        "We provide a full spectrum of creative and digital services to help your brand grow.",
      services: [
        {
          title: "Digital Marketing",
          image: "/services/digital.gif",
          description:
            "A complete range of digital marketing solutions — SEO, social media, ads, and more.",
        },
        {
          title: "Application Development",
          image: "/services/app-development.gif",
          description:
            "Custom web apps and enterprise portals built for performance and scalability.",
        },
        {
          title: "Graphic Design",
          image: "/services/graphic-design.gif",
          description:
            "High-quality branding and visuals — from logos to full identity systems.",
        },
        {
          title: "Video & Animation",
          image: "/services/video-animation.gif",
          description:
            "Engaging videos, motion graphics, and animations that bring ideas to life.",
        },
        {
          title: "Information Technology",
          image: "/services/it.gif",
          description:
            "End-to-end IT consulting and infrastructure support for modern businesses.",
        },
        {
          title: "Mobile App Development",
          image: "/services/mobile-app.gif",
          description:
            "Cross-platform iOS and Android apps with seamless UX and strong performance.",
        },
      ],
    },
    ar: {
      heroButton: "تواصل معنا",
      // heroTitle: "نرتقي بالعلامات التجارية فوق الضوضاء",
      heroTitle: "براندرايز",
      heroDescription:
        "براندرايز هي وكالة إبداعية بقيادة . نحن متخصصون في التسويق الرقمي، تطوير المواقع والتطبيقات، تصميم الهوية البصرية، وحلول تكنولوجيا المعلومات لمساعدة الشركات على النمو وتحقيق تأثير ملموس.",
      shopNow: "احصل على استشارة مجانية",
      whyChooseTitle: "لماذا تختار براندرايز",
      whyChooseDescription:
        "نقدم حلولاً قائمة على النتائج عبر مختلف الصناعات لمساعدة الشركات على تحقيق نمو مستدام وبناء هوية قوية.",
      features: [
        {
          title: "إبداع واستراتيجية",
          description:
            "نمزج بين الابتكار في التصميم والاستراتيجيات المدعومة بالبيانات لتحقيق أقصى تأثير.",
        },
        {
          title: "خبرة متعددة المجالات",
          description:
            "لدينا خبرة مثبتة في التكنولوجيا، العقارات، التجزئة، الرعاية الصحية وغيرها.",
        },
        {
          title: "ثنائي اللغة وعالمي",
          description:
            "نُنشئ حلولاً باللغتين العربية والإنجليزية لتوسيع الوصول العالمي.",
        },
        {
          title: "نتائج ملموسة",
          description:
            "كل مشروع نصممه يركز على تحقيق نمو قابل للقياس وعائد استثمار ملموس.",
        },
      ],
      discoverTitle: "اكتشف خدماتنا",
      discoverDescription:
        "نقدم مجموعة شاملة من الخدمات الرقمية والإبداعية لمساعدة علامتك التجارية على النمو.",
      services: [
        {
          title: "التسويق الرقمي",
          image: "/services/digital.gif",
          description:
            "حلول تسويق رقمي متكاملة — SEO، وسائل التواصل، الإعلانات والمزيد.",
        },
        {
          title: "تطوير التطبيقات",
          image: "/services/app-development.gif",
          description:
            "تطبيقات ويب متقدمة وبوابات مؤسسية عالية الأداء وقابلة للتوسع.",
        },
        {
          title: "التصميم الجرافيكي",
          image: "/services/graphic-design.gif",
          description:
            "هوية بصرية عالية الجودة — من الشعارات إلى أنظمة الهوية الكاملة.",
        },
        {
          title: "الفيديو والأنيميشن",
          image: "/services/video-animation.gif",
          description: "مقاطع فيديو ورسوم متحركة تجذب الانتباه وتبني الثقة.",
        },
        {
          title: "تكنولوجيا المعلومات",
          image: "/services/it.gif",
          description: "استشارات تقنية شاملة ودعم للبنية التحتية للشركات.",
        },
        {
          title: "تطبيقات الهواتف",
          image: "/services/mobile-app.gif",
          description: "تطبيقات iOS و Android بواجهة مستخدم سلسة وأداء قوي.",
        },
      ],
    },
  };

  const {
    heroTitle,
    heroDescription,
    shopNow,
    whyChooseTitle,
    whyChooseDescription,
    features,
    discoverTitle,
    discoverDescription,
    services,
    heroButton,

    products,
  } = content[lang] || content.en;

  return (
    <>
      <Hero
        lang={lang}
        text={heroButton}
        heroTitle={heroTitle}
        heroDescription={heroDescription}
      />
      <Features
        title={whyChooseTitle}
        description={whyChooseDescription}
        features={features}
        lang={lang}
      />
      <Services
        lang={lang}
        servicesData={services}
        sectionTitle={discoverTitle}
        sectionDescription={discoverDescription}
      />
      <Badge lang={lang} />

      <Market lang={lang} />

      <Team lang={lang} />
      <Products lang={lang} />
      <Skills lang={lang} />
      <StartProject lang={lang} />
    </>
  );
}
