"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaLaptopCode, FaMobileAlt, FaServer } from "react-icons/fa";
import Skills from "@/components/Skills/Skills";
             // Video & Animation
import { HiOutlineSpeakerphone } from "react-icons/hi";       // Digital Marketing
import { MdOutlineBrush } from "react-icons/md";              // Graphic Design
import { MdOutlinePhoneIphone } from "react-icons/md";    
export default function Page({ params }) {
const { lang } = React.use(params);// Get lang from URL: /en/page or /ar/page

  const translations = {
    en: {
      heroTitle: "Our Services",
      heroDesc: "At BrandRaize, we're passionate about creating innovative digital solutions that help businesses thrive in the modern world.",
      explore: "Explore Services",
      learnMore: "Learn More",
      services: [
        { title: "Web Development", description: "Build scalable and responsive websites tailored to your business needs.", link: "/service/webdev", icon: <FaLaptopCode size={40} color="#fff" /> },
        { title: "App Development", description: "Create intuitive and engaging mobile applications for iOS and Android platforms.", link: "/service/appdev", icon: <FaMobileAlt size={40} color="#fff" /> },
        { title: "IT Solutions", description: "Implement robust IT infrastructure and solutions for seamless operations.", link: "/service/itsolutions", icon: <FaServer size={40} color="#fff" /> },
    
        {
    title: "Digital Marketing",
    description: "Boost your online presence with SEO, social media, PPC, and content strategies.",
    link: "/service/digital-marketing",
    icon: <HiOutlineSpeakerphone size={40} color="#fff" />,
  },
  {
    title: "Graphic Design",
    description: "Design compelling visuals for web, print, and digital platforms to capture attention.",
    link: "/service/graphic-design",
    icon: <MdOutlineBrush size={40} color="#fff" />,
  },
  {
    title: "Mobile App Development",
    description: "Build responsive and scalable mobile apps for iOS and Android platforms.",
    link: "/service/mobile-app",
    icon: <MdOutlinePhoneIphone size={40} color="#fff" />,
  },
      ],
    },
    ar: {
      heroTitle: "خدماتنا",
      heroDesc: "في BrandRaize، نحن شغوفون بابتكار حلول رقمية تساعد الشركات على الازدهار في العصر الحديث.",
      explore: "استكشف الخدمات",
      learnMore: "اعرف المزيد",
      services: [
        { title: "تطوير مواقع الويب", description: "بناء مواقع ويب قابلة للتطوير والاستجابة مصممة وفق احتياجات عملك.", link: "/service/webdev", icon: <FaLaptopCode size={40} color="#fff" /> },
        { title: "تطوير التطبيقات", description: "إنشاء تطبيقات جوال جذابة وسهلة الاستخدام لمنصات iOS وAndroid.", link: "/service/appdev", icon: <FaMobileAlt size={40} color="#fff" /> },
        { title: "حلول تكنولوجيا المعلومات", description: "تنفيذ بنية تحتية وحلول تكنولوجيا المعلومات لتشغيل سلس.", link: "/service/itsolutions", icon: <FaServer size={40} color="#fff" /> },
        {
  title: "التسويق الرقمي",
  description: "عزّز حضورك على الإنترنت من خلال تحسين محركات البحث، ووسائل التواصل الاجتماعي، والإعلانات المدفوعة، واستراتيجيات المحتوى.",
  link: "/service/digital-marketing",
  icon: <HiOutlineSpeakerphone size={40} color="#fff" />,
},
{
  title: "تصميم الجرافيك",
  description: "صمّم مرئيات جذابة للويب والطباعة والمنصات الرقمية لجذب الانتباه.",
  link: "/service/graphic-design",
  icon: <MdOutlineBrush size={40} color="#fff" />,
},
{
  title: "تطوير تطبيقات الجوال",
  description: "أنشئ تطبيقات جوال متجاوبة وقابلة للتوسع لأنظمة iOS وAndroid.",
  link: "/service/mobile-app-development",
  icon: <MdOutlinePhoneIphone size={40} color="#fff" />,
}
      ],
    },
  };

  const t = translations[lang];
  const canvasRef = useRef(null);

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

    const particles = [];
    const particleCount = 200;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 1.5,
        dy: (Math.random() - 0.5) * 1.5,
      });
    }

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
    <section className={`position-relative overflow-hidden ${lang === "ar" ? "text-end" : "text-start"}`} dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <div className="position-relative">
        <video autoPlay muted loop className="position-absolute top-0 start-0 w-100 h-100" style={{ objectFit: "cover", zIndex: 0 }}>
          <source src="/particles.mp4" type="video/mp4" />
        </video>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1 }}></div>
        <div className="d-flex flex-column justify-content-center align-items-center text-center text-white" style={{ zIndex: 2, position: "relative", minHeight: "90vh", padding: "6rem 1rem" }}>
          <motion.h1 className="display-1 fw-bold" custom={1} initial="hidden" animate="visible" variants={heroVariants}>
            {t.heroTitle}
          </motion.h1>
          <motion.p className="lead mt-3 fs-3" custom={2} initial="hidden" animate="visible" variants={heroVariants} style={{ maxWidth: "800px", lineHeight: "1.5" }}>
            {t.heroDesc}
          </motion.p>
          <motion.div custom={3} initial="hidden" animate="visible" variants={heroVariants}>
            <Link href="/service/webdev" className="btn btn-primary btn-lg mt-4">
              {t.explore}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Services Section */}
      <div className="position-relative" style={{ backgroundColor: "#0d1f4c" }}>
        <canvas ref={canvasRef} className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 0 }}></canvas>
        <div className="container position-relative py-5" style={{ zIndex: 1 }}>
          <h2 className="text-center mb-5 fw-bold text-white">{t.heroTitle}</h2>
          <div className="row">
            {t.services.map((service, index) => (
              <div className="col-md-6 col-lg-4 col-sm-12 mb-4" key={index}>
                <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.5, duration: 0.6 }} className="card h-100 p-4 text-center border-0 rounded-4 shadow-lg service-card" style={{ backgroundColor: "transparent", color: "#fff" }}>
                  <div className="mb-3 p-4 rounded-circle mx-auto d-flex justify-content-center align-items-center" style={{ background: "linear-gradient(135deg, #6610f2, #0d6efd)" }}>
                    {service.icon}
                  </div>
                  <h5 className="fw-bold">{service.title}</h5>
                  <p>{service.description}</p>
                  <Link href={service.link} className="btn btn-light mt-3 text-dark">
                    {t.learnMore}
                  </Link>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Skills lang={lang} />

      <style jsx>{`
        .service-card:hover {
          transform: translateY(-10px) scale(1.03);
          transition: all 0.3s ease;
        }
      `}</style>
    </section>
  );
}
