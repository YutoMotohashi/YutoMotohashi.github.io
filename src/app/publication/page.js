'use client';

import React, { Suspense } from 'react';
import Publications from "../components/publication";
import { useLanguage } from '../components/layout/context/LanguageContext';

function PublicationContent() {
  const { language } = useLanguage();
  return <Publications language={language} />;
}

export default function PublicationPage() {
  return (
    <Suspense fallback={<div>Loading publications...</div>}>
      <PublicationContent />
    </Suspense>
  );
}
