'use client'
import React, { Suspense } from 'react';
import Home from "./components/layout/home";
import { useLanguage } from './components/layout/context/LanguageContext';

function HomeContent() {
  const { language } = useLanguage();
  return <Home language={language} />;
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading home content...</div>}>
      <HomeContent />
    </Suspense>
  );
}
