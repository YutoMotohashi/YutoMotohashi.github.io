'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';

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
  const [isClient, setIsClient] = useState(false);
  const [language, setLanguage] = useState('en');
  const pathname = usePathname();
  const router = useRouter();
  const urlLanguage = useLanguageFromURL();

  // Mark when component is mounted on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle initial language setup
  useEffect(() => {
    if (!isClient) return;

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
  }, [isClient, urlLanguage]);

  const handleLanguageChange = (newLanguage) => {
    if (!isClient) return;
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

  // Always render children; consumers can handle client-only UI to avoid hydration issues
    if (!isClient) {
    return (
      <div style={{ width: '100%', height: '100vh' }}>
        <iframe
          src="/static_summary.html"
          title="Static Summary"
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </div>
    );
  }

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