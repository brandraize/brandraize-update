'use client';

import { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { Download, ImagePlus, Loader2, Pencil, Plus, Trash2, X } from 'lucide-react';
import { db } from '@/lib/firebase/client';
import { compressImage, removeImage, saveImage, sliceTallImage } from '@/lib/firebase/images';
import { cardClass, dangerButton, errorMessage, ghostButton, inputClass, labelClass, primaryButton } from './ui';

export type Field = {
  key: string;
  label: string;
  // Bilingual fields are stored as { en, ar }; others as a plain string.
  bilingual?: boolean;
  // Number of text rows; fields without it are a single line.
  rows?: number;
  hint?: string;
  // Starts a new group in the form, with this heading above the field.
  section?: string;
};

type CollectionPanelProps = {
  // Firestore collection: "projects", "testimonials" or "clients".
  name: string;
  // Singular noun for buttons and messages, e.g. "project".
  noun: string;
  intro: string;
  fields: Field[];
  image: { label: string; required: boolean; maxSide: number };
  // Extra pictures shown as a gallery (stored as galleryIds).
  gallery?: { label: string; hint: string; max: number };
  // One very tall screenshot shown as a scrolling preview (stored in strips as fullPageIds).
  fullPage?: { label: string; hint: string };
  // Which field to show as the title of each row.
  titleField: string;
  // Key in /api/defaults holding what the website shows for this section before the admin adds anything.
  defaultsKey?: 'projects' | 'clients';
  // Built-in items stay on the website next to the added ones, until one with the same title
  // is added here. Without it, the first added item replaces all the built-in ones.
  defaultsStay?: boolean;
};

type DefaultItem = { image: string; data: Record<string, unknown> };

type Item = Record<string, unknown> & {
  id: string;
  imageId?: string;
  galleryIds?: string[];
  fullPageIds?: string[];
  order?: number;
  published?: boolean;
};

type Draft = {
  id?: string;
  values: Record<string, string>;
  imageId?: string;
  newImage?: string;
  // Gallery pictures already saved, and ones picked in this edit (as data URLs).
  galleryIds: string[];
  newGallery: string[];
  // The saved full-page screenshot, and a replacement picked in this edit. An empty
  // replacement array means "remove it".
  fullPageIds: string[];
  newFullPage: string[] | null;
  order: number;
  published: boolean;
};

const en = (value: unknown) =>
  typeof value === 'string' ? value : ((value as { en?: string } | undefined)?.en ?? '');

export default function CollectionPanel({
  name,
  noun,
  intro,
  fields,
  image,
  gallery,
  fullPage,
  titleField,
  defaultsKey,
  defaultsStay,
}: CollectionPanelProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [draft, setDraft] = useState<Draft | null>(null);
  // Image ids removed in the form; deleted from storage only once the form is saved.
  const [removed, setRemoved] = useState<string[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [defaults, setDefaults] = useState<DefaultItem[]>([]);
  const [importing, setImporting] = useState<string | null>(null);

  useEffect(
    () =>
      onSnapshot(
        collection(db, name),
        (snapshot) => {
          const rows = snapshot.docs.map((d) => ({ ...d.data(), id: d.id }) as Item);
          setItems(rows.sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0)));
          setLoaded(true);
        },
        (e) => setError(errorMessage(e)),
      ),
    [name],
  );

  // What the website currently shows for this section from its built-in content.
  useEffect(() => {
    if (!defaultsKey) return;
    fetch('/api/defaults')
      .then((res) => res.json())
      .then((data) => setDefaults(data[defaultsKey] ?? []))
      .catch(() => setDefaults([]));
  }, [defaultsKey]);

  // Built-in items the website still shows: the ones not yet added here under the same title.
  const titleKey = (value: unknown) => en(value).trim().toLowerCase();
  const taken = new Set(items.map((item) => titleKey(item[titleField])));
  const builtIn =
    defaultsStay || items.length === 0 ? defaults.filter((item) => !taken.has(titleKey(item.data[titleField]))) : [];

  // Copies built-in items into the database so they can be edited here like any other.
  const importDefaults = async (list: DefaultItem[]) => {
    setError(null);
    const firstOrder = (items.at(-1)?.order ?? 0) + 1;
    try {
      for (const [i, item] of list.entries()) {
        setImporting(`Importing ${i + 1} of ${list.length}…`);
        // Built-in projects may not have a picture yet; it can be added here afterwards.
        const blob = item.image ? await (await fetch(item.image)).blob() : null;
        const imageId = blob && (await saveImage(await compressImage(new File([blob], 'image'), image.maxSide)));
        await addDoc(collection(db, name), {
          ...item.data,
          ...(imageId ? { imageId } : {}),
          order: firstOrder + i,
          published: true,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setImporting(null);
    }
  };

  const open = (next: Draft) => {
    setRemoved([]);
    setError(null);
    setDraft(next);
  };

  const startNew = () =>
    open({
      values: {},
      galleryIds: [],
      newGallery: [],
      fullPageIds: [],
      newFullPage: null,
      order: (items.at(-1)?.order ?? 0) + 1,
      published: true,
    });

  const startEdit = (item: Item) => {
    const values: Record<string, string> = {};
    for (const field of fields) {
      const value = item[field.key];
      if (field.bilingual) {
        const v = (value ?? {}) as { en?: string; ar?: string };
        values[`${field.key}.en`] = v.en ?? '';
        values[`${field.key}.ar`] = v.ar ?? '';
      } else {
        values[field.key] = String(value ?? '');
      }
    }
    open({
      id: item.id,
      values,
      imageId: item.imageId,
      galleryIds: item.galleryIds ?? [],
      newGallery: [],
      fullPageIds: item.fullPageIds ?? [],
      newFullPage: null,
      order: item.order ?? 0,
      published: item.published !== false,
    });
  };

  // Runs an image-processing step, showing its failure in the form instead of losing it.
  const withImages = async (work: () => Promise<void>) => {
    setError(null);
    try {
      await work();
    } catch (e) {
      setError(errorMessage(e));
    }
  };

  const pickImage = (file: File | undefined) =>
    withImages(async () => {
      if (!file) return;
      const newImage = await compressImage(file, image.maxSide);
      setDraft((d) => (d ? { ...d, newImage } : d));
    });

  const pickGallery = (files: FileList | null) =>
    withImages(async () => {
      if (!files || !draft || !gallery) return;
      const room = gallery.max - draft.galleryIds.length - draft.newGallery.length;
      const picked = await Promise.all([...files].slice(0, Math.max(0, room)).map((file) => compressImage(file, 1600)));
      setDraft((d) => (d ? { ...d, newGallery: [...d.newGallery, ...picked] } : d));
      if (files.length > room) setError(`Only ${gallery.max} gallery images are allowed; the extra ones were skipped.`);
    });

  const pickFullPage = (file: File | undefined) =>
    withImages(async () => {
      if (!file) return;
      const strips = await sliceTallImage(file);
      setDraft((d) => (d ? { ...d, newFullPage: strips } : d));
    });

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    if (image.required && !draft.newImage && !draft.imageId) {
      setError(`Please choose an image for this ${noun}.`);
      return;
    }

    setError(null);
    try {
      const data: Record<string, unknown> = { order: draft.order, published: draft.published, updatedAt: serverTimestamp() };
      for (const field of fields) {
        data[field.key] = field.bilingual
          ? { en: (draft.values[`${field.key}.en`] ?? '').trim(), ar: (draft.values[`${field.key}.ar`] ?? '').trim() }
          : (draft.values[field.key] ?? '').trim();
      }

      const stale = [...removed];
      if (draft.newImage) {
        setBusy('Uploading image…');
        data.imageId = await saveImage(draft.newImage);
        if (draft.imageId) stale.push(draft.imageId);
      }
      if (gallery) {
        const added: string[] = [];
        for (const [i, picture] of draft.newGallery.entries()) {
          setBusy(`Uploading gallery image ${i + 1} of ${draft.newGallery.length}…`);
          added.push(await saveImage(picture));
        }
        data.galleryIds = [...draft.galleryIds, ...added];
      }
      if (fullPage && draft.newFullPage) {
        const added: string[] = [];
        for (const [i, strip] of draft.newFullPage.entries()) {
          setBusy(`Uploading website screenshot, part ${i + 1} of ${draft.newFullPage.length}…`);
          added.push(await saveImage(strip));
        }
        data.fullPageIds = added;
        stale.push(...draft.fullPageIds);
      }

      setBusy('Saving…');
      if (draft.id) await updateDoc(doc(db, name, draft.id), data);
      else await addDoc(collection(db, name), { ...data, createdAt: serverTimestamp() });

      // Pictures that were replaced or removed are no longer referenced by anything.
      await Promise.all(stale.map((id) => removeImage(id)));
      setDraft(null);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(null);
    }
  };

  const remove = async (item: Item) => {
    if (!window.confirm(`Delete this ${noun}? This cannot be undone.`)) return;
    try {
      await deleteDoc(doc(db, name, item.id));
      await Promise.all(
        [item.imageId, ...(item.galleryIds ?? []), ...(item.fullPageIds ?? [])].map((id) => removeImage(id)),
      );
    } catch (e) {
      setError(errorMessage(e));
    }
  };

  const set = (key: string, value: string) =>
    setDraft((d) => (d ? { ...d, values: { ...d.values, [key]: value } } : d));

  const input = (key: string, field: Field, dir: 'ltr' | 'rtl') =>
    field.rows ? (
      <textarea rows={field.rows} dir={dir} value={draft?.values[key] ?? ''} onChange={(e) => set(key, e.target.value)} className={inputClass} />
    ) : (
      <input type="text" dir={dir} value={draft?.values[key] ?? ''} onChange={(e) => set(key, e.target.value)} className={inputClass} />
    );

  const fullPageParts = draft?.newFullPage ?? draft?.fullPageIds ?? [];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-2xl text-[15px] text-slate-600">{intro}</p>
        {!draft && (
          <button type="button" onClick={startNew} className={primaryButton}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add {noun}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">{error}</p>
      )}

      {draft && (
        <form onSubmit={save} className={`${cardClass} mt-5 space-y-6`}>
          <h3 className="text-lg font-extrabold text-ink-900">{draft.id ? `Edit ${noun}` : `New ${noun}`}</h3>

          {fields.map((field) => (
            <div key={field.key}>
              {field.section && (
                <h4 className="mb-4 border-t border-sand-200 pt-6 text-sm font-extrabold uppercase tracking-widest text-gold-700">
                  {field.section}
                </h4>
              )}
              {field.bilingual ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>{field.label} (English)</label>
                    {input(`${field.key}.en`, field, 'ltr')}
                  </div>
                  <div>
                    <label className={labelClass}>{field.label} (Arabic)</label>
                    {input(`${field.key}.ar`, field, 'rtl')}
                  </div>
                </div>
              ) : (
                <>
                  <label className={labelClass}>{field.label}</label>
                  {input(field.key, field, 'ltr')}
                </>
              )}
              {field.hint && <p className="mt-1 text-sm text-slate-500">{field.hint}</p>}
            </div>
          ))}

          {/* Main image */}
          <div>
            <span className={labelClass}>
              {image.label} {image.required ? '' : '(optional)'}
            </span>
            <div className="flex flex-wrap items-center gap-4">
              {(draft.newImage || draft.imageId) && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={draft.newImage ?? `/api/img/${draft.imageId}`}
                  alt=""
                  className="h-24 max-w-[12rem] rounded-xl border border-sand-200 bg-sand-50 object-contain"
                />
              )}
              <label className={`${ghostButton} cursor-pointer`}>
                <ImagePlus className="h-4 w-4" aria-hidden="true" />
                {draft.newImage || draft.imageId ? 'Change image' : 'Choose image'}
                <input type="file" accept="image/*" className="sr-only" onChange={(e) => pickImage(e.target.files?.[0])} />
              </label>
            </div>
          </div>

          {/* Gallery */}
          {gallery && (
            <div>
              <span className={labelClass}>{gallery.label} (optional)</span>
              <p className="mb-3 text-sm text-slate-500">{gallery.hint}</p>
              <div className="flex flex-wrap gap-3">
                {draft.galleryIds.map((id) => (
                  <div key={id} className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/api/img/${id}`} alt="" className="h-24 w-32 rounded-xl border border-sand-200 object-cover" />
                    <button
                      type="button"
                      aria-label="Remove image"
                      onClick={() => {
                        setRemoved((list) => [...list, id]);
                        setDraft({ ...draft, galleryIds: draft.galleryIds.filter((x) => x !== id) });
                      }}
                      className="absolute -end-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white shadow"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                ))}
                {draft.newGallery.map((picture, i) => (
                  <div key={i} className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={picture} alt="" className="h-24 w-32 rounded-xl border-2 border-gold-500 object-cover" />
                    <button
                      type="button"
                      aria-label="Remove image"
                      onClick={() => setDraft({ ...draft, newGallery: draft.newGallery.filter((_, x) => x !== i) })}
                      className="absolute -end-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white shadow"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                ))}
                {draft.galleryIds.length + draft.newGallery.length < gallery.max && (
                  <label className="flex h-24 w-32 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-sand-200 text-sm font-bold text-slate-500 hover:border-gold-500 hover:text-ink-900">
                    <ImagePlus className="h-5 w-5" aria-hidden="true" />
                    Add images
                    <input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => pickGallery(e.target.files)} />
                  </label>
                )}
              </div>
            </div>
          )}

          {/* Full-page screenshot */}
          {fullPage && (
            <div>
              <span className={labelClass}>{fullPage.label} (optional)</span>
              <p className="mb-3 text-sm text-slate-500">{fullPage.hint}</p>
              <div className="flex flex-wrap items-start gap-4">
                {fullPageParts.length > 0 && (
                  <div className="h-48 w-40 overflow-y-auto rounded-xl border border-sand-200 bg-sand-50">
                    {fullPageParts.map((part, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={i} src={draft.newFullPage ? part : `/api/img/${part}`} alt="" className="block w-full" />
                    ))}
                  </div>
                )}
                <div className="flex flex-col items-start gap-2">
                  <label className={`${ghostButton} cursor-pointer`}>
                    <ImagePlus className="h-4 w-4" aria-hidden="true" />
                    {fullPageParts.length > 0 ? 'Replace screenshot' : 'Choose screenshot'}
                    <input type="file" accept="image/*" className="sr-only" onChange={(e) => pickFullPage(e.target.files?.[0])} />
                  </label>
                  {fullPageParts.length > 0 && (
                    <button type="button" onClick={() => setDraft({ ...draft, newFullPage: [] })} className={dangerButton}>
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                      Remove screenshot
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2 text-sm font-bold text-ink-800">
              <input
                type="checkbox"
                checked={draft.published}
                onChange={(e) => setDraft({ ...draft, published: e.target.checked })}
                className="h-4 w-4 accent-[#d9a521]"
              />
              Show on the website
            </label>
            <label className="flex items-center gap-2 text-sm font-bold text-ink-800">
              Position
              <input
                type="number"
                value={draft.order}
                onChange={(e) => setDraft({ ...draft, order: Number(e.target.value) })}
                className={`${inputClass} w-24`}
              />
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" disabled={busy !== null} className={primaryButton}>
              {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
              {busy ?? 'Save'}
            </button>
            <button type="button" onClick={() => setDraft(null)} disabled={busy !== null} className={ghostButton}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {!draft && loaded && items.length === 0 && builtIn.length === 0 && !error && (
        <div className={`${cardClass} mt-5`}>
          <p className="text-slate-600">Nothing added yet. Press &ldquo;Add {noun}&rdquo; to create the first one.</p>
        </div>
      )}

      {!draft && (
        <ul className="mt-5 space-y-3">
          {items.map((item) => (
            <li key={item.id} className={`${cardClass} flex flex-wrap items-center gap-4`}>
              {item.imageId ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={`/api/img/${item.imageId}`} alt="" className="h-16 w-24 flex-none rounded-lg bg-sand-50 object-contain" />
              ) : (
                <span className="h-16 w-24 flex-none rounded-lg bg-sand-50" />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-extrabold text-ink-900">{en(item[titleField]) || `(untitled ${noun})`}</p>
                <p className="text-sm text-slate-500">
                  Position {item.order ?? 0} · {item.published === false ? 'Hidden' : 'Shown on the website'}
                  {gallery && ` · ${item.galleryIds?.length ?? 0} gallery images`}
                  {fullPage && ` · ${item.fullPageIds?.length ? 'has' : 'no'} website screenshot`}
                </p>
              </div>
              <button type="button" onClick={() => startEdit(item)} className={ghostButton}>
                <Pencil className="h-4 w-4" aria-hidden="true" />
                Edit
              </button>
              <button type="button" onClick={() => remove(item)} className={dangerButton}>
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Built-in items the website shows that are not in the database yet */}
      {!draft && loaded && builtIn.length > 0 && (
        <div className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-bold text-ink-900">
                The website is also showing {builtIn.length} built-in {noun}{builtIn.length === 1 ? '' : 's'}.
              </p>
              <p className="mt-1 max-w-2xl text-[15px] text-slate-600">
                {builtIn.length === 1 ? 'It comes' : 'They come'} with the website and {builtIn.length === 1 ? 'is' : 'are'} not saved in the dashboard yet. Import {builtIn.length === 1 ? 'it' : 'them'} to edit, hide or delete {builtIn.length === 1 ? 'it' : 'them'} here.
              </p>
            </div>
            <button type="button" onClick={() => importDefaults(builtIn)} disabled={importing !== null} className={primaryButton}>
              {importing ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Download className="h-4 w-4" aria-hidden="true" />}
              {importing ?? `Import all ${builtIn.length}`}
            </button>
          </div>

          <ul className="mt-4 space-y-3">
            {builtIn.map((item, i) => (
              <li key={i} className={`${cardClass} flex flex-wrap items-center gap-4`}>
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.image} alt="" className="h-16 w-24 flex-none rounded-lg bg-sand-50 object-contain" />
                ) : (
                  <span className="h-16 w-24 flex-none rounded-lg bg-sand-50" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-extrabold text-ink-900">{en(item.data[titleField]) || `(untitled ${noun})`}</p>
                  <p className="text-sm text-slate-500">Built-in · Shown on the website</p>
                </div>
                <button type="button" onClick={() => importDefaults([item])} disabled={importing !== null} className={ghostButton}>
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Import to edit
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
