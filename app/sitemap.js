export default function sitemap() {
  const baseUrl = 'https://brandraize.com';
  
  const routes = [
    '',
    '/about-us',
    '/contact-us',
    '/blog',
    '/products',
    '/service',
    '/service/webdev',
    '/service/appdev',
    '/service/itsolutions',
    '/service/digital-marketing',
    '/service/graphic-design',
    '/service/mobile-app',
    '/faq',
  ];

  const languages = ['en', 'ar'];
  
  const urls = [];
  
  languages.forEach(lang => {
    routes.forEach(route => {
      urls.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1.0 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route}`,
            ar: `${baseUrl}/ar${route}`,
          },
        },
      });
    });
  });

  return urls;
}
