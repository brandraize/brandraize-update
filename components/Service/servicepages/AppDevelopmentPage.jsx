"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaMobileAlt, FaReact, FaServer, FaApple, FaAndroid, FaDatabase } from "react-icons/fa";
import Link from "next/link";
import Skills from '@/components/Skills/Skills';

export default function AppDevelopmentPage({ params }) {
  const canvasRef = useRef(null);
  const { lang } = React.use(params);

  // Translations
  const t = {
    en: {
      heroTitle: "Exceptional App Development Solutions",
      heroDescription: "BrandRaize delivers innovative mobile and web applications to transform your business.",
      services: [
        { title: "Native Mobile App Development", description: "iOS & Android native apps tailored to your needs." },
        { title: "Cross-Platform App Development", description: "React Native & Flutter apps for multiple platforms." },
        { title: "Enterprise App Solutions", description: "Scalable business applications with robust backend." },
        { title: "iOS App Development", description: "Optimized apps for the Apple ecosystem." },
        { title: "Android App Development", description: "Feature-rich applications for Android devices." },
        { title: "API Integration & Backend", description: "Seamless backend integration and database management." },
      ],
      process: ["Define Requirement", "Architect Solution", "Design UI/UX", "Develop Functionality", "Testing & QA", "Deploy", "Support & Maintenance"],
      getStarted: "Get Started",
      readMore: "Read More",
      servicesHeading: "Our App Development Services",
      processHeading: "Development Process",
    },
    ar: {
      heroTitle: "حلول تطوير التطبيقات الاستثنائية",
      heroDescription: "براند رايز تقدم تطبيقات مبتكرة للويب والجوال لتحويل أعمالك.",
      services: [
        { title: "تطوير تطبيقات الجوال الأصلية", description: "تطبيقات iOS وAndroid مصممة خصيصًا لاحتياجاتك." },
        { title: "تطوير التطبيقات عبر الأنظمة", description: "تطبيقات React Native وFlutter لمختلف الأنظمة." },
        { title: "حلول تطبيقات المؤسسات", description: "تطبيقات أعمال قابلة للتوسع مع خلفية قوية." },
        { title: "تطوير تطبيقات iOS", description: "تطبيقات محسّنة لنظام Apple." },
        { title: "تطوير تطبيقات Android", description: "تطبيقات غنية بالميزات لأجهزة Android." },
        { title: "تكامل API والخلفية", description: "تكامل سلس وإدارة قواعد البيانات." },
      ],
      process: ["تحديد المتطلبات", "تصميم الحل", "تصميم واجهة المستخدم", "تطوير الوظائف", "الاختبار وضمان الجودة", "النشر", "الدعم والصيانة"],
      getStarted: "ابدأ الآن",
      readMore: "اقرأ المزيد",
      servicesHeading: "خدمات تطوير التطبيقات لدينا",
      processHeading: "عملية التطوير",
    },
  }[lang ?? "en"];

  const servicesWithIcons = [
    <FaMobileAlt size={40} />,
    <FaReact size={40} />,
    <FaServer size={40} />,
    <FaApple size={40} />,
    <FaAndroid size={40} />,
    <FaDatabase size={40} />,
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
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.8, ease: "easeOut" },
    }),
  };

  return (
    <section className={`app-dev-page position-relative ${lang === "ar" ? "text-end" : "text-start"}`} dir={lang === "ar" ? "rtl" : "ltr"}>
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

      {/* Development Process */}
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

      <style jsx>{`
        .app-dev-page { background-color: #0d1f4c; }
        .particles-canvas { z-index: 0; }
        .service-card { background: linear-gradient(135deg, #6a11cb, #2575fc); color: #fff; transition: transform 0.3s, box-shadow 0.3s; }
        .service-card:hover { transform: translateY(-10px); box-shadow: 0 10px 20px rgba(0,0,0,0.3); }
        .service-card .icon { color: #fff; }
        .process-card { background: linear-gradient(135deg, #f7971e, #ffd200); color: #0d1f4c; transition: transform 0.3s, box-shadow 0.3s; }
        .process-card:hover { transform: translateY(-10px); box-shadow: 0 10px 20px rgba(0,0,0,0.3); }
      `}</style>
    </section>
  );
}
