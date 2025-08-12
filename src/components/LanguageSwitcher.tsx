'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';

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
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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
    setFocusedIndex(-1);
    
    // 重新聚焦到按钮
    buttonRef.current?.focus();
    
    // 由于项目没有使用动态路由，只是改变语言状态
    // 不需要路由跳转
  };

  // 键盘导航处理
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
        event.preventDefault();
        setIsOpen(true);
        setFocusedIndex(0);
      }
      return;
    }

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        setIsOpen(false);
        setFocusedIndex(-1);
        buttonRef.current?.focus();
        break;
      case 'ArrowDown':
        event.preventDefault();
        setFocusedIndex(prev => (prev + 1) % languages.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        setFocusedIndex(prev => prev <= 0 ? languages.length - 1 : prev - 1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (focusedIndex >= 0) {
          handleLanguageChange(languages[focusedIndex].code);
        }
        break;
      case 'Tab':
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
    }
  };

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div 
      className="relative inline-block text-left" 
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex items-center justify-center rounded-full w-10 h-10 border border-gray-300 shadow-sm bg-white text-lg hover:bg-blue-50 hover:border-blue-300 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={`${t('language.select_language')} - ${currentLanguage.name}`}
        title={currentLanguage.name}
      >
        <span className="text-xl">{currentLanguage.flag}</span>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-3 w-48 rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 border border-gray-100">
          <div className="py-2" role="menu" aria-orientation="vertical">
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
              {t('language.select_language')}
            </div>
            {languages.map((language, index) => (
              <button
                key={language.code}
                className={`${
                  currentLanguage.code === language.code
                    ? 'bg-blue-50 text-blue-900 border-l-4 border-blue-500'
                    : focusedIndex === index 
                      ? 'bg-blue-100 text-blue-800'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-800 hover:translate-x-1'
                } group flex items-center px-4 py-3 text-sm w-full text-left transition-all duration-300 ease-in-out relative`}
                role="menuitem"
                tabIndex={-1}
                aria-selected={currentLanguage.code === language.code}
                onClick={() => handleLanguageChange(language.code)}
                onMouseEnter={() => setFocusedIndex(index)}
              >
                <span className="mr-3 text-xl">{language.flag}</span>
                <span className="font-medium">{language.name}</span>
                {currentLanguage.code === language.code && (
                  <svg
                    className="ml-auto h-4 w-4 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
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
    </div>
  );
}
