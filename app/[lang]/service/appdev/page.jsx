// app/app-development/[lang]/page.js

import React from "react";
import AppDevelopmentPage from "../../../../components/Service/servicepages/AppDevelopmentPage";

export async function generateMetadata({ params }) {
  const { lang } = params;
  
  const translations = {
    en: {
      title: "App Development Services | BrandRaize",
      description: "Exceptional mobile and web app development solutions. iOS, Android, React Native, and enterprise apps tailored to grow your business.",
      keywords: "app development, mobile apps, iOS development, Android apps, React Native, Flutter, enterprise apps, API integration, BrandRaize",
    },
    ar: {
      title: "خدمات تطوير التطبيقات | براند رايز",
      description: "حلول تطوير تطبيقات ويب وجوال استثنائية. تطبيقات iOS و Android و React Native و Flutter لتطوير أعمالك.",
      keywords: "تطوير تطبيقات, تطبيقات الجوال, تطوير iOS, تطوير Android, React Native, Flutter, تطبيقات المؤسسات, تكامل API, براند رايز",
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
      url: `https://brandraize.com/app-development/${lang}`,
      siteName: "BrandRaize",
      images: [
        {
          url: "https://brandraize.com/images/app-development-banner.jpg",
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
      images: ["https://brandraize.com/images/app-development-banner.jpg"],
    },
  };
}

export default function Page({ params }) {
  return <AppDevelopmentPage params={params} />;
}
