'use client'

import { useForm } from 'react-hook-form'
import { useAuthStore } from '@/store/authStore'
import { formValidators, LoginFormData } from '@/utils/formValidation'
import { useTranslation } from 'react-i18next'

interface LoginFormProps {
  onSwitchToRegister: () => void
}

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const { login, isLoading, error, clearError } = useAuthStore()
  const { t } = useTranslation('common')

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors
  } = useForm<LoginFormData>({
    mode: 'onChange'
  })

  const onSubmit = async (data: LoginFormData) => {
    await login(data.identifier, data.password)
  }

  const handleInputChange = () => {
    // Clear store error when user starts typing
    if (error) {
      clearError()
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{t('auth.login')}</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-1">
            {t('auth.email_or_phone')}
          </label>
          <input
            type="text"
            id="identifier"
            {...register('identifier', {
              validate: formValidators.identifier,
              onChange: handleInputChange
            })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.identifier ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={t('auth.email_or_phone_placeholder')}
          />
          {errors.identifier && (
            <p className="mt-1 text-sm text-red-600">{errors.identifier.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            {t('auth.password')}
          </label>
          <input
            type="password"
            id="password"
            {...register('password', {
              validate: formValidators.password,
              onChange: handleInputChange
            })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={t('auth.password_placeholder_simple')}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
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
          {isLoading ? t('auth.logging_in') : t('auth.login')}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          {t('auth.no_account')}{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            {t('auth.register_now')}
          </button>
        </p>
      </div>
    </div>
  )
}
