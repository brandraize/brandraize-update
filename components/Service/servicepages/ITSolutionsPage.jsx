"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCloud, FaServer, FaShieldAlt, FaNetworkWired, FaTools, FaDatabase } from "react-icons/fa";
import Link from "next/link";
import Skills from '@/components/Skills/Skills';

export default function ITSolutionsPage({ params }) {
  const canvasRef = useRef(null);
  const { lang } = React.use(params);

  // Translations
  const t = {
    en: {
      heroTitle: "Innovative IT Solutions for Your Business",
      heroDescription: "BrandRaize delivers end-to-end IT solutions tailored to optimize your operations and security.",
      services: [
        { title: "Cloud Solutions", description: "Scalable and secure cloud infrastructure." },
        { title: "IT Infrastructure", description: "Comprehensive IT infrastructure setup and management." },
        { title: "Cybersecurity Services", description: "Protect your business with advanced cybersecurity." },
        { title: "Network Management", description: "Efficient networking and connectivity solutions." },
        { title: "Software Support & Maintenance", description: "Ongoing software updates, bug fixes, and support." },
        { title: "Database Management", description: "Reliable database design, monitoring, and optimization." },
      ],
      process: ["Define Requirement", "Architect Solution", "Design Interface", "Develop Functionality", "Testing & QA", "Deploy System", "Support & Maintenance"],
      getStarted: "Get Started",
      readMore: "Read More",
      servicesHeading: "Our IT Services",
      processHeading: "Development Process",
    },
    ar: {
      heroTitle: "حلول تكنولوجيا المعلومات المبتكرة لأعمالك",
      heroDescription: "براند رايز تقدم حلول شاملة لتكنولوجيا المعلومات لتحسين عملياتك وأمانك.",
      services: [
        { title: "حلول السحابة", description: "بنية تحتية سحابية قابلة للتوسع وآمنة." },
        { title: "البنية التحتية لتكنولوجيا المعلومات", description: "إعداد وإدارة شاملة للبنية التحتية لتكنولوجيا المعلومات." },
        { title: "خدمات الأمن السيبراني", description: "حماية أعمالك باستخدام تقنيات الأمن السيبراني المتقدمة." },
        { title: "إدارة الشبكات", description: "حلول شبكية وكفاءة عالية للاتصال." },
        { title: "دعم وصيانة البرمجيات", description: "تحديثات مستمرة وإصلاح الأخطاء ودعم البرمجيات." },
        { title: "إدارة قواعد البيانات", description: "تصميم ومراقبة وتحسين قواعد البيانات بشكل موثوق." },
      ],
      process: ["تحديد المتطلبات", "تصميم الحل", "تصميم الواجهة", "تطوير الوظائف", "الاختبار وضمان الجودة", "نشر النظام", "الدعم والصيانة"],
      getStarted: "ابدأ الآن",
      readMore: "اقرأ المزيد",
      servicesHeading: "خدمات تكنولوجيا المعلومات لدينا",
      processHeading: "عملية التطوير",
    },
  }[lang ?? "en"];

  const servicesWithIcons = [
    <FaCloud size={40} />,
    <FaServer size={40} />,
    <FaShieldAlt size={40} />,
    <FaNetworkWired size={40} />,
    <FaTools size={40} />,
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
    <section className={`it-solutions-page position-relative ${lang === "ar" ? "text-end" : "text-start"}`} dir={lang === "ar" ? "rtl" : "ltr"}>
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
        .it-solutions-page { background-color: #0d1f4c; }
        .particles-canvas { z-index: 0; }
        .service-card { background: linear-gradient(135deg, #36d1dc, #5b86e5); color: #fff; transition: transform 0.3s, box-shadow 0.3s; }
.service-card:hover { transform: translateY(-10px); box-shadow: 0 10px 20px rgba(0,0,0,0.3); }
        .service-card .icon { color: #fff; }
        .process-card { background: linear-gradient(135deg, #f7971e, #ffd200); color: #0d1f4c; transition: transform 0.3s, box-shadow 0.3s; }
        .process-card:hover { transform: translateY(-10px); box-shadow: 0 10px 20px rgba(0,0,0,0.3); }
      `}</style>
    </section>
  );
}
