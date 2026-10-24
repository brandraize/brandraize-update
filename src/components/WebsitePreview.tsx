'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { STRIP_HEIGHT, STRIP_WIDTH } from '@/components/ScrollingCover';

type WebsitePreviewProps = {
  // The full-page screenshot, as strips stacked top to bottom.
  strips: string[];
  // Address shown in the browser bar (display only).
  address: string;
  labels: { play: string; pause: string; hint: string };
};

// Pixels scrolled per second while playing.
const SPEED = 90;
// How long to rest at the top and bottom before turning round.
const REST_MS = 1600;

// A browser-style window that scrolls a full-page screenshot of a finished website from top
// to bottom and back, as if someone were browsing it. It starts when it comes into view,
// pauses while the visitor hovers, touches or scrolls it themselves, and can be toggled.
export default function WebsitePreview({ strips, address, labels }: WebsitePreviewProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el || !playing || !inView || held) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let last = performance.now();
    let direction = el.scrollTop >= el.scrollHeight - el.clientHeight - 1 ? -1 : 1;
    let restUntil = 0;
    // scrollTop only holds whole pixels in some browsers, so the exact position is tracked here.
    let position = el.scrollTop;

    const step = (now: number) => {
      const elapsed = Math.min(now - last, 64);
      last = now;
      const max = el.scrollHeight - el.clientHeight;

      if (max > 0 && now >= restUntil) {
        position = Math.max(0, Math.min(max, position + (direction * SPEED * elapsed) / 1000));
        el.scrollTop = position;
        if (position >= max || position <= 0) {
          direction = position >= max ? -1 : 1;
          restUntil = now + REST_MS;
        }
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [playing, inView, held]);

  return (
    <div className="overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-[0_30px_80px_rgba(11,18,32,0.18)]">
      {/* Browser bar */}
      <div className="flex items-center gap-3 border-b border-sand-200 bg-sand-100 px-4 py-3" dir="ltr">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-full bg-white px-4 py-1.5 text-sm text-slate-500">
          {address}
        </span>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? labels.pause : labels.play}
          className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-ink-900 text-gold-400 transition-colors hover:bg-ink-800"
        >
          {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
        </button>
      </div>

      {/* The page being "browsed" */}
      <div
        ref={viewportRef}
        tabIndex={0}
        aria-label={labels.hint}
        onMouseEnter={() => setHeld(true)}
        onMouseLeave={() => setHeld(false)}
        onTouchStart={() => setHeld(true)}
        onTouchEnd={() => setHeld(false)}
        className="h-[60vh] max-h-[640px] min-h-[320px] overflow-y-auto overscroll-contain [scrollbar-width:thin]"
      >
        {strips.map((src) => (
          <Image
            key={src}
            src={src}
            alt=""
            width={STRIP_WIDTH}
            height={STRIP_HEIGHT}
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="block h-auto w-full"
          />
        ))}
      </div>

      <p className="border-t border-sand-200 bg-sand-50 px-4 py-2.5 text-center text-sm text-slate-500">{labels.hint}</p>
    </div>
  );
}
