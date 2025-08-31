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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
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
