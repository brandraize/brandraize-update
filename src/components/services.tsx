import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ChartNoAxesCombined,
  Globe,
  Palette,
  PlaySquare,
  Smartphone,
  Wrench,
} from "lucide-react";

type Locale = "en" | "ar";

type Feature = {
  title: string;
  description: string;
  slug: string;
  icon: LucideIcon;
};

const content: Record<
  Locale,
  { eyebrow: string; title: string; description: string; more: string; all: string; features: Feature[] }
> = {
  en: {
    eyebrow: "What We Do",
    title: "One team for everything your business needs online",
    description:
      "Brandraize is a creative digital agency delivering IT solutions, marketing strategies, and scalable digital products that help businesses succeed in Saudi Arabia's competitive market.",
    more: "Learn more",
    all: "View all services",
    features: [
      {
        title: "Web & App Development",
        description:
          "Scalable, high-performance websites and web applications that turn visitors into customers.",
        slug: "web-development",
        icon: Globe,
      },
      {
        title: "Mobile App Development",
        description:
          "Intuitive iOS and Android apps tailored for Saudi Arabia — designed to engage and retain your users.",
        slug: "mobile-apps",
        icon: Smartphone,
      },
      {
        title: "Digital Marketing Solutions",
        description:
          "Data-driven SEO, social media, and performance marketing to grow your brand across Saudi Arabia and the GCC.",
        slug: "digital-marketing",
        icon: ChartNoAxesCombined,
      },
      {
        title: "UI/UX & Brand Design",
        description:
          "Distinctive brand identities and visual design that set your business apart in the Saudi market.",
        slug: "ui-ux-design",
        icon: Palette,
      },
      {
        title: "IT Solutions & Consulting",
        description:
          "End-to-end IT consulting and infrastructure aligned with Saudi Vision 2030.",
        slug: "it-solutions",
        icon: Wrench,
      },
      {
        title: "Video Production & Animation",
        description:
          "Professional video and motion graphics that tell your brand story on every platform.",
        slug: "motion-graphic",
        icon: PlaySquare,
      },
    ],
  },
  ar: {
    eyebrow: "ماذا نقدم",
    title: "فريق واحد لكل ما تحتاجه أعمالك على الإنترنت",
    description:
      "براندرايز وكالة رقمية إبداعية تقدم حلولاً تقنية وتسويقية متكاملة تساعد الشركات على النجاح والنمو في السوق السعودي التنافسي.",
    more: "اعرف المزيد",
    all: "عرض جميع الخدمات",
    features: [
      {
        title: "تطوير المواقع والتطبيقات",
        description:
          "مواقع وتطبيقات ويب عالية الأداء وقابلة للتوسع تحوّل الزوار إلى عملاء.",
        slug: "web-development",
        icon: Globe,
      },
      {
        title: "تطوير تطبيقات الجوال",
        description:
          "تطبيقات iOS و Android مصممة خصيصاً للسوق السعودي — تجذب المستخدمين وتحافظ على ولائهم.",
        slug: "mobile-apps",
        icon: Smartphone,
      },
      {
        title: "حلول التسويق الرقمي",
        description:
          "تحسين محركات البحث وإدارة وسائل التواصل والحملات الإعلانية المبنية على البيانات لتنمية علامتك في السعودية والخليج.",
        slug: "digital-marketing",
        icon: ChartNoAxesCombined,
      },
      {
        title: "تصميم UI/UX والهوية",
        description:
          "هويات تجارية مميزة وتصاميم احترافية تميّز أعمالك في السوق السعودي.",
        slug: "ui-ux-design",
        icon: Palette,
      },
      {
        title: "حلول تقنية المعلومات",
        description:
          "استشارات تقنية وحلول بنية تحتية متكاملة متوافقة مع رؤية 2030.",
        slug: "it-solutions",
        icon: Wrench,
      },
      {
        title: "إنتاج الفيديو والأنيميشن",
        description:
          "فيديو احترافي وموشن جرافيك يروي قصة علامتك التجارية على جميع المنصات.",
        slug: "motion-graphic",
        icon: PlaySquare,
      },
    ],
  },
};

function FeatureCard({ feature, locale, more }: { feature: Feature; locale: Locale; more: string }) {
  const Icon = feature.icon;

  return (
    <Link
      href={`/${locale}/service/${feature.slug}`}
      className="group flex h-full items-start gap-4 rounded-2xl border border-sand-200 bg-white p-5 transition-all sm:flex-col sm:gap-0 sm:rounded-3xl sm:p-7 duration-300 hover:-translate-y-1 hover:border-gold-500/60 hover:shadow-[0_18px_40px_rgba(11,18,32,0.08)]"
    >
      <span className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-ink-900 text-gold-400 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <span className="flex flex-1 flex-col sm:mt-5">
      <span className="block text-lg font-bold text-ink-900 sm:text-xl">{feature.title}</span>
      <span className="mt-1 block flex-1 text-[15px] leading-relaxed text-slate-600 sm:mt-2">{feature.description}</span>
      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-gold-700 sm:mt-5">
        {more}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" aria-hidden="true" />
      </span>
      </span>
    </Link>
  );
}

export default function Services({ locale }: { locale: Locale }) {
  const t = content[locale];

  return (
    <section className="bg-sand-50 py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <Reveal className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold-700">{t.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-ink-900 sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{t.description}</p>
        </Reveal>

        <div className="mt-8 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {t.features.map((f, i) => (
            <Reveal key={f.slug} variant="zoom" delay={(i % 3) * 110} className="h-full">
              <FeatureCard feature={f} locale={locale} more={t.more} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href={`/${locale}/service`}
            className="inline-flex items-center gap-2 rounded-full border border-ink-900 px-6 py-3 text-sm font-bold text-ink-900 transition-colors hover:bg-ink-900 hover:text-white"
          >
            {t.all}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
