// 导入鉴权管理器
import { authManager } from '../auth';

// 基础API URL
const BASE_URL = 'https://testapi.com';

// 请求配置接口
export interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  params?: Record<string, any>;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

// 响应接口
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
}

// 错误接口
export interface ApiError extends Error {
  status?: number;
  statusText?: string;
  response?: Response;
}

// 中间件类型
export type RequestMiddleware = (config: RequestConfig & { url: string }) => Promise<RequestConfig & { url: string }>;
export type ResponseMiddleware = (response: Response) => Promise<Response>;
export type ErrorMiddleware = (error: ApiError) => Promise<never>;

// HTTP客户端类
class HttpClient {
  private baseURL: string;
  private defaultConfig: RequestConfig;
  private requestMiddlewares: RequestMiddleware[] = [];
  private responseMiddlewares: ResponseMiddleware[] = [];
  private errorMiddlewares: ErrorMiddleware[] = [];

  constructor(baseURL: string = '', defaultConfig: RequestConfig = {}) {
    this.baseURL = baseURL;
    this.defaultConfig = {
      timeout: 10000,
      retries: 0,
      retryDelay: 1000,
      headers: {
        'Content-Type': 'application/json',
      },
      ...defaultConfig,
    };
  }

  // 添加请求中间件
  addRequestMiddleware(middleware: RequestMiddleware) {
    this.requestMiddlewares.push(middleware);
    return this;
  }

  // 添加响应中间件
  addResponseMiddleware(middleware: ResponseMiddleware) {
    this.responseMiddlewares.push(middleware);
    return this;
  }

  // 添加错误中间件
  addErrorMiddleware(middleware: ErrorMiddleware) {
    this.errorMiddlewares.push(middleware);
    return this;
  }

  // 构建完整URL
  private buildURL(url: string, params?: Record<string, any>): string {
    const fullURL = url.startsWith('http') ? url : `${this.baseURL}${url}`;
    
    if (!params || Object.keys(params).length === 0) {
      return fullURL;
    }

    const urlObj = new URL(fullURL);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        urlObj.searchParams.append(key, String(value));
      }
    });

    return urlObj.toString();
  }

  // 应用请求中间件
  private async applyRequestMiddlewares(config: RequestConfig & { url: string }): Promise<RequestConfig & { url: string }> {
    let processedConfig = config;
    
    for (const middleware of this.requestMiddlewares) {
      processedConfig = await middleware(processedConfig);
    }
    
    return processedConfig;
  }

  // 应用响应中间件
  private async applyResponseMiddlewares(response: Response): Promise<Response> {
    let processedResponse = response;
    
    for (const middleware of this.responseMiddlewares) {
      processedResponse = await middleware(processedResponse);
    }
    
    return processedResponse;
  }

  // 应用错误中间件
  private async applyErrorMiddlewares(error: ApiError): Promise<never> {
    let processedError = error;
    
    for (const middleware of this.errorMiddlewares) {
      try {
        await middleware(processedError);
      } catch (newError) {
        processedError = newError as ApiError;
      }
    }
    
    throw processedError;
  }

  // 创建超时控制器
  private createTimeoutController(timeout: number): [AbortController, NodeJS.Timeout] {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);
    
    return [controller, timeoutId];
  }

  // 延迟函数
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // 核心请求方法
  private async request<T = any>(url: string, config: RequestConfig = {}): Promise<T> {
    const mergedConfig = { ...this.defaultConfig, ...config };
    const { timeout, retries, retryDelay, params, ...fetchConfig } = mergedConfig;

    let requestConfig = {
      url: this.buildURL(url, params),
      ...fetchConfig,
    };

    // 应用请求中间件
    requestConfig = await this.applyRequestMiddlewares(requestConfig);

    const fetchOptions: RequestInit = {
      method: requestConfig.method || 'GET',
      headers: requestConfig.headers,
      signal: undefined,
    };

    // 添加请求体（如果不是GET请求且有数据）
    if (config.method && config.method !== 'GET' && (config as any).data) {
      if (requestConfig.headers?.['Content-Type']?.includes('application/json')) {
        fetchOptions.body = JSON.stringify((config as any).data);
      } else {
        fetchOptions.body = (config as any).data;
      }
    }

    let attempt = 0;
    const maxAttempts = (retries || 0) + 1;

    while (attempt < maxAttempts) {
      let timeoutController: AbortController | undefined;
      let timeoutId: NodeJS.Timeout | undefined;

      try {
        // 设置超时
        if (timeout && timeout > 0) {
          [timeoutController, timeoutId] = this.createTimeoutController(timeout);
          fetchOptions.signal = timeoutController.signal;
        }

        const response = await fetch(requestConfig.url, fetchOptions);

        // 清除超时
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        // 应用响应中间件
        const processedResponse = await this.applyResponseMiddlewares(response.clone());

        // 检查响应状态
        if (!processedResponse.ok) {
          const error: ApiError = new Error(`HTTP Error: ${processedResponse.status} ${processedResponse.statusText}`) as ApiError;
          error.status = processedResponse.status;
          error.statusText = processedResponse.statusText;
          error.response = processedResponse;
          
          throw error;
        }

        // 解析响应数据
        const contentType = processedResponse.headers.get('Content-Type') || '';
        let data: any;

        if (contentType.includes('application/json')) {
          data = await processedResponse.json();
        } else if (contentType.includes('text/')) {
          data = await processedResponse.text();
        } else {
          data = await processedResponse.blob();
        }

        console.log('响应数据:', { url: requestConfig.url, data, status: processedResponse.status });

        return data;

      } catch (error) {
        // 清除超时
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        attempt++;
        
        const apiError: ApiError = error instanceof Error ? error as ApiError : new Error(String(error)) as ApiError;

        // 如果是最后一次尝试或者不应该重试的错误，抛出错误
        if (attempt >= maxAttempts || (apiError.status && apiError.status < 500)) {
          console.error('请求错误:', { url: requestConfig.url, error: apiError, attempt });
          await this.applyErrorMiddlewares(apiError);
          return Promise.reject(apiError);
        }

        // 等待后重试
        if (retryDelay && retryDelay > 0) {
          await this.delay(retryDelay * attempt);
        }

        console.warn('请求重试:', { url: requestConfig.url, attempt, maxAttempts });
      }
    }

    // 这里应该不会被执行到
    throw new Error('Unexpected error in request method');
  }

  // HTTP方法
  get<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, { ...config, method: 'GET' });
  }

  post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, { ...config, method: 'POST', data } as any);
  }

  put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, { ...config, method: 'PUT', data } as any);
  }

  patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, { ...config, method: 'PATCH', data } as any);
  }

  delete<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, { ...config, method: 'DELETE' });
  }
}

