import { useApiGet, useApiPost, useApiPut, useApiDelete } from '../useApi';

// 用户数据类型
export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  phone?: string;
  website?: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface CreateUserData {
  name: string;
  email: string;
  username: string;
  phone?: string;
  website?: string;
}

export interface UpdateUserData extends Partial<CreateUserData> {
  id: number;
}

// 获取用户列表
export function useUsers() {
  return useApiGet<User[]>('/users');
}

// 获取单个用户
export function useUser(userId: number | null) {
  return useApiGet<User>(userId ? `/users/${userId}` : null);
}

// 创建用户
export function useCreateUser() {
  return useApiPost<User, CreateUserData>('/users');
}

// 更新用户
export function useUpdateUser(userId: number) {
  return useApiPut<User, UpdateUserData>(`/users/${userId}`);
}

// 删除用户
export function useDeleteUser(userId: number) {
  return useApiDelete<{ message: string }>(`/users/${userId}`);
}

// 搜索用户
export function useSearchUsers(query: string) {
  return useApiGet<User[]>(
    query ? '/users' : null,
    { q: query },
    {
      revalidateOnFocus: false, // 搜索结果不需要在焦点时重新验证
    }
  );
}
