import React from "react";
import ITSolutionsPage from "../../../../components/Service/servicepages/ITSolutionsPage";

export async function generateMetadata({ params }) {
  const { lang } = params;

  const translations = {
    en: {
      title: "IT Solutions Services | BrandRaize",
      description:
        "Innovative IT solutions by BrandRaize: Cloud, Cybersecurity, Infrastructure, Networking, Software Support, and Database Management to grow your business.",
      keywords:
        "IT solutions, cloud services, cybersecurity, IT infrastructure, network management, software support, database management, BrandRaize",
    },
    ar: {
      title: "خدمات حلول تكنولوجيا المعلومات | براند رايز",
      description:
        "خدمات تكنولوجيا المعلومات من براند رايز: حلول السحابة، الأمن السيبراني، البنية التحتية، الشبكات، دعم البرمجيات، وإدارة قواعد البيانات لتطوير أعمالك.",
      keywords:
        "حلول تكنولوجيا المعلومات, الخدمات السحابية, الأمن السيبراني, البنية التحتية لتكنولوجيا المعلومات, إدارة الشبكات, دعم البرمجيات, إدارة قواعد البيانات, براند رايز",
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
      url: `https://brandraize.com/it-solutions/${lang}`,
      siteName: "BrandRaize",
      images: [
        {
          url: "https://brandraize.com/images/it-solutions-banner.jpg",
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
      images: ["https://brandraize.com/images/it-solutions-banner.jpg"],
    },
  };
}

export default function Page({ params }) {
  return <ITSolutionsPage params={params} />;
}
