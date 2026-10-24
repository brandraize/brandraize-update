import Image from 'next/image';
import type { Project } from '@/lib/cms';
import type { Locale } from '@/lib/site';

type ProjectPictureProps = {
  project: Project;
  locale: Locale;
  sizes: string;
  alt?: string;
  priority?: boolean;
  className?: string;
};

const hostname = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
};

// Fills its parent with the project's picture, or with a card showing the project's name
// and website while it has no picture yet.
export default function ProjectPicture({ project, locale, sizes, alt = '', priority, className = '' }: ProjectPictureProps) {
  if (!project.image) {
    return (
      <div className={`absolute inset-0 flex flex-col items-center justify-center bg-ink-950 p-6 text-center ${className}`}>
        <div className="bg-dots absolute inset-0" />
        <p className="relative text-2xl font-extrabold leading-tight text-white">{project.title[locale]}</p>
        {project.url && (
          <p className="relative mt-2 text-sm font-bold text-gold-400" dir="ltr">{hostname(project.url)}</p>
        )}
      </div>
    );
  }

  return (
    <Image
      src={project.image}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={`object-cover ${className}`}
    />
  );
}
