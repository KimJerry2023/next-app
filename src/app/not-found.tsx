'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function NotFound() {
  const { t } = useTranslation('common')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* 404 图标 */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-blue-600 mb-4">404</div>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
        </div>

        {/* 错误信息 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {t('error.page_not_found')}
          </h1>
          <p className="text-gray-600 mb-6">
            {t('error.page_not_found_description')}
          </p>
        </div>

        {/* 操作按钮 */}
        <div className="space-y-4">
          <Link
            href="/"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors block text-center font-medium"
          >
            {t('error.back_to_home')}
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="w-full bg-white text-blue-600 py-3 px-4 rounded-md border-2 border-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
          >
            {t('error.go_back')}
          </button>
        </div>

        {/* 帮助信息 */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            {t('error.need_help')}
          </p>
        </div>
      </div>
    </div>
  )
}
