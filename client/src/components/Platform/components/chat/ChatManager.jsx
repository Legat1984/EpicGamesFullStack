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
  const [isMobile, setIsMobile] = useState(false);
  const chatEndRef = useRef(null);

  // Загрузка общей комнаты при монтировании
  useEffect(() => {
    if (activeChat && (!socket || !isConnected)) {
      console.log("Сокет не подключен, идет переподключение!");
    } else {
      console.log("Сокет подключен!");
      const token = localStorage.getItem('token');
      socket.emit('joinRoom', { roomId: activeChat, userId: user._id, token });
    }
  }, [activeChat, socket, isConnected, user._id]);
  /*useEffect(() => {
    const fetchGeneralRoom = async () => {
      try {
        const roomData = await getRoomsGeneral();
        console.log(roomData);

        // Проверяем, что возвращенные данные - это объект комнаты, а не массив
        if (roomData && typeof roomData === 'object' && roomData._id) {
          const roomArray = [roomData];
          setRooms(roomArray);

          // Устанавливаем общую комнату как активную
          if (!activeChat) {
            setActiveChat(roomData._id);
          }
        } else {
          console.error('Неверный формат данных общей комнаты:', roomData);
          setRooms([]);
        }
      } catch (error) {
        console.error('Ошибка при загрузке общей комнаты:', error);
        // Устанавливаем пустой массив в случае ошибки
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGeneralRoom();
  }, []);*/ // Убрали activeChat из зависимостей, чтобы загрузка происходила только один раз

  // Загрузка сообщений комнаты при смене активной комнаты (только если сокет не подключен)
  /*useEffect(() => {
    if (activeChat && (!socket || !isConnected)) {
      // Если сокет не подключен, используем API для получения сообщений
      const fetchMessages = async () => {
        try {
          const roomMessages = await getRoomMessages(activeChat);
          // Убедимся, что roomMessages - это массив
          const messagesArray = Array.isArray(roomMessages) ? roomMessages : [];
          setMessages(prev => ({
            ...prev,
            [activeChat]: messagesArray.map(msg => ({
              ...msg,
              id: msg._id,
              isOwn: msg.user._id === user?._id,
              time: new Date(msg.createdAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
            }))
          }));
        } catch (error) {
          console.error('Ошибка при загрузке сообщений:', error);
        }
      };

      fetchMessages();
    }
  }, [activeChat, user, socket, isConnected]);*/

  // Обработка сокет-событий
  /*useEffect(() => {
    if (socket && activeChat) {
      // Обработка получения нового сообщения
      const handleMessageReceive = (message) => {
        if (message.room === activeChat) {
          setMessages(prev => ({
            ...prev,
            [activeChat]: [...(prev[activeChat] || []), {
              ...message,
              id: message._id,
              isOwn: message.user._id === user?._id,
              time: new Date(message.createdAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
            }]
          }));
        }
      };

      // Обработка загрузки сообщений при присоединении к комнате
      const handleLoadMessages = (data) => {
        if (data.roomId === activeChat) {
          // Убедимся, что data.messages - это массив
          const messagesArray = Array.isArray(data.messages) ? data.messages : [];
          setMessages(prev => ({
            ...prev,
            [activeChat]: messagesArray.map(msg => ({
              ...msg,
              id: msg._id,
              isOwn: msg.user._id === user?._id,
              time: new Date(msg.createdAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
            }))
          }));
        }
      };

      socket.on('receiveMessage', handleMessageReceive);
      socket.on('loadMessages', handleLoadMessages);

      // Присоединяемся к комнате
      if (user && activeChat) {
        const token = localStorage.getItem('token');
        socket.emit('joinRoom', { roomId: activeChat, userId: user._id, token });
      }

      return () => {
        socket.off('receiveMessage', handleMessageReceive);
        socket.off('loadMessages', handleLoadMessages);

        // Покидаем комнату
        if (user && activeChat) {
          const token = localStorage.getItem('token');
          socket.emit('leaveRoom', { roomId: activeChat, userId: user._id, token });
        }
      };
    }
  }, [socket, activeChat, user]);*/

  // Подключение к общей комнате при подключении сокета и наличии пользователя
  /*useEffect(() => {
    if (socket && user && !activeChat) {
      // Если activeChat еще не установлен, устанавливаем общую комнату
      const fetchGeneralRoom = async () => {
        try {
          const roomData = await getRoomsGeneral();
          if (roomData && typeof roomData === 'object' && roomData._id) {
            const roomArray = [roomData];
            setRooms(roomArray);
            setActiveChat(roomData._id);
          }
        } catch (error) {
          console.error('Ошибка при загрузке общей комнаты для подключения:', error);
        }
      };

      fetchGeneralRoom();
    } else if (socket && user && activeChat) {
      // Если сокет подключен, пользователь авторизован и есть активная комната, подключаемся к ней
      const token = localStorage.getItem('token');
      socket.emit('joinRoom', { roomId: activeChat, userId: user._id, token });
    }
  }, [socket, user, activeChat]);*/

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

  const sendMessage = async () => {
    if (message.trim() && activeChat && user && socket) {
      try {
        const token = localStorage.getItem('token');
        // Отправляем сообщение через сокет
        socket.emit('sendMessage', {
          roomId: activeChat,
          userId: user._id,
          text: message.trim(),
          token
        });

        setMessage('');
      } catch (error) {
        console.error('Ошибка при отправке сообщения:', error);

        // Резервный вариант - отправка через API
        /*try {
          await sendApiMessage(activeChat, message.trim());
          setMessage('');
        } catch (apiError) {
          console.error('Ошибка при отправке сообщения через API:', apiError);
        }*/
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