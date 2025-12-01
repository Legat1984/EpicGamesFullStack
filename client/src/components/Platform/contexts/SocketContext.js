import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

// Подключение к серверу (адрес сервера можно изменить при необходимости)
const SERVER_URL = process.env.REACT_APP_SERVER_WSURL;

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Получаем токен из localStorage
    const token = localStorage.getItem('token');
    
    // Создаем соединение с сервером
    const newSocket = io(SERVER_URL, {
      withCredentials: false,
      transports: ['websocket', 'polling'],
      // Добавляем токен для аутентификации
      auth: {
        token: token
      },
      // Добавляем таймауты и другие настройки для лучшей стабильности
      timeout: 20000,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000
    });

    newSocket.on('connect', () => {
      console.log('Подключено к серверу:', newSocket.id);
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Отключено от сервера');
      setIsConnected(false);
    });

    newSocket.on('reconnect', (attemptNumber) => {
      console.log('Переподключение к серверу:', attemptNumber);
      setIsConnected(true);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Ошибка подключения:', error);
      setIsConnected(false);
    });

    newSocket.on('reconnect_error', (error) => {
      console.error('Ошибка переподключения:', error);
    });

    newSocket.on('reconnect_failed', () => {
      console.error('Не удалось переподключиться к серверу');
      setIsConnected(false);
    });

    setSocket(newSocket);

    // Очищаем соединение при размонтировании
    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};