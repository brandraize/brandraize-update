"use client";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Rating from "@mui/material/Rating";

export default function Testimonials({ lang = "en" }) {
  const [slidesToShow, setSlidesToShow] = useState(3);

const testimonialsContent = {
  en: [
    {
      name: "Sophia Turner",
      quote:
        "Brandraize transformed our online presence! Within just three months, our social media engagement tripled, and we started receiving inquiries from international clients.",
    },
    {
      name: "Emily Carter",
      quote:
        "The BrandRaize team built a complete marketing strategy that took our brand visibility to the next level. Their ad campaigns are creative, targeted, and deliver real results.",
    },
    {
      name: "Olivia Bennett",
      quote:
        "Thanks to BrandRaize, our e-commerce sales have grown consistently. Their expertise in paid advertising and content marketing has been a game changer for our business.",
    },
    {
      name: "Ava Martinez",
      quote:
        "Working with BrandRaize has been one of the best decisions for our company. They truly understand brand storytelling and helped us build a strong digital identity.",
    },
    {
      name: "Mia Robinson",
      quote:
        "From social media management to SEO, BrandRaize handles everything professionally. Our website traffic has doubled, and our followers are now highly engaged.",
    },
    {
      name: "Isabella Harris",
      quote:
        "The BrandRaize team is highly skilled and results-driven. They helped us launch targeted campaigns that significantly increased our conversions and brand awareness.",
    },
  ],
  ar: [
    {
      name: "صوفيا تورنر",
      quote:
        "براندرايز غيّر وجودنا الرقمي تمامًا! خلال ثلاثة أشهر فقط، تضاعف تفاعلنا على وسائل التواصل الاجتماعي ثلاث مرات، وبدأنا في تلقي استفسارات من عملاء دوليين.",
    },
    {
      name: "إميلي كارتر",
      quote:
        "فريق براندرايز وضع لنا استراتيجية تسويق متكاملة رفعت مستوى ظهور علامتنا التجارية بشكل مذهل. حملاتهم الإعلانية مبتكرة ومستهدفة وتحقق نتائج حقيقية.",
    },
    {
      name: "أوليفيا بينيت",
      quote:
        "بفضل براندرايز، زادت مبيعات متجرنا الإلكتروني بشكل مستمر. خبرتهم في الإعلانات المدفوعة وتسويق المحتوى كانت نقطة تحول لأعمالنا.",
    },
    {
      name: "آفا مارتينيز",
      quote:
        "العمل مع براندرايز كان من أفضل القرارات لشركتنا. إنهم يفهمون حقًا فن بناء العلامة التجارية وساعدونا في إنشاء هوية رقمية قوية.",
    },
    {
      name: "ميا روبنسون",
      quote:
        "من إدارة وسائل التواصل الاجتماعي إلى تحسين محركات البحث، يتعامل براندرايز مع كل شيء باحترافية. تضاعف عدد زوار موقعنا، وأصبح متابعونا أكثر تفاعلًا.",
    },
    {
      name: "إيزابيلا هاريس",
      quote:
        "فريق براندرايز يتمتع بمهارات عالية ويركز على النتائج. ساعدونا في إطلاق حملات مستهدفة زادت من التحويلات والوعي بعلامتنا التجارية بشكل كبير.",
    },
  ],
};


  const testimonials = testimonialsContent[lang] || testimonialsContent.en;

  const CustomNextArrow = ({ onClick, slideCount, currentSlide }) => {
    if (slideCount <= slidesToShow || currentSlide >= slideCount - slidesToShow)
      return null;

    return (
      <div
        style={{
          position: "absolute",
          right: lang === "ar" ? "auto" : "-25px",
          left: lang === "ar" ? "-25px" : "auto",
          top: "45%",
          transform: "translateY(-50%)",
          zIndex: 10,
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          cursor: "pointer",
        }}
        className="primary-bg"
        onClick={onClick}
      >
        {lang === "ar" ? (
          <ArrowBackIcon style={{ color: "white" }} />
        ) : (
          <ArrowForwardIcon style={{ color: "white" }} />
        )}
      </div>
    );
  };

  const CustomPrevArrow = ({ onClick, currentSlide }) => {
    if (currentSlide === 0 || slidesToShow >= currentSlide + 1) return null;

    return (
      <div
        style={{
          position: "absolute",
          left: lang === "ar" ? "auto" : "-25px",
          right: lang === "ar" ? "-25px" : "auto",
          top: "45%",
          transform: "translateY(-50%)",
          zIndex: 10,
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          cursor: "pointer",
        }}
        className="primary-bg"
        onClick={onClick}
      >
        {lang === "ar" ? (
          <ArrowForwardIcon style={{ color: "white" }} />
        ) : (
          <ArrowBackIcon style={{ color: "white" }} />
        )}
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1200,
    slidesToShow,
    slidesToScroll: slidesToShow,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    rtl: lang === "ar",
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          rtl: lang === "ar",
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rtl: lang === "ar",
        },
      },
    ],
  };

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 992) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  return (
    <section className="container py-5">
      <div className="d-flex flex-column align-items-center text-center mb-4">
        <div className="fs-2 mb-3" style={{ fontWeight: "700" }}>
          {lang === "ar"
            ? "ماذا يقول عملاؤنا"
            : "What Our Customers Are Saying"}
        </div>
        <p className="text-center w-md-75">
          {lang === "ar"
            ? "عملاؤنا يحبوننا! اقرأ ما يقولونه عن تجاربهم."
            : "Our customers love us! Read what they have to say about their experiences."}
        </p>
      </div>
      <div className="px-3 px-sm-0">
        <Slider {...settings}>
          {testimonials.map((user, index) => (
            <div className="p-2" key={index}>
              <div className="p-3 bg-white testimonial-slide">
                <div
                  style={{
                    fontSize: "14px",
                    color: "rgba(24, 24, 24, 1)",
                    textAlign: lang === "ar" ? "right" : "left",
                  }}
                  className="mb-4"
                >
                  {user.quote}
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div
                    style={{
                      fontWeight: "500",
                      color: "black",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {user.name}
                  </div>
                  <Rating value={5} readOnly />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
