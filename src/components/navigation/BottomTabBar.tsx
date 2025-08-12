'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'

interface TabItem {
  key: string
  href: string
  icon: React.ReactNode
  label: string
}

export default function BottomTabBar() {
  const pathname = usePathname()
  const { t } = useTranslation('common')

  const tabs: TabItem[] = [
    {
      key: 'home',
      href: '/home',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      label: t('navigation.home')
    },
    {
      key: 'market',
      href: '/market',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      label: t('navigation.market')
    },
    {
      key: 'wealth',
      href: '/wealth',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: t('navigation.wealth')
    },
    {
      key: 'assets',
      href: '/assets',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      label: t('navigation.assets')
    }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/100 backdrop-blur-none border-t border-border z-50 shadow-lg">
      <div className="flex">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href
          return (
            <Link
              key={tab.key}
              href={tab.href}
              className={`flex-1 flex flex-col items-center py-3 px-1 transition-colors ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className={`${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                {tab.icon}
              </div>
              <span className={`text-xs mt-1 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>
      {/* 底部安全区域间距 */}
      <div className="pb-safe h-safe"></div>
    </div>
  )
}
