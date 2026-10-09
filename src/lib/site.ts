export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const toLocale = (value: string): Locale => (value === 'ar' ? 'ar' : 'en');

// Single source of truth for business details shown across the site.
export const site = {
  name: 'Brandraize',
  // Other ways people type the name into a search engine.
  alternateNames: ['Brand Raize', 'BrandRaize', 'براندرايز', 'براند رايز'],
  url: 'https://brandraize.com',
  phone: '+966551981751',
  // The local format, as customers in Saudi Arabia type and search it.
  phoneDisplay: '0551981751',
  whatsapp: '966551981751',
  email: 'info@brandraize.com',
  clients: '150+',
  address: {
    en: 'Jeddah, Makkah Region, Saudi Arabia',
    ar: 'جدة، منطقة مكة المكرمة، المملكة العربية السعودية',
  },
  social: {
    x: 'https://x.com/brandraize/',
    linkedin: 'https://www.linkedin.com/company/brandraize/',
    snapchat: 'https://www.snapchat.com/@brandraize',
    tiktok: 'https://www.tiktok.com/@brandraize',
    facebook: 'https://www.facebook.com/brandraize2/',
  },
} as const;

const whatsappGreeting: Record<Locale, string> = {
  en: 'Hello Brandraize, I would like a free consultation about my project.',
  ar: 'مرحباً براندرايز، أرغب في استشارة مجانية حول مشروعي.',
};

export function whatsappHref(locale: Locale, text?: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text ?? whatsappGreeting[locale])}`;
}

export const serviceLinks: Array<{ slug: string; label: Record<Locale, string> }> = [
  { slug: 'web-development', label: { en: 'Web Development', ar: 'تطوير المواقع' } },
  { slug: 'mobile-apps', label: { en: 'Mobile Apps', ar: 'تطبيقات الجوال' } },
  { slug: 'e-commerce-solutions', label: { en: 'E-Commerce', ar: 'المتاجر الإلكترونية' } },
  { slug: 'digital-marketing', label: { en: 'Digital Marketing', ar: 'التسويق الرقمي' } },
  { slug: 'ui-ux-design', label: { en: 'UI/UX Design', ar: 'تصميم UI/UX' } },
  { slug: 'erp-solutions', label: { en: 'ERP Solutions', ar: 'حلول ERP' } },
  { slug: 'it-solutions', label: { en: 'IT Solutions', ar: 'حلول تقنية المعلومات' } },
];
