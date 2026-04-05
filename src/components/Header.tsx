'use client';
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, X, ChevronDown } from "lucide-react";

/* ─── Types ─────────────────────────────────────────── */
type Lang = "en" | "ar";

interface ChildItem {
  href: string;
  label: string;
}

interface MenuItem {
  href: string;
  label: string;
  children?: ChildItem[];
}

/* ─── Language Switcher ──────────────────────────────── */
function LanguageSwitcher({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const pathWithoutLocale = pathname.replace(/^\/(?:en|ar)/, "") || "/";
  const targetLang = lang === "en" ? "ar" : "en";
  const targetLabel = lang === "en" ? "العربية" : "English";
  const targetHref = `/${targetLang}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;

  return (
    <Link
      href={targetHref}
      dir={lang === "en" ? "rtl" : "ltr"}
      className="group flex items-center gap-2 px-4 py-2 rounded-full
        bg-white/10 hover:bg-white/20 border border-white/20
        backdrop-blur-md shadow-md hover:shadow-lg
        transition-all duration-300 font-medium"
    >
      <Globe
        className="w-4 h-4 text-cyan-300 transition-transform duration-300 group-hover:rotate-12"
        aria-hidden="true"
      />
      <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
        {targetLabel}
      </span>
    </Link>
  );
}

/* ─── Animated Nav Link ──────────────────────────────── */
function AnimatedLink({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`relative block font-medium text-sm tracking-wide transition-colors duration-200
        ${active ? "text-cyan-300" : "text-white/80 hover:text-white"}`}
    >
      {children}
      <span
        className={`absolute -bottom-1 left-0 h-px bg-cyan-400 transition-all duration-300
          ${active ? "w-full" : "w-0 group-hover:w-full"}`}
      />
    </Link>
  );
}

/* ─── Dropdown Menu ──────────────────────────────────── */
function DropdownItem({
  item,
  lang,
  isActive,
}: {
  item: MenuItem;
  lang: Lang;
  isActive: (href: string) => boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <li ref={ref} className="relative group">
      <button
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1 text-sm font-medium tracking-wide transition-colors duration-200
          ${isActive(item.href) ? "text-cyan-300" : "text-white/80 hover:text-white"}`}
      >
        {item.label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown panel */}
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className={`absolute top-full ${lang === "ar" ? "right-0" : "left-0"} mt-3
          w-56 rounded-2xl border border-white/10
          bg-[#0c2a3a]/90 backdrop-blur-xl shadow-2xl p-2
          transition-all duration-300 origin-top
          ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        {item.children?.map((child, i) => (
          <Link
            key={i}
            href={`/${lang}${child.href}`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-white/70
              hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 flex-shrink-0" />
            {child.label}
          </Link>
        ))}
      </div>
    </li>
  );
}

/* ─── Main Navbar ────────────────────────────────────── */
export default function Navbar({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === `/${lang}` || pathname === "/";
    return pathname.startsWith(`/${lang}${href}`);
  };

  const menuItems: MenuItem[] = [
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
    { href: "/about", label: lang === "ar" ? "من نحن" : "About" },
    { href: "/contact", label: lang === "ar" ? "اتصل بنا" : "Contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${scrolled ? "pt-0" : "pt-6 bg-gradient-to-b from-black/70 via-black/30 to-transparent pb-8"}`}
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <div className="relative max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-center gap-2 sm:gap-4 min-h-[70px]">

          {/* ── Logo ── */}
          <Link
            href={`/${lang}`}
            className={`absolute top-1/2 -translate-y-1/2 flex-shrink-0 rounded-[50px] bg-black/90 p-1 sm:p-1.5 shadow-lg backdrop-blur-sm transition-opacity duration-200 hover:opacity-80 ${lang === "ar" ? "right-2 sm:right-4" : "left-2 sm:left-4"}`}
          >
            {/* Replace with your actual <Image> from next/image */}
            <img
              src="/logo.png"
              alt="Logo"
              width={50}
              height={10}
              className="object-contain w-28 h-6 sm:w-65 sm:h-11 drop-shadow-[0_0_19px_rgba(14,165,183,0.6)]"
            />
          </Link>

          {/* ── Desktop pill nav ── */}
          <div
            className={`hidden md:flex items-center gap-6 rounded-full px-6 py-2.5
              border border-white/15 shadow-xl
              transition-all duration-500
              ${scrolled
                ? "bg-[#0a1e2a]/95 backdrop-blur-2xl"
                : "bg-[#0a1e2a]/50 backdrop-blur-xl border-white/20"
              }`}
          >
            <ul className={`flex items-center gap-7 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
              {menuItems.map((item, i) =>
                item.children ? (
                  <DropdownItem key={i} item={item} lang={lang} isActive={isActive} />
                ) : (
                  <li key={i} className="group">
                    <AnimatedLink
                      href={`/${lang}${item.href === "/" ? "" : item.href}`}
                      active={isActive(item.href)}
                    >
                      {item.label}
                    </AnimatedLink>
                  </li>
                )
              )}
            </ul>

            {/* Divider */}
            <div className="w-px h-5 bg-white/20 flex-shrink-0" />

            {/* Language switcher inside pill */}
            <LanguageSwitcher lang={lang} />
          </div>

          {/* ── Mobile toggle ── */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className={`md:hidden absolute top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md
              border border-white/20 shadow-lg flex items-center justify-center
              hover:bg-white/20 transition-all duration-300 ${lang === "ar" ? "left-2 sm:left-4" : "right-2 sm:right-4"}`}
          >
            {mobileOpen
              ? <X className="w-5 h-5 text-white" />
              : <Menu className="w-5 h-5 text-white" />
            }
          </button>

          {/* ── CTA Button (Desktop) ── */}
          <Link
            href={`/${lang}/contact`}
            className={`hidden md:block absolute top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#fff] to-[#ceac24] text-black px-6 py-2.5 rounded-full font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${lang === "ar" ? "left-2 sm:left-4" : "right-2 sm:right-4"}`}
          >
            {lang === "ar" ? "استشارة مجانية" : "Free Consultation"}
          </Link>
        </div>

        {/* ── Mobile menu ── */}
        <div
          className={`md:hidden mx-2 sm:mx-4 mt-3 rounded-2xl border border-white/10
            bg-[#0c2a3a]/95 backdrop-blur-2xl shadow-2xl overflow-hidden
            transition-all duration-400 origin-top max-w-[calc(100vw-1rem)]
            ${lang === "ar" ? "ml-auto" : "mr-auto"}
            ${mobileOpen ? "opacity-100 max-h-[600px] py-4" : "opacity-0 max-h-0 py-0"}`}
          dir={lang === "ar" ? "rtl" : "ltr"}
        >
          <ul className="flex flex-col gap-1 px-3">
            {menuItems.map((item, i) => (
              <li key={i}>
                {item.children ? (
                  <>
                    <button
                      onClick={() =>
                        setMobileExpanded((v) => (v === item.href ? null : item.href))
                      }
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl
                        text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10
                        transition-all duration-200"
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300
                          ${mobileExpanded === item.href ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300
                        ${mobileExpanded === item.href ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      <div className="px-2 pb-2 space-y-1">
                        {item.children.map((child, ci) => (
                          <Link
                            key={ci}
                            href={`/${lang}${child.href}`}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                              text-sm text-white/60 hover:text-white hover:bg-white/10
                              transition-all duration-200"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 flex-shrink-0" />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={`/${lang}${item.href === "/" ? "" : item.href}`}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-sm font-semibold
                      hover:bg-white/10 transition-all duration-200
                      ${isActive(item.href) ? "text-cyan-300 bg-white/5" : "text-white/80 hover:text-white"}`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile language switcher */}
          <div className="px-5 pt-3 mt-2 border-t border-white/10 space-y-3">
            <LanguageSwitcher lang={lang} />
            <Link
              href={`/${lang}/contact`}
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center bg-gradient-to-r from-[#4e2a7e] to-[#ceac24] text-white px-5 py-3 rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {lang === "ar" ? "استشارة مجانية" : "Free Consultation"}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}