// 创建默认HTTP客户端实例
const httpClient = new HttpClient(BASE_URL);

// 鉴权中间件
const authMiddleware: RequestMiddleware = async (config) => {
  console.log('发送请求:', config);
  
  // 检查Token是否需要刷新
  await authManager.autoRefreshToken();
  
  // 获取认证头
  const authHeaders = authManager.getAuthHeader();
  
  if (Object.keys(authHeaders).length > 0) {
    config.headers = {
      ...config.headers,
      ...authHeaders,
    };
  }
  
  return config;
};

// 响应处理中间件
const responseMiddleware: ResponseMiddleware = async (response) => {
  // 在这里可以添加全局响应处理逻辑
  return response;
};

// 错误处理中间件
const errorMiddleware: ErrorMiddleware = async (error) => {
  console.error('响应错误:', error);
  
  // 处理401未授权错误
  if (error.status === 401) {
    // 尝试刷新Token
    const refreshed = await authManager.refreshToken();
    if (!refreshed) {
      // 刷新失败，执行登出
      authManager.fullLogout();
    }
  }
  
  // 处理其他错误状态码
  if (error.status === 403) {
    console.error('权限不足');
  } else if (error.status === 404) {
    console.error('资源不存在');
  } else if (error.status && error.status >= 500) {
    console.error('服务器内部错误');
  }
  
  throw error;
};

// 添加中间件到默认客户端
httpClient
  .addRequestMiddleware(authMiddleware)
  .addResponseMiddleware(responseMiddleware)
  .addErrorMiddleware(errorMiddleware);

// 导出HTTP方法的简化接口
export const http = {
  get: <T = any>(url: string, config?: RequestConfig): Promise<T> => {
    return httpClient.get(url, config);
  },
  
  post: <T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> => {
    return httpClient.post(url, data, config);
  },
  
  put: <T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> => {
    return httpClient.put(url, data, config);
  },
  
  patch: <T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> => {
    return httpClient.patch(url, data, config);
  },
  
  delete: <T = any>(url: string, config?: RequestConfig): Promise<T> => {
    return httpClient.delete(url, config);
  },
};

// 导出客户端实例和类型
export { httpClient, HttpClient };
export default http;