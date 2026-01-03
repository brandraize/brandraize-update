// app/[lang]/aboutus/page.js
import AboutUs from "../../../components/AboutUs/AboutUS";

export async function generateMetadata({ params }) {
  const lang = params.lang || "en";

  const content = {
    en: {
      title: "About BrandRaize | Creativity, Technology & Strategy",
      description:
        "Elevating brands above the noise with creativity, technology, and strategy. We believe the future of business lies at the intersection of innovation and creativity. From startups to enterprises, BrandRaize helps brands redefine how they connect, grow, and succeed in a digital-first world.",
    },
    ar: {
      title: "عن براندرايز | الإبداع والتكنولوجيا والاستراتيجية",
      description:
        "نرتقي بالعلامات التجارية فوق الضوضاء من خلال الإبداع والتكنولوجيا والاستراتيجية. نؤمن بأن مستقبل الأعمال يكمن في تقاطع الابتكار والإبداع. من الشركات الناشئة إلى المؤسسات، تساعد براندرايز العلامات التجارية على إعادة تعريف كيفية التواصل والنمو والنجاح في عالم رقمي أولاً.",
    },
  };

  const t = content[lang];

  return {
    title: t.title,
    description: t.description,
    openGraph: {
      title: t.title,
      description: t.description,
      url: `https://brandraize.com/${lang}/aboutus`,
      images: [
        {
          url: "/aman.jpeg",
          width: 1200,
          height: 630,
          alt: "About Brandraize",
        },
      ],
    },
    alternates: {
      languages: {
        en: "/en/aboutus",
        ar: "/ar/aboutus",
      },
    },
  };
}

export default function Page({ params }) {
  return <AboutUs params={params} />;
}
