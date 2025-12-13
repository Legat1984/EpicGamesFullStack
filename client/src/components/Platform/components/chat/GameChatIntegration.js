import socketManager from './socketManager';

/**
 * Интеграция чата с игровыми столами
 * Этот модуль предоставляет функции для подключения к игровым чатам
 */
class GameChatIntegration {
  /**
   * Подключиться к чату игрового стола
   * @param {string} roomId - ID игрового стола
   */
  static joinGameChat(roomId) {
    socketManager.joinGameRoom(roomId);
  }

  /**
   * Покинуть чат игрового стола
   * @param {string} roomId - ID игрового стола
   */
  static leaveGameChat(roomId) {
    socketManager.leaveGameRoom(roomId);
  }

  /**
   * Отправить сообщение в игровой чат
   * @param {string} roomId - ID игрового стола
   * @param {string} text - Текст сообщения
   */
  static sendMessageToGame(roomId, text) {
    socketManager.sendMessageToRoom(roomId, text);
  }

  /**
   * Подписаться на события игрового чата
   * @param {string} event - Название события
   * @param {function} handler - Обработчик события
   */
  static addGameChatListener(event, handler) {
    socketManager.addEventListener(event, handler);
  }

  /**
   * Отписаться от событий игрового чата
   * @param {string} event - Название события
   * @param {function} handler - Обработчик события
   */
  static removeGameChatListener(event, handler) {
    socketManager.removeEventListener(event, handler);
  }
}

export default GameChatIntegration;