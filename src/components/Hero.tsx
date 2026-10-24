import Image from 'next/image';
import { Check, Globe2, MapPin, Phone, Users } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import ContactLink from '@/components/ContactLink';
import HeroVideo from '@/components/HeroVideo';
import LeadForm from '@/components/LeadForm';
import { site, whatsappHref } from '@/lib/site';

type HeroProps = {
  locale: 'en' | 'ar';
};

const content = {
  en: {
    eyebrow: 'Web, apps & digital marketing agency in Saudi Arabia',
    title: 'Websites, apps and marketing that bring your business more customers',
    subtitle:
      'Brandraize designs, builds and markets digital products for companies across Saudi Arabia — in Arabic and English, from the first idea to launch and beyond.',
    points: [
      'Free consultation and a tailored quote before you commit',
      'Arabic and English interfaces, built right-to-left from day one',
      'Support and maintenance after launch',
    ],
    whatsapp: 'Chat on WhatsApp',
    call: 'Call',
    trust: [
      { icon: Users, value: site.clients, label: 'clients served' },
      { icon: Globe2, value: 'AR / EN', label: 'bilingual delivery' },
      { icon: MapPin, value: 'Jeddah', label: 'serving all of KSA' },
    ],
    vision: 'Aligned with Saudi Vision 2030',
  },
  ar: {
    eyebrow: 'وكالة مواقع وتطبيقات وتسويق رقمي في السعودية',
    title: 'مواقع وتطبيقات وتسويق رقمي تجلب لأعمالك عملاء أكثر',
    subtitle:
      'براندرايز تصمّم وتطوّر وتسوّق المنتجات الرقمية للشركات في أنحاء المملكة — بالعربية والإنجليزية، من الفكرة الأولى حتى الإطلاق وما بعده.',
    points: [
      'استشارة مجانية وعرض سعر مخصص قبل أي التزام',
      'واجهات عربية وإنجليزية مصممة من اليمين لليسار منذ اليوم الأول',
      'دعم وصيانة بعد الإطلاق',
    ],
    whatsapp: 'تواصل عبر واتساب',
    call: 'اتصل',
    trust: [
      { icon: Users, value: `+${site.clients.replace('+', '')}`, label: 'عميل خدمناهم' },
      { icon: Globe2, value: 'عربي / EN', label: 'تنفيذ بلغتين' },
      { icon: MapPin, value: 'جدة', label: 'نخدم كل مناطق المملكة' },
    ],
    vision: 'متوافقون مع رؤية المملكة 2030',
  },
};

export default function Hero({ locale }: HeroProps) {
  const t = content[locale];

  return (
    <section className="relative isolate overflow-hidden bg-ink-950 text-white">
      {/* Background: painted instantly in CSS; the video fades in later on desktop only */}
      <div className="absolute inset-0 -z-10">
        <div className="bg-dots absolute inset-0" />
        <HeroVideo />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_85%_0%,rgba(56,112,224,0.38),transparent_70%),radial-gradient(50%_50%_at_0%_100%,rgba(26,58,122,0.55),transparent_70%)]" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:px-8 lg:pb-24 lg:pt-40">
        {/* Copy */}
        <div>
          <p className="inline-flex animate-fade-up rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-1.5 text-sm font-semibold text-gold-300">
            {t.eyebrow}
          </p>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.15] sm:text-5xl lg:text-[3.4rem]">
            {t.title}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">{t.subtitle}</p>

          <ul className="mt-7 animate-fade-up space-y-3 [animation-delay:300ms]">
            {t.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-[15px] text-white/90">
                <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-gold-500 text-ink-950">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex animate-fade-up flex-col gap-3 [animation-delay:400ms] sm:flex-row sm:items-center">
            <ContactLink
              href={whatsappHref(locale)}
              method="whatsapp"
              source="hero"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f7a40] px-7 py-3.5 text-base font-bold text-white transition-opacity hover:opacity-90"
            >
              <FaWhatsapp size={20} aria-hidden="true" />
              {t.whatsapp}
            </ContactLink>
            <ContactLink
              href={`tel:${site.phone}`}
              method="phone"
              source="hero"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-white/10"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span>{t.call}</span>
              <span dir="ltr">{site.phoneDisplay}</span>
            </ContactLink>
          </div>
        </div>

        {/* Lead form */}
        <div id="consultation" className="animate-fade-up [animation-delay:250ms]">
          <LeadForm locale={locale} source="home_hero" />
        </div>
      </div>

      {/* Trust strip */}
      <div className="border-t border-white/10 bg-ink-900/70">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-6 px-4 py-7 sm:px-6 lg:grid-cols-4 lg:px-8">
          {t.trust.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon className="h-6 w-6 flex-none text-gold-400" aria-hidden="true" />
              <p>
                <span className="block text-xl font-extrabold leading-tight">{value}</span>
                <span className="block text-sm text-white/65">{label}</span>
              </p>
            </div>
          ))}
          <div className="flex items-center gap-3">
            <Image
              src="/vision2030.png"
              alt=""
              width={270}
              height={186}
              className="h-9 w-auto flex-none"
            />
            <p className="text-sm font-semibold text-white/85">{t.vision}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
