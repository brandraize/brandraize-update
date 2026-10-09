import { Blocks } from 'lucide-react';
import { firebaseConfig, firestoreRest } from './firebase/config';
import { readProjectImages } from './local-projects';
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

// Every document of a collection, in the admin's chosen order.
async function listAll(collection: string): Promise<Row[]> {
  const data = await fetchJson<{ documents?: FsDoc[] }>(`${collection}?pageSize=100`);
  return (data?.documents ?? [])
    .map((doc) => ({ ...decodeFields(doc.fields ?? {}), id: doc.name.split('/').pop()! }) as Row)
    .sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0));
}

const listPublished = async (collection: string) =>
  (await listAll(collection)).filter((row) => row.published !== false);

const text = (value: unknown): Text => {
  const v = (value ?? {}) as Partial<Text>;
  return { en: v.en ?? '', ar: v.ar || v.en || '' };
};

export const imageUrl = (imageId: unknown) => (imageId ? `/api/img/${imageId}` : '');

type Lines = Record<Locale, string[]>;

export type Project = {
  id: string;
  // Empty when the project has no picture yet; a placeholder is shown instead.
  image: string;
  title: Text;
  category: Text;
  summary: Text;
  // Everything below is shown on the project's own page; each part is optional.
  details: Text;
  url: string;
  client: Text;
  industry: Text;
  year: string;
  services: Lines;
  challenge: Text;
  solution: Text;
  result: Text;
  features: Lines;
  technologies: string[];
  // Headline numbers, e.g. { value: '3 weeks', label: 'from brief to launch' }.
  stats: Record<Locale, Array<{ value: string; label: string }>>;
  // Client satisfaction: 0 means no rating was entered.
  rating: number;
  clientQuote: Text;
  clientPerson: Text;
  gallery: string[];
  // A full-page screenshot of the finished website, as strips stacked top to bottom.
  fullPage: string[];
};

const ids = (value: unknown) => (Array.isArray(value) ? value.map(imageUrl).filter(Boolean) : []);

// The admin types lists one item per line.
const toLines = (value: string) => value.split('\n').map((line) => line.trim()).filter(Boolean);
const lines = (value: unknown): Lines => {
  const t = text(value);
  return { en: toLines(t.en), ar: toLines(t.ar) };
};
// Headline numbers are typed as "value | label", one per line.
const toStats = (list: string[]) =>
  list
    .map((line) => line.split('|').map((part) => part.trim()))
    .filter((parts) => parts.length >= 2 && parts[0] && parts[1])
    .map(([value, label]) => ({ value, label }));

const emptyText = (): Text => ({ en: '', ar: '' });

const toProject = (row: Row): Project => {
  const stats = lines(row.stats);
  return {
    id: row.id,
    image: imageUrl(row.imageId),
    title: text(row.title),
    category: text(row.category),
    summary: text(row.summary),
    details: text(row.details),
    url: String(row.url ?? ''),
    client: text(row.client),
    industry: text(row.industry),
    year: String(row.year ?? ''),
    services: lines(row.services),
    challenge: text(row.challenge),
    solution: text(row.solution),
    result: text(row.result),
    features: lines(row.features),
    technologies: String(row.technologies ?? '').split(/[,\n]/).map((item) => item.trim()).filter(Boolean),
    stats: { en: toStats(stats.en), ar: toStats(stats.ar) },
    rating: Math.max(0, Math.min(5, Math.round(Number(row.rating) || 0))),
    clientQuote: text(row.clientQuote),
    clientPerson: text(row.clientPerson),
    gallery: ids(row.galleryIds),
    fullPage: ids(row.fullPageIds),
  };
};

const builtInProjects = (): Project[] => {
  const images = readProjectImages();
  return defaultWork.map((item) => ({
    id: item.id,
    image: item.image ?? images.get(item.id) ?? '',
    title: item.title,
    category: item.category,
    summary: item.summary,
    details: emptyText(),
    url: item.url ?? '',
    client: emptyText(),
    industry: emptyText(),
    year: '',
    services: { en: [], ar: [] },
    challenge: emptyText(),
    solution: emptyText(),
    result: item.result ?? emptyText(),
    features: { en: [], ar: [] },
    technologies: item.technologies ?? [],
    stats: { en: [], ar: [] },
    rating: 0,
    clientQuote: emptyText(),
    clientPerson: emptyText(),
    gallery: [],
    fullPage: [],
  }));
};

const titleKey = (title: unknown) => text(title).en.trim().toLowerCase();

// Projects from the admin come first, followed by the built-in ones. A built-in project is
// left out once the admin has one with the same English title, shown or hidden.
export async function getProjects(): Promise<Project[]> {
  const rows = await listAll('projects');
  const taken = new Set(rows.map((row) => titleKey(row.title)));
  return [
    ...rows.filter((row) => row.published !== false).map(toProject),
    ...builtInProjects().filter((project) => !taken.has(titleKey(project.title))),
  ];
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
