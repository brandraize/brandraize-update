"use client";

import { useState, useEffect, useRef } from "react";

type ContactUsProps = {
  locale?: "en" | "ar";
};

// ─── FAQ data ────────────────────────────────────────────────────────────────
const faqs = {
  en: [
    {
      q: "What services does Brandraize offer in Saudi Arabia?",
      a: "Brandraize is a full-service digital agency in Saudi Arabia. We offer web development, custom software, mobile apps, AI solutions, branding, SEO, and digital marketing across KSA.",
    },
    {
      q: "Can you build a custom software solution for my business?",
      a: "Absolutely. We specialise in building custom software tailored to your business — whether a mobile app, SaaS platform, e-commerce store, or a full-scale web application. Get a free consultation today.",
    },
    {
      q: "How much does software development cost in Saudi Arabia?",
      a: "Cost depends on project type and complexity. Contact us for a free consultation and a quote tailored to your needs.",
    },
    {
      q: "Do you develop mobile apps for iOS and Android?",
      a: "Yes. Brandraize builds native iOS and Android apps as well as cross-platform solutions using React Native — optimised for Arabic RTL and the Saudi market.",
    },
    {
      q: "Do you provide ongoing support and maintenance?",
      a: "Yes, we offer comprehensive IT support and maintenance packages to keep your software running smoothly with technical support available across KSA.",
    },
    {
      q: "How can I get started with Brandraize?",
      a: "Simply reach out via the form below or call/email us. Our team will guide you through a free consultation — from requirements to project launch.",
    },
  ],
  ar: [
    {
      q: "ما الخدمات التي تقدمها براندرايز في المملكة العربية السعودية؟",
      a: "براندرايز وكالة رقمية متكاملة تقدم تطوير الويب، البرمجيات المخصصة، تطبيقات الجوال، حلول الذكاء الاصطناعي، الهوية البصرية، وتحسين محركات البحث في جميع أنحاء المملكة.",
    },
    {
      q: "هل يمكنكم بناء حل برمجي مخصص لأعمالي؟",
      a: "بالتأكيد. نتخصص في بناء برمجيات مخصصة تناسب احتياجاتك — سواء تطبيق جوال أو منصة SaaS أو متجر إلكتروني أو تطبيق ويب متكامل. تواصل للحصول على استشارة مجانية.",
    },
    {
      q: "كم تكلفة تطوير البرمجيات في السعودية؟",
      a: "تختلف التكلفة حسب نوع المشروع وتعقيده. تواصل معنا للحصول على استشارة مجانية وعرض سعر مخصص.",
    },
    {
      q: "هل تطورون تطبيقات للآيفون والأندرويد؟",
      a: "نعم. نبني تطبيقات iOS و Android أصلية وحلول متعددة المنصات باستخدام React Native، محسّنة لدعم اللغة العربية وسوق المملكة.",
    },
    {
      q: "هل تقدمون دعمًا وصيانة مستمرة؟",
      a: "نعم، نقدم باقات صيانة ودعم فني شاملة لضمان عمل برامجك بسلاسة طوال الوقت في جميع أنحاء المملكة.",
    },
    {
      q: "كيف أبدأ مع براندرايز؟",
      a: "ما عليك سوى التواصل عبر النموذج أدناه أو الاتصال بنا. سيرشدك فريقنا خلال استشارة مجانية من تحديد المتطلبات حتى إطلاق المشروع.",
    },
  ],
};

const contacts = {
  en: [
    {
      href: "tel:+966551981751",
      label: "+966 55 198 17 51",
      sub: "Call us to discuss your project or get expert advice.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.64a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z" />
        </svg>
      ),
      color: "from-emerald-400 to-teal-500",
    },
    {
      href: "mailto:info@brandraize.com",
      label: "info@brandraize.com",
      sub: "Email us for quick support and solutions.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8"
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
      color: "from-cyan-400 to-blue-500",
    },
    {
      href: "https://maps.google.com",
      label: "Our Office Location",
      sub: "Brandraize, Jeddah, Mecca Region, Saudi Arabia",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8"
        >
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      color: "from-teal-400 to-emerald-600",
    },
  ],
  ar: [
    {
      href: "tel:+966551981751",
      label: "+966 55 198 17 51",
      sub: "اتصل بنا لمناقشة مشروعك أو الحصول على استشارة.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.64a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z" />
        </svg>
      ),
      color: "from-emerald-400 to-teal-500",
    },
    {
      href: "mailto:info@brandraize.com",
      label: "info@brandraize.com",
      sub: "راسلنا للحصول على دعم سريع وحلول فعالة.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8"
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
      color: "from-cyan-400 to-blue-500",
    },
    {
      href: "https://maps.google.com",
      label: "موقع مكتبنا",
      sub: "براندرايز، جدة، منطقة مكة المكرمة، المملكة العربية السعودية",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8"
        >
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      color: "from-teal-400 to-emerald-600",
    },
  ],
};

