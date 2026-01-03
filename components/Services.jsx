"use client";

import { motion } from "framer-motion";
import { FiVideo, FiSmartphone, FiServer } from "react-icons/fi";
import { useEffect, useRef } from "react";
import { MdOutlineMovie, MdOutlinePhoneIphone, MdOutlineBrush } from 'react-icons/md';
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
      // Dark background for particles
      ctx.fillStyle = "#001233";
      ctx.fillRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        p.opacity += p.fade;
        if (p.opacity > 1 || p.opacity < 0) p.fade *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity * 0.8})`; // light particles
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    draw();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, zIndex: 0, ...style }} />;
}

// Map services to icons
const iconMap = {
  // Digital Marketing
  "Digital Marketing": <FiVideo size={50} />,
  "التسويق الرقمي": <FiVideo size={50} />,

  // Application Development
  "Application Development": <FiSmartphone size={50} />,
  "تطوير التطبيقات": <FiSmartphone size={50} />,

  // Information Technology
  "Information Technology": <FiServer size={70} />,
  "تكنولوجيا المعلومات": <FiServer size={70} />,

  // Graphic Design
  "Graphic Design": <MdOutlineBrush size={50} />,
  "التصميم الجرافيكي": <MdOutlineBrush size={50} />,

  // Video & Animation
  "Video & Animation": <MdOutlineMovie size={50} />,
  "الفيديو والأنيميشن": <MdOutlineMovie size={50} />,

  // Mobile App Development
  "Mobile App Development": <MdOutlinePhoneIphone size={50} />,
  "تطبيقات الهواتف": <MdOutlinePhoneIphone size={50} />,
};


const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Services({ lang, servicesData, sectionTitle, sectionDescription }) {
  return (
    <section className="position-relative py-5" style={{ backgroundColor: "#001233" }}>
      {/* Particle Canvas */}
      <ParticleCanvas />

      {/* Section Content */}
      <div className="container position-relative" style={{ zIndex: 1 }}>
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2 className="fs-2 text-white" style={{ fontWeight: "600" }}>{sectionTitle}</h2>
          <p className="text-white w-md-75 mx-auto" style={{ fontSize: "18px" }}>
            {sectionDescription}
          </p>
        </div>

        {/* Cards Container */}
        <motion.div
          className="row g-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {servicesData.map((service, idx) => (
            <motion.div key={idx} className="col-12 col-md-6 col-lg-4" variants={cardVariants}>
              <motion.div
  whileHover={{ y: -10 }}
  className="service-card p-4 h-100 d-flex flex-column align-items-center text-center"
  style={{
    background: "rgba(255, 255, 255, 0.05)",       // semi-transparent for glass effect
    backdropFilter: "blur(10px)",                 // blur background
    WebkitBackdropFilter: "blur(10px)",           // Safari support
    border: "1px solid rgba(255,255,255,0.2)",   // subtle border
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.05)",    
    cursor: "pointer",
    overflow: "hidden",
    color: "white",
  }}
>

              
                {/* Icon */}
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="mb-3"
                >
                  {iconMap[service.title] || (
                    <img
                      src={service.image}
                      alt={service.title}
                      style={{ width: "80px", height: "80px", objectFit: "contain" }}
                    />
                  )}
                </motion.div>

                {/* Text */}
                <h5 className="mb-2 text-white" style={{ fontWeight: "600" }}>{service.title}</h5>
                <p className="text-white">{service.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        .service-card {
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .service-card:hover {
          box-shadow: 0 12px 25px rgba(0,0,0,0.15);
        }
      `}</style>
    </section>
  );
}
