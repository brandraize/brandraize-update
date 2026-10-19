'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { Mic, MicOff, SendHorizontal, Volume2, VolumeX, X } from 'lucide-react';
import { site, whatsappHref, type Locale } from '@/lib/site';
import { trackContact } from '@/lib/track';

type Message = { role: 'user' | 'assistant'; content: string };

const content = {
  en: {
    name: 'Aman',
    role: 'Brandraize AI assistant',
    online: 'Online',
    thinking: 'Thinking…',
    speaking: 'Speaking…',
    listening: 'Listening…',
    greeting:
      "Hi, I'm Aman, Brandraize's AI assistant. What are you looking to build today — a website, an app, an online store, or more customers?",
    teaser: 'Hi! Need a website or app? Ask me 👋',
    placeholder: 'Type your message…',
    send: 'Send',
    open: 'Open the AI assistant',
    close: 'Close',
    mute: 'Mute voice',
    unmute: 'Turn voice on',
    mic: 'Speak your message',
    stopMic: 'Stop listening',
    error: `Sorry, I couldn't answer just now. You can reach the team on WhatsApp or call ${site.phoneDisplay}.`,
    whatsapp: 'Continue on WhatsApp',
    chips: ['I need a website', 'Build a mobile app', 'Open an online store', 'How much does it cost?'],
    note: 'AI answers may contain mistakes.',
  },
  ar: {
    name: 'رايز',
    role: 'مساعد براندرايز الذكي',
    online: 'متصل الآن',
    thinking: 'يفكّر…',
    speaking: 'يتحدث…',
    listening: 'يستمع…',
    greeting:
      'مرحباً، أنا امان شاه مساعد براندرايز الذكي. ماذا تريد أن تبني اليوم — موقعاً إلكترونياً، تطبيقاً، متجراً إلكترونياً، أو عملاء أكثر؟',
    teaser: 'مرحباً! تحتاج موقع أو تطبيق؟ اسألني 👋',
    placeholder: 'اكتب رسالتك…',
    send: 'إرسال',
    open: 'افتح المساعد الذكي',
    close: 'إغلاق',
    mute: 'كتم الصوت',
    unmute: 'تشغيل الصوت',
    mic: 'تحدث برسالتك',
    stopMic: 'إيقاف الاستماع',
    error: `عذراً، لم أتمكن من الرد الآن. يمكنك التواصل مع الفريق عبر واتساب أو الاتصال على ${site.phoneDisplay}.`,
    whatsapp: 'أكمل عبر واتساب',
    chips: ['أحتاج موقعاً إلكترونياً', 'برمجة تطبيق جوال', 'إنشاء متجر إلكتروني', 'كم التكلفة؟'],
    note: 'قد تحتوي إجابات الذكاء الاصطناعي على أخطاء.',
  },
};

const SEEN_KEY = 'raize-greeted';
const MUTE_KEY = 'raize-muted';

const storage = {
  get(key: string) {
    try {
      return window.sessionStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      window.sessionStorage.setItem(key, value);
    } catch {}
  },
};

function track(event: string, detail?: Record<string, unknown>) {
  const w = window as Window & { dataLayer?: unknown[] };
  w.dataLayer?.push({ event, ...detail });
}

// Turns [label](href) in a reply into links; everything else stays plain text.
function renderReply(text: string, onNavigate: () => void): ReactNode[] {
  const parts: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const [, label, href] = match;
    const className = 'font-bold text-[#3870e0] underline underline-offset-2 hover:text-gold-700';
    if (href.startsWith('/')) {
      parts.push(
        <Link key={match.index} href={href} className={className} onClick={onNavigate}>
          {label}
        </Link>,
      );
    } else if (/^(https:\/\/wa\.me\/|tel:|mailto:|https:\/\/brandraize\.com)/.test(href)) {
      parts.push(
        <a key={match.index} href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {label}
        </a>,
      );
    } else {
      parts.push(label);
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

// What the voice reads: the reply without link addresses.
const spokenText = (text: string) => text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/https?:\/\/\S+/g, '');

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
};

function getRecognition(): (new () => SpeechRecognitionLike) | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

function RobotFace({ talking, size }: { talking: boolean; size: 'sm' | 'lg' }) {
  const box = size === 'lg' ? 'h-16 w-16' : 'h-16 w-16 sm:h-20 sm:w-20';
  return (
    <span className={`relative block overflow-hidden rounded-full bg-gradient-to-b from-[#dfe3ea] to-[#9aa3b2] ${box}`}>
      <span className={`absolute inset-0 block ${talking ? 'robot-talk' : 'robot-idle'}`}>
        {/* Zoomed in on the head and shoulders of the full-body picture */}
        <span className="absolute inset-0 block origin-[50%_8%] scale-[2.4]">
          <Image src="/agent/robot.webp" alt="" fill sizes="200px" className="object-cover object-top" />
        </span>
      </span>
    </span>
  );
}

