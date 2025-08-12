# HTTP请求模块 (SWR + Axios)

这个模块提供了一个基于SWR和Axios的HTTP请求解决方案，针对`https://testapi.com/`API进行了优化配置。

## 功能特性

- 🚀 基于SWR的数据获取和缓存
- 🔄 自动重新验证和数据同步
- 🛡️ 错误处理和重试机制
- 📦 TypeScript支持
- 🎯 RESTful API支持（GET、POST、PUT、DELETE）
- 🔧 可配置的请求拦截器和响应拦截器
- 💾 智能缓存管理

## 快速开始

### 1. 基础HTTP请求

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

### 2. 使用SWR Hooks

```typescript
import { useUsers, useUser, useCreateUser } from '@/hooks/api/useUsers';

function UserList() {
  const { data: users, isLoading, error } = useUsers();
  const { trigger: createUser, isMutating } = useCreateUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {users?.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### 3. 高级用法

#### 带参数的GET请求
```typescript
import { useApiGet } from '@/hooks/useApi';

function SearchUsers() {
  const [query, setQuery] = useState('');
  const { data, isLoading } = useApiGet(
    '/users',
    { q: query }, // 查询参数
    {
      refreshInterval: 0, // 禁用自动刷新
      revalidateOnFocus: false, // 禁用焦点重新验证
    }
  );

  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜索用户..."
      />
      {/* 渲染结果 */}
    </div>
  );
}
```

#### POST/PUT/DELETE操作
```typescript
import { useCreateUser, useUpdateUser, useDeleteUser } from '@/hooks/api/useUsers';

function UserActions() {
  const { trigger: createUser, isMutating: isCreating } = useCreateUser();
  const { trigger: updateUser, isMutating: isUpdating } = useUpdateUser(1);
  const { trigger: deleteUser, isMutating: isDeleting } = useDeleteUser(1);

  const handleCreate = async () => {
    try {
      const result = await createUser({
        name: 'New User',
        email: 'new@example.com',
        username: 'newuser'
      });
      console.log('Created:', result);
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  return (
    <div>
      <button onClick={handleCreate} disabled={isCreating}>
        {isCreating ? '创建中...' : '创建用户'}
      </button>
    </div>
  );
}
```

## API参考

### HTTP客户端 (`/lib/http/index.ts`)

- `http.get<T>(url, config?)`: GET请求
- `http.post<T>(url, data?, config?)`: POST请求  
- `http.put<T>(url, data?, config?)`: PUT请求
- `http.patch<T>(url, data?, config?)`: PATCH请求
- `http.delete<T>(url, config?)`: DELETE请求

### 通用Hooks (`/hooks/useApi.ts`)

- `useApiGet<T>(url, params?, options?)`: GET请求hook
- `useApiPost<T, D>(url)`: POST请求hook
- `useApiPut<T, D>(url)`: PUT请求hook
- `useApiDelete<T>(url)`: DELETE请求hook
- `revalidateApi(key)`: 手动刷新缓存
- `clearApiCache(key?)`: 清除缓存

### 业务Hooks

#### 用户相关 (`/hooks/api/useUsers.ts`)
- `useUsers()`: 获取用户列表
- `useUser(id)`: 获取单个用户
- `useCreateUser()`: 创建用户
- `useUpdateUser(id)`: 更新用户
- `useDeleteUser(id)`: 删除用户
- `useSearchUsers(query)`: 搜索用户

#### 文章相关 (`/hooks/api/usePosts.ts`)
- `usePosts(page?, limit?)`: 获取文章列表
- `usePost(id)`: 获取单个文章
- `useUserPosts(userId)`: 获取用户的文章
- `useCreatePost()`: 创建文章
- `useUpdatePost(id)`: 更新文章
- `useDeletePost(id)`: 删除文章
- `useSearchPosts(query)`: 搜索文章

## 配置

### SWR配置 (`/lib/swr/config.ts`)

```typescript
export const swrConfig: SWRConfiguration = {
  fetcher: (url: string) => http.get(url),
  revalidateOnFocus: true,        // 窗口获得焦点时重新验证
  revalidateOnReconnect: true,    // 网络重连时重新验证
  errorRetryCount: 3,             // 错误重试次数
  errorRetryInterval: 5000,       // 错误重试间隔(ms)
  dedupingInterval: 2000,         // 去重间隔(ms)
  // ... 更多配置
};
```

### HTTP配置 (`/lib/http/index.ts`)

- 基础URL: `https://testapi.com`
- 超时时间: 10秒
- 自动添加Authorization头部（如果有token）
- 401错误自动跳转到登录页
- 请求/响应拦截器

## 类型定义

```typescript
interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  phone?: string;
  website?: string;
  // ...
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}
```

## 演示页面

访问 `/api-demo` 页面查看完整的使用示例，包括：

- 用户列表获取和展示
- 用户详情查看
- 用户创建、更新、删除
- 文章列表和详情
- 实时状态管理
- 错误处理演示

## 最佳实践

1. **错误处理**: 始终使用try-catch处理mutation操作
2. **loading状态**: 利用`isLoading`和`isMutating`状态提供良好的用户体验
3. **缓存管理**: 合理使用`revalidateApi`手动刷新数据
4. **参数验证**: 在发送请求前验证必要参数
5. **类型安全**: 充分利用TypeScript类型定义

## 扩展

要添加新的API endpoints：

1. 在`/hooks/api/`目录下创建新的hook文件
2. 定义相关的数据类型
3. 使用通用hooks (`useApiGet`, `useApiPost`等) 创建业务相关的hooks
4. 在`/hooks/index.ts`中导出新的hooks

示例：
```typescript
// /hooks/api/useComments.ts
export function useComments(postId: number) {
  return useApiGet<Comment[]>(`/posts/${postId}/comments`);
}
```
