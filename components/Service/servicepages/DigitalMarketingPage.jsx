"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaBullhorn, FaChartLine, FaSearchDollar, FaEnvelopeOpenText, FaUsers, FaVideo } from "react-icons/fa";
import Link from "next/link";
import Skills from "@/components/Skills/Skills";

export default function DigitalMarketingPage({ params }) {
  const canvasRef = useRef(null);
  const { lang } = React.use(params);

  const t = {
    en: {
      heroTitle: "Grow Your Business With Powerful Digital Marketing Strategies",
      heroDescription: "BrandRaize delivers creative campaigns and measurable results that boost your online presence.",
      services: [
        { title: "Social Media Marketing", description: "Engaging campaigns across platforms like Facebook, Instagram, and LinkedIn." },
        { title: "SEO Optimization", description: "Improve your rankings and visibility on search engines." },
        { title: "PPC Campaigns", description: "Targeted ads designed for maximum ROI." },
        { title: "Email Marketing", description: "Personalized campaigns that drive customer engagement." },
        { title: "Influencer Marketing", description: "Collaborations with key industry influencers." },
        { title: "Video Marketing", description: "Compelling video content to tell your brand story." },
      ],
      process: ["Research", "Strategy", "Campaign Design", "Execution", "Monitoring", "Optimization", "Reporting"],
      getStarted: "Get Started",
      readMore: "Read More",
      servicesHeading: "Our Services",
      processHeading: "Marketing Process",
    },
    ar: {
      heroTitle: "نمّي عملك باستراتيجيات تسويق رقمي قوية",
      heroDescription: "براند رايز تقدم حملات إبداعية ونتائج قابلة للقياس تعزز وجودك عبر الإنترنت.",
      services: [
        { title: "التسويق عبر وسائل التواصل الاجتماعي", description: "حملات تفاعلية على فيسبوك وإنستغرام ولينكدإن." },
        { title: "تحسين محركات البحث (SEO)", description: "تحسين ترتيبك وظهورك في محركات البحث." },
        { title: "إعلانات الدفع بالنقرة (PPC)", description: "إعلانات موجهة تحقق أقصى عائد استثماري." },
        { title: "التسويق عبر البريد الإلكتروني", description: "حملات مخصصة تزيد من تفاعل العملاء." },
        { title: "التسويق عبر المؤثرين", description: "تعاون مع مؤثرين بارزين في مجالك." },
        { title: "التسويق عبر الفيديو", description: "محتوى فيديو جذاب يحكي قصة علامتك التجارية." },
      ],
      process: ["البحث", "الاستراتيجية", "تصميم الحملة", "التنفيذ", "المتابعة", "التحسين", "التقارير"],
      getStarted: "ابدأ الآن",
      readMore: "اقرأ المزيد",
      servicesHeading: "خدماتنا",
      processHeading: "عملية التسويق",
    },
  }[lang ?? "en"];

  const servicesWithIcons = [
    <FaBullhorn size={40} />,
    <FaChartLine size={40} />,
    <FaSearchDollar size={40} />,
    <FaEnvelopeOpenText size={40} />,
    <FaUsers size={40} />,
    <FaVideo size={40} />,
  ];

  // Particle Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 1.5,
      dy: (Math.random() - 0.5) * 1.5,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx = -p.dx;
        if (p.y < 0 || p.y > canvas.height) p.dy = -p.dy;
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: i * 0.3, duration: 0.8, ease: "easeOut" } }),
  };

  return (
    <section className={`digital-marketing-page position-relative ${lang === "ar" ? "text-end" : "text-start"}`} dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <div className="hero-section position-relative" style={{ minHeight: "70vh" }}>
        <canvas ref={canvasRef} className="particles-canvas position-absolute top-0 start-0 w-100 h-100"></canvas>
        <div className="hero-content d-flex flex-column justify-content-center align-items-center text-center text-white" style={{ zIndex: 1, position: "relative", padding: "4rem 1rem" }}>
          <motion.h1 className="display-1 fw-bold" custom={1} initial="hidden" animate="visible" variants={heroVariants} style={{ maxWidth: "1000px", lineHeight: "1.5" }}>
            {t.heroTitle}
          </motion.h1>
          <motion.p className="lead mt-3 fs-3" custom={2} initial="hidden" animate="visible" variants={heroVariants} style={{ maxWidth: "800px", lineHeight: "1.5" }}>
            {t.heroDescription}
          </motion.p>
          <motion.div custom={3} initial="hidden" animate="visible" variants={heroVariants} className="mt-4 d-flex gap-3 flex-wrap justify-content-center">
            <button className="btn btn-primary btn-lg" onClick={() => document.getElementById("services-section")?.scrollIntoView({ behavior: "smooth" })}>
              {t.readMore}
            </button>
            <Link href="/contact-us" className="btn btn-outline border text-light p-2">{t.getStarted}</Link>
          </motion.div>
        </div>
      </div>

      {/* Services Section */}
      <section id="services-section" className="service-offerings py-5">
        <div className="container">
          <h2 className="text-center mb-5 text-white fw-bold">{t.servicesHeading}</h2>
          <div className="row g-4">
            {t.services.map((service, idx) => (
              <div key={idx} className="col-md-6 col-lg-4 d-flex">
                <div className="service-card p-4 rounded text-center flex-fill d-flex flex-column justify-content-between">
                  <div>
                    <div className="icon mb-3">{servicesWithIcons[idx]}</div>
                    <h4 className="mb-3">{service.title}</h4>
                    <p>{service.description}</p>
                  </div>
                  <Link href="/contact-us" className="btn btn-light mt-3">{t.getStarted}</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketing Process */}
      <section className="development-process py-5">
        <div className="container">
          <h2 className="text-center mb-5 text-white fw-bold">{t.processHeading}</h2>
          <div className="row g-4 justify-content-center">
            {t.process.map((step, idx) => (
              <div key={idx} className="col-md-3 col-sm-6 d-flex">
                <div className="process-card p-4 rounded text-center flex-fill">
                  <h5>{step}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Skills lang={lang} />

      {/* Styles */}
      <style jsx>{`
        .digital-marketing-page { background-color: #0d1f4c; }
        .particles-canvas { z-index: 0; }
        .service-card { 
          background: linear-gradient(135deg, #0a1f44, #1d3557); 
          color: #fff; 
          transition: transform 0.3s, box-shadow 0.3s; 
        }
        .service-card:hover { transform: translateY(-10px); box-shadow: 0 10px 20px rgba(0,0,0,0.3); }
        .service-card .icon { color: #fff; }
        .process-card { 
          background: linear-gradient(135deg, #ffd200, #ffea70); 
          color: #0d1f4c; 
          transition: transform 0.3s, box-shadow 0.3s; 
        }
        .process-card:hover { transform: translateY(-10px); box-shadow: 0 10px 20px rgba(0,0,0,0.3); }
      `}</style>
    </section>
  );
}
