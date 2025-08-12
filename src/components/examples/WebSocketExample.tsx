'use client';

import { useState, useCallback } from 'react';
import { useWebSocket, useWebSocketEvents, useWebSocketEventListener } from '@/hooks';
import type { WebSocketMessage } from '@/types/websocket';
import { useTranslation } from 'react-i18next';

const WebSocketExample = () => {
  const { t } = useTranslation('common');
  const [url, setUrl] = useState('ws://localhost:8080');
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState('chat');
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);

  // WebSocket事件管理器
  const events = useWebSocketEvents();

  // WebSocket连接
  const websocket = useWebSocket({
    url,
    onMessage: useCallback((message: WebSocketMessage) => {
      // 将消息添加到列表
      setMessages(prev => [...prev, message]);
      // 触发事件
      events.emit(message);
    }, [events]),
    onOpen: useCallback((event: Event) => {
      console.log('WebSocket connection opened', event);
      setMessages(prev => [...prev, {
        type: 'system',
        data: t('websocket.connection_established'),
        timestamp: Date.now()
      }]);
    }, []),
    onClose: useCallback((event: CloseEvent) => {
      console.log('WebSocket connection closed', event);
      setMessages(prev => [...prev, {
        type: 'system',
        data: `${t('websocket.connection_closed')} (${event.code}: ${event.reason})`,
        timestamp: Date.now()
      }]);
    }, []),
    onError: useCallback((event: Event) => {
      console.error('WebSocket error', event);
      setMessages(prev => [...prev, {
        type: 'error',
        data: t('websocket.connection_error'),
        timestamp: Date.now()
      }]);
    }, [])
  });

  // 监听特定类型的消息
  useWebSocketEventListener('chat', useCallback((message: WebSocketMessage) => {
    console.log(t('websocket.received_chat'), message);
  }, []), events);

  useWebSocketEventListener('notification', useCallback((message: WebSocketMessage) => {
    console.log(t('websocket.received_notification'), message);
    // 这里可以显示通知
  }, []), events);

  // 发送消息
  const sendMessage = useCallback(() => {
    if (messageText.trim()) {
      websocket.send({
        type: messageType,
        data: messageText,
        timestamp: Date.now()
      });
      setMessageText('');
    }
  }, [websocket, messageText, messageType]);

  // 清空消息
  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  // 连接状态文本
  const getConnectionStatusText = () => {
    if (websocket.isConnecting) return t('websocket.connecting');
    if (websocket.isConnected) return t('websocket.connected');
    return t('websocket.disconnected');
  };

  // 连接状态颜色
  const getConnectionStatusColor = () => {
    if (websocket.isConnecting) return 'text-yellow-500';
    if (websocket.isConnected) return 'text-green-500';
    return 'text-red-500';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">{t('websocket.title')}</h1>
      
      {/* 连接控制 */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">{t('websocket.url_label')}</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ws://localhost:8080"
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className={`text-sm font-medium ${getConnectionStatusColor()}`}>
              {getConnectionStatusText()}
            </span>
            <div className="flex gap-2">
              <button
                onClick={websocket.connect}
                disabled={websocket.isConnected || websocket.isConnecting}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {t('websocket.connect')}
              </button>
              <button
                onClick={websocket.disconnect}
                disabled={!websocket.isConnected}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {t('websocket.disconnect')}
              </button>
              <button
                onClick={websocket.reconnect}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                {t('websocket.reconnect')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 消息发送 */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">{t('websocket.send_message')}</h3>
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">{t('websocket.message_type')}</label>
            <select
              value={messageType}
              onChange={(e) => setMessageType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="chat">{t('websocket.chat')}</option>
              <option value="notification">{t('websocket.notification')}</option>
              <option value="command">{t('websocket.command')}</option>
              <option value="custom">{t('websocket.custom')}</option>
            </select>
          </div>
          <div className="flex-2">
            <label className="block text-sm font-medium mb-1">{t('websocket.message_content')}</label>
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('websocket.message_placeholder')}
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={sendMessage}
              disabled={!websocket.isConnected || !messageText.trim()}
              className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {t('websocket.send')}
            </button>
          </div>
        </div>
      </div>

      {/* 消息历史 */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">{t('websocket.message_history')}</h3>
          <button
            onClick={clearMessages}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            {t('websocket.clear_messages')}
          </button>
        </div>
        <div className="h-80 overflow-y-auto border border-gray-300 rounded-lg p-4 bg-gray-50">
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center">{t('websocket.no_messages')}</p>
          ) : (
            messages.map((message, index) => (
              <div key={index} className="mb-2 p-2 bg-white rounded border-l-4 border-blue-400">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium text-sm text-blue-600">
                    {message.type}
                  </span>
                  <span className="text-xs text-gray-500">
                    {message.timestamp ? new Date(message.timestamp).toLocaleTimeString() : ''}
                  </span>
                </div>
                <div className="text-gray-800">
                  {typeof message.data === 'string' ? message.data : JSON.stringify(message.data)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 连接信息 */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">{t('websocket.connection_info')}</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">{t('websocket.connection_status')}:</span>
            <span className={`ml-2 ${getConnectionStatusColor()}`}>
              {getConnectionStatusText()}
            </span>
          </div>
          <div>
            <span className="font-medium">{t('websocket.connection_code')}:</span>
            <span className="ml-2">{websocket.connectionState}</span>
          </div>
          <div>
            <span className="font-medium">{t('websocket.event_listeners')}:</span>
            <span className="ml-2">{events.getEventTypes().join(', ') || t('websocket.none')}</span>
          </div>
          <div>
            <span className="font-medium">{t('websocket.last_message')}:</span>
            <span className="ml-2">
              {websocket.lastMessage ? websocket.lastMessage.type : t('websocket.none')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebSocketExample;
