import React, { useState, useRef, useEffect, useContext } from 'react';
import { UserContext } from '../../../../contexts/UserContext';
import { useSocket } from '../../contexts/SocketContext';
import ChatWindow from './ChatWindow';
import ChatIconButton from './ChatIcon';
import socketManager from './socketManager';

const ChatManager = ({ theme }) => {
  const { user } = useContext(UserContext);
  const { socket, isConnected } = useSocket();
  const GENERAL_CHAT_ID = '692c99e7640a5c477a79ef11'; // ID общей комнаты
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(GENERAL_CHAT_ID);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState({});
  const [rooms, setRooms] = useState([]);
  const [roomsLoading, setRoomsLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [roomsLoaded, setRoomsLoaded] = useState(new Set());
  const [joinedRooms, setJoinedRooms] = useState(new Set([GENERAL_CHAT_ID]));
  const [isMobile, setIsMobile] = useState(false);
  const chatEndRef = useRef(null);

  // Подключение к общей комнате при монтировании и при подключении сокета
  useEffect(() => {
    if (socket && isConnected && user) {
      // Загрузка списка комнат
      socketManager.emit('getRooms');
      
      // Подключаемся ко всем ранее подключенным комнатам
      joinedRooms.forEach(roomId => {
        socketManager.emit('joinRoom', { roomId });
        console.log(`Подключаемся к комнате: ${roomId}`);
      });
    }
  }, [socket, isConnected, user, joinedRooms]);

  // Обработка получения списка комнат
  useEffect(() => {
    if (socket) {
      const handleGetRoomsResponse = (roomsData) => {
        setRooms(Array.isArray(roomsData) ? roomsData : []);
        setRoomsLoading(false);
      };

      socketManager.addEventListener('roomsList', handleGetRoomsResponse);

      return () => {
        socketManager.removeEventListener('roomsList', handleGetRoomsResponse);
      };
    }
  }, [socket]);

  // Обработка сокет-событий - теперь с предотвращением дубликатов
  useEffect(() => {
    if (socket) {
      // Обработка получения нового сообщения
      const handleMessageReceive = (message) => {
        setMessages(prev => {
          const currentMessages = prev[message.room] || [];
          return {
            ...prev,
            [message.room]: [...currentMessages, {
              ...message,
              id: message._id,
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
        const roomId = data.roomId;
        setMessages(prev => ({
          ...prev,
          [roomId]: messagesArray.map(msg => ({
            ...msg,
            id: msg._id,
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
          setMessagesLoading(false);
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
        setMessagesLoading(false);
      };

      socketManager.addEventListener('receiveMessage', handleMessageReceive);
      socketManager.addEventListener('loadMessages', handleLoadMessages);
      socketManager.addEventListener('error', handleError);

      return () => {
        socketManager.removeEventListener('receiveMessage', handleMessageReceive);
        socketManager.removeEventListener('loadMessages', handleLoadMessages);
        socketManager.removeEventListener('error', handleError);
      };
    }
  }, [socket, activeChat]);

  // Эффект для управления подключениями к комнатам
  useEffect(() => {
    if (socket && user && activeChat && isConnected) {
      // Если пользователь еще не подключен к активной комнате, подключаемся
      if (!joinedRooms.has(activeChat)) {
        socketManager.emit('joinRoom', { roomId: activeChat });
        setJoinedRooms(prev => {
          const newSet = new Set(prev);
          newSet.add(activeChat);

          return newSet;
        });
      }
    }
  }, [socket, user, activeChat, isConnected, joinedRooms]);

  // Функция для подключения к комнате (используется при необходимости подключиться к комнате без переключения на неё)
  const joinRoom = (roomId) => {
    if (socket && user && isConnected && !joinedRooms.has(roomId)) {
      socketManager.emit('joinRoom', { roomId });
      setJoinedRooms(prev => {
        const newSet = new Set(prev);
        newSet.add(roomId);

        return newSet;
      });
    }
  };

  // Эффект для обработки выхода из системы
  useEffect(() => {
    const handleLogout = () => {
      // При выходе из системы покидаем все комнаты, включая общую
      if (socket && user) {
        joinedRooms.forEach(roomId => {
          socketManager.emit('leaveRoom', { roomId });
        });
      }
    };

    // Слушаем кастомное событие logout
    window.addEventListener('userLogout', handleLogout);

    return () => {
      window.removeEventListener('userLogout', handleLogout);
    };
  }, [socket, user, joinedRooms]);

  // Эффект для обработки закрытия вкладки/браузера
  useEffect(() => {
    const handleBeforeUnload = () => {
      // При закрытии вкладки/браузера покидаем все комнаты
      if (socket && user) {
        joinedRooms.forEach(roomId => {
          socketManager.emit('leaveRoom', { roomId });
        });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [socket, user, joinedRooms]);

  // Эффект для обработки переподключения сокета
  useEffect(() => {
    const handleSocketReconnect = () => {
      if (socket && user && isConnected) {
        // После переподключения восстанавливаем подключение ко всем комнатам
        joinedRooms.forEach(roomId => {
          socketManager.emit('joinRoom', { roomId });
          console.log(`Восстановлено подключение к комнате: ${roomId}`);
        });
      }
    };

    window.addEventListener('socketReconnected', handleSocketReconnect);

    return () => {
      window.removeEventListener('socketReconnected', handleSocketReconnect);
    };
  }, [socket, user, isConnected, joinedRooms]);

  // Эффект для очистки соединений при размонтировании
  useEffect(() => {
    return () => {
      // При размонтировании покидаем все комнаты, кроме общей
      if (socket && user) {
        joinedRooms.forEach(roomId => {
          if (roomId !== GENERAL_CHAT_ID) {
            socketManager.emit('leaveRoom', { roomId });
          }
        });
        // Покидаем общую комнату только при полном выходе из системы
        // socketManager.emit('leaveRoom', { roomId: GENERAL_CHAT_ID }); // Закомментировано, чтобы не покидать общую комнату при обычном размонтировании
      }
    };
  }, [socket, user, joinedRooms, GENERAL_CHAT_ID]);

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
        setMessagesLoading(true);
      }
    }
  }, [activeChat, roomsLoaded]);

  const sendMessage = async () => {
    if (message.trim() && activeChat && user && socket) {
      try {
        // Отправляем сообщение через сокет
        socketManager.emit('sendMessage', {
          roomId: activeChat,
          text: message.trim()
        });

        setMessage('');
      } catch (error) {
        console.error('Ошибка при отправке сообщения:', error);
      }
    }
  };

  // Функция для переключения между комнатами
  const switchToRoom = (roomId) => {
    // Всегда подключаемся к комнате при переключении, если ещё не подключены
    joinRoom(roomId);
    // Меняем активную комнату
    setActiveChat(roomId);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Форматируем комнаты для отображения в интерфейсе
  // Убедимся, что общая комната всегда присутствует в списке
  const generalRoomExists = rooms.some(room => room._id === GENERAL_CHAT_ID);

  let allRooms = [...rooms];
  if (!generalRoomExists) {
    // Добавляем фиктивную запись для общей комнаты, если её нет в списке
    allRooms.unshift({
      _id: GENERAL_CHAT_ID,
      name: 'Общий чат',
      lastMessage: '',
      lastMessageAt: null,
      participants: []
    });
  }

  const formattedRooms = Array.isArray(allRooms) ? allRooms.map(room => ({
    id: room._id,
    name: room.name,
    lastMessage: room.lastMessage,
    lastMessageAt: room.lastMessageAt ? new Date(room.lastMessageAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) : '',
    participants: room.participants
  })) : [];

  // Объединенное состояние загрузки: и комнат, и сообщений
  const loading = roomsLoading || messagesLoading;

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
        setActiveChat={switchToRoom} // Передаем функцию переключения вместо прямого сеттера
        messages={messages}
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
        isMobile={isMobile}
        theme={theme}
        rooms={formattedRooms}
        loading={loading}
        isConnected={isConnected}
        user={user}
      />
    </>
  );
};

export default ChatManager;