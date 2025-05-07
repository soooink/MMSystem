import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(
    {
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json', // 动态加载路径
      },
      fallbackLng: 'en',
      debug: import.meta.env.DEV,
      interpolation: { escapeValue: false },
      ns: ['Common', 'Dashboard'],
      defaultNS: 'Common',
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
        lookupLocalStorage: 'i18nextLng',
      },
    },
    (error) => {
      if (error) {
        console.error('i18next 初始化失败:', error);
      } else {
        console.log('i18next 初始化成功, 当前语言:', i18n.language);
      }
    }
  );

export default i18n;