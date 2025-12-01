// Импорт библиотек
import React, { useState } from 'react';

// Импорт роутеров
import { BrowserRouter as Router } from 'react-router-dom';

// Импорт провайдеров
import { UserProvider } from './contexts/UserContext.js';
import { ScreenProvider } from './contexts/ScreenContext.js';
import { ThemeProvider } from 'styled-components';

// Ипорт стилей
import GlobalStyle from './style/GlobalStyle.js';
import { epicGamesDarkTheme } from './style/themes.js';

// Импорт компонент
import EpicGamesApp from './components/EpicGames/EpicGamesApp.js'
import ErrorBoundary from './components/ErrorBoundary.js';

const App = () => {
  const [theme] = useState(epicGamesDarkTheme);

  return (
    <Router>
      <UserProvider>
        <ScreenProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <ErrorBoundary>
              <EpicGamesApp />
            </ErrorBoundary>
          </ThemeProvider>
        </ScreenProvider>
      </UserProvider>
    </Router>
  );
}

export default App;