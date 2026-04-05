"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaSnapchatGhost,
  FaTwitter,
} from "react-icons/fa";

type FooterProps = {
  lang?: "en" | "ar";
};

export default function Footer({ lang }: FooterProps) {
  const pathname = usePathname();
  const pathLang = pathname?.split("/")?.[1];
  const resolvedLang = pathLang === "ar" || pathLang === "en" ? pathLang : (lang || "en");
  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  // Hide footer on admin pages only
  if (pathname?.startsWith(`/${resolvedLang}/admin`)) {
    return null;
  }

  const arabicText = {
    companyName: "براندرايز",
    companyNameFull: "براندرايز لتقنية المعلومات",
    description: "شركة تقنية معلومات في المملكة العربية السعودية تقدم خدمات تطوير الويب، وتطوير البرمجيات المخصصة، وحلولًا رقمية مُحسّنة لمحركات البحث، لمساعدة الشركات في جميع أنحاء المملكة على النمو بثقة.",
    links: {
      home: "الرئيسية",
      services: "الخدمات",
      webDevelopment: "تطوير المواقع",
      appDevelopment: "تطوير التطبيقات",
      itSolutions: "حلول تكنولوجيا المعلومات",
      digitalMarketing: "التسويق الرقمي",
      graphicDesign: "التصميم الجرافيكي",
      mobileApps: "تطوير تطبيقات الهاتف",
      about: "من نحن",
      contact: "اتصل بنا",
      terms: "شروط الاستخدام",
      privacy: "سياسة الخصوصية",
    },
    compliance: {
      commercialRegister: "السجل التجاري",
      taxNumber: "الرقم الضريبي",
    },
    rightsReserved: "جميع الحقوق محفوظة.",
  };

  const englishText = {
    companyName: "Brandraize",
    companyNameFull: "Brandraize Information Technology",
    description: "An information technology company in Saudi Arabia offering web development, custom software development, and SEO-optimized digital solutions to help businesses across the Kingdom grow with confidence.",
    links: {
      home: "Home",
      services: "Services",
      webDevelopment: "Web Development",
      appDevelopment: "App Development",
      itSolutions: "IT Solutions",
      digitalMarketing: "Digital Marketing",
      graphicDesign: "Graphic Design",
      mobileApps: "Mobile App Development",
      about: "About Us",
      contact: "Contact Us",
      terms: "Terms of Use",
      privacy: "Privacy Policy",
    },
    compliance: {
      commercialRegister: "Commercial Register",
      taxNumber: "Tax Number",
    },
    rightsReserved: "All Rights Reserved.",
  };

  const effectiveLang = resolvedLang || "en";
  const t = effectiveLang === "ar" ? arabicText : englishText;
  const isArabic = effectiveLang === "ar";

  type ServiceLinkKey = keyof typeof englishText.links;

  // Service links array for dynamic rendering
  const serviceLinks: Array<{ key: ServiceLinkKey; path: string }> = [
    { key: "webDevelopment", path: "web-development" },
    { key: "appDevelopment", path: "app-development" },
    { key: "itSolutions", path: "it-solutions" },
    { key: "digitalMarketing", path: "digital-marketing" },
    { key: "graphicDesign", path: "graphic-design" },
    { key: "mobileApps", path: "mobile-apps" },
  ];

  return (
    <footer
      className="relative pt-[60px] pb-[30px] font-sans overflow-hidden text-white"
      suppressHydrationWarning
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-slate-950 via-cyan-950 to-sky-950" />
      
   
      <div className="relative max-w-[1200px] mx-auto px-5">
        {/* Logo Section - Centered */}
        <div className="flex flex-col items-center justify-center text-center mb-[30px]">
          <Link href={`/${effectiveLang}`} className="inline-block mb-[15px]">
            <Image
              src="/logo.png"
              alt="Brandraize"
              width={220}
              height={80}
              priority
              className="w-auto h-20"
            />
          </Link>
        </div>

        {/* Description */}
        <p className={`text-base leading-relaxed text-white/95 mb-[30px] max-w-[1000px] text-center mx-auto ${isArabic ? 'text-right' : 'text-left'}`}>
          {t.description}
        </p>

        {/* Statistics Row */}
        <div className="flex justify-center items-center gap-[60px] my-5 flex-wrap max-sm:gap-[30px]">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">150+</div>
            <div className="text-sm text-white/80 mt-1">{isArabic ? "فريق براندرايز" : "Brandraize Team"}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">50+</div>
            <div className="text-sm text-white/80 mt-1">{isArabic ? "عميل حول العالم" : "Clients Worldwide"}</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-auto mx-auto">
              <Image
                src="/vision2030.png"
                alt="Vision 2030"
                width={48}
                height={20}
                className="w-auto h-5"
              />
            </div>
            <div className="text-sm text-white/80 mt-1">{isArabic ? "رؤية 2030" : "Vision 2030"}</div>
          </div>
        </div>

        {/* Navigation Links - Two Rows */}
        <div className="my-[25px] py-[15px] border-t border-b border-white/20">
          {/* Main Links Row */}
          <div className="flex flex-wrap justify-center gap-x-[30px] gap-y-3 mb-3">
            <Link href={`/${effectiveLang}`} className="text-white no-underline text-base font-normal hover:text-white/70 transition-colors duration-200">
              {t.links.home}
            </Link>
            <Link href={`/${effectiveLang}/about-us`} className="text-white no-underline text-base font-normal hover:text-white/70 transition-colors duration-200">
              {t.links.about}
            </Link>
            <Link href={`/${effectiveLang}/contact-us`} className="text-white no-underline text-base font-normal hover:text-white/70 transition-colors duration-200">
              {t.links.contact}
            </Link>
          </div>
          
          {/* Services Links Row */}
          <div className="flex flex-wrap justify-center gap-x-[25px] gap-y-3">
            {serviceLinks.map((service) => (
              <Link
                key={service.key}
                href={`/${effectiveLang}/services/${service.path}`}
                className="text-white/90 no-underline text-sm font-normal hover:text-white transition-colors duration-200"
              >
                {t.links[service.key]}
              </Link>
            ))}
          </div>
        </div>

        {/* Compliance Section */}
        <div className="flex items-center justify-between gap-5 my-5 flex-wrap max-sm:flex-col max-sm:text-center">
          {/* Left - Tax Number */}
          <div className="flex-1 flex justify-start max-sm:justify-center">
            {/* <div className="text-sm text-white/90">
              <span>{t.compliance.taxNumber}: 312974170600003</span>
            </div> */}
          </div>

          {/* Right - Commercial Register */}
          <div className="flex-1 flex justify-end max-sm:justify-center">
            {/* <div className="text-sm text-white/90">
              <span>{t.compliance.commercialRegister}: 7049883445</span>
            </div> */}
          </div>
        </div>

        {/* Social Icons - Centered */}
        <div className="flex justify-center gap-5 my-[30px] mb-[25px]">
          {/* X (Twitter) */}
          <a
            href="https://x.com/brandraize/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition-all duration-200 flex items-center justify-center w-10 h-10 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:-translate-y-1"
            aria-label="X"
          >
            <FaTwitter size={18} />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/brandraize/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition-all duration-200 flex items-center justify-center w-10 h-10 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:-translate-y-1"
            aria-label="Instagram"
          >
            <FaInstagram size={18} />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/brandraize/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition-all duration-200 flex items-center justify-center w-10 h-10 bg-white/10 rounded-full backdrop-black-sm border border-white/20 hover:bg-white/20 hover:-translate-y-1"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn size={18} />
          </a>

          {/* Snapchat */}
          <a
            href="https://www.snapchat.com/@brandraize"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition-all duration-200 flex items-center justify-center w-10 h-10 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:-translate-y-1"
            aria-label="Snapchat"
          >
            <FaSnapchatGhost size={18} />
          </a>

          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@brandraize"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition-all duration-200 flex items-center justify-center w-10 h-10 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:-translate-y-1"
            aria-label="TikTok"
          >
            <FaTiktok size={18} />
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/brandraize/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition-all duration-200 flex items-center justify-center w-10 h-10 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:-translate-y-1"
            aria-label="Facebook"
          >
            <FaFacebookF size={18} />
          </a>
        </div>

        {/* Copyright */}
        <div className={`text-center pt-5 mt-5 border-t border-white/20 text-white/80 text-[0.85rem] ${isArabic ? 'text-right' : 'text-left'}`}>
          © {new Date().getFullYear()} {t.companyNameFull} | {t.rightsReserved}
        </div>
      </div>
    </footer>
  );
}