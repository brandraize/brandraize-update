import Image from 'next/image';
import { getClientLogos } from '@/lib/cms';
import { readLocalLogos } from '@/lib/local-logos';
import type { Locale } from '@/lib/site';

const content = {
  en: { eyebrow: 'Clients', title: 'Trusted by businesses like yours', sample: 'Your client logo' },
  ar: { eyebrow: 'عملاؤنا', title: 'شركات وثقت بنا', sample: 'شعار عميلك' },
};

export default async function ClientLogos({ locale }: { locale: Locale }) {
  const t = content[locale];
  // Logos managed in /admin → Client logos. Until any exist there, the image files in
  // /public/clients are shown instead.
  const managed = await getClientLogos();
  const logos = managed.length > 0 ? managed : readLocalLogos();
  // With no logos yet: hidden on the live site, placeholder boxes on your own computer.
  const showSamples = logos.length === 0 && process.env.NODE_ENV !== 'production';
  if (logos.length === 0 && !showSamples) return null;

  const items = showSamples
    ? Array.from({ length: 6 }, () => ({ src: '', name: t.sample }))
    : logos;
  // A handful of logos sit still in a centred row; a longer list scrolls.
  const scroll = items.length > 5;
  const track = scroll ? [...items, ...items] : items;

  return (
    <section className="border-b border-sand-200 bg-sand-50 py-10 sm:py-14">
      <p className="px-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-gold-700">
        {t.eyebrow}
      </p>
      <h2 className="mt-2 px-4 text-center text-2xl font-extrabold text-ink-900 sm:text-3xl">
        {t.title}
      </h2>

      <div
        dir="ltr"
        className={`mt-8 ${scroll ? 'overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]' : ''}`}
      >
        <ul
          className={
            scroll
              ? 'flex w-max animate-marquee items-center hover:[animation-play-state:paused]'
              : 'mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-y-6 px-4'
          }
        >
          {track.map((logo, i) => (
            <li key={i} aria-hidden={i >= items.length} className="mx-2.5 flex-none sm:mx-3.5">
              {logo.src ? (
                <span className="block h-20 w-40 rounded-2xl border border-sand-200 bg-white p-3 transition-shadow duration-300 hover:shadow-[0_12px_30px_rgba(11,18,32,0.10)] sm:h-24 sm:w-48 sm:p-4">
                  <span className="relative block h-full w-full">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    fill
                    sizes="200px"
                    unoptimized={logo.src.endsWith('.svg')}
                    className="object-contain"
                  />
                  </span>
                </span>
              ) : (
                <span className="flex h-20 w-40 items-center justify-center rounded-2xl border-2 border-dashed border-sand-200 text-xs font-bold text-slate-400 sm:h-24 sm:w-48">
                  {logo.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
