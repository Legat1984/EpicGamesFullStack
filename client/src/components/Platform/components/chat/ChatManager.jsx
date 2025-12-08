import React, { useState, useRef, useEffect, useContext } from 'react';
import { UserContext } from '../../../../contexts/UserContext';
import { useSocket } from '../../contexts/SocketContext';
import ChatWindow from './ChatWindow';
import ChatIconButton from './ChatIcon';

const ChatManager = ({ theme }) => {
  const { user } = useContext(UserContext);
  const { socket, isConnected } = useSocket();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeChat, setActiveChat] = useState('692c99e7640a5c477a79ef11');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState({});
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roomsLoaded, setRoomsLoaded] = useState(new Set());
  const [isMobile, setIsMobile] = useState(false);
  const chatEndRef = useRef(null);

  // Загрузка общей комнаты при монтировании
  useEffect(() => {
    if (socket && isConnected && user && activeChat) {
      console.log("Сокет подключен! Подключаемся к комнате:", activeChat);
    }
  }, [socket, isConnected, user, activeChat]);
  
  // Обработка сокет-событий
  useEffect(() => {
    if (socket && activeChat) {
      // Обработка получения нового сообщения
      const handleMessageReceive = (message) => {
        setMessages(prev => {
          const currentMessages = prev[activeChat] || [];
          return {
            ...prev,
            [activeChat]: [...currentMessages, {
              ...message,
              id: message._id,
              isOwn: (message.user?._id || message.user) === user?._id,
              time: new Date(message.createdAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
            }]
          };
        });
      };

      // Обработка загрузки сообщений при присоединении к комнате
      const handleLoadMessages = (data) => {
        // Убедимся, что data.messages - это массив
        const messagesArray = Array.isArray(data.messages) ? data.messages : [];
        // Используем roomId из данных, чтобы избежать проблем с синхронизацией
        const roomId = data.roomId || activeChat;
        setMessages(prev => ({
          ...prev,
          [roomId]: messagesArray.map(msg => ({
            ...msg,
            id: msg._id,
            isOwn: (msg.user?._id || msg.user) === user?._id,
            time: new Date(msg.createdAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
          }))
        }));

        // Отмечаем, что комната загружена и устанавливаем loading в false
        setRoomsLoaded(prev => {
          const newSet = new Set(prev);
          newSet.add(roomId);
          return newSet;
        });

        // Если загружаем сообщения для активной комнаты, устанавливаем loading в false
        if (roomId === activeChat) {
          setLoading(false);
        }
      };

      // Обработка ошибок
      const handleError = (errorData) => {
        console.error('Ошибка чата:', errorData.message);
        // Можно добавить уведомление пользователю о проблеме
        if (errorData.message.includes('Комната не найдена') || errorData.message.includes('ID комнаты')) {
          console.log('Ошибка при подключении к комнате:', errorData.message);
          // Попытаться установить другую комнату или уведомить пользователя
        }
        // В любом случае устанавливаем loading в false, чтобы прекратить показ индикатора загрузки
        setLoading(false);
      };

      socket.on('receiveMessage', handleMessageReceive);
      socket.on('loadMessages', handleLoadMessages);
      socket.on('error', handleError);

      // Присоединяемся к комнате при изменении activeChat
      if (user && activeChat) {
        socket.emit('joinRoom', { roomId: activeChat });
      }

      return () => {
        socket.off('receiveMessage', handleMessageReceive);
        socket.off('loadMessages', handleLoadMessages);
        socket.off('error', handleError);

        // Покидаем комнату при размонтировании
        if (user && activeChat) {
          socket.emit('leaveRoom', { roomId: activeChat });
        }
      };
    }
  }, [socket, activeChat, user]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeChat]);

  // Управление состоянием загрузки при смене активной комнаты
  useEffect(() => {
    if (activeChat) {
      // Если комната уже была загружена ранее, не устанавливаем loading в true
      if (!roomsLoaded.has(activeChat)) {
        setLoading(true);
      }
    }
  }, [activeChat, roomsLoaded]);

  const sendMessage = async () => {
    if (message.trim() && activeChat && user && socket) {
      try {
        // Отправляем сообщение через сокет
        socket.emit('sendMessage', {
          roomId: activeChat,
          text: message.trim()
        });

        setMessage('');
      } catch (error) {
        console.error('Ошибка при отправке сообщения:', error);
      }
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Форматируем комнаты для отображения в интерфейсе
  const formattedRooms = Array.isArray(rooms) ? rooms.map(room => ({
    id: room._id,
    name: room.name,
    lastMessage: room.lastMessage,
    lastMessageAt: room.lastMessageAt ? new Date(room.lastMessageAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) : '',
    participants: room.participants
  })) : [];

  return (
    <>
      <ChatIconButton
        isMobile={isMobile}
        onClick={toggleChat}
        theme={theme}
      />
      <ChatWindow
        isChatOpen={isChatOpen}
        toggleChat={toggleChat}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        messages={messages}
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
        isMobile={isMobile}
        theme={theme}
        rooms={formattedRooms}
        loading={loading}
        isConnected={isConnected}
      />
    </>
  );
};

export default ChatManager;