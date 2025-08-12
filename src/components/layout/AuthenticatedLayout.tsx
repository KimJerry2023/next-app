'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import BottomTabBar from '@/components/navigation/BottomTabBar'


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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 顶部遮罩渐变 - 确保内容不会与顶部banner重叠 */}
      <div className="fixed top-0 left-0 right-0 h-20 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none z-40" />
      
      {/* 主要内容区域 - 移除底部内边距，让内容可以延伸到底部 */}
      <main className="relative pt-16 min-h-screen">
        {/* 内容容器 - 添加滚动和底部遮罩效果 */}
        <div className="h-screen overflow-y-auto pb-24">
          {children}
        </div>
      </main>
      
      {/* 底部遮罩渐变 - 创建从底部导航向上的渐隐效果 */}
      <div className="fixed bottom-20 left-0 right-0 h-20 bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-none z-40" />
      
      {/* 底部导航 */}
      <BottomTabBar />
    </div>
  )
}
