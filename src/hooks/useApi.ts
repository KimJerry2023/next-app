import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { fetcherWithParams, postFetcher, putFetcher, deleteFetcher } from '@/lib/swr/config';

// 类型定义
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
}

export interface ApiError {
  message: string;
  status?: number;
}

// 通用GET请求hook
export function useApiGet<T = any>(
  url: string | null,
  params?: Record<string, any>,
  options?: {
    refreshInterval?: number;
    revalidateOnFocus?: boolean;
    revalidateOnReconnect?: boolean;
  }
) {
  const { data, error, isLoading, mutate: revalidate } = useSWR<ApiResponse<T>, ApiError>(
    url ? [url, params] : null,
    (args) => {
      const [url, params] = args as [string, Record<string, any>?];
      return fetcherWithParams(url, params);
    },
    {
      ...options,
    }
  );

  return {
    data: data?.data,
    response: data,
    error,
    isLoading,
    revalidate,
  };
}

// POST请求hook
export function useApiPost<T = any, D = any>(url: string) {
  const { trigger, isMutating, error } = useSWRMutation<ApiResponse<T>, ApiError, string, D>(
    url,
    (url, { arg }: { arg: D }) => postFetcher(url, arg)
  );

  return {
    trigger,
    isMutating,
    error,
  };
}

// PUT请求hook
export function useApiPut<T = any, D = any>(url: string) {
  const { trigger, isMutating, error } = useSWRMutation<ApiResponse<T>, ApiError, string, D>(
    url,
    (url, { arg }: { arg: D }) => putFetcher(url, arg)
  );

  return {
    trigger,
    isMutating,
    error,
  };
}

// DELETE请求hook
export function useApiDelete<T = any>(url: string) {
  const { trigger, isMutating, error } = useSWRMutation<ApiResponse<T>, ApiError, string>(
    url,
    (url: string) => deleteFetcher(url)
  );

  return {
    trigger,
    isMutating,
    error,
  };
}

// 手动刷新缓存
export function revalidateApi(key: string | string[]) {
  return mutate(key);
}

// 清除缓存
export function clearApiCache(key?: string | string[]) {
  return mutate(key, undefined, { revalidate: false });
}
