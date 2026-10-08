import { readLocalLogos } from '@/lib/local-logos';
import { work } from '@/lib/proof';

// The content the website shows before anything is added in the admin dashboard. The dashboard
// offers to import it, so the admin starts from what visitors already see.
export function GET() {
  return Response.json({
    projects: work.map((item) => ({
      image: item.image,
      data: { title: item.title, category: item.category, summary: item.summary },
    })),
    clients: readLocalLogos().map((logo) => ({ image: logo.src, data: { name: logo.name } })),
  });
}
