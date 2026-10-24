import type { MetadataRoute } from 'next';
import { getProjects, getServiceGroups } from '@/lib/cms';
import { defaultLocale, locales, site } from '@/lib/site';

const paths = ['', '/service', '/projects', '/about', '/contact', '/privacy', '/terms'];

const priority = (path: string) =>
  path === '' ? 1 : path.startsWith('/service/') ? 0.9 : path.startsWith('/projects/') ? 0.6 : 0.7;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, groups] = await Promise.all([getProjects(), getServiceGroups()]);
  const allPaths = [
    ...paths,
    ...groups.flatMap((group) => group.services.map((service) => `/service/${service.slug}`)),
    ...projects.map((project) => `/projects/${project.id}`),
  ];

  return allPaths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${site.url}/${locale}${path}`,
      changeFrequency: 'monthly' as const,
      priority: priority(path),
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${path}`])),
          'x-default': `${site.url}/${defaultLocale}${path}`,
        },
      },
    })),
  );
}
