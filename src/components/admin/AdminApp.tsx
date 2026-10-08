'use client';

import { useEffect, useRef, useState } from 'react';
import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { ExternalLink, Loader2, LogOut } from 'lucide-react';
import Logo from '@/components/Logo';
import { auth, db } from '@/lib/firebase/client';
import CollectionPanel from './CollectionPanel';
import LeadsPanel, { type Lead } from './LeadsPanel';
import ServicesPanel from './ServicesPanel';
import { errorMessage, inputClass, labelClass, primaryButton } from './ui';

const tabs = [
  { id: 'leads', label: 'Requests' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'testimonials', label: 'Client feedback' },
  { id: 'clients', label: 'Client logos' },
] as const;
type TabId = (typeof tabs)[number]['id'];

/* ─── Login ──────────────────────────────────────────── */
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch {
      setMessage({ ok: false, text: 'Wrong email or password.' });
    } finally {
      setBusy(false);
    }
  };

  const reset = async () => {
    if (!email.trim()) {
      setMessage({ ok: false, text: 'Type your email above first, then press "Forgot password".' });
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setMessage({ ok: true, text: 'If that account exists, a password reset email is on its way.' });
    } catch (e) {
      setMessage({ ok: false, text: errorMessage(e) });
    }
  };

  return (
    <main className="bg-dots flex min-h-screen items-center justify-center bg-ink-950 px-4 py-10">
      <form onSubmit={submit} className="w-full max-w-sm rounded-3xl bg-white p-7 shadow-2xl">
        <div className="mx-auto w-fit rounded-2xl bg-ink-950 px-4 py-2">
          <Logo className="h-12" priority />
        </div>
        <h1 className="mt-6 text-center text-2xl font-extrabold text-ink-900">Admin dashboard</h1>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="admin-email" className={labelClass}>Email</label>
            <input
              id="admin-email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="admin-password" className={labelClass}>Password</label>
            <input
              id="admin-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {message && (
          <p role="alert" className={`mt-4 text-sm font-medium ${message.ok ? 'text-emerald-700' : 'text-red-700'}`}>
            {message.text}
          </p>
        )}

        <button type="submit" disabled={busy} className={`${primaryButton} mt-6 w-full py-3`}>
          {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          Sign in
        </button>
        <button type="button" onClick={reset} className="mt-4 block w-full text-center text-sm font-bold text-slate-500 hover:text-ink-900">
          Forgot password
        </button>
      </form>
    </main>
  );
}

/* ─── Live list of consultation requests ─────────────── */
function useLeads(user: User) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState<string | null>(null);
  const loaded = useRef(false);

  useEffect(() => {
    loaded.current = false;
    return onSnapshot(
      query(collection(db, 'leads'), orderBy('createdAt', 'desc'), limit(300)),
      (snapshot) => {
        setError(null);
        setLeads(
          snapshot.docs.map((d) => {
            const data = d.data();
            return { ...data, id: d.id, createdAt: data.createdAt?.toDate?.() ?? null } as Lead;
          }),
        );

        // After the first load, every added document is a request that just arrived.
        if (loaded.current && typeof Notification !== 'undefined' && Notification.permission === 'granted') {
          for (const change of snapshot.docChanges()) {
            if (change.type !== 'added') continue;
            const data = change.doc.data();
            new Notification('New consultation request', {
              body: `${data.name} · ${data.phone}${data.service ? ` · ${data.service}` : ''}`,
            });
          }
        }
        loaded.current = true;
      },
      (e) => setError(errorMessage(e)),
    );
  }, [user.uid]);

  return { leads, error };
}

