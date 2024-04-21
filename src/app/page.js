'use client'
import "./globals.css"
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Head from 'next/head';

import styles from "./page.module.css";
import Home from "./home";
import Publications from "./publication";
import CV from "./cv";
import Links from "./links";


export default function App(){
  const [language, setLanguage] = useState('en'); // Default language
  const [currentPage, setCurrentPage] = useState('home');

  // Extract language from URL at the start
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const urlLanguage = queryParams.get('language');
    if (urlLanguage && (urlLanguage === 'en' || urlLanguage === 'ja')) {
      setLanguage(urlLanguage);
    }
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className={styles.main}>
            <Home language={language} setLanguage={setLanguage} />
          </div>
        );
      case 'publications':
        return (
          <div className={styles.main}>
            <Publications language={language} />
          </div>
        )
      case 'cv':
        return (
          <div className={styles.main}>
            <CV language={language} />
          </div>
        )
      case 'links':
        return (
          <div className={styles.main}>
            <Links language={language} />
          </div>
        )
      default:
        return (
          <div className={styles.main}>
            <Home language={language} setLanguage={setLanguage} />
          </div>
        )
    };
  };

  return (
    <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          content="fCEFYasOakKKA_2EZiHN0QmJTZq1Nju5N3XWzCYKrfw"
        />
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
      <div className={styles.header}>
        
          <nav>
            <ul>
              <li>
                  <button className={currentPage === 'home' ? styles.active : ''} onClick={() => setCurrentPage('home')}>HOME</button>
              </li>
              <li>
                  <button className={currentPage === 'publications' ? styles.active : ''} onClick={() => setCurrentPage('publications')}>PUBLICATION</button>
              </li>
              <li>
                  <button className={currentPage === 'cv' ? styles.active : ''} onClick={() => setCurrentPage('cv')}>CV</button>
              </li>
              <li>
                  <button className={currentPage === 'links' ? styles.active : ''} onClick={() => setCurrentPage('links')}>LINKS</button>
              </li>
            </ul>

            <div className={styles.languageSwitch}>
                <button className={language === 'en' ? styles.active : ''} onClick={() => setLanguage('en')}>EN</button>
                <span>|</span>
                <button className={language === 'ja' ? styles.active : ''} onClick={() => setLanguage('ja')}>JA</button>
            </div>
          </nav>
      </div>


      <div className={styles.main}>
        {renderPage()}
      </div>

      <div className={styles.footer}>
        <p>© 2024 Yuto Motohashi. All Rights Reserved.</p>
        </div>
    </div>

  );
};
