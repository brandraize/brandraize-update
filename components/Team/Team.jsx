"use client";

import { motion } from "framer-motion";
import { LucideCodeXml, LucideUsers, LucideRocket, LucideTrophy } from "lucide-react";
import { useEffect, useRef } from "react";
import styles from "./Team.module.css";

// 🌌 Star Canvas Component
function StarCanvas({ style }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      opacity: Math.random(),
      fade: Math.random() * 0.02 + 0.005,
    }));

    function draw() {
      ctx.clearRect(0, 0, width, height); // keep background transparent

      stars.forEach(star => {
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0 || star.x > width) star.vx *= -1;
        if (star.y < 0 || star.y > height) star.vy *= -1;

        star.opacity += star.fade;
        if (star.opacity > 1 || star.opacity < 0) star.fade *= -1;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    draw();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}

export default function Team({ lang }) {
  const translations = {
    en: {
      heading: "Empowering Businesses with Innovative Technology",
      description:
        "At BrandRaize, we are a dynamic team of passionate software developers, designers, and technology experts dedicated to crafting innovative digital solutions. With over a decade of experience, we've helped businesses across various industries transform their digital presence and streamline their operations.",
      stats: [
        { value: "40+", label: "Projects Delivered", text: "Successfully completed projects across multiple industries." },
        { value: "15+", label: "Team Members", text: "Dedicated professionals driving innovation and results." },
        { value: "5+", label: "Years Experience", text: "Years of combined expertise in delivering digital solutions." },
        { value: "10+", label: "Successful Clients", text: "Clients who achieved measurable growth through our solutions." },
      ],
    },
    ar: {
      heading: "تمكين الأعمال من خلال التكنولوجيا المبتكرة",
      description:
        "في براند رايز، نحن فريق ديناميكي من مطوري البرمجيات والمصممين وخبراء التكنولوجيا المتحمسين المكرسين لصياغة حلول رقمية مبتكرة. مع أكثر من عقد من الخبرة، ساعدنا الشركات في مختلف الصناعات على تحويل حضورهم الرقمي وتبسيط عملياتهم.",
      stats: [
        { value: "40+", label: "المشاريع المنجزة", text: "مشاريع مكتملة بنجاح في صناعات متعددة." },
        { value: "15+", label: "أعضاء الفريق", text: "مهنيون ملتزمون يقودون الابتكار والنتائج." },
        { value: "5+", label: "سنوات الخبرة", text: "سنوات من الخبرة المجمعة في تقديم الحلول الرقمية." },
        { value: "10+", label: "عملاء ناجحون", text: "عملاء حققوا نموًا ملموسًا من خلال حلولنا." },
      ],
    },
  };

  const t = translations[lang] || translations.en;

  const stats = [
    { icon: <LucideCodeXml size={28} className="text-blue-custom" />, ...t.stats[0] },
    { icon: <LucideUsers size={28} className="text-blue-custom" />, ...t.stats[1] },
    { icon: <LucideRocket size={28} className="text-blue-custom" />, ...t.stats[2] },
    { icon: <LucideTrophy size={28} className="text-blue-custom" />, ...t.stats[3] },
  ];

  return (
    <section
      className="py-5 position-relative text-white"
      style={{
        backgroundColor: "#001233",
        direction: lang === "ar" ? "rtl" : "ltr",
        textAlign: lang === "ar" ? "right" : "left",
        overflow: "hidden",
      }}
    >
      {/* Star Canvas */}
      <StarCanvas />

      {/* Glowing overlay */}
      <motion.div
        className={styles.glowOverlay}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      <div className="container position-relative" style={{ zIndex: 10 }}>
        {/* Heading */}
        <div className="text-center mb-5">
          <motion.h2
            className="display-5 fw-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t.heading}
          </motion.h2>
          <motion.p
            className="text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t.description}
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="row g-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="col-lg-3 col-md-3 col-sm-12"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
            >
              <motion.div
                className="text-center p-4 bg-white bg-opacity-10 rounded-3 shadow-sm border border-white border-opacity-20"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div
                  className="mb-3 d-flex justify-content-center align-items-center rounded-circle bg-black bg-opacity-20 mx-auto"
                  style={{ width: "60px", height: "60px", backgroundColor:"transparent"}}
                >
                  {stat.icon}
                </div>
                <h3 className="fw-bold text-white">{stat.value}</h3>
                <p className="mb-0">{stat.label}</p>
                <p className="mb-0">{stat.text}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
