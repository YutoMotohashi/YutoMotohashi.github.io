'use client';

import "./globals.css"
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from "./page.module.css";
import { LanguageProvider, useLanguage } from './components/layout/context/LanguageContext';

function RootLayoutContent({ children }) {
  const pathname = usePathname();
  const { language, setLanguage, createUrl } = useLanguage();

  return (
    <html lang={language}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta content="fCEFYasOakKKA_2EZiHN0QmJTZq1Nju5N3XWzCYKrfw" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-TWBYVKG28X"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments); }
              gtag('js', new Date());
              gtag('config', 'G-TWBYVKG28X');
            `,
          }}
        />
        <title>Yuto Motohashi | 本橋悠人</title>
      </head>
      <body>
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

        <main className={styles.main}>
          {children}
        </main>

        <div className={styles.footer}>
          <p>© {new Date().getFullYear()} Yuto Motohashi. All Rights Reserved.</p>
        </div>
      </body>
    </html>
  );
}

export default function RootLayout({ children }) {
  return (
    <LanguageProvider>
      <RootLayoutContent>
        {children}
      </RootLayoutContent>
    </LanguageProvider>
  );
}
