'use client';
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import MobileMenu from "@/components/MobileMenu";
import { usePathname } from "next/navigation";
import { Globe, Menu, ChevronDown } from "lucide-react";
import { serviceLinks } from "@/lib/site";

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
      hrefLang={targetLang}
      className="flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-2 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white"
    >
      <Globe className="h-4 w-4 text-gold-400" aria-hidden="true" />
      {targetLabel}
    </Link>
  );
}

/* ─── Dropdown Menu ──────────────────────────────────── */
function DropdownItem({
  item,
  lang,
  active,
}: {
  item: MenuItem;
  lang: Lang;
  active: boolean;
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
    <li
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`flex items-center gap-1 py-2 text-sm font-medium transition-colors
          ${active ? "text-gold-400" : "text-white/80 hover:text-white"}`}
      >
        {item.label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown panel */}
      <div
        className={`absolute start-0 top-full w-60 pt-2 transition-all duration-200
          ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <div className="rounded-2xl border border-white/10 bg-ink-900 p-2 shadow-2xl">
          {item.children?.map((child) => (
            <Link
              key={child.href}
              href={`/${lang}${child.href}`}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-2.5 text-sm text-white/75 transition-colors hover:bg-white/5 hover:text-white"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </li>
  );
}

/* ─── Main Navbar ────────────────────────────────────── */
export default function Navbar({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const pathWithoutLocale = pathname.replace(/^\/(?:en|ar)/, "");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname.startsWith(`/${lang}${href}`);

  const menuItems: MenuItem[] = [
    {
      href: "/service",
      label: lang === "ar" ? "الخدمات" : "Services",
      children: serviceLinks.map((s) => ({
        href: `/service/${s.slug}`,
        label: s.label[lang],
      })),
    },
    { href: "/projects", label: lang === "ar" ? "المشاريع" : "Projects" },
    { href: "/about", label: lang === "ar" ? "من نحن" : "About" },
    { href: "/contact", label: lang === "ar" ? "اتصل بنا" : "Contact" },
  ];

  const cta = lang === "ar" ? "استشارة مجانية" : "Free Consultation";

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300
        ${scrolled
          ? "border-white/10 bg-ink-950/95 backdrop-blur-md"
          : "border-transparent bg-ink-950/0"}`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* ── Logo ── */}
        <Link href={`/${lang}`} className="flex-shrink-0" aria-label="Brandraize">
          <Logo className="h-14" priority />
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden md:block" aria-label={lang === "ar" ? "التنقل الرئيسي" : "Main"}>
          <ul className="flex items-center gap-8">
            {menuItems.map((item) =>
              item.children ? (
                <DropdownItem key={item.href} item={item} lang={lang} active={isActive(item.href)} />
              ) : (
                <li key={item.href}>
                  <Link
                    href={`/${lang}${item.href}`}
                    className={`py-2 text-sm font-medium transition-colors
                      ${isActive(item.href) ? "text-gold-400" : "text-white/80 hover:text-white"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        {/* ── Desktop actions ── */}
        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher lang={lang} />
          <Link
            href={`/${lang}/contact`}
            className="rounded-full bg-gold-500 px-5 py-2.5 text-sm font-bold text-ink-950 transition-colors hover:bg-gold-400"
          >
            {cta}
          </Link>
        </div>

        {/* ── Mobile toggle ── */}
        <button
          onClick={() => setMobileOpen(true)}
          aria-label={lang === "ar" ? "فتح القائمة" : "Open menu"}
          aria-expanded={mobileOpen}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-white md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>

    {/* The mobile menu sits outside the header: the header's blur would otherwise trap it inside the bar. */}
    <MobileMenu
      lang={lang}
      open={mobileOpen}
      onClose={closeMobile}
      path={pathWithoutLocale}
      switchHref={`/${lang === "en" ? "ar" : "en"}${pathWithoutLocale}`}
    />
    </>
  );
}
