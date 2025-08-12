'use client';

import { useEffect, useRef } from 'react';
import { WebSocketMessage } from '@/types/websocket';

interface EventListener {
  type: string;
  handler: (message: WebSocketMessage) => void;
}

export const useWebSocketEvents = () => {
  const listenersRef = useRef<Map<string, ((message: WebSocketMessage) => void)[]>>(new Map());

  // 添加事件监听器
  const addEventListener = (type: string, handler: (message: WebSocketMessage) => void) => {
    const listeners = listenersRef.current.get(type) || [];
    listeners.push(handler);
    listenersRef.current.set(type, listeners);

    // 返回清理函数
    return () => {
      const currentListeners = listenersRef.current.get(type) || [];
      const index = currentListeners.indexOf(handler);
      if (index > -1) {
        currentListeners.splice(index, 1);
        if (currentListeners.length === 0) {
          listenersRef.current.delete(type);
        } else {
          listenersRef.current.set(type, currentListeners);
        }
      }
    };
  };

  // 移除事件监听器
  const removeEventListener = (type: string, handler: (message: WebSocketMessage) => void) => {
    const listeners = listenersRef.current.get(type) || [];
    const index = listeners.indexOf(handler);
    if (index > -1) {
      listeners.splice(index, 1);
      if (listeners.length === 0) {
        listenersRef.current.delete(type);
      } else {
        listenersRef.current.set(type, listeners);
      }
    }
  };

  // 触发事件
  const emit = (message: WebSocketMessage) => {
    const listeners = listenersRef.current.get(message.type) || [];
    listeners.forEach(handler => {
      try {
        handler(message);
      } catch (error) {
        console.error(`Error in WebSocket event handler for type "${message.type}":`, error);
      }
    });
  };

  // 清理所有监听器
  const clearAllListeners = () => {
    listenersRef.current.clear();
  };

  // 获取指定类型的监听器数量
  const getListenerCount = (type: string) => {
    return listenersRef.current.get(type)?.length || 0;
  };

  // 获取所有事件类型
  const getEventTypes = () => {
    return Array.from(listenersRef.current.keys());
  };

  return {
    addEventListener,
    removeEventListener,
    emit,
    clearAllListeners,
    getListenerCount,
    getEventTypes
  };
};

// Hook for easily adding/removing event listeners with cleanup
export const useWebSocketEventListener = (
  type: string,
  handler: (message: WebSocketMessage) => void,
  events: ReturnType<typeof useWebSocketEvents>
) => {
  useEffect(() => {
    const cleanup = events.addEventListener(type, handler);
    return cleanup;
  }, [type, handler, events]);
};
