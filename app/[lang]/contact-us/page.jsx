import ContactUsClient from "@/components/ClientContact";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const metaContent = {
    en: {
      title: "BrandRaize ",
      description:
        "Get in touch with BrandRaize for questions, feedback, or just to say hello. We're here to help!",
    },
    ar: {
      title: "تواصل معنا ",
      description:
        "تواصل مع هابي فيس لأي استفسارات أو ملاحظات أو حتى للتحية. نحن هنا لمساعدتك!",
    },
  };

  const { title, description } = metaContent[lang] || metaContent.en;
  const baseUrl = "https://brandraize.com";
  const canonicalUrl = `${baseUrl}/${lang}/contact-us`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en/contact-us`,
        ar: `${baseUrl}/ar/contact-us`,
      },
    },
    openGraph: { title, description, type: "website", url: canonicalUrl },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ContactUsPage({ params }) {
  const { lang } = await params;
  return <ContactUsClient lang={lang} />;
}
