"use client";

import { motion } from "framer-motion";
import { Rocket, Lightbulb } from "lucide-react";
import { useRef, useEffect } from "react";

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
      ctx.fillStyle = "rgba(0,0,0,0.05)"; // let gradient show
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        p.opacity += p.fade;
        if (p.opacity > 1 || p.opacity < 0) p.fade *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity * 0.6})`;
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

export default function StartProject({ lang }) {
  return (
    <section
      className="position-relative py-5 text-center text-white"
      style={{ minHeight: "70vh",backgroundColor: "#001233"  }}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {/* Gradient Background */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundColor:"#001233",
          zIndex: 0,
        }}
      ></div>

      {/* Particle Canvas */}
      <ParticleCanvas />

      {/* Content */}
      <div className="container position-relative z-1 d-flex flex-column align-items-center justify-content-center h-100">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <motion.h1
            className="fw-bold display-3"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {lang === "ar"
              ? "هل أنت مستعد للارتقاء بعملك إلى المستوى التالي؟"
              : "Ready to take your business to the next level?"}
          </motion.h1>

          <motion.p
            className="lead text-light mx-auto mt-3 mb-5"
            style={{ maxWidth: "700px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {lang === "ar"
              ? "دعنا نساعدك في بناء هويتك الرقمية وتطوير مواقع وتطبيقات تلبي احتياجات عملك وتحقق أهدافك التسويقية."
              : "Let us help you build your digital identity and develop websites and apps that meet your business needs and achieve your marketing goals."}
          </motion.p>

          <motion.div
            className="d-flex flex-column flex-sm-row justify-content-center gap-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <a
              href={lang === "ar" ? "/ar/contact-us" : "/en/contact-us"}
              className="btn btn-light btn-lg d-flex align-items-center gap-2 px-4 py-3 shadow"
            >
              {lang === "ar" ? "ابدأ مشروعك الآن" : "Start your project now"}{" "}
              <Rocket size={20} />
            </a>
            <a
              href={lang === "ar" ? "/ar/service" : "/en/service"}
              className="btn btn-outline-light btn-lg d-flex align-items-center gap-2 px-4 py-3"
            >
              <Lightbulb size={20} />{" "}
              {lang === "ar" ? "استكشف خدماتنا" : "Explore Our Services"}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
