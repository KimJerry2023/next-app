'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { validateIdentifier, validatePassword } from '@/utils/validation'
import { useTranslation } from 'react-i18next'

export default function LoginPage() {
  const router = useRouter()
  const { t } = useTranslation('common')
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const { user, login, isLoading, error, clearError } = useAuthStore()

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    
    // Clear store error
    if (error) {
      clearError()
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    const identifierValidation = validateIdentifier(formData.identifier)
    if (!identifierValidation.isValid) {
      newErrors.identifier = identifierValidation.error!
    }

    const passwordValidation = validatePassword(formData.password)
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error!
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const success = await login(formData.identifier, formData.password)
    if (success) {
      router.push('/')
    }
  }

  // Don't render if user is logged in (will redirect)
  if (user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-6">
          <Link 
            href="/"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            ← {t('navigation.home')}
          </Link>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{t('auth.login')}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-1">
              {t('auth.email')}
            </label>
            <input
              type="text"
              id="identifier"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.identifier ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={t('auth.email')}
            />
            {errors.identifier && (
              <p className="mt-1 text-sm text-red-600">{errors.identifier}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              {t('auth.password')}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={t('auth.password')}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? t('common.loading') : t('auth.login')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {t('auth.no_account')}{' '}
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {t('auth.register')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
