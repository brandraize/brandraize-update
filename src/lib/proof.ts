import type { Locale } from './site';

type Text = Record<Locale, string>;

export type Testimonial = {
  quote: Text;
  name: Text;
  // What you did for them, e.g. "Mobile app development project".
  project: Text;
  // Optional photo in /public, e.g. "/images/clients/turki.jpg". Initials are shown without one.
  photo?: string;
};

// Real client feedback is managed in the admin dashboard (/admin → Client feedback).
// These sample cards are shown only in development, never on the live site, while there is none.
export const sampleTestimonials: Testimonial[] = [
  {
    quote: {
      en: 'Sample review — replace with a real client quote. Two or three sentences about the result they got works best.',
      ar: 'تقييم تجريبي — استبدله برأي عميل حقيقي. جملتان أو ثلاث عن النتيجة التي حصل عليها هي الأفضل.',
    },
    name: { en: 'Client name', ar: 'اسم العميل' },
    project: { en: 'Website design project', ar: 'مشروع تصميم موقع' },
  },
  {
    quote: {
      en: 'Sample review — say what the client needed, how the work went, and what changed for their business afterwards.',
      ar: 'تقييم تجريبي — اذكر ما احتاجه العميل وكيف سار العمل وما الذي تغيّر في أعماله بعد ذلك.',
    },
    name: { en: 'Client name', ar: 'اسم العميل' },
    project: { en: 'Mobile app development project', ar: 'مشروع تطوير تطبيق جوال' },
  },
  {
    quote: {
      en: 'Sample review — short, specific quotes with a real name and project are the most convincing.',
      ar: 'تقييم تجريبي — الآراء القصيرة والمحددة مع اسم ومشروع حقيقيين هي الأكثر إقناعاً.',
    },
    name: { en: 'Client name', ar: 'اسم العميل' },
    project: { en: 'Branding and marketing project', ar: 'مشروع هوية وتسويق' },
  },
];

export type WorkItem = {
  // Used in the project's address (/projects/<id>) and as its picture's file name:
  // save the picture as /public/projects/<id>.png (or .jpg, .webp, .avif) and it appears by itself.
  id: string;
  // Only needed when the picture lives somewhere other than /public/projects/<id>.*
  image?: string;
  title: Text;
  category: Text;
  summary: Text;
  // The live website, shown as a "visit" button on the project's page.
  url?: string;
  result?: Text;
  technologies?: string[];
};

// Brand names that are written the same way in both languages.
const name = (value: string): Text => ({ en: value, ar: value });

const categories = {
  security: { en: 'Security & AI case study', ar: 'دراسة حالة في الأمن والذكاء الاصطناعي' },
  store: { en: 'E-commerce store', ar: 'متجر إلكتروني' },
  corporate: { en: 'Corporate website', ar: 'موقع شركة' },
  realEstate: { en: 'Real estate website', ar: 'موقع عقاري' },
  restaurant: { en: 'Restaurant website', ar: 'موقع مطعم' },
  webApp: { en: 'Web app', ar: 'تطبيق ويب' },
} satisfies Record<string, Text>;

