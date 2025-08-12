'use client'

import Link from 'next/link'
import { useAuthStore } from '@/store/authStore'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { user, logout } = useAuthStore()
  const { t } = useTranslation('common')

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('common.welcome_back')}</h1>
            <div className="space-y-2 mb-6">
              <p className="text-gray-600">
                <span className="font-medium">{t('common.name')}:</span> {user.name}
              </p>
              {user.email && (
                <p className="text-gray-600">
                  <span className="font-medium">{t('common.email')}:</span> {user.email}
                </p>
              )}
              {user.phone && (
                <p className="text-gray-600">
                  <span className="font-medium">{t('common.phone')}:</span> {user.phone}
                </p>
              )}
            </div>
            <button
              onClick={logout}
              className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              {t('common.logout')}
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
