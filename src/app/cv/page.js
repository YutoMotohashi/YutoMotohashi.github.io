'use client';

import React, { Suspense } from 'react';
import CV from "../components/cv";
import { useLanguage } from '../components/layout/context/LanguageContext';

function CVContent() {
  const { language } = useLanguage();
  return <CV language={language} />;
}

export default function CVPage() {
  return (
    <Suspense fallback={<div>Loading CV...</div>}>
      <CVContent />
    </Suspense>
  );
}