function SoundWave() {
  return (
    <span className="robot-wave flex h-4 items-center gap-0.5" aria-hidden="true">
      {[0, 150, 300, 450].map((delay) => (
        <span key={delay} className="block h-full w-1 rounded-full bg-[#5aa2ff]" style={{ animationDelay: `${delay}ms` }} />
      ))}
    </span>
  );
}

export default function AiAgent({ locale }: { locale: Locale }) {
  const t = content[locale];
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [muted, setMuted] = useState(false);
  const [micSupported, setMicSupported] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Start a fresh conversation in the visitor's language.
  useEffect(() => {
    setMessages([{ role: 'assistant', content: t.greeting }]);
  }, [t.greeting]);

  useEffect(() => {
    setMicSupported(!!getRecognition());
    try {
      setMuted(window.localStorage.getItem(MUTE_KEY) === '1');
    } catch {}
  }, []);

  // The robot greets each visitor once per visit: the panel opens on larger screens,
  // and a speech bubble appears on phones so it does not cover the page.
  useEffect(() => {
    if (storage.get(SEEN_KEY)) return;
    const timer = window.setTimeout(() => {
      storage.set(SEEN_KEY, '1');
      if (window.matchMedia('(min-width: 768px)').matches) {
        setOpen(true);
        track('ai_agent_auto_open');
      } else {
        setTeaser(true);
      }
    }, 3500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, busy]);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (muted || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
      const synth = window.speechSynthesis;
      synth.cancel();
      const utterance = new SpeechSynthesisUtterance(spokenText(text));
      const lang = locale === 'ar' ? 'ar' : 'en';
      utterance.lang = locale === 'ar' ? 'ar-SA' : 'en-US';
      const voice = synth.getVoices().find((v) => v.lang.toLowerCase().startsWith(lang));
      if (voice) utterance.voice = voice;
      utterance.rate = 1;
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      synth.speak(utterance);
    },
    [locale, muted],
  );

  const openPanel = () => {
    setOpen(true);
    setTeaser(false);
    track('ai_agent_open');
    // Opening is a tap, so the browser now allows the greeting to be spoken.
    if (messages.length === 1) speak(t.greeting);
    window.setTimeout(() => inputRef.current?.focus(), 200);
  };

  const closePanel = () => {
    setOpen(false);
    stopSpeaking();
    recognitionRef.current?.stop();
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    if (next) stopSpeaking();
    try {
      window.localStorage.setItem(MUTE_KEY, next ? '1' : '0');
    } catch {}
  };

  const send = async (text: string) => {
    const question = text.trim();
    if (!question || busy) return;
    stopSpeaking();
    setInput('');
    track('ai_agent_message');

    const history: Message[] = [...messages, { role: 'user', content: question }];
    setMessages([...history, { role: 'assistant', content: '' }]);
    setBusy(true);

    const controller = new AbortController();
    abortRef.current = controller;
    let reply = '';
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // The opening greeting is shown on screen only; the conversation starts with the visitor.
        body: JSON.stringify({ messages: history.slice(1), locale, page: pathname }),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) throw new Error(`Chat responded ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        setMessages([...history, { role: 'assistant', content: reply }]);
      }
      if (!reply.trim()) throw new Error('Empty reply');
      speak(reply);
    } catch (error) {
      if ((error as Error).name === 'AbortError') return;
      setMessages([...history, { role: 'assistant', content: t.error }]);
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  };

  const toggleMic = () => {
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    const Recognition = getRecognition();
    if (!Recognition) return;
    stopSpeaking();
    const recognition = new Recognition();
    recognition.lang = locale === 'ar' ? 'ar-SA' : 'en-US';
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript ?? '';
      if (transcript) send(transcript);
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  };

  useEffect(() => () => abortRef.current?.abort(), []);

  const status = listening ? t.listening : busy ? t.thinking : speaking ? t.speaking : t.online;
  const showChips = messages.length === 1 && !busy;

  return (
    <>
      {/* ── Launcher: the robot in the corner ── */}
      {!open && (
        <div className="fixed bottom-4 start-4 z-40 flex items-end gap-2 sm:bottom-5 sm:start-5">
          <button
            type="button"
            onClick={openPanel}
            aria-label={t.open}
            className="group relative rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.35)] ring-2 ring-gold-500/80 transition-transform hover:scale-105"
          >
            <span className="absolute inset-0 -z-10 animate-ring rounded-full bg-[#3870e0]" aria-hidden="true" />
            <RobotFace talking={false} size="sm" />
            <span className="absolute bottom-1 end-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#25d366]" aria-hidden="true" />
          </button>
          {teaser && (
            <button
              type="button"
              onClick={openPanel}
              className="mb-6 max-w-[13rem] animate-fade-up rounded-2xl rounded-es-sm bg-white px-4 py-3 text-start text-sm font-bold text-ink-900 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
            >
              {t.teaser}
            </button>
          )}
        </div>
      )}

      {/* ── Chat panel ── */}
      {open && (
        <section
          role="dialog"
          aria-label={t.role}
          className="fixed inset-x-2 bottom-2 z-50 flex h-[min(620px,calc(100dvh-1rem))] animate-fade-up flex-col overflow-hidden rounded-3xl border border-white/10 bg-white shadow-[0_24px_70px_rgba(7,23,61,0.45)] sm:inset-x-auto sm:bottom-5 sm:start-5 sm:w-[390px]"
        >
          <header className="relative flex items-center gap-3 bg-ink-950 px-4 py-3 text-white">
            <div className="bg-dots absolute inset-0 -z-0 opacity-60" aria-hidden="true" />
            <span className="relative rounded-full ring-2 ring-gold-500">
              <RobotFace talking={speaking || busy} size="lg" />
            </span>
            <div className="relative min-w-0 flex-1">
              <p className="text-lg font-extrabold leading-tight">{t.name}</p>
              <p className="text-xs text-white/60">{t.role}</p>
              <p className="mt-1 flex items-center gap-2 text-xs font-bold text-[#7fd8a4]" aria-live="polite">
                {speaking ? <SoundWave /> : <span className="h-2 w-2 rounded-full bg-[#25d366]" aria-hidden="true" />}
                {status}
              </p>
            </div>
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? t.unmute : t.mute}
              className="relative rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white"
            >
              {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
            <button
              type="button"
              onClick={closePanel}
              aria-label={t.close}
              className="relative rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-sand-50 px-4 py-4">
            {messages.map((m, i) =>
              m.role === 'assistant' && !m.content ? null : (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <p
                    className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed ${
                      m.role === 'user'
                        ? 'rounded-ee-sm bg-ink-900 text-white'
                        : 'rounded-es-sm border border-sand-200 bg-white text-ink-900'
                    }`}
                  >
                    {m.role === 'assistant'
                      ? renderReply(m.content, () => setOpen(window.matchMedia('(min-width: 768px)').matches)).map(
                          (part, j) => <Fragment key={j}>{part}</Fragment>,
                        )
                      : m.content}
                  </p>
                </div>
              ),
            )}

            {busy && !messages[messages.length - 1]?.content && (
              <div className="flex justify-start" aria-label={t.thinking}>
                <span className="flex gap-1.5 rounded-2xl rounded-es-sm border border-sand-200 bg-white px-4 py-3.5">
                  {[0, 160, 320].map((delay) => (
                    <span key={delay} className="robot-dot h-2 w-2 rounded-full bg-ink-700" style={{ animationDelay: `${delay}ms` }} />
                  ))}
                </span>
              </div>
            )}

            {showChips && (
              <div className="flex flex-wrap gap-2 pt-1">
                {t.chips.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => send(chip)}
                    className="rounded-full border border-gold-500/60 bg-white px-3.5 py-2 text-sm font-bold text-ink-900 transition-colors hover:bg-gold-500"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-sand-200 bg-white px-3 pb-2 pt-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2"
            >
              {micSupported && (
                <button
                  type="button"
                  onClick={toggleMic}
                  aria-label={listening ? t.stopMic : t.mic}
                  className={`flex h-11 w-11 flex-none items-center justify-center rounded-full transition-colors ${
                    listening ? 'animate-pulse bg-red-500 text-white' : 'bg-sand-100 text-ink-900 hover:bg-sand-200'
                  }`}
                >
                  {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </button>
              )}
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.placeholder}
                maxLength={1000}
                className="h-11 min-w-0 flex-1 rounded-full border border-sand-200 bg-sand-50 px-4 text-[15px] text-ink-900 outline-none focus:border-gold-500"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label={t.send}
                className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-gold-500 text-ink-950 transition-colors hover:bg-gold-400 disabled:opacity-40"
              >
                <SendHorizontal className="h-5 w-5 rtl:rotate-180" />
              </button>
            </form>
            <div className="mt-2 flex items-center justify-between gap-2 text-[11px] text-slate-500">
              <span>{t.note}</span>
              <a
                href={whatsappHref(locale)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContact('whatsapp', 'ai_agent')}
                className="font-bold text-[#128c4b] hover:underline"
              >
                {t.whatsapp}
              </a>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
