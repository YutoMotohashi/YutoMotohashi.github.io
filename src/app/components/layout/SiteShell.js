'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './site-shell.module.css';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/publication', label: 'Publications' },
  { href: '/cv', label: 'CV' },
  { href: '/links', label: 'Links' },
];

function NavigationContent() {
  const pathname = usePathname();
  const { language, setLanguage, createUrl } = useLanguage();

  return (
    <header className={styles.header}>
      <a href="#main-content" className={styles.skipLink}>
        {language === 'en' ? 'Skip to content' : '本文へ移動'}
      </a>
      <nav aria-label={language === 'en' ? 'Main navigation' : 'メインナビゲーション'}>
        <ul className={styles.navigation}>
          {navigation.map(({ href, label }) => {
            const active = pathname === href || (href !== '/' && pathname.startsWith(href + '/'));
            return (
              <li key={href}>
                <Link
                  href={createUrl(href)}
                  className={active ? styles.active : undefined}
                  aria-current={active ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className={styles.languageSwitch} role="group" aria-label="Language / 言語">
          <button
            type="button"
            className={language === 'en' ? styles.active : undefined}
            aria-label="English"
            aria-pressed={language === 'en'}
            onClick={() => setLanguage('en')}
          >
            EN
          </button>
          <span aria-hidden="true">/</span>
          <button
            type="button"
            className={language === 'ja' ? styles.active : undefined}
            aria-label="日本語"
            aria-pressed={language === 'ja'}
            onClick={() => setLanguage('ja')}
          >
            JA
          </button>
        </div>
      </nav>
    </header>
  );
}

export default function SiteShell({ children }) {
  return (
    <LanguageProvider>
      <NavigationContent />
      <main id="main-content" className={styles.main} tabIndex={-1}>{children}</main>
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Yuto Motohashi. All Rights Reserved.</p>
      </footer>
    </LanguageProvider>
  );
}
