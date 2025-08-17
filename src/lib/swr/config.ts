import { SWRConfiguration } from 'swr';
import { http } from '../http';

// SWR默认配置
export const swrConfig: SWRConfiguration = {
  // 数据获取函数 - 使用新的fetch客户端
  fetcher: (url: string) => http.get(url),
  
  // 重新验证配置
  revalidateOnFocus: true,        // 窗口获得焦点时重新验证
  revalidateOnReconnect: true,    // 网络重连时重新验证
  revalidateOnMount: true,        // 组件挂载时重新验证
  
  // 错误重试配置
  errorRetryCount: 3,             // 错误重试次数
  errorRetryInterval: 5000,       // 错误重试间隔(ms)
  
  // 缓存配置
  dedupingInterval: 2000,         // 去重间隔(ms)
  focusThrottleInterval: 5000,    // 焦点事件节流间隔(ms)
  
  // 刷新间隔(可选)
  // refreshInterval: 0,          // 设置为0禁用自动刷新
  
  // 全局错误处理
  onError: (error) => {
    console.error('SWR Error:', error);
    // 这里可以添加全局错误处理逻辑，比如显示通知
  },
  
  // 全局成功处理
  onSuccess: (data, key) => {
    console.log('SWR Success:', { key, data });
  },
  
  // 加载状态处理
  onLoadingSlow: (key) => {
    console.warn('SWR Loading Slow:', key);
    // 可以在这里显示加载慢的提示
  },
};

// 智能fetcher函数 - 自动判断是本地API还是外部API
const smartFetcher = (url: string, config?: any) => {
  // 如果URL以/api开头，使用本地fetch；否则使用外部HTTP客户端
  if (url.startsWith('/api')) {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
      ...config,
    }).then(res => {
      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
      }
      return res.json();
    });
  }
  return http.get(url, config);
};

// 带参数的fetcher函数
export const fetcherWithParams = (url: string, params?: Record<string, any>) => {
  if (url.startsWith('/api')) {
    const urlWithParams = params ? `${url}?${new URLSearchParams(params).toString()}` : url;
    return smartFetcher(urlWithParams);
  }
  return http.get(url, { params });
};

// POST请求的fetcher
export const postFetcher = (url: string, data: any) => {
  if (url.startsWith('/api')) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(res => {
      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
      }
      return res.json();
    });
  }
  return http.post(url, data);
};

// PUT请求的fetcher
export const putFetcher = (url: string, data: any) => {
  if (url.startsWith('/api')) {
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(res => {
      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
      }
      return res.json();
    });
  }
  return http.put(url, data);
};

// DELETE请求的fetcher
export const deleteFetcher = (url: string) => {
  if (url.startsWith('/api')) {
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => {
      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
      }
      return res.json();
    });
  }
  return http.delete(url);
};
