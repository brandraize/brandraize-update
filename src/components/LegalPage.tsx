import PageHero from '@/components/PageHero';
import { site, type Locale } from '@/lib/site';

type Doc = {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: Array<{ heading: string; body: string[] }>;
};

const company = { en: 'Brandraize Information Technology', ar: 'براندرايز لتقنية المعلومات' };

export const legal: Record<'privacy' | 'terms', Record<Locale, Doc>> = {
  privacy: {
    en: {
      eyebrow: 'Legal',
      title: 'Privacy Policy',
      updated: 'Last updated: October 2026',
      intro: `This policy explains how ${company.en} ("Brandraize", "we") collects and uses personal information when you visit ${site.url.replace('https://', '')} or contact us.`,
      sections: [
        {
          heading: 'Information we collect',
          body: [
            'Details you give us: your name, phone number, email address, company name, and anything you write in a contact form, email, phone call, or WhatsApp message.',
            'Details collected automatically: pages visited, approximate location, device and browser type, and the ad or link that brought you to the site. This is collected through cookies and similar technologies.',
          ],
        },
        {
          heading: 'How we use it',
          body: [
            'To reply to your enquiry, prepare a consultation or quote, and deliver the services you request.',
            'To understand how the site is used and to measure and improve our advertising.',
            'We do not sell your personal information.',
          ],
        },
        {
          heading: 'Cookies and advertising',
          body: [
            'We may use analytics and advertising tools such as Google Analytics, Google Ads, and the Meta Pixel. These tools set cookies to measure visits and conversions and may show you Brandraize ads on other websites and apps.',
            'You can block or delete cookies in your browser settings, and manage ad personalisation in your Google and Meta account settings.',
          ],
        },
        {
          heading: 'Sharing',
          body: [
            'We share information only with service providers that help us run the site and our communications (for example hosting, email, analytics, and advertising platforms), and when the law requires it.',
          ],
        },
        {
          heading: 'Retention and security',
          body: [
            'We keep enquiry details for as long as needed to respond and to manage our relationship with you, and we apply reasonable technical and organisational measures to protect them.',
          ],
        },
        {
          heading: 'Your rights',
          body: [
            "You may ask to access, correct, or delete your personal information, or withdraw consent to marketing, in line with Saudi Arabia's Personal Data Protection Law.",
            `To make a request, email ${site.email}.`,
          ],
        },
        {
          heading: 'Contact',
          body: [`${company.en}, ${site.address.en}. Email: ${site.email}. Phone: ${site.phoneDisplay}.`],
        },
      ],
    },
    ar: {
      eyebrow: 'قانوني',
      title: 'سياسة الخصوصية',
      updated: 'آخر تحديث: أكتوبر 2026',
      intro: `توضح هذه السياسة كيف تجمع ${company.ar} ("براندرايز"، "نحن") المعلومات الشخصية وتستخدمها عند زيارتك للموقع أو تواصلك معنا.`,
      sections: [
        {
          heading: 'المعلومات التي نجمعها',
          body: [
            'بيانات تقدمها لنا: الاسم، رقم الجوال، البريد الإلكتروني، اسم الشركة، وكل ما تكتبه في نموذج التواصل أو البريد أو المكالمات أو رسائل واتساب.',
            'بيانات تُجمع تلقائياً: الصفحات التي تزورها، الموقع التقريبي، نوع الجهاز والمتصفح، والإعلان أو الرابط الذي أوصلك إلى الموقع، وذلك عبر ملفات تعريف الارتباط وتقنيات مشابهة.',
          ],
        },
        {
          heading: 'كيف نستخدمها',
          body: [
            'للرد على استفسارك، وإعداد الاستشارة أو عرض السعر، وتقديم الخدمات التي تطلبها.',
            'لفهم طريقة استخدام الموقع وقياس إعلاناتنا وتحسينها.',
            'نحن لا نبيع معلوماتك الشخصية.',
          ],
        },
        {
          heading: 'ملفات تعريف الارتباط والإعلانات',
          body: [
            'قد نستخدم أدوات تحليل وإعلان مثل Google Analytics و Google Ads و Meta Pixel. تضع هذه الأدوات ملفات تعريف ارتباط لقياس الزيارات والتحويلات، وقد تعرض لك إعلانات براندرايز على مواقع وتطبيقات أخرى.',
            'يمكنك حظر ملفات تعريف الارتباط أو حذفها من إعدادات المتصفح، وإدارة تخصيص الإعلانات من إعدادات حسابك في Google و Meta.',
          ],
        },
        {
          heading: 'مشاركة المعلومات',
          body: [
            'نشارك المعلومات فقط مع مزودي الخدمات الذين يساعدوننا في تشغيل الموقع والتواصل (مثل الاستضافة والبريد الإلكتروني ومنصات التحليل والإعلان)، وعندما يتطلب النظام ذلك.',
          ],
        },
        {
          heading: 'الاحتفاظ والحماية',
          body: [
            'نحتفظ ببيانات الاستفسارات للمدة اللازمة للرد وإدارة علاقتنا معك، ونطبق تدابير تقنية وتنظيمية معقولة لحمايتها.',
          ],
        },
        {
          heading: 'حقوقك',
          body: [
            'يحق لك طلب الاطلاع على بياناتك الشخصية أو تصحيحها أو حذفها، أو سحب موافقتك على التسويق، وفق نظام حماية البيانات الشخصية في المملكة العربية السعودية.',
            `لتقديم طلب، راسلنا على ${site.email}.`,
          ],
        },
        {
          heading: 'التواصل',
          body: [`${company.ar}، ${site.address.ar}. البريد الإلكتروني: ${site.email}.`],
        },
      ],
    },
  },
  terms: {
    en: {
      eyebrow: 'Legal',
      title: 'Terms of Use',
      updated: 'Last updated: October 2026',
      intro: `These terms apply to your use of the ${company.en} website. By using the site you agree to them.`,
      sections: [
        {
          heading: 'About this website',
          body: [
            'The site describes our services in general terms. It is not an offer. Scope, price, timeline, and deliverables for any project are set out only in a written proposal or contract agreed with you.',
          ],
        },
        {
          heading: 'Consultations and quotes',
          body: [
            'The initial consultation is free and places you under no obligation. Quotes are based on the information you provide and may change if the requirements change.',
          ],
        },
        {
          heading: 'Intellectual property',
          body: [
            'The Brandraize name, logo, text, and design of this site belong to Brandraize. You may not copy or reuse them without our written permission.',
          ],
        },
        {
          heading: 'Acceptable use',
          body: [
            'Do not misuse the site, attempt to disrupt it, or submit false or unlawful information through its forms.',
          ],
        },
        {
          heading: 'Liability',
          body: [
            'We work to keep the information on this site accurate and the site available, but it is provided as is, and to the extent permitted by law we are not liable for losses arising from reliance on it.',
          ],
        },
        {
          heading: 'Governing law',
          body: ['These terms are governed by the laws of the Kingdom of Saudi Arabia.'],
        },
        {
          heading: 'Contact',
          body: [`Questions about these terms: ${site.email}.`],
        },
      ],
    },
    ar: {
      eyebrow: 'قانوني',
      title: 'شروط الاستخدام',
      updated: 'آخر تحديث: أكتوبر 2026',
      intro: `تنطبق هذه الشروط على استخدامك لموقع ${company.ar}. باستخدامك للموقع فإنك توافق عليها.`,
      sections: [
        {
          heading: 'عن هذا الموقع',
          body: [
            'يعرض الموقع خدماتنا بصورة عامة ولا يُعد عرضاً ملزماً. يُحدَّد نطاق أي مشروع وسعره ومدته ومخرجاته فقط في عرض مكتوب أو عقد يُتفق عليه معك.',
          ],
        },
        {
          heading: 'الاستشارات وعروض الأسعار',
          body: [
            'الاستشارة الأولى مجانية ولا يترتب عليها أي التزام. تُبنى عروض الأسعار على المعلومات التي تقدمها وقد تتغير إذا تغيرت المتطلبات.',
          ],
        },
        {
          heading: 'الملكية الفكرية',
          body: [
            'اسم براندرايز وشعارها ونصوص هذا الموقع وتصميمه ملك لبراندرايز، ولا يجوز نسخها أو إعادة استخدامها دون إذن كتابي منا.',
          ],
        },
        {
          heading: 'الاستخدام المقبول',
          body: [
            'يُمنع إساءة استخدام الموقع أو محاولة تعطيله أو إرسال معلومات كاذبة أو مخالفة للأنظمة عبر نماذجه.',
          ],
        },
        {
          heading: 'المسؤولية',
          body: [
            'نحرص على دقة معلومات الموقع وتوفره، لكنه يُقدَّم كما هو، ولا نتحمل — في الحدود التي يسمح بها النظام — مسؤولية أي خسائر ناتجة عن الاعتماد عليه.',
          ],
        },
        {
          heading: 'النظام الحاكم',
          body: ['تخضع هذه الشروط لأنظمة المملكة العربية السعودية.'],
        },
        {
          heading: 'التواصل',
          body: [`للاستفسار عن هذه الشروط: ${site.email}.`],
        },
      ],
    },
  },
};

export default function LegalPage({ doc }: { doc: Doc }) {
  return (
    <main>
      <PageHero eyebrow={doc.eyebrow} title={doc.title} description={doc.updated} />

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-lg leading-8 text-slate-700">{doc.intro}</p>

          {doc.sections.map((section) => (
            <div key={section.heading} className="mt-10">
              <h2 className="text-2xl font-extrabold text-ink-900">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-base leading-8 text-slate-600">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
