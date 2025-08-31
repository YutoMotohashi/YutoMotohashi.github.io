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

  // Only render children when we're on the client to prevent hydration mismatch
  if (!isClient) {
    return (
      <div id="static-summary-fallback" style={{ padding: '1rem' }}>
        <p style={{ margin: '0 0 0.5rem 0' }}>
          Static summary is shown for non-JavaScript clients or crawlers. For the full interactive site, enable JavaScript.
        </p>
        <div style={{ border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden' }}>
          <iframe
            src="/static_summary.html"
            title="Static summary"
            style={{ width: '100%', height: '70vh', border: 0 }}
          />
        </div>
        <p style={{ marginTop: '0.5rem' }}>
          Direct link: <a href="/static_summary.html">/static_summary.html</a>
        </p>
        <noscript>
          <p>JavaScript is disabled. You are viewing the static summary.</p>
        </noscript>
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