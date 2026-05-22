import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface CookiePreferences {
  essential: boolean;
  performance: boolean;
  functional: boolean;
  marketing: boolean;
}

interface CookieContextType {
  preferences: CookiePreferences;
  hasConsent: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (prefs: CookiePreferences) => void;
  showBanner: boolean;
  setShowBanner: (show: boolean) => void;
}

const defaultPreferences: CookiePreferences = {
  essential: true,
  performance: false,
  functional: false,
  marketing: false,
};

const CookieContext = createContext<CookieContextType | undefined>(undefined);

export function CookieProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences>(() => {
    const stored = localStorage.getItem('cookie-preferences');
    return stored ? JSON.parse(stored) : defaultPreferences;
  });

  const [hasConsent, setHasConsent] = useState(() => {
    return localStorage.getItem('cookie-consent') === 'true';
  });

  const [showBanner, setShowBanner] = useState(() => {
    return localStorage.getItem('cookie-consent') !== 'true';
  });

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      performance: true,
      functional: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookie-preferences', JSON.stringify(allAccepted));
    localStorage.setItem('cookie-consent', 'true');
    setHasConsent(true);
    setShowBanner(false);
  };

  const rejectAll = () => {
    const onlyEssential: CookiePreferences = {
      essential: true,
      performance: false,
      functional: false,
      marketing: false,
    };
    setPreferences(onlyEssential);
    localStorage.setItem('cookie-preferences', JSON.stringify(onlyEssential));
    localStorage.setItem('cookie-consent', 'true');
    setHasConsent(true);
    setShowBanner(false);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    const prefsWithEssential = { ...prefs, essential: true };
    setPreferences(prefsWithEssential);
    localStorage.setItem('cookie-preferences', JSON.stringify(prefsWithEssential));
    localStorage.setItem('cookie-consent', 'true');
    setHasConsent(true);
    setShowBanner(false);
  };

  useEffect(() => {
    if (preferences.performance) {
      console.log('Performance cookies enabled');
    }
    if (preferences.functional) {
      console.log('Functional cookies enabled');
    }
    if (preferences.marketing) {
      console.log('Marketing cookies enabled');
    }
  }, [preferences]);

  return (
    <CookieContext.Provider
      value={{
        preferences,
        hasConsent,
        acceptAll,
        rejectAll,
        savePreferences,
        showBanner,
        setShowBanner,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
}

export function useCookies() {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error('useCookies must be used within CookieProvider');
  }
  return context;
}
