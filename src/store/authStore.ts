import { create } from 'zustand'
import i18n from '@/lib/i18n'

export interface User {
  id: string
  email?: string
  phone?: string
  name: string
  token?: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
  isInitialized: boolean
  
  // Actions
  login: (identifier: string, password: string) => Promise<boolean>
  register: (identifier: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  clearError: () => void
  initAuth: () => void
}

// 存储和获取用户信息的辅助函数
const getStoredUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('user')
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch {
        localStorage.removeItem('user')
      }
    }
  }
  return null
}

const setStoredUser = (user: User | null) => {
  if (typeof window !== 'undefined') {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,
  isInitialized: false,

  login: async (identifier: string, password: string) => {
    set({ isLoading: true, error: null })
    
    try {
      // Simulate API call - replace with actual authentication logic
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock successful login
      const isEmail = identifier.includes('@')
      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: 'User',
        token: 'mock_token_' + Math.random().toString(36).substr(2, 9),
        ...(isEmail ? { email: identifier } : { phone: identifier })
      }
      
      setStoredUser(user)
      set({ user, isLoading: false })
      return true
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : i18n.t('validation.login_failed'),
        isLoading: false 
      })
      return false
    }
  },

  register: async (identifier: string, password: string, name: string) => {
    set({ isLoading: true, error: null })
    
    try {
      // Simulate API call - replace with actual registration logic
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock successful registration
      const isEmail = identifier.includes('@')
      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        token: 'mock_token_' + Math.random().toString(36).substr(2, 9),
        ...(isEmail ? { email: identifier } : { phone: identifier })
      }
      
      setStoredUser(user)
      set({ user, isLoading: false })
      return true
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : i18n.t('validation.register_failed'),
        isLoading: false 
      })
      return false
    }
  },

  logout: () => {
    setStoredUser(null)
    set({ user: null, error: null })
  },

  clearError: () => {
    set({ error: null })
  },

  initAuth: () => {
    const storedUser = getStoredUser()
    set({ user: storedUser, isInitialized: true })
  }
}))
