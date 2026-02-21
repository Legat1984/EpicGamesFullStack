// Маршруты для игры "Гарри Поттер: Битва за Хогвартс"
const express = require('express');
const router = express.Router();
const Chapter = require('../models/Chapter');
const Card = require('../models/Card');

// Получение глав и доступных персонажей для лобби
router.get('/lobby-data', async (req, res) => {
  try {
    // Получаем все главы из базы данных
    const chapters = await Chapter.find().sort({ id: 1 });
    
    // Получаем персонажей (героев) из базы данных
    // Берем всех героев независимо от главы, так как в лобби показываем всех возможных персонажей
    const characters = await Card.find({ type: 'герой', isActive: true }).select('name _id');
    
    res.json({
      success: true,
      data: {
        chapters: chapters,
        characters: characters
      }
    });
  } catch (error) {
    console.error('Ошибка при получении данных для лобби:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении данных для лобби',
      error: error.message
    });
  }
});

// Получение глав и доступных персонажей для конкретной главы
router.get('/lobby-data/:chapterId', async (req, res) => {
  try {
    const chapterId = parseInt(req.params.chapterId);
    
    // Проверяем, является ли chapterId допустимым числом
    if (isNaN(chapterId)) {
      return res.status(400).json({
        success: false,
        message: 'Неверный ID главы'
      });
    }
    
    // Получаем все главы из базы данных
    const chapters = await Chapter.find().sort({ id: 1 });
    
    // Получаем персонажей (героев) для конкретной главы
    const characters = await Card.find({ 
      type: 'герой', 
      chapter: chapterId, 
      isActive: true 
    }).select('name _id');
    
    res.json({
      success: true,
      data: {
        chapters: chapters,
        characters: characters
      }
    });
  } catch (error) {
    console.error('Ошибка при получении данных для лобби по главе:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении данных для лобби по главе',
      error: error.message
    });
  }
});

module.exports = router;