import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

const otherConfigs = {
  fallbackLng: 'en',
  debug: process.env.NODE_ENV === 'development',
  supportedLngs: ['en', 'zh'],
  ns: ['common', 'language', 'theme', 'nav'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(HttpBackend).init({
    ...otherConfigs,
    backend: {
      loadPath: "/src/i18n/translations/{{ns}}/{{lng}}.json"
    }
  });

// 加载公共翻译资源
export const loadCommonNamespaces = async () => {
  if (!i18n.language) {
    await new Promise(resolve => setTimeout(resolve, 100)); // 等待语言初始化
    if (!i18n.language) throw new Error('Language未初始化 after brief wait');
  }

  const namespaces = ['common', 'language', 'theme', 'nav'];
  if (!namespaces || !Array.isArray(namespaces)) throw new Error('Namespaces数组异常');
  for (const ns of namespaces) {
    if (!i18n.hasResourceBundle(i18n.language, ns)) {
      const module = await import(`./translations/${ns}/${i18n.language}.json`);
      i18n.addResourceBundle(i18n.language, ns, module.default, true, true);
    }
  }
};

// 动态加载页面特定的翻译资源
export const loadPageNamespace = async (namespace: string) => {
  if (!i18n.hasResourceBundle(i18n.language, namespace)) {
    try {
      const module = await import(`./translations/pages/${namespace}/${i18n.language}.json`);
      i18n.addResourceBundle(i18n.language, namespace, module.default, true, true);
    } catch (error) {
      console.error(`Failed to load namespace: ${namespace}`, error);
    }
  }
};

// 初始加载公共翻译资源
loadCommonNamespaces();

export default i18n;