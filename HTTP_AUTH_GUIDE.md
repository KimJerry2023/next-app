# HTTP客户端 & 鉴权系统使用指南

本项目已从axios迁移到基于原生fetch的HTTP客户端，并集成了完整的鉴权中间件系统。

## 🚀 主要特性

- ✅ **原生fetch**: 替代axios，减少依赖，更好的TypeScript支持
- ✅ **鉴权中间件**: 自动添加Authorization头，处理Token刷新
- ✅ **错误处理**: 统一的错误拦截和处理机制
- ✅ **自动重试**: 支持请求失败重试机制
- ✅ **超时控制**: 可配置的请求超时时间
- ✅ **TypeScript**: 完整的类型定义支持
- ✅ **中间件系统**: 灵活的请求/响应拦截器

## 📦 核心模块

### 1. HTTP客户端 (`src/lib/http/index.ts`)

基于fetch的HTTP客户端，提供与axios类似的API接口。

```typescript
import { http } from '@/lib/http';

// GET请求
const users = await http.get('/users');

// POST请求
const newUser = await http.post('/users', {
  name: 'John Doe',
  email: 'john@example.com'
});

// PUT请求
const updatedUser = await http.put('/users/1', {
  name: 'Jane Doe'
});

// DELETE请求
await http.delete('/users/1');
```

### 2. 鉴权管理器 (`src/lib/auth/index.ts`)

完整的鉴权管理系统，支持Token存储、刷新和权限检查。

```typescript
import { authManager } from '@/lib/auth';

// 登录
authManager.loginWithUser(token, user);

// 检查登录状态
const isLoggedIn = authManager.isAuthenticated();

// 获取当前用户
const currentUser = authManager.getCurrentUser();

// 权限检查
const canDelete = authManager.hasPermission('delete:posts');
const isAdmin = authManager.hasRole('admin');

// 登出
authManager.fullLogout();
```

## 🔧 配置和使用

### HTTP客户端配置

HTTP客户端支持以下配置选项：

```typescript
interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  params?: Record<string, any>;
  timeout?: number;        // 超时时间(ms)
  retries?: number;        // 重试次数
  retryDelay?: number;     // 重试延迟(ms)
}
```

### 鉴权Token格式

```typescript
interface AuthToken {
  accessToken: string;     // 访问Token
  refreshToken?: string;   // 刷新Token
  expiresAt?: number;      // 过期时间戳
  tokenType?: string;      // Token类型，默认'Bearer'
}
```

### 用户信息格式

```typescript
interface AuthUser {
  id: string | number;
  username?: string;
  email?: string;
  name?: string;
  avatar?: string;
  roles?: string[];        // 用户角色
  permissions?: string[];  // 用户权限
}
```

## 🔐 鉴权流程

### 1. 用户登录

```typescript
// 模拟登录流程
const loginUser = async (credentials) => {
  try {
    // 调用登录API
    const response = await http.post('/auth/login', credentials);
    
    // 获取Token和用户信息
    const { token, user } = response.data;
    
    // 保存到鉴权管理器
    authManager.loginWithUser(token, user);
    
    console.log('登录成功');
  } catch (error) {
    console.error('登录失败:', error);
  }
};
```

### 2. 自动鉴权

HTTP客户端会自动在每个请求中添加Authorization头：

```http
Authorization: Bearer your_access_token_here
```

### 3. Token刷新

当Token即将过期或收到401错误时，系统会自动尝试刷新Token：

```typescript
// Token刷新逻辑（需要实现具体API调用）
const refreshToken = async () => {
  const refreshToken = authManager.getToken()?.refreshToken;
  
  if (refreshToken) {
    const response = await http.post('/auth/refresh', { refreshToken });
    const newToken = response.data;
    authManager.login(newToken);
    return newToken;
  }
  
  // 刷新失败，执行登出
  authManager.fullLogout();
  return null;
};
```

## 🛠 中间件系统

### 请求中间件

在发送请求前执行的中间件：

```typescript
const customRequestMiddleware: RequestMiddleware = async (config) => {
  // 添加自定义头
  config.headers = {
    ...config.headers,
    'X-Client-Version': '1.0.0'
  };
  
  return config;
};

httpClient.addRequestMiddleware(customRequestMiddleware);
```

### 响应中间件

在收到响应后执行的中间件：

```typescript
const customResponseMiddleware: ResponseMiddleware = async (response) => {
  // 记录响应日志
  console.log('Response received:', response.status);
  
  return response;
};

httpClient.addResponseMiddleware(customResponseMiddleware);
```

