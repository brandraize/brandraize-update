'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  // up: rise in · start/end: slide in from the reading-start / reading-end side · zoom: scale in
  variant?: 'up' | 'start' | 'end' | 'zoom';
  // Milliseconds to wait after entering the viewport; use it to stagger siblings.
  delay?: number;
  className?: string;
};

// Animates its children in the first time they scroll into view (styles live in globals.css).
export default function Reveal({ children, variant = 'up', delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={variant}
      data-shown={shown || undefined}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </div>
  );
}
