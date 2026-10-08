import { Mail, MapPin, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import ContactLink from "@/components/ContactLink";
import Faq from "@/components/Faq";
import LeadForm from "@/components/LeadForm";
import PageHero from "@/components/PageHero";
import { site, whatsappHref } from "@/lib/site";

type ContactUsProps = {
  locale: "en" | "ar";
};

const content = {
  en: {
    eyebrow: "Get In Touch",
    title: "Let's Build Something Great Together",
    description:
      "Tell us about your project and get a free consultation. Send the form, or reach us directly on WhatsApp, phone, or email.",
    directTitle: "Prefer to talk directly?",
    whatsapp: "WhatsApp",
    whatsappSub: "The fastest way to reach our team.",
    phoneSub: "Call us to discuss your project.",
    emailSub: "Email us and we will reply with next steps.",
    office: "Office",
  },
  ar: {
    eyebrow: "تواصل معنا",
    title: "لنبنِ شيئاً رائعاً معاً",
    description:
      "أخبرنا عن مشروعك واحصل على استشارة مجانية. أرسل النموذج أو تواصل معنا مباشرة عبر واتساب أو الهاتف أو البريد الإلكتروني.",
    directTitle: "تفضّل التواصل المباشر؟",
    whatsapp: "واتساب",
    whatsappSub: "أسرع طريقة للوصول إلى فريقنا.",
    phoneSub: "اتصل بنا لمناقشة مشروعك.",
    emailSub: "راسلنا وسنرد عليك بالخطوات التالية.",
    office: "المكتب",
  },
};

const cardClass =
  "flex items-start gap-4 rounded-2xl border border-sand-200 bg-white p-5 transition-colors hover:border-gold-500/60";
const iconClass =
  "flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-ink-900 text-gold-400";

export default function ContactUs({ locale }: ContactUsProps) {
  const t = content[locale];

  return (
    <main>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} />

      <section className="bg-sand-50 py-10 sm:py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8">
          {/* Form */}
          <div className="rounded-3xl border border-sand-200">
            <LeadForm locale={locale} source="contact_page" />
          </div>

          {/* Direct contact */}
          <div>
            <h2 className="text-2xl font-extrabold text-ink-900">{t.directTitle}</h2>

            <div className="mt-6 space-y-4">
              <ContactLink
                href={whatsappHref(locale)}
                method="whatsapp"
                source="contact_page"
                className={cardClass}
              >
                <span className={iconClass}>
                  <FaWhatsapp size={20} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-lg font-bold text-ink-900">{t.whatsapp}</span>
                  <span className="block text-sm text-slate-600">{t.whatsappSub}</span>
                </span>
              </ContactLink>

              <ContactLink
                href={`tel:${site.phone}`}
                method="phone"
                source="contact_page"
                className={cardClass}
              >
                <span className={iconClass}>
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-lg font-bold text-ink-900" dir="ltr">
                    {site.phoneDisplay}
                  </span>
                  <span className="block text-sm text-slate-600">{t.phoneSub}</span>
                </span>
              </ContactLink>

              <ContactLink
                href={`mailto:${site.email}`}
                method="email"
                source="contact_page"
                className={cardClass}
              >
                <span className={iconClass}>
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-lg font-bold text-ink-900">{site.email}</span>
                  <span className="block text-sm text-slate-600">{t.emailSub}</span>
                </span>
              </ContactLink>

              <div className={cardClass}>
                <span className={iconClass}>
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-lg font-bold text-ink-900">{t.office}</span>
                  <span className="block text-sm text-slate-600">{site.address[locale]}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Faq locale={locale} />
    </main>
  );
}
