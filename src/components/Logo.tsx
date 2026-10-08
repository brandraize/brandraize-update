import Image from 'next/image';

type LogoProps = {
  // Tailwind height classes, e.g. "h-12 sm:h-14". Width follows from the logo's shape.
  className?: string;
  priority?: boolean;
};

// The animated Brandraize logo. /logo-animated.gif is the draw-in half of /logo1.gif: it draws
// itself in, holds for 10 seconds, then replays (the original spent half of every loop blank).
// The file is a square with empty space above and below the mark, so it is cropped to the mark here.
export default function Logo({ className = 'h-12', priority = false }: LogoProps) {
  return (
    <span className={`relative block aspect-[23/10] overflow-hidden ${className}`}>
      <Image
        src="/logo-animated.gif"
        alt="Brandraize"
        width={1296}
        height={1296}
        unoptimized
        priority={priority}
        className="absolute inset-0 h-full w-full object-cover object-[50%_53%]"
      />
    </span>
  );
}
