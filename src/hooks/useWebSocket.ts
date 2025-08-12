'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { 
  WebSocketMessage, 
  WebSocketOptions, 
  UseWebSocketReturn, 
  WebSocketReadyState 
} from '@/types/websocket';

export const useWebSocket = (options: WebSocketOptions): UseWebSocketReturn => {
  const {
    url,
    protocols,
    reconnectAttempts = 3,
    reconnectInterval = 3000,
    heartbeatInterval = 30000,
    onOpen,
    onClose,
    onError,
    onMessage
  } = options;

  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionState, setConnectionState] = useState<number>(WebSocketReadyState.CLOSED);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const [error, setError] = useState<Event | null>(null);

  const reconnectAttemptsRef = useRef(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const heartbeatTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  // 清理定时器
  const clearTimeouts = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    if (heartbeatTimeoutRef.current) {
      clearTimeout(heartbeatTimeoutRef.current);
      heartbeatTimeoutRef.current = null;
    }
  }, []);

  // 心跳检测
  const startHeartbeat = useCallback(() => {
    if (heartbeatInterval > 0 && socketRef.current?.readyState === WebSocketReadyState.OPEN) {
      heartbeatTimeoutRef.current = setTimeout(() => {
        if (socketRef.current?.readyState === WebSocketReadyState.OPEN) {
          socketRef.current.send(JSON.stringify({ type: 'ping', timestamp: Date.now() }));
          startHeartbeat();
        }
      }, heartbeatInterval);
    }
  }, [heartbeatInterval]);

  // 连接WebSocket
  const connect = useCallback(() => {
    if (socketRef.current?.readyState === WebSocketReadyState.OPEN || 
        socketRef.current?.readyState === WebSocketReadyState.CONNECTING) {
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const ws = new WebSocket(url, protocols);
      socketRef.current = ws;
      setSocket(ws);

      ws.onopen = (event) => {
        setIsConnected(true);
        setIsConnecting(false);
        setConnectionState(ws.readyState);
        reconnectAttemptsRef.current = 0;
        clearTimeouts();
        startHeartbeat();
        onOpen?.(event);
      };

      ws.onclose = (event) => {
        setIsConnected(false);
        setIsConnecting(false);
        setConnectionState(ws.readyState);
        clearTimeouts();
        onClose?.(event);

        // 如果不是主动关闭，尝试重连
        if (!event.wasClean && reconnectAttemptsRef.current < reconnectAttempts) {
          reconnectAttemptsRef.current++;
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, reconnectInterval);
        }
      };

      ws.onerror = (event) => {
        setError(event);
        setIsConnecting(false);
        onError?.(event);
      };

      ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          setLastMessage(message);
          
          // 处理心跳响应
          if (message.type === 'pong') {
            return;
          }
          
          onMessage?.(message);
        } catch (error) {
          // 如果无法解析为JSON，创建一个原始消息对象
          const rawMessage: WebSocketMessage = {
            type: 'raw',
            data: event.data,
            timestamp: Date.now()
          };
          setLastMessage(rawMessage);
          onMessage?.(rawMessage);
        }
      };

      setConnectionState(ws.readyState);
    } catch (error) {
      setIsConnecting(false);
      setError(error as Event);
    }
  }, [url, protocols, reconnectAttempts, reconnectInterval, onOpen, onClose, onError, onMessage, clearTimeouts, startHeartbeat]);

  // 断开连接
  const disconnect = useCallback(() => {
    clearTimeouts();
    if (socketRef.current) {
      socketRef.current.close(1000, 'User disconnected');
      socketRef.current = null;
      setSocket(null);
    }
    setIsConnected(false);
    setIsConnecting(false);
    setConnectionState(WebSocketReadyState.CLOSED);
  }, [clearTimeouts]);

  // 重连
  const reconnect = useCallback(() => {
    disconnect();
    reconnectAttemptsRef.current = 0;
    setTimeout(connect, 100);
  }, [disconnect, connect]);

  // 发送消息
  const send = useCallback((message: WebSocketMessage) => {
    if (socketRef.current?.readyState === WebSocketReadyState.OPEN) {
      const messageWithTimestamp = {
        ...message,
        timestamp: message.timestamp || Date.now()
      };
      socketRef.current.send(JSON.stringify(messageWithTimestamp));
    } else {
      console.warn('WebSocket is not connected. Cannot send message:', message);
    }
  }, []);

  // 发送原始数据
  const sendRaw = useCallback((data: string | ArrayBufferLike | Blob | ArrayBufferView) => {
    if (socketRef.current?.readyState === WebSocketReadyState.OPEN) {
      socketRef.current.send(data);
    } else {
      console.warn('WebSocket is not connected. Cannot send raw data:', data);
    }
  }, []);

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      clearTimeouts();
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [clearTimeouts]);

  return {
    socket,
    isConnected,
    isConnecting,
    connectionState,
    send,
    sendRaw,
    connect,
    disconnect,
    reconnect,
    lastMessage,
    error
  };
};
