import { create } from 'zustand'
import i18n from '@/lib/i18n'

export interface User {
  id: string
  email?: string
  phone?: string
  name: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
  
  // Actions
  login: (identifier: string, password: string) => Promise<boolean>
  register: (identifier: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  clearError: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,

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
        ...(isEmail ? { email: identifier } : { phone: identifier })
      }
      
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
        ...(isEmail ? { email: identifier } : { phone: identifier })
      }
      
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
    set({ user: null, error: null })
  },

  clearError: () => {
    set({ error: null })
  }
}))
