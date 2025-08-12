'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

const languages = [
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { t, i18n } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('zh');

  useEffect(() => {
    // 从localStorage获取保存的语言设置
    const savedLang = localStorage.getItem('language') || 'zh';
    setCurrentLang(savedLang);
    
    // 确保 i18n 和本地状态保持同步
    if (i18n.language !== savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  // 监听 i18n 语言变化，确保状态同步
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setCurrentLang(lng);
      // 更新 localStorage，确保语言设置被正确保存
      localStorage.setItem('language', lng);
    };

    i18n.on('languageChanged', handleLanguageChange);
    
    // 清理监听器
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    // 只需要调用 i18n.changeLanguage，其他的同步工作由事件监听器处理
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
    
    // 由于项目没有使用动态路由，只是改变语言状态
    // 不需要路由跳转
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded="true"
      >
        <span className="mr-2">{currentLanguage.flag}</span>
        {currentLanguage.name}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
              {t('language.select_language')}
            </div>
            {languages.map((language) => (
              <button
                key={language.code}
                className={`${
                  currentLanguage.code === language.code
                    ? 'bg-blue-50 text-blue-900'
                    : 'text-gray-700'
                } group flex items-center px-4 py-2 text-sm w-full text-left hover:bg-gray-100 transition-colors duration-200`}
                role="menuitem"
                onClick={() => handleLanguageChange(language.code)}
              >
                <span className="mr-3 text-lg">{language.flag}</span>
                {language.name}
                {currentLanguage.code === language.code && (
                  <svg
                    className="ml-auto h-4 w-4 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 点击外部关闭下拉菜单 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
