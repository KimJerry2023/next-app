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
    <div className="w-full max-w-md mx-auto p-6 bg-card rounded-lg shadow-lg border border-border">
      <h2 className="text-2xl font-bold text-center text-card-foreground mb-6">{t('auth.login')}</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="identifier" className="block text-sm font-medium text-card-foreground mb-1">
            {t('auth.email_or_phone')}
          </label>
          <input
            type="text"
            id="identifier"
            {...register('identifier', {
              validate: formValidators.identifier,
              onChange: handleInputChange
            })}
            className={`w-full px-3 py-2 border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring ${
              errors.identifier ? 'border-destructive' : 'border-border'
            }`}
            placeholder={t('auth.email_or_phone_placeholder')}
          />
          {errors.identifier && (
            <p className="mt-1 text-sm text-destructive">{errors.identifier.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-card-foreground mb-1">
            {t('auth.password')}
          </label>
          <input
            type="password"
            id="password"
            {...register('password', {
              validate: formValidators.password,
              onChange: handleInputChange
            })}
            className={`w-full px-3 py-2 border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring ${
              errors.password ? 'border-destructive' : 'border-border'
            }`}
            placeholder={t('auth.password_placeholder_simple')}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>
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
          {isLoading ? t('auth.logging_in') : t('auth.login')}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          {t('auth.no_account')}{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-primary hover:text-primary/80 font-medium"
          >
            {t('auth.register_now')}
          </button>
        </p>
      </div>
    </div>
  )
}
