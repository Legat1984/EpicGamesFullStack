// Маршруты для игры "Гарри Поттер: Битва за Хогвартс"
const express = require('express');
const router = express.Router();
const Chapter = require('../models/Chapter');
const Card = require('../models/Card');

// Получение глав для лобби
router.get('/chapters-data', async (req, res) => {
  try {
    // Получаем все главы из базы данных
    const chapters = await Chapter.find().sort({ id: 1 });
    
    res.json({
      success: true,
      data: {
        chapters: chapters
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

// Получение персонажей (героев) для конкретной главы
router.get('/characters-data/:chapterId', async (req, res) => {
  try {
    const chapterId = parseInt(req.params.chapterId);
    
    // Проверяем, является ли chapterId допустимым числом
    if (isNaN(chapterId)) {
      return res.status(400).json({
        success: false,
        message: 'Неверный ID главы'
      });
    }
    
    // Получаем персонажей (героев) для конкретной главы
    const characters = await Card.find({ 
      type: 'герой', 
      chapter: chapterId, 
      isActive: true 
    }).select('name _id');
    
    res.json({
      success: true,
      data: {
        characters: characters
      }
    });
  } catch (error) {
    console.error('Ошибка при получении персонажей для главы:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении персонажей для главы',
      error: error.message
    });
  }
});

module.exports = router;