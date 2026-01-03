"use client";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { toast } from "react-toastify";
import Pagination from "@mui/material/Pagination";
import usePagination from "@/hooks/UsePagination";
import Link from "next/link";

export default function AllProducts({ lang, products }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const content = {
    en: {
      buyLabel: "Buy Now",
      searchPlaceholder: "Search products...",
      filterLabel: "Categories",
      notFound: "No products found",
      noProducts: "No Products To Show",
    },
    ar: {
      buyLabel: "اشتري الآن",
      searchPlaceholder: "ابحث عن منتج...",
      filterLabel: "الفئات",
      notFound: "لم يتم العثور على منتجات",
      noProducts: "لا توجد منتجات للعرض",
    },
  };

  const { buyLabel, searchPlaceholder, filterLabel, notFound, noProducts } =
    content[lang] || content.en;

  const categories = [...new Set(products.map((p) => p.category))];

  const productsToDisplay =
    searchResult.length > 0 && filteredProducts.length > 0
      ? searchResult
      : filteredProducts.length > 0
      ? filteredProducts
      : searchResult.length > 0
      ? searchResult
      : products;

  const {
    totalPages,
    startPageIndex,
    endPageIndex,
    currentPageIndex,
    setcurrentPageIndex,
    displayPage,
  } = usePagination(12, productsToDisplay.length);

  const currentProducts = productsToDisplay.slice(startPageIndex, endPageIndex);

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const searchProducts = (e) => {
    e.preventDefault();

    const filtered = products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );

    if (filtered.length > 0) {
      setcurrentPageIndex(1);
      setSearchResult(filtered);
    } else {
      toast.error(notFound);
    }
  };

  const getUrl = (url) => {
    if (!url) return "#";
  };

  useEffect(() => {
    const filtered = products.filter((p) => {
      const matchCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(p.category);
      return matchCategory;
    });
    setcurrentPageIndex(1);
    setFilteredProducts(filtered);
  }, [selectedCategories]);

  useEffect(() => {
    if (search.trim() === "") {
      setSearchResult([]);
    }
  }, [search]);

  return (
    <div className="container my-5">
      {products.length > 0 ? (
        <>
          <div className="d-flex justify-content-center mb-5">
            <div
              className={`d-flex justify-content-center align-items-center d-md-none ${
                lang === "en" ? "me-2" : "ms-2"
              }`}
              style={{
                border: "1px solid lightgrey",
                borderRadius: "8px",
                width: "50px",
                cursor: "pointer",
              }}
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasResponsive"
              aria-controls="offcanvasResponsive"
            >
              <FaFilter className="primary-color" />
            </div>
            <form
              className="w-sm-75 position-relative"
              onSubmit={searchProducts}
            >
              <input
                type="search"
                className="form-control"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  height: "50px",
                  paddingRight: lang === "en" ? "80px" : undefined,
                  paddingLeft: lang === "ar" ? "80px" : undefined,
                }}
                required
              />
              <button
                type="submit"
                className="primaryButton border-0"
                style={{
                  borderRadius: "8px",
                  position: "absolute",
                  right: lang === "en" ? "10px" : "auto",
                  left: lang === "ar" ? "10px" : "auto",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <IoSearch style={{ width: "20px", height: "20px" }} />
              </button>
            </form>
          </div>
          <div className="row">
            <div className="col-md-4 col-lg-3">
              <div
                className={`offcanvas-md offcanvas-${
                  lang === "en" ? "start" : "end"
                }`}
                tabIndex="-1"
                id="offcanvasResponsive"
                aria-labelledby="offcanvasResponsiveLabel"
              >
                <div className="offcanvas-header">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    data-bs-target="#offcanvasResponsive"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="offcanvas-body">
                  <div className="card p-3 shadow-sm rounded-3 w-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <label className="fw-bold">{filterLabel}</label>
                      <IoIosCloseCircle
                        style={{
                          cursor: "pointer",
                          width: "25px",
                          height: "25px",
                        }}
                        onClick={() => setSelectedCategories([])}
                      />
                    </div>
                    <div className="d-flex flex-column gap-2 mt-3">
                      {categories.map((cat, idx) => (
                        <div className="form-check" key={idx}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={cat}
                            checked={selectedCategories.includes(cat)}
                            onChange={() => toggleCategory(cat)}
                            id={`cat-${idx}`}
                            style={{
                              cursor: "pointer",
                              transform: "scale(1.2)",
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`cat-${idx}`}
                          >
                            {cat}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8 col-lg-9 mb-5">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                {currentProducts.map((product) => {
                  return (
                    <div className="col" key={product.id}>
                      <div className="card h-100 shadow-sm rounded-3 overflow-hidden">
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            paddingTop: "83.83%",
                            backgroundColor: "#f0f0f0",
                            overflow: "hidden",
                          }}
                          className="card-img-top"
                        >
                          <Link
                            href={`/${lang}/product-details/${product.slug.replace(
                              /\s+/g,
                              "_"
                            )}`}
                          >
                            <img
                              src={product.image}
                              alt={product.title}
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                              }}
                              loading="lazy"
                            />
                          </Link>
                        </div>
                        <div className="card-body d-flex flex-column">
                          <Link
                            href={`/${lang}/product-details/${product.slug.replace(
                              /\s+/g,
                              "_"
                            )}`}
                          >
                            <div className="mb-2" style={{ fontWeight: "600" }}>
                              {product.title}
                            </div>
                          </Link>

                          <p className="text-secondary clamp-3">
                            {product.shortDesc}
                          </p>
                          <a
                            href={getUrl(product.link)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="secondaryButton mt-auto"
                          >
                            {buyLabel}
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {productsToDisplay.length > 12 && (
              <div className="d-flex justify-content-center">
                <Pagination
                  count={totalPages}
                  page={currentPageIndex}
                  onChange={(event, page) => displayPage(page)}
                  className="custom-pagination"
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <h4 className="text-center my-5">{noProducts}</h4>
      )}
    </div>
  );
}
