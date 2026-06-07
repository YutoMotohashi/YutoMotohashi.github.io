'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../../page.module.css';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

function NavigationContent() {
  const pathname = usePathname();
  const { language, setLanguage, createUrl } = useLanguage();

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
          <button className={language === 'en' ? styles.active : ''} onClick={() => setLanguage('en')}>
            EN
          </button>
          <span>|</span>
          <button className={language === 'ja' ? styles.active : ''} onClick={() => setLanguage('ja')}>
            JA
          </button>
        </div>
      </nav>
    </div>
  );
}

export default function SiteShell({ children }) {
  return (
    <LanguageProvider>
      <NavigationContent />
      <main className={styles.main}>{children}</main>
      <div className={styles.footer}>
        <p>© {new Date().getFullYear()} Yuto Motohashi. All Rights Reserved.</p>
      </div>
    </LanguageProvider>
  );
}
