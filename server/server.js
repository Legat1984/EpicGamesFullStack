// Подключаем локальный конфиг
require('dotenv').config()
// Импортируем необходимые модули
const express = require('express'); // Фреймворк для создания веб-приложений на Node.js
const bodyParser = require('body-parser'); // Модуль для парсинга JSON из HTTP-запросов
const mongoose = require('mongoose'); // ODM (Object Data Modeling) для работы с MongoDB
const cors = require('cors'); // Модуль для настройки CORS (Cross-Origin Resource Sharing)

// Импортируем роуты
const authRoutes = require('./routes/auth');
const gamesRoutes = require('./routes/games');
const chatRoutes = require('./routes/chat');

// Создаем экземпляр Express-приложения
const app = express()

// Определяем порт, на котором будет запущен сервер
const PORT = process.env.PORT || 5000
// Включаем поддержку CORS для разрешения кросс-доменных запросов
const corsOptions = {
  origin: process.env.CLIENT_URL ?
    process.env.CLIENT_URL.split(',') :
    [
      "http://localhost:3000",
      "http://109.71.242.8:3000",
      "http://localhost:5173" // для Vite
    ],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Включаем парсинг JSON из входящих HTTP-запросов
app.use(bodyParser.json())

// Подключаемся к MongoDB, указывая URL и настройки для подключения
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Подключение к базе данных MongoDB установлено')
  })
  .catch((err) => {
    console.error(`Произошла ошибка подключения к базе данных: ${err}`);
    process.exit(1); // Завершаем процесс при ошибке подключения
  });

// Подключаем роуты
app.use('/api/users', authRoutes)
app.use('/api/games', gamesRoutes)
//app.use('/api/chat', chatRoutes)

// Подключаем Socket.IO
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: corsOptions.origin, // Используем те же настройки CORS, что и для Express
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
  },
  transports: ['websocket', 'polling'], // Указываем доступные транспорты
  allowEIO3: true // Разрешаем версию Engine.IO 3
});

// Подключаем обработчик чата
require('./socket/chatHandler')(io);

// Запускаем сервер на указанном порту и выводим сообщение о его успешном запуске
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Сервер запущен на порту: ${PORT}`)
})