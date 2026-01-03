// app/graphic-design/[lang]/page.js

import React from "react";
import GraphicDesignPage from "../../../../components/Service/servicepages/GraphicDesignPage";

export async function generateMetadata({ params }) {
  const { lang } = params;

  const translations = {
    en: {
      title: "Graphic Design Services | BrandRaize",
      description:
        "Bring your brand to life with stunning graphic design services by BrandRaize. From logos and branding to UI/UX, print, and creative concepts.",
      keywords:
        "graphic design, logo design, brand identity, UI/UX design, print design, illustrations, creative concept development, BrandRaize",
    },
    ar: {
      title: "خدمات التصميم الجرافيكي | براند رايز",
      description:
        "أطلق العنان لعلامتك التجارية مع خدمات التصميم الجرافيكي من براند رايز: تصميم الشعارات، الهوية البصرية، واجهات المستخدم، المطبوعات، والأفكار الإبداعية.",
      keywords:
        "تصميم جرافيك, تصميم الشعارات, الهوية البصرية, تصميم واجهات المستخدم, تصميم المطبوعات, الرسومات, براند رايز",
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
      url: `https://brandraize.com/graphic-design/${lang}`,
      siteName: "BrandRaize",
      images: [
        {
          url: "https://brandraize.com/images/graphic-design-banner.jpg",
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
      images: ["https://brandraize.com/images/graphic-design-banner.jpg"],
    },
  };
}

export default function Page({ params }) {
  return <GraphicDesignPage params={params} />;
}