/* ─── Dashboard ──────────────────────────────────────── */
function Dashboard({ user }: { user: User }) {
  const [tab, setTab] = useState<TabId>('leads');
  const { leads, error } = useLeads(user);
  const [alertsEnabled, setAlertsEnabled] = useState(
    typeof Notification !== 'undefined' && Notification.permission === 'granted',
  );
  const newCount = leads.filter((lead) => lead.status === 'new').length;

  // Show the number of unanswered requests in the browser tab.
  useEffect(() => {
    document.title = `${newCount > 0 ? `(${newCount}) ` : ''}Brandraize Admin`;
  }, [newCount]);

  const enableAlerts = async () => {
    if (typeof Notification === 'undefined') return;
    setAlertsEnabled((await Notification.requestPermission()) === 'granted');
  };

  return (
    <div className="min-h-screen bg-sand-50">
      <header className="bg-ink-950 text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Logo className="h-12" priority />
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-white/70 sm:inline">{user.email}</span>
            <a href="/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 font-bold hover:bg-white/10">
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              View site
            </a>
            <button type="button" onClick={() => signOut(auth)} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 font-bold hover:bg-white/10">
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Sign out
            </button>
          </div>
        </div>

        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 sm:px-6" aria-label="Dashboard sections">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              aria-current={tab === id ? 'page' : undefined}
              className={`flex flex-none items-center gap-2 rounded-t-xl px-4 py-3 text-sm font-bold transition-colors ${
                tab === id ? 'bg-sand-50 text-ink-900' : 'text-white/70 hover:text-white'
              }`}
            >
              {label}
              {id === 'leads' && newCount > 0 && (
                <span className="rounded-full bg-gold-500 px-2 py-0.5 text-xs text-ink-950">{newCount}</span>
              )}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {tab === 'leads' && (
          <LeadsPanel leads={leads} error={error} alertsEnabled={alertsEnabled} onEnableAlerts={enableAlerts} />
        )}
        {tab === 'services' && <ServicesPanel />}
        {tab === 'projects' && (
          <CollectionPanel
            name="projects"
            noun="project"
            defaultsKey="projects"
            titleField="title"
            intro="Projects appear on the home page and the Projects page. Each one gets its own page with the full details, a gallery, and a scrolling preview of the finished website."
            image={{ label: 'Main image (shown on the home page and project cards)', required: true, maxSide: 1600 }}
            gallery={{
              label: 'Gallery images',
              hint: 'Extra pictures shown on the project page: other screens, mobile views, design details. Up to 12.',
              max: 12,
            }}
            fullPage={{
              label: 'Full-page screenshot of the website',
              hint: 'One tall screenshot of the whole home page. On the project page it scrolls by itself from top to bottom, like a visitor browsing. In Chrome: open the site, press F12, then Ctrl+Shift+P, type “full size screenshot” and press Enter.',
            }}
            fields={[
              { key: 'title', label: 'Project name', bilingual: true },
              { key: 'category', label: 'Type of work', bilingual: true },
              { key: 'summary', label: 'Short description', bilingual: true, rows: 3, hint: 'One or two sentences, shown on the home page and project cards.' },
              { key: 'details', label: 'Full details', bilingual: true, rows: 8, hint: 'Shown on the project page. Press Enter to start a new paragraph: what the client needed, what you built, and the result.' },
              { key: 'url', label: 'Website address', hint: 'Optional, for example https://example.com. Adds a “Visit the live website” button.' },
            ]}
          />
        )}
        {tab === 'testimonials' && (
          <CollectionPanel
            name="testimonials"
            noun="review"
            titleField="name"
            intro="Reviews appear in the “What our clients say” slider on the home page. Only add feedback from real clients who agree to be quoted."
            image={{ label: 'Client photo', required: false, maxSide: 300 }}
            fields={[
              { key: 'quote', label: 'What they said', bilingual: true, rows: 3 },
              { key: 'name', label: 'Client name', bilingual: true },
              { key: 'project', label: 'Project', bilingual: true },
            ]}
          />
        )}
        {tab === 'clients' && (
          <CollectionPanel
            name="clients"
            noun="client logo"
            defaultsKey="clients"
            titleField="name"
            intro="Logos appear in the “Trusted by” strip under the home page header. Once you add one here, your list replaces the image files in the clients folder."
            image={{ label: 'Logo', required: true, maxSide: 480 }}
            fields={[{ key: 'name', label: 'Client name' }]}
          />
        )}
      </main>
    </div>
  );
}

/* ─── Entry ──────────────────────────────────────────── */
export default function AdminApp() {
  // undefined while Firebase restores the saved session.
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  if (user === undefined) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink-950">
        <Loader2 className="h-8 w-8 animate-spin text-gold-400" aria-label="Loading" />
      </main>
    );
  }
  return user ? <Dashboard user={user} /> : <Login />;
}
