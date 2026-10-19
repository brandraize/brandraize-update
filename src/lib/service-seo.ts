import type { Locale } from './site';

type Text = Record<Locale, string>;

// Search-focused copy for each service's own page (/service/<slug>). Titles and headings carry
// the phrases people type into Google in Saudi Arabia, in both languages.
export type ServiceSeo = {
  title: Text;
  h1: Text;
  description: Text;
  intro: Record<Locale, string[]>;
  // Built-in project ids shown as proof on the page, when they exist.
  projects: string[];
  faqs: Record<Locale, Array<{ q: string; a: string }>>;
};

export const serviceSeo: Record<string, ServiceSeo> = {
  'web-development': {
    title: {
      en: 'Web Design & Development Company in Jeddah & Riyadh',
      ar: 'شركة تصميم مواقع في جدة والرياض — تصميم وبرمجة مواقع إلكترونية',
    },
    h1: {
      en: 'Web Design & Development Company in Jeddah, Saudi Arabia',
      ar: 'شركة تصميم وبرمجة مواقع إلكترونية في جدة والسعودية',
    },
    description: {
      en: 'Custom website design and development in Jeddah and Riyadh. Arabic & English, fast, mobile-first and SEO-ready company websites. Free consultation.',
      ar: 'تصميم مواقع جدة والرياض: تصميم وبرمجة موقع شركتك بالعربية والإنجليزية، سريع ومتجاوب مع الجوال وجاهز لمحركات البحث. استشارة مجانية.',
    },
    intro: {
      en: [
        'Brandraize is a web design company in Jeddah building custom company websites for businesses across Saudi Arabia — Jeddah, Riyadh, Makkah, Dammam and beyond. Every site is designed from scratch around your brand, never a recycled template.',
        'We build bilingual Arabic and English websites with a proper right-to-left layout from day one, fast loading on mobile, and a search-engine-friendly structure so customers can find you on Google.',
      ],
      ar: [
        'براندرايز شركة تصميم مواقع في جدة نصمّم ونبرمج مواقع الشركات في جميع أنحاء المملكة — جدة والرياض ومكة والدمام وغيرها. كل موقع يُصمَّم من الصفر ليعكس هوية علامتك، وليس قالباً مكرراً.',
        'نبني مواقع ثنائية اللغة بالعربية والإنجليزية بتنسيق صحيح من اليمين لليسار منذ اليوم الأول، وسرعة تحميل عالية على الجوال، وبنية صديقة لمحركات البحث ليجدك عملاؤك على Google.',
      ],
    },
    projects: ['fadl-altawasul', 'algedra', 'b-it'],
    faqs: {
      en: [
        {
          q: 'How much does website design cost in Saudi Arabia?',
          a: 'It depends on the number of pages, languages, and features such as booking or online payment. After a free consultation we send a fixed quote with no hidden costs.',
        },
        {
          q: 'How long does it take to build a company website?',
          a: 'Most company websites are ready in two to six weeks, delivered in clear stages from design approval to launch.',
        },
        {
          q: 'Will my website appear on Google?',
          a: 'Yes. Every website is built with search-friendly structure, speed, and metadata, connected to Google Search Console, and ready for SEO.',
        },
      ],
      ar: [
        {
          q: 'كم تكلفة تصميم موقع إلكتروني في السعودية؟',
          a: 'تعتمد التكلفة على عدد الصفحات واللغات والمزايا مثل الحجز أو الدفع الإلكتروني. بعد استشارة مجانية نرسل لك عرض سعر ثابتاً دون تكاليف خفية.',
        },
        {
          q: 'كم يستغرق تصميم موقع شركة؟',
          a: 'معظم مواقع الشركات تكون جاهزة خلال أسبوعين إلى ستة أسابيع، ونسلّمها على مراحل واضحة من اعتماد التصميم حتى الإطلاق.',
        },
        {
          q: 'هل سيظهر موقعي في Google؟',
          a: 'نعم. نبني كل موقع ببنية وسرعة وبيانات وصفية صديقة لمحركات البحث، ونربطه بـ Google Search Console ليكون جاهزاً للـ SEO.',
        },
      ],
    },
  },
  'mobile-apps': {
    title: {
      en: 'Mobile App Development Company in Saudi Arabia | iOS & Android',
      ar: 'شركة برمجة تطبيقات في جدة والسعودية | تطوير تطبيقات الجوال',
    },
    h1: {
      en: 'Mobile App Development Company in Saudi Arabia',
      ar: 'شركة تطوير وبرمجة تطبيقات الجوال في السعودية',
    },
    description: {
      en: 'iOS and Android app development in Jeddah and Riyadh: design, development, Arabic RTL interface, admin dashboard and App Store publishing. Free consultation.',
      ar: 'تطوير تطبيقات الجوال في جدة والرياض: تصميم وبرمجة تطبيقات آيفون وأندرويد بواجهة عربية ولوحة تحكم ونشر على المتاجر. استشارة مجانية.',
    },
    intro: {
      en: [
        'Brandraize is an app development company in Saudi Arabia that takes your idea all the way to the App Store and Google Play. We design, build, test and publish iPhone and Android apps for startups and established businesses.',
        'Every app ships with a native-feeling Arabic right-to-left interface, an English version, and an admin dashboard so your team can manage content, orders and users without calling a developer.',
      ],
      ar: [
        'براندرايز شركة برمجة تطبيقات في السعودية تنقل فكرتك حتى App Store و Google Play. نصمّم ونطوّر ونختبر وننشر تطبيقات الآيفون والأندرويد للشركات الناشئة والقائمة.',
        'كل تطبيق يأتي بواجهة عربية طبيعية من اليمين لليسار ونسخة إنجليزية، مع لوحة تحكم تمكّن فريقك من إدارة المحتوى والطلبات والمستخدمين دون الحاجة إلى مبرمج.',
      ],
    },
    projects: [],
    faqs: {
      en: [
        {
          q: 'How much does it cost to build an app in Saudi Arabia?',
          a: 'The cost depends on the screens, features, and integrations your app needs. We scope it with you in a free consultation and send a clear, fixed proposal.',
        },
        {
          q: 'Do you build apps for both iPhone and Android?',
          a: 'Yes. We build for iOS and Android, natively or cross-platform with React Native or Flutter, depending on your goals and budget.',
        },
        {
          q: 'Do you publish the app to the App Store and Google Play?',
          a: 'Yes. We handle store listings, review requirements, and publishing, and we support the app after launch.',
        },
      ],
      ar: [
        {
          q: 'كم تكلفة برمجة تطبيق في السعودية؟',
          a: 'تعتمد التكلفة على عدد الشاشات والمزايا والتكاملات التي يحتاجها التطبيق. نحدد النطاق معك في استشارة مجانية ونرسل عرضاً واضحاً وثابتاً.',
        },
        {
          q: 'هل تطورون تطبيقات للآيفون والأندرويد معاً؟',
          a: 'نعم. نطوّر لـ iOS و Android بشكل أصلي أو متعدد المنصات باستخدام React Native أو Flutter بحسب أهدافك وميزانيتك.',
        },
        {
          q: 'هل تنشرون التطبيق على App Store و Google Play؟',
          a: 'نعم. نتولى صفحات المتجر ومتطلبات المراجعة والنشر، ونقدم الدعم بعد الإطلاق.',
        },
      ],
    },
  },
  'e-commerce-solutions': {
    title: {
      en: 'E-Commerce Website Development in Saudi Arabia | Online Store Design',
      ar: 'تصميم متجر إلكتروني في جدة والسعودية | برمجة متاجر إلكترونية',
    },
    h1: {
      en: 'E-Commerce Website & Online Store Development in Saudi Arabia',
      ar: 'تصميم وبرمجة متاجر إلكترونية في السعودية',
    },
    description: {
      en: 'Online store design in Jeddah and Riyadh with Mada, Apple Pay and card payments, inventory, shipping and Arabic checkout. Start selling online. Free consultation.',
      ar: 'تصميم متجر إلكتروني في جدة والرياض مع الدفع بمدى وApple Pay والبطاقات، وإدارة المخزون والشحن وتجربة شراء عربية. ابدأ البيع أونلاين.',
    },
    intro: {
      en: [
        'Brandraize designs and builds e-commerce websites for retailers and brands across Saudi Arabia. Your store is ready to take orders with secure local payments such as Mada, Apple Pay and credit cards.',
        'We set up products, inventory, shipping and order notifications, and design a checkout your customers can finish in a few taps — in Arabic and English.',
      ],
      ar: [
        'براندرايز تصمّم وتبرمج المتاجر الإلكترونية للمتاجر والعلامات التجارية في جميع أنحاء المملكة. متجرك جاهز لاستقبال الطلبات بمدفوعات محلية آمنة مثل مدى وApple Pay والبطاقات الائتمانية.',
        'نجهّز المنتجات والمخزون والشحن وإشعارات الطلبات، ونصمّم تجربة شراء ينهيها عميلك في خطوات قليلة — بالعربية والإنجليزية.',
      ],
    },
    projects: ['labnor', 'adeena-perfume', 'kpk-collection'],
    faqs: {
      en: [
        {
          q: 'Which payment methods can my online store accept?',
          a: 'We integrate Saudi payment gateways that support Mada, Apple Pay, Visa, Mastercard and STC Pay, plus cash on delivery if you need it.',
        },
        {
          q: 'Can I manage products and orders myself?',
          a: 'Yes. You get an easy dashboard to add products, update stock and prices, and follow orders.',
        },
        {
          q: 'How long does it take to launch an online store?',
          a: 'A typical store launches in three to eight weeks depending on the catalogue size and integrations.',
        },
      ],
      ar: [
        {
          q: 'ما وسائل الدفع التي يقبلها متجري الإلكتروني؟',
          a: 'نربط بوابات دفع سعودية تدعم مدى وApple Pay وفيزا وماستركارد وSTC Pay، مع الدفع عند الاستلام إذا احتجت إليه.',
        },
        {
          q: 'هل يمكنني إدارة المنتجات والطلبات بنفسي؟',
          a: 'نعم. تحصل على لوحة تحكم سهلة لإضافة المنتجات وتحديث المخزون والأسعار ومتابعة الطلبات.',
        },
        {
          q: 'كم يستغرق إطلاق متجر إلكتروني؟',
          a: 'يُطلق المتجر عادة خلال ثلاثة إلى ثمانية أسابيع بحسب حجم المنتجات والتكاملات.',
        },
      ],
    },
  },
  'erp-solutions': {
    title: {
      en: 'ERP Software Company in Saudi Arabia | ERP System Jeddah',
      ar: 'نظام ERP في السعودية | شركة برمجة أنظمة تخطيط موارد المؤسسات في جدة',
    },
    h1: {
      en: 'ERP Software & System Implementation in Saudi Arabia',
      ar: 'تطوير وتنفيذ أنظمة ERP في السعودية',
    },
    description: {
      en: 'ERP systems for Saudi companies: sales, inventory, accounting, HR and reports in one place, with ZATCA e-invoicing readiness. Based in Jeddah. Free consultation.',
      ar: 'أنظمة ERP للشركات السعودية: المبيعات والمخزون والمحاسبة والموارد البشرية والتقارير في مكان واحد، مع جاهزية الفوترة الإلكترونية. مقرنا جدة.',
    },
    intro: {
      en: [
        'Brandraize implements ERP software for growing companies in Saudi Arabia. We replace scattered spreadsheets with one connected system for sales, purchasing, inventory, accounting and staff.',
        'Modules are matched to your departments, with Arabic and English interfaces, role-based permissions, manager dashboards, data migration and training for your team.',
      ],
      ar: [
        'براندرايز تنفّذ أنظمة ERP للشركات النامية في السعودية. نستبدل الجداول المتفرقة بنظام واحد مترابط للمبيعات والمشتريات والمخزون والحسابات والموظفين.',
        'وحدات النظام تناسب أقسام شركتك، بواجهات عربية وإنجليزية وصلاحيات حسب الأدوار ولوحات متابعة للإدارة، مع نقل البيانات وتدريب فريقك.',
      ],
    },
    projects: [],
    faqs: {
      en: [
        {
          q: 'Is your ERP ready for ZATCA e-invoicing?',
          a: 'Yes. We set up invoicing that follows the Saudi ZATCA (Fatoorah) e-invoicing requirements.',
        },
        {
          q: 'Can the ERP be customised for my business?',
          a: 'Yes. We start from your workflows and configure or build the modules your departments actually use.',
        },
        {
          q: 'Do you migrate our existing data?',
          a: 'Yes. We move your customers, products, stock and balances from spreadsheets or old systems, and train your staff.',
        },
      ],
      ar: [
        {
          q: 'هل نظام ERP جاهز للفوترة الإلكترونية؟',
          a: 'نعم. نجهّز الفوترة وفق متطلبات هيئة الزكاة والضريبة والجمارك (فاتورة).',
        },
        {
          q: 'هل يمكن تخصيص النظام لأعمالي؟',
          a: 'نعم. نبدأ من سير عملك ونهيّئ أو نبني الوحدات التي تستخدمها أقسامك فعلاً.',
        },
        {
          q: 'هل تنقلون بياناتنا الحالية؟',
          a: 'نعم. ننقل العملاء والمنتجات والمخزون والأرصدة من الجداول أو الأنظمة القديمة وندرّب موظفيك.',
        },
      ],
    },
  },
  'construction-management-system': {
    title: {
      en: 'Construction Management System in Saudi Arabia | Contracting Software',
      ar: 'نظام إدارة المقاولات في السعودية | برنامج إدارة مشاريع المقاولات',
    },
    h1: {
      en: 'Construction & Contracting Management System for Saudi Companies',
      ar: 'نظام إدارة المقاولات والمشاريع للشركات السعودية',
    },
    description: {
      en: 'Construction management software for Saudi contractors: project planning, budgets, subcontractors, documents and approvals across every site. Free demo.',
      ar: 'برنامج إدارة مقاولات للشركات السعودية: تخطيط المشاريع والميزانيات والمقاولين من الباطن والمستندات والاعتمادات لكل المواقع. عرض مجاني.',
    },
    intro: {
      en: [
        'Our construction management system helps contracting companies in Saudi Arabia plan projects, follow progress and control costs across all their sites from one screen.',
        'Track budgets against actual spend, keep subcontractor and supplier records, and move documents and approvals online — in Arabic and English.',
      ],
      ar: [
        'يساعد نظام إدارة المقاولات من براندرايز شركات المقاولات في السعودية على تخطيط المشاريع ومتابعة الإنجاز وضبط التكاليف في جميع المواقع من شاشة واحدة.',
        'تابع الميزانيات مقابل المصروف الفعلي، واحفظ سجلات المقاولين من الباطن والموردين، وانقل المستندات والاعتمادات إلى النظام — بالعربية والإنجليزية.',
      ],
    },
    projects: ['alpha-paver'],
    faqs: {
      en: [
        {
          q: 'Can I manage several construction projects at once?',
          a: 'Yes. The system is built for contractors running many projects and sites in parallel, with a combined view for management.',
        },
        {
          q: 'Does it work on mobile for site engineers?',
          a: 'Yes. Site teams can log progress, photos and requests from their phones.',
        },
      ],
      ar: [
        {
          q: 'هل يمكنني إدارة عدة مشاريع مقاولات في وقت واحد؟',
          a: 'نعم. النظام مصمم للمقاولين الذين يديرون مشاريع ومواقع متعددة بالتوازي، مع عرض موحّد للإدارة.',
        },
        {
          q: 'هل يعمل على الجوال لمهندسي المواقع؟',
          a: 'نعم. يمكن لفرق الموقع تسجيل الإنجاز والصور والطلبات من جوالاتهم.',
        },
      ],
    },
  },
  'property-management-system': {
    title: {
      en: 'Property Management System in Saudi Arabia | Real Estate Software',
      ar: 'نظام إدارة العقارات والأملاك في السعودية | برنامج إدارة عقارات',
    },
    h1: {
      en: 'Property & Real Estate Management System in Saudi Arabia',
      ar: 'نظام إدارة العقارات والأملاك في السعودية',
    },
    description: {
      en: 'Property management software for Saudi owners and real estate offices: units, tenants, contracts, rent collection, maintenance and reports. Free demo.',
      ar: 'برنامج إدارة أملاك للملاك والمكاتب العقارية في السعودية: الوحدات والمستأجرون والعقود وتحصيل الإيجارات والصيانة والتقارير. عرض مجاني.',
    },
    intro: {
      en: [
        'Our property management system gives real estate owners and offices in Saudi Arabia one place to run their portfolio: units, tenants, contracts and payments.',
        'Automate rent reminders, follow maintenance requests, and see income and occupancy reports at a glance.',
      ],
      ar: [
        'يمنح نظام إدارة العقارات من براندرايز الملاك والمكاتب العقارية في السعودية مكاناً واحداً لإدارة المحفظة: الوحدات والمستأجرين والعقود والمدفوعات.',
        'أتمت تذكيرات الإيجار، وتابع طلبات الصيانة، واطّلع على تقارير الدخل والإشغال بنظرة واحدة.',
      ],
    },
    projects: ['dkr', 'roaya', 'albayt-alatiq'],
    faqs: {
      en: [
        {
          q: 'Can tenants pay rent online?',
          a: 'Yes. Rent can be collected online with payment tracking and automatic reminders.',
        },
        {
          q: 'Is it suitable for small real estate offices?',
          a: 'Yes. It scales from a single building to a large portfolio.',
        },
      ],
      ar: [
        {
          q: 'هل يمكن للمستأجرين دفع الإيجار إلكترونياً؟',
          a: 'نعم. يمكن تحصيل الإيجار إلكترونياً مع متابعة المدفوعات وتذكيرات تلقائية.',
        },
        {
          q: 'هل يناسب المكاتب العقارية الصغيرة؟',
          a: 'نعم. يتوسع من مبنى واحد إلى محفظة عقارية كبيرة.',
        },
      ],
    },
  },
  'digital-marketing': {
    title: {
      en: 'Digital Marketing & SEO Agency in Jeddah, Saudi Arabia',
      ar: 'شركة تسويق رقمي في جدة | تحسين محركات البحث SEO وإدارة السوشيال ميديا',
    },
    h1: {
      en: 'Digital Marketing & SEO Agency in Jeddah, Saudi Arabia',
      ar: 'شركة تسويق رقمي وتحسين محركات البحث في جدة والسعودية',
    },
    description: {
      en: 'SEO services, Google Ads, Snapchat, TikTok & Instagram campaigns and social media management in Jeddah and Riyadh — measured by leads and sales.',
      ar: 'تحسين محركات البحث SEO، إعلانات Google وسناب شات وتيك توك وإنستغرام، وإدارة السوشيال ميديا في جدة والرياض — نقيسها بالعملاء والمبيعات.',
    },
    intro: {
      en: [
        'Brandraize is a digital marketing agency in Jeddah helping Saudi businesses get found and get contacted. We combine search engine optimisation (SEO), paid ads and social media into one plan.',
        'We run campaigns on Google, Snapchat, TikTok, Instagram and X — the platforms Saudi customers actually use — in Arabic and English, and report every month on leads and sales, not just clicks.',
      ],
      ar: [
        'براندرايز شركة تسويق رقمي في جدة تساعد الأعمال السعودية على الظهور وجذب العملاء. نجمع تحسين محركات البحث (SEO) والإعلانات المدفوعة ووسائل التواصل في خطة واحدة.',
        'ندير الحملات على Google وسناب شات وتيك توك وإنستغرام وX — المنصات التي يستخدمها العميل السعودي فعلاً — بالعربية والإنجليزية، ونرسل تقريراً شهرياً بالعملاء والمبيعات لا بالنقرات فقط.',
      ],
    },
    projects: ['taqr'],
    faqs: {
      en: [
        {
          q: 'How long does SEO take to show results?',
          a: 'Most businesses see movement in three to six months. Local searches such as "near me" or city-based terms can improve sooner with a well-run Google Business Profile.',
        },
        {
          q: 'Which social media platforms work best in Saudi Arabia?',
          a: 'Snapchat, TikTok, Instagram and X reach the most Saudi customers; the right mix depends on your audience and product.',
        },
        {
          q: 'Do you manage Google Ads campaigns?',
          a: 'Yes. We plan, launch and optimise Google Search and Performance Max campaigns with conversion tracking.',
        },
      ],
      ar: [
        {
          q: 'متى تظهر نتائج تحسين محركات البحث؟',
          a: 'تلاحظ معظم الأعمال تحسناً خلال ثلاثة إلى ستة أشهر، وقد تتحسن عمليات البحث المحلية مثل «بالقرب مني» أو باسم المدينة أسرع مع ملف Google Business مُدار جيداً.',
        },
        {
          q: 'ما أفضل منصات التواصل للتسويق في السعودية؟',
          a: 'سناب شات وتيك توك وإنستغرام وX تصل إلى أكبر عدد من العملاء في السعودية، والمزيج المناسب يعتمد على جمهورك ومنتجك.',
        },
        {
          q: 'هل تديرون حملات إعلانات Google؟',
          a: 'نعم. نخطط ونطلق ونحسّن حملات بحث Google و Performance Max مع تتبع التحويلات.',
        },
      ],
    },
  },
  'ui-ux-design': {
    title: {
      en: 'UI/UX Design & Branding Agency in Jeddah, Saudi Arabia',
      ar: 'تصميم هوية بصرية وشعارات في جدة | تصميم واجهات UI/UX',
    },
    h1: {
      en: 'UI/UX Design & Brand Identity Agency in Saudi Arabia',
      ar: 'تصميم الهوية البصرية وواجهات المستخدم UI/UX في السعودية',
    },
    description: {
      en: 'Logo design, brand identity and UI/UX design for websites and apps in Jeddah and Riyadh — Arabic-first, professional and easy to use. Free consultation.',
      ar: 'تصميم شعارات وهوية بصرية وتصميم واجهات UI/UX للمواقع والتطبيقات في جدة والرياض — بتصميم عربي احترافي وسهل الاستخدام.',
    },
    intro: {
      en: [
        'Brandraize designs brand identities and digital products for Saudi companies: logos, colours, typography, and the screens of your website or app.',
        'Our designers work Arabic-first, so your brand looks right in both directions and your customers understand your product immediately.',
      ],
      ar: [
        'براندرايز تصمّم الهويات البصرية والمنتجات الرقمية للشركات السعودية: الشعار والألوان والخطوط وشاشات موقعك أو تطبيقك.',
        'يعمل مصممونا بالعربية أولاً، لتبدو علامتك صحيحة في الاتجاهين ويفهم عملاؤك منتجك فوراً.',
      ],
    },
    projects: ['mr-quraysh', 'algedra'],
    faqs: {
      en: [
        {
          q: 'What is included in a brand identity package?',
          a: 'Logo, colour palette, typography, and usage guidelines, plus social media and stationery templates on request.',
        },
        {
          q: 'Do you design Arabic logos?',
          a: 'Yes. We design Arabic, English and bilingual logos that work together.',
        },
      ],
      ar: [
        {
          q: 'ماذا تشمل باقة الهوية البصرية؟',
          a: 'الشعار ولوحة الألوان والخطوط ودليل الاستخدام، مع قوالب السوشيال ميديا والمطبوعات عند الطلب.',
        },
        {
          q: 'هل تصممون شعارات عربية؟',
          a: 'نعم. نصمّم شعارات عربية وإنجليزية وثنائية اللغة متناسقة معاً.',
        },
      ],
    },
  },
  'motion-graphic': {
    title: {
      en: 'Motion Graphics & Video Production in Jeddah, Saudi Arabia',
      ar: 'تصميم موشن جرافيك في جدة والسعودية | إنتاج فيديو إعلاني',
    },
    h1: {
      en: 'Motion Graphics & Promotional Video Production in Saudi Arabia',
      ar: 'تصميم موشن جرافيك وإنتاج فيديوهات إعلانية في السعودية',
    },
    description: {
      en: 'Motion graphic and promotional videos for ads, Snapchat, TikTok and websites — script, animation and Arabic voice-over. Based in Jeddah.',
      ar: 'فيديوهات موشن جرافيك وإعلانية لسناب شات وتيك توك والمواقع — النص والتحريك والتعليق الصوتي العربي. مقرنا جدة.',
    },
    intro: {
      en: [
        'We produce motion graphics and promotional videos that explain your product in seconds — for ads, social media and your website.',
        'From script and storyboard to animation, Arabic and English voice-over and captions, delivered in every size each platform needs.',
      ],
      ar: [
        'ننتج فيديوهات موشن جرافيك وإعلانية تشرح منتجك في ثوانٍ — للإعلانات ووسائل التواصل وموقعك.',
        'من النص والستوري بورد إلى التحريك والتعليق الصوتي والترجمة بالعربية والإنجليزية، بكل المقاسات التي تحتاجها كل منصة.',
      ],
    },
    projects: [],
    faqs: {
      en: [
        {
          q: 'How long is a typical motion graphic video?',
          a: 'Most ad and explainer videos are 15 to 90 seconds; we recommend the length based on the platform.',
        },
      ],
      ar: [
        {
          q: 'ما المدة المعتادة لفيديو الموشن جرافيك؟',
          a: 'معظم الفيديوهات الإعلانية والتوضيحية بين 15 و 90 ثانية، ونقترح المدة المناسبة حسب المنصة.',
        },
      ],
    },
  },
  'it-solutions': {
    title: {
      en: 'IT Solutions & Consulting Company in Jeddah, Saudi Arabia',
      ar: 'شركة حلول تقنية المعلومات في جدة | استشارات ودعم فني',
    },
    h1: {
      en: 'IT Solutions, Consulting & Support in Jeddah, Saudi Arabia',
      ar: 'حلول واستشارات ودعم تقنية المعلومات في جدة والسعودية',
    },
    description: {
      en: 'IT consulting, infrastructure setup, cybersecurity, backups and ongoing technical support for Saudi businesses, aligned with Vision 2030.',
      ar: 'استشارات تقنية المعلومات وتجهيز البنية التحتية والأمن السيبراني والنسخ الاحتياطي والدعم الفني المستمر للشركات السعودية، بما يتوافق مع رؤية 2030.',
    },
    intro: {
      en: [
        'Brandraize provides IT solutions and consulting for companies in Jeddah and across Saudi Arabia that need reliable technology without building a large in-house team.',
        'We assess your setup, plan a roadmap, put infrastructure, security and backups in place, and stay on call for technical support.',
      ],
      ar: [
        'براندرايز تقدّم حلول واستشارات تقنية المعلومات للشركات في جدة وجميع أنحاء المملكة التي تحتاج تقنية موثوقة دون بناء فريق داخلي كبير.',
        'نقيّم وضعك الحالي، ونضع خارطة طريق، ونجهّز البنية التحتية والحماية والنسخ الاحتياطي، ونبقى متاحين للدعم الفني.',
      ],
    },
    projects: ['next-future-tech', 'jh-it-zone', 'api-security-hardening'],
    faqs: {
      en: [
        {
          q: 'Do you offer monthly IT support contracts?',
          a: 'Yes. We offer support packages with clear response times for businesses in Saudi Arabia.',
        },
      ],
      ar: [
        {
          q: 'هل تقدمون عقود دعم فني شهرية؟',
          a: 'نعم. نقدم باقات دعم بأوقات استجابة واضحة للشركات في السعودية.',
        },
      ],
    },
  },
  'other-tech-services': {
    title: {
      en: 'Cloud, API Integration & AI Automation Services in Saudi Arabia',
      ar: 'خدمات السحابة والتكامل والأتمتة بالذكاء الاصطناعي في السعودية',
    },
    h1: {
      en: 'Cloud, Integrations & AI Automation for Saudi Businesses',
      ar: 'السحابة والتكاملات والأتمتة بالذكاء الاصطناعي للشركات السعودية',
    },
    description: {
      en: 'Cloud hosting and migration, API integrations between your tools, AI chatbots and automation for companies in Saudi Arabia. Free consultation.',
      ar: 'الاستضافة والترحيل السحابي، وتكامل الأنظمة عبر API، وروبوتات المحادثة والأتمتة بالذكاء الاصطناعي للشركات في السعودية.',
    },
    intro: {
      en: [
        'We connect the tools your business already uses, move systems to the cloud safely, and add AI and automation where they save real time.',
        'From payment and shipping integrations to AI assistants in Arabic, we build what removes manual work from your team.',
      ],
      ar: [
        'نربط الأدوات التي تستخدمها أعمالك، وننقل الأنظمة إلى السحابة بأمان، ونضيف الذكاء الاصطناعي والأتمتة حيث توفّر وقتاً حقيقياً.',
        'من تكاملات الدفع والشحن إلى المساعدات الذكية بالعربية، نبني ما يزيل العمل اليدوي عن فريقك.',
      ],
    },
    projects: ['ai-contract-qa-bot', 'api-security-hardening'],
    faqs: {
      en: [
        {
          q: 'Can you build an Arabic AI chatbot for my business?',
          a: 'Yes. We build AI assistants that answer customers in Arabic and English from your own content.',
        },
      ],
      ar: [
        {
          q: 'هل يمكنكم بناء روبوت محادثة ذكي بالعربية لأعمالي؟',
          a: 'نعم. نبني مساعدات ذكية تجيب عملاءك بالعربية والإنجليزية من محتواك الخاص.',
        },
      ],
    },
  },
};
