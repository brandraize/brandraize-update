import type { LucideIcon } from 'lucide-react';
import {
  Blocks,
  Building2,
  ChartNoAxesCombined,
  Globe,
  LayoutDashboard,
  Palette,
  PlaySquare,
  ShoppingCart,
  Smartphone,
  Workflow,
  Wrench,
} from 'lucide-react';
import type { Locale } from './site';

type Text = Record<Locale, string>;

export type Service = {
  slug: string;
  icon: LucideIcon;
  name: Text;
  // One plain sentence: what the customer ends up with.
  tagline: Text;
  description: Text;
  bestFor: Text;
  includes: Record<Locale, string[]>;
};

export type ServiceGroup = {
  id: string;
  title: Text;
  summary: Text;
  services: Service[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    id: 'build',
    title: { en: 'Build', ar: 'نبني' },
    summary: {
      en: 'Websites, apps, and business systems made for your company.',
      ar: 'مواقع وتطبيقات وأنظمة أعمال مصممة لشركتك.',
    },
    services: [
      {
        slug: 'web-development',
        icon: Globe,
        name: { en: 'Web Design & Development', ar: 'تصميم وتطوير المواقع' },
        tagline: {
          en: 'A fast, modern website that turns visitors into enquiries.',
          ar: 'موقع سريع وعصري يحوّل الزوار إلى طلبات.',
        },
        description: {
          en: 'We design and build your company website or web platform from scratch — in Arabic and English, easy to update, and ready for search engines and ads.',
          ar: 'نصمّم ونطوّر موقع شركتك أو منصتك من الصفر — بالعربية والإنجليزية، سهل التحديث، وجاهز لمحركات البحث والإعلانات.',
        },
        bestFor: {
          en: 'Companies that need a new website or want to replace an outdated one.',
          ar: 'الشركات التي تحتاج موقعاً جديداً أو تريد استبدال موقع قديم.',
        },
        includes: {
          en: [
            'Custom design that matches your brand',
            'Arabic and English, mobile-first pages',
            'Contact forms and WhatsApp built in',
            'Search-engine-friendly structure and speed',
          ],
          ar: [
            'تصميم خاص يعكس هوية علامتك',
            'صفحات عربية وإنجليزية تبدأ من الجوال',
            'نماذج تواصل وواتساب مدمجة',
            'بنية وسرعة صديقة لمحركات البحث',
          ],
        },
      },
      {
        slug: 'mobile-apps',
        icon: Smartphone,
        name: { en: 'Mobile App Development', ar: 'تطوير تطبيقات الجوال' },
        tagline: {
          en: 'Your idea as an app on iPhone and Android.',
          ar: 'فكرتك تطبيقاً على الآيفون والأندرويد.',
        },
        description: {
          en: 'We take your app from idea to the App Store and Google Play: design, development, testing, and publishing, with an admin panel to manage it.',
          ar: 'ننقل تطبيقك من الفكرة إلى App Store و Google Play: التصميم والتطوير والاختبار والنشر، مع لوحة تحكم لإدارته.',
        },
        bestFor: {
          en: 'Startups launching a product and businesses that want customers to order or book from their phone.',
          ar: 'الشركات الناشئة التي تطلق منتجاً، والأعمال التي تريد أن يطلب أو يحجز عملاؤها من الجوال.',
        },
        includes: {
          en: [
            'iOS and Android apps',
            'Arabic right-to-left interface',
            'Admin dashboard to manage content and users',
            'Publishing to the app stores',
          ],
          ar: [
            'تطبيقات iOS و Android',
            'واجهة عربية من اليمين لليسار',
            'لوحة تحكم لإدارة المحتوى والمستخدمين',
            'النشر على متاجر التطبيقات',
          ],
        },
      },
      {
        slug: 'e-commerce-solutions',
        icon: ShoppingCart,
        name: { en: 'E-Commerce Solutions', ar: 'حلول التجارة الإلكترونية' },
        tagline: {
          en: 'An online store that is ready to take orders and payments.',
          ar: 'متجر إلكتروني جاهز لاستقبال الطلبات والمدفوعات.',
        },
        description: {
          en: 'We build online stores with secure payments, product and inventory management, and a checkout your customers can finish in a few taps.',
          ar: 'نبني متاجر إلكترونية بمدفوعات آمنة وإدارة للمنتجات والمخزون وتجربة شراء ينهيها عميلك في خطوات قليلة.',
        },
        bestFor: {
          en: 'Retailers and brands that want to sell online in Saudi Arabia.',
          ar: 'المتاجر والعلامات التجارية التي تريد البيع عبر الإنترنت في السعودية.',
        },
        includes: {
          en: [
            'Store design and product catalogue',
            'Secure payment gateway integration',
            'Inventory and order management',
            'Shipping and notification setup',
          ],
          ar: [
            'تصميم المتجر وكتالوج المنتجات',
            'ربط آمن ببوابات الدفع',
            'إدارة المخزون والطلبات',
            'إعداد الشحن والإشعارات',
          ],
        },
      },
      {
        slug: 'erp-solutions',
        icon: Workflow,
        name: { en: 'ERP Solutions', ar: 'حلول ERP' },
        tagline: {
          en: 'One system to run sales, stock, accounts, and staff.',
          ar: 'نظام واحد لإدارة المبيعات والمخزون والحسابات والموظفين.',
        },
        description: {
          en: 'We set up enterprise resource planning systems that replace scattered spreadsheets with one connected place for your daily operations.',
          ar: 'ننفّذ أنظمة تخطيط موارد المؤسسات التي تستبدل الجداول المتفرقة بمكان واحد مترابط لعملياتك اليومية.',
        },
        bestFor: {
          en: 'Growing companies whose operations have outgrown spreadsheets.',
          ar: 'الشركات النامية التي تجاوزت عملياتها حدود الجداول.',
        },
        includes: {
          en: [
            'Modules matched to your departments',
            'Reports and dashboards for managers',
            'Roles and permissions for your team',
            'Data migration and staff training',
          ],
          ar: [
            'وحدات تناسب أقسام شركتك',
            'تقارير ولوحات متابعة للإدارة',
            'أدوار وصلاحيات لفريقك',
            'نقل البيانات وتدريب الموظفين',
          ],
        },
      },
      {
        slug: 'construction-management-system',
        icon: Building2,
        name: { en: 'Construction Management System', ar: 'نظام إدارة المقاولات' },
        tagline: {
          en: 'Keep every project, cost, and contractor in one view.',
          ar: 'كل مشروع وتكلفة ومقاول في شاشة واحدة.',
        },
        description: {
          en: 'An integrated system for contracting companies to plan projects, follow progress, and control budgets across sites.',
          ar: 'نظام متكامل لشركات المقاولات لتخطيط المشاريع ومتابعة الإنجاز وضبط الميزانيات في جميع المواقع.',
        },
        bestFor: {
          en: 'Contractors and developers managing several projects at once.',
          ar: 'المقاولون والمطورون الذين يديرون عدة مشاريع في وقت واحد.',
        },
        includes: {
          en: [
            'Project planning and progress tracking',
            'Budget and cost control',
            'Subcontractor and supplier records',
            'Documents and approvals in one place',
          ],
          ar: [
            'تخطيط المشاريع ومتابعة الإنجاز',
            'ضبط الميزانيات والتكاليف',
            'سجلات المقاولين والموردين',
            'المستندات والاعتمادات في مكان واحد',
          ],
        },
      },
      {
        slug: 'property-management-system',
        icon: LayoutDashboard,
        name: { en: 'Property Management System', ar: 'نظام إدارة العقارات' },
        tagline: {
          en: 'Manage units, tenants, and rent without the paperwork.',
          ar: 'أدر الوحدات والمستأجرين والإيجارات بلا أوراق.',
        },
        description: {
          en: 'A smart system for real-estate owners and managers to follow their portfolio, contracts, payments, and maintenance.',
          ar: 'نظام ذكي لملاك ومديري العقارات لمتابعة المحفظة والعقود والمدفوعات والصيانة.',
        },
        bestFor: {
          en: 'Property owners and real-estate offices with a portfolio to run.',
          ar: 'ملاك العقارات والمكاتب العقارية التي تدير محفظة عقارية.',
        },
        includes: {
          en: [
            'Units, tenants, and contracts',
            'Rent collection and payment tracking',
            'Maintenance requests',
            'Income and occupancy reports',
          ],
          ar: [
            'الوحدات والمستأجرون والعقود',
            'تحصيل الإيجارات ومتابعة المدفوعات',
            'طلبات الصيانة',
            'تقارير الدخل والإشغال',
          ],
        },
      },
    ],
  },
  {
    id: 'grow',
    title: { en: 'Grow', ar: 'ننمّي' },
    summary: {
      en: 'Marketing and design that bring you customers.',
      ar: 'تسويق وتصميم يجلبان لك العملاء.',
    },
    services: [
      {
        slug: 'digital-marketing',
        icon: ChartNoAxesCombined,
        name: { en: 'Digital Marketing', ar: 'التسويق الرقمي' },
        tagline: {
          en: 'More of the right people finding and contacting you.',
          ar: 'عملاء مناسبون أكثر يجدونك ويتواصلون معك.',
        },
        description: {
          en: 'We plan and run your online marketing: search engine optimisation, social media, paid campaigns, and content — measured against leads and sales, not just clicks.',
          ar: 'نخطط وندير تسويقك الرقمي: تحسين محركات البحث، وسائل التواصل، الحملات المدفوعة، والمحتوى — ونقيسه بالعملاء والمبيعات لا بالنقرات فقط.',
        },
        bestFor: {
          en: 'Businesses that want a steady flow of enquiries from Google and social media.',
          ar: 'الأعمال التي تريد تدفقاً مستمراً من الطلبات عبر Google ووسائل التواصل.',
        },
        includes: {
          en: [
            'Search engine optimisation (SEO)',
            'Google and social media ad campaigns',
            'Social media management and content',
            'Clear monthly performance reports',
          ],
          ar: [
            'تحسين محركات البحث (SEO)',
            'حملات إعلانية على Google ووسائل التواصل',
            'إدارة حسابات التواصل وصناعة المحتوى',
            'تقارير أداء شهرية واضحة',
          ],
        },
      },
      {
        slug: 'ui-ux-design',
        icon: Palette,
        name: { en: 'UI/UX & Brand Design', ar: 'تصميم UI/UX والهوية' },
        tagline: {
          en: 'A product that looks professional and is easy to use.',
          ar: 'منتج بمظهر احترافي وسهل الاستخدام.',
        },
        description: {
          en: 'We design the screens, flows, and visual identity of your website or app so customers understand it immediately and trust your brand.',
          ar: 'نصمّم شاشات موقعك أو تطبيقك ومساراته وهويته البصرية ليفهمه العملاء فوراً ويثقوا بعلامتك.',
        },
        bestFor: {
          en: 'Teams starting a new product or refreshing a dated one.',
          ar: 'الفرق التي تبدأ منتجاً جديداً أو تجدّد منتجاً قديماً.',
        },
        includes: {
          en: [
            'User flows and wireframes',
            'High-fidelity screen designs',
            'Logo and visual identity',
            'A design system developers can build from',
          ],
          ar: [
            'مسارات المستخدم والمخططات الأولية',
            'تصاميم شاشات عالية الدقة',
            'الشعار والهوية البصرية',
            'نظام تصميم جاهز للمطورين',
          ],
        },
      },
      {
        slug: 'motion-graphic',
        icon: PlaySquare,
        name: { en: 'Motion Graphics & Video', ar: 'الموشن جرافيك والفيديو' },
        tagline: {
          en: 'Short videos that explain what you do in seconds.',
          ar: 'فيديوهات قصيرة تشرح ما تقدمه في ثوانٍ.',
        },
        description: {
          en: 'We produce motion graphic and promotional videos for your ads, social media, and website — from script to final cut.',
          ar: 'ننتج فيديوهات موشن جرافيك وترويجية لإعلاناتك وحساباتك وموقعك — من النص حتى النسخة النهائية.',
        },
        bestFor: {
          en: 'Brands launching a product, campaign, or new service.',
          ar: 'العلامات التي تطلق منتجاً أو حملة أو خدمة جديدة.',
        },
        includes: {
          en: [
            'Script and storyboard',
            'Animation and editing',
            'Arabic and English voice-over and captions',
            'Sizes ready for every platform',
          ],
          ar: [
            'النص والستوري بورد',
            'التحريك والمونتاج',
            'تعليق صوتي وترجمة بالعربية والإنجليزية',
            'مقاسات جاهزة لكل منصة',
          ],
        },
      },
    ],
  },
  {
    id: 'run',
    title: { en: 'Run', ar: 'نشغّل' },
    summary: {
      en: 'The IT, cloud, and support that keep you running.',
      ar: 'تقنية المعلومات والسحابة والدعم لتستمر أعمالك.',
    },
    services: [
      {
        slug: 'it-solutions',
        icon: Wrench,
        name: { en: 'IT Solutions & Consulting', ar: 'حلول واستشارات تقنية المعلومات' },
        tagline: {
          en: 'Reliable technology, with someone to call when you need help.',
          ar: 'تقنية موثوقة، ومن تتصل به عند الحاجة.',
        },
        description: {
          en: 'We advise on, set up, and support the IT infrastructure your business depends on, aligned with Saudi Vision 2030.',
          ar: 'نقدّم الاستشارة والتنفيذ والدعم للبنية التقنية التي تعتمد عليها أعمالك، بما يتوافق مع رؤية 2030.',
        },
        bestFor: {
          en: 'Companies without an in-house IT team, or with one that needs backup.',
          ar: 'الشركات التي لا تملك فريقاً تقنياً داخلياً أو يحتاج فريقها إلى دعم.',
        },
        includes: {
          en: [
            'IT assessment and roadmap',
            'Infrastructure setup',
            'Security and backups',
            'Ongoing technical support',
          ],
          ar: [
            'تقييم تقني وخارطة طريق',
            'تجهيز البنية التحتية',
            'الحماية والنسخ الاحتياطي',
            'دعم فني مستمر',
          ],
        },
      },
      {
        slug: 'other-tech-services',
        icon: Blocks,
        name: { en: 'Cloud, Integrations & More', ar: 'السحابة والتكاملات وأكثر' },
        tagline: {
          en: 'Connect your systems and move to the cloud safely.',
          ar: 'اربط أنظمتك وانتقل إلى السحابة بأمان.',
        },
        description: {
          en: 'Scalable cloud infrastructure, integrations between your tools, and migration of existing systems — plus AI and automation where they save real time.',
          ar: 'بنية سحابية قابلة للتوسع، وتكاملات بين أدواتك، وترحيل للأنظمة القائمة — مع الذكاء الاصطناعي والأتمتة حيث توفّر وقتاً حقيقياً.',
        },
        bestFor: {
          en: 'Businesses with tools that do not talk to each other.',
          ar: 'الأعمال التي لا تتواصل أدواتها مع بعضها.',
        },
        includes: {
          en: [
            'Cloud hosting and migration',
            'API and third-party integrations',
            'AI features and automation',
            'Maintenance of existing systems',
          ],
          ar: [
            'الاستضافة السحابية والترحيل',
            'تكاملات API والخدمات الخارجية',
            'ميزات الذكاء الاصطناعي والأتمتة',
            'صيانة الأنظمة القائمة',
          ],
        },
      },
    ],
  },
];

