// Validation utilities for authentication forms
import i18n from '@/lib/i18n'

export interface ValidationResult {
  isValid: boolean
  error?: string
}

// Email validation
export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (!email.trim()) {
    return { isValid: false, error: i18n.t('validation.email_required') }
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: i18n.t('validation.email_invalid') }
  }
  
  return { isValid: true }
}

// Phone validation (supports Chinese mobile numbers)
export const validatePhone = (phone: string): ValidationResult => {
  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, '')
  
  if (!cleanPhone) {
    return { isValid: false, error: i18n.t('validation.phone_required') }
  }
  
  // Chinese mobile number pattern (11 digits starting with 1)
  const phoneRegex = /^1[3-9]\d{9}$/
  
  if (!phoneRegex.test(cleanPhone)) {
    return { isValid: false, error: i18n.t('validation.phone_invalid') }
  }
  
  return { isValid: true }
}

// Identifier validation (email or phone)
export const validateIdentifier = (identifier: string): ValidationResult => {
  if (!identifier.trim()) {
    return { isValid: false, error: i18n.t('validation.identifier_required') }
  }
  
  // Check if it looks like an email
  if (identifier.includes('@')) {
    return validateEmail(identifier)
  }
  
  // Otherwise treat as phone
  return validatePhone(identifier)
}

// Password validation
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: i18n.t('validation.password_required') }
  }
  
  if (password.length < 8 || password.length > 20) {
    return { isValid: false, error: i18n.t('validation.password_length') }
  }
  
  // Check for at least one number
  if (!/\d/.test(password)) {
    return { isValid: false, error: i18n.t('validation.password_number') }
  }
  
  // Check for at least one letter
  if (!/[a-zA-Z]/.test(password)) {
    return { isValid: false, error: i18n.t('validation.password_letter') }
  }
  
  // Check for at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { isValid: false, error: i18n.t('validation.password_special') }
  }
  
  return { isValid: true }
}

// Confirm password validation
export const validateConfirmPassword = (password: string, confirmPassword: string): ValidationResult => {
  if (!confirmPassword) {
    return { isValid: false, error: i18n.t('validation.confirm_password_required') }
  }
  
  if (password !== confirmPassword) {
    return { isValid: false, error: i18n.t('validation.passwords_not_match') }
  }
  
  return { isValid: true }
}

// Name validation
export const validateName = (name: string): ValidationResult => {
  if (!name.trim()) {
    return { isValid: false, error: i18n.t('validation.name_required') }
  }
  
  if (name.trim().length < 2) {
    return { isValid: false, error: i18n.t('validation.name_min_length') }
  }
  
  return { isValid: true }
}

// Verification code validation (6 digits)
export const validateVerificationCode = (code: string): ValidationResult => {
  if (!code.trim()) {
    return { isValid: false, error: i18n.t('validation.code_required') }
  }
  
  const codeRegex = /^\d{6}$/
  
  if (!codeRegex.test(code)) {
    return { isValid: false, error: i18n.t('validation.code_invalid') }
  }
  
  return { isValid: true }
}

// Invitation code validation (optional)
export const validateInvitationCode = (code: string): ValidationResult => {
  // Invitation code is optional, so empty is valid
  if (!code.trim()) {
    return { isValid: true }
  }
  
  // Add specific validation rules for invitation code if needed
  // For now, just check it's not empty spaces
  if (code.trim().length < 1) {
    return { isValid: false, error: i18n.t('validation.invitation_code_invalid') }
  }
  
  return { isValid: true }
}
