import './globals.css';
import Script from 'next/script';
import SiteShell from './components/layout/SiteShell';
import { metadata as siteMetadata } from './metadata';

export const metadata = siteMetadata;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-TWBYVKG28X"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TWBYVKG28X');
          `}
        </Script>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
