'use client';
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { usePathname } from "next/navigation";
import { Globe, Menu, X, ChevronDown } from "lucide-react";
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
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

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
        href: `/service#${s.slug}`,
        label: s.label[lang],
      })),
    },
    { href: "/projects", label: lang === "ar" ? "المشاريع" : "Projects" },
    { href: "/about", label: lang === "ar" ? "من نحن" : "About" },
    { href: "/contact", label: lang === "ar" ? "اتصل بنا" : "Contact" },
  ];

  const cta = lang === "ar" ? "استشارة مجانية" : "Free Consultation";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300
        ${scrolled || mobileOpen
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
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={lang === "ar" ? "القائمة" : "Toggle menu"}
          aria-expanded={mobileOpen}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-white md:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-white/10 bg-ink-950 px-4 pb-6 pt-3 md:hidden">
          <ul className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <li key={item.href}>
                {item.children ? (
                  <>
                    <button
                      onClick={() =>
                        setMobileExpanded((v) => (v === item.href ? null : item.href))
                      }
                      aria-expanded={mobileExpanded === item.href}
                      className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-semibold text-white/90"
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200
                          ${mobileExpanded === item.href ? "rotate-180" : ""}`}
                      />
                    </button>
                    {mobileExpanded === item.href && (
                      <div className="pb-2 ps-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={`/${lang}${child.href}`}
                            onClick={() => setMobileOpen(false)}
                            className="block rounded-xl px-4 py-2.5 text-sm text-white/70"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={`/${lang}${item.href}`}
                    onClick={() => setMobileOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-base font-semibold
                      ${isActive(item.href) ? "text-gold-400" : "text-white/90"}`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4">
            <Link
              href={`/${lang}/contact`}
              onClick={() => setMobileOpen(false)}
              className="rounded-full bg-gold-500 px-5 py-3 text-center text-sm font-bold text-ink-950"
            >
              {cta}
            </Link>
            <div className="self-start">
              <LanguageSwitcher lang={lang} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
