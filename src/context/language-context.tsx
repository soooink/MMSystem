import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<Language>(
    i18n.language && (i18n.language === 'en' || i18n.language === 'zh')
      ? (i18n.language as Language)
      : 'en'
  );

  const handleSetLanguage = (newLanguage: Language) => {
    try {
      i18n.changeLanguage(newLanguage);
      setLanguage(newLanguage);
    } catch (error) {
      console.error('语言切换失败:', error);
    }
  };

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      console.log('i18next 语言变化:', lng);
      if (lng === 'en' || lng === 'zh') {
        setLanguage(lng as Language);
      } else {
        setLanguage('en');
      }
    };
    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage 必须在 LanguageProvider 中使用');
  }
  return context;
};