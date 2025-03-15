import React, { createContext, useState, useEffect, useContext } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

// Create a context for language
const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  createUrl: () => {}
});

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract language from URL at the start
  useEffect(() => {
    const urlLanguage = searchParams.get('language');
    if (urlLanguage && (urlLanguage === 'en' || urlLanguage === 'ja')) {
      setLanguage(urlLanguage);
    }
  }, [searchParams]);

  // Update URL when language changes
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    
    // Create a new URLSearchParams object
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('language', newLanguage);
    
    // Update the URL without a page refresh
    router.push(`${pathname}?${newParams.toString()}`);
  };

  // Create URL with current language parameter
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

// Custom hook to use the language context
export function useLanguage() {
  return useContext(LanguageContext);
}

export default LanguageContext;