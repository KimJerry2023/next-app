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
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // 如果用户已登录，显示跳转状态
  if (user && user.token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">正在跳转到首页...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('common.welcome')}</h1>
            <p className="text-lg text-gray-600">
              {t('common.welcome_message')}
            </p>
          </div>
          
          <div className="space-y-4">
            <Link
              href="/login"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors block text-center font-medium"
            >
              {t('auth.login')}
            </Link>
            
            <Link
              href="/register"
              className="w-full bg-white text-blue-600 py-3 px-4 rounded-md border-2 border-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors block text-center font-medium"
            >
              {t('auth.register')}
            </Link>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              {t('common.start_journey')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
