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
  // Used in the project's address: /projects/<id>.
  id: string;
  image: string;
  width: number;
  height: number;
  title: Text;
  category: Text;
  summary: Text;
};

// The built-in example project, shown until projects are added in /admin → Projects.
export const work: WorkItem[] = [
  {
    id: 'albayt-alatiq',
    image: '/images/work-albayt-alatiq.webp',
    width: 961,
    height: 961,
    title: { en: 'Al Bayt Al Atiq Real Estate', ar: 'البيت العتيق العقارية' },
    category: { en: 'Real estate website', ar: 'موقع عقاري' },
    summary: {
      en: 'An Arabic-first real estate website for browsing properties for sale, rent, and investment — designed to work on desktop, tablet, and phone.',
      ar: 'موقع عقاري عربي لتصفح عروض البيع والإيجار والاستثمار — مصمم ليعمل على الحاسب والجهاز اللوحي والجوال.',
    },
  },
];
