# Next.js 认证系统

这是一个使用 Next.js、Zustand 和 TypeScript 构建的完整认证系统。

## 功能特点

- ✅ **用户注册和登录**
- ✅ **多种登录方式**: 支持邮箱或手机号登录
- ✅ **密码验证**: 8-16位，必须同时包含数字和字母
- ✅ **实时表单验证**: 即时反馈用户输入错误
- ✅ **状态管理**: 使用 Zustand 进行全局状态管理
- ✅ **现代化 UI**: 使用 Tailwind CSS 设计的响应式界面
- ✅ **TypeScript**: 完整的类型安全

## 项目结构

```
src/
├── app/
│   ├── page.tsx              # 主页面（显示认证界面）
│   ├── layout.tsx            # 根布局
│   └── globals.css           # 全局样式
├── components/
│   └── auth/
│       ├── AuthContainer.tsx  # 认证容器组件
│       ├── LoginForm.tsx     # 登录表单
│       └── RegisterForm.tsx  # 注册表单
├── store/
│   └── authStore.ts          # Zustand 认证状态管理
└── utils/
    └── validation.ts         # 表单验证工具
```

## 技术栈

- **Next.js 15**: React 框架
- **TypeScript**: 类型安全
- **Zustand**: 轻量级状态管理
- **Tailwind CSS**: 实用优先的 CSS 框架

## 快速开始

1. **安装依赖**
   ```bash
   npm install
   ```

2. **启动开发服务器**
   ```bash
   npm run dev
   ```

3. **访问应用**
   打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 使用说明

### 注册新用户

1. 点击"立即注册"切换到注册表单
2. 填写以下信息：
   - **姓名**: 至少2个字符
   - **邮箱或手机号**: 支持有效邮箱或中国大陆手机号
   - **密码**: 8-16位，必须包含数字和字母
   - **确认密码**: 与密码一致

### 用户登录

1. 在登录表单中输入：
   - **邮箱或手机号**: 注册时使用的邮箱或手机号
   - **密码**: 注册时设置的密码

### 验证规则

#### 邮箱验证
- 必须符合标准邮箱格式 (例: user@example.com)

#### 手机号验证  
- 支持中国大陆手机号格式
- 11位数字，以1开头，第二位为3-9

#### 密码验证
- 长度: 8-16位
- 必须包含: 至少一个数字和一个字母
- 示例有效密码: `password123`, `myPass456`

## 状态管理

使用 Zustand 管理认证状态，包括：

```typescript
interface AuthState {
  user: User | null        // 当前用户信息
  isLoading: boolean      // 加载状态
  error: string | null    // 错误信息
  
  login: (identifier: string, password: string) => Promise<void>
  register: (identifier: string, password: string, name: string) => Promise<void>
  logout: () => void
  clearError: () => void
}
```

## 自定义开发

### 集成真实 API

目前使用模拟 API，要集成真实后端：

1. 修改 `src/store/authStore.ts` 中的 `login` 和 `register` 方法
2. 替换模拟的 `setTimeout` 调用为真实的 API 请求
3. 处理真实的错误响应

### 添加新验证规则

在 `src/utils/validation.ts` 中添加新的验证函数：

```typescript
export const validateCustomField = (value: string): ValidationResult => {
  // 自定义验证逻辑
  return { isValid: true }
}
```

### 扩展用户模型

在 `src/store/authStore.ts` 中修改 `User` 接口：

```typescript
export interface User {
  id: string
  email?: string
  phone?: string
  name: string
  // 添加新字段
  avatar?: string
  role?: string
}
```

## 部署

### Vercel 部署

1. 推送代码到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署完成

### 其他部署平台

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 开发最佳实践

1. **类型安全**: 所有组件和函数都有完整的 TypeScript 类型
2. **错误处理**: 完善的表单验证和错误提示
3. **用户体验**: 加载状态和即时反馈
4. **代码组织**: 清晰的文件结构和关注点分离
5. **响应式设计**: 适配各种屏幕尺寸

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！