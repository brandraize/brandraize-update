import type { MetadataRoute } from 'next';
import { getProjects } from '@/lib/cms';
import { locales, site } from '@/lib/site';

const paths = ['', '/service', '/projects', '/about', '/contact', '/privacy', '/terms'];

const priority = (path: string) => (path === '' ? 1 : path.startsWith('/projects/') ? 0.6 : 0.7);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const allPaths = [...paths, ...projects.map((project) => `/projects/${project.id}`)];

  return allPaths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${site.url}/${locale}${path}`,
      changeFrequency: 'monthly' as const,
      priority: priority(path),
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${path}`])),
          'x-default': `${site.url}/en${path}`,
        },
      },
    })),
  );
}
