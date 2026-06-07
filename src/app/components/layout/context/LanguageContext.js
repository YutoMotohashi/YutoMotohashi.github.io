'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';

const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  createUrl: () => {}
});

// Safely get URL parameters on client side
function useLanguageFromURL() {
  const [urlLanguage, setUrlLanguage] = useState(null);
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get('language');
    if (lang && (lang === 'en' || lang === 'ja')) {
      setUrlLanguage(lang);
    }
  }, []);
  
  return urlLanguage;
}

function LanguageStateProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const router = useRouter();
  const urlLanguage = useLanguageFromURL();

  // Handle initial language setup
  useEffect(() => {
    // Priority: URL > localStorage > default
    if (urlLanguage) {
      setLanguage(urlLanguage);
      localStorage.setItem('language', urlLanguage);
    } else {
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ja')) {
        setLanguage(savedLanguage);
      }
    }
  }, [urlLanguage]);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('language', newLanguage);
    router.push(newUrl.pathname + newUrl.search);
  };

  const createUrl = (path) => {
    const params = new URLSearchParams();
    params.set('language', language);
    return `${path}?${params.toString()}`;
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage: handleLanguageChange, 
        createUrl 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function LanguageProvider({ children }) {
  return (
    <LanguageStateProvider>
      {children}
    </LanguageStateProvider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export default LanguageContext;
