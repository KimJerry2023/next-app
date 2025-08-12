'use client';

import { useState, useEffect } from 'react';
import { authManager, type AuthToken, type AuthUser } from '@/lib/auth';

export default function AuthDemo() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [loginForm, setLoginForm] = useState({
    username: 'demo_user',
    password: 'demo_password'
  });

  // 检查认证状态
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(authManager.isAuthenticated());
      setCurrentUser(authManager.getCurrentUser());
    };

    checkAuth();
    
    // 每5秒检查一次认证状态（演示自动刷新）
    const interval = setInterval(checkAuth, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // 模拟登录
  const handleLogin = () => {
    // 模拟从服务器获取的Token和用户信息
    const mockToken: AuthToken = {
      accessToken: 'mock_access_token_' + Date.now(),
      refreshToken: 'mock_refresh_token_' + Date.now(),
      expiresAt: Date.now() + 3600000, // 1小时后过期
      tokenType: 'Bearer'
    };

    const mockUser: AuthUser = {
      id: 1,
      username: loginForm.username,
      name: '演示用户',
      email: 'demo@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=0d47a1&color=fff',
      roles: ['user', 'admin'],
      permissions: ['read:posts', 'write:posts', 'delete:posts', 'manage:users']
    };

    // 使用鉴权管理器登录
    authManager.loginWithUser(mockToken, mockUser);
    
    // 更新状态
    setIsAuthenticated(true);
    setCurrentUser(mockUser);
  };

  // 登出
  const handleLogout = () => {
    authManager.fullLogout();
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  // 模拟权限检查
  const checkPermission = (permission: string) => {
    return authManager.hasPermission(permission);
  };

  // 模拟角色检查
  const checkRole = (role: string) => {
    return authManager.hasRole(role);
  };

  // 获取Token信息
  const getTokenInfo = () => {
    const token = authManager.getToken();
    return token;
  };

  // 模拟Token刷新
  const handleRefreshToken = async () => {
    try {
      // 在实际应用中，这会调用后端API
      const newToken: AuthToken = {
        accessToken: 'refreshed_access_token_' + Date.now(),
        refreshToken: 'refreshed_refresh_token_' + Date.now(),
        expiresAt: Date.now() + 3600000, // 重新设置1小时过期
        tokenType: 'Bearer'
      };
      
      authManager.login(newToken);
      alert('Token已刷新！');
    } catch (error) {
      console.error('Token刷新失败:', error);
      alert('Token刷新失败！');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 border rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">鉴权演示 - 登录</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">用户名</label>
            <input
              type="text"
              value={loginForm.username}
              onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="输入用户名"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">密码</label>
            <input
              type="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="输入密码"
            />
          </div>
          
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            登录
          </button>
        </div>
        
        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded text-sm">
          <p className="font-medium">演示说明:</p>
          <p>• 点击登录按钮会模拟用户登录</p>
          <p>• Token会自动添加到HTTP请求头中</p>
          <p>• 支持自动Token刷新机制</p>
        </div>
      </div>
    );
  }

  const tokenInfo = getTokenInfo();

  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">鉴权演示 - 已登录</h2>
        <p className="text-gray-600 dark:text-gray-400">欢迎使用基于fetch的鉴权系统</p>
      </div>

      {/* 用户信息卡片 */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border">
        <h3 className="text-xl font-semibold mb-4">用户信息</h3>
        {currentUser && (
          <div className="space-y-2">
            <div className="flex items-center space-x-4 mb-4">
              {currentUser.avatar && (
                <img 
                  src={currentUser.avatar} 
                  alt="用户头像" 
                  className="w-16 h-16 rounded-full"
                />
              )}
              <div>
                <p className="text-lg font-medium">{currentUser.name}</p>
                <p className="text-gray-600 dark:text-gray-400">@{currentUser.username}</p>
              </div>
            </div>
            <p><strong>ID:</strong> {currentUser.id}</p>
            <p><strong>邮箱:</strong> {currentUser.email}</p>
            <p><strong>角色:</strong> {currentUser.roles?.join(', ')}</p>
            <p><strong>权限:</strong> {currentUser.permissions?.join(', ')}</p>
          </div>
        )}
      </div>

      {/* Token信息 */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border">
        <h3 className="text-xl font-semibold mb-4">Token信息</h3>
        {tokenInfo && (
          <div className="space-y-2 font-mono text-sm">
            <p><strong>Access Token:</strong> {tokenInfo.accessToken.substring(0, 50)}...</p>
            <p><strong>Token类型:</strong> {tokenInfo.tokenType}</p>
            <p><strong>过期时间:</strong> {tokenInfo.expiresAt ? new Date(tokenInfo.expiresAt).toLocaleString() : '未设置'}</p>
            <p><strong>Refresh Token:</strong> {tokenInfo.refreshToken ? tokenInfo.refreshToken.substring(0, 30) + '...' : '无'}</p>
          </div>
        )}
        <div className="mt-4">
          <button
            onClick={handleRefreshToken}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
          >
            刷新Token
          </button>
        </div>
      </div>

      {/* 权限检查 */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border">
        <h3 className="text-xl font-semibold mb-4">权限检查演示</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">角色检查</h4>
            <div className="space-y-2">
              {['user', 'admin', 'moderator'].map(role => (
                <div key={role} className="flex items-center justify-between p-2 border rounded">
                  <span>{role}</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    checkRole(role) 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {checkRole(role) ? '✓ 拥有' : '✗ 无权限'}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">权限检查</h4>
            <div className="space-y-2">
              {['read:posts', 'write:posts', 'delete:posts', 'manage:users', 'admin:system'].map(permission => (
                <div key={permission} className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">{permission}</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    checkPermission(permission) 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {checkPermission(permission) ? '✓ 拥有' : '✗ 无权限'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* HTTP请求演示 */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border">
        <h3 className="text-xl font-semibold mb-4">HTTP请求演示</h3>
        <div className="space-y-2 text-sm">
          <p>• 所有HTTP请求会自动携带Authorization头</p>
          <p>• Token过期时会自动尝试刷新</p>
          <p>• 401错误会触发重新登录流程</p>
          <p>• 403错误会显示权限不足提示</p>
        </div>
        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded font-mono text-sm">
          <p>Authorization: {authManager.getAuthHeader().Authorization || '未设置'}</p>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600 transition-colors"
        >
          登出
        </button>
      </div>
    </div>
  );
}
