'use client'

import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export default function AuthContainer() {
  const [isLogin, setIsLogin] = useState(true)
  const { user, logout } = useAuthStore()

  // If user is logged in, show user info and logout button
  if (user) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">欢迎回来!</h2>
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
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {isLogin ? (
        <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
      ) : (
        <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
      )}
    </div>
  )
}
