import Link from "next/link";
import Logo from "@/components/Logo";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTiktok,
  FaSnapchatGhost,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import ContactLink from "@/components/ContactLink";
import { serviceLinks, site, whatsappHref } from "@/lib/site";

type FooterProps = {
  lang: "en" | "ar";
};

const content = {
  en: {
    companyNameFull: "Brandraize Information Technology",
    description:
      "An information technology company in Saudi Arabia offering web development, custom software, and digital marketing to help businesses across the Kingdom grow with confidence.",
    services: "Services",
    company: "Company",
    contact: "Contact",
    links: {
      home: "Home",
      allServices: "All Services",
      projects: "Projects",
      about: "About Us",
      contact: "Contact Us",
      terms: "Terms of Use",
      privacy: "Privacy Policy",
    },
    whatsapp: "WhatsApp",
    rightsReserved: "All Rights Reserved.",
  },
  ar: {
    companyNameFull: "براندرايز لتقنية المعلومات",
    description:
      "شركة تقنية معلومات في المملكة العربية السعودية تقدم تطوير المواقع والبرمجيات المخصصة والتسويق الرقمي لمساعدة الشركات في جميع أنحاء المملكة على النمو بثقة.",
    services: "الخدمات",
    company: "الشركة",
    contact: "تواصل معنا",
    links: {
      home: "الرئيسية",
      allServices: "جميع الخدمات",
      projects: "المشاريع",
      about: "من نحن",
      contact: "اتصل بنا",
      terms: "شروط الاستخدام",
      privacy: "سياسة الخصوصية",
    },
    whatsapp: "واتساب",
    rightsReserved: "جميع الحقوق محفوظة.",
  },
};

const socials = [
  { href: site.social.x, label: "X", icon: FaXTwitter },
  { href: site.social.linkedin, label: "LinkedIn", icon: FaLinkedinIn },
  { href: site.social.snapchat, label: "Snapchat", icon: FaSnapchatGhost },
  { href: site.social.tiktok, label: "TikTok", icon: FaTiktok },
  { href: site.social.facebook, label: "Facebook", icon: FaFacebookF },
];

const linkClass = "text-[15px] text-white/70 transition-colors hover:text-white";
const headingClass = "text-sm font-bold uppercase tracking-[0.16em] text-gold-400";

export default function Footer({ lang }: FooterProps) {
  const t = content[lang];

  return (
    <footer className="bg-ink-950 text-white">
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 sm:pb-8 sm:pt-16 lg:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.4fr_1fr_0.8fr_1.2fr] lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href={`/${lang}`} className="inline-block">
              <Logo className="h-16" />
            </Link>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/65">{t.description}</p>

            <div className="mt-6 flex gap-3">
              {socials.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-gold-400 hover:text-gold-400"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h2 className={headingClass}>{t.services}</h2>
            <ul className="mt-5 space-y-3">
              {serviceLinks.map((service) => (
                <li key={service.slug}>
                  <Link href={`/${lang}/service#${service.slug}`} className={linkClass}>
                    {service.label[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h2 className={headingClass}>{t.company}</h2>
            <ul className="mt-5 space-y-3">
              <li><Link href={`/${lang}`} className={linkClass}>{t.links.home}</Link></li>
              <li><Link href={`/${lang}/service`} className={linkClass}>{t.links.allServices}</Link></li>
              <li><Link href={`/${lang}/projects`} className={linkClass}>{t.links.projects}</Link></li>
              <li><Link href={`/${lang}/about`} className={linkClass}>{t.links.about}</Link></li>
              <li><Link href={`/${lang}/contact`} className={linkClass}>{t.links.contact}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h2 className={headingClass}>{t.contact}</h2>
            <ul className="mt-5 space-y-4">
              <li>
                <ContactLink
                  href={`tel:${site.phone}`}
                  method="phone"
                  source="footer"
                  className={`flex items-center gap-3 ${linkClass}`}
                >
                  <Phone className="h-4 w-4 flex-none text-gold-400" aria-hidden="true" />
                  <span dir="ltr">{site.phoneDisplay}</span>
                </ContactLink>
              </li>
              <li>
                <ContactLink
                  href={whatsappHref(lang)}
                  method="whatsapp"
                  source="footer"
                  className={`flex items-center gap-3 ${linkClass}`}
                >
                  <FaWhatsapp size={16} className="flex-none text-gold-400" aria-hidden="true" />
                  {t.whatsapp}
                </ContactLink>
              </li>
              <li>
                <ContactLink
                  href={`mailto:${site.email}`}
                  method="email"
                  source="footer"
                  className={`flex items-center gap-3 ${linkClass}`}
                >
                  <Mail className="h-4 w-4 flex-none text-gold-400" aria-hidden="true" />
                  {site.email}
                </ContactLink>
              </li>
              <li className="flex items-start gap-3 text-[15px] text-white/70">
                <MapPin className="mt-1 h-4 w-4 flex-none text-gold-400" aria-hidden="true" />
                {site.address[lang]}
              </li>
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-10 flex flex-col gap-4 border-t sm:mt-14 border-white/10 pt-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {t.companyNameFull} | {t.rightsReserved}
          </p>
          <div className="flex gap-6">
            <Link href={`/${lang}/privacy`} className="transition-colors hover:text-white">
              {t.links.privacy}
            </Link>
            <Link href={`/${lang}/terms`} className="transition-colors hover:text-white">
              {t.links.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
