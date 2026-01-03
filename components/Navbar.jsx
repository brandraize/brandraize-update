"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { FaWhatsapp, FaPhone } from "react-icons/fa";

export default function Navbar({ lang }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure hydration consistency
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href) => {
    if (href === "/") return pathname === `/${lang}` || pathname === "/";
    return pathname === `/${lang}${href}`;
  };

  const menuItems = [
    { href: "/", label: lang === "ar" ? "الرئيسية" : "Home" },
    {
      href: "/service",
      label: lang === "ar" ? "الخدمات" : "Services",
      children: [
        { href: "/service/webdev", label: lang === "ar" ? "تطوير المواقع" : "Web Development" },
        { href: "/service/appdev", label: lang === "ar" ? "تطوير التطبيقات" : "App Development" },
        { href: "/service/itsolutions", label: lang === "ar" ? "حلول تكنولوجيا المعلومات" : "IT Solutions" },
        { href: "/service/digital-marketing", label: lang === "ar" ? "التسويق الرقمي" : "Digital Marketing" },
        { href: "/service/graphic-design", label: lang === "ar" ? "التصميم الجرافيكي" : "Graphic Designing" },
        { href: "/service/mobile-app", label: lang === "ar" ? "تطوير تطبيقات الهاتف" : "Mobile App Development" },
      ],
    },
    { href: "/about-us", label: lang === "ar" ? "من نحن" : "About Us" },
    { href: "/contact-us", label: lang === "ar" ? "اتصل بنا" : "Contact Us" },
    { href: "/blog", label: lang === "ar" ? "المدونة" : "Blog" },
  ];

  if (!pathname || pathname?.startsWith(`/${lang}/admin`)) return null;

  const whatsappNumber = "+966551981751";
  const callNumber = "+966551981751";

  // Function to close offcanvas programmatically
  const closeOffcanvas = () => {
    const offcanvas = document.getElementById("offcanvasNavbar");
    if (offcanvas && typeof window !== "undefined") {
      const bsOffcanvas = window.bootstrap?.Offcanvas.getInstance(offcanvas);
      if (bsOffcanvas) bsOffcanvas.hide();
    }
  };

  return (
    <nav
      className="navbar navbar-expand-md fixed-top shadow-sm"
      style={
        mounted
          ? {
              backgroundColor: scrolled ? "rgba(255, 255, 255, 0.95)" : "white",
              transition: "background-color 0.3s ease",
            }
          : {}
      }
    >
      <div className="container d-flex align-items-center justify-content-between">
        {/* Logo */}
        <Link href={`/${lang}`} className="navbar-brand" aria-label={lang === "ar" ? "براندرايز الرئيسية" : "BrandRaize Home"}>
          <img 
            src="/logo.png" 
            alt={lang === "ar" ? "شعار براندرايز" : "BrandRaize Logo"} 
            width="160" 
            height="60"
            style={{ width: "160px", height: "auto" }}
            loading="eager"
          />
        </Link>

        {/* Desktop Navbar links */}
        <ul className="navbar-nav mx-auto d-none d-md-flex align-items-center">
          {menuItems.map((item, index) => (
            <li key={index} className={`nav-item ${item.children ? "dropdown" : ""} mx-2`}>
              {item.children ? (
                <>
                  <Link
                    href={`/${lang}${item.href}`}
                    className={`nav-link ${isActive(item.href) ? "active" : ""}`}
                  >
                    {item.label}
                  </Link>
                  <ul className="dropdown-menu shadow-sm rounded">
                    {item.children.map((child, childIndex) => (
                      <li key={childIndex}>
                        <Link href={`/${lang}${child.href}`} className="dropdown-item">
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                  href={`/${lang}${item.href === "/" ? "" : item.href}`}
                  className={`nav-link ${isActive(item.href) ? "active" : ""}`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop Language & Action Buttons */}
        <div className="d-none d-md-flex align-items-center ms-auto gap-3">
          <LanguageSwitcher lang={lang} />
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-success d-flex align-items-center gap-2"
            aria-label={lang === "ar" ? "تواصل عبر واتساب" : "Contact via WhatsApp"}
          >
            <FaWhatsapp aria-hidden="true" /> {lang === "ar" ? "واتساب" : "WhatsApp"}
          </a>
          <a 
            href={`tel:${callNumber}`} 
            className="btn btn-primary d-flex align-items-center gap-2"
            aria-label={lang === "ar" ? "اتصل بنا" : "Call us"}
          >
            <FaPhone aria-hidden="true" /> {lang === "ar" ? "اتصل" : "Call"}
          </a>
        </div>

        {/* Mobile toggler */}
        <button
          className="navbar-toggler ms-3 d-md-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      {/* Mobile Offcanvas */}
      <div
        className="offcanvas offcanvas-end d-md-none"
        tabIndex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            {menuItems.map((item, index) => (
              <li key={index} className="nav-item">
                {item.children ? (
                  <>
                    <a
                      className="nav-link"
                      data-bs-toggle="collapse"
                      href={`#submenu-${index}`}
                      role="button"
                      aria-expanded="false"
                      aria-controls={`submenu-${index}`}
                    >
                      {item.label}
                    </a>
                    <div className="collapse" id={`submenu-${index}`}>
                      <ul className="list-unstyled ps-3">
                        {item.children.map((child, childIndex) => (
                          <li key={childIndex}>
                            <Link
                              href={`/${lang}${child.href}`}
                              className="nav-link"
                              onClick={closeOffcanvas}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link
                    href={`/${lang}${item.href === "/" ? "" : item.href}`}
                    className="nav-link"
                    onClick={closeOffcanvas}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Language & Action Buttons */}
          <div className="mt-3 d-flex flex-column gap-2">
            <LanguageSwitcher lang={lang} />
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success d-flex align-items-center gap-2 justify-content-center"
              aria-label={lang === "ar" ? "تواصل عبر واتساب" : "Contact via WhatsApp"}
            >
              <FaWhatsapp aria-hidden="true" /> {lang === "ar" ? "واتساب" : "WhatsApp"}
            </a>
            <a
              href={`tel:${callNumber}`}
              className="btn btn-primary d-flex align-items-center gap-2 justify-content-center"
              aria-label={lang === "ar" ? "اتصل بنا" : "Call us"}
            >
              <FaPhone aria-hidden="true" /> {lang === "ar" ? "اتصل" : "Call"}
            </a>
          </div>
        </div>
      </div>

      {/* Navbar styles */}
      <style jsx global>{`
        .navbar-nav .nav-link {
          font-weight: 500;
          color: #333;
          transition: color 0.2s;
        }
        .navbar-nav .nav-link:hover,
        .navbar-nav .nav-link.active {
          color: #0d6efd;
        }
        .navbar-nav .dropdown-menu {
          border-radius: 0.5rem;
          transition: all 0.2s ease-in-out;
        }
        @media (min-width: 768px) {
          .navbar-nav .dropdown:hover .dropdown-menu {
            display: block;
          }
        }
      `}</style>
    </nav>
  );
}
