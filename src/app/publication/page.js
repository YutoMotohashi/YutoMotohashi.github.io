'use client'
import React from 'react';
import Publications from "../components/publication";
import { useLanguage } from '../components/layout/context/LanguageContext';

export default function PublicationPage() {
  const { language } = useLanguage();
  return <Publications language={language} />;
}
