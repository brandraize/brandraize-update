'use client';

import { useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import ContactLink from '@/components/ContactLink';
import SelectField from '@/components/SelectField';
import { serviceLinks, whatsappHref, type Locale } from '@/lib/site';
import { trackLead } from '@/lib/track';

type LeadFormProps = {
  locale: Locale;
  // Where on the site this form sits; reported with the conversion.
  source: string;
};

const copy = {
  en: {
    title: 'Get a free consultation',
    subtitle: "Tell us what you need and we'll get back to you with next steps.",
    name: 'Full name',
    phone: 'Phone / WhatsApp',
    email: 'Email (optional)',
    service: 'What do you need?',
    servicePlaceholder: 'Select a service',
    other: 'Something else',
    message: 'Project details (optional)',
    submit: 'Request my free consultation',
    sending: 'Sending…',
    privacy: 'We only use your details to reply to this request.',
    successTitle: 'Thank you — request received',
    successBody: 'Our team will contact you shortly. Need a faster answer? Message us on WhatsApp.',
    errorBody: "We couldn't send the form right now. Send the same details on WhatsApp and we'll reply there.",
    whatsapp: 'Send via WhatsApp',
    again: 'Send another request',
  },
  ar: {
    title: 'احصل على استشارة مجانية',
    subtitle: 'أخبرنا بما تحتاجه وسنتواصل معك بالخطوات التالية.',
    name: 'الاسم الكامل',
    phone: 'رقم الجوال / واتساب',
    email: 'البريد الإلكتروني (اختياري)',
    service: 'ما الخدمة التي تحتاجها؟',
    servicePlaceholder: 'اختر الخدمة',
    other: 'خدمة أخرى',
    message: 'تفاصيل المشروع (اختياري)',
    submit: 'اطلب استشارتي المجانية',
    sending: 'جارٍ الإرسال…',
    privacy: 'نستخدم بياناتك للرد على هذا الطلب فقط.',
    successTitle: 'شكراً لك — تم استلام طلبك',
    successBody: 'سيتواصل معك فريقنا قريباً. تحتاج رداً أسرع؟ راسلنا على واتساب.',
    errorBody: 'تعذّر إرسال النموذج الآن. أرسل التفاصيل نفسها عبر واتساب وسنرد عليك هناك.',
    whatsapp: 'أرسل عبر واتساب',
    again: 'إرسال طلب آخر',
  },
};

const empty = { name: '', phone: '', email: '', service: '', message: '', website: '' };

const fieldClass =
  'w-full rounded-xl border border-sand-200 bg-white px-4 py-3 text-[15px] text-ink-900 placeholder:text-slate-400 transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20';
const labelClass = 'mb-1.5 block text-sm font-semibold text-ink-800';

export default function LeadForm({ locale, source }: LeadFormProps) {
  const t = copy[locale];
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const set = (key: keyof typeof empty) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  // The same details as a WhatsApp message, used when the form cannot be delivered.
  const whatsappText = [
    locale === 'ar' ? 'طلب استشارة مجانية' : 'Free consultation request',
    `${t.name}: ${form.name}`,
    `${t.phone}: ${form.phone}`,
    form.service && `${t.service} ${form.service}`,
    form.message,
  ]
    .filter(Boolean)
    .join('\n');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, locale, source, page: window.location.href }),
      });
      if (!res.ok) throw new Error(`Lead request failed: ${res.status}`);
      trackLead(source);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-2xl" role="status">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-extrabold text-ink-900">{t.successTitle}</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{t.successBody}</p>
        <ContactLink
          href={whatsappHref(locale)}
          method="whatsapp"
          source={`${source}_success`}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#25d366] px-6 py-3 text-sm font-bold text-white"
        >
          <FaWhatsapp size={18} aria-hidden="true" />
          {t.whatsapp}
        </ContactLink>
        <button
          type="button"
          onClick={() => {
            setForm(empty);
            setStatus('idle');
          }}
          className="mt-4 block w-full text-sm font-semibold text-slate-500 underline-offset-4 hover:underline"
        >
          {t.again}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-5 shadow-2xl sm:p-8">
      <h2 className="text-2xl font-extrabold text-ink-900">{t.title}</h2>
      <p className="mt-1.5 text-[15px] leading-relaxed text-slate-600">{t.subtitle}</p>

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor={`${source}-name`} className={labelClass}>{t.name}</label>
          <input
            id={`${source}-name`}
            required
            type="text"
            autoComplete="name"
            maxLength={120}
            value={form.name}
            onChange={set('name')}
            className={fieldClass}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${source}-phone`} className={labelClass}>{t.phone}</label>
            <input
              id={`${source}-phone`}
              required
              type="tel"
              dir="ltr"
              inputMode="tel"
              autoComplete="tel"
              maxLength={30}
              placeholder="+966 5X XXX XXXX"
              value={form.phone}
              onChange={set('phone')}
              className={`${fieldClass} text-start`}
            />
          </div>
          <div>
            <label htmlFor={`${source}-email`} className={labelClass}>{t.email}</label>
            <input
              id={`${source}-email`}
              type="email"
              dir="ltr"
              autoComplete="email"
              maxLength={160}
              value={form.email}
              onChange={set('email')}
              className={`${fieldClass} text-start`}
            />
          </div>
        </div>

        <div>
          <label htmlFor={`${source}-service`} className={labelClass}>{t.service}</label>
          <SelectField
            id={`${source}-service`}
            value={form.service}
            onChange={(service) => setForm((f) => ({ ...f, service }))}
            placeholder={t.servicePlaceholder}
            options={[...serviceLinks.map((s) => s.label[locale]), t.other]}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor={`${source}-message`} className={labelClass}>{t.message}</label>
          <textarea
            id={`${source}-message`}
            rows={3}
            maxLength={2000}
            value={form.message}
            onChange={set('message')}
            className={`${fieldClass} resize-none`}
          />
        </div>

        {/* Honeypot: hidden from people, filled in by bots. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={form.website}
          onChange={set('website')}
          className="hidden"
        />
      </div>

      {status === 'error' && (
        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4" role="alert">
          <p className="text-sm leading-relaxed text-amber-900">{t.errorBody}</p>
          <ContactLink
            href={whatsappHref(locale, whatsappText)}
            method="whatsapp"
            source={`${source}_fallback`}
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-[#25d366] px-5 py-2.5 text-sm font-bold text-white"
          >
            <FaWhatsapp size={18} aria-hidden="true" />
            {t.whatsapp}
          </ContactLink>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3.5 text-base font-bold text-ink-950 transition-colors hover:bg-gold-400 disabled:opacity-70"
      >
        {status === 'sending' && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {status === 'sending' ? t.sending : t.submit}
      </button>
      <p className="mt-3 text-center text-xs text-slate-500">{t.privacy}</p>
    </form>
  );
}
