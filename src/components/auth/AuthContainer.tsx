'use client'

import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { useTranslation } from 'react-i18next'

export default function AuthContainer() {
  const [isLogin, setIsLogin] = useState(true)
  const { user, logout } = useAuthStore()
  const { t } = useTranslation('common')

  // If user is logged in, show user info and logout button
  if (user) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-card rounded-lg shadow-lg border border-border">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-card-foreground mb-4">{t('common.welcome_back')}</h2>
          <div className="space-y-2 mb-6">
            <p className="text-muted-foreground">
              <span className="font-medium">{t('common.name')}:</span> {user.name}
            </p>
            {user.email && (
              <p className="text-muted-foreground">
                <span className="font-medium">{t('common.email')}:</span> {user.email}
              </p>
            )}
            {user.phone && (
              <p className="text-muted-foreground">
                <span className="font-medium">{t('common.phone')}:</span> {user.phone}
              </p>
            )}
          </div>
          <button
            onClick={logout}
            className="bg-destructive text-destructive-foreground py-2 px-4 rounded-md hover:bg-destructive/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
          >
            {t('common.logout')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {isLogin ? (
        <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
      ) : (
        <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
      )}
    </div>
  )
}
