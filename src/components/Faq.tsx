import { Plus } from 'lucide-react';
import { faqs } from '@/lib/faqs';
import type { Locale } from '@/lib/site';

const content = {
  en: {
    eyebrow: 'FAQ',
    title: 'Answers to your top questions',
  },
  ar: {
    eyebrow: 'الأسئلة الشائعة',
    title: 'إجابات على أكثر الأسئلة شيوعاً',
  },
};

type FaqProps = {
  locale: Locale;
  // Defaults to the general company questions.
  items?: Array<{ q: string; a: string }>;
};

export default function Faq({ locale, items = faqs[locale] }: FaqProps) {
  const t = content[locale];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <section className="bg-white py-14 sm:py-20 lg:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold-700">{t.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-ink-900 sm:text-4xl">
            {t.title}
          </h2>
        </div>

        <div className="divide-y divide-sand-200 border-y border-sand-200">
          {items.map((item, i) => (
            <details key={item.q} className="group py-5" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-ink-900 [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus className="h-5 w-5 flex-none text-gold-600 transition-transform group-open:rotate-45" aria-hidden="true" />
              </summary>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
