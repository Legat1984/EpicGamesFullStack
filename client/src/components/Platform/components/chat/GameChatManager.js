/**
 * Компонент для управления игровыми комнатами чата
 * Этот компонент обеспечивает правильное подключение/покидание игровых комнат
 */

import { useEffect, useContext } from 'react';
import { UserContext } from '../../../../contexts/UserContext';
import { useSocket } from '../../contexts/SocketContext';
import socketManager from './socketManager';

const GameChatManager = ({ gameRoomId, isInGame = false }) => {
  const { user } = useContext(UserContext);
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    let currentGameRoomId = gameRoomId;

    // При подключении к сокету и наличии игровой комнаты - подключаемся к ней
    if (socket && isConnected && user && isInGame && gameRoomId) {
      socketManager.joinGameRoom(gameRoomId);
      console.log(`Подключились к игровой комнате: ${gameRoomId}`);
    }

    // При изменении игровой комнаты - переключаемся
    if (socket && user && currentGameRoomId) {
      // Покидаем предыдущую игровую комнату, если она была
      if (currentGameRoomId !== gameRoomId && currentGameRoomId) {
        socketManager.leaveGameRoom(currentGameRoomId);
        console.log(`Покинули предыдущую игровую комнату: ${currentGameRoomId}`);
      }
      
      // Подключаемся к новой игровой комнате
      if (isInGame && gameRoomId) {
        socketManager.joinGameRoom(gameRoomId);
        console.log(`Подключились к новой игровой комнате: ${gameRoomId}`);
      }
    }

    // При изменении состояния isInGame
    if (socket && user && gameRoomId) {
      if (isInGame) {
        socketManager.joinGameRoom(gameRoomId);
        console.log(`Вошли в игровую комнату: ${gameRoomId}`);
      } else {
        socketManager.leaveGameRoom(gameRoomId);
        console.log(`Покинули игровую комнату: ${gameRoomId}`);
      }
    }

    // Функция очистки при размонтировании компонента или изменении параметров
    return () => {
      // Покидаем игровую комнату только если пользователь вышел из игры
      // или компонент полностью размонтирован
      if (socket && user && currentGameRoomId && !isInGame) {
        socketManager.leaveGameRoom(currentGameRoomId);
        console.log(`Окончательно покинули игровую комнату: ${currentGameRoomId}`);
      }
    };
  }, [socket, user, isConnected, gameRoomId, isInGame]);

  // При переподключении сокета автоматически возвращаемся в игровую комнату
  useEffect(() => {
    if (socket && isConnected && user && isInGame && gameRoomId) {
      // Проверяем, нужно ли восстановить подключение к игровой комнате
      socketManager.joinGameRoom(gameRoomId);
      console.log(`Восстановлено подключение к игровой комнате после реконнекта: ${gameRoomId}`);
    }
  }, [socket, isConnected, user, isInGame, gameRoomId]);

  return null; // Этот компонент не рендерит ничего, только управляет логикой
};

export default GameChatManager;