// Validation utilities for authentication forms

export interface ValidationResult {
  isValid: boolean
  error?: string
}

// Email validation
export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (!email.trim()) {
    return { isValid: false, error: '邮箱不能为空' }
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: '请输入有效的邮箱地址' }
  }
  
  return { isValid: true }
}

// Phone validation (supports Chinese mobile numbers)
export const validatePhone = (phone: string): ValidationResult => {
  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, '')
  
  if (!cleanPhone) {
    return { isValid: false, error: '手机号不能为空' }
  }
  
  // Chinese mobile number pattern (11 digits starting with 1)
  const phoneRegex = /^1[3-9]\d{9}$/
  
  if (!phoneRegex.test(cleanPhone)) {
    return { isValid: false, error: '请输入有效的手机号码' }
  }
  
  return { isValid: true }
}

// Identifier validation (email or phone)
export const validateIdentifier = (identifier: string): ValidationResult => {
  if (!identifier.trim()) {
    return { isValid: false, error: '请输入邮箱或手机号' }
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
    return { isValid: false, error: '密码不能为空' }
  }
  
  if (password.length < 8 || password.length > 16) {
    return { isValid: false, error: '密码长度必须为8-16位' }
  }
  
  // Check for at least one number
  if (!/\d/.test(password)) {
    return { isValid: false, error: '密码必须包含至少一个数字' }
  }
  
  // Check for at least one letter
  if (!/[a-zA-Z]/.test(password)) {
    return { isValid: false, error: '密码必须包含至少一个字母' }
  }
  
  return { isValid: true }
}

// Confirm password validation
export const validateConfirmPassword = (password: string, confirmPassword: string): ValidationResult => {
  if (!confirmPassword) {
    return { isValid: false, error: '请确认密码' }
  }
  
  if (password !== confirmPassword) {
    return { isValid: false, error: '两次输入的密码不一致' }
  }
  
  return { isValid: true }
}

// Name validation
export const validateName = (name: string): ValidationResult => {
  if (!name.trim()) {
    return { isValid: false, error: '姓名不能为空' }
  }
  
  if (name.trim().length < 2) {
    return { isValid: false, error: '姓名至少需要2个字符' }
  }
  
  return { isValid: true }
}
