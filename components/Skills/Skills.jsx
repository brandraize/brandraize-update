"use client";

import React, { useRef, useEffect } from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaPython,
  FaJava,
  FaPhp,
  FaAws,
  FaRobot,
  FaCloud,
  FaGitAlt,
  FaLinux,
  FaAngular,
  FaVuejs,
} from "react-icons/fa";
import {
  SiMongodb,
  SiMysql,
  SiDocker,
  SiTensorflow,
  SiKeras,
  SiPytorch,
  SiOpencv,
  SiGooglecloud,
  SiKubernetes,
  SiRedux,
  SiGraphql,
  SiSolidity,
  SiJenkins,
  SiFlutter,
  SiDjango,
} from "react-icons/si";
import { GiArtificialIntelligence, GiCube } from "react-icons/gi";
import "./Skills.css";

export default function TechMarquee({ lang = "en" }) {
  const canvasRef = useRef(null);

  // Translations
  const translations = {
    en: {
      heading: "Technologies We Use",
      description:
        "From web and mobile to AI, DevOps, and Cloud — we leverage cutting-edge technologies to build innovative solutions.",
      techNames: {
        HTML5: "HTML5",
        CSS3: "CSS3",
        JavaScript: "JavaScript",
        React: "React",
        Angular: "Angular",
        "Vue.js": "Vue.js",
        Redux: "Redux",
        GraphQL: "GraphQL",
        "Node.js": "Node.js",
        Python: "Python",
        Django: "Django",
        Flutter: "Flutter",
        Java: "Java",
        PHP: "PHP",
        MySQL: "MySQL",
        MongoDB: "MongoDB",
        Docker: "Docker",
        Kubernetes: "Kubernetes",
        Jenkins: "Jenkins",
        AWS: "AWS",
        "Google Cloud": "Google Cloud",
        Cloud: "Cloud",
        Git: "Git",
        Linux: "Linux",
        TensorFlow: "TensorFlow",
        PyTorch: "PyTorch",
        Keras: "Keras",
        OpenCV: "OpenCV",
        AI: "AI",
        Robotics: "Robotics",
        Solidity: "Solidity",
        Blockchain: "Blockchain",
      },
    },
    ar: {
      heading: "التقنيات التي نستخدمها",
      description:
        "من الويب والتطبيقات إلى الذكاء الاصطناعي وDevOps والسحابة — نستخدم أحدث التقنيات لبناء حلول مبتكرة.",
      techNames: {
        HTML5: "إتش تي إم إل 5",
        CSS3: "سي إس إس 3",
        JavaScript: "جافاسكربت",
        React: "ريأكت",
        Angular: "أنجولار",
        "Vue.js": "فيو ج إس",
        Redux: "ريدوكس",
        GraphQL: "جراف كيو إل",
        "Node.js": "نود ج إس",
        Python: "بايثون",
        Django: "جانغو",
        Flutter: "فلاتر",
        Java: "جافا",
        PHP: "بي إتش بي",
        MySQL: "ماي إس كيو إل",
        MongoDB: "مونجو دي بي",
        Docker: "دوكر",
        Kubernetes: "كوبيرنيتيس",
        Jenkins: "جينكينز",
        AWS: "إيه دبليو إس",
        "Google Cloud": "جوجل كلاود",
        Cloud: "السحابة",
        Git: "جيت",
        Linux: "لينكس",
        TensorFlow: "تينسور فلو",
        PyTorch: "باي تورش",
        Keras: "كيراس",
        OpenCV: "أوبن سي في",
        AI: "الذكاء الاصطناعي",
        Robotics: "الروبوتات",
        Solidity: "سوليديتي",
        Blockchain: "البلوكتشين",
      },
    },
  };

  const t = translations[lang] ?? translations.en;

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

    const particles = [];
    const particleCount = 150;

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
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
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

  // Tech rows
  const techRows = [
    [
      { icon: FaHtml5, name: "HTML5" },
      { icon: FaCss3Alt, name: "CSS3" },
      { icon: FaJs, name: "JavaScript" },
      { icon: FaReact, name: "React" },
      { icon: FaAngular, name: "Angular" },
      { icon: FaVuejs, name: "Vue.js" },
      { icon: SiRedux, name: "Redux" },
      { icon: SiGraphql, name: "GraphQL" },
      { icon: FaNodeJs, name: "Node.js" },
      { icon: FaPython, name: "Python" },
      { icon: SiDjango, name: "Django" },
      { icon: SiFlutter, name: "Flutter" },
    ],
    [
      { icon: FaJava, name: "Java" },
      { icon: FaPhp, name: "PHP" },
      { icon: SiMysql, name: "MySQL" },
      { icon: SiMongodb, name: "MongoDB" },
      { icon: SiDocker, name: "Docker" },
      { icon: SiKubernetes, name: "Kubernetes" },
      { icon: SiJenkins, name: "Jenkins" },
      { icon: FaAws, name: "AWS" },
      { icon: SiGooglecloud, name: "Google Cloud" },
      { icon: FaCloud, name: "Cloud" },
      { icon: FaGitAlt, name: "Git" },
      { icon: FaLinux, name: "Linux" },
    ],
    [
      { icon: SiTensorflow, name: "TensorFlow" },
      { icon: SiPytorch, name: "PyTorch" },
      { icon: SiKeras, name: "Keras" },
      { icon: SiOpencv, name: "OpenCV" },
      { icon: GiArtificialIntelligence, name: "AI" },
      { icon: FaRobot, name: "Robotics" },
      { icon: SiSolidity, name: "Solidity" },
      { icon: GiCube, name: "Blockchain" },
    ],
  ];

  return (
    <section
      className={`tech-marquee-wrapper ${lang === "ar" ? "text-end" : "text-start"}`}
      dir={lang === "ar" ? "rtl" : "ltr"}
      style={{ backgroundColor: "#001233" }}
// or


    >
      <canvas ref={canvasRef} className="tech-particles"></canvas>
      <div className="tech-marquee">
       <div className="container text-center py-4 px-3">
  <h1 className="fw-bold text-white">{t.heading}</h1>
  <p className="text-white text-wrap">
    {t.description}
  </p>
</div>




        {techRows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`marquee ${rowIndex % 2 === 0 ? "marquee-left" : "marquee-right"} mt-4`}
          >
            <div className="marquee-content">
              {row.map((tech, i) => {
                const Icon = tech.icon;
                return (
                  <div key={i} className="tech-item">
                    <Icon className={`tech-icon ${tech.name.toLowerCase()}`} />
                    <span>{t.techNames[tech.name]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
