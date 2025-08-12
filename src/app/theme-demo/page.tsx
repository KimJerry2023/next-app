'use client'

import { useTheme } from '@/components/ThemeProvider'
import { ThemeToggle, SimpleThemeToggle } from '@/components/ThemeToggle'

export default function ThemeDemoPage() {
  const { theme } = useTheme()

  return (
    <div className="min-h-screen bg-background p-8 pt-20">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 页面标题 */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">主题演示页面</h1>
          <p className="text-lg text-muted-foreground">
            当前主题：{theme === 'dark' ? '暗黑模式' : '亮色模式'}
          </p>
        </div>

        {/* 主题切换器 */}
        <div className="flex justify-center gap-4">
          <ThemeToggle />
          <SimpleThemeToggle />
        </div>

        {/* 卡片示例 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-card-foreground mb-3">基础卡片</h3>
            <p className="text-muted-foreground mb-4">
              这是一个使用主题变量的基础卡片组件。
            </p>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
              主要按钮
            </button>
          </div>

          <div className="bg-secondary border border-border rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-secondary-foreground mb-3">次要卡片</h3>
            <p className="text-muted-foreground mb-4">
              这是一个使用次要背景色的卡片组件。
            </p>
            <button className="bg-accent text-accent-foreground px-4 py-2 rounded-md hover:bg-accent/80 transition-colors">
              次要按钮
            </button>
          </div>

          <div className="bg-accent border border-border rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-accent-foreground mb-3">强调卡片</h3>
            <p className="text-muted-foreground mb-4">
              这是一个使用强调背景色的卡片组件。
            </p>
            <button className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md hover:bg-destructive/90 transition-colors">
              危险按钮
            </button>
          </div>
        </div>

        {/* 表单示例 */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <h3 className="text-2xl font-semibold text-card-foreground mb-6">表单示例</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-2">
                邮箱地址
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="请输入邮箱地址"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-card-foreground mb-2">
                消息内容
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="请输入消息内容"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              >
                提交
              </button>
              <button
                type="button"
                className="bg-muted text-muted-foreground px-6 py-2 rounded-md hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              >
                取消
              </button>
            </div>
          </form>
        </div>

        {/* 颜色调色板 */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <h3 className="text-2xl font-semibold text-card-foreground mb-6">颜色调色板</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="bg-background border border-border h-20 rounded-md"></div>
              <p className="text-sm text-muted-foreground">Background</p>
            </div>
            <div className="space-y-2">
              <div className="bg-card border border-border h-20 rounded-md"></div>
              <p className="text-sm text-muted-foreground">Card</p>
            </div>
            <div className="space-y-2">
              <div className="bg-primary h-20 rounded-md"></div>
              <p className="text-sm text-muted-foreground">Primary</p>
            </div>
            <div className="space-y-2">
              <div className="bg-secondary h-20 rounded-md"></div>
              <p className="text-sm text-muted-foreground">Secondary</p>
            </div>
            <div className="space-y-2">
              <div className="bg-accent h-20 rounded-md"></div>
              <p className="text-sm text-muted-foreground">Accent</p>
            </div>
            <div className="space-y-2">
              <div className="bg-muted h-20 rounded-md"></div>
              <p className="text-sm text-muted-foreground">Muted</p>
            </div>
            <div className="space-y-2">
              <div className="bg-destructive h-20 rounded-md"></div>
              <p className="text-sm text-muted-foreground">Destructive</p>
            </div>
            <div className="space-y-2">
              <div className="border-2 border-border h-20 rounded-md"></div>
              <p className="text-sm text-muted-foreground">Border</p>
            </div>
          </div>
        </div>

        {/* 文本示例 */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <h3 className="text-2xl font-semibold text-card-foreground mb-6">文本样式</h3>
          <div className="space-y-3">
            <p className="text-foreground text-lg">主要文本 (foreground)</p>
            <p className="text-muted-foreground">次要文本 (muted-foreground)</p>
            <p className="text-primary">主要色彩文本 (primary)</p>
            <p className="text-destructive">错误文本 (destructive)</p>
            <p className="text-card-foreground">卡片文本 (card-foreground)</p>
          </div>
        </div>
      </div>
    </div>
  )
}
