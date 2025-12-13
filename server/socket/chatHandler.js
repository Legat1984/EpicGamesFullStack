const Message = require('../models/Message');
const Room = require('../models/Room');
const User = require('../models/User');

const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

// ID общей комнаты
const GENERAL_CHAT_ID = '692c99e7640a5c477a79ef11';

// Кэш активных игровых комнат (в реальном приложении это может быть в Redis или базе данных)
const activeGameRooms = new Set();

// Вспомогательная функция для проверки валидности ObjectId
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// Функция для добавления игровой комнаты в кэш активных комнат
const addActiveGameRoom = (roomId) => {
  activeGameRooms.add(roomId);
};

// Функция для удаления игровой комнаты из кэша активных комнат
const removeActiveGameRoom = (roomId) => {
  activeGameRooms.delete(roomId);
};

// Функция для проверки, является ли комната активной игровой комнатой
const isActiveGameRoom = (roomId) => {
  return activeGameRooms.has(roomId);
};

module.exports = (io) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token || socket.handshake.query.token;

    if (!token) {
      console.log('Токен отсутствует при подключении сокета');
      return next(new Error('Требуется авторизация'));
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      socket.user = decoded;
      next();
    } catch (err) {
      console.log('Ошибка проверки токена при подключении сокета:', err.message);
      next(new Error('Неверный или истекший токен'));
    }
  });

  io.on('connection', (socket) => {
    console.log('Пользователь подключился:', socket.id);
    console.log('Пользователь ID:', socket.user.userId || socket.user.id);

    // Автоматически присоединяем пользователя к общей комнате при подключении
    socket.join(GENERAL_CHAT_ID);
    console.log(`Пользователь ${socket.id} присоединился к общей комнате`);

    // Добавляем общую комнату к списку подключенных комнат
    if (!socket.joinedRooms) {
      socket.joinedRooms = new Set();
    }
    socket.joinedRooms.add(GENERAL_CHAT_ID);

    // Присоединение к комнате
    socket.on('joinRoom', async (data) => {
      try {
        const { roomId } = data;
        const userId = socket.user.userId || socket.user.id;

        // Проверяем, является ли это общей комнатой
        if (roomId === GENERAL_CHAT_ID) {
          // Пользователь уже автоматически присоединен к общей комнате
          console.log('Пользователь пытается присоединиться к общей комнате, которая уже доступна');
          
          // Отправляем историю сообщений общей комнаты
          const messages = await Message.find({ room: roomId })
            .populate('user', 'login avatar')
            .sort({ createdAt: 1 })
            .limit(50); // ограничиваем количество сообщений

          socket.emit('loadMessages', { roomId, messages });
          return;
        }

        // Проверяем существование комнаты
        console.log('Полученный roomId:', roomId, 'Тип:', typeof roomId);

        // Проверим, является ли roomId валидным ObjectId
        if (!isValidObjectId(roomId)) {
          console.log('roomId не является валидным ObjectId:', roomId);
          socket.emit('error', { message: 'Неверный формат ID комнаты' });
          return;
        }

        // Преобразуем roomId в ObjectId, если он передан как строка
        const objectId = typeof roomId === 'string' && mongoose.Types.ObjectId.isValid(roomId) ? new mongoose.Types.ObjectId(roomId) : roomId;

        const room = await Room.findById(objectId);
        if (!room) {
          console.log("Комната не найдена");
          socket.emit('error', { message: 'Комната не найдена' });
          return;
        }

        // Проверяем, есть ли пользователь в участниках комнаты
        if (!room.participants.includes(userId)) {
          console.log(`Пользователь ${userId} не является участником комнаты ${roomId}`);
          socket.emit('error', { message: 'У вас нет доступа к этой комнате' });
          return;
        }

        // Проверяем, является ли комната активной игровой комнатой (если это игровая комната)
        // В реальном приложении это может быть проверка через Redis или другую систему
        // Для простоты сейчас мы просто проверяем, что комната существует в базе данных

        if (!socket.joinedRooms) {
          socket.joinedRooms = new Set();
        }
        socket.joinedRooms.add(roomId);

        // Добавляем пользователя к комнате
        socket.join(roomId);

        // Обновляем список участников комнаты в базе данных
        // Проверяем, что пользователь действительно является участником комнаты перед добавлением
        const room = await Room.findById(roomId);
        if (room && room.participants.includes(userId)) {
          await Room.findByIdAndUpdate(roomId, {
            $addToSet: { participants: userId }
          });
        }

        // Уведомляем других пользователей о присоединении
        socket.to(roomId).emit('userJoined', {
          userId,
          roomId,
          message: `Пользователь присоединился к комнате ${room.name}`
        });

        // Отправляем историю сообщений пользователю
        const messages = await Message.find({ room: roomId })
          .populate('user', 'login avatar')
          .sort({ createdAt: 1 })
          .limit(50); // ограничиваем количество сообщений

        socket.emit('loadMessages', { roomId, messages });
      } catch (error) {
        console.error('Ошибка при присоединении к комнате:', error);
        socket.emit('error', { message: 'Ошибка при присоединении к комнате' });
      }
    });

    // Отправка сообщения
    socket.on('sendMessage', async (data) => {
      try {
        const { roomId, text } = data;
        const userId = socket.user.userId || socket.user.id;

        // Проверяем валидность данных
        if (!roomId || !text || typeof text !== 'string' || text.trim().length === 0) {
          socket.emit('error', { message: 'Неверные данные сообщения' });
          return;
        }

        // Проверяем, является ли roomId валидным ObjectId
        if (!isValidObjectId(roomId)) {
          socket.emit('error', { message: 'Неверный формат ID комнаты' });
          return;
        }

        // Проверяем, находится ли пользователь в этой комнате
        if (!socket.joinedRooms || !socket.joinedRooms.has(roomId)) {
          // Проверяем, является ли это общей комнатой
          if (roomId !== GENERAL_CHAT_ID) {
            // Для других комнат проверяем, состоит ли пользователь в участниках
            const room = await Room.findById(roomId);
            if (!room || !room.participants.includes(userId)) {
              socket.emit('error', { message: 'У вас нет доступа к этой комнате' });
              return;
            }
          }
        }

        // Проверяем длину сообщения
        const trimmedText = text.trim();
        if (trimmedText.length > 1000) { // Ограничение длины сообщения
          socket.emit('error', { message: 'Сообщение слишком длинное (максимум 1000 символов)' });
          return;
        }

        // Создаем новое сообщение в базе данных
        const newMessage = new Message({
          room: roomId,
          user: userId,
          text: trimmedText
        });

        const message = await newMessage.save();
        await message.populate('user', 'login avatar');

        // Рассылаем сообщение всем участникам комнаты
        io.to(roomId).emit('receiveMessage', message);

        // Обновляем комнату с последним сообщением
        await Room.findByIdAndUpdate(roomId, {
          $set: {
            lastMessageAt: newMessage.createdAt,
            lastMessage: trimmedText.substring(0, 50) + (trimmedText.length > 50 ? '...' : '') // первые 50 символов
          }
        });
      } catch (error) {
        console.error('Ошибка при отправке сообщения:', error);
        socket.emit('error', { message: 'Ошибка при отправке сообщения' });
      }
    });

    // Выход из комнаты
    socket.on('leaveRoom', async (data) => {
      try {
        const { roomId } = data;
        const userId = socket.user.userId || socket.user.id;

        // Не позволяем покинуть общую комнату
        if (roomId === GENERAL_CHAT_ID) {
          console.log('Пользователь не может покинуть общую комнату');
          socket.emit('error', { message: 'Нельзя покинуть общую комнату' });
          return;
        }

        // Проверяем, является ли roomId валидным ObjectId
        if (!isValidObjectId(roomId)) {
          console.log('roomId не является валидным ObjectId:', roomId);
          socket.emit('error', { message: 'Неверный формат ID комнаты' });
          return;
        }

        // Проверяем, находится ли пользователь в этой комнате
        if (socket.joinedRooms && socket.joinedRooms.has(roomId)) {
          // Покидаем комнату
          socket.leave(roomId);

          // Удаляем комнату из списка присоединенных комнат
          socket.joinedRooms.delete(roomId);

          // Проверяем, состоит ли пользователь в участниках комнаты перед удалением
          const room = await Room.findById(roomId);
          if (room && room.participants.includes(userId)) {
            // Удаляем пользователя из участников комнаты
            await Room.findByIdAndUpdate(roomId, {
              $pull: { participants: userId }
            });
          }

          socket.to(roomId).emit('userLeft', {
            userId,
            roomId,
            message: `Пользователь покинул комнату ${roomId}`
          });

          console.log(`Пользователь ${userId} покинул комнату ${roomId}`);
        } else {
          console.log(`Пользователь ${userId} не находится в комнате ${roomId}`);
          socket.emit('error', { message: 'Вы не состоите в этой комнате' });
        }
      } catch (error) {
        console.error('Ошибка при выходе из комнаты:', error);
        socket.emit('error', { message: 'Ошибка при выходе из комнаты' });
      }
    });

    // Обработка ошибок
    socket.on('error', (error) => {
      console.log('Ошибка сокета:', error.message);
    });

    // Отключение пользователя
    socket.on('disconnect', async () => {
      const userId = socket.user.userId || socket.user.id;
      console.log('Пользователь отключился:', socket.id, 'User ID:', userId);

      // Используем наш собственный список комнат, созданный при joinRoom
      // Исключаем общую комнату из списка, чтобы пользователь оставался в ней
      const rooms = socket.joinedRooms ? Array.from(socket.joinedRooms) : [];
      console.log('Сокет был в комнатах:', rooms);

      // Проходим по всем комнатам, в которых состоял пользователь, кроме общей
      for (const roomId of rooms) {
        // Пропускаем общую комнату - пользователь остается в ней
        if (roomId === GENERAL_CHAT_ID) {
          continue;
        }

        try {
          console.log(`Пользователь покидает комнату: ${roomId}`);

          // Покидаем комнату
          socket.leave(roomId);

          // Проверяем, состоит ли пользователь в участниках комнаты перед удалением
          const room = await Room.findById(roomId);
          if (room && room.participants.includes(userId)) {
            // Удаляем пользователя из участников комнаты в базе данных
            await Room.findByIdAndUpdate(roomId, {
              $pull: { participants: userId }
            });
          }

          // Уведомляем других пользователей в комнате о том, что пользователь покинул комнату
          socket.to(roomId).emit('userLeft', {
            userId,
            roomId,
            message: `Пользователь покинул комнату ${roomId}`
          });
        } catch (error) {
          console.error(`Ошибка при выходе из комнаты ${roomId}:`, error);
        }
      }
    });

    // Получение списка комнат доступных пользователю
    socket.on('getRooms', async () => {
      try {
        const userId = socket.user.userId || socket.user.id;

        // Находим все комнаты, в которых участвует пользователь
        const userRooms = await Room.find({
          participants: userId
        }).sort({ createdAt: -1 }); // Сортируем по дате создания, новые первыми

        // Отправляем пользователю список комнат
        socket.emit('roomsList', userRooms);
      } catch (error) {
        console.error('Ошибка при получении списка комнат:', error);
        socket.emit('error', { message: 'Ошибка при получении списка комнат' });
      }
    });
  });
};

// Экспортируем функции для управления активными игровыми комнатами
module.exports.addActiveGameRoom = addActiveGameRoom;
module.exports.removeActiveGameRoom = removeActiveGameRoom;
module.exports.isActiveGameRoom = isActiveGameRoom;