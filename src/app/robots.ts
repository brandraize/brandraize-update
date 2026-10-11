import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    // /api/img/ serves the project and client pictures, which search engines should see.
    rules: { userAgent: '*', allow: ['/', '/api/img/'], disallow: ['/api/', '/admin'] },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
