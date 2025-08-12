'use client';

import { ReactNode, useEffect, useState } from 'react';
import i18n from '@/lib/i18n';

interface I18nProviderProps {
  children: ReactNode;
  locale?: string;
}

export default function I18nProvider({ children, locale }: I18nProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // 由于 i18n 现在在初始化时就会读取 localStorage，
    // 我们只需要确保初始化完成即可
    if (i18n.isInitialized) {
      setIsInitialized(true);
    } else {
      // 等待 i18n 初始化完成
      const handleInitialized = () => {
        setIsInitialized(true);
      };
      
      i18n.on('initialized', handleInitialized);
      
      return () => {
        i18n.off('initialized', handleInitialized);
      };
    }
  }, [locale]);

  // 在初始化完成前不渲染子组件，避免闪烁
  if (!isInitialized) {
    return null;
  }

  return <>{children}</>;
}
