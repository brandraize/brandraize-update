import ServicesPage from "@/components/ServicesPage";

type ServicePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ServicePage({ params }: ServicePageProps) {
  const { locale } = await params;

  return <ServicesPage locale={locale === "ar" ? "ar" : "en"} />;
}