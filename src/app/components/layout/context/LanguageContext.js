'use client';

import { createContext, useContext, useEffect, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';

const DEFAULT_LANGUAGE = 'en';
const LANGUAGE_STORAGE_KEY = 'language';
const LANGUAGE_CHANGE_EVENT = 'site-language-change';

const LanguageContext = createContext({
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
  createUrl: (path) => path,
});

function isSupportedLanguage(value) {
  return value === 'en' || value === 'ja';
}

function getUrlLanguage() {
  const value = new URLSearchParams(window.location.search).get('language');
  return isSupportedLanguage(value) ? value : null;
}

function getStoredLanguage() {
  try {
    const value = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return isSupportedLanguage(value) ? value : null;
  } catch {
    return null;
  }
}

function storeLanguage(language) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // Language switching still works when storage is unavailable.
  }
}

function resolveBrowserLanguage() {
  return getUrlLanguage() || getStoredLanguage() || DEFAULT_LANGUAGE;
}

// Keep button changes immediate while the router updates the URL.
let clientLanguage = null;

function getClientSnapshot() {
  return clientLanguage ?? resolveBrowserLanguage();
}

function getServerSnapshot() {
  return DEFAULT_LANGUAGE;
}

function subscribe(callback) {
  const refreshFromBrowser = () => {
    clientLanguage = resolveBrowserLanguage();
    callback();
  };

  window.addEventListener('popstate', refreshFromBrowser);
  window.addEventListener('storage', refreshFromBrowser);
  window.addEventListener(LANGUAGE_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener('popstate', refreshFromBrowser);
    window.removeEventListener('storage', refreshFromBrowser);
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, callback);
  };
}

function LanguageStateProvider({ children }) {
  const router = useRouter();
  const language = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    document.documentElement.lang = language;

    // Do not persist the old URL language while a button change is navigating.
    if (getUrlLanguage() === language) {
      storeLanguage(language);
    }
  }, [language]);

  const handleLanguageChange = (newLanguage) => {
    if (!isSupportedLanguage(newLanguage)) return;

    const newUrl = new URL(window.location.href);
    if (newLanguage === 'ja') {
      newUrl.searchParams.set('language', 'ja');
    } else {
      newUrl.searchParams.delete('language');
    }

    storeLanguage(newLanguage);
    clientLanguage = newLanguage;
    window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT));
    router.push(`${newUrl.pathname}${newUrl.search}${newUrl.hash}`);
  };

  const createUrl = (path) => (
    language === 'ja' ? `${path}?language=ja` : path
  );

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleLanguageChange, createUrl }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function LanguageProvider({ children }) {
  return <LanguageStateProvider>{children}</LanguageStateProvider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export default LanguageContext;
