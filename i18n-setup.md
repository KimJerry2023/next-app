# 多语言国际化 (i18n) 设置指南

## 已完成的功能

✅ **多语言支持**：支持中文(zh)、英文(en)、日语(ja)  
✅ **默认语言**：中文为默认显示语言  
✅ **全局语言切换器**：位于页面右上角的下拉选择器  
✅ **本地存储**：语言选择会保存到localStorage中  
✅ **实时切换**：无需刷新页面即可切换语言  

## 文件结构

```
src/
├── lib/
│   └── i18n.ts                  # i18n 配置和翻译资源
├── components/
│   ├── I18nProvider.tsx         # i18n Provider 组件
│   └── LanguageSwitcher.tsx     # 语言切换器组件
└── app/
    ├── layout.tsx               # 集成了 i18n Provider 和语言切换器
    ├── page.tsx                 # 首页(已翻译)
    └── login/
        └── page.tsx             # 登录页面(已翻译)
```

## 核心组件说明

### 1. i18n 配置 (`src/lib/i18n.ts`)
- 使用 `react-i18next` 库
- 内置翻译资源，包含中文、英文、日语
- 支持命名空间划分(common、auth、navigation等)

### 2. 语言切换器 (`src/components/LanguageSwitcher.tsx`)
- 美观的下拉式选择器
- 显示国旗和语言名称
- 支持localStorage保存用户选择
- 响应式设计，适配移动端

### 3. I18n Provider (`src/components/I18nProvider.tsx`)
- 提供全局i18n上下文
- 处理语言初始化和切换

## 如何使用

### 在组件中使用翻译
```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation('common');
  
  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <button>{t('auth.login')}</button>
    </div>
  );
}
```

### 添加新翻译
在 `src/lib/i18n.ts` 中的 `resources` 对象中添加新的翻译键值对：

```typescript
const resources = {
  zh: {
    common: {
      // 添加新的中文翻译
      new_key: "新的翻译"
    }
  },
  en: {
    common: {
      // 添加对应的英文翻译
      new_key: "New Translation"
    }
  },
  ja: {
    common: {
      // 添加对应的日语翻译
      new_key: "新しい翻訳"
    }
  }
};
```

## 功能特点

1. **零配置使用**：语言切换器已集成到全局layout中
2. **持久化存储**：用户的语言选择会保存在localStorage中
3. **优雅的UI**：美观的下拉菜单，带有国旗图标
4. **类型安全**：完整的TypeScript支持
5. **响应式设计**：在所有设备上都能良好工作
6. **无刷新切换**：语言切换无需页面刷新

## 测试方式

1. 启动开发服务器：`npm run dev`
2. 访问 http://localhost:3000
3. 点击右上角的语言切换器
4. 选择不同语言观察页面内容变化
5. 刷新页面确认语言选择被保存

## 当前已翻译的页面

- ✅ 首页 (`/`)
- ✅ 登录页面 (`/login`)
- 🔄 注册页面 (待完善)
- 🔄 其他页面 (待完善)

## 后续扩展

- 可以轻松添加更多语言
- 可以从外部API加载翻译资源
- 支持复数形式和插值
- 可以添加RTL语言支持
