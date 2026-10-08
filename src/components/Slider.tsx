'use client';

import { Children, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type SliderProps = {
  children: ReactNode;
  // Slides visible at once on phones, from 640px, and from 1024px.
  perView?: { base: number; sm?: number; lg?: number };
  // Milliseconds between automatic moves; 0 turns autoplay off.
  autoplayMs?: number;
  // Colours of the arrows and dots: "dark" sits on navy, "light" on white.
  tone?: 'dark' | 'light';
  labels: { prev: string; next: string };
};

// The slide one step away, wrapping round at either end.
const wrap = (index: number, step: 1 | -1, lastIndex: number) => {
  const next = Math.min(index, lastIndex) + step;
  return next > lastIndex ? 0 : next < 0 ? lastIndex : next;
};

const subscribeToResize = (onChange: () => void) => {
  window.addEventListener('resize', onChange);
  return () => window.removeEventListener('resize', onChange);
};

// A carousel that glides on a CSS transform. It moves one slide at a time, loops at the ends,
// pauses while hovered or touched, follows swipes, and mirrors itself on right-to-left pages.
export default function Slider({ children, perView = { base: 1 }, autoplayMs = 6000, tone = 'light', labels }: SliderProps) {
  const slides = Children.toArray(children);
  const rootRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const visible = useSyncExternalStore(
    subscribeToResize,
    () =>
      window.matchMedia('(min-width: 1024px)').matches
        ? (perView.lg ?? perView.sm ?? perView.base)
        : window.matchMedia('(min-width: 640px)').matches
          ? (perView.sm ?? perView.base)
          : perView.base,
    () => perView.base,
  );

  const lastIndex = Math.max(0, slides.length - visible);
  const current = Math.min(index, lastIndex);

  const go = (step: 1 | -1) => setIndex((i) => wrap(i, step, lastIndex));

  useEffect(() => {
    if (!autoplayMs || paused || lastIndex === 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setIndex((i) => wrap(i, 1, lastIndex)), autoplayMs);
    return () => window.clearInterval(id);
  }, [autoplayMs, paused, lastIndex]);

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(delta) < 40) return;
    // Dragging towards the start of the line brings in the next slide; that is leftwards in
    // English and rightwards in Arabic.
    const rtl = getComputedStyle(rootRef.current!).direction === 'rtl';
    go((delta < 0) !== rtl ? 1 : -1);
  };

  const dark = tone === 'dark';
  const arrowClass = `flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${
    dark
      ? 'border-white/25 text-white hover:border-gold-400 hover:text-gold-400'
      : 'border-sand-200 text-ink-900 hover:border-ink-900'
  }`;

  return (
    <div
      ref={rootRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="-mx-2.5 touch-pan-y overflow-hidden"
        onTouchStart={(e) => {
          touchStart.current = e.touches[0].clientX;
          setPaused(true);
        }}
        onTouchEnd={onTouchEnd}
      >
        <ul
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform rtl:[--dir:1]"
          style={{ transform: `translateX(calc(var(--dir, -1) * ${(current * 100) / visible}%))` }}
        >
          {slides.map((slide, i) => (
            <li
              key={i}
              aria-hidden={i < current || i >= current + visible}
              className="flex px-2.5"
              style={{ flex: `0 0 ${100 / visible}%` }}
            >
              {slide}
            </li>
          ))}
        </ul>
      </div>

      {lastIndex > 0 && (
        <div className="mt-7 flex items-center justify-center gap-4">
          <button type="button" onClick={() => go(-1)} aria-label={labels.prev} className={arrowClass}>
            <ArrowLeft className="h-5 w-5 rtl:rotate-180" aria-hidden="true" />
          </button>

          <div className="flex gap-2">
            {Array.from({ length: lastIndex + 1 }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`${i + 1} / ${lastIndex + 1}`}
                aria-current={i === current ? 'true' : undefined}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  i === current ? 'w-8 bg-gold-500' : `w-2.5 ${dark ? 'bg-white/30' : 'bg-sand-200'}`
                }`}
              />
            ))}
          </div>

          <button type="button" onClick={() => go(1)} aria-label={labels.next} className={arrowClass}>
            <ArrowRight className="h-5 w-5 rtl:rotate-180" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
