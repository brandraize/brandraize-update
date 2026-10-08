import { Blocks } from 'lucide-react';
import { firebaseConfig, firestoreRest } from './firebase/config';
import { work as defaultWork } from './proof';
import { serviceGroups as defaultServiceGroups, type ServiceGroup } from './services';
import type { Locale } from './site';

// Content managed from /admin, read on the server over Firestore's REST API.
// Every reader falls back to the content built into the code, so the site keeps working
// when the database is empty, not yet created, or unreachable.

type Text = Record<Locale, string>;

// How long the site may keep serving a cached copy before asking Firestore again.
const REVALIDATE_SECONDS = 60;

type FsValue = {
  stringValue?: string;
  integerValue?: string;
  doubleValue?: number;
  booleanValue?: boolean;
  timestampValue?: string;
  mapValue?: { fields?: Record<string, FsValue> };
  arrayValue?: { values?: FsValue[] };
};
type FsDoc = { name: string; fields?: Record<string, FsValue> };

function decode(value: FsValue): unknown {
  if (value.stringValue !== undefined) return value.stringValue;
  if (value.integerValue !== undefined) return Number(value.integerValue);
  if (value.doubleValue !== undefined) return value.doubleValue;
  if (value.booleanValue !== undefined) return value.booleanValue;
  if (value.timestampValue !== undefined) return value.timestampValue;
  if (value.mapValue) return decodeFields(value.mapValue.fields ?? {});
  if (value.arrayValue) return (value.arrayValue.values ?? []).map(decode);
  return null;
}

function decodeFields(fields: Record<string, FsValue>) {
  return Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, decode(value)]));
}

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${firestoreRest}/${path}${path.includes('?') ? '&' : '?'}key=${firebaseConfig.apiKey}`, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(5000),
    });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

type Row = Record<string, unknown> & { id: string };

// Published documents of a collection, in the admin's chosen order.
async function listPublished(collection: string): Promise<Row[]> {
  const data = await fetchJson<{ documents?: FsDoc[] }>(`${collection}?pageSize=100`);
  return (data?.documents ?? [])
    .map((doc) => ({ ...decodeFields(doc.fields ?? {}), id: doc.name.split('/').pop()! }) as Row)
    .filter((row) => row.published !== false)
    .sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0));
}

const text = (value: unknown): Text => {
  const v = (value ?? {}) as Partial<Text>;
  return { en: v.en ?? '', ar: v.ar || v.en || '' };
};

export const imageUrl = (imageId: unknown) => (imageId ? `/api/img/${imageId}` : '');

export type Project = {
  id: string;
  image: string;
  title: Text;
  category: Text;
  summary: Text;
  // Shown on the project's own page.
  details: Text;
  url: string;
  gallery: string[];
  // A full-page screenshot of the finished website, as strips stacked top to bottom.
  fullPage: string[];
};

const ids = (value: unknown) => (Array.isArray(value) ? value.map(imageUrl).filter(Boolean) : []);

const toProject = (row: Row): Project => ({
  id: row.id,
  image: imageUrl(row.imageId),
  title: text(row.title),
  category: text(row.category),
  summary: text(row.summary),
  details: text(row.details),
  url: String(row.url ?? ''),
  gallery: ids(row.galleryIds),
  fullPage: ids(row.fullPageIds),
});

const builtInProjects = (): Project[] =>
  defaultWork.map((item) => ({
    id: item.id,
    image: item.image,
    title: item.title,
    category: item.category,
    summary: item.summary,
    details: { en: '', ar: '' },
    url: '',
    gallery: [],
    fullPage: [],
  }));

export async function getProjects(): Promise<Project[]> {
  const rows = await listPublished('projects');
  return rows.length === 0 ? builtInProjects() : rows.map(toProject);
}

export async function getProject(id: string): Promise<Project | null> {
  const builtIn = builtInProjects().find((project) => project.id === id);
  if (builtIn) return builtIn;
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(id)) return null;

  const doc = await fetchJson<FsDoc>(`projects/${id}`);
  if (!doc?.fields) return null;
  const row = { ...decodeFields(doc.fields), id } as Row;
  return row.published === false ? null : toProject(row);
}

export type Review = { id: string; quote: Text; name: Text; project: Text; photo?: string };

export async function getTestimonials(): Promise<Review[]> {
  const rows = await listPublished('testimonials');
  return rows.map((row) => ({
    id: row.id,
    quote: text(row.quote),
    name: text(row.name),
    project: text(row.project),
    photo: imageUrl(row.imageId) || undefined,
  }));
}

export async function getClientLogos(): Promise<Array<{ src: string; name: string }>> {
  const rows = await listPublished('clients');
  return rows
    .filter((row) => row.imageId)
    .map((row) => ({ src: imageUrl(row.imageId), name: String(row.name ?? '') }));
}

// Services edited in the admin are stored as one JSON document without icons; icons are
// matched back by slug here, and services the admin added get a generic one.
export async function getServiceGroups(): Promise<ServiceGroup[]> {
  const doc = await fetchJson<FsDoc>('site/services');
  const json = doc?.fields?.json?.stringValue;
  if (!json) return defaultServiceGroups;

  try {
    const icons = new Map(defaultServiceGroups.flatMap((g) => g.services).map((s) => [s.slug, s.icon]));
    const groups = JSON.parse(json) as ServiceGroup[];
    return groups
      .map((group) => ({
        ...group,
        services: group.services.map((service) => ({ ...service, icon: icons.get(service.slug) ?? Blocks })),
      }))
      .filter((group) => group.services.length > 0);
  } catch {
    return defaultServiceGroups;
  }
}
