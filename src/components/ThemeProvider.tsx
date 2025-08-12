'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
}

export function ThemeProvider({ 
  children, 
  defaultTheme = 'dark' // 默认使用暗黑模式
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>('dark') // 初始始终使用暗黑模式
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // 检查本地存储中的主题设置，如果没有则使用默认的暗黑模式
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme)
    } else {
      // 如果没有保存的主题或主题无效，使用默认的暗黑模式
      setTheme('dark')
      localStorage.setItem('theme', 'dark')
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) {
      // 确保在挂载前就设置好暗黑模式
      const root = document.documentElement
      root.classList.add('dark')
      root.classList.remove('light')
      return
    }

    // 保存主题设置到本地存储
    localStorage.setItem('theme', theme)

    // 更新 HTML 元素的类名
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  const value: ThemeContextType = {
    theme,
    setTheme,
    toggleTheme
  }

  // 避免服务端和客户端渲染不一致的问题，默认显示暗黑模式
  if (!mounted) {
    return (
      <div className="dark">
        {children}
      </div>
    )
  }

  return (
    <ThemeContext.Provider value={value}>
      <div className={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}
