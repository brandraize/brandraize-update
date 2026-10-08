'use client';

import { useEffect, useState } from 'react';
import { deleteDoc, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { ArrowDown, ArrowUp, Loader2, Plus, Trash2 } from 'lucide-react';
import { db } from '@/lib/firebase/client';
import { serviceGroups as builtIn, type Service } from '@/lib/services';
import { cardClass, dangerButton, errorMessage, ghostButton, inputClass, labelClass, primaryButton } from './ui';

// Services are saved as one document (site/services) without their icons, which are code.
type PlainService = Omit<Service, 'icon'>;
type PlainGroup = { id: string; title: Service['name']; summary: Service['name']; services: PlainService[] };

const strip = (): PlainGroup[] =>
  builtIn.map((group) => ({
    ...group,
    services: group.services.map((service) => {
      const plain: Partial<Service> = { ...service };
      delete plain.icon;
      return plain as PlainService;
    }),
  }));

const slugify = (value: string) =>
  value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const emptyService = (slug: string, name: string): PlainService => ({
  slug,
  name: { en: name, ar: '' },
  tagline: { en: '', ar: '' },
  description: { en: '', ar: '' },
  bestFor: { en: '', ar: '' },
  includes: { en: [], ar: [] },
});

const textFields = [
  { key: 'name', label: 'Service name', multiline: false },
  { key: 'tagline', label: 'One-line summary', multiline: false },
  { key: 'description', label: 'Description', multiline: true },
  { key: 'bestFor', label: 'Best for', multiline: true },
] as const;

export default function ServicesPanel() {
  const [groups, setGroups] = useState<PlainGroup[] | null>(null);
  const [selected, setSelected] = useState<[number, number]>([0, 0]);
  const [customised, setCustomised] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    getDoc(doc(db, 'site', 'services'))
      .then((snapshot) => {
        const json = snapshot.data()?.json as string | undefined;
        setCustomised(Boolean(json));
        setGroups(json ? (JSON.parse(json) as PlainGroup[]) : strip());
      })
      .catch((e) => {
        setMessage({ ok: false, text: errorMessage(e) });
        setGroups(strip());
      });
  }, []);

  if (!groups) return <p className="text-slate-600">Loading services…</p>;

  const [g, s] = selected;
  const service = groups[g]?.services[s];

  // Apply a change to the service being edited.
  const update = (change: (service: PlainService) => PlainService) => {
    setGroups(groups.map((group, gi) =>
      gi !== g ? group : { ...group, services: group.services.map((item, si) => (si === s ? change(item) : item)) },
    ));
    setDirty(true);
    setMessage(null);
  };

  const addService = (groupIndex: number) => {
    const name = window.prompt('Name of the new service (English):')?.trim();
    if (!name) return;
    const taken = new Set(groups.flatMap((group) => group.services.map((item) => item.slug)));
    let slug = slugify(name) || 'service';
    while (taken.has(slug)) slug += '-2';

    setGroups(groups.map((group, gi) =>
      gi === groupIndex ? { ...group, services: [...group.services, emptyService(slug, name)] } : group,
    ));
    setSelected([groupIndex, groups[groupIndex].services.length]);
    setDirty(true);
  };

  const removeService = () => {
    if (!service || !window.confirm(`Remove "${service.name.en}" from the website?`)) return;
    setGroups(groups.map((group, gi) =>
      gi === g ? { ...group, services: group.services.filter((_, si) => si !== s) } : group,
    ));
    setSelected([g, Math.max(0, s - 1)]);
    setDirty(true);
  };

  const move = (step: 1 | -1) => {
    const list = [...groups[g].services];
    const target = s + step;
    if (target < 0 || target >= list.length) return;
    [list[s], list[target]] = [list[target], list[s]];
    setGroups(groups.map((group, gi) => (gi === g ? { ...group, services: list } : group)));
    setSelected([g, target]);
    setDirty(true);
  };

  const save = async () => {
    setBusy(true);
    try {
      await setDoc(doc(db, 'site', 'services'), { json: JSON.stringify(groups), updatedAt: serverTimestamp() });
      setDirty(false);
      setCustomised(true);
      setMessage({ ok: true, text: 'Saved. The website shows the change within about a minute.' });
    } catch (e) {
      setMessage({ ok: false, text: errorMessage(e) });
    } finally {
      setBusy(false);
    }
  };

  const reset = async () => {
    if (!window.confirm('Discard all service edits and go back to the original built-in services?')) return;
    setBusy(true);
    try {
      await deleteDoc(doc(db, 'site', 'services'));
      setGroups(strip());
      setSelected([0, 0]);
      setDirty(false);
      setCustomised(false);
      setMessage({ ok: true, text: 'Restored the original services.' });
    } catch (e) {
      setMessage({ ok: false, text: errorMessage(e) });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-2xl text-[15px] text-slate-600">
          Edit the text of the Services page. Pick a service on the left, change it, then press Save.
        </p>
        <div className="flex gap-2">
          {customised && (
            <button type="button" onClick={reset} disabled={busy} className={ghostButton}>
              Restore originals
            </button>
          )}
          <button type="button" onClick={save} disabled={busy || !dirty} className={primaryButton}>
            {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {dirty ? 'Save changes' : 'Saved'}
          </button>
        </div>
      </div>

      {message && (
        <p
          role="status"
          className={`mt-4 rounded-xl border p-4 text-sm ${message.ok ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-red-200 bg-red-50 text-red-800'}`}
        >
          {message.text}
        </p>
      )}

      <div className="mt-5 grid gap-5 lg:grid-cols-[18rem_1fr]">
        {/* Service list */}
        <div className="space-y-4">
          {groups.map((group, gi) => (
            <div key={group.id} className={cardClass}>
              <p className="text-xs font-bold uppercase tracking-widest text-gold-700">{group.title.en}</p>
              <ul className="mt-2 space-y-1">
                {group.services.map((item, si) => (
                  <li key={item.slug}>
                    <button
                      type="button"
                      onClick={() => setSelected([gi, si])}
                      className={`w-full rounded-lg px-3 py-2 text-start text-sm font-bold transition-colors ${
                        gi === g && si === s ? 'bg-ink-900 text-gold-400' : 'text-ink-900 hover:bg-sand-50'
                      }`}
                    >
                      {item.name.en || item.slug}
                    </button>
                  </li>
                ))}
              </ul>
              <button type="button" onClick={() => addService(gi)} className="mt-2 inline-flex items-center gap-1.5 px-3 py-2 text-sm font-bold text-gold-700">
                <Plus className="h-4 w-4" aria-hidden="true" />
                Add service
              </button>
            </div>
          ))}
        </div>

        {/* Editor */}
        {service ? (
          <div className={`${cardClass} space-y-5`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-slate-500">
                Link: <span className="font-mono">/service#{service.slug}</span>
              </p>
              <div className="flex gap-2">
                <button type="button" onClick={() => move(-1)} aria-label="Move up" className={ghostButton}>
                  <ArrowUp className="h-4 w-4" aria-hidden="true" />
                </button>
                <button type="button" onClick={() => move(1)} aria-label="Move down" className={ghostButton}>
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </button>
                <button type="button" onClick={removeService} className={dangerButton}>
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                  Remove
                </button>
              </div>
            </div>

            {textFields.map((field) => (
              <div key={field.key} className="grid gap-4 sm:grid-cols-2">
                {(['en', 'ar'] as const).map((lang) => {
                  const props = {
                    dir: lang === 'ar' ? ('rtl' as const) : ('ltr' as const),
                    value: service[field.key][lang],
                    className: inputClass,
                    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                      update((item) => ({ ...item, [field.key]: { ...item[field.key], [lang]: e.target.value } })),
                  };
                  return (
                    <div key={lang}>
                      <label className={labelClass}>
                        {field.label} ({lang === 'en' ? 'English' : 'Arabic'})
                      </label>
                      {field.multiline ? <textarea rows={3} {...props} /> : <input type="text" {...props} />}
                    </div>
                  );
                })}
              </div>
            ))}

            <div className="grid gap-4 sm:grid-cols-2">
              {(['en', 'ar'] as const).map((lang) => (
                <div key={lang}>
                  <label className={labelClass}>
                    What you get — one item per line ({lang === 'en' ? 'English' : 'Arabic'})
                  </label>
                  <textarea
                    rows={5}
                    dir={lang === 'ar' ? 'rtl' : 'ltr'}
                    value={service.includes[lang].join('\n')}
                    onChange={(e) =>
                      update((item) => ({ ...item, includes: { ...item.includes, [lang]: e.target.value.split('\n') } }))
                    }
                    onBlur={() =>
                      update((item) => ({
                        ...item,
                        includes: { ...item.includes, [lang]: item.includes[lang].map((line) => line.trim()).filter(Boolean) },
                      }))
                    }
                    className={inputClass}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className={`${cardClass} text-slate-600`}>Pick a service on the left, or add one.</p>
        )}
      </div>
    </div>
  );
}
