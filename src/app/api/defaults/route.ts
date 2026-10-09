import { readLocalLogos } from '@/lib/local-logos';
import { readProjectImages } from '@/lib/local-projects';
import { work } from '@/lib/proof';

// The content the website shows before anything is added in the admin dashboard. The dashboard
// offers to import it, so the admin starts from what visitors already see.
export function GET() {
  const images = readProjectImages();
  return Response.json({
    projects: work.map((item) => ({
      image: item.image ?? images.get(item.id) ?? '',
      data: {
        title: item.title,
        category: item.category,
        summary: item.summary,
        url: item.url ?? '',
        result: item.result ?? { en: '', ar: '' },
        technologies: (item.technologies ?? []).join(', '),
      },
    })),
    clients: readLocalLogos().map((logo) => ({ image: logo.src, data: { name: logo.name } })),
  });
}
