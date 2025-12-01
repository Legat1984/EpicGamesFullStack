import axios from 'axios';

// Базовый URL для API (можно изменить при необходимости)
const API_BASE_URL = process.env.REACT_APP_SERVER_WSURL;

// Получить общую комнату
export const getRoomsGeneral = async () => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/api/chat/general`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
    }
    console.log(response)
    const generalRoom = await response.json();
    console.log(generalRoom);
    return generalRoom;
  } catch (error) {
    console.error('Ошибка при получении комнат:', error);
    throw error;
  }
};

// Получить все комнаты
export const getRooms = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/chat/rooms`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении комнат:', error);
    throw error;
  }
};

// Получить сообщения комнаты
export const getRoomMessages = async (roomId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/chat/rooms/${roomId}/messages`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Ошибка при получении сообщений комнаты ${roomId}:`, error);
    throw error;
  }
};

// Отправить сообщение (резервный вариант через API, если socket не работает)
export const sendMessage = async (roomId, text) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/chat/messages`, {
      roomId,
      text
    }, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error);
    throw error;
  }
};