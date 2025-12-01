// src/contexts/ThemeContext.js
import { createContext, useContext } from 'react';

// Определяем темы в отдельном файле
import { darkTheme, lightTheme } from '../../../style/themes';

// Создаем контекст
export const ThemeContext = createContext();

// Хук для удобного использования контекста
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Экспортируем темы, чтобы использовать в App.js
export { darkTheme, lightTheme };