export const serviceFaqs: Record<Locale, Array<{ q: string; a: string }>> = {
  en: [
    {
      q: 'Do you develop cross-platform iOS and Android apps?',
      a: 'Yes. We build both native and cross-platform applications based on your product goals, budget, and performance requirements.',
    },
    {
      q: 'How long does it take to develop a website?',
      a: 'Timelines depend on scope, integrations, and approval cycles, but most business websites are delivered in phased milestones with a clear roadmap from discovery to launch.',
    },
    {
      q: 'Do you provide post-launch support?',
      a: 'Yes. We offer maintenance, optimization, enhancements, and operational support after launch to keep your platform reliable and secure.',
    },
    {
      q: 'Can you help with SEO and marketing?',
      a: 'Yes. Our team supports SEO, paid campaigns, content planning, analytics, and broader digital marketing strategy aligned with business KPIs.',
    },
    {
      q: 'What technologies do you specialize in?',
      a: 'We work across modern web, mobile, cloud, and automation stacks including React, Next.js, Node.js, Python, React Native, Flutter, AWS, MongoDB, and TypeScript.',
    },
    {
      q: 'Do you offer custom pricing?',
      a: 'Yes. We scope each engagement based on business goals, complexity, integrations, and support requirements, then prepare a tailored commercial proposal.',
    },
  ],
  ar: [
    {
      q: 'هل تطورون تطبيقات تعمل على iOS و Android؟',
      a: 'نعم. نطوّر تطبيقات أصلية أو متعددة المنصات بحسب أهداف المنتج والميزانية ومتطلبات الأداء.',
    },
    {
      q: 'كم يستغرق تطوير موقع إلكتروني؟',
      a: 'تعتمد المدة على نطاق العمل والتكاملات ودورات الاعتماد، لكننا نعمل دائماً وفق مراحل واضحة من الاكتشاف وحتى الإطلاق.',
    },
    {
      q: 'هل توفرون دعماً بعد الإطلاق؟',
      a: 'نعم. نقدم الصيانة والتحسينات والتطوير المستمر والدعم التشغيلي للحفاظ على استقرار المنصة وأمانها.',
    },
    {
      q: 'هل يمكنكم المساعدة في SEO والتسويق؟',
      a: 'نعم. ندعم تحسين محركات البحث والحملات المدفوعة وصناعة المحتوى والتحليلات واستراتيجية التسويق الرقمي بشكل متكامل.',
    },
    {
      q: 'ما التقنيات التي تتخصصون بها؟',
      a: 'نعمل على تقنيات الويب والجوال والسحابة والأتمتة مثل React و Next.js و Node.js و Python و React Native و Flutter و AWS و MongoDB و TypeScript.',
    },
    {
      q: 'هل تقدمون تسعيراً مخصصاً؟',
      a: 'نعم. نقوم بتسعير كل مشروع بناءً على الأهداف التجارية والتعقيد والتكاملات ومتطلبات الدعم، ثم نقدم عرضاً مناسباً.',
    },
  ],
};
