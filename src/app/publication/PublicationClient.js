'use client';

import Publications from '../components/publication';
import { useLanguage } from '../components/layout/context/LanguageContext';

export default function PublicationClient() {
  const { language } = useLanguage();
  return <Publications language={language} />;
}
