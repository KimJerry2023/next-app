'use client';

import { useState } from 'react';
import { useUsers, useUser, useCreateUser, useUpdateUser, useDeleteUser } from '@/hooks/api/useUsers';
import { usePosts, usePost, useCreatePost } from '@/hooks/api/usePosts';
import AuthDemo from '@/components/auth/AuthDemo';

export default function ApiDemoPage() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [newUserData, setNewUserData] = useState({ name: '', email: '', username: '' });

  // Users API示例
  const { data: users, isLoading: usersLoading, error: usersError } = useUsers();
  const { data: selectedUser, isLoading: userLoading } = useUser(selectedUserId);
  const { trigger: createUser, isMutating: isCreating } = useCreateUser();
  const { trigger: updateUser, isMutating: isUpdating } = useUpdateUser(selectedUserId || 0);
  const { trigger: deleteUser, isMutating: isDeleting } = useDeleteUser(selectedUserId || 0);

  // Posts API示例
  const { data: posts, isLoading: postsLoading } = usePosts(1, 5);
  const { data: selectedPost, isLoading: postLoading } = usePost(selectedPostId);
  const { trigger: createPost, isMutating: isCreatingPost } = useCreatePost();

  const handleCreateUser = async () => {
    try {
      const result = await createUser(newUserData);
      console.log('User created:', result);
      setNewUserData({ name: '', email: '', username: '' });
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  const handleUpdateUser = async () => {
    if (!selectedUserId) return;
    try {
      const result = await updateUser({
        id: selectedUserId,
        name: `Updated User ${Date.now()}`,
      });
      console.log('User updated:', result);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUserId) return;
    try {
      const result = await deleteUser();
      console.log('User deleted:', result);
      setSelectedUserId(null);
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleCreatePost = async () => {
    try {
      const result = await createPost({
        title: 'New Post from SWR Demo',
        body: 'This is a test post created using our SWR HTTP module.',
        userId: 1,
      });
      console.log('Post created:', result);
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">HTTP模块 & 鉴权演示</h1>

      {/* 鉴权演示部分 */}
      <section>
        <AuthDemo />
      </section>

      <hr className="my-8" />

      <h2 className="text-2xl font-bold text-center mb-6">SWR HTTP模块演示</h2>

      {/* 用户API示例 */}
      <section className="space-y-4">
        <h3 className="text-2xl font-semibold">用户API示例</h3>
        
        {/* 用户列表 */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">用户列表</h3>
          {usersLoading && <p className="text-blue-500">加载中...</p>}
          {usersError && <p className="text-red-500">错误: {usersError.message}</p>}
          {users && (
            <div className="space-y-2">
              {users.slice(0, 5).map((user) => (
                <div 
                  key={user.id}
                  className={`p-2 border rounded cursor-pointer ${selectedUserId === user.id ? 'bg-blue-100 dark:bg-blue-900' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                  onClick={() => setSelectedUserId(user.id)}
                >
                  <strong>{user.name}</strong> - {user.email}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 选中的用户详情 */}
        {selectedUserId && (
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">用户详情 (ID: {selectedUserId})</h3>
            {userLoading && <p className="text-blue-500">加载中...</p>}
            {selectedUser && (
              <div className="space-y-2">
                <p><strong>姓名:</strong> {selectedUser.name}</p>
                <p><strong>邮箱:</strong> {selectedUser.email}</p>
                <p><strong>用户名:</strong> {selectedUser.username}</p>
                {selectedUser.phone && <p><strong>电话:</strong> {selectedUser.phone}</p>}
                {selectedUser.website && <p><strong>网站:</strong> {selectedUser.website}</p>}
              </div>
            )}
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleUpdateUser}
                disabled={isUpdating}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {isUpdating ? '更新中...' : '更新用户'}
              </button>
              <button
                onClick={handleDeleteUser}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
              >
                {isDeleting ? '删除中...' : '删除用户'}
              </button>
            </div>
          </div>
        )}

        {/* 创建新用户 */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">创建新用户</h3>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="姓名"
              value={newUserData.name}
              onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              placeholder="邮箱"
              value={newUserData.email}
              onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="用户名"
              value={newUserData.username}
              onChange={(e) => setNewUserData({ ...newUserData, username: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <button
              onClick={handleCreateUser}
              disabled={isCreating || !newUserData.name || !newUserData.email || !newUserData.username}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
            >
              {isCreating ? '创建中...' : '创建用户'}
            </button>
          </div>
        </div>
      </section>

      {/* 文章API示例 */}
      <section className="space-y-4">
        <h3 className="text-2xl font-semibold">文章API示例</h3>
        
        {/* 文章列表 */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">文章列表 (前5篇)</h3>
          {postsLoading && <p className="text-blue-500">加载中...</p>}
          {posts && (
            <div className="space-y-2">
              {posts.map((post) => (
                <div 
                  key={post.id}
                  className={`p-2 border rounded cursor-pointer ${selectedPostId === post.id ? 'bg-green-100 dark:bg-green-900' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                  onClick={() => setSelectedPostId(post.id)}
                >
                  <strong>{post.title}</strong>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {post.body.substring(0, 100)}...
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 选中的文章详情 */}
        {selectedPostId && (
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">文章详情 (ID: {selectedPostId})</h3>
            {postLoading && <p className="text-blue-500">加载中...</p>}
            {selectedPost && (
              <div className="space-y-2">
                <p><strong>标题:</strong> {selectedPost.title}</p>
                <p><strong>作者ID:</strong> {selectedPost.userId}</p>
                <p><strong>内容:</strong> {selectedPost.body}</p>
              </div>
            )}
          </div>
        )}

        {/* 创建新文章 */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">创建新文章</h3>
          <button
            onClick={handleCreatePost}
            disabled={isCreatingPost}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
          >
            {isCreatingPost ? '创建中...' : '创建示例文章'}
          </button>
        </div>
      </section>

      {/* API说明 */}
      <section className="border rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-2">API模块使用说明</h3>
        <div className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
          <p>• 基础API URL: https://testapi.com</p>
          <p>• 使用基于fetch的HTTP客户端替代axios</p>
          <p>• 集成鉴权中间件，自动添加Authorization头</p>
          <p>• 自动Token刷新和错误处理机制</p>
          <p>• 使用SWR进行数据获取和缓存管理</p>
          <p>• 支持GET、POST、PUT、DELETE操作</p>
          <p>• 内置loading状态和错误状态</p>
          <p>• 自动数据同步和缓存更新</p>
        </div>
      </section>
    </div>
  );
}