// ─── Animated background particles ───────────────────────────────────────────
function AnimatedBg() {
  return (
    <>
      {/* Glowing blobs */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-emerald-500/40 via-teal-500/30 to-transparent rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-32 left-20 w-96 h-96 bg-gradient-to-tr from-cyan-500/40 via-teal-500/30 to-transparent rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      {/* Hex grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%2314b8a6' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating binary strings */}
      {["01010101", "10101010", "01010101", "10101010"].map((b, i) => (
        <div
          key={i}
          className="absolute font-mono text-teal-300/20 text-xs select-none pointer-events-none"
          style={{ left: `${i * 25 + 5}%`, top: `${i % 2 === 0 ? 10 : 60}%` }}
        >
          {b}
        </div>
      ))}

      {/* Floating icons */}
      <div
        className="absolute top-1/4 left-1/4 opacity-20 animate-bounce"
        style={{ animationDuration: "10s" }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#6ee7b7"
          strokeWidth="1.5"
          className="w-16 h-16"
        >
          <rect width="8" height="8" x="3" y="3" rx="2" />
          <path d="M7 11v4a2 2 0 0 0 2 2h4" />
          <rect width="8" height="8" x="13" y="13" rx="2" />
        </svg>
      </div>
      <div
        className="absolute top-1/3 right-1/3 opacity-20 animate-bounce"
        style={{ animationDuration: "12s", animationDelay: "1s" }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#67e8f9"
          strokeWidth="1.5"
          className="w-14 h-14"
        >
          <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
        </svg>
      </div>

      {/* Network SVG lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="netGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <path
          d="M 100 200 Q 300 100 500 200 T 900 200"
          stroke="url(#netGrad)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M 200 400 Q 400 500 600 400 T 1000 400"
          stroke="url(#netGrad)"
          strokeWidth="2"
          fill="none"
        />
        {[12, 24, 36, 48, 60, 72, 84, 96].map((cx, i) => (
          <circle
            key={i}
            cx={`${cx}%`}
            cy={i % 2 === 0 ? "30%" : "70%"}
            r="4"
            fill="#14b8a6"
            opacity="0.6"
          />
        ))}
      </svg>
    </>
  );
}

// ─── FAQ Accordion ────────────────────────────────────────────────────────────
function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="flex flex-col gap-4">
      {items.map((item, i) => (
        <div
          key={i}
          onClick={() => setOpen(open === i ? null : i)}
          className="border border-gray-200 rounded-3xl cursor-pointer p-2 transition-all duration-300"
        >
          <div className="p-4 border-2 border-white rounded-2xl shadow-sm bg-gradient-to-r from-sky-50 via-white to-sky-50 hover:from-sky-100 hover:to-sky-100 transition-colors duration-300">
            <div className="flex justify-between items-center gap-3">
              <h3 className="font-semibold text-gray-800 text-sm leading-snug">
                {item.q}
              </h3>
              <div className="relative w-5 h-5 flex-shrink-0">
                <span className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-600 -translate-y-1/2" />
                <span
                  className="absolute left-1/2 top-0 w-0.5 h-full bg-gray-600 -translate-x-1/2 transition-transform duration-300"
                  style={{
                    transform:
                      open === i
                        ? "translateX(-50%) rotate(90deg)"
                        : "translateX(-50%) rotate(0deg)",
                  }}
                />
              </div>
            </div>
            <div
              className="overflow-hidden transition-all duration-300 text-gray-500 text-sm leading-relaxed"
              style={{
                maxHeight: open === i ? "200px" : "0px",
                opacity: open === i ? 1 : 0,
                marginTop: open === i ? "12px" : "0",
              }}
            >
              {item.a}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ContactUs({ locale = "en" }: ContactUsProps) {
  const isRtl = locale === "ar";
  const faqItems = faqs[locale];
  const contactItems = contacts[locale];

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", phone: "", company: "", message: "" });
  };

  return (
    <main
      dir={isRtl ? "rtl" : "ltr"}
      className="flex flex-col flex-grow min-h-screen p-2 sm:p-4"
      style={{ backgroundColor: "rgb(240,241,242)" }}
    >
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-[2rem] pb-4 min-h-[calc(100vh-2rem)] border-[6px] border-white bg-gradient-to-br from-emerald-950 via-teal-900 to-cyan-950 text-white">
        <AnimatedBg />

        {/* Hero copy */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">
          <p className="text-emerald-400 font-semibold text-sm tracking-widest uppercase mb-4">
            {isRtl ? "تواصل معنا" : "Get In Touch"}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
            {isRtl
              ? "لنبني شيئًا رائعًا معًا"
              : "Let's Build Something Amazing Together"}
          </h1>
          <p className="text-emerald-100 text-lg max-w-xl leading-relaxed">
            {isRtl
              ? "هل أنت مستعد لتحويل أفكارك إلى واقع؟ تواصل معنا لمناقشة مشروعك ومعرفة كيف يمكننا مساعدة أعمالك على النمو."
              : "Ready to transform your ideas into reality? Get in touch to discuss your project, ask questions, or learn how Brandraize can help your business grow."}
          </p>

          {/* Scroll hint */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
            <span className="text-xs text-emerald-300 tracking-widest uppercase">
              {isRtl ? "اكتشف" : "Discover"}
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6ee7b7"
              strokeWidth="2"
              strokeLinecap="round"
              className="w-5 h-5 animate-bounce"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── CONTACT CARDS ────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto w-full py-16 px-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contactItems.map((c, i) => (
            <div
              key={i}
              className="rounded-[2rem] p-2 transition-all duration-300 hover:-translate-y-1"
            >
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-center h-full rounded-3xl p-8 bg-white/80 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.10)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.16)] transition-all duration-300"
              >
                {/* Icon circle */}
                <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white shadow-lg mb-5 border-[6px] border-white`}
                >
                  {c.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {c.label}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{c.sub}</p>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT FORM ─────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto w-full py-8 px-4 grid gap-12 md:grid-cols-2 items-center">
        {/* Left: illustration side */}
        <div
          className={`flex flex-col ${isRtl ? "items-end text-right" : "items-start text-left"}`}
        >
          {/* Decorative divider */}
          <div className="flex gap-1 mb-5">
            {[
              "bg-emerald-500",
              "bg-teal-400",
              "bg-cyan-400",
              "bg-emerald-300",
            ].map((c, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full ${c}`}
                style={{ width: `${20 + i * 10}px` }}
              />
            ))}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
            {isRtl
              ? "هل لديك أسئلة؟ راسلنا بكل حرية"
              : "Have Any Questions? Feel Free to Write Us"}
          </h2>
          <p className="text-gray-500 text-[15px] leading-relaxed mb-8">
            {isRtl
              ? "من الأسئلة حول الميزات إلى احتياجات الدعم، فريقنا هنا لمساعدتك."
              : "From questions about features to support needs, our team is here to help."}
          </p>

          {/* Decorative illustration */}
          <div className="relative w-full max-w-xs mx-auto md:mx-0">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 border border-emerald-100 shadow-inner">
              <div className="flex flex-col gap-3">
                {[
                  "Web Development",
                  "Digital Marketing",
                  "Mobile Apps",
                  "AI Solutions",
                ].map((tag, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700">
                      {tag}
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-emerald-200 to-transparent" />
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-3 bg-white rounded-2xl p-3 shadow-sm border border-emerald-100">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-black text-sm">
                  BR
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Brandraize</p>
                  <p className="text-[10px] text-gray-400">
                    {isRtl
                      ? "شريكك الرقمي الموثوق"
                      : "Your trusted digital partner"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div>
          {submitted && (
            <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl text-sm font-medium text-center">
              {isRtl
                ? "✓ تم إرسال رسالتك بنجاح!"
                : "✓ Message sent successfully!"}
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-3xl p-6 md:p-8 bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.10)] border border-white/60"
          >
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                {isRtl ? "الاسم" : "Name"}
              </label>
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-100 transition-all"
                placeholder={isRtl ? "أدخل اسمك" : "Enter your name"}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                {isRtl ? "البريد الإلكتروني" : "Email"}
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-100 transition-all"
                placeholder={
                  isRtl ? "أدخل بريدك الإلكتروني" : "Enter your email"
                }
              />
            </div>

            {/* Phone + Company */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  {isRtl ? "الهاتف" : "Phone"}
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-100 transition-all"
                  placeholder={isRtl ? "رقم الهاتف" : "Phone number"}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  {isRtl ? "الشركة" : "Company"}
                </label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) =>
                    setForm({ ...form, company: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-100 transition-all"
                  placeholder={isRtl ? "اسم الشركة" : "Company name"}
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                {isRtl ? "الرسالة" : "Message"}
              </label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-100 transition-all resize-none"
                placeholder={
                  isRtl ? "اكتب رسالتك هنا..." : "Write your message here..."
                }
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-xl px-6 py-3.5 font-bold text-white text-sm bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
              {isRtl ? "إرسال الرسالة" : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section
        className="max-w-6xl mx-auto w-full py-12 px-4 grid gap-12 lg:grid-cols-2 items-start"
        dir={isRtl ? "rtl" : "ltr"}
      >
        {/* Left: FAQ intro */}
        <div
          className={`flex flex-col ${isRtl ? "items-end text-right" : "items-start text-left"}`}
        >
          <div className="flex gap-1 mb-5">
            {[
              "bg-emerald-500",
              "bg-teal-400",
              "bg-cyan-400",
              "bg-emerald-300",
            ].map((c, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full ${c}`}
                style={{ width: `${20 + i * 10}px` }}
              />
            ))}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
            {isRtl
              ? "إجابات على أسئلتك الشائعة"
              : "Answers to Your Top Questions"}
          </h2>
          <p className="text-gray-500 text-[15px] leading-relaxed mb-8">
            {isRtl
              ? "من خطوات الإعداد إلى تفاصيل الميزات، تغطي أسئلتنا الشائعة كل ما تحتاج معرفته."
              : "From setup steps to feature details, our FAQs cover everything you need to know."}
          </p>

          {/* Decorative box */}
          <div className="hidden lg:flex w-full max-w-xs bg-gradient-to-br from-emerald-950 to-teal-900 rounded-3xl p-6 text-white gap-3 items-center shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center font-black text-sm shadow-md flex-shrink-0">
              BR
            </div>
            <div>
              <p className="font-bold text-sm">Brandraize</p>
              <p className="text-emerald-300 text-xs mt-0.5">
                {isRtl
                  ? "براندرايز — نرتقي بعلامتك التجارية"
                  : "Elevating Brands Above the Noise"}
              </p>
            </div>
          </div>
        </div>

        {/* Right: accordion */}
        <FaqAccordion items={faqItems} />
      </section>
    </main>
  );
}
