import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "font-awesome/css/font-awesome.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContextProvider from "@/providers/ContextProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";

const primary = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const secondary = localFont({
  src: [
    {
      path: "../../public/fonts/somar/fonnts.com-Somar_Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/somar/fonnts.com-Somar_Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/somar/fonnts.com-Somar_Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-somar",
  display: "swap",
  preload: true,
});

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;

  const metas = {
    en: {
      title: "BrandRaize - Elevating Brands Above the Noise | Digital Marketing & Development Agency",
      description:
        "BrandRaize is a creative digital agency specializing in digital marketing, web & app development, branding, and IT solutions. We believe the future of business lies at the intersection of innovation and creativity. From startups to enterprises, we help brands redefine how they connect, grow, and succeed in a digital-first world.",
      keywords: "digital marketing, web development, app development, branding, IT solutions, graphic design, SEO, social media marketing, BrandRaize, creative agency",
    },
    ar: {
      title: "براندرايز - نرتقي بالعلامات التجارية فوق الضوضاء | وكالة تسويق رقمي وتطوير",
      description:
        "براندرايز وكالة إبداعية متخصصة في التسويق الرقمي، تطوير المواقع والتطبيقات، تصميم الهوية البصرية، وحلول تكنولوجيا المعلومات. نؤمن بأن مستقبل الأعمال يكمن في تقاطع الابتكار والإبداع. من الشركات الناشئة إلى المؤسسات، نساعد العلامات التجارية على إعادة تعريف كيفية التواصل والنمو والنجاح في عالم رقمي أولاً.",
      keywords: "التسويق الرقمي، تطوير المواقع، تطوير التطبيقات، العلامة التجارية، حلول تكنولوجيا المعلومات، التصميم الجرافيكي، SEO، التسويق عبر وسائل التواصل الاجتماعي، براندرايز، وكالة إبداعية",
    },
  };

  const baseUrl = "https://brandraize.com";
  const canonicalUrl = `${baseUrl}/${lang}`;

  const meta = metas[lang] || metas.en;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: "BrandRaize Team" }],
    creator: "BrandRaize",
    publisher: "BrandRaize",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en`,
        ar: `${baseUrl}/ar`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: canonicalUrl,
      siteName: "BrandRaize",
      locale: lang === "ar" ? "ar_SA" : "en_US",
      images: [
        {
          url: `${baseUrl}/logo.png`,
          width: 1200,
          height: 630,
          alt: "BrandRaize Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [`${baseUrl}/logo.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      // Add your verification codes here
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
      // bing: 'your-bing-verification-code',
    },
  };
}

export default async function RootLayout({ children, params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;

  return (
    <html
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      data-scroll-behavior="smooth"
      className={secondary.variable}
    >
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link 
          rel="preload" 
          href="/fonts/somar/fonnts.com-Somar_Regular.ttf" 
          as="font" 
          type="font/ttf" 
          crossOrigin="anonymous"
        />
        <script 
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js"
          defer
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={secondary.className}>
        <ContextProvider>
          <Navbar lang={lang} />
          <ToastContainer position="top-center" autoClose={3000} />
          <main
            className="d-flex flex-column flex-grow-1 bg-white"
            style={{ minHeight: "100vh" }}
          >
            {children}
          </main>
          <Footer lang={lang} />
          <BackToTopButton />
        </ContextProvider>
      </body>
    </html>
  );
}
