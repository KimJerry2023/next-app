'use client'

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorPageProps) {
  const { t } = useTranslation('common')

  useEffect(() => {
    // 记录错误到控制台（或发送到错误报告服务）
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* 错误图标 */}
        <div className="mb-8">
          <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.08 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
        </div>

        {/* 错误信息 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {t('error.something_went_wrong')}
          </h1>
          <p className="text-gray-600 mb-6">
            {t('error.error_description')}
          </p>
          
          {/* 开发环境下显示错误详情 */}
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6 text-left">
              <h3 className="text-sm font-medium text-red-800 mb-2">
                {t('error.error_details')}:
              </h3>
              <pre className="text-xs text-red-700 whitespace-pre-wrap break-words">
                {error.message}
              </pre>
              {error.digest && (
                <p className="text-xs text-red-600 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}
        </div>

        {/* 操作按钮 */}
        <div className="space-y-4">
          <button
            onClick={reset}
            className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors font-medium"
          >
            {t('error.try_again')}
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-white text-red-600 py-3 px-4 rounded-md border-2 border-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors font-medium"
          >
            {t('error.back_to_home')}
          </button>
        </div>

        {/* 帮助信息 */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            {t('error.persistent_problem')}
          </p>
        </div>
      </div>
    </div>
  )
}
