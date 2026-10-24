import Image from 'next/image';

type LogoProps = {
  // Tailwind height classes, e.g. "h-12 sm:h-14". Width follows from the logo's shape.
  className?: string;
  priority?: boolean;
};

// The animated Brandraize logo. /logo-animated.webp is /logo-animated.gif (the draw-in half of
// /logo1.gif) cropped to the mark and scaled to 258×112, twice the header size: it draws itself
// in, holds for 10 seconds, then replays. Above the fold it loads eagerly, but without a preload
// so it does not compete with the hero text for bandwidth.
export default function Logo({ className = 'h-12', priority = false }: LogoProps) {
  return (
    <Image
      src="/logo-animated.webp"
      alt="Brandraize"
      width={258}
      height={112}
      unoptimized
      loading={priority ? 'eager' : 'lazy'}
      className={`block aspect-[258/112] w-auto ${className}`}
    />
  );
}
