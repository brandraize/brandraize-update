import {
  SiNextdotjs, SiOpenai, SiGooglecloud,
  SiReact, SiNodedotjs, SiPhp, SiFirebase, SiLaravel, SiDocker,
  SiMongodb, SiTypescript, SiFlutter,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import type { IconType } from 'react-icons';

type TechSliderProps = {
  locale: 'en' | 'ar';
};

const tech: Array<{ name: string; icon: IconType }> = [
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'React', icon: SiReact },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Laravel', icon: SiLaravel },
  { name: 'PHP', icon: SiPhp },
  { name: 'Flutter', icon: SiFlutter },
  { name: 'Firebase', icon: SiFirebase },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'AWS', icon: FaAws },
  { name: 'Google Cloud', icon: SiGooglecloud },
  { name: 'Docker', icon: SiDocker },
  { name: 'OpenAI', icon: SiOpenai },
];

export default function TechSlider({ locale }: TechSliderProps) {
  const isRtl = locale === 'ar';

  return (
    <section className="overflow-hidden border-y border-sand-200 bg-sand-50 py-10 sm:py-14">
      <p className="px-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
        {isRtl ? 'نبني بتقنيات حديثة وموثوقة' : 'Built with modern, proven technology'}
      </p>

      {/* The list is rendered twice and shifted by half its width for a seamless loop */}
      <div
        dir="ltr"
        className="mt-8 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
      >
        <ul className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[...tech, ...tech].map(({ name, icon: Icon }, i) => (
            <li
              key={i}
              aria-hidden={i >= tech.length}
              className="mx-6 flex items-center gap-2.5 text-lg font-bold text-slate-500"
            >
              <Icon size={24} aria-hidden="true" />
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
