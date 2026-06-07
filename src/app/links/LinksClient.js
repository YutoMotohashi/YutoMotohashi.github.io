'use client';

import Links from '../components/layout/links';
import { useLanguage } from '../components/layout/context/LanguageContext';

export default function LinksClient() {
  const { language } = useLanguage();
  return <Links language={language} />;
}
