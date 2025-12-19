// Скрипт для добавления игры "Гарри Поттер" в базу данных
require('dotenv').config();
const mongoose = require('mongoose');
const Games = require('./server/models/Games');

// Подключение к базе данных
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eicgames', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const harryPotterGame = {
  title: "Гарри Поттер",
  originalTitle: "Harry Potter",
  category: "Ролевая игра",
  players: "2-6",
  time: "2-4 часа",
  image: "/assets/Games/HarryPotter/background.jpg",
  icon: "/assets/Games/HarryPotter/icon.png",
  description: "Игра по вселенной Гарри Поттера, где вы можете прожить приключения в Хогвартсе, бороться со злом и использовать магию!",
  recommended: true
};

async function addGame() {
  try {
    // Проверяем, существует ли уже игра с таким названием
    const existingGame = await Games.findOne({ title: "Гарри Поттер" });
    
    if (existingGame) {
      console.log("Игра 'Гарри Поттер' уже существует в базе данных");
      console.log("ID игры:", existingGame._id);
    } else {
      // Создаем новую игру
      const newGame = new Games(harryPotterGame);
      const savedGame = await newGame.save();
      console.log("Игра 'Гарри Поттер' успешно добавлена в базу данных");
      console.log("ID новой игры:", savedGame._id);
    }
    
    mongoose.connection.close();
  } catch (error) {
    console.error("Ошибка при добавлении игры:", error);
    mongoose.connection.close();
  }
}

// Запуск скрипта
addGame();