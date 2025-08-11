'use client'

import Link from 'next/link'
import { useAuthStore } from '@/store/authStore'

export default function Home() {
  const { user, logout } = useAuthStore()

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">欢迎回来!</h1>
            <div className="space-y-2 mb-6">
              <p className="text-gray-600">
                <span className="font-medium">姓名:</span> {user.name}
              </p>
              {user.email && (
                <p className="text-gray-600">
                  <span className="font-medium">邮箱:</span> {user.email}
                </p>
              )}
              {user.phone && (
                <p className="text-gray-600">
                  <span className="font-medium">手机:</span> {user.phone}
                </p>
              )}
            </div>
            <button
              onClick={logout}
              className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              退出登录
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">欢迎使用</h1>
            <p className="text-lg text-gray-600">
              一个简洁优雅的应用体验
            </p>
          </div>
          
          <div className="space-y-4">
            <Link
              href="/login"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors block text-center font-medium"
            >
              登录
            </Link>
            
            <Link
              href="/register"
              className="w-full bg-white text-blue-600 py-3 px-4 rounded-md border-2 border-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors block text-center font-medium"
            >
              注册
            </Link>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              开始您的美好体验之旅
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
