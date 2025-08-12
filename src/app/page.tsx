'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/store/authStore'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { user, isInitialized, initAuth } = useAuthStore()
  const { t } = useTranslation('common')
  const router = useRouter()

  useEffect(() => {
    // 初始化认证状态
    if (!isInitialized) {
      initAuth()
    }
  }, [isInitialized, initAuth])

  useEffect(() => {
    // 如果用户已登录且有token，自动跳转到首页
    if (isInitialized && user && user.token) {
      router.push('/home')
    }
  }, [user, isInitialized, router])

  // 如果还没初始化，显示加载状态
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  // 如果用户已登录，显示跳转状态
  if (user && user.token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">正在跳转到首页...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-20">
      <div className="max-w-md w-full bg-card rounded-lg shadow-lg p-8 border border-border">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-card-foreground mb-4">{t('common.welcome')}</h1>
            <p className="text-lg text-muted-foreground">
              {t('common.welcome_message')}
            </p>
          </div>
          
          <div className="space-y-4">
            <Link
              href="/login"
              className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors block text-center font-medium"
            >
              {t('auth.login')}
            </Link>
            
            <Link
              href="/register"
              className="w-full bg-card text-primary py-3 px-4 rounded-md border-2 border-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors block text-center font-medium"
            >
              {t('auth.register')}
            </Link>
          </div>
          
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              {t('common.start_journey')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
