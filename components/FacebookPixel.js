'use client';

import Script from 'next/script';
import { FB_PIXEL_ID, FB_TEST_EVENT_CODE } from '@/lib/fpixel';

export default function FacebookPixel() {
  const pageViewCall =
    FB_TEST_EVENT_CODE && FB_TEST_EVENT_CODE.trim() !== ''
      ? `fbq('track', 'PageView', {}, { test_event_code: '${FB_TEST_EVENT_CODE.trim()}' });`
      : `fbq('track', 'PageView');`;

  const noscriptUrl = `https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1${
    FB_TEST_EVENT_CODE && FB_TEST_EVENT_CODE.trim() !== ''
      ? `&test_event_code=${FB_TEST_EVENT_CODE.trim()}`
      : ''
  }`;

  return (
    <>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            ${pageViewCall}
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={noscriptUrl}
          alt=""
        />
      </noscript>
    </>
  );
}
