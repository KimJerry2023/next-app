'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { validateIdentifier, validatePassword, validateConfirmPassword, validateName } from '@/utils/validation'
import { useTranslation } from 'react-i18next'

export default function RegisterPage() {
  const router = useRouter()
  const { t } = useTranslation('common')
  const [formData, setFormData] = useState({
    name: '',
    identifier: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const { user, register, isLoading, error, clearError } = useAuthStore()

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

    const nameValidation = validateName(formData.name)
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.error!
    }

    const identifierValidation = validateIdentifier(formData.identifier)
    if (!identifierValidation.isValid) {
      newErrors.identifier = identifierValidation.error!
    }

    const passwordValidation = validatePassword(formData.password)
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error!
    }

    const confirmPasswordValidation = validateConfirmPassword(formData.password, formData.confirmPassword)
    if (!confirmPasswordValidation.isValid) {
      newErrors.confirmPassword = confirmPasswordValidation.error!
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const success = await register(formData.identifier, formData.password, formData.name)
    if (success) {
      router.push('/')
    }
  }

  // Don't render if user is logged in (will redirect)
  if (user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-20">
      <div className="w-full max-w-md bg-card rounded-lg shadow-lg p-8 border border-border">
        <div className="text-center mb-6">
          <Link 
            href="/"
            className="text-primary hover:text-primary/80 text-sm font-medium"
          >
            ← {t('navigation.home')}
          </Link>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-card-foreground mb-6">{t('auth.register')}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-card-foreground mb-1">
              {t('common.name')}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring ${
                errors.name ? 'border-destructive' : 'border-border'
              }`}
              placeholder={t('auth.name_placeholder') || '请输入您的姓名'}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="identifier" className="block text-sm font-medium text-card-foreground mb-1">
              {t('auth.email_or_phone') || '邮箱或手机号'}
            </label>
            <input
              type="text"
              id="identifier"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring ${
                errors.identifier ? 'border-destructive' : 'border-border'
              }`}
              placeholder={t('auth.email_or_phone_placeholder') || '请输入邮箱或手机号'}
            />
            {errors.identifier && (
              <p className="mt-1 text-sm text-destructive">{errors.identifier}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-card-foreground mb-1">
              {t('auth.password')}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring ${
                errors.password ? 'border-destructive' : 'border-border'
              }`}
              placeholder={t('auth.password_placeholder') || '8-16位，包含数字和字母'}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-destructive">{errors.password}</p>
            )}
            <p className="mt-1 text-xs text-muted-foreground">
              {t('auth.password_requirements') || '密码需要8-16位，同时包含数字和字母'}
            </p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-card-foreground mb-1">
              {t('auth.confirm_password')}
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring ${
                errors.confirmPassword ? 'border-destructive' : 'border-border'
              }`}
              placeholder={t('auth.confirm_password_placeholder') || '请再次输入密码'}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-destructive">{errors.confirmPassword}</p>
            )}
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? `${t('auth.register')}${t('common.loading')}` : t('auth.register')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            {t('auth.already_have_account')}{' '}
            <Link
              href="/login"
              className="text-primary hover:text-primary/80 font-medium"
            >
              {t('auth.login')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
