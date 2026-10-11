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

type Lines = Record<Locale, string[]>;

export type Project = {
  id: string;
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
  // A picture named after the project is picked up from /public/projects on its own.
  const images = readProjectImages();
  return defaultWork.map((item) => ({
    id: item.id,
    image: item.image ?? images.get(item.id) ?? '',
    title: item.title,
    category: item.category,
    summary: item.summary,
    details: item.details ?? emptyText(),
    url: item.url ?? '',
    client: item.client ?? emptyText(),
    industry: item.industry ?? emptyText(),
    year: item.year ?? '',
    services: item.services ?? { en: [], ar: [] },
    challenge: item.challenge ?? emptyText(),
    solution: item.solution ?? emptyText(),
    result: item.result ?? emptyText(),
    features: item.features ?? { en: [], ar: [] },
    technologies: item.technologies ?? [],
    stats: { en: [], ar: [] },
    rating: 0,
    clientQuote: emptyText(),
    clientPerson: emptyText(),
    gallery: item.gallery ?? [],
    fullPage: item.fullPage ?? [],
  }));
};

// The built-in projects, keyed by the website address they belong to.
const hostOf = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return '';
  }
};

const builtInByHost = () => {
  const map = new Map<string, Project>();
  for (const project of builtInProjects()) {
    const host = hostOf(project.url);
    if (host) map.set(host, project);
  }
  return map;
};

const orText = (value: Text, fallback: Text): Text => (value.en || value.ar ? value : fallback);
const orLines = (value: Lines, fallback: Lines): Lines => (value.en.length || value.ar.length ? value : fallback);

// The dashboard owns the projects, but the content prepared in the code carries the pictures
// and details it may not have yet. A project is matched to its built-in entry by website
// address, and only what is still missing is filled in — so a picture or text added in the
// dashboard always wins, and deleting a project still removes it completely.
const withBuiltInContent = (project: Project, byHost: Map<string, Project>): Project => {
  const builtIn = byHost.get(hostOf(project.url));
  if (!builtIn) return project;
  return {
    ...project,
    image: project.image || builtIn.image,
    gallery: project.gallery.length > 0 ? project.gallery : builtIn.gallery,
    fullPage: project.fullPage.length > 0 ? project.fullPage : builtIn.fullPage,
    details: orText(project.details, builtIn.details),
    client: orText(project.client, builtIn.client),
    industry: orText(project.industry, builtIn.industry),
    year: project.year || builtIn.year,
    services: orLines(project.services, builtIn.services),
    challenge: orText(project.challenge, builtIn.challenge),
    solution: orText(project.solution, builtIn.solution),
    result: orText(project.result, builtIn.result),
    features: orLines(project.features, builtIn.features),
    technologies: project.technologies.length > 0 ? project.technologies : builtIn.technologies,
  };
};

// The admin sets this marker the first time it adds, imports or deletes a project, so that
// built-in projects are never shown again once the list is managed in the dashboard. Without
// it, deleting the last project would make the built-in ones reappear on the public site.
async function projectsManaged(): Promise<boolean> {
  const doc = await fetchJson<FsDoc>('site/projects');
  return doc?.fields?.managed?.booleanValue === true;
}

export async function getProjects(): Promise<Project[]> {
  const rows = await listPublished('projects');
  const byHost = builtInByHost();
  const managed = await projectsManaged();

  if (rows.length === 0) {
    // Nothing published. Show the built-in projects only until the admin manages them here.
    return managed ? [] : builtInProjects();
  }

  const projects = rows.map((row) => withBuiltInContent(toProject(row), byHost));
  if (managed) return projects;

  // The dashboard has not taken the list over yet, so projects that only exist in the code are
  // shown as well. Otherwise work prepared for the site would stay invisible until it is synced,
  // and as soon as anything is added, edited or deleted in the dashboard this stops, so a
  // deleted project can never come back.
  const hosts = new Set(projects.map((project) => hostOf(project.url)).filter(Boolean));
  const names = new Set(projects.map((project) => project.title.en.trim().toLowerCase()).filter(Boolean));
  const missing = builtInProjects().filter((project) => {
    const host = hostOf(project.url);
    return !(host && hosts.has(host)) && !names.has(project.title.en.trim().toLowerCase());
  });

  return [...projects, ...missing];
}

export async function getProject(id: string): Promise<Project | null> {
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(id)) return null;

  const doc = await fetchJson<FsDoc>(`projects/${id}`);
  if (doc?.fields) {
    const row = { ...decodeFields(doc.fields), id } as Row;
    return row.published === false ? null : withBuiltInContent(toProject(row), builtInByHost());
  }

  // Not in the database: serve a built-in project only while the admin has not taken over.
  if (await projectsManaged()) return null;
  return builtInProjects().find((project) => project.id === id) ?? null;
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
