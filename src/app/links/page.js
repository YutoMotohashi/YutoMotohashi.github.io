'use client'
import React from 'react';
import Links from "../components/layout/links";
import { useLanguage } from '../components/layout/context/LanguageContext';

export default function LinksPage() {
  const { language } = useLanguage();
  return <Links language={language} />;
}
