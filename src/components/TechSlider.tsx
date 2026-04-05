'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  SiNextdotjs, SiOpenai, SiGooglecloud,
  SiReact, SiNodedotjs, SiPhp, SiFirebase, SiLaravel, SiDocker,
  SiMongodb, SiTypescript,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

type TechSliderProps = {
  locale: 'en' | 'ar';
};

type TechItem = {
  name: string;
  bg: string;
  icon: React.ReactNode;
};

// Top row: frontend/cloud tech
const topTech: TechItem[] = [
  { name: 'Next.js', bg: '#000000', icon: <SiNextdotjs size={26} color="#ffffff" /> },
  { name: 'OpenAI', bg: '#10a37f', icon: <SiOpenai size={26} color="#ffffff" /> },
  { name: 'AWS', bg: '#232F3E', icon: <FaAws size={26} color="#FF9900" /> },
  { name: 'Google Cloud', bg: '#4285F4', icon: <SiGooglecloud size={26} color="#ffffff" /> },
  { name: 'TypeScript', bg: '#3178C6', icon: <SiTypescript size={26} color="#ffffff" /> },
  { name: 'React', bg: '#20232a', icon: <SiReact size={26} color="#61DAFB" /> },
];

// Bottom row: backend/infra tech
const bottomTech: TechItem[] = [
  { name: 'Node.js', bg: '#339933', icon: <SiNodedotjs size={26} color="#ffffff" /> },
  { name: 'PHP', bg: '#777BB4', icon: <SiPhp size={26} color="#ffffff" /> },
  { name: 'Firebase', bg: '#DD2C00', icon: <SiFirebase size={26} color="#FFCA28" /> },
  { name: 'MongoDB', bg: '#001e2b', icon: <SiMongodb size={26} color="#00ED64" /> },
  { name: 'Laravel', bg: '#FF2D20', icon: <SiLaravel size={26} color="#ffffff" /> },
  { name: 'Docker', bg: '#2496ED', icon: <SiDocker size={26} color="#ffffff" /> },
];

const services = [
  {
    title: { en: 'Web Development', ar: 'تطوير الويب' },
    desc: {
      en: 'Modern, scalable websites built with React, Next.js — serving businesses across Saudi Arabia.',
      ar: 'مواقع حديثة وقابلة للتوسع مبنية بـ React و Next.js لخدمة الشركات في السعودية.',
    },
    gradient: 'from-purple-500 to-purple-700',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
      </svg>
    ),
  },
  {
    title: { en: 'Custom Software', ar: 'برمجيات مخصصة' },
    desc: {
      en: 'Tailored software solutions designed to fit real business needs — from startups to enterprises.',
      ar: 'حلول برمجية مصممة لتلبية احتياجات الأعمال الحقيقية من الشركات الناشئة إلى المؤسسات.',
    },
    gradient: 'from-blue-500 to-blue-700',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
      </svg>
    ),
  },
  {
    title: { en: 'Digital Marketing', ar: 'التسويق الرقمي' },
    desc: {
      en: 'Arabic & English interfaces with SEO, branding, and localization for the Saudi market.',
      ar: 'واجهات عربية وإنجليزية مع تحسين محركات البحث والعلامة التجارية للسوق السعودي.',
    },
    gradient: 'from-pink-500 to-pink-700',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="m5 8 6 6m-1-8-6 6 2-3M2 5h12M7 2h1m15 20-5-10-5 10M14 18h6" />
      </svg>
    ),
  },
  {
    title: { en: 'System Integration', ar: 'تكامل الأنظمة' },
    desc: {
      en: 'Seamless integration with APIs, third-party services, and platforms across Saudi Arabia.',
      ar: 'تكامل سلس مع واجهات برمجة التطبيقات والخدمات الخارجية والمنصات في السعودية.',
    },
    gradient: 'from-orange-500 to-orange-700',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M8 2v4M16 2v4M3 10h18" /><rect width="18" height="18" x="3" y="4" rx="2" />
      </svg>
    ),
  },
  {
    title: { en: 'Secure Payments', ar: 'مدفوعات آمنة' },
    desc: {
      en: 'Safe payment gateway integration including Saudi-compliant providers.',
      ar: 'تكامل آمن مع بوابات الدفع بما في ذلك مزودو الخدمة المتوافقون مع المتطلبات السعودية.',
    },
    gradient: 'from-rose-400 to-rose-600',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" />
      </svg>
    ),
  },
  {
    title: { en: 'AI & Automation', ar: 'الذكاء الاصطناعي' },
    desc: {
      en: 'Smart AI-powered features and automation — Brandraize is your AI partner in Saudi Arabia.',
      ar: 'ميزات ذكاء اصطناعي وأتمتة متقدمة — براندرايز هي شريكك في التقنية بالمملكة.',
    },
    gradient: 'from-green-500 to-green-700',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5V11h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2v.5c1.2.7 2 2 2 3.5a4 4 0 0 1-8 0c0-1.5.8-2.8 2-3.5V16H8a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h2V9.5C8.8 8.8 8 7.5 8 6a4 4 0 0 1 4-4z" />
      </svg>
    ),
  },
];

function TechBadge({ name, bg, icon }: TechItem) {
  return (
    <div className="w-28 h-28 shrink-0 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center gap-2 border border-gray-100 cursor-default select-none">
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md"
        style={{ backgroundColor: bg }}
      >
        {icon}
      </div>
      <span className="text-[10px] font-semibold text-gray-500 tracking-wide">{name}</span>
    </div>
  );
}

