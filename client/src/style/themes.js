// Объединенный файл тем

// Тема для Epic Games
export const epicGamesDarkTheme = {
  colors: {
    // Текст
    textStroke: '#000000',          // Обводка текста
    textColorPrimary: '#FFFFFF',    // Цвет текста (основной)
    textColorSecond: '#86898E',     // Цвет текста (второй)
    textColorLink: '#0070CC',       // Цвет ссылки
    textColorLinkActive: '#0074E0', // Цвет ссылки при наведении

    // Фон
    background: '#101117',          // Основной фон
    surface: '#1a1b23',             // Поверхность
    card: '#21222c',                // Карточки
    modal: '#15171e',               // Модальные окна

    // Формы
    inputBackground: '#101117',     // Фон полей ввода
    inputBorder: '#4A4C50',         // Границы полей ввода
    inputText: '#FFFFFF',           // Текст полей ввода

    // Кнопки
    buttonPrimary: '#0074E0',       // Основная кнопка
    buttonPrimaryHover: '#0056b3',  // Основная кнопка при наведении
    buttonSecondary: '#0070CC',     // Вторичная кнопка
    buttonSecondaryHover: '#0056b3', // Вторичная кнопка при наведении
    buttonDisabled: '#cccccc',      // Неактивная кнопка

    // Иконки
    iconColor: '#FFFFFF',           // Цвет иконок
    iconHover: '#0074E0',           // Цвет иконок при наведении

    // Ошибки
    error: '#ef4444',               // Цвет ошибки
    errorBackground: '#fee2e2',     // Фон ошибки
    errorBorder: '#fecaca',         // Граница ошибки
  },
  // Добавляем свойства, используемые в Platform
  text: '#FFFFFF',
  textSecondary: '#86898E',
  primary: '#0074E0',
  secondary: '#0070CC',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  border: '#4A4C50',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  chat: {
    background: '#21222c',
    message: '#2a2b36',
    user: '#2a2b36',
    text: '#FFFFFF',
    textSecondary: '#86898E'
  }
};

// Тема для Platform
export const platformDarkTheme = {
  background: '#1a1a1a',
  surface: '#2d2d2d',
  card: '#3d3d3d',
  text: '#ffffff',
  textSecondary: '#b3b3b3',
  primary: '#4f46e5',
  secondary: '#7c3aed',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  border: '#404040',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  chat: {
    background: '#3d3d3d',
    message: '#4d4d4d',
    user: '#5d5d5d',
    text: '#ffffff',
    textSecondary: '#b3b3b3'
  },
  // Добавляем свойства, используемые в Epic Games теме
  textStroke: '#000000',
  textColorPrimary: '#FFFFFF',
  textColorSecond: '#b3b3b3',
  textColorLink: '#4f46e5',
  textColorLinkActive: '#6366f1',
  inputBackground: '#1a1a1a',
  inputBorder: '#404040',
  inputText: '#FFFFFF',
  buttonPrimary: '#4f46e5',
  buttonPrimaryHover: '#4338ca',
  buttonSecondary: '#7c3aed',
  buttonSecondaryHover: '#6d28d9',
  buttonDisabled: '#94a3b8',
  iconColor: '#FFFFFF',
  iconHover: '#4f46e5',
  errorBackground: '#fee2e2',
  errorBorder: '#fecaca',
};

// Светлая тема для Platform
export const platformLightTheme = {
  background: '#f5f5f5',
  surface: '#ffffff',
  card: '#ffffff',
  text: '#1a1a1a',
  textSecondary: '#666666',
  primary: '#4f46e5',
  secondary: '#7c3aed',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  border: '#e5e5e5',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  chat: {
    background: '#ffffff',
    message: '#f5f5f5',
    user: '#e5e5e5',
    text: '#1a1a1a',
    textSecondary: '#666666'
  },
  // Добавляем свойства, используемые в Epic Games теме
  textStroke: '#000000',
  textColorPrimary: '#1a1a1a',
  textColorSecond: '#666666',
  textColorLink: '#4f46e5',
  textColorLinkActive: '#6366f1',
  inputBackground: '#ffffff',
  inputBorder: '#e5e5e5',
  inputText: '#1a1a1a',
  buttonPrimary: '#4f46e5',
  buttonPrimaryHover: '#4338ca',
  buttonSecondary: '#7c3aed',
  buttonSecondaryHover: '#6d28d9',
  buttonDisabled: '#cbd5e1',
  iconColor: '#1a1a1a',
  iconHover: '#4f46e5',
  errorBackground: '#fee2e2',
  errorBorder: '#fecaca',
};

// Экспортируем также как отдельные объекты для обратной совместимости
export const darkThemeEpicGames = epicGamesDarkTheme;
export const darkTheme = platformDarkTheme;
export const lightTheme = platformLightTheme;