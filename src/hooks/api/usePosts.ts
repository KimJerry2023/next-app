import { useApiGet, useApiPost, useApiPut, useApiDelete } from '../useApi';

// 文章数据类型
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface CreatePostData {
  title: string;
  body: string;
  userId: number;
}

export interface UpdatePostData extends Partial<CreatePostData> {
  id: number;
}

// 获取文章列表
export function usePosts(page: number = 1, limit: number = 10) {
  return useApiGet<Post[]>(
    '/posts',
    { _page: page, _limit: limit },
    {
      refreshInterval: 30000, // 30秒自动刷新
    }
  );
}

// 获取单个文章
export function usePost(postId: number | null) {
  return useApiGet<Post>(postId ? `/posts/${postId}` : null);
}

// 获取用户的文章
export function useUserPosts(userId: number | null) {
  return useApiGet<Post[]>(userId ? `/posts` : null, { userId });
}

// 创建文章
export function useCreatePost() {
  return useApiPost<Post, CreatePostData>('/posts');
}

// 更新文章
export function useUpdatePost(postId: number) {
  return useApiPut<Post, UpdatePostData>(`/posts/${postId}`);
}

// 删除文章
export function useDeletePost(postId: number) {
  return useApiDelete<{ message: string }>(`/posts/${postId}`);
}

// 搜索文章
export function useSearchPosts(query: string) {
  return useApiGet<Post[]>(
    query ? '/posts' : null,
    { q: query },
    {
      revalidateOnFocus: false,
    }
  );
}
