import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './locales';

// 获取保存的语言设置，如果在浏览器环境中
const getStoredLanguage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('language') || 'zh';
  }
  return 'zh';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getStoredLanguage(), // 使用保存的语言设置
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false,
    },
    ns: ['common'],
    defaultNS: 'common',
  });

export default i18n;
