'use client'

import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout'
import { useAuthStore } from '@/store/authStore'
import { useTranslation } from 'react-i18next'

export default function HomePage() {
  const { user } = useAuthStore()
  const { t } = useTranslation('common')

  return (
    <AuthenticatedLayout>
      <div className="page-content p-4">
        {/* 用户欢迎信息 */}
        <div className="bg-card rounded-lg shadow-sm p-6 mb-6 border border-border">
          <h1 className="text-2xl font-bold text-card-foreground mb-2">
            {t('common.welcome_back')}, {user?.name}!
          </h1>
          <p className="text-muted-foreground">{t('navigation.home')}</p>
        </div>

        {/* 快捷功能卡片 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-card rounded-lg shadow-sm p-4 border border-border">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-card-foreground">{t('navigation.market')}</h3>
                <p className="text-sm text-muted-foreground">查看市场行情</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg shadow-sm p-4 border border-border">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-card-foreground">{t('navigation.wealth')}</h3>
                <p className="text-sm text-muted-foreground">理财产品</p>
              </div>
            </div>
          </div>
        </div>

        {/* 最近活动 */}
        <div className="bg-card rounded-lg shadow-sm p-6 border border-border">
          <h2 className="text-lg font-semibold text-card-foreground mb-4">最近活动</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <span className="text-primary text-sm font-medium">T</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">交易完成</p>
                  <p className="text-xs text-muted-foreground">2 小时前</p>
                </div>
              </div>
              <span className="text-sm text-green-500">+1,200</span>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-500/10 rounded-full flex items-center justify-center mr-3">
                  <span className="text-purple-500 text-sm font-medium">R</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">理财收益</p>
                  <p className="text-xs text-muted-foreground">昨天</p>
                </div>
              </div>
              <span className="text-sm text-green-500">+56.78</span>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
