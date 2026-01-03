"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection({
  text = "Get in Touch",
  lang = "en",
  heroTitle,
  heroDescription,
}) {
  const [hover, setHover] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const isRTL = lang === "ar";

  useEffect(() => {
    setIsLoaded(true);
    // Only load video on desktop after initial render
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    if (mediaQuery.matches) {
      // Delay video loading to improve LCP
      const timer = setTimeout(() => setShowVideo(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section
      className="position-relative w-100 d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#001233",
      }}
    >
      {/* Background video - only on desktop, delayed load */}
      {showVideo && (
        <video
          src="/coding.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ objectFit: "cover", zIndex: 1 }}
          aria-hidden="true"
        >
          <track kind="captions" srcLang={lang} label={lang === "ar" ? "العربية" : "English"} />
        </video>
      )}

      {/* Dark overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100 bg-dark"
        style={{ opacity: 0.5, zIndex: 2 }}
        aria-hidden="true"
      />

      {/* Centered content */}
      <div
        className="position-relative text-center"
        style={{ zIndex: 3, maxWidth: "800px", margin: "0 auto", padding: "0 1rem" }}
      >
        {isLoaded ? (
          <>
            <motion.h1
              style={{
                color: "white",
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: "bold",
                lineHeight: 1.2,
                marginBottom: "1rem",
              }}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {heroTitle}
            </motion.h1>

            <motion.h2
              style={{
                color: "white",
                fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
                lineHeight: 1.5,
                maxWidth: "100%",
                margin: "0 auto",
                paddingBottom: "30px",
                fontWeight: "normal",
              }}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              {heroDescription}
            </motion.h2>
          </>
        ) : (
          <>
            <h1
              style={{
                color: "white",
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: "bold",
                lineHeight: 1.2,
                marginBottom: "1rem",
              }}
            >
              {heroTitle}
            </h1>

            <h2
              style={{
                color: "white",
                fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
                lineHeight: 1.5,
                maxWidth: "100%",
                margin: "0 auto",
                paddingBottom: "30px",
                fontWeight: "normal",
              }}
            >
              {heroDescription}
            </h2>
          </>
        )}

        {/* Button */}
        <Link href={`/${lang}/contact-us`} aria-label={text}>
          <button
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="btn fw-semibold shadow rounded-pill d-inline-flex align-items-center gap-2"
            style={{
              fontSize: "clamp(16px, 2.5vw, 22px)",
              transition: "transform 0.15s ease, padding 0.15s ease",
              transform: hover ? "scale(1.08)" : "scale(1)",
              padding: hover
                ? "clamp(0.75rem, 2.5vw, 1rem) clamp(2rem, 4vw, 3rem)"
                : "clamp(0.75rem, 2.5vw, 1rem) clamp(1.5rem, 3vw, 2rem)",
              direction: isRTL ? "rtl" : "ltr",
              cursor: "pointer",
              backgroundColor: "#3B82F6",
              color: "white",
            }}
          >
            <span>{text}</span>
            <span
              className="arrow"
              style={{
                display: "inline-block",
                marginLeft: isRTL ? "0" : "6px",
                marginRight: isRTL ? "6px" : "0",
                opacity: hover ? 1 : 0,
                transform: hover
                  ? "translateX(0)"
                  : isRTL
                  ? "translateX(8px)"
                  : "translateX(-8px)",
                transition: "all 0.2s ease",
                color: "white",
              }}
              aria-hidden="true"
            >
              {isRTL ? "←" : "→"}
            </span>
          </button>
        </Link>
      </div>

      <style jsx>{`
        /* Always show arrow on small screens / touch devices */
        @media (max-width: 1024px) {
          .arrow {
            opacity: 1 !important;
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </section>
  );
}
