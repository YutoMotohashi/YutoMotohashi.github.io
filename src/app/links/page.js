'use client';

import React, { Suspense } from 'react';
import Links from "../components/layout/links";
import { useLanguage } from '../components/layout/context/LanguageContext';

function LinksContent() {
  const { language } = useLanguage();
  return <Links language={language} />;
}

export default function LinksPage() {
  return (
    <Suspense fallback={<div>Loading links...</div>}>
      <LinksContent />
    </Suspense>
  );
}
