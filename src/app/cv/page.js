'use client'
import React from 'react';
import CV from "../components/cv";
import { useLanguage } from '../components/layout/context/LanguageContext';

export default function CVPage() {
  const { language } = useLanguage();
  return <CV language={language} />;
}
