import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface PreloaderContextType {
  hasLoaded: boolean;
  setHasLoaded: (value: boolean) => void;
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(undefined);

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [hasLoaded, setHasLoaded] = useState(() => {
    return sessionStorage.getItem('zora-loaded') === 'true';
  });

  useEffect(() => {
    if (hasLoaded) {
      sessionStorage.setItem('zora-loaded', 'true');
    }
  }, [hasLoaded]);

  return (
    <PreloaderContext.Provider value={{ hasLoaded, setHasLoaded }}>
      {children}
    </PreloaderContext.Provider>
  );
}

export function usePreloader() {
  const context = useContext(PreloaderContext);
  if (!context) {
    throw new Error('usePreloader must be used within a PreloaderProvider');
  }
  return context;
}
