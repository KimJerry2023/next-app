// 鉴权相关类型定义
export interface AuthToken {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
  tokenType?: string;
}

export interface AuthUser {
  id: string | number;
  username?: string;
  email?: string;
  name?: string;
  avatar?: string;
  roles?: string[];
  permissions?: string[];
}

// Token存储管理器
class TokenManager {
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly TOKEN_EXPIRES_KEY = 'token_expires';
  private readonly TOKEN_TYPE_KEY = 'token_type';

  // 设置Token
  setToken(token: AuthToken): void {
    if (typeof window === 'undefined') return;

    localStorage.setItem(this.ACCESS_TOKEN_KEY, token.accessToken);
    
    if (token.refreshToken) {
      localStorage.setItem(this.REFRESH_TOKEN_KEY, token.refreshToken);
    }
    
    if (token.expiresAt) {
      localStorage.setItem(this.TOKEN_EXPIRES_KEY, token.expiresAt.toString());
    }
    
    if (token.tokenType) {
      localStorage.setItem(this.TOKEN_TYPE_KEY, token.tokenType);
    }
  }

  // 获取访问Token
  getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  // 获取刷新Token
  getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  // 获取Token类型
  getTokenType(): string {
    if (typeof window === 'undefined') return 'Bearer';
    return localStorage.getItem(this.TOKEN_TYPE_KEY) || 'Bearer';
  }

  // 获取完整Token信息
  getToken(): AuthToken | null {
    const accessToken = this.getAccessToken();
    if (!accessToken) return null;

    const refreshToken = this.getRefreshToken();
    const expiresAt = localStorage.getItem(this.TOKEN_EXPIRES_KEY);
    const tokenType = this.getTokenType();

    return {
      accessToken,
      refreshToken: refreshToken || undefined,
      expiresAt: expiresAt ? parseInt(expiresAt, 10) : undefined,
      tokenType,
    };
  }

  // 检查Token是否过期
  isTokenExpired(): boolean {
    if (typeof window === 'undefined') return true;
    
    const expiresAt = localStorage.getItem(this.TOKEN_EXPIRES_KEY);
    if (!expiresAt) return false; // 如果没有设置过期时间，认为没有过期
    
    return Date.now() > parseInt(expiresAt, 10);
  }

  // 检查Token是否存在且有效
  isTokenValid(): boolean {
    const token = this.getAccessToken();
    return !!(token && !this.isTokenExpired());
  }

  // 清除Token
  clearToken(): void {
    if (typeof window === 'undefined') return;

    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.TOKEN_EXPIRES_KEY);
    localStorage.removeItem(this.TOKEN_TYPE_KEY);
  }

  // 获取Authorization头
  getAuthorizationHeader(): string | null {
    const token = this.getAccessToken();
    if (!token) return null;
    
    const tokenType = this.getTokenType();
    return `${tokenType} ${token}`;
  }
}

// 创建Token管理器实例
export const tokenManager = new TokenManager();

// 鉴权工具函数
export const authUtils = {
  // 登录
  login: (token: AuthToken): void => {
    tokenManager.setToken(token);
  },

  // 登出
  logout: (): void => {
    tokenManager.clearToken();
    
    // 重定向到登录页
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  },

  // 检查是否已登录
  isAuthenticated: (): boolean => {
    return tokenManager.isTokenValid();
  },

  // 获取当前Token
  getToken: (): AuthToken | null => {
    return tokenManager.getToken();
  },

  // 获取Authorization头
  getAuthHeader: (): Record<string, string> => {
    const authHeader = tokenManager.getAuthorizationHeader();
    return authHeader ? { Authorization: authHeader } : {};
  },

  // Token刷新函数（需要配合后端API）
  refreshToken: async (): Promise<AuthToken | null> => {
    const refreshToken = tokenManager.getRefreshToken();
    if (!refreshToken) {
      authUtils.logout();
      return null;
    }

    try {
      // 这里需要调用刷新Token的API
      // const response = await http.post('/auth/refresh', { refreshToken });
      // const newToken = response.data;
      // tokenManager.setToken(newToken);
      // return newToken;
      
      // 暂时返回null，实际项目中需要实现API调用
      console.log('Token刷新功能需要配合后端API实现');
      return null;
    } catch (error) {
      console.error('Token刷新失败:', error);
      authUtils.logout();
      return null;
    }
  },

  // 自动刷新Token（在Token即将过期时）
  autoRefreshToken: async (): Promise<boolean> => {
    const token = tokenManager.getToken();
    if (!token || !token.expiresAt) return true;

    // 如果Token在5分钟内过期，尝试刷新
    const fiveMinutes = 5 * 60 * 1000;
    if (Date.now() + fiveMinutes > token.expiresAt) {
      const newToken = await authUtils.refreshToken();
      return !!newToken;
    }

    return true;
  },
};

// 用户信息管理
class UserManager {
  private readonly USER_KEY = 'user_info';

  // 设置用户信息
  setUser(user: AuthUser): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  // 获取用户信息
  getUser(): AuthUser | null {
    if (typeof window === 'undefined') return null;
    
    const userStr = localStorage.getItem(this.USER_KEY);
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('解析用户信息失败:', error);
      return null;
    }
  }

  // 清除用户信息
  clearUser(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.USER_KEY);
  }

  // 检查用户权限
  hasPermission(permission: string): boolean {
    const user = this.getUser();
    return user?.permissions?.includes(permission) || false;
  }

  // 检查用户角色
  hasRole(role: string): boolean {
    const user = this.getUser();
    return user?.roles?.includes(role) || false;
  }
}

// 创建用户管理器实例
export const userManager = new UserManager();

// 完整的鉴权管理器
export const authManager = {
  ...authUtils,
  
  // 完整登录（包含用户信息）
  loginWithUser: (token: AuthToken, user: AuthUser): void => {
    tokenManager.setToken(token);
    userManager.setUser(user);
  },

  // 完整登出（清除所有数据）
  fullLogout: (): void => {
    tokenManager.clearToken();
    userManager.clearUser();
    
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  },

  // 获取用户信息
  getCurrentUser: (): AuthUser | null => {
    return userManager.getUser();
  },

  // 权限检查
  hasPermission: (permission: string): boolean => {
    return userManager.hasPermission(permission);
  },

  // 角色检查
  hasRole: (role: string): boolean => {
    return userManager.hasRole(role);
  },
};

export default authManager;
