# Руководство по объединенным стилям и темам

## Обзор

В проекте были объединены дублирующиеся файлы стилей и тем, чтобы упростить поддержку и избежать дублирования кода.

## Изменения

### Удаленные файлы:
- `/src/style/GlobalStyle.js` - старый файл глобальных стилей
- `/src/style/themes.js` - старый файл тем Epic Games
- `/src/components/Platform/styles/GlobalStyle.js` - старый файл глобальных стилей для Platform
- `/src/components/Platform/styles/themes.js` - старый файл тем для Platform

### Новые/обновленные файлы:

#### `/src/style/UnifiedGlobalStyle.js`
- Объединяет CSS-сброс и глобальные стили из обоих предыдущих файлов
- Поддерживает темизацию через props.theme
- Включает подключение шрифтов

#### `/src/style/unifiedThemes.js`
- Содержит все темы: `epicGamesDarkTheme`, `platformDarkTheme`, `platformLightTheme`
- Обеспечивает совместимость с существующими компонентами
- Объединяет свойства из обеих тем для полной обратной совместимости

#### `/src/components/Platform/styles/GlobalStyle.js`
- Файл-перенаправление на объединенный стиль
- Поддерживает существующие импорты

#### `/src/components/Platform/styles/themes.js`
- Файл-перенаправление на объединенные темы
- Поддерживает существующие импорты

## Использование

### Для основного приложения (Epic Games):
```javascript
import GlobalStyle from './style/UnifiedGlobalStyle.js';
import { epicGamesDarkTheme } from './style/unifiedThemes.js';

// Использование темы
const [theme] = useState(epicGamesDarkTheme);
```

### Для подсистемы Platform:
```javascript
import GlobalStyle from './styles/GlobalStyle';
import { darkTheme, lightTheme } from './styles/themes';

// Использование тем
const [currentTheme, setCurrentTheme] = useState(darkTheme);
```

## Структура тем

Каждая тема теперь содержит свойства из обеих оригинальных тем, что обеспечивает полную совместимость:
- Свойства Epic Games темы (colors.*, textStroke, textColorPrimary и т.д.)
- Свойства Platform темы (background, surface, text и т.д.)
- Дополнительные свойства для полной обратной совместимости

## Преимущества

1. **Единая точка управления стилями** - все глобальные стили в одном месте
2. **Упрощенная поддержка** - изменения в одном файле влияют на все приложение
3. **Обратная совместимость** - существующий код продолжает работать без изменений
4. **Уменьшенное дублирование** - исключены дублирующиеся определения стилей и тем