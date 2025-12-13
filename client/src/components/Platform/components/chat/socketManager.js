import { io } from 'socket.io-client';

class SocketManager {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.eventHandlers = new Map(); // Store event handlers to prevent duplicates
    this.SERVER_URL = process.env.REACT_APP_SERVER_WSURL;
  }

  connect(token) {
    if (this.socket) {
      this.disconnect();
    }

    this.socket = io(this.SERVER_URL, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
      auth: {
        token: token
      },
      timeout: 20000,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000
    });

    this.setupEventListeners();

    return this.socket;
  }

  setupEventListeners() {
    this.socket.on('connect', () => {
      console.log('Подключено к серверу:', this.socket.id);
      this.isConnected = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Отключено от сервера');
      this.isConnected = false;
    });

    this.socket.on('reconnect', (attemptNumber) => {
      console.log('Переподключение к серверу:', attemptNumber);
      this.isConnected = true;
      window.dispatchEvent(new CustomEvent('socketReconnected'));
    });

    this.socket.on('connect_error', (error) => {
      console.error('Ошибка подключения:', error);
      this.isConnected = false;
    });

    this.socket.on('reconnect_error', (error) => {
      console.error('Ошибка переподключения:', error);
    });

    this.socket.on('reconnect_failed', () => {
      console.error('Не удалось переподключиться к серверу');
      this.isConnected = false;
    });
  }

  // Method to add event listener with duplicate prevention
  addEventListener(event, handler) {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    
    // Check if handler already exists
    const handlers = this.eventHandlers.get(event);
    if (!handlers.includes(handler)) {
      handlers.push(handler);
      this.socket.on(event, handler);
    }
  }

  // Method to remove event listener
  removeEventListener(event, handler) {
    if (this.eventHandlers.has(event)) {
      const handlers = this.eventHandlers.get(event);
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
        this.socket.off(event, handler);
      }
    }
  }

  // Method to remove all listeners for an event
  removeAllEventListeners(event) {
    if (this.eventHandlers.has(event)) {
      const handlers = this.eventHandlers.get(event);
      handlers.forEach(handler => {
        this.socket.off(event, handler);
      });
      this.eventHandlers.delete(event);
    }
  }

  emit(event, data) {
    if (this.socket && this.isConnected) {
      this.socket.emit(event, data);
    }
  }

  disconnect() {
    if (this.socket) {
      // Remove all our custom event listeners before disconnecting
      for (let [event, handlers] of this.eventHandlers) {
        handlers.forEach(handler => {
          this.socket.off(event, handler);
        });
      }
      this.eventHandlers.clear();
      
      this.socket.close();
      this.socket = null;
      this.isConnected = false;
    }
  }

  getSocket() {
    return this.socket;
  }

  getIsConnected() {
    return this.isConnected;
  }

  // Game-specific methods
  joinGameRoom(roomId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('joinRoom', { roomId });
    }
  }

  leaveGameRoom(roomId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('leaveRoom', { roomId });
    }
  }

  sendMessageToRoom(roomId, text) {
    if (this.socket && this.isConnected) {
      this.socket.emit('sendMessage', { roomId, text });
    }
  }
}

// Create a singleton instance
const socketManager = new SocketManager();
export default socketManager;