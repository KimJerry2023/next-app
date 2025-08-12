// Form validation schemas for react-hook-form
import { validateEmail, validatePhone, validatePassword, validateName } from './validation'
import i18n from '@/lib/i18n'

// Custom validation functions for react-hook-form
export const formValidators = {
  identifier: (value: string) => {
    if (!value.trim()) {
      return i18n.t('validation.identifier_required')
    }
    
    // Check if it looks like an email
    if (value.includes('@')) {
      const emailResult = validateEmail(value)
      return emailResult.isValid ? true : emailResult.error
    }
    
    // Otherwise treat as phone
    const phoneResult = validatePhone(value)
    return phoneResult.isValid ? true : phoneResult.error
  },

  password: (value: string) => {
    const result = validatePassword(value)
    return result.isValid ? true : result.error
  },

  confirmPassword: (password: string) => (value: string) => {
    if (!value) {
      return i18n.t('validation.confirm_password_required')
    }
    
    if (password !== value) {
      return i18n.t('validation.passwords_not_match')
    }
    
    return true
  },

  name: (value: string) => {
    const result = validateName(value)
    return result.isValid ? true : result.error
  }
}

// Form data types
export interface LoginFormData {
  identifier: string
  password: string
}

export interface RegisterFormData {
  name: string
  identifier: string
  password: string
  confirmPassword: string
}
