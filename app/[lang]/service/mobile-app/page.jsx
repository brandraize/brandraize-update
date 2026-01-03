import React from "react";
import MobileAppPage from "../../../../components/Service/servicepages/MobileAppPage";

export async function generateMetadata({ params }) {
  const { lang } = params;

  const translations = {
    en: {
      title: "Mobile App Development Services | BrandRaize",
      description:
        "Transform your ideas into stunning mobile applications with BrandRaize. We build iOS, Android, and cross-platform apps with secure backends, seamless integration, and long-term support.",
      keywords:
        "mobile app development, iOS apps, Android apps, cross-platform apps, React Native, Flutter, backend integration, app security, app maintenance, BrandRaize",
    },
    ar: {
      title: "خدمات تطوير تطبيقات الموبايل | براند رايز",
      description:
        "حوّل أفكارك إلى تطبيقات موبايل مذهلة مع براند رايز. نحن نبني تطبيقات iOS وأندرويد ومتعددة المنصات مع تكامل آمن ودعم طويل الأمد.",
      keywords:
        "تطوير تطبيقات الموبايل, تطبيقات iOS, تطبيقات أندرويد, تطبيقات متعددة المنصات, React Native, Flutter, تكامل الخوادم, أمان التطبيقات, صيانة التطبيقات, براند رايز",
    },
  };

  const t = translations[lang] ?? translations.en;

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    openGraph: {
      title: t.title,
      description: t.description,
      url: `https://brandraize.com/mobile-app/${lang}`,
      siteName: "BrandRaize",
      images: [
        {
          url: "https://brandraize.com/images/mobile-app-banner.jpg",
          width: 1200,
          height: 630,
          alt: t.title,
        },
      ],
      locale: lang === "ar" ? "ar" : "en",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
      images: ["https://brandraize.com/images/mobile-app-banner.jpg"],
    },
  };
}

export default function Page({ params }) {
  return <MobileAppPage params={params} />;
}
