import Script from 'next/script';

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
// Google tag IDs loaded directly (GA4 "G-…" and/or Google Ads "AW-…"), comma separated.
const googleTagIds = (process.env.NEXT_PUBLIC_GOOGLE_TAG_IDS ?? '')
  .split(',')
  .map((id) => id.trim())
  .filter(Boolean);
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

// Ad and analytics tags. Each one loads only when its ID is set in the environment.
export default function Analytics() {
  return (
    <>
      {gtmId && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(gtmId)});`}
        </Script>
      )}

      {googleTagIds.length > 0 && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleTagIds[0])}`}
            strategy="afterInteractive"
          />
          <Script id="google-tag" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());${googleTagIds
              .map((id) => `gtag('config',${JSON.stringify(id)});`)
              .join('')}`}
          </Script>
        </>
      )}

      {metaPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',${JSON.stringify(metaPixelId)});fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}
