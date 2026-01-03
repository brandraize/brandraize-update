"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaMobileAlt, FaCode, FaCogs, FaCloud, FaShieldAlt, FaRocket } from "react-icons/fa";
import Link from "next/link";
import Skills from "@/components/Skills/Skills";

export default function MobileAppPage({ params }) {
  const canvasRef = useRef(null);
  const { lang } = React.use(params);

  const t = {
    en: {
      heroTitle: "Transform Your Ideas Into Stunning Mobile Applications",
      heroDescription: "BrandRaize builds high-performing, secure, and scalable mobile apps tailored for your business growth.",
      services: [
        { title: "iOS App Development", description: "Custom iPhone and iPad applications with modern UI/UX." },
        { title: "Android App Development", description: "Scalable Android apps optimized for performance." },
        { title: "Cross-Platform Apps", description: "Apps built once, deployed everywhere with React Native & Flutter." },
        { title: "Backend Integration", description: "Seamless APIs and cloud connectivity for your apps." },
        { title: "App Security", description: "Robust security layers to protect sensitive user data." },
        { title: "App Maintenance & Support", description: "Continuous updates and support for long-term success." },
      ],
      process: ["Planning", "UI/UX Design", "Development", "Integration", "Testing", "Deployment", "Support"],
      getStarted: "Get Started",
      readMore: "Read More",
      servicesHeading: "Our Mobile App Services",
      processHeading: "App Development Process",
    },
    ar: {
      heroTitle: "حوّل أفكارك إلى تطبيقات موبايل مذهلة",
      heroDescription: "براند رايز تبني تطبيقات موبايل عالية الأداء وآمنة وقابلة للتوسع تدعم نمو عملك.",
      services: [
        { title: "تطوير تطبيقات iOS", description: "تطبيقات مخصصة للآيفون والآيباد بتصاميم حديثة." },
        { title: "تطوير تطبيقات أندرويد", description: "تطبيقات أندرويد قابلة للتوسع ومُحسّنة للأداء." },
        { title: "تطبيقات متعددة المنصات", description: "تطبيقات تُبنى مرة واحدة وتعمل على جميع المنصات باستخدام React Native وFlutter." },
        { title: "تكامل مع الخوادم", description: "ربط التطبيقات مع واجهات برمجية وخدمات سحابية بسهولة." },
        { title: "أمان التطبيقات", description: "طبقات حماية قوية لبيانات المستخدمين الحساسة." },
        { title: "الصيانة والدعم", description: "تحديثات ودعم مستمر لضمان النجاح الطويل." },
      ],
      process: ["التخطيط", "تصميم الواجهة", "التطوير", "التكامل", "الاختبار", "الإطلاق", "الدعم"],
      getStarted: "ابدأ الآن",
      readMore: "اقرأ المزيد",
      servicesHeading: "خدمات تطبيقات الموبايل",
      processHeading: "عملية تطوير التطبيقات",
    },
  }[lang ?? "en"];

  const servicesWithIcons = [
    <FaMobileAlt size={40} />,
    <FaCode size={40} />,
    <FaCogs size={40} />,
    <FaCloud size={40} />,
    <FaShieldAlt size={40} />,
    <FaRocket size={40} />,
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
    <section className={`mobile-app-page position-relative ${lang === "ar" ? "text-end" : "text-start"}`} dir={lang === "ar" ? "rtl" : "ltr"}>
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

      {/* App Development Process */}
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
        .mobile-app-page { background-color: #0d1f4c; }
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
