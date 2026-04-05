import ContactUs from '@/components/ContactUs';

type ContactPageProps = {
  params: {
    locale: 'en' | 'ar';
  };
};

export default function ContactPage({ params }: ContactPageProps) {
  return <ContactUs locale={params.locale} />;
}
