'use client';

import Home from './components/layout/home';
import { useLanguage } from './components/layout/context/LanguageContext';

export default function HomeClient() {
  const { language } = useLanguage();
  return <Home language={language} />;
}
