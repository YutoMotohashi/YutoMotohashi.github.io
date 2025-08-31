'use client';

import "./globals.css"
import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from "./page.module.css";
import { LanguageProvider, useLanguage } from './components/layout/context/LanguageContext';

// Separate navigation into a client component
function NavigationContent() {
  const pathname = usePathname();
  const { language, setLanguage, createUrl } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>Loading navigation...</div>;
  }

  return (
    <div className={styles.header}>
      <nav>
        <ul>
          <li>
            <Link href={createUrl('/')} className={pathname === '/' ? styles.active : ''}>
              HOME
            </Link>
          </li>
          <li>
            <Link href={createUrl('/publication')} className={pathname === '/publication' ? styles.active : ''}>
              PUBLICATION
            </Link>
          </li>
          <li>
            <Link href={createUrl('/cv')} className={pathname === '/cv' ? styles.active : ''}>
              CV
            </Link>
          </li>
          <li>
            <Link href={createUrl('/links')} className={pathname === '/links' ? styles.active : ''}>
              LINKS
            </Link>
          </li>
        </ul>

        <div className={styles.languageSwitch}>
          <button 
            className={language === 'en' ? styles.active : ''} 
            onClick={() => setLanguage('en')}
          >
            EN
          </button>
          <span>|</span>
          <button 
            className={language === 'ja' ? styles.active : ''} 
            onClick={() => setLanguage('ja')}
          >
            JA
          </button>
        </div>
      </nav>
    </div>
  );
}

function MainContent({ children }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // On the top page, show a static summary fallback for non-JS/crawlers
    if (pathname === '/') {
      return (
        <div id="static-summary-fallback" style={{ padding: '1rem' }}>
          <p style={{ margin: '0 0 0.5rem 0' }}>
            Static summary is shown for non-JavaScript clients or crawlers. For the full interactive site, enable JavaScript.
          </p>
          <div style={{ border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden' }}>
            <iframe
              src="/static_summary.html"
              title="Static summary"
              style={{ width: '100%', height: '70vh', border: 0 }}
            />
          </div>
          <p style={{ marginTop: '0.5rem' }}>
            Direct link: <a href="/static_summary.html">/static_summary.html</a>
          </p>
          <noscript>
            <p>JavaScript is disabled. You are viewing the static summary.</p>
          </noscript>
        </div>
      );
    }
    // Other routes can remain visually hidden to avoid layout shift
    return <div style={{ visibility: 'hidden' }}>Loading content...</div>;
  }

  return (
    <>
      <NavigationContent />
      <main className={styles.main}>
        {children}
      </main>
      <div className={styles.footer}>
        <p>© {new Date().getFullYear()} Yuto Motohashi. All Rights Reserved.</p>
      </div>
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="google-site-verification" content="fCEFYasOakKKA_2EZiHN0QmJTZq1Nju5N3XWzCYKrfw" />
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
        <title>Yuto Motohashi | 本橋悠人</title>
      </head>
      <body>
        <LanguageProvider>
          <MainContent>
            {children}
          </MainContent>
        </LanguageProvider>
      </body>
    </html>
  );
}
