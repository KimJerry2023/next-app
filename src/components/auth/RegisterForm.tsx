'use client'

import { useForm } from 'react-hook-form'
import { useCreateMember } from '@/hooks/api/useMembers'
import { formValidators, RegisterFormData } from '@/utils/formValidation'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

interface RegisterFormProps {
  onSwitchToLogin: () => void
  onRegisterSuccess?: () => void
}

export default function RegisterForm({ onSwitchToLogin, onRegisterSuccess }: RegisterFormProps) {
  const { trigger: createMember, isMutating: isLoading } = useCreateMember()
  const { t } = useTranslation('common')
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm<RegisterFormData>({
    mode: 'onChange'
  })

  const onSubmit = async (data: RegisterFormData) => {
    setSubmitError(null)
    
    try {
      const result = await createMember({
        country: 'CN', // 默认中国
        areaCode: '+86', // 默认中国区号
        email: data.email,
        password: data.password,
        code: data.code,
        invitationCode: data.invitationCode || undefined
      })
      
      // 注册成功后的处理
      console.log('注册成功', result)
      if (onRegisterSuccess) {
        onRegisterSuccess()
      }
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : '注册失败，请重试')
    }
  }

  const handleInputChange = () => {
    // Clear submit error when user starts typing
    if (submitError) {
      setSubmitError(null)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-card rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-card-foreground mb-6">{t('auth.register')}</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className={`block text-sm font-medium mb-1 ${
            errors.email ? 'text-red-500' : 'text-card-foreground'
          }`}>
            {t('auth.email')} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            {...register('email', {
              validate: formValidators.email,
              onChange: handleInputChange
            })}
            className={`w-full px-3 py-2 border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-blue-300 ${
              errors.email ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder={t('auth.email_placeholder')}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className={`block text-sm font-medium mb-1 ${
            errors.password ? 'text-red-500' : 'text-card-foreground'
          }`}>
            {t('auth.password')} <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="password"
            {...register('password', {
              validate: formValidators.password,
              onChange: handleInputChange
            })}
            className={`w-full px-3 py-2 border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-blue-300 ${
              errors.password ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder={t('auth.password_placeholder')}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
          )}
          <p className="mt-1 text-xs text-muted-foreground">
            8-20位，必须包含数字、字母和特殊字符
          </p>
        </div>

        <div>
          <label htmlFor="code" className={`block text-sm font-medium mb-1 ${
            errors.code ? 'text-red-500' : 'text-card-foreground'
          }`}>
            {t('auth.verification_code')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="code"
            maxLength={6}
            {...register('code', {
              validate: formValidators.verificationCode,
              onChange: handleInputChange
            })}
            className={`w-full px-3 py-2 border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-blue-300 ${
              errors.code ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="请输入6位验证码"
          />
          {errors.code && (
            <p className="mt-1 text-sm text-red-500">{errors.code.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="invitationCode" className={`block text-sm font-medium mb-1 ${
            errors.invitationCode ? 'text-red-500' : 'text-card-foreground'
          }`}>
            {t('auth.invitation_code')}
          </label>
          <input
            type="text"
            id="invitationCode"
            {...register('invitationCode', {
              validate: (value) => formValidators.invitationCode(value || ''),
              onChange: handleInputChange
            })}
            className={`w-full px-3 py-2 border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-blue-300 ${
              errors.invitationCode ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="请输入邀请码（可选）"
          />
          {errors.invitationCode && (
            <p className="mt-1 text-sm text-red-500">{errors.invitationCode.message}</p>
          )}
        </div>

        {submitError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-500">{submitError}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? t('auth.registering') : t('auth.register')}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          {t('auth.already_have_account')}{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-primary hover:text-primary/80 font-medium"
          >
            {t('auth.login_now')}
          </button>
        </p>
      </div>
    </div>
  )
}
