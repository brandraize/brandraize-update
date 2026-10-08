import { firebaseConfig, firestoreRest } from '@/lib/firebase/config';

type FsImage = { fields?: { data?: { stringValue?: string }; type?: { stringValue?: string } } };

// Serves an image uploaded from the admin dashboard. Uploads are stored in Firestore
// (collection "images") and never change once created, so browsers may cache them for good.
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(id)) return new Response('Not found', { status: 404 });

  const res = await fetch(`${firestoreRest}/images/${id}?key=${firebaseConfig.apiKey}`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) return new Response('Not found', { status: 404 });

  const doc = (await res.json()) as FsImage;
  const data = doc.fields?.data?.stringValue;
  if (!data) return new Response('Not found', { status: 404 });

  return new Response(Buffer.from(data, 'base64'), {
    headers: {
      'Content-Type': doc.fields?.type?.stringValue ?? 'image/webp',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
