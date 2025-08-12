'use client'

import React from 'react'
import { useTheme } from './ThemeProvider'

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex h-10 w-10 items-center justify-center rounded-lg
        bg-card border border-border
        text-card-foreground
        hover:bg-accent hover:text-accent-foreground
        focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
        transition-all duration-200 ease-in-out
        ${className}
      `}
      aria-label={`切换到${theme === 'light' ? '暗黑' : '明亮'}模式`}
      title={`切换到${theme === 'light' ? '暗黑' : '明亮'}模式`}
    >
      {theme === 'light' ? (
        // 月亮图标 (暗黑模式)
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ) : (
        // 太阳图标 (明亮模式)
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      )}
    </button>
  )
}

// 简化版本的主题切换组件
export function SimpleThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={`
        px-3 py-1 text-sm rounded-md
        bg-secondary text-secondary-foreground
        hover:bg-accent hover:text-accent-foreground
        border border-border
        transition-colors duration-200
        ${className}
      `}
    >
      {theme === 'light' ? '🌙 暗黑' : '☀️ 明亮'}
    </button>
  )
}
