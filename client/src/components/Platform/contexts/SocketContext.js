import { createContext, useContext, useEffect, useState } from 'react';
import socketManager from '../components/Platform/components/chat/socketManager';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket должен использоваться в SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(socketManager.getIsConnected());

  useEffect(() => {
    // Получаем токен из localStorage
    const token = localStorage.getItem('token');

    if (token) {
      socketManager.connect(token);

      // Обновляем состояние подключения
      const updateConnectionStatus = () => {
        setIsConnected(socketManager.getIsConnected());
      };

      socketManager.addEventListener('connect', updateConnectionStatus);
      socketManager.addEventListener('disconnect', updateConnectionStatus);
      socketManager.addEventListener('reconnect', updateConnectionStatus);

      // Слушаем кастомное событие переподключения
      const handleSocketReconnect = () => {
        // Состояние обновляется через обработчики выше
      };
      window.addEventListener('socketReconnected', handleSocketReconnect);

      return () => {
        socketManager.removeEventListener('connect', updateConnectionStatus);
        socketManager.removeEventListener('disconnect', updateConnectionStatus);
        socketManager.removeEventListener('reconnect', updateConnectionStatus);
        window.removeEventListener('socketReconnected', handleSocketReconnect);
      };
    }
  }, []);

  return (
    <SocketContext.Provider value={{ 
      socket: socketManager.getSocket(), 
      isConnected: socketManager.getIsConnected() 
    }}>
      {children}
    </SocketContext.Provider>
  );
};