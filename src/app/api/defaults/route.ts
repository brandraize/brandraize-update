import { readLocalLogos } from '@/lib/local-logos';
import { readProjectImages } from '@/lib/local-projects';
import { work } from '@/lib/proof';

// Bilingual fields with one item per line are edited as plain text in the dashboard, so the
// lists built into the code are joined back into that shape here.
const lines = (value?: { en?: string[]; ar?: string[] }) => ({
  en: (value?.en ?? []).join('\n'),
  ar: (value?.ar ?? []).join('\n'),
});

// The content the website shows before anything is added in the admin dashboard. The dashboard
// offers to import it, so the admin starts from what visitors already see.
export function GET() {
  const images = readProjectImages();
  return Response.json({
    projects: work.map((item) => ({
      image: item.image ?? images.get(item.id) ?? '',
      // Only the fields this built-in project actually defines are sent, so importing never
      // blanks out content that already exists in the dashboard.
      data: {
        title: item.title,
        category: item.category,
        summary: item.summary,
        details: item.details,
        url: item.url,
        client: item.client,
        industry: item.industry,
        year: item.year,
        services: item.services ? lines(item.services) : undefined,
        challenge: item.challenge,
        solution: item.solution,
        result: item.result,
        features: item.features ? lines(item.features) : undefined,
        technologies: item.technologies?.length ? item.technologies.join(', ') : undefined,
      },
      gallery: item.gallery ?? [],
      fullPage: item.fullPage ?? [],
    })),
    clients: readLocalLogos().map((logo) => ({ image: logo.src, data: { name: logo.name } })),
  });
}
