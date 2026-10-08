import { setRequestLocale } from "next-intl/server";
import ServicesOverview from "@/components/ServicesOverview";
import { pageMetadata } from "@/lib/seo";
import { toLocale } from "@/lib/site";

type ServicePageProps = {
  params: Promise<{ locale: string }>;
};

const meta = {
  en: {
    title: "Services — Web, Mobile Apps, ERP & Digital Marketing",
    description:
      "Web design and development, mobile apps, e-commerce, ERP, UI/UX, and digital marketing services for businesses in Saudi Arabia.",
  },
  ar: {
    title: "الخدمات — المواقع، تطبيقات الجوال، ERP والتسويق الرقمي",
    description:
      "تصميم وتطوير المواقع، تطبيقات الجوال، المتاجر الإلكترونية، أنظمة ERP، تصميم UI/UX، والتسويق الرقمي للشركات في السعودية.",
  },
};

export async function generateMetadata({ params }: ServicePageProps) {
  const locale = toLocale((await params).locale);
  return pageMetadata(locale, "/service", meta[locale].title, meta[locale].description);
}

export default async function ServicePage({ params }: ServicePageProps) {
  const locale = toLocale((await params).locale);
  setRequestLocale(locale);

  return <ServicesOverview locale={locale} />;
}
