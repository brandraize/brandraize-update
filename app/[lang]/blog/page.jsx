import { db } from "@/configuration/firebase-config";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import BlogClient from "./BlogClient";

const metas = {
  en: {
    title: "BrandRaize | Digital Marketing & Brand Growth Experts",
    description:
      "Boost your business with BrandRaize — experts in digital marketing, social media growth, paid ads, Amazon brand expansion, and global brand visibility. Let's raise your brand together.",
    keywords:
      "digital marketing, brand growth, social media management, paid ads, Amazon marketing, online branding, business growth, BrandRaize",
  },
  ar: {
    title: "براندرايز | خبراء التسويق الرقمي ونمو العلامات التجارية",
    description:
      "ارتقِ بعملك مع براندرايز — خبراء في التسويق الرقمي، إدارة وسائل التواصل الاجتماعي، الحملات الإعلانية، توسع العلامة التجارية على أمازون، وزيادة الظهور العالمي. دعنا نرفع علامتك التجارية معًا.",
    keywords:
      "التسويق الرقمي، نمو العلامة التجارية، إدارة وسائل التواصل، الحملات الإعلانية، التسويق عبر أمازون، التسويق عبر الإنترنت، توسيع الأعمال، براندرايز",
  },
};


export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = metas[lang] || metas.en;

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    alternates: {
      canonical: `https://brandraize.com/${lang}/blog`,
      languages: {
        en: "https://brandraize.com/en/blog",
        ar: "https://brandraize.com/ar/blog",
      },
    },
  };
}

export default async function Blog({ params }) {
  const { lang } = await params;

  const articlesCollection = collection(db, "articles");
  const articlesQuery = query(articlesCollection, orderBy("timestamp", "desc"));
  const docsSnapshot = await getDocs(articlesQuery);

  const articles = docsSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      title: data.title[lang],
      description: data.description[lang],
      slug: data.title["en"],
      timestamp: data.timestamp?.toDate().toISOString() || null,
    };
  });

  return <BlogClient articles={articles} lang={lang} />;
}
