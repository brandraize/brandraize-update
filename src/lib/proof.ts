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

// A list of lines for each language, e.g. the services delivered on a project.
type Lines = Record<Locale, string[]>;

export type WorkItem = {
  // Used in the project's address (/projects/<id>) and as its picture's file name:
  // save the picture as /public/projects/<id>.png (or .jpg, .webp, .avif) and it appears by itself.
  id: string;
  // Only needed when the picture lives somewhere other than /public/projects/<id>.*
  image?: string;
  title: Text;
  category: Text;
  summary: Text;
<<<<<<< HEAD
  // Everything below is shown on the project's own page, and is optional.
  url?: string;
  client?: Text;
  industry?: Text;
  year?: string;
  services?: Lines;
  details?: Text;
  challenge?: Text;
  solution?: Text;
  result?: Text;
  features?: Lines;
  technologies?: string[];
  // Extra pictures shown in the project's gallery.
  gallery?: string[];
  // A full-page screenshot of the finished website, as strips stacked top to bottom.
  fullPage?: string[];
};

// The projects built into the code, shown until projects are added in /admin → Projects.
=======
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
>>>>>>> 02923ce677fe9014de603a43fa71606b69bac950
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
<<<<<<< HEAD
  {
    id: 'alpha-paver',
    image: '/projects/alpha-paver.jpg',
    width: 1440,
    height: 1080,
    title: { en: 'Alpha Paver', ar: 'ألفا بايفر' },
    category: { en: 'Construction company website', ar: 'موقع شركة مقاولات' },
    summary: {
      en: 'A corporate website for a roads and infrastructure contractor, presenting its services, delivered projects and accreditations, and turning visitors into quote requests.',
      ar: 'موقع تعريفي لشركة متخصصة في الطرق والبنية التحتية، يعرض خدماتها ومشاريعها المنفذة واعتماداتها، ويحوّل الزوار إلى طلبات عرض سعر.',
    },
    url: 'https://alphapaver.com/',
    client: { en: 'Alpha Paver Company', ar: 'شركة ألفا بايفر' },
    industry: { en: 'Construction and infrastructure', ar: 'المقاولات والبنية التحتية' },
    services: {
      en: ['Website design', 'Website development', 'Content writing', 'Search engine optimisation'],
      ar: ['تصميم الموقع', 'تطوير الموقع', 'كتابة المحتوى', 'تحسين محركات البحث'],
    },
    details: {
      en: 'Alpha Paver delivers roads, asphalt and civil works to Saudi Electricity Company and municipal standards. The website puts that experience in front of decision makers: what the company does, the projects it has already delivered, the equipment it owns and the accreditations behind every tender.',
      ar: 'تنفّذ ألفا بايفر أعمال الطرق والإسفلت والأعمال المدنية وفق معايير الشركة السعودية للكهرباء والبلديات. يعرض الموقع هذه الخبرة أمام أصحاب القرار: ما تقدّمه الشركة، والمشاريع التي أنجزتها، والمعدات التي تملكها، والاعتمادات التي تدعم كل منافسة.',
    },
    challenge: {
      en: 'The company relied on word of mouth and had no single place to send contractors and consultants who asked about its capability.',
      ar: 'كانت الشركة تعتمد على التوصية الشفهية، ولم يكن لديها مكان واحد ترسل إليه المقاولين والاستشاريين عند السؤال عن قدراتها.',
    },
    solution: {
      en: 'We designed and built a fast, clear website with dedicated service pages, a filterable project showcase, an equipment section and a request-a-quote form that lands straight in the team inbox.',
      ar: 'صمّمنا وبنينا موقعاً سريعاً وواضحاً بصفحات مخصصة للخدمات، ومعرض مشاريع قابل للتصفية، وقسم للمعدات، ونموذج طلب عرض سعر يصل مباشرة إلى بريد الفريق.',
    },
    result: {
      en: 'Quote requests now arrive through the website, and the sales team shares one link instead of a folder of PDFs.',
      ar: 'أصبحت طلبات عروض الأسعار تصل عبر الموقع، ويشارك فريق المبيعات رابطاً واحداً بدلاً من مجلد ملفات PDF.',
    },
    features: {
      en: [
        'Service pages for roads, asphalt and civil works',
        'Project showcase grouped by category',
        'Request-a-quote form',
        'Equipment list and company profile download',
        'News and articles section',
      ],
      ar: [
        'صفحات لخدمات الطرق والإسفلت والأعمال المدنية',
        'معرض مشاريع مصنّف بالفئات',
        'نموذج طلب عرض سعر',
        'قائمة المعدات وتحميل الملف التعريفي',
        'قسم الأخبار والمقالات',
      ],
    },
    technologies: ['WordPress', 'WooCommerce', 'Elementor'],
    gallery: ['/projects/alpha-paver-g1.jpg', '/projects/alpha-paver-g2.jpg'],
    fullPage: [
      '/projects/alpha-paver-full-1.jpg',
      '/projects/alpha-paver-full-2.jpg',
      '/projects/alpha-paver-full-3.jpg',
      '/projects/alpha-paver-full-4.jpg',
    ],
  },
  {
    id: 'fadl-altawasul',
    image: '/projects/fadl-altawasul.jpg',
    width: 1440,
    height: 1080,
    title: { en: 'FADL Al Tawasul', ar: 'فضل التواصل' },
    category: { en: 'Building materials supplier website', ar: 'موقع مورد مواد بناء' },
    summary: {
      en: 'A bilingual website for a Saudi building materials supplier, organising six product divisions and turning contractors and developers into quote requests.',
      ar: 'موقع ثنائي اللغة لمورّد مواد بناء سعودي، ينظّم ستة أقسام للمنتجات ويحوّل المقاولين والمطورين إلى طلبات عرض سعر.',
    },
    url: 'https://fadl-altawasul.com/',
    client: { en: 'FADL Al Tawasul', ar: 'فضل التواصل' },
    industry: { en: 'Building materials', ar: 'مواد البناء' },
    services: {
      en: ['Website design', 'Website development', 'Arabic and English content', 'Search engine optimisation'],
      ar: ['تصميم الموقع', 'تطوير الموقع', 'المحتوى العربي والإنجليزي', 'تحسين محركات البحث'],
    },
    details: {
      en: 'FADL Al Tawasul supplies lighting, HVAC, reinforcement steel, structural steel, sanitary ware and electrical products from the factory straight to contractors and developers across the Kingdom. The website explains each division, the industries served and the credentials that make the company a compliant supplier.',
      ar: 'يوفّر فضل التواصل الإنارة والتكييف وحديد التسليح والحديد الإنشائي والأدوات الصحية والمستلزمات الكهربائية من المصنع مباشرة إلى المقاولين والمطورين في المملكة. يشرح الموقع كل قسم، والقطاعات التي يخدمها، والاعتمادات التي تجعل الشركة مورداً معتمداً.',
    },
    challenge: {
      en: 'The company had a wide catalogue and strong credentials, but no clear path for a contractor to understand the offer and ask for a price.',
      ar: 'كان لدى الشركة كتالوج واسع واعتمادات قوية، لكن دون مسار واضح يساعد المقاول على فهم العرض وطلب السعر.',
    },
    solution: {
      en: 'A bilingual website built around six product divisions, industry pages, a compliance strip with the company registrations, and short quote forms on every page.',
      ar: 'موقع ثنائي اللغة مبني حول ستة أقسام للمنتجات، وصفحات للقطاعات، وشريط يوضّح سجلات الشركة واعتماداتها، ونماذج طلب عرض سعر قصيرة في كل صفحة.',
    },
    result: {
      en: 'Contractors now find the right division and request a quote without a phone call, in Arabic or English.',
      ar: 'أصبح المقاولون يجدون القسم المناسب ويطلبون عرض سعر دون مكالمة، بالعربية أو الإنجليزية.',
    },
    features: {
      en: [
        'Six product divisions, from HVAC to steel',
        'Industry pages for energy, housing and landmark projects',
        'Registrations and compliance strip (CR, VAT, Saudization)',
        'Quote request forms on every page',
        'Arabic and English throughout',
      ],
      ar: [
        'ستة أقسام للمنتجات من التكييف إلى الحديد',
        'صفحات للقطاعات: الطاقة والسكن والمعالم الكبرى',
        'شريط الاعتمادات والسجلات (السجل التجاري، الضريبة، السعودة)',
        'نماذج طلب عرض سعر في كل صفحة',
        'واجهة عربية وإنجليزية بالكامل',
      ],
    },
    technologies: ['Next.js'],
    gallery: ['/projects/fadl-altawasul-g1.jpg', '/projects/fadl-altawasul-g2.jpg'],
    fullPage: [
      '/projects/fadl-altawasul-full-1.jpg',
      '/projects/fadl-altawasul-full-2.jpg',
      '/projects/fadl-altawasul-full-3.jpg',
      '/projects/fadl-altawasul-full-4.jpg',
      '/projects/fadl-altawasul-full-5.jpg',
    ],
  },
  {
    id: 'dkr',
    image: '/projects/dkr.jpg',
    width: 1440,
    height: 1080,
    title: { en: 'Fares Al Sahra Real Estate', ar: 'شركة فارس الصحراء العقارية' },
    category: { en: 'Real estate website', ar: 'موقع شركة عقارية' },
    summary: {
      en: 'A modern real estate website presenting a Saudi property company, its services and the partners it works with.',
      ar: 'موقع عقاري حديث يعرّف بشركة عقارية سعودية وخدماتها وشركاء النجاح الذين تعمل معهم.',
    },
    url: 'https://dkr.sa/',
    client: { en: 'Fares Al Sahra Real Estate', ar: 'شركة فارس الصحراء العقارية' },
    industry: { en: 'Real estate', ar: 'القطاع العقاري' },
    services: {
      en: ['Website design', 'Website development', 'Arabic content', 'Search engine optimisation'],
      ar: ['تصميم الموقع', 'تطوير الموقع', 'المحتوى العربي', 'تحسين محركات البحث'],
    },
    details: {
      en: 'Fares Al Sahra Real Estate works across property sales, leasing and investment in Saudi Arabia. The website introduces the company, groups its services and shows the partners it works with, with a clear invitation to talk about a property opportunity.',
      ar: 'تعمل شركة فارس الصحراء العقارية في بيع وتأجير العقارات والاستثمار في المملكة. يعرّف الموقع بالشركة، ويصنّف خدماتها، ويعرض شركاء النجاح، مع دعوة واضحة للتواصل حول أي فرصة عقارية.',
    },
    challenge: {
      en: 'The company needed a credible online presence that would suit both individual buyers and institutional partners.',
      ar: 'احتاجت الشركة إلى حضور إلكتروني موثوق يناسب المشتري الفرد والشريك المؤسسي في الوقت نفسه.',
    },
    solution: {
      en: 'A single-flow website with clear sections for properties, services, partners and contact, built to load fast on a phone.',
      ar: 'موقع بمسار واحد وأقسام واضحة للعقارات والخدمات وشركاء النجاح والتواصل، مبني ليعمل بسرعة على الجوال.',
    },
    result: {
      en: 'A tidy, professional front door the team can send to any client or partner.',
      ar: 'واجهة أنيقة واحترافية يمكن للفريق مشاركتها مع أي عميل أو شريك.',
    },
    features: {
      en: ['Clear service sections', 'Partners showcase', 'Contact call to action', 'Fast, mobile-first build', 'Arabic content'],
      ar: ['أقسام واضحة للخدمات', 'عرض شركاء النجاح', 'دعوة واضحة للتواصل', 'بناء سريع يبدأ من الجوال', 'محتوى عربي'],
    },
    technologies: ['Next.js'],
    gallery: ['/projects/dkr-g1.jpg', '/projects/dkr-g2.jpg'],
    fullPage: [
      '/projects/dkr-full-1.jpg',
      '/projects/dkr-full-2.jpg',
      '/projects/dkr-full-3.jpg',
      '/projects/dkr-full-4.jpg',
      '/projects/dkr-full-5.jpg',
    ],
  },
  {
    id: 'roaya',
    image: '/projects/roaya.jpg',
    width: 1440,
    height: 1080,
    title: { en: 'Roaya', ar: 'رؤية' },
    category: { en: 'Real estate consultancy website', ar: 'موقع استشارات عقارية' },
    summary: {
      en: 'A corporate website for a Saudi real estate development consultancy, explaining its approach and the thinking behind every project it advises on.',
      ar: 'موقع تعريفي لشركة سعودية متخصصة في استشارات التطوير العقاري، يشرح منهجيتها والفكر وراء كل مشروع تقدّم فيه المشورة.',
    },
    url: 'https://roaya.com.sa',
    client: { en: 'Roaya', ar: 'رؤية' },
    industry: { en: 'Real estate development', ar: 'التطوير العقاري' },
    services: {
      en: ['Website design', 'Website development', 'Content writing', 'Search engine optimisation'],
      ar: ['تصميم الموقع', 'تطوير الموقع', 'كتابة المحتوى', 'تحسين محركات البحث'],
    },
    details: {
      en: 'Roaya advises on real estate development in Saudi Arabia, from market analysis and stakeholder engagement to the local details that decide whether a project fits its neighbourhood. The website sets out that method and the articles the team publishes.',
      ar: 'تقدّم رؤية المشورة في التطوير العقاري في المملكة، من تحليل السوق وإشراك أصحاب المصلحة إلى التفاصيل المحلية التي تحدّد مدى ملاءمة المشروع لبيئته. يعرض الموقع هذه المنهجية والمقالات التي ينشرها الفريق.',
    },
    challenge: {
      en: 'A consultancy sells thinking rather than products, so the website had to explain the approach instead of listing features.',
      ar: 'الاستشارات تُباع بالأفكار لا بالمنتجات، لذلك كان على الموقع شرح المنهجية بدلاً من سرد المواصفات.',
    },
    solution: {
      en: 'We built the site around the company principles — knowledge transfer, stakeholder engagement and local insight — with an editorial section for thought-leadership articles.',
      ar: 'بنينا الموقع حول مبادئ الشركة: نقل المعرفة، وإشراك أصحاب المصلحة، والفهم المحلي، مع قسم تحريري للمقالات.',
    },
    result: {
      en: 'A calm, credible presence that supports proposals and long sales conversations.',
      ar: 'حضور هادئ وموثوق يدعم العروض والمفاوضات الطويلة.',
    },
    features: {
      en: ['Approach and principles section', 'Consultancy service pages', 'Insight articles', 'Bilingual-ready layout', 'Enquiry form'],
      ar: ['قسم المنهجية والمبادئ', 'صفحات خدمات الاستشارات', 'مقالات ودراسات', 'تصميم جاهز للغتين', 'نموذج تواصل'],
    },
    technologies: ['WordPress', 'Elementor'],
    gallery: ['/projects/roaya-g1.jpg', '/projects/roaya-g2.jpg'],
    fullPage: [
      '/projects/roaya-full-1.jpg',
      '/projects/roaya-full-2.jpg',
      '/projects/roaya-full-3.jpg',
      '/projects/roaya-full-4.jpg',
      '/projects/roaya-full-5.jpg',
      '/projects/roaya-full-6.jpg',
    ],
  },
  {
    id: 'adeena-perfume',
    image: '/projects/adeena-perfume.jpg',
    width: 1440,
    height: 1080,
    title: { en: 'Adeena Perfume', ar: 'أدينا للعطور' },
    category: { en: 'Online perfume store', ar: 'متجر عطور إلكتروني' },
    summary: {
      en: 'An online perfume store with product categories, search, cash-on-delivery checkout and WhatsApp ordering for customers across the region.',
      ar: 'متجر عطور إلكتروني يضم تصنيفات للمنتجات وبحثاً ودفعاً عند الاستلام وطلباً عبر واتساب لعملاء المنطقة.',
    },
    url: 'https://adeenaperfume.com/',
    client: { en: 'Adeena Perfume', ar: 'أدينا للعطور' },
    industry: { en: 'Perfumes and retail', ar: 'العطور والتجزئة' },
    services: {
      en: ['Store setup', 'Store design', 'Product catalogue', 'Ordering and delivery setup'],
      ar: ['إعداد المتجر', 'تصميم المتجر', 'كتالوج المنتجات', 'إعداد الطلب والتوصيل'],
    },
    details: {
      en: 'Adeena Perfume sells fragrances online with cash on delivery. The store is organised by category, with a prominent search bar, clear prices and a WhatsApp button for customers who prefer to order by chat.',
      ar: 'يبيع متجر أدينا للعطور العطور عبر الإنترنت مع الدفع عند الاستلام. المتجر منظّم حسب التصنيفات، مع شريط بحث واضح وأسعار ظاهرة وزر واتساب لمن يفضّل الطلب عبر المحادثة.',
    },
    challenge: {
      en: 'Customers were ordering by phone and messages, with no single place to browse products and prices.',
      ar: 'كان العملاء يطلبون عبر الهاتف والرسائل، دون مكان واحد لتصفح المنتجات والأسعار.',
    },
    solution: {
      en: 'A clean storefront with categories, search, product pages and a short checkout that supports cash on delivery.',
      ar: 'واجهة متجر نظيفة بالتصنيفات والبحث وصفحات المنتجات ودفع مختصر يدعم الدفع عند الاستلام.',
    },
    result: {
      en: 'Ordering moved online, and the team handles delivery from one dashboard.',
      ar: 'انتقل الطلب إلى الإنترنت، ويُدير الفريق التوصيل من لوحة واحدة.',
    },
    features: {
      en: ['Product categories and search', 'Product pages with clear pricing', 'Cash-on-delivery checkout', 'WhatsApp ordering', 'Mobile-first layout'],
      ar: ['تصنيفات المنتجات والبحث', 'صفحات منتجات بأسعار واضحة', 'الدفع عند الاستلام', 'الطلب عبر واتساب', 'تصميم يبدأ من الجوال'],
    },
    technologies: ['Next.js', 'E-commerce'],
  },
  {
    id: 'kpk-collection',
    image: '/projects/kpk-collection.jpg',
    width: 1440,
    height: 1080,
    title: { en: 'KPK Collection', ar: 'كيه بي كيه كولكشن' },
    category: { en: 'E-commerce store', ar: 'متجر إلكتروني' },
    summary: {
      en: 'A multi-category online store for shoppers in Pakistan, with category navigation, daily deals and a short buying flow.',
      ar: 'متجر إلكتروني متعدد الأقسام للمتسوقين في باكستان، بتصفح حسب الأقسام وعروض يومية ومسار شراء قصير.',
    },
    url: 'https://kpkcollection.com',
    client: { en: 'KPK Collection', ar: 'كيه بي كيه كولكشن' },
    industry: { en: 'Retail and e-commerce', ar: 'التجزئة والتجارة الإلكترونية' },
    services: {
      en: ['Store design', 'Store development', 'Category structure', 'Promotions setup'],
      ar: ['تصميم المتجر', 'تطوير المتجر', 'هيكلة الأقسام', 'إعداد العروض'],
    },
    details: {
      en: 'KPK Collection sells Peshawari chappals, footwear, electronics, dry fruit, health and beauty products and home goods. The store groups a wide catalogue into clear categories and gives seasonal offers such as the Eid sale a fixed home on the home page.',
      ar: 'يبيع متجر كيه بي كيه كولكشن الشبّال البشاوري والأحذية والأجهزة الإلكترونية والمكسرات ومنتجات الصحة والجمال ومستلزمات المنزل. يجمع المتجر كتالوجاً واسعاً في أقسام واضحة، ويخصص مكاناً ثابتاً في الصفحة الرئيسية للعروض الموسمية مثل عرض العيد.',
    },
    challenge: {
      en: 'Dozens of product lines in one store risked overwhelming shoppers and hiding the seasonal offers.',
      ar: 'كان وجود عشرات خطوط المنتجات في متجر واحد يربك المتسوقين ويخفي العروض الموسمية.',
    },
    solution: {
      en: 'Clear category navigation, featured and best-seller sections, a deal-of-the-day block with a countdown, and a cart that keeps the buying flow short.',
      ar: 'تصفح واضح حسب الأقسام، وأقسام للمنتجات المميزة والأكثر مبيعاً، وبلوك لعرض اليوم مع عدّاد تنازلي، وسلة تُبقي مسار الشراء قصيراً.',
    },
    result: {
      en: 'Shoppers reach a product in a couple of taps, and seasonal campaigns have a permanent place on the home page.',
      ar: 'يصل المتسوق إلى المنتج بلمستين، وللعروض الموسمية مكان دائم في الصفحة الرئيسية.',
    },
    features: {
      en: ['Category navigation for the full catalogue', 'Featured products and top sellers', 'Deal of the day with countdown', 'Shopping cart and checkout', 'Regional currency pricing'],
      ar: ['تصفح الأقسام لكل الكتالوج', 'المنتجات المميزة والأكثر مبيعاً', 'عرض اليوم مع عدّاد تنازلي', 'سلة الشراء وإتمام الطلب', 'أسعار بعملة السوق'],
    },
    gallery: ['/projects/kpk-collection-g1.jpg', '/projects/kpk-collection-g2.jpg'],
    fullPage: [
      '/projects/kpk-collection-full-1.jpg',
      '/projects/kpk-collection-full-2.jpg',
      '/projects/kpk-collection-full-3.jpg',
      '/projects/kpk-collection-full-4.jpg',
      '/projects/kpk-collection-full-5.jpg',
    ],
  },
  {
    id: 'b-it',
    image: '/projects/b-it.jpg',
    width: 1440,
    height: 1080,
    title: { en: 'B-IT', ar: 'بي آي تي' },
    category: { en: 'Software company website', ar: 'موقع شركة برمجيات' },
    summary: {
      en: 'A bilingual website for a Riyadh software company, covering custom software, mobile apps, AI solutions, SaaS platforms and ERP systems.',
      ar: 'موقع ثنائي اللغة لشركة برمجيات في الرياض، يغطي تطوير البرمجيات المخصصة وتطبيقات الجوال وحلول الذكاء الاصطناعي ومنصات SaaS وأنظمة ERP.',
    },
    url: 'https://b-it.co/',
    client: { en: 'B-IT', ar: 'بي آي تي' },
    industry: { en: 'Software development', ar: 'تطوير البرمجيات' },
    services: {
      en: ['Website design', 'Website development', 'Arabic and English content', 'Motion and animation'],
      ar: ['تصميم الموقع', 'تطوير الموقع', 'المحتوى العربي والإنجليزي', 'الحركة والأنيميشن'],
    },
    details: {
      en: 'B-IT builds software in Riyadh for clients across Saudi Arabia: custom platforms, mobile apps, AI solutions, SaaS products and ERP systems. The website explains each practice area, introduces the training programmes and shows the clients the company works with.',
      ar: 'تبني بي آي تي البرمجيات في الرياض لعملاء في المملكة: منصات مخصصة، وتطبيقات جوال، وحلول ذكاء اصطناعي، ومنتجات SaaS، وأنظمة ERP. يشرح الموقع كل مجال، ويعرّف ببرامج التدريب، ويعرض العملاء الذين تعمل معهم الشركة.',
    },
    challenge: {
      en: 'The company grew quickly across several practices, and the website no longer explained the different solutions clearly.',
      ar: 'نمت الشركة بسرعة في مجالات عدة، ولم يعد الموقع يشرح الحلول المختلفة بوضوح.',
    },
    solution: {
      en: 'We restructured the site around solution areas, added a clear Arabic and English switch, and used restrained motion to keep the technical content readable.',
      ar: 'أعدنا هيكلة الموقع حول مجالات الحلول، وأضفنا تبديلاً واضحاً بين العربية والإنجليزية، واستخدمنا حركة محدودة تُبقي المحتوى التقني مقروءاً.',
    },
    result: {
      en: 'Prospects understand the offer before the first call, and the team shares direct links to the relevant solution.',
      ar: 'يفهم العملاء العرض قبل أول مكالمة، ويشارك الفريق روابط مباشرة للحل المناسب.',
    },
    features: {
      en: ['Solution pages for software, apps, AI and ERP', 'Arabic and English switch', 'Programmes and training section', 'Client list and testimonials', 'Contact and enquiry forms'],
      ar: ['صفحات حلول للبرمجيات والتطبيقات والذكاء الاصطناعي وأنظمة ERP', 'تبديل بين العربية والإنجليزية', 'قسم البرامج والتدريب', 'قائمة العملاء وآراؤهم', 'نماذج التواصل والاستفسار'],
    },
    technologies: ['Next.js'],
    gallery: ['/projects/b-it-g2.jpg'],
    fullPage: [
      '/projects/b-it-full-1.jpg',
      '/projects/b-it-full-2.jpg',
      '/projects/b-it-full-3.jpg',
      '/projects/b-it-full-4.jpg',
      '/projects/b-it-full-5.jpg',
      '/projects/b-it-full-6.jpg',
    ],
  },
  {
    id: 'labnor',
    image: '/projects/labnor.jpg',
    width: 1440,
    height: 1080,
    title: { en: 'Labnor Perfume', ar: 'لابنور للعطور' },
    category: { en: 'Online perfume store', ar: 'متجر عطور إلكتروني' },
    summary: {
      en: 'A premium fragrance store with bundles, best sellers and clear product pages, built to sell confidently on a phone.',
      ar: 'متجر عطور فاخر يضم باقات وترتيباً للأكثر مبيعاً وصفحات منتجات واضحة، مبني للبيع بثقة من الجوال.',
    },
    url: 'https://labnor.store',
    client: { en: 'Labnor', ar: 'لابنور' },
    industry: { en: 'Perfumes and retail', ar: 'العطور والتجزئة' },
    services: {
      en: ['Store design', 'Store development', 'Product presentation', 'Campaign setup'],
      ar: ['تصميم المتجر', 'تطوير المتجر', 'عرض المنتجات', 'إعداد الحملات'],
    },
    details: {
      en: 'Labnor sells extrait de parfum fragrances online, including bundles and seasonal offers. The store leads with strong product imagery, groups scents into families, and keeps delivery information and support within reach.',
      ar: 'يبيع لابنور عطور الإكستريه عبر الإنترنت، بما يشمل الباقات والعروض الموسمية. يبرز المتجر صور المنتجات، ويصنّف العطور في عائلات، ويُبقي معلومات التوصيل والدعم في متناول العميل.',
    },
    challenge: {
      en: 'A premium fragrance has to sell on feel, so the store needed to look expensive without becoming slow.',
      ar: 'العطر الفاخر يُباع بالإحساس، لذلك كان على المتجر أن يبدو فاخراً دون أن يصبح بطيئاً.',
    },
    solution: {
      en: 'A dark, editorial storefront with large product images, bundles, best-seller and fragrance-family groupings, and a fast, mobile-first checkout.',
      ar: 'واجهة متجر أنيقة بصور منتجات كبيرة، وباقات، وتجميع للأكثر مبيعاً وعائلات العطور، مع دفع سريع يبدأ من الجوال.',
    },
    result: {
      en: 'Customers browse and buy on their phones, and bundles make it easy to order more than one scent.',
      ar: 'يتصفح العملاء ويشترون من الجوال، وتسهّل الباقات طلب أكثر من عطر واحد.',
    },
    features: {
      en: ['Bundles and offers', 'Best sellers and fragrance families', 'Product pages with sizes and notes', 'Fast mobile checkout', 'WhatsApp support'],
      ar: ['الباقات والعروض', 'الأكثر مبيعاً وعائلات العطور', 'صفحات منتجات بالأحجام والنوتات', 'دفع سريع من الجوال', 'الدعم عبر واتساب'],
    },
    gallery: ['/projects/labnor-g1.jpg', '/projects/labnor-g2.jpg'],
    fullPage: [
      '/projects/labnor-full-1.jpg',
      '/projects/labnor-full-2.jpg',
      '/projects/labnor-full-3.jpg',
    ],
  },
  {
    id: 'next-future-tech',
    image: '/projects/next-future-tech.jpg',
    width: 1440,
    height: 1080,
    title: { en: 'Next Future IT', ar: 'نكست فيوتشر لتقنية المعلومات' },
    category: { en: 'IT company website', ar: 'موقع شركة تقنية معلومات' },
    summary: {
      en: 'A corporate website for a Saudi IT company, presenting web, app, ERP and marketing services alongside its delivered projects.',
      ar: 'موقع تعريفي لشركة تقنية معلومات سعودية، يعرض خدمات تطوير الويب والتطبيقات وأنظمة ERP والتسويق إلى جانب مشاريعها المنفذة.',
    },
    url: 'https://nextfuturetech.net/',
    client: { en: 'Next Future Information Technology', ar: 'نكست فيوتشر لتقنية المعلومات' },
    industry: { en: 'IT services', ar: 'خدمات تقنية المعلومات' },
    services: {
      en: ['Website design', 'Website development', 'Content writing', 'Search engine optimisation'],
      ar: ['تصميم الموقع', 'تطوير الموقع', 'كتابة المحتوى', 'تحسين محركات البحث'],
    },
    details: {
      en: 'Next Future IT provides web and app development, digital marketing, ERP implementations such as Odoo and property management, and custom software. The website walks a visitor through the services, the delivery plan, previous projects, customer reviews and the questions buyers usually ask.',
      ar: 'تقدّم نكست فيوتشر تطوير الويب والتطبيقات والتسويق الرقمي وتنفيذ أنظمة ERP مثل Odoo وإدارة العقارات والبرمجيات المخصصة. يأخذ الموقع الزائر عبر الخدمات وخطة التنفيذ والمشاريع السابقة وتقييمات العملاء والأسئلة الشائعة.',
    },
    challenge: {
      en: 'A broad service list with no clear story, so buyers could not tell where to start.',
      ar: 'قائمة خدمات واسعة دون قصة واضحة، فلم يستطع العميل معرفة من أين يبدأ.',
    },
    solution: {
      en: 'We grouped the services, added a delivery-plan section, a projects showcase, customer reviews and an FAQ that answers the usual questions.',
      ar: 'جمعنا الخدمات في مجموعات، وأضفنا قسم خطة التنفيذ، ومعرض مشاريع، وآراء العملاء، وأسئلة شائعة تجيب عن الاستفسارات المتكررة.',
    },
    result: {
      en: 'Clearer enquiries, because visitors reach the contact form already knowing which service they need.',
      ar: 'استفسارات أوضح، لأن الزائر يصل إلى نموذج التواصل وهو يعرف الخدمة التي يحتاجها.',
    },
    features: {
      en: ['Service pages with a delivery plan', 'ERP and Odoo section', 'Previous projects showcase', 'Customer reviews', 'FAQ section'],
      ar: ['صفحات خدمات مع خطة تنفيذ', 'قسم أنظمة ERP وOdoo', 'معرض المشاريع السابقة', 'تقييمات العملاء', 'قسم الأسئلة الشائعة'],
    },
    technologies: ['Next.js'],
    gallery: ['/projects/next-future-tech-g1.jpg', '/projects/next-future-tech-g2.jpg'],
    fullPage: [
      '/projects/next-future-tech-full-1.jpg',
      '/projects/next-future-tech-full-2.jpg',
      '/projects/next-future-tech-full-3.jpg',
      '/projects/next-future-tech-full-4.jpg',
      '/projects/next-future-tech-full-5.jpg',
    ],
  },
  {
    id: 'tilal-rimal',
    image: '/projects/tilal-rimal.jpg',
    width: 1440,
    height: 1080,
    title: { en: 'Tilal Rimal', ar: 'تلال الرمال' },
    category: { en: 'Tourism company website', ar: 'موقع شركة سياحة' },
    summary: {
      en: 'A travel website for a Saudi tourism organiser, with trip packages for families, schools, companies and private groups.',
      ar: 'موقع سفر لمنظّم رحلات سياحية سعودي، يضم باقات رحلات للعائلات والمدارس والشركات والمجموعات الخاصة.',
    },
    url: 'https://tilalr.com/',
    client: { en: 'Tilal Rimal', ar: 'تلال الرمال' },
    industry: { en: 'Tourism and travel', ar: 'السياحة والسفر' },
    services: {
      en: ['Website design', 'Website development', 'Content writing', 'Booking enquiry setup'],
      ar: ['تصميم الموقع', 'تطوير الموقع', 'كتابة المحتوى', 'إعداد نماذج الحجز'],
    },
    details: {
      en: 'Tilal Rimal organises trips across Saudi Arabia that mix fun, adventure and meaning: family trips, school trips, corporate outings and private groups. The website sets out the destinations, the types of trips and the stories travellers send back.',
      ar: 'تنظّم تلال الرمال رحلات داخل المملكة تجمع المتعة والمغامرة والقيمة: رحلات عائلية ومدرسية ورحلات الشركات والمجموعات الخاصة. يعرض الموقع الوجهات وأنواع الرحلات وقصص المسافرين.',
    },
    challenge: {
      en: 'Travellers needed to see the range of trips quickly and book without calling.',
      ar: 'احتاج المسافرون إلى رؤية أنواع الرحلات بسرعة والحجز دون اتصال هاتفي.',
    },
    solution: {
      en: 'A friendly, image-led website with grouped trip types, destination pages, traveller stories and a short enquiry form on every page.',
      ar: 'موقع ودود يعتمد على الصور، بأنواع رحلات مجمّعة، وصفحات للوجهات، وقصص المسافرين، ونموذج استفسار قصير في كل صفحة.',
    },
    result: {
      en: 'Enquiries arrive through the site with the trip type already chosen.',
      ar: 'تصل الاستفسارات عبر الموقع ونوع الرحلة محدّد مسبقاً.',
    },
    features: {
      en: ['Trip types for families, schools, companies and private groups', 'Destination pages', 'Traveller stories', 'Enquiry form', 'Fast, mobile-first build'],
      ar: ['أنواع الرحلات للعائلات والمدارس والشركات والمجموعات الخاصة', 'صفحات الوجهات', 'قصص المسافرين', 'نموذج الاستفسار', 'بناء سريع يبدأ من الجوال'],
    },
    technologies: ['Next.js'],
    gallery: ['/projects/tilal-rimal-g1.jpg', '/projects/tilal-rimal-g2.jpg'],
    fullPage: [
      '/projects/tilal-rimal-full-1.jpg',
      '/projects/tilal-rimal-full-2.jpg',
      '/projects/tilal-rimal-full-3.jpg',
      '/projects/tilal-rimal-full-4.jpg',
      '/projects/tilal-rimal-full-5.jpg',
    ],
  },
  {
    id: 'taqr',
    image: '/projects/taqr.jpg',
    width: 1440,
    height: 1080,
    title: { en: 'TAQR', ar: 'تقر' },
    category: { en: 'Marketing agency website', ar: 'موقع وكالة تسويق' },
    summary: {
      en: 'A bilingual website for a Saudi creative strategy and digital marketing company, presenting strategy, brand, digital experience and growth work.',
      ar: 'موقع ثنائي اللغة لشركة استراتيجية إبداعية وتسويق رقمي سعودية، يعرض أعمالها في الاستراتيجية والهوية والتجارب الرقمية والنمو.',
    },
    url: 'https://taqr-sa.com/',
    client: { en: 'TAQR', ar: 'تقر' },
    industry: { en: 'Digital marketing', ar: 'التسويق الرقمي' },
    services: {
      en: ['Website design', 'Website development', 'Arabic and English content', 'Motion design'],
      ar: ['تصميم الموقع', 'تطوير الموقع', 'المحتوى العربي والإنجليزي', 'تصميم الحركة'],
    },
    details: {
      en: 'TAQR helps businesses in Saudi Arabia turn attention into trust, leads and measurable growth through strategy, technology and creative execution. The website is built around the four practices the agency sells and the campaigns it publishes.',
      ar: 'تساعد تقر الشركات في المملكة على تحويل الانتباه إلى ثقة وعملاء ونمو قابل للقياس عبر الاستراتيجية والتقنية والتنفيذ الإبداعي. بُني الموقع حول المجالات الأربعة التي تقدّمها الوكالة والمشاريع التي تنشرها.',
    },
    challenge: {
      en: 'The agency needed a website as polished as the work it produces for clients.',
      ar: 'احتاجت الوكالة إلى موقع بمستوى الأعمال التي تنتجها لعملائها.',
    },
    solution: {
      en: 'A cinematic, dark-themed site with a strong hero, restrained motion, clear practice areas and an editorial section for campaigns.',
      ar: 'موقع سينمائي بثيم داكن، وواجهة قوية، وحركة محدودة، ومجالات عمل واضحة، وقسم تحريري للمشاريع والحملات.',
    },
    result: {
      en: 'A portfolio that earns credibility in the first few seconds of a visit.',
      ar: 'ملف أعمال يبني الثقة في ثوانٍ من زيارة الموقع.',
    },
    features: {
      en: ['Practice areas for strategy, brand, digital and growth', 'Motion-led hero and section reveals', 'Bilingual layout with a language switch', 'Campaign and article section', 'Contact and project enquiry forms'],
      ar: ['مجالات عمل للاستراتيجية والهوية والرقمي والنمو', 'واجهة وانتقالات تعتمد على الحركة', 'تصميم ثنائي اللغة مع تبديل اللغة', 'قسم الحملات والمقالات', 'نماذج التواصل وطلب المشاريع'],
    },
    gallery: ['/projects/taqr-g1.jpg', '/projects/taqr-g2.jpg'],
    fullPage: [
      '/projects/taqr-full-1.jpg',
      '/projects/taqr-full-2.jpg',
      '/projects/taqr-full-3.jpg',
      '/projects/taqr-full-4.jpg',
    ],
  },
  {
    id: 'jh-it-zone',
    image: '/projects/jh-it-zone.jpg',
    width: 1440,
    height: 1080,
    title: { en: 'JH IT Zone', ar: 'جي إتش آي تي زون' },
    category: { en: 'IT services website', ar: 'موقع خدمات تقنية' },
    summary: {
      en: 'A services website for an IT solutions and training company, introducing its development, design and marketing work.',
      ar: 'موقع خدمات لشركة حلول تقنية وتدريب، يعرّف بأعمالها في التطوير والتصميم والتسويق.',
    },
    url: 'https://jhitzone.com/',
    client: { en: 'JH IT Zone', ar: 'جي إتش آي تي زون' },
    industry: { en: 'IT solutions and training', ar: 'حلول تقنية المعلومات والتدريب' },
    services: {
      en: ['Website design', 'Website development', 'Content writing', 'Search engine optimisation'],
      ar: ['تصميم الموقع', 'تطوير الموقع', 'كتابة المحتوى', 'تحسين محركات البحث'],
    },
    details: {
      en: 'JH IT Zone delivers web, software, AI, ERP, cloud, security and analytics work, and runs training for teams. The website groups the services, shows the portfolio, and opens a route to careers and the company blog.',
      ar: 'تقدّم جي إتش آي تي زون خدمات الويب والبرمجيات والذكاء الاصطناعي وأنظمة ERP والسحابة والأمن والتحليلات، وتنظّم تدريباً للفرق. يجمع الموقع الخدمات، ويعرض الأعمال، ويفتح مساراً للوظائف والمدونة.',
    },
    challenge: {
      en: 'A long service list that read like a catalogue rather than a company.',
      ar: 'قائمة خدمات طويلة تقرأ كأنها كتالوج وليست تعريفاً بشركة.',
    },
    solution: {
      en: 'We structured the site by service, added a portfolio grid, a careers page and a blog, and kept the copy plain.',
      ar: 'نظّمنا الموقع حسب الخدمات، وأضفنا شبكة أعمال، وصفحة وظائف، ومدونة، وأبقينا النص بسيطاً.',
    },
    result: {
      en: 'Visitors move from a service to real examples in one click.',
      ar: 'ينتقل الزائر من الخدمة إلى أمثلة حقيقية بنقرة واحدة.',
    },
    features: {
      en: ['Service pages for development, design and marketing', 'Portfolio grid', 'Careers section', 'Company blog', 'Contact forms'],
      ar: ['صفحات خدمات للتطوير والتصميم والتسويق', 'شبكة الأعمال', 'قسم الوظائف', 'مدونة الشركة', 'نماذج التواصل'],
    },
    technologies: ['WordPress', 'Elementor'],
    gallery: ['/projects/jh-it-zone-g1.jpg', '/projects/jh-it-zone-g2.jpg'],
    fullPage: [
      '/projects/jh-it-zone-full-1.jpg',
      '/projects/jh-it-zone-full-2.jpg',
      '/projects/jh-it-zone-full-3.jpg',
    ],
  },
  {
    id: 'mr-quraysh',
    image: '/projects/mr-quraysh.jpg',
    width: 1440,
    height: 1080,
    title: { en: 'Mr. Quraysh', ar: 'مستر قريش' },
    category: { en: 'Artist portfolio website', ar: 'موقع أعمال فنية' },
    summary: {
      en: 'An art and poetry portfolio for Saudi artist Mr. Quraysh, presenting paintings, sketches and museum-quality photography as a curated archive.',
      ar: 'موقع للأعمال الفنية والشعر للفنان السعودي مستر قريش، يعرض اللوحات والرسم والتصوير الفوتوغرافي في أرشيف منسّق.',
    },
    url: 'https://mr-quraysh.com/',
    client: { en: 'Mr. Quraysh', ar: 'مستر قريش' },
    industry: { en: 'Art and culture', ar: 'الفن والثقافة' },
    services: {
      en: ['Website design', 'Website development', 'Artwork presentation', 'Search engine optimisation'],
      ar: ['تصميم الموقع', 'تطوير الموقع', 'عرض الأعمال الفنية', 'تحسين محركات البحث'],
    },
    details: {
      en: 'Mr. Quraysh is an official master fine art archive: paintings, sketches and museum-quality photography from the artist. The website is built like a gallery — a quiet, dark room where each work is shown with its title, year and size, and where visitors can read the artist manifesto before opening the archive.',
      ar: 'مستر قريش أرشيف فني رسمي يضم اللوحات والرسم والتصوير الفوتوغرافي بمستوى المتاحف. بُني الموقع كصالة عرض: مساحة هادئة داكنة يُعرض فيها كل عمل بعنوانه وسنته ومقاسه، ويقرأ الزائر بيان الفنان قبل أن يفتح الأرشيف.',
    },
    challenge: {
      en: 'Artwork has to breathe online, look the same on every screen, and never let the interface compete with the picture.',
      ar: 'يحتاج العمل الفني إلى مساحة تتيح له الظهور، وأن يبدو بالشكل نفسه على كل شاشة، دون أن تنافسه واجهة الموقع.',
    },
    solution: {
      en: 'A restrained black-and-gold design with a featured masterworks slider, a filterable artworks archive and pages that present each piece with its own details.',
      ar: 'تصميم هادئ بالأسود والذهبي، مع شريط للأعمال المميزة، وأرشيف قابل للتصفية، وصفحات تعرض كل عمل بتفاصيله.',
    },
    result: {
      en: 'The artist now has one link that presents the whole body of work, ready to share with galleries, collectors and the press.',
      ar: 'أصبح لدى الفنان رابط واحد يعرض مجمل أعماله، جاهزاً للمشاركة مع الصالات والمقتنين والصحافة.',
    },
    features: {
      en: ['Featured masterworks slider', 'Artworks archive with categories', 'Artwork pages with title, year and size', 'Artist manifesto and working process', 'Instagram and YouTube links', 'Contact and WhatsApp'],
      ar: ['شريط للأعمال المميزة', 'أرشيف أعمال مصنّف بالفئات', 'صفحات للأعمال بالعنوان والسنة والمقاس', 'بيان الفنان ومراحل العمل', 'روابط إنستغرام ويوتيوب', 'التواصل وواتساب'],
    },
    gallery: ['/projects/mr-quraysh-g1.jpg', '/projects/mr-quraysh-g2.jpg'],
    fullPage: [
      '/projects/mr-quraysh-full-1.jpg',
      '/projects/mr-quraysh-full-2.jpg',
      '/projects/mr-quraysh-full-3.jpg',
      '/projects/mr-quraysh-full-4.jpg',
      '/projects/mr-quraysh-full-5.jpg',
      '/projects/mr-quraysh-full-6.jpg',
    ],
  },
  {
    id: 'tasalla',
    image: '/projects/tasalla.jpg',
    width: 1440,
    height: 1080,
    title: { en: 'Tasalla', ar: 'تسلّى' },
    category: { en: 'Playground and site furniture website', ar: 'موقع حلول الألعاب وأثاث المواقع' },
    summary: {
      en: 'A bilingual website for a Saudi playground and outdoor fitness supplier, presenting European-standard play equipment, delivered projects and company values.',
      ar: 'موقع ثنائي اللغة لمورّد سعودي لحلول الألعاب واللياقة الخارجية، يعرض معدات بمعايير أوروبية ومشاريع منفذة وقيم الشركة.',
    },
    url: 'https://tasalla.co/',
    client: { en: 'Tasalla', ar: 'تسلّى' },
    industry: { en: 'Playgrounds and outdoor furniture', ar: 'الألعاب وأثاث المواقع' },
    services: {
      en: ['Website design', 'Website development', 'Arabic and English content', 'Search engine optimisation'],
      ar: ['تصميم الموقع', 'تطوير الموقع', 'المحتوى العربي والإنجليزي', 'تحسين محركات البحث'],
    },
    details: {
      en: 'Tasalla supplies playgrounds, outdoor fitness areas and site furniture across Saudi Arabia to European standards, and takes part in Vision 2030 quality-of-life projects. The website explains the services, shows delivered projects, and keeps a consultation request within reach on every screen.',
      ar: 'توفّر تسلّى حلول الألعاب ومناطق اللياقة الخارجية وأثاث المواقع في المملكة وفق معايير أوروبية، وتشارك في مشاريع جودة الحياة ضمن رؤية 2030. يشرح الموقع الخدمات، ويعرض المشاريع المنفذة، ويُبقي طلب الاستشارة في متناول الزائر في كل شاشة.',
    },
    challenge: {
      en: 'A range that depends on scale, safety and durability had to be explained clearly to municipalities, schools and developers.',
      ar: 'كان لا بد من شرح مجموعة تعتمد على الحجم ومعايير السلامة والمتانة بوضوح للبلديات والمدارس والمطورين.',
    },
    solution: {
      en: 'A colourful, image-led bilingual website with service sections, a project showcase, the company values and the power of play, and a consultation button in the header.',
      ar: 'موقع ثنائي اللغة تعتمد واجهته على الألوان والصور، بأقسام للخدمات ومعرض للمشاريع وقيم الشركة وأهمية اللعب، وزر للاستشارة في الشريط العلوي.',
    },
    result: {
      en: 'Buyers see the range and the standards in one place, and enquiries arrive with the project type already known.',
      ar: 'يرى المشتري المجموعة والمعايير في مكان واحد، وتصل الاستفسارات ونوع المشروع معروف مسبقاً.',
    },
    features: {
      en: ['Service showcase for playgrounds, fitness and site furniture', 'Delivered projects', 'Values and quality-of-life positioning', 'Arabic and English switch', 'Get-consultation form', 'WhatsApp contact'],
      ar: ['عرض خدمات الألعاب واللياقة وأثاث المواقع', 'المشاريع المنفذة', 'قيم الشركة وموقعها في جودة الحياة', 'تبديل بين العربية والإنجليزية', 'نموذج طلب استشارة', 'التواصل عبر واتساب'],
    },
    gallery: ['/projects/tasalla-g1.jpg', '/projects/tasalla-g2.jpg'],
    fullPage: [
      '/projects/tasalla-full-1.jpg',
      '/projects/tasalla-full-2.jpg',
      '/projects/tasalla-full-3.jpg',
      '/projects/tasalla-full-4.jpg',
      '/projects/tasalla-full-5.jpg',
      '/projects/tasalla-full-6.jpg',
    ],
  },
  {
    id: 'algedra',
    image: '/projects/algedra.jpg',
    width: 1440,
    height: 1080,
    title: { en: 'Algedra', ar: 'الكيدرا' },
    category: { en: 'Interior design and architecture website', ar: 'موقع تصميم داخلي وهندسة معمارية' },
    summary: {
      en: 'A bilingual website for an award-winning Dubai interior design and architecture studio, presenting its residential, commercial and architectural projects.',
      ar: 'موقع ثنائي اللغة لاستوديو تصميم داخلي وهندسة معمارية في دبي حاصل على جوائز، يعرض مشاريعه السكنية والتجارية والمعمارية.',
    },
    url: 'https://algedra.ae/',
    client: { en: 'Algedra Interior Design', ar: 'الكيدرا للتصميم الداخلي' },
    industry: { en: 'Interior design and architecture', ar: 'التصميم الداخلي والهندسة المعمارية' },
    services: {
      en: ['Website design', 'Website development', 'Arabic and English content', 'Project showcases'],
      ar: ['تصميم الموقع', 'تطوير الموقع', 'المحتوى العربي والإنجليزي', 'معرض المشاريع'],
    },
    details: {
      en: 'Algedra is an award-winning interior design and architecture company in Dubai, founded in 2013 by Eng. Tareq Skaik and CEO Mohab Ayoub, with more than 500 completed projects and a team of over 50 licensed architects, engineers and designers. The website organises that body of work into interior design and architecture sections, and gives every project its own page.',
      ar: 'الكيدرا شركة تصميم داخلي وهندسة معمارية في دبي حاصلة على جوائز، أسّسها المهندس طارق سكيك والمهندس محب أيوب عام 2013، بأكثر من 500 مشروع منفذ وفريق يضم أكثر من 50 معمارياً ومهندساً ومصمماً معتمداً. ينظّم الموقع هذا الرصيد في أقسام للتصميم الداخلي والهندسة المعمارية، ويمنح كل مشروع صفحته الخاصة.',
    },
    challenge: {
      en: 'A large portfolio across many building types had to stay easy to browse for both residential and commercial clients.',
      ar: 'كان لا بد أن يبقى معرض المشاريع الواسع، بمختلف أنواع المباني، سهل التصفح لعملاء القطاع السكني والتجاري معاً.',
    },
    solution: {
      en: 'We built the site around two clear tracks — interior design and architecture — with category pages for towers, villas, malls, banks and offices, a project gallery and a free-consultation entry point.',
      ar: 'بنينا الموقع حول مسارين واضحين: التصميم الداخلي والهندسة المعمارية، مع صفحات للأبراج والفلل والمولات والبنوك والمكاتب، ومعرض للمشاريع، ونقطة دخول للاستشارة المجانية.',
    },
    result: {
      en: 'Visitors reach a relevant project in a couple of clicks, and the awards and the size of the studio are visible from the first screen.',
      ar: 'يصل الزائر إلى مشروع مناسب بنقرتين، وتظهر الجوائز وحجم الاستوديو من الشاشة الأولى.',
    },
    features: {
      en: ['Separate interior design and architecture sections', 'Project categories: towers, villas, malls, banks and offices', 'A page for every project', 'Awards and credentials', 'Arabic and English switch', 'Free consultation call to action'],
      ar: ['قسمان منفصلان للتصميم الداخلي والهندسة المعمارية', 'تصنيفات المشاريع: الأبراج والفلل والمولات والبنوك والمكاتب', 'صفحة لكل مشروع', 'الجوائز والاعتمادات', 'تبديل بين العربية والإنجليزية', 'دعوة للاستشارة المجانية'],
    },
    technologies: ['Next.js'],
    gallery: ['/projects/algedra-g1.jpg', '/projects/algedra-g2.jpg'],
    fullPage: [
      '/projects/algedra-full-1.jpg',
      '/projects/algedra-full-2.jpg',
      '/projects/algedra-full-3.jpg',
      '/projects/algedra-full-4.jpg',
      '/projects/algedra-full-5.jpg',
      '/projects/algedra-full-6.jpg',
    ],
=======

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
>>>>>>> 02923ce677fe9014de603a43fa71606b69bac950
  },
];
