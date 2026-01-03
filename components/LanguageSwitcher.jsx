"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LanguageSwitcher({ lang, className = "" }) {
  const pathname = usePathname();

  const switchLangPath = () => {
    const newLang = lang === "ar" ? "en" : "ar";
    return pathname.replace(`/${lang}`, `/${newLang}`);
  };

  return (
    <Link
      href={switchLangPath()}
      replace
      className="primaryButton"
      style={{ borderRadius: "12px" }}
    >
      {lang === "ar" ? "English" : "العربية"}
    </Link>
  );
}