// The built-in projects. They are shown after the ones added in /admin → Projects; a project
// added there with the same English title replaces the one here.
export const work: WorkItem[] = [
  {
    id: 'albayt-alatiq',
    image: '/images/work-albayt-alatiq.webp',
    title: { en: 'Al Bayt Al Atiq Real Estate', ar: 'البيت العتيق العقارية' },
    category: categories.realEstate,
    summary: {
      en: 'An Arabic-first real estate website for browsing properties for sale, rent, and investment — designed to work on desktop, tablet, and phone.',
      ar: 'موقع عقاري عربي لتصفح عروض البيع والإيجار والاستثمار — مصمم ليعمل على الحاسب والجهاز اللوحي والجوال.',
    },
  },

  // ── Security & AI case studies ──
  {
    id: 'api-security-hardening',
    title: { en: 'Enterprise API Security Hardening', ar: 'تعزيز أمان واجهات API للمؤسسات' },
    category: categories.security,
    summary: {
      en: 'A full OWASP ZAP penetration test on a live Laravel and Next.js e-commerce stack. We found 12 critical SQL injection and XSS vulnerabilities, patched the code, added strict CSP headers, and enforced rate limiting.',
      ar: 'اختبار اختراق كامل باستخدام OWASP ZAP على متجر إلكتروني يعمل بـ Laravel و Next.js. اكتشفنا 12 ثغرة حرجة من نوع حقن SQL و XSS، وأصلحنا الكود، وأضفنا ترويسات CSP صارمة، وفعّلنا تحديد معدل الطلبات.',
    },
    result: { en: 'Risk score dropped from 87% to 12%.', ar: 'انخفض مؤشر المخاطر من 87% إلى 12%.' },
    technologies: ['Security Audit', 'Laravel', 'OWASP', 'Snyk'],
  },
  {
    id: 'ai-contract-qa-bot',
    title: { en: 'AI Contract Q&A Bot (RAG System)', ar: 'مساعد ذكي للإجابة عن أسئلة العقود (نظام RAG)' },
    category: categories.security,
    summary: {
      en: 'A secure Retrieval-Augmented Generation system built with Python (FastAPI) and LangChain. Users upload PDF contracts and legal documents and ask questions in plain language, with protection against prompt injection.',
      ar: 'نظام آمن للتوليد المعزز بالاسترجاع مبني بـ Python (FastAPI) و LangChain. يرفع المستخدم العقود والمستندات القانونية بصيغة PDF ويسأل عنها بلغة عادية، مع حماية من هجمات حقن الأوامر.',
    },
    result: { en: 'Reduced document review time by 70%.', ar: 'انخفض وقت مراجعة المستندات بنسبة 70%.' },
    technologies: ['Python', 'LangChain', 'FastAPI', 'AI Security'],
  },

  // ── E-commerce ──
  {
    id: 'adeena-perfume',
    title: name('Adeena Perfume'),
    category: categories.store,
    summary: {
      en: 'Premium perfume store with a smooth shopping flow and elegant product presentation.',
      ar: 'متجر عطور فاخر بتجربة شراء سلسة وعرض أنيق للمنتجات.',
    },
    url: 'https://adeenaperfume.com',
  },
  {
    id: 'kpk-collection',
    title: name('KPK Collection'),
    category: categories.store,
    summary: {
      en: 'Fashion store powered by WooCommerce with clean product categorization.',
      ar: 'متجر أزياء يعمل بـ WooCommerce مع تصنيف واضح للمنتجات.',
    },
    url: 'https://kpkcollection.com',
  },
  {
    id: 'rakhys',
    title: name('Rakhys'),
    category: categories.store,
    summary: {
      en: 'Clean e-commerce design with intuitive product categorization and fast checkout.',
      ar: 'تصميم متجر إلكتروني بسيط بتصنيف سهل للمنتجات وإتمام سريع للطلب.',
    },
    url: 'https://rakhys.com',
  },
  {
    id: 'lovnola',
    title: name('Lovnola'),
    category: categories.store,
    summary: {
      en: 'Modern branding-forward e-commerce with lifestyle product photography.',
      ar: 'متجر إلكتروني عصري يبرز هوية العلامة مع تصوير للمنتجات بأسلوب الحياة اليومية.',
    },
    url: 'https://lovnola.com',
  },
  {
    id: 'ksa-vape',
    title: name('KSA Vape'),
    category: categories.store,
    summary: {
      en: 'Specialized vape e-commerce with product variants and category filtering.',
      ar: 'متجر إلكتروني متخصص مع خيارات متعددة للمنتج وتصفية حسب الفئة.',
    },
    url: 'https://ksavape.com',
  },
  {
    id: 'tallah-gift',
    title: name('Tallah Gift'),
    category: categories.store,
    summary: {
      en: 'Custom gift store with personalization options and a gift-builder interface.',
      ar: 'متجر هدايا مخصصة مع خيارات للتخصيص وواجهة لتكوين الهدية.',
    },
    url: 'https://tallahgift.com',
  },

  // ── Corporate ──
  {
    id: 'b-it-solutions',
    title: name('B-IT Solutions'),
    category: categories.corporate,
    summary: {
      en: 'IT company website with a performance-optimized architecture and clean service presentation.',
      ar: 'موقع شركة تقنية معلومات ببنية محسّنة للأداء وعرض واضح للخدمات.',
    },
    url: 'https://b-it.co',
  },
  {
    id: 'next-future-tech',
    title: name('Next Future Tech'),
    category: categories.corporate,
    summary: {
      en: 'Tech services platform with modern branding and a structured service portfolio.',
      ar: 'منصة خدمات تقنية بهوية عصرية وعرض منظم للخدمات.',
    },
    url: 'https://nextfuturetech.net',
  },
  {
    id: 'oh-sa',
    title: name('OH.sa'),
    category: categories.corporate,
    summary: {
      en: 'Structured business presentation site with a clear service hierarchy.',
      ar: 'موقع تعريفي منظم للأعمال بتسلسل واضح للخدمات.',
    },
    url: 'https://oh.sa',
  },
  {
    id: 'dkr',
    title: name('DKR'),
    category: categories.corporate,
    summary: {
      en: 'Service-focused corporate site with a responsive layout and clear calls to action.',
      ar: 'موقع شركة يركز على الخدمات بتصميم متجاوب ودعوات واضحة للتواصل.',
    },
    url: 'https://dkr.sa',
  },
  {
    id: 'qmt-almmyez',
    title: name('QMT Al-Mmyez'),
    category: categories.corporate,
    summary: {
      en: 'Structured corporate content site with organized service sections.',
      ar: 'موقع شركة بمحتوى منظم وأقسام مرتبة للخدمات.',
    },
    url: 'https://qmt-almmyez.com',
  },
  {
    id: 'alkadi-pastures',
    title: name('Al-Kadi Pastures'),
    category: categories.corporate,
    summary: {
      en: 'Arabic-localized business site with full right-to-left support and a culturally fitting design.',
      ar: 'موقع أعمال باللغة العربية بدعم كامل للاتجاه من اليمين إلى اليسار وتصميم يناسب الثقافة المحلية.',
    },
    url: 'https://alkadipastures.com/ar',
  },
  {
    id: 'abdao-almontaj',
    title: name('Abdao Al-Montaj'),
    category: categories.corporate,
    summary: {
      en: 'Industrial company profile with a clear identity and service showcase.',
      ar: 'ملف تعريفي لشركة صناعية بهوية واضحة وعرض للخدمات.',
    },
    url: 'https://abdao-almontaj.com',
  },
  {
    id: 'mendar',
    title: name('Mendar'),
    category: categories.corporate,
    summary: {
      en: 'Modern service-focused layout with clean typography and structured content.',
      ar: 'تصميم عصري يركز على الخدمات بخطوط واضحة ومحتوى منظم.',
    },
    url: 'https://mendar.sa',
  },
  {
    id: 'mayasm',
    title: name('Mayasm'),
    category: categories.corporate,
    summary: {
      en: 'Elegant brand site with a sophisticated visual identity and premium feel.',
      ar: 'موقع علامة تجارية أنيق بهوية بصرية راقية وطابع فاخر.',
    },
    url: 'https://mayasm.sa',
  },
  {
    id: 'flah-r',
    title: name('Flah-R'),
    category: categories.corporate,
    summary: {
      en: 'Clear navigation and well-organized service sections for business presentation.',
      ar: 'تنقل واضح وأقسام خدمات مرتبة لعرض أعمال الشركة.',
    },
    url: 'https://flah-r.com',
  },
  {
    id: 'rajee',
    title: name('Rajee'),
    category: categories.corporate,
    summary: {
      en: 'Structured services platform with an intuitive user journey and clear calls to action.',
      ar: 'منصة خدمات منظمة برحلة مستخدم سهلة ودعوات واضحة للتواصل.',
    },
    url: 'https://rajee-sa.com',
  },
  {
    id: 'ayal',
    title: name('Ayal'),
    category: categories.corporate,
    summary: {
      en: 'Modern responsive company site with clean design and professional branding.',
      ar: 'موقع شركة عصري ومتجاوب بتصميم بسيط وهوية احترافية.',
    },
    url: 'https://ayalsa.com',
  },
  {
    id: 'jhitzone',
    title: name('Jhitzone'),
    category: categories.corporate,
    summary: {
      en: 'Modern responsive structure with clear service differentiation and strong user experience.',
      ar: 'بنية عصرية متجاوبة مع تمييز واضح بين الخدمات وتجربة مستخدم قوية.',
    },
    url: 'https://jhitzone.com',
  },
  {
    id: 'tec-org',
    title: name('Tec-Org'),
    category: categories.corporate,
    summary: {
      en: 'Corporate identity site for an organization, with a structured content hierarchy.',
      ar: 'موقع هوية مؤسسية بتسلسل منظم للمحتوى.',
    },
    url: 'https://tec-org.com',
  },

  // ── Real estate ──
  {
    id: 'roaya',
    title: name('Roaya'),
    category: categories.realEstate,
    summary: {
      en: 'Organized property listings with user-friendly navigation and search filters.',
      ar: 'عروض عقارية منظمة مع تنقل سهل وخيارات لتصفية البحث.',
    },
    url: 'https://roaya.com.sa',
  },
  {
    id: 'tilal-rimal',
    title: name('Tilal Rimal'),
    category: categories.realEstate,
    summary: {
      en: 'Modern real estate platform with clean listings and a professional business layout.',
      ar: 'منصة عقارية عصرية بعروض واضحة وتصميم احترافي للأعمال.',
    },
    url: 'https://tilalr.com',
  },

  // ── Restaurant & dining ──
  {
    id: 'marhaba-restaurants',
    title: { en: 'Marhaba Restaurants', ar: 'مطاعم مرحبا' },
    category: categories.restaurant,
    summary: {
      en: 'Restaurant chain site with a digital menu and customer-focused design.',
      ar: 'موقع سلسلة مطاعم مع قائمة طعام رقمية وتصميم يركز على العميل.',
    },
    url: 'https://marhabarestaurants.com',
  },

  // ── Web apps ──
  {
    id: 'salem-alkahtani',
    title: { en: 'Salem Alkahtani', ar: 'سالم القحطاني' },
    category: categories.webApp,
    summary: {
      en: 'Personal brand site with a clean layout and professional portfolio presentation.',
      ar: 'موقع علامة شخصية بتصميم بسيط وعرض احترافي للأعمال.',
    },
    url: 'https://salemalkahtani.com',
  },
  {
    id: 'happy-face',
    title: name('Happy Face'),
    category: categories.webApp,
    summary: {
      en: 'Web application interface with intuitive user experience and a structured feature layout.',
      ar: 'واجهة تطبيق ويب بتجربة استخدام سهلة وترتيب منظم للمزايا.',
    },
    url: 'https://app.happy-face.co/en',
  },
];
