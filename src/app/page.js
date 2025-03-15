'use client'
import React from 'react';
import Home from "./components/layout/home";
import { useLanguage } from './components/layout/context/LanguageContext';

export default function Page() {
  const { language } = useLanguage();
  return <Home language={language} />;
}
