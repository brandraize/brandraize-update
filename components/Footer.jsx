"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub, FaSnapchatGhost } from "react-icons/fa";
import { SiFiverr } from 'react-icons/si';

export default function Footer({ lang }) {
  const pathname = usePathname();
  const [currentDate, setCurrentDate] = useState(null);

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  if (!pathname || pathname?.startsWith(`/${lang}/admin`)) {
    return null;
  }

  const arabicText = {
    companyName: "براندرايز",
    description:
      "نرتقي بالعلامات التجارية فوق الضوضاء من خلال الإبداع والتكنولوجيا والاستراتيجية. نؤمن بأن مستقبل الأعمال يكمن في تقاطع الابتكار والإبداع.",
    companyTitle: "شركة",
    helpTitle: "المساعدة",
    links: {
      home: "الرئيسية",
      about: "من نحن",
      contact: "اتصل بنا",
      blog: "المدونة",
      faq: "الأسئلة المتكررة",
    },
    rightsReserved: "جميع الحقوق محفوظة.",
  };

  const englishText = {
    companyName: "BrandRaize",
    description:
      "Elevating brands above the noise with creativity, technology, and strategy. We believe the future of business lies at the intersection of innovation and creativity.",
    companyTitle: "Company",
    helpTitle: "Help",
    links: {
      home: "Home",
      about: "About Us",
      contact: "Contact Us",
      blog: "Blog",
      faq: "FAQ",
    },
    rightsReserved: "All Rights Reserved.",
  };

  const t = lang === "ar" ? arabicText : englishText;

  return (
    <footer className="footer lh-lg text-center-sm text-black" style={{ backgroundColor: "#F0F0F0" }}>
      <div className="container">
        <div className="row pt-5">
          {/* Company Info */}
          <div className="col-md-6 mb-4 text-center text-md-start">
            <Link href="/">
              <img
                src="/logo_black.png"
                alt={`${t.companyName} logo`}
                style={{ width: "200px", height: "auto" }}
              />
            </Link>
            <p className="mt-4" style={{ fontSize: "18px" }}>
              <span className="fw-bold">{t.companyName}</span> — {t.description}
            </p>

            {/* Social Media Icons */}
            <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-3">
              <a
                href="https://fb.com/brandraize   "
                target="_blank"
                rel="noopener noreferrer"
                className="text-black"
                aria-label="Facebook"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="https://x.com/brandraize  "
                target="_blank"
                rel="noopener noreferrer"
                className="text-black"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://instagram.com/brandraizee"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/brandraize/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={20} />
              </a>
              {/* GitHub */}
<a
  href="https://github.com/brandraize"
  target="_blank"
  rel="noopener noreferrer"
  className="text-black"
  aria-label="GitHub"
>
  <FaGithub size={20} />
</a>
              
{/* Fiverr */}
<a
  href=" https://www.fiverr.com/brandraize/"
  target="_blank"
  rel="noopener noreferrer"
  className="text-black"
  aria-label="Fiverr"
>
  <SiFiverr size={40} />
</a>

{/* Snapchat */}
<a
  href="https://www.snapchat.com/add/brandraize "
  target="_blank"
  rel="noopener noreferrer"
  className="text-black"
  aria-label="Snapchat"
>
  <FaSnapchatGhost size={20} />
</a>
            </div>
          </div>

          {/* Company Links */}
          <div className="col-sm-6 col-md-3 mb-4">
            <h4 className="mb-4" style={{ fontWeight: "600" }}>{t.companyTitle}</h4>
            <div className="d-flex flex-column">
              <h6 className="mb-3"><Link href="/" className="text-decoration-none text-black">{t.links.home}</Link></h6>
              <h6 className="mb-3"><Link href="/about-us" className="text-decoration-none text-black">{t.links.about}</Link></h6>
              <h6 className="mb-3"><Link href="/contact-us" className="text-decoration-none text-black">{t.links.contact}</Link></h6>
              <h6><Link href="/blog" className="text-decoration-none text-black">{t.links.blog}</Link></h6>
            </div>
          </div>

          {/* Help Links */}
         <div className="col-sm-6 col-md-3 mb-4">
  <h4 className="mb-4" style={{ fontWeight: "600" }}>{t.helpTitle}</h4>
  <div className="d-flex flex-column">
    <h6 className="mb-3">
      <Link href="/faq" className="text-decoration-none text-black">
        {t.links.faq}
      </Link>
    </h6>

    {/* Phone number (clickable) */}
    <h6 className="mb-3">
      <a href="tel:+966551981751" className="text-decoration-none text-black">
       +966551981751
      </a>
    </h6>

    {/* Email (clickable) */}
    <h6 className="mb-3">
      <a href="mailto:brandraize1@gmail.com" className="text-decoration-none text-black">
        brandraize1@gmail.com
      </a>
    </h6>
  </div>
</div>

        </div>

        <hr />

        {/* Footer Bottom */}
        <div className="row text-center" style={{ color: "black" }}>
          <div className="col pb-3">
            &copy; {currentDate?.getFullYear()} {t.companyName}
            <span className="d-none d-sm-inline"> | </span>
            <br className="d-sm-none" />
            <span>{t.rightsReserved}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
