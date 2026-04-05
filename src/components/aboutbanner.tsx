"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

type AboutBannerProps = {
  locale?: "en" | "ar";
};

export default function AboutBanner({ locale }: AboutBannerProps) {
  const pathname = usePathname();
  const pathLang = pathname?.split("/")?.[1];
  const resolvedLang = locale === "ar" || locale === "en"
    ? locale
    : pathLang === "ar" || pathLang === "en"
    ? pathLang
    : "en";
  const isArabic = resolvedLang === "ar";

  const arabicContent = {
    title: "تمكين الابتكار، دفع النجاح في المملكة العربية السعودية",
    description: "براندرايز هي شركة رائدة في تطوير البرمجيات في المملكة العربية السعودية. نقدم برمجيات مخصصة، تطوير تطبيقات الجوال، أنظمة تخطيط موارد المؤسسات، منصات SaaS، حلول الذكاء الاصطناعي، ودعم البنية التحتية لتقنية المعلومات — نساعد الشركات في جميع أنحاء المملكة على تحويل الأفكار إلى تميز تشغيلي وريادة في السوق.",
    badge: "من نحن",
  };

  const englishContent = {
    title: "Empowering Innovation, Driving Success in Saudi Arabia",
    description: "Brandraize is a leading software development company in Saudi Arabia. We deliver custom software, mobile app development, ERP systems, SaaS platforms, AI solutions, and IT infrastructure support — helping businesses across KSA transform ideas into operational excellence and market leadership.",
    badge: "About Us",
  };

  const content = isArabic ? arabicContent : englishContent;

  return (
    <div className="relative overflow-hidden rounded-4xl pb-4 min-h-[calc(100vh-2rem)] border-[6px] border-white bg-gradient-to-br from-slate-950 via-cyan-950 to-sky-950">
      {/* Animated Shapes - Circles */}
      <div className="absolute left-[15%] top-[20%] opacity-0 animate-float">
        <div className="w-20 h-20 border-2 border-cyan-400/50 rounded-full"></div>
      </div>
      <div className="absolute left-[40%] top-[20%] opacity-0 animate-float-delayed">
        <div className="w-20 h-20 border-2 border-sky-400/50 rotate-45"></div>
      </div>
      
      {/* Animated Shapes - Triangles */}
      <div className="absolute left-[65%] top-[20%] opacity-0 animate-float-slower">
        <div className="w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[60px] border-b-cyan-400/50"></div>
      </div>
      <div className="absolute left-[90%] top-[20%] opacity-0 animate-float-delayed">
        <div className="w-16 h-16 border-2 border-sky-400/50 rotate-45" style={{ clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)" }}></div>
      </div>

      {/* More animated shapes */}
      <div className="absolute left-[15%] top-[60%] opacity-0 animate-float-slower">
        <div className="w-20 h-20 border-2 border-cyan-400/50 rounded-full"></div>
      </div>
      <div className="absolute left-[40%] top-[60%] opacity-0 animate-float">
        <div className="w-20 h-20 border-2 border-sky-400/50 rotate-45"></div>
      </div>
      <div className="absolute left-[65%] top-[60%] opacity-0 animate-float-delayed">
        <div className="w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[60px] border-b-cyan-400/50"></div>
      </div>
      <div className="absolute left-[90%] top-[60%] opacity-0 animate-float">
        <div className="w-16 h-16 border-2 border-sky-400/50 rotate-45" style={{ clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)" }}></div>
      </div>

      {/* Animated Vertical Lines */}
      {[8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96].map((position, index) => (
        <div
          key={`line-${index}`}
          className="absolute w-px h-24 bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-slide-down"
          style={{ left: `${position}%`, top: "-100px", animationDelay: `${index * 0.5}s` }}
        ></div>
      ))}

      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-cyan-500/40 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-sky-500/40 to-transparent rounded-full blur-3xl animate-pulse-slower"></div>

      {/* Horizontal Glow Line */}
      <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent shadow-[0_0_20px_rgba(34,211,238,0.8)] animate-scan"></div>

      {/* Twinkling Stars */}
      {[
        { left: "92.525%", top: "11.952%" },
        { left: "67.503%", top: "70.708%" },
        { left: "37.877%", top: "0.375%" },
        { left: "39.863%", top: "5.164%" },
        { left: "35.116%", top: "35.116%" },
        { left: "27.793%", top: "85.136%" },
        { left: "93.272%", top: "39.850%" },
        { left: "4.120%", top: "2.429%" },
        { left: "31.152%", top: "56.789%" },
        { left: "20.589%", top: "9.048%" },
        { left: "16.936%", top: "31.083%" },
        { left: "60.060%", top: "41.446%" },
        { left: "0.274%", top: "57.953%" },
        { left: "52.143%", top: "81.270%" },
        { left: "65.691%", top: "16.731%" },
        { left: "90.823%", top: "54.613%" },
        { left: "58.855%", top: "70.598%" },
        { left: "1.938%", top: "28.788%" },
        { left: "41.589%", top: "54.458%" },
        { left: "82.536%", top: "1.287%" },
        { left: "87.223%", top: "87.695%" },
        { left: "85.618%", top: "65.695%" },
        { left: "37.431%", top: "21.413%" },
        { left: "48.444%", top: "80.623%" },
        { left: "95.434%", top: "27.826%" },
        { left: "0.641%", top: "45.006%" },
        { left: "31.073%", top: "57.271%" },
        { left: "2.279%", top: "20.289%" },
        { left: "53.102%", top: "28.097%" },
        { left: "75.392%", top: "49.566%" },
      ].map((star, index) => (
        <div
          key={`star-${index}`}
          className="absolute w-1 h-1 bg-cyan-300 rounded-full animate-twinkle"
          style={{ left: star.left, top: star.top, animationDelay: `${index * 0.2}s` }}
        ></div>
      ))}

      {/* Circuit Board SVG */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
        <defs>
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        {[16, 32, 48, 64, 80, 96].map((position, index) => (
          <line
            key={`vline-${index}`}
            x1={`${position}%`}
            y1="0%"
            x2={`${position}%`}
            y2="100%"
            stroke="url(#circuitGradient)"
            strokeWidth="1"
            strokeDasharray={`${0.74 - index * 0.05}px 1px`}
            pathLength="1"
            className="animate-dash"
          />
        ))}
        {[20, 40, 60, 80, 100].map((position, index) => (
          <line
            key={`hline-${index}`}
            x1="0%"
            y1={`${position}%`}
            x2="100%"
            y2={`${position}%`}
            stroke="url(#circuitGradient)"
            strokeWidth="1"
            strokeDasharray={`${0.74 - index * 0.05}px 1px`}
            pathLength="1"
            className="animate-dash"
          />
        ))}
      </svg>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-cyan-500/5"></div>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center max-w-7xl mx-auto px-4">
        {/* Badge */}
        <div className="mb-4 inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-300 backdrop-blur-sm animate-fade-in-up">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>
          {content.badge}
        </div>

        {/* Title */}
        <h1 
          className={`md:text-5xl text-3xl font-bold py-2 text-white max-w-4xl animate-fade-in-up-delayed ${isArabic ? 'font-arabic' : ''}`}
          style={{ clipPath: "inset(0px 0% 0px 0px)" }}
        >
          {content.title}
        </h1>

        {/* Description */}
        <p 
          className={`mt-6 max-w-3xl md:text-lg text-base text-cyan-100 leading-relaxed animate-fade-in-up-slower ${isArabic ? 'font-arabic' : ''}`}
        >
          {content.description}
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex gap-4 animate-fade-in-up-slower">
          <button className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-sky-500 rounded-lg text-white font-medium hover:from-cyan-600 hover:to-sky-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25">
            {isArabic ? "ابدأ الآن" : "Get Started"}
          </button>
          <button className="px-6 py-2.5 border border-cyan-400/50 rounded-lg text-cyan-300 font-medium hover:bg-cyan-500/10 transition-all duration-300">
            {isArabic ? "اعرف المزيد" : "Learn More"}
          </button>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
          50% { transform: translateY(-20px) rotate(10deg); opacity: 1; }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.4; }
          50% { transform: translateY(-15px) rotate(-10deg); opacity: 0.8; }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-25px) rotate(15deg); opacity: 0.7; }
        }
        @keyframes slide-down {
          0% { transform: translateY(-100px); opacity: 0; }
          100% { transform: translateY(400px); opacity: 0.8; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        @keyframes scan {
          0% { transform: translateY(-100px); opacity: 0; }
          50% { transform: translateY(400px); opacity: 1; }
          100% { transform: translateY(900px); opacity: 0; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes dash {
          to { stroke-dashoffset: -10; }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up-delayed {
          0% { opacity: 0; transform: translateY(30px); }
          30% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up-slower {
          0% { opacity: 0; transform: translateY(30px); }
          60% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float-slower 8s ease-in-out infinite;
        }
        .animate-slide-down {
          animation: slide-down 3s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .animate-pulse-slower {
          animation: pulse-slower 8s ease-in-out infinite;
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        .animate-dash {
          animation: dash 2s linear infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animate-fade-in-up-delayed {
          animation: fade-in-up-delayed 1s ease-out forwards;
        }
        .animate-fade-in-up-slower {
          animation: fade-in-up-slower 1.2s ease-out forwards;
        }
        @media (max-width: 768px) {
          .animate-slide-down {
            animation: slide-down 2s linear infinite;
          }
        }
      `}</style>
    </div>
  );
}