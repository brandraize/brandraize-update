"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaShoppingCart, FaCode, FaLaptopCode, FaGraduationCap, FaUsers, FaDatabase } from "react-icons/fa";
import Link from "next/link";
import Skills from "@/components/Skills/Skills";

export default function WebDevelopmentPage({ params }) {
  const canvasRef = useRef(null);
  const { lang } = React.use(params); // Next.js 14+ way

  // Translations
  const t = {
    en: {
      heroTitle: "We Create Exceptionally Creative Web Designs",
      heroDescription: "BrandRaize knows your high standards and loves to meet them ingeniously.",
      services: [
        { title: "E-commerce Website Development", description: "Custom solutions for online stores." },
        { title: "CMS/Custom Website Development", description: "Tailored content management systems and custom-built websites." },
        { title: "Application Website Development", description: "Websites designed to support various applications." },
        { title: "E-Learning Platforms", description: "Specialized platforms catering to education." },
        { title: "Social Networking Platforms", description: "Connecting people through interactive websites." },
        { title: "CRM Platforms", description: "Managing customer relationships efficiently." },
      ],
      process: ["Define Requirement", "Architect Solution", "Design Interface", "Develop Functionality", "Testing", "Deliver", "Support"],
      getStarted: "Get Started",
      readMore: "Read More",
      servicesHeading: "Our Services",
      processHeading: "Development Process",
    },
    ar: {
      heroTitle: "نقوم بإنشاء تصاميم ويب مبتكرة بشكل استثنائي",
      heroDescription: "براند رايز تعرف معاييرك العالية وتحب تلبيتها ببراعة.",
      services: [
        { title: "تطوير مواقع التجارة الإلكترونية", description: "حلول مخصصة للمتاجر عبر الإنترنت." },
        { title: "تطوير أنظمة إدارة المحتوى/المواقع المخصصة", description: "أنظمة إدارة محتوى ومواقع مصممة خصيصًا." },
        { title: "تطوير مواقع التطبيقات", description: "مواقع مصممة لدعم تطبيقات مختلفة." },
        { title: "منصات التعلم الإلكتروني", description: "منصات متخصصة في التعليم." },
        { title: "منصات الشبكات الاجتماعية", description: "ربط الناس من خلال مواقع تفاعلية." },
        { title: "منصات إدارة العملاء", description: "إدارة علاقات العملاء بكفاءة." },
      ],
      process: ["تحديد المتطلبات", "تصميم الحل", "تصميم الواجهة", "تطوير الوظائف", "الاختبار", "التسليم", "الدعم"],
      getStarted: "ابدأ الآن",
      readMore: "اقرأ المزيد",
      servicesHeading: "خدماتنا",
      processHeading: "عملية التطوير",
    },
  }[lang ?? "en"];

  // Map icons to services
  const servicesWithIcons = [
    <FaShoppingCart size={40} />,
    <FaCode size={40} />,
    <FaLaptopCode size={40} />,
    <FaGraduationCap size={40} />,
    <FaUsers size={40} />,
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

  // Framer Motion variants
  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: i * 0.3, duration: 0.8, ease: "easeOut" } }),
  };

  return (
    <section className={`web-dev-page position-relative ${lang === "ar" ? "text-end" : "text-start"}`} dir={lang === "ar" ? "rtl" : "ltr"}>
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

      {/* Styles */}
      <style jsx>{`
        .web-dev-page { background-color: #0d1f4c; }
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