### 错误中间件

处理请求错误的中间件：

```typescript
const customErrorMiddleware: ErrorMiddleware = async (error) => {
  // 自定义错误处理
  if (error.status === 403) {
    showNotification('权限不足');
  }
  
  throw error;
};

httpClient.addErrorMiddleware(customErrorMiddleware);
```

## 📊 SWR集成

HTTP客户端与SWR完美集成，提供缓存和数据同步功能：

```typescript
// SWR配置 (src/lib/swr/config.ts)
export const swrConfig: SWRConfiguration = {
  fetcher: (url: string) => http.get(url), // 使用新的HTTP客户端
  // 其他SWR配置...
};

// 在Hook中使用
export function useUsers() {
  return useApiGet<User[]>('/users');
}
```

## 🔒 权限控制

### 基于角色的访问控制 (RBAC)

```typescript
// 检查用户角色
const AdminPanel = () => {
  const isAdmin = authManager.hasRole('admin');
  
  if (!isAdmin) {
    return <div>权限不足</div>;
  }
  
  return <div>管理员面板</div>;
};
```

### 基于权限的访问控制

```typescript
// 检查具体权限
const DeleteButton = ({ postId }) => {
  const canDelete = authManager.hasPermission('delete:posts');
  
  return (
    <button 
      disabled={!canDelete}
      onClick={() => deletePost(postId)}
    >
      删除文章
    </button>
  );
};
```

## 🚨 错误处理

系统提供统一的错误处理机制：

| 状态码 | 处理方式 |
|--------|----------|
| 401 | 自动尝试刷新Token，失败则重定向到登录页 |
| 403 | 显示权限不足提示 |
| 404 | 显示资源不存在提示 |
| 500+ | 显示服务器错误提示 |

## 📝 使用示例

### 完整的登录组件

```typescript
import { useState } from 'react';
import { authManager } from '@/lib/auth';
import { http } from '@/lib/http';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await http.post('/auth/login', credentials);
      const { token, user } = response.data;
      
      authManager.loginWithUser(token, user);
      
      // 重定向到主页
      window.location.href = '/';
    } catch (error) {
      console.error('登录失败:', error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        value={credentials.username}
        onChange={(e) => setCredentials({
          ...credentials,
          username: e.target.value
        })}
        placeholder="用户名"
      />
      <input
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials({
          ...credentials,
          password: e.target.value
        })}
        placeholder="密码"
      />
      <button type="submit">登录</button>
    </form>
  );
};
```

### 带权限控制的API调用

```typescript
import { useApiGet, useApiPost } from '@/hooks/useApi';
import { authManager } from '@/lib/auth';

const PostList = () => {
  const { data: posts, isLoading } = useApiGet<Post[]>('/posts');
  const { trigger: createPost } = useApiPost<Post>('/posts');
  
  const canCreatePost = authManager.hasPermission('write:posts');

  const handleCreatePost = async () => {
    if (!canCreatePost) {
      alert('权限不足');
      return;
    }
    
    try {
      await createPost({
        title: '新文章',
        content: '文章内容'
      });
    } catch (error) {
      console.error('创建失败:', error);
    }
  };

  if (isLoading) return <div>加载中...</div>;

  return (
    <div>
      {posts?.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
      
      {canCreatePost && (
        <button onClick={handleCreatePost}>
          创建新文章
        </button>
      )}
    </div>
  );
};
```

## 🎯 最佳实践

1. **Token安全性**
   - 使用HTTPS传输
   - 设置合理的过期时间
   - 及时清理过期Token

2. **权限设计**
   - 遵循最小权限原则
   - 使用细粒度权限控制
   - 定期审查用户权限

3. **错误处理**
   - 提供友好的错误提示
   - 记录详细的错误日志
   - 实现优雅降级

4. **性能优化**
   - 合理使用SWR缓存
   - 避免不必要的请求
   - 实现请求去重

## 🧪 测试和调试

访问 `/api-demo` 页面查看完整的HTTP客户端和鉴权系统演示，包括：

- 鉴权流程演示
- HTTP请求示例
- 权限检查演示
- SWR集成示例

## 📚 相关文档

- [SWR文档](https://swr.vercel.app/)
- [Fetch API文档](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [JWT标准](https://jwt.io/)
- [RBAC权限模型](https://en.wikipedia.org/wiki/Role-based_access_control)
