// Базовый URL для API (можно изменить при необходимости)
const API_BASE_URL = process.env.REACT_APP_SERVER_APIURL || process.env.REACT_APP_SERVER_WSURL;

// Получить общую комнату
export const getRoomsGeneral = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat/general`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) {
      throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
    }
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
    const response = await fetch(`${API_BASE_URL}/api/chat/rooms`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) {
      throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Ошибка при получении комнат:', error);
    throw error;
  }
};

// Получить сообщения комнаты
export const getRoomMessages = async (roomId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat/rooms/${roomId}/messages`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) {
      throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Ошибка при получении сообщений комнаты ${roomId}:`, error);
    throw error;
  }
};

// Отправить сообщение (резервный вариант через API, если socket не работает)
export const sendMessage = async (roomId, text) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat/messages`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ roomId, text })
    });
    if (!response.ok) {
      throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error);
    throw error;
  }
};