"use client";
import './Badge.css';
import { motion } from "framer-motion";
import { LucideShield, LucideCircleCheckBig } from "lucide-react";
import { useEffect, useRef } from "react";

// 🌌 Particle Canvas Component
function ParticleCanvas({ style }) {
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

    const particles = Array.from({ length: 200 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      opacity: Math.random(),
      fade: Math.random() * 0.02 + 0.005,
    }));

    function draw() {
      ctx.fillStyle = "#001233"; // background behind particles
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#fff";
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        p.opacity += p.fade;
        if (p.opacity > 1 || p.opacity < 0) p.fade *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "#e0f7ff";
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
      style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, zIndex: 0, ...style }}
    />
  );
}

export default function Badge({ lang = "en" }) {
  const features = {
    en: ["The latest global technology", "A team of certified engineers"],
    ar: ["أحدث التقنيات العالمية", "فريق من المهندسين المعتمدين"]
  };

  const heroTitle = {
    en: "Powering Businesses with the Best Management Systems",
    ar: "تمكين الأعمال بأفضل أنظمة الإدارة"
  };

  const heroDescription = {
    en: "Streamline your operations, boost efficiency, and stay ahead with our all-in-one business management solutions — tailored for your success.",
    ar: "قم بتحسين عملياتك، وزيادة الكفاءة، والبقاء في المقدمة باستخدام حلول إدارة الأعمال الشاملة الخاصة بنا — مصممة خصيصًا لنجاحك."
  };

  const circleColors = ["#FACC15", "#F472B6", "#38BDF8", "#34D399", "#F87171", "#A78BFA"];

  return (
    <section className="hero-section col-lg-12 mx-auto position-relative" dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* Particle Canvas */}
      <ParticleCanvas />

      <div className="hero-container row align-items-center position-relative" style={{ zIndex: 1 }}>

        {/* Text Section */}
        <div className={`col-lg-8 order-2 order-lg-1 ${lang === "ar" ? "text-end" : "text-start"}`}>
          <motion.h2
            className="fw-bold mb-3"
            initial={{ opacity: 0, x: lang === "ar" ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {heroTitle[lang]}
          </motion.h2>
          <motion.p
            className="mb-4"
            initial={{ opacity: 0, x: lang === "ar" ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {heroDescription[lang]}
          </motion.p>

          <div className={`d-flex flex-wrap gap-2 ${lang === "ar" ? "justify-content-end" : ""}`}>
            {features[lang].map((feature, idx) => (
              <div key={idx} className="feature-badge">
                <span>{feature}</span>
                <LucideCircleCheckBig size={20} color="white" />
              </div>
            ))}
          </div>
        </div>

        {/* Icon Section */}
        <div className={`col-lg-4 d-flex justify-content-center ${lang === "ar" ? "justify-content-lg-start" : "justify-content-lg-end"} order-1 order-lg-2 mb-4 mb-lg-0`}>
          <div className="shield-container">
            {circleColors.map((color, idx) => (
              <motion.div
                key={idx}
                className="floating-circle"
                style={{ backgroundColor: color }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2 + idx * 0.2, repeat: Infinity, repeatType: "loop" }}
              />
            ))}
            <div className="shield-center">
              <LucideShield size={80} color="#1E3A8A" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
