'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useTranslation } from 'react-i18next'
import RegisterForm from '@/components/auth/RegisterForm'

export default function RegisterPage() {
  const router = useRouter()
  const { t } = useTranslation('common')
  const { user } = useAuthStore()

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])

  const handleSwitchToLogin = () => {
    router.push('/login')
  }

  const handleRegisterSuccess = () => {
    router.push('/')
  }

  // Don't render if user is logged in (will redirect)
  if (user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Link 
            href="/"
            className="text-primary hover:text-primary/80 text-sm font-medium"
          >
            ← {t('navigation.home')}
          </Link>
        </div>
        
        <RegisterForm 
          onSwitchToLogin={handleSwitchToLogin} 
          onRegisterSuccess={handleRegisterSuccess}
        />
      </div>
    </div>
  )
}
