import Image from 'next/image';
import type { CSSProperties } from 'react';

// Seconds of scrolling per screenshot strip, so long pages scroll at the same pace as short ones.
const SECONDS_PER_STRIP = 2.5;

// Strips are cut 1100px wide and at most 1400px tall (lib/firebase/images.ts → sliceTallImage).
// The size reserves space before a strip loads; `h-auto` then follows the real shape, which
// only differs for the last, shorter strip.
export const STRIP_WIDTH = 1100;
export const STRIP_HEIGHT = 1400;

// Fills its parent (which needs the `group` class) with the top of a full-page screenshot of a
// website. While the parent is hovered the screenshot slides up until its bottom is in view, and
// it slides back when the pointer leaves. Moving `top` to 100% while translating by -100% of its
// own height ends exactly at the bottom, whatever the screenshot's height.
export default function ScrollingCover({ strips, alt = '', sizes }: { strips: string[]; alt?: string; sizes: string }) {
  const style = { '--scroll-duration': `${Math.max(3, strips.length * SECONDS_PER_STRIP)}s` } as CSSProperties;

  return (
    <div
      style={style}
      className="absolute inset-x-0 top-0 transition-[top,translate] duration-700 ease-in-out group-hover:top-full group-hover:-translate-y-full group-hover:duration-[var(--scroll-duration)] motion-reduce:transition-none"
    >
      {strips.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={i === 0 ? alt : ''}
          width={STRIP_WIDTH}
          height={STRIP_HEIGHT}
          sizes={sizes}
          className="block h-auto w-full"
        />
      ))}
    </div>
  );
}
