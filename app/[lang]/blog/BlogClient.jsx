"use client";

import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import usePagination from "@/hooks/UsePagination";
import Link from "next/link";
import { toast } from "react-toastify";
import { IoSearch } from "react-icons/io5";
import styles from "./blog.module.css";

const translations = {
  en: { heading: "BrandRaize Software Insights",
     intro: "Welcome to the BrandRaize blog — your go-to hub for the latest in software development, tech trends, and innovative solutions. Dive into expert articles, coding tutorials, and product updates crafted to elevate your software projects. Stay ahead with deep dives, industry news, and actionable insights from our development team. Whether you're a software engineer, tech enthusiast, or product manager, BrandRaize has you covered.", 
    searchPlaceholder: "Search for articles, tutorials, or news", 
    noArticles: "No articles available", 
    noResults: "No articles found matching your query", 
    readMore: "Read More", },
ar: { heading: "مقالات براندرايز للبرمجيات",
   intro: "مرحبًا بك في مدونة براندرايز — مركزك الرئيسي لأحدث أخبار تطوير البرمجيات، واتجاهات التكنولوجيا، والحلول المبتكرة. استكشف مقالات الخبراء، ودروس البرمجة، وتحديثات المنتجات المصممة لتحسين مشاريع البرمجيات الخاصة بك. تابع أحدث الأخبار، والرؤى العملية، والمعلومات من فريق التطوير لدينا. سواء كنت مهندس برمجيات، أو مهتم بالتقنية، أو مدير منتج، فإن براندرايز تغطي كل احتياجاتك.", 
   searchPlaceholder: "ابحث عن مقالات، دروس، أو أخبار", 
  noArticles: "لا توجد مقالات متاحة", 
  noResults: "لم يتم العثور على مقالات مطابقة لاستعلامك", 
  readMore: "اقرأ المزيد", },
};

export default function BlogClient({ articles, lang }) {
  const t = translations[lang] || translations.en;

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const articlesToDisplay = searchResult.length > 0 ? searchResult : articles;

  const {
    totalPages,
    startPageIndex,
    endPageIndex,
    currentPageIndex,
    setcurrentPageIndex,
    displayPage,
  } = usePagination(9, articlesToDisplay.length); // 3 columns × 3 rows

  const currentArticles = articlesToDisplay.slice(startPageIndex, endPageIndex);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery !== "") {
      const result = articles.filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (result.length > 0) {
        setcurrentPageIndex(1);
        setSearchResult(result);
      } else {
        toast.info(t.noResults);
      }
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResult([]);
    }
  }, [searchQuery]);

  return (
    <div className={styles.blogContainer}>
      <div className="container ">
        <div className="d-flex flex-column align-items-center text-center mb-5">
          <h1 className="fs-1 fw-bold mb-3">{t.heading}</h1>
          <div className="w-md-75 text-white">{t.intro}</div>
        </div>

        {/* 🔍 Search */}
        <div className="d-flex justify-content-center mb-4">
          <form className={styles.searchForm} onSubmit={handleSearch}>
            <input
              type="search"
              className={styles.searchInput}
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
            />
            <button type="submit" className={styles.searchButton}>
              <IoSearch style={{ width: "20px", height: "20px", color: "#fff" }} />
            </button>
          </form>
        </div>

        {/* 📰 Articles */}
        {articlesToDisplay.length > 0 ? (
          <div className={styles.articlesGrid}>
            {currentArticles.map((article) => (
              <div
                key={article.id}
                className={styles.articleCard}
                style={{ backgroundImage: `url(${article.image})` }}
              >
                <div className={styles.articleOverlay}>
                  <h3 className={styles.articleTitle}>{article.title}</h3>
                  <p className={styles.articleExcerpt}>
                    {article.excerpt || article.title.slice(0, 100) + "..."}
                  </p>
                  <Link
                    href={`/${lang}/article/${article.slug.replace(/\s+/g, "_")}`}
                    className={styles.readMore}
                  >
                    {t.readMore}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h5 className="text-center my-5">{t.noArticles}</h5>
        )}

        {/* 📑 Pagination */}
        {articlesToDisplay.length > 9 && (
          <div className={styles.paginationWrapper}>
            <Pagination
              count={totalPages}
              page={currentPageIndex}
              onChange={(e, page) => displayPage(page)}
              className="custom-pagination"
            />
          </div>
        )}
      </div>
    </div>
  );
}
