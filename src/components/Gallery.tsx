'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

type GalleryProps = {
  images: string[];
  alt: string;
  labels: { open: string; close: string; prev: string; next: string };
};

// Thumbnails that open full-size in an overlay. Arrow keys move between pictures, Escape closes.
export default function Gallery({ images, alt, labels }: GalleryProps) {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') setOpen((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === 'ArrowLeft') setOpen((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    };
    window.addEventListener('keydown', onKey);
    // Keep the page behind the overlay from scrolling.
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, images.length]);

  const move = (step: number) => setOpen((i) => (i === null ? i : (i + step + images.length) % images.length));
  const navButton =
    'absolute top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/25';

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
        {images.map((src, i) => (
          <li key={src}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`${labels.open} ${i + 1}`}
              className="group block w-full overflow-hidden rounded-2xl border border-sand-200 bg-sand-50"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${alt} ${i + 1}`}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/95 p-4"
          dir="ltr"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[open]}
            alt={`${alt} ${open + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] max-w-full rounded-xl object-contain"
          />

          <button type="button" onClick={() => setOpen(null)} aria-label={labels.close} className="absolute end-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/25">
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
          {images.length > 1 && (
            <>
              <button type="button" onClick={(e) => { e.stopPropagation(); move(-1); }} aria-label={labels.prev} className={`${navButton} left-3`}>
                <ArrowLeft className="h-6 w-6" aria-hidden="true" />
              </button>
              <button type="button" onClick={(e) => { e.stopPropagation(); move(1); }} aria-label={labels.next} className={`${navButton} right-3`}>
                <ArrowRight className="h-6 w-6" aria-hidden="true" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
