# 主题系统使用指南

本项目实现了一套完整的双主题系统，支持暗黑模式和亮色模式，并使用 CSS 变量和 Tailwind CSS 进行管理。

## 功能特性

- ✅ 双主题支持（暗黑模式 + 亮色模式）
- ✅ 默认暗黑模式
- ✅ 主题状态持久化（localStorage）
- ✅ 平滑的主题切换动画
- ✅ TypeScript 支持
- ✅ 服务端渲染 (SSR) 兼容
- ✅ 无闪烁切换

## 主题颜色变量

### 背景颜色
- `background` - 主背景色
- `card` - 卡片背景色
- `secondary` - 次要背景色
- `accent` - 强调背景色
- `muted` - 静音背景色

### 文本颜色
- `foreground` - 主文本色
- `card-foreground` - 卡片文本色
- `secondary-foreground` - 次要文本色
- `accent-foreground` - 强调文本色
- `muted-foreground` - 静音文本色

### 功能颜色
- `primary` - 主要颜色（按钮、链接等）
- `primary-foreground` - 主要颜色的文本色
- `destructive` - 危险/错误颜色
- `destructive-foreground` - 危险颜色的文本色

### 交互颜色
- `border` - 边框颜色
- `input` - 输入框背景色
- `ring` - 焦点环颜色

## 使用方法

### 1. 基础使用

```tsx
// 使用主题 Hook
import { useTheme } from '@/components/ThemeProvider'

function MyComponent() {
  const { theme, setTheme, toggleTheme } = useTheme()
  
  return (
    <div className="bg-background text-foreground">
      <p>当前主题: {theme}</p>
      <button onClick={toggleTheme}>切换主题</button>
    </div>
  )
}
```

### 2. 主题切换组件

```tsx
import { ThemeToggle, SimpleThemeToggle } from '@/components/ThemeToggle'

// 图标样式的切换器
<ThemeToggle />

// 简单文本样式的切换器
<SimpleThemeToggle />
```

### 3. 在样式中使用主题变量

```tsx
// 推荐：使用 Tailwind 类名
<div className="bg-card text-card-foreground border border-border">
  <h2 className="text-primary">标题</h2>
  <p className="text-muted-foreground">描述文本</p>
  <button className="bg-primary text-primary-foreground hover:bg-primary/90">
    按钮
  </button>
</div>

// 或者直接使用 CSS 变量
<div style={{
  backgroundColor: 'rgb(var(--color-card))',
  color: 'rgb(var(--color-card-foreground))'
}}>
  内容
</div>
```

## 常用 Tailwind 类名

### 背景
- `bg-background` - 主背景
- `bg-card` - 卡片背景
- `bg-primary` - 主要背景
- `bg-secondary` - 次要背景
- `bg-accent` - 强调背景
- `bg-muted` - 静音背景

### 文本
- `text-foreground` - 主文本
- `text-card-foreground` - 卡片文本
- `text-primary` - 主要色文本
- `text-muted-foreground` - 静音文本
- `text-destructive` - 错误文本

### 边框
- `border-border` - 标准边框
- `border-primary` - 主要色边框
- `border-destructive` - 错误边框

### 焦点环
- `focus:ring-ring` - 焦点环颜色

## 自定义主题

如果需要修改主题颜色，可以编辑 `src/app/globals.css` 文件中的 CSS 变量：

```css
:root {
  /* 亮色主题 */
  --color-primary: 59 130 246; /* 修改主要颜色 */
  --color-background: 255 255 255;
  /* ... 其他颜色 */
}

.dark {
  /* 暗色主题 */
  --color-primary: 59 130 246; /* 修改主要颜色 */
  --color-background: 2 6 23;
  /* ... 其他颜色 */
}
```

## 示例页面

访问 `/theme-demo` 页面查看完整的主题效果演示。

## 注意事项

1. **服务端渲染**: 为避免水合不匹配，初始渲染时使用暗黑模式
2. **颜色格式**: CSS 变量使用 RGB 数值格式（如 `255 255 255`），便于在 Tailwind 中使用透明度
3. **平滑过渡**: 所有颜色变化都有 0.2s 的过渡动画
4. **持久化**: 主题选择会自动保存到 localStorage

## 兼容性

- ✅ Next.js 13+ App Router
- ✅ React 18+
- ✅ Tailwind CSS 4.x
- ✅ TypeScript 5+
- ✅ 现代浏览器（支持 CSS 变量）
