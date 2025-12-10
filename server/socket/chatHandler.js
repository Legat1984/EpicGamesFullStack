const Message = require('../models/Message');
const Room = require('../models/Room');
const User = require('../models/User');

const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

// Вспомогательная функция для проверки валидности ObjectId
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
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

    // Присоединение к комнате
    socket.on('joinRoom', async (data) => {
      try {
        const { roomId } = data;
        const userId = socket.user.userId || socket.user.id;

        // Проверяем существование комнаты
        console.log('Полученный roomId:', roomId, 'Тип:', typeof roomId);

        // Проверим, является ли roomId валидным ObjectId
        if (!isValidObjectId(roomId)) {
          console.log('roomId не является валидным ObjectId:', roomId);
          socket.emit('error', { message: 'Неверный формат ID комнаты' });
          return;
        }

        // Преобразуем roomId в ObjectId, если он передан как строка
        const objectId = typeof roomId === 'string' ? new mongoose.Types.ObjectId(roomId) : roomId;

        const room = await Room.findById(objectId);
        if (!room) {
          console.log("Комната не найдена");
          socket.emit('error', { message: 'Комната не найдена' });
          return;
        }

        if (!socket.joinedRooms) {
          socket.joinedRooms = new Set();
        }
        socket.joinedRooms.add(roomId);

        // Добавляем пользователя к комнате
        socket.join(roomId);

        // Обновляем список участников комнаты в базе данных
        await Room.findByIdAndUpdate(roomId, {
          $addToSet: { participants: userId }
        });

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

          // Удаляем пользователя из участников комнаты
          await Room.findByIdAndUpdate(roomId, {
            $pull: { participants: userId }
          });

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
      const rooms = socket.joinedRooms ? Array.from(socket.joinedRooms) : [];
      console.log('Сокет был в комнатах:', rooms);

      // Проходим по всем комнатам, в которых состоял пользователь
      for (const roomId of rooms) {
        // Пропускаем комнату сокета (сам сокет автоматически покидает свою комнату при отключении)
        if (io.sockets.adapter.rooms.get(roomId)?.size === 0 || roomId === socket.id) {
          continue; // Пропускаем, если комната пуста или это собственная комната сокета
        }
        try {
          console.log(`Пользователь покидает комнату: ${roomId}`);

          // Покидаем комнату
          socket.leave(roomId);

          // Удаляем пользователя из участников комнаты в базе данных
          await Room.findByIdAndUpdate(roomId, {
            $pull: { participants: userId }
          });

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
    socket.on('getRooms', async (data) => {

    });
  });
};