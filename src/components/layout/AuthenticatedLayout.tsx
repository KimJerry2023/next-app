'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import BottomTabBar from '@/components/navigation/BottomTabBar'
import LanguageSwitcher from '@/components/LanguageSwitcher'

interface AuthenticatedLayoutProps {
  children: React.ReactNode
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const { user, isInitialized, initAuth } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    // 初始化认证状态
    if (!isInitialized) {
      initAuth()
    }
  }, [isInitialized, initAuth])

  useEffect(() => {
    // 如果已经初始化但没有用户信息（没有 token），重定向到登录页面
    if (isInitialized && (!user || !user.token)) {
      router.push('/login')
    }
  }, [user, isInitialized, router])

  // 如果还没有初始化或没有用户信息，显示加载状态（避免闪现）
  if (!isInitialized || !user || !user.token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 语言切换器 */}
      <div className="fixed top-4 right-4 z-40">
        <LanguageSwitcher />
      </div>
      
      {/* 主要内容区域 */}
      <main className="pb-16">
        {children}
      </main>
      
      {/* 底部导航 */}
      <BottomTabBar />
    </div>
  )
}
