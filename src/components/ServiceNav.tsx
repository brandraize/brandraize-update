'use client';

import { useEffect, useRef, useState } from 'react';

type ServiceNavProps = {
  label: string;
  items: Array<{ slug: string; name: string }>;
};

// Sticky row of service chips. The chip for the service currently on screen is highlighted.
export default function ServiceNav({ label, items }: ServiceNavProps) {
  const [active, setActive] = useState(items[0]?.slug);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      // A service counts as "current" while it crosses the upper-middle of the screen.
      { rootMargin: '-30% 0px -60% 0px' },
    );
    items.forEach(({ slug }) => {
      const el = document.getElementById(slug);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  // Keep the active chip in view inside the horizontally scrolling row.
  useEffect(() => {
    const list = listRef.current;
    const chip = list?.querySelector<HTMLElement>(`[data-slug="${active}"]`);
    if (!list || !chip) return;
    list.scrollTo({
      left: chip.offsetLeft - list.clientWidth / 2 + chip.clientWidth / 2,
      behavior: 'smooth',
    });
  }, [active]);

  return (
    <nav
      aria-label={label}
      className="sticky top-[72px] z-30 border-b border-sand-200 bg-white/95 backdrop-blur-md"
    >
      <ul
        ref={listRef}
        className="relative mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] sm:px-6 lg:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {items.map(({ slug, name }) => (
          <li key={slug} className="flex-none">
            <a
              href={`#${slug}`}
              data-slug={slug}
              aria-current={active === slug ? 'true' : undefined}
              className={`block rounded-full px-4 py-2 text-sm font-bold transition-all duration-300
                ${active === slug
                  ? 'bg-ink-900 text-gold-400 shadow-md'
                  : 'bg-sand-100 text-slate-600 hover:bg-sand-200 hover:text-ink-900'}`}
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
