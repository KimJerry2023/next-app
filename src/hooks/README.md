# WebSocket Hooks

这个目录包含了用于WebSocket通信的自定义React hooks，提供了完整的WebSocket功能封装。

## 主要特性

- 🔄 自动重连机制
- 💓 心跳检测
- 📧 消息类型系统
- 🎯 事件订阅/取消订阅
- 🔧 灵活的配置选项
- 🚨 错误处理
- 📊 连接状态管理

## Hooks 概览

### useWebSocket

主要的WebSocket hook，提供基础的连接和消息处理功能。

```typescript
import { useWebSocket } from '@/hooks';

const Component = () => {
  const websocket = useWebSocket({
    url: 'ws://localhost:8080',
    onMessage: (message) => {
      console.log('收到消息:', message);
    },
    onOpen: (event) => {
      console.log('连接已打开');
    },
    onClose: (event) => {
      console.log('连接已关闭');
    },
    onError: (event) => {
      console.error('连接错误');
    },
    reconnectAttempts: 3,
    reconnectInterval: 3000,
    heartbeatInterval: 30000
  });

  const sendMessage = () => {
    websocket.send({
      type: 'chat',
      data: 'Hello World!'
    });
  };

  return (
    <div>
      <button onClick={websocket.connect}>连接</button>
      <button onClick={websocket.disconnect}>断开</button>
      <button onClick={sendMessage}>发送消息</button>
      <p>状态: {websocket.isConnected ? '已连接' : '未连接'}</p>
    </div>
  );
};
```

### useWebSocketSubscription

用于订阅特定类型消息的hook。

```typescript
import { useWebSocketSubscription } from '@/hooks';

const Component = () => {
  const websocket = useWebSocketSubscription({
    url: 'ws://localhost:8080',
    messageTypes: ['chat', 'notification'],
    onMessage: (message) => {
      if (message.type === 'chat') {
        // 处理聊天消息
      } else if (message.type === 'notification') {
        // 处理通知消息
      }
    },
    autoConnect: true
  });

  const subscribeToUpdates = () => {
    websocket.subscribe(['updates', 'alerts']);
  };

  const unsubscribeFromUpdates = () => {
    websocket.unsubscribe(['updates', 'alerts']);
  };

  return (
    <div>
      <button onClick={subscribeToUpdates}>订阅更新</button>
      <button onClick={unsubscribeFromUpdates}>取消订阅更新</button>
    </div>
  );
};
```

### useWebSocketEvents

事件管理系统，用于处理复杂的消息路由。

```typescript
import { useWebSocketEvents, useWebSocketEventListener } from '@/hooks';

const Component = () => {
  const events = useWebSocketEvents();

  // 添加事件监听器
  useWebSocketEventListener('user_joined', (message) => {
    console.log('用户加入:', message.data);
  }, events);

  useWebSocketEventListener('user_left', (message) => {
    console.log('用户离开:', message.data);
  }, events);

  // 手动触发事件
  const simulateEvent = () => {
    events.emit({
      type: 'user_joined',
      data: { username: 'Alice' },
      timestamp: Date.now()
    });
  };

  return (
    <div>
      <button onClick={simulateEvent}>模拟事件</button>
      <p>监听的事件类型: {events.getEventTypes().join(', ')}</p>
    </div>
  );
};
```

## 配置选项

### WebSocketOptions

```typescript
interface WebSocketOptions {
  url: string;                    // WebSocket服务器URL
  protocols?: string | string[];  // 子协议
  reconnectAttempts?: number;     // 重连尝试次数 (默认: 3)
  reconnectInterval?: number;     // 重连间隔 (毫秒, 默认: 3000)
  heartbeatInterval?: number;     // 心跳间隔 (毫秒, 默认: 30000)
  onOpen?: (event: Event) => void;
  onClose?: (event: CloseEvent) => void;
  onError?: (event: Event) => void;
  onMessage?: (message: WebSocketMessage) => void;
}
```

### WebSocketMessage

```typescript
interface WebSocketMessage {
  type: string;        // 消息类型
  data?: any;          // 消息数据
  timestamp?: number;  // 时间戳
}
```

## 返回值

### UseWebSocketReturn

```typescript
interface UseWebSocketReturn {
  socket: WebSocket | null;           // WebSocket实例
  isConnected: boolean;               // 是否已连接
  isConnecting: boolean;              // 是否正在连接
  connectionState: number;            // 连接状态码
  send: (message: WebSocketMessage) => void;     // 发送JSON消息
  sendRaw: (data: string | ArrayBufferLike | Blob | ArrayBufferView) => void;  // 发送原始数据
  connect: () => void;                // 手动连接
  disconnect: () => void;             // 手动断开
  reconnect: () => void;              // 重新连接
  lastMessage: WebSocketMessage | null;  // 最后收到的消息
  error: Event | null;                // 最后的错误
}
```

## 最佳实践

1. **自动清理**: hooks会自动处理组件卸载时的清理工作
2. **错误处理**: 总是提供错误处理回调
3. **重连策略**: 根据应用需求调整重连参数
4. **消息类型**: 使用明确的消息类型来组织不同的业务逻辑
5. **心跳检测**: 启用心跳检测以维持长连接

## 示例

查看 `src/components/examples/WebSocketExample.tsx` 了解完整的使用示例。

要运行示例:
```bash
npm run dev
```

然后访问 `http://localhost:3000/websocket-demo`
