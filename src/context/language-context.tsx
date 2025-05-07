import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

import { useTranslation } from 'react-i18next';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { i18n } = useTranslation();
  const storageKey = 'selectedLanguage';
  
  // 从localStorage加载初始语言
  const [language, setLanguage] = useState<Language>(() => {
    const storedLanguage = localStorage.getItem(storageKey);
    return (storedLanguage as Language) || 'en';
  });

  const handleSetLanguage = (newLanguage: Language) => {
    try {
      i18n.changeLanguage(newLanguage);
      setLanguage(newLanguage);
      // 保存到localStorage
      localStorage.setItem(storageKey, newLanguage); i18n.reloadResources();
    } catch (error) {
      console.error('语言切换失败:', error); window.location.reload(); // 修正变量名
    }
  };

  // 同步 i18next 语言变化
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      console.log('i18next 语言变化:', lng);
      if (lng === 'en' || lng === 'zh') {
        setLanguage(lng as Language);
      } else {
        setLanguage('zh');
      }
    };
    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  // 调试日志
  console.log('LanguageProvider: i18n.language =', i18n.language, 'state.language =', language);

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