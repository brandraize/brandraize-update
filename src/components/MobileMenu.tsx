'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  Blocks,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  ChevronDown,
  Globe,
  House,
  Info,
  Mail,
  Palette,
  Phone,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Workflow,
  Wrench,
  X,
} from 'lucide-react';
import { FaFacebookF, FaLinkedinIn, FaSnapchatGhost, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import ContactLink from '@/components/ContactLink';
import Logo from '@/components/Logo';
import { serviceLinks, site, whatsappHref, type Locale } from '@/lib/site';

type MobileMenuProps = {
  lang: Locale;
  open: boolean;
  onClose: () => void;
  // Current path without the language, e.g. "/projects".
  path: string;
  // Link that switches to the other language on the same page.
  switchHref: string;
};

const content = {
  en: {
    menu: 'Menu',
    close: 'Close menu',
    home: 'Home',
    services: 'Services',
    allServices: 'View all services',
    projects: 'Projects',
    about: 'About',
    contact: 'Contact',
    cta: 'Free Consultation',
    whatsapp: 'WhatsApp',
    call: 'Call us',
    language: 'العربية',
  },
  ar: {
    menu: 'القائمة',
    close: 'إغلاق القائمة',
    home: 'الرئيسية',
    services: 'الخدمات',
    allServices: 'عرض جميع الخدمات',
    projects: 'المشاريع',
    about: 'من نحن',
    contact: 'اتصل بنا',
    cta: 'استشارة مجانية',
    whatsapp: 'واتساب',
    call: 'اتصل بنا',
    language: 'English',
  },
};

const serviceIcons: Record<string, LucideIcon> = {
  'web-development': Globe,
  'mobile-apps': Smartphone,
  'e-commerce-solutions': ShoppingCart,
  'digital-marketing': ChartNoAxesCombined,
  'ui-ux-design': Palette,
  'erp-solutions': Workflow,
  'it-solutions': Wrench,
};

const socials = [
  { href: site.social.x, label: 'X', icon: FaXTwitter },
  { href: site.social.linkedin, label: 'LinkedIn', icon: FaLinkedinIn },
  { href: site.social.snapchat, label: 'Snapchat', icon: FaSnapchatGhost },
  { href: site.social.tiktok, label: 'TikTok', icon: FaTiktok },
  { href: site.social.facebook, label: 'Facebook', icon: FaFacebookF },
];

// The phone and tablet menu: a panel that slides in from the side over a dimmed page.
export default function MobileMenu({ lang, open, onClose, path, switchHref }: MobileMenuProps) {
  const t = content[lang];
  const [servicesOpen, setServicesOpen] = useState(path.startsWith('/service'));

  // While the menu is open the page behind it does not scroll, and Escape closes it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const links: Array<{ href: string; label: string; icon: LucideIcon; active: boolean }> = [
    { href: '', label: t.home, icon: House, active: path === '' || path === '/' },
    { href: '/projects', label: t.projects, icon: BriefcaseBusiness, active: path.startsWith('/projects') },
    { href: '/about', label: t.about, icon: Info, active: path.startsWith('/about') },
    { href: '/contact', label: t.contact, icon: Mail, active: path.startsWith('/contact') },
  ];

  // Each row slides in a moment after the one before it.
  const row = (i: number) => ({
    className: `transition-all duration-500 ease-out ${open ? 'translate-x-0 opacity-100' : 'opacity-0 ltr:translate-x-6 rtl:-translate-x-6'}`,
    style: { transitionDelay: open ? `${120 + i * 55}ms` : '0ms' },
  });

  const rowClass = (active: boolean) =>
    `flex w-full items-center gap-3.5 rounded-2xl p-2.5 text-start text-[17px] font-bold transition-colors ${
      active ? 'bg-white/[0.07] text-gold-400' : 'text-white hover:bg-white/5'
    }`;
  const iconClass = (active: boolean) =>
    `flex h-11 w-11 flex-none items-center justify-center rounded-xl transition-colors ${
      active ? 'bg-gold-500 text-ink-950' : 'bg-white/[0.07] text-gold-400'
    }`;

  const servicesActive = path.startsWith('/service');

  return (
    <div className="md:hidden" inert={!open}>
      {/* Dimmed page */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-[60] bg-ink-950/70 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t.menu}
        className={`fixed inset-y-0 end-0 z-[70] flex w-[88vw] max-w-[380px] flex-col overflow-hidden bg-ink-950 shadow-[0_0_80px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ltr:rounded-l-[2rem] rtl:rounded-r-[2rem] ${
          open ? 'translate-x-0' : 'ltr:translate-x-full rtl:-translate-x-full'
        }`}
      >
        {/* Decoration */}
        <div className="bg-dots pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -top-24 end-[-5rem] h-64 w-64 rounded-full bg-[#3870e0]/30 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 start-[-6rem] h-56 w-56 rounded-full bg-gold-500/10 blur-3xl" />

        {/* Top bar */}
        <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-4">
          <Link href={`/${lang}`} onClick={onClose} aria-label="Brandraize">
            <Logo className="h-12" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.close}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.07] text-white transition-colors hover:bg-white/15"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Links */}
        <nav className="relative flex-1 overflow-y-auto px-4 py-5" aria-label={t.menu}>
          <ul className="space-y-1.5">
            <li {...row(0)}>
              <Link href={`/${lang}`} onClick={onClose} className={rowClass(links[0].active)}>
                <span className={iconClass(links[0].active)}><House className="h-5 w-5" aria-hidden="true" /></span>
                {links[0].label}
              </Link>
            </li>

            {/* Services, with its list folding open underneath */}
            <li {...row(1)}>
              <button
                type="button"
                onClick={() => setServicesOpen((v) => !v)}
                aria-expanded={servicesOpen}
                className={rowClass(servicesActive)}
              >
                <span className={iconClass(servicesActive)}><Sparkles className="h-5 w-5" aria-hidden="true" /></span>
                <span className="flex-1">{t.services}</span>
                <ChevronDown
                  className={`h-5 w-5 text-white/50 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>

              <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${servicesOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <ul className="ms-[1.9rem] mt-1.5 space-y-0.5 border-s border-white/10 ps-4">
                    {serviceLinks.map((service) => {
                      const Icon = serviceIcons[service.slug] ?? Blocks;
                      return (
                        <li key={service.slug}>
                          <Link
                            href={`/${lang}/service#${service.slug}`}
                            onClick={onClose}
                            className="flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-[15px] font-medium text-white/75 transition-colors hover:bg-white/5 hover:text-white"
                          >
                            <Icon className="h-[18px] w-[18px] flex-none text-gold-400/80" aria-hidden="true" />
                            {service.label[lang]}
                          </Link>
                        </li>
                      );
                    })}
                    <li>
                      <Link
                        href={`/${lang}/service`}
                        onClick={onClose}
                        className="flex items-center gap-2 px-2.5 py-2.5 text-sm font-bold text-gold-400"
                      >
                        {t.allServices}
                        <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>

            {links.slice(1).map(({ href, label, icon: Icon, active }, i) => (
              <li key={href} {...row(i + 2)}>
                <Link href={`/${lang}${href}`} onClick={onClose} className={rowClass(active)}>
                  <span className={iconClass(active)}><Icon className="h-5 w-5" aria-hidden="true" /></span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions pinned to the bottom */}
        <div className="relative space-y-3 border-t border-white/10 bg-ink-900/80 px-4 pb-5 pt-4">
          <Link
            href={`/${lang}/contact`}
            onClick={onClose}
            className="flex items-center justify-center gap-2 rounded-full bg-gold-500 px-5 py-3.5 text-base font-bold text-ink-950 transition-colors hover:bg-gold-400"
          >
            {t.cta}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </Link>

          <div className="grid grid-cols-2 gap-3">
            <ContactLink
              href={whatsappHref(lang)}
              method="whatsapp"
              source="mobile_menu"
              className="flex items-center justify-center gap-2 rounded-full bg-[#25d366] px-4 py-3 text-sm font-bold text-white"
            >
              <FaWhatsapp size={18} aria-hidden="true" />
              {t.whatsapp}
            </ContactLink>
            <ContactLink
              href={`tel:${site.phone}`}
              method="phone"
              source="mobile_menu"
              className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-3 text-sm font-bold text-white"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {t.call}
            </ContactLink>
          </div>

          <div className="flex items-center justify-between gap-3 pt-1">
            <Link
              href={switchHref}
              hrefLang={lang === 'en' ? 'ar' : 'en'}
              onClick={onClose}
              className="flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-2 text-sm font-bold text-white/85"
            >
              <Globe className="h-4 w-4 text-gold-400" aria-hidden="true" />
              {t.language}
            </Link>
            <div className="flex gap-1.5">
              {socials.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.07] text-white/75 transition-colors hover:text-gold-400"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