function InfiniteSlider({
  items,
  direction = 'left',
  speed = 35,
}: {
  items: TechItem[];
  direction?: 'left' | 'right';
  speed?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);
  const repeated = [...items, ...items, ...items, ...items];
  const itemW = 112 + 16; // w-28 + gap-4

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const totalW = items.length * itemW;

    const animate = () => {
      posRef.current += direction === 'left' ? -0.4 : 0.4;
      if (posRef.current <= -totalW) posRef.current += totalW;
      if (posRef.current >= 0) posRef.current -= totalW;
      track.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [direction, items.length]);

  return (
    <div className="overflow-hidden w-full" style={{ direction: 'ltr' }}>
      <div ref={trackRef} className="flex gap-4 w-max">
        {repeated.map((t, i) => (
          <TechBadge key={i} {...t} />
        ))}
      </div>
    </div>
  );
}

export default function TechSlider({ locale }: TechSliderProps) {
  const isRtl = locale === 'ar';

  return (
    <section
      dir={isRtl ? 'rtl' : 'ltr'}
      className="relative bg-[#f4f6fb] overflow-hidden py-20 px-4"
    >
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-2xl md:text-4xl font-extrabold text-[#0d1f3c] mb-4">
          {isRtl
            ? 'شركة التقنية الرائدة في الرياض والمملكة العربية السعودية'
            : 'Leading Tech Solutions Company in Riyadh & Saudi Arabia'}
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-[15px] leading-relaxed">
          {isRtl
            ? 'براندرايز شريكك الموثوق في تطوير البرمجيات، تطبيقات الجوال، وحلول الذكاء الاصطناعي للشركات في جميع أنحاء المملكة.'
            : 'Brandraize is your trusted partner for custom software, mobile apps, and AI-powered solutions for businesses across Saudi Arabia.'}
        </p>
      </div>

      {/* Desktop: 3-column layout */}
      <div className="hidden md:flex items-center justify-center gap-0 relative">

        {/* Left sliders */}
        <div className="flex flex-col gap-4 flex-1 min-w-0 overflow-hidden -mr-6">
          <InfiniteSlider items={topTech} direction="left" />
          <InfiniteSlider items={bottomTech} direction="right" />
        </div>

        {/* Phone mockup */}
        <div className="relative z-10 shrink-0" style={{ width: 280 }}>
          <PhoneMockup locale={locale} />
        </div>

        {/* Right sliders */}
        <div className="flex flex-col gap-4 flex-1 min-w-0 overflow-hidden -ml-6">
          <InfiniteSlider items={[...topTech].reverse()} direction="right" />
          <InfiniteSlider items={[...bottomTech].reverse()} direction="left" />
        </div>
      </div>

      {/* Mobile: stacked */}
      <div className="md:hidden flex flex-col items-center gap-10">
        <div className="w-full overflow-hidden">
          <InfiniteSlider items={[...topTech, ...bottomTech]} direction="left" />
        </div>
        <PhoneMockup locale={locale} />
        <div className="w-full overflow-hidden">
          <InfiniteSlider items={[...bottomTech, ...topTech].reverse()} direction="right" />
        </div>
      </div>
    </section>
  );
}

function PhoneMockup({ locale }: { locale: 'en' | 'ar' }) {
  const isRtl = locale === 'ar';

  return (
    <div
      className="relative mx-auto shadow-2xl overflow-hidden"
      style={{
        width: 260,
        height: 520,
        borderRadius: '2.8rem',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        border: '2px solid #2d3a5e',
      }}
    >
      {/* Inner screen */}
      <div
        className="absolute overflow-hidden"
        style={{
          inset: 10,
          borderRadius: '2.2rem',
          background: 'linear-gradient(160deg, #ffffff 0%, #f8faff 60%, #eef3ff 100%)',
        }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-4 pt-3 pb-1 text-[10px] font-semibold text-gray-800">
          <span>02:39 PM</span>
          <div className="flex items-center gap-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
              <path d="M12 20h.01M2 8.82a15 15 0 0 1 20 0M5 12.86a10 10 0 0 1 14 0M8.5 16.43a5 5 0 0 1 7 0" strokeLinecap="round" />
            </svg>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
              <rect x="2" y="6" width="16" height="12" rx="2" /><path d="M22 10v4" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Nav bar */}
        <div className="flex items-center justify-between px-3 py-2">
          <button className="p-1.5 hover:bg-gray-100 rounded-xl transition-all">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-4 h-4">
              <path d="m12 19-7-7 7-7M19 12H5" />
            </svg>
          </button>
          {/* Logo image */}
          <div className="w-7 h-7 rounded-full overflow-hidden">
            <Image src="/B_logo.png" alt="Brandraize" width={28} height={28} className="object-cover" />
          </div>
          <button className="p-1.5 hover:bg-gray-100 rounded-xl transition-all">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
            </svg>
          </button>
        </div>

        {/* Service cards grid */}
        <div className="grid grid-cols-2 gap-2 px-3 pb-6 overflow-hidden" style={{ direction: 'ltr' }}>
          {services.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-2.5 shadow-md hover:shadow-lg transition-all border border-gray-100"
            >
              <div className={`bg-gradient-to-br ${s.gradient} w-7 h-7 rounded-xl flex items-center justify-center mb-2 shadow-sm`}>
                {s.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-[9px] mb-0.5 leading-tight text-left">
                {s.title['en']}
              </h3>
              <p className="text-[7px] text-gray-500 leading-snug text-left line-clamp-3">
                {s.desc['en']}
              </p>
            </div>
          ))}
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-gray-800 rounded-full opacity-60" />
      </div>
    </div>
  );
}