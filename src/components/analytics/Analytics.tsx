import Script from 'next/script';
import { siteConfig } from '@/config/site';

/**
 * Privacy-conscious analytics loader. Renders nothing unless a GA ID or
 * Plausible domain is configured via env, so local/dev builds stay clean.
 * Scripts use `afterInteractive` so they never block LCP.
 */
export function Analytics() {
  const { gaId, plausibleDomain } = siteConfig.analytics;

  return (
    <>
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', { anonymize_ip: true });`}
          </Script>
        </>
      )}
      {plausibleDomain && (
        <Script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
