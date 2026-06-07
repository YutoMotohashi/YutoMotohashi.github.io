'use client';

import CV from '../components/cv';
import { useLanguage } from '../components/layout/context/LanguageContext';

export default function CVClient() {
  const { language } = useLanguage();
  return <CV language={language} />;
}
