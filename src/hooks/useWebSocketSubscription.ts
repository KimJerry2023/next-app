'use client';

import { useEffect, useCallback } from 'react';
import { WebSocketMessage } from '@/types/websocket';
import { useWebSocket } from './useWebSocket';

interface UseWebSocketSubscriptionOptions {
  url: string;
  messageTypes: string[];
  onMessage?: (message: WebSocketMessage) => void;
  autoConnect?: boolean;
}

export const useWebSocketSubscription = ({
  url,
  messageTypes,
  onMessage,
  autoConnect = true
}: UseWebSocketSubscriptionOptions) => {
  const websocket = useWebSocket({
    url,
    onMessage: useCallback((message: WebSocketMessage) => {
      if (messageTypes.includes(message.type)) {
        onMessage?.(message);
      }
    }, [messageTypes, onMessage])
  });

  // 自动连接
  useEffect(() => {
    if (autoConnect) {
      websocket.connect();
    }
    
    return () => {
      websocket.disconnect();
    };
  }, [autoConnect, websocket]);

  // 订阅特定消息类型
  const subscribe = useCallback((types: string[]) => {
    websocket.send({
      type: 'subscribe',
      data: { messageTypes: types }
    });
  }, [websocket]);

  // 取消订阅
  const unsubscribe = useCallback((types: string[]) => {
    websocket.send({
      type: 'unsubscribe',
      data: { messageTypes: types }
    });
  }, [websocket]);

  return {
    ...websocket,
    subscribe,
    unsubscribe
  };
};
