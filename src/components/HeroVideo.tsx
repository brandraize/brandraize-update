'use client';

import { useEffect, useState } from 'react';

type Conn = Navigator & { connection?: { saveData?: boolean } };

// Decorative background video. It is about 4 MB, so it only loads on wide screens,
// after the page itself has finished loading, and fades in over the dark hero.
export default function HeroVideo() {
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 1024px)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!wide || reducedMotion || (navigator as Conn).connection?.saveData) return;

    const start = () => setLoad(true);
    if (document.readyState === 'complete') {
      const id = window.setTimeout(start, 0);
      return () => window.clearTimeout(id);
    }
    window.addEventListener('load', start, { once: true });
    return () => window.removeEventListener('load', start);
  }, []);

  if (!load) return null;

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
      onCanPlay={() => setReady(true)}
      className={`absolute inset-0 h-full w-full scale-[1.15] object-cover transition-opacity duration-1000 ${ready ? 'opacity-30' : 'opacity-0'}`}
    >
      <source src="/hero-bg.mp4" type="video/mp4" />
    </video>
  );
}
