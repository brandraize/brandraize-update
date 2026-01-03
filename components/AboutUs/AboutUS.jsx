"use client";

import React, { useEffect, useRef, use } from "react";
import { useRouter } from "next/navigation";
import {
  FaMobileAlt,
  FaLaptopCode,
  FaBullhorn,
  FaPaintBrush,
  FaServer,
  }
 from "react-icons/fa";
 import { motion } from "framer-motion";
 import styles from "./aboutus.module.css";
 export default function AboutUs({ params }) {
  const resolvedParams = use(params);
  const currentLang = resolvedParams?.lang || "en";

  const router = useRouter();

  const starCanvasHero = useRef(null);
  const starCanvasStory = useRef(null);
  const starCanvasServices = useRef(null);

   //Starfield Animation
  const useStarfield = (canvasRef) => {
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");

      let width = (canvas.width = window.innerWidth);
      let height = (canvas.height = window.innerHeight);

      const resize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      };
      window.addEventListener("resize", resize);

      const stars = Array.from({ length: 200 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
      }));

      function draw() {
        ctx.fillStyle = "#001233";
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = "#fff";
        stars.forEach((s) => {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.fill();

          s.x += s.dx;
          s.y += s.dy;
          if (s.x < 0) s.x = width;
          if (s.x > width) s.x = 0;
          if (s.y < 0) s.y = height;
          if (s.y > height) s.y = 0;
        });

        requestAnimationFrame(draw);
      }
      draw();

      return () => window.removeEventListener("resize", resize);
    }, []);
  };

  useStarfield(starCanvasHero);
  useStarfield(starCanvasStory);
  useStarfield(starCanvasServices);

  // Translations
  const content = {
    en: {
      heroTitle: "About BrandRaize",
      heroSubtitle:
        "Elevating brands above the noise with creativity, technology, and strategy.",
      heroExtra:
        "We believe the future of business lies at the intersection of innovation and creativity. From startups to enterprises, BrandRaize helps brands redefine how they connect, grow, and succeed in a digital-first world.",
      history:
        "BrandRaize was created to help brands grow stronger and shine brighter. Founded by Engr. Aman Shah — a multi-skilled professional in web and mobile development, graphic design, digital marketing, and IT solutions — BrandRaize is all about turning creative ideas into real results. We believe every brand has the power to rise, combining creativity, strategy, and technology to build modern websites, mobile apps, brand identities, and marketing campaigns that truly work. Our mission is simple — to raise your brand to its full potential. Whether you’re starting out or already established, BrandRaize is your trusted partner for clarity, creativity, and growth at every stage of your journey.",
      servicesTitle: "Our Services",
      storyHeading: "Our Story",
      buttons: {
        mobile: "Mobile Apps",
        web: "See Web Solutions",
        marketing: "Explore Marketing",
        design: "View Designs",
        it: "Learn IT Solutions",
        appDev: "App Development",
      },
    },
    ar: {
      heroTitle: "عن براندرايز",
      heroSubtitle:
        "نرتقي بالعلامات التجارية فوق الضوضاء من خلال الإبداع والتكنولوجيا والاستراتيجية.",
      heroExtra:
        "نؤمن أن مستقبل الأعمال يكمن في دمج الابتكار مع الإبداع. من الشركات الناشئة إلى المؤسسات، تساعد براندرايز العلامات التجارية على إعادة تعريف كيفية النمو والنجاح في العالم الرقمي.",
      history:
        "تأسست براندرايز لمساعدة العلامات التجارية على النمو بقوة والتألق بتميز. أسسها المهندس أمان شاه — الخبير متعدد المهارات في تطوير الويب والتطبيقات، والتصميم الجرافيكي، والتسويق الرقمي، وحلول تكنولوجيا المعلومات — حيث تركز براندرايز على تحويل الأفكار الإبداعية إلى نتائج حقيقية. نحن نؤمن أن لكل علامة تجارية القدرة على الارتقاء، ولهذا نمزج بين الإبداع، والاستراتيجية، والتقنية لبناء مواقع حديثة، وتطبيقات متطورة، وهويات بصرية قوية، وحملات تسويقية فعالة. مهمتنا بسيطة — رفع علامتك التجارية إلى أقصى إمكاناتها. سواء كنت في بداية طريقك أو تمتلك مؤسسة راسخة، براندرايز هي شريكك الموثوق للوضوح والإبداع والنمو في كل مرحلة من رحلتك.",
      servicesTitle: "خدماتنا",
      storyHeading: "قصتنا",
      buttons: {
        mobile: "تطبيقات الجوال",
        web: "حلول الويب",
        marketing: "التسويق الرقمي",
        design: "تصميم جرافيك",
        it: "تكنولوجيا المعلومات",
        appDev: "تطوير التطبيقات",
      },
    },
  };

  const t = content[currentLang];

  const services = [
    {
      icon: <FaMobileAlt size={50} />,
      title: { en: "Mobile App Development", ar: "تطوير تطبيقات الجوال" },
      text: {
        en: "Custom apps for iOS and Android.",
        ar: "تطبيقات مخصصة لنظامي iOS و Android.",
      },
      link: "/service/mobile-app",
      btnKey: "mobile",
    },
    {
      icon: <FaLaptopCode size={50} />,
      title: { en: "Web Development", ar: "تطوير الويب" },
      text: {
        en: "Responsive websites for business success.",
        ar: "مواقع ويب متجاوبة لنجاح أعمالك.",
      },
      link: "/service/webdev",
      btnKey: "web",
    },
    {
      icon: <FaBullhorn size={50} />,
      title: { en: "Digital Marketing", ar: "التسويق الرقمي" },
      text: {
        en: "Grow your brand online effectively.",
        ar: "نمِّ علامتك التجارية رقمياً بفعالية.",
      },
      link: "/service/digital-marketing",
      btnKey: "marketing",
    },
    {
      icon: <FaMobileAlt size={50} />, // or you can choose any other app-related icon you prefer
      title: { en: "App Development", ar: "تطوير التطبيقات" },
      text: {
        en: "Build powerful and scalable mobile apps.",
        ar: "بناء تطبيقات جوال قوية وقابلة للتوسع.",
      },
      link: "/service/app-dev",
      btnKey: "appDev",
    },

    {
      icon: <FaPaintBrush size={50} />,
      title: { en: "Graphic Design", ar: "تصميم جرافيك" },
      text: {
        en: "Creative visuals for your brand.",
        ar: "تصاميم إبداعية لعلامتك التجارية.",
      },
      link: "/service/graphic-design",
      btnKey: "design",
    },
    {
      icon: <FaServer size={50} />,
      title: { en: "IT Solutions", ar: "حلول تقنية المعلومات" },
      text: {
        en: "Reliable IT services for enterprises.",
        ar: "خدمات تقنية موثوقة للمؤسسات.",
      },
      link: "/service/itsolutions",
      btnKey: "it",
    },
  ];

  return (
    <div className={styles.container}>
      {/* ⭐ Hero Section */}
      <section className={styles.heroSection}>
        <canvas ref={starCanvasHero} className={styles.heroCanvas} />
        <motion.div className={styles.heroContent}>
          <motion.h1 className={styles.heroTitle}>{t.heroTitle}</motion.h1>
          <motion.p className={styles.heroSubtitle}>{t.heroSubtitle}</motion.p>
          <motion.p className={styles.heroExtra}>{t.heroExtra}</motion.p>
        </motion.div>
      </section>

      {/* 🧬 Story Section */}
      <section className={styles.storySection}>
        <canvas ref={starCanvasStory} className={styles.storyCanvas} />
        <div
          className={styles.storyWrapper}
          style={{
            flexDirection: currentLang === "ar" ? "row-reverse" : "row",
          }}
        >
          <motion.div className={styles.storyText}>
            <h2 className={styles.storyHeading}>{t.storyHeading}</h2>
            <p className={styles.storyParagraph}>{t.history}</p>
          </motion.div>
          <motion.div className={styles.storyImage}>
            <img src="/aman.jpeg" alt="Our Story" />
          </motion.div>
        </div>
      </section>

      {/* 🧩 Services Section */}
      <section className={styles.servicesSection}>
        <canvas ref={starCanvasServices} className={styles.storyCanvas} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <h2 className={styles.servicesTitle}>{t.servicesTitle}</h2>
          <div className={styles.servicesGrid}>
            {services.map((s, i) => (
              <motion.div
                key={i}
                className={styles.serviceCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className={styles.serviceIcon}>{s.icon}</div>
                <h3 className={styles.serviceTitle}>{s.title[currentLang]}</h3>
                <p className={styles.serviceText}>{s.text[currentLang]}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={styles.serviceButton}
                  onClick={() => router.push(s.link)}
                >
                  {t.buttons[s.btnKey]}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
