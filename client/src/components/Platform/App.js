import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Home, Book, Settings, LogOut } from 'lucide-react';
import { UserContext } from '../../contexts/UserContext';

import { ThemeProvider } from 'styled-components';
import { ThemeContext, darkTheme, lightTheme } from './contexts/ThemeContext';
import { GamesProvider } from './contexts/GamesContext';
import { SocketProvider } from './contexts/SocketContext';

import GlobalStyle from '../../style/GlobalStyle';
import ErrorBoundary from '../../components/ErrorBoundary';

import Header from './components/layout/Header';
import Main from './components/layout/Main';
import HeroSection from './components/main/HeroSection';
import News from './components/main/News';
import Recommendations from './components/main/Recommendations';
import GamesManager from './components/games/GamesManager';
import ChatManager from './components/chat/ChatManager';
import MobileMenu from './components/layout/MobileMenu';

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  display: flex;
  flex-direction: column;
`;



const ShopSection = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
`;

const DonationsSection = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
`;

const SubscriptionsSection = styled.div`
  padding: 1rem;
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
`;

const SettingsSection = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
`;

// App Component
const App = () => {
  const { user, logout } = useContext(UserContext);

  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      const parsedTheme = JSON.parse(savedTheme);
      return parsedTheme;
    }
    return { ...darkTheme, mode: 'dark' };
  });
  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = localStorage.getItem('activeTab');
    return savedTab || 'home';
  });
  const [selectedGame, setSelectedGame] = useState(() => {
    const savedGame = localStorage.getItem('SelectedGame');
    return savedGame ? JSON.parse(savedGame) : null;
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Listen for custom tab change events
    const handleTabChange = (event) => {
      setActiveTab(event.detail.tab);
    };
    
    window.addEventListener('changeTab', handleTabChange);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('changeTab', handleTabChange);
    };
  }, []);

  // Синхронизируем состояние selectedGame с localStorage
  useEffect(() => {
    if (selectedGame) {
      localStorage.setItem('SelectedGame', JSON.stringify(selectedGame));
    } else {
      localStorage.removeItem('SelectedGame');
    }
  }, [selectedGame]);

  // Отслеживаем изменения в localStorage и обновляем состояние, а также обрабатываем смену вкладок
  useEffect(() => {
    // Сохраняем активную вкладку в localStorage
    localStorage.setItem('activeTab', activeTab);

    const handleStorageChange = (e) => {
      if (e.key === 'SelectedGame') {
        const newSelectedGame = e.newValue ? JSON.parse(e.newValue) : null;
        setSelectedGame(newSelectedGame);
      }
      // We don't need to specifically handle HighlightGameId here since
      // GamesManager.jsx already handles it directly
    };

    // Обрабатываем смену вкладок
    if (activeTab !== 'games') {
      localStorage.removeItem('SelectedGame');
      setSelectedGame(null); // Также сбрасываем состояние
    } else {
      // При переходе на вкладку "games" проверяем текущее значение в localStorage
      const storedGame = localStorage.getItem('SelectedGame');
      if (storedGame) {
        setSelectedGame(JSON.parse(storedGame));
      } else {
        setSelectedGame(null);
      }
    }

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [activeTab]);

  // Сохраняем тему в localStorage при её изменении
  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(currentTheme));
  }, [currentTheme]);

  const toggleTheme = () => {
    if (currentTheme.mode === 'dark') {
      setCurrentTheme({ ...lightTheme, mode: 'light' });
    } else {
      setCurrentTheme({ ...darkTheme, mode: 'dark' });
    }
  };



  // Function to render content based on active tab
  const renderContent = () => {
    const isGameSelected = !!selectedGame;
    switch (activeTab) {
      case 'home':
        return (
          <>
            <News theme={currentTheme} />
            <Recommendations theme={currentTheme} />
          </>
        );
      case 'games':
        return (
          <>
            {!isGameSelected && <HeroSection theme={currentTheme} />}
            <GamesManager theme={currentTheme} selectedGame={selectedGame} setSelectedGame={setSelectedGame} />
          </>
        );
      case 'shop':
        return (
          <>
            <ShopSection theme={currentTheme}>
              <h2>Магазин</h2>
              <DonationsSection theme={currentTheme}>
                <h3>Донат</h3>
                <p>Пожертвования для поддержки платформы и разработки новых функций.</p>
              </DonationsSection>
              <SubscriptionsSection theme={currentTheme}>
                <h3>Подписки</h3>
                <p>Ежемесячные и годовые подписки с премиум-функциями.</p>
              </SubscriptionsSection>
            </ShopSection>
          </>
        );
      case 'settings':
        return (
          <SettingsSection theme={currentTheme}>
            <h2>Настройки пользователя</h2>
            <p>Имя пользователя: {user?.name || user?.username || 'Не указано'}</p>
            <p>Email: {user?.email || 'Не указано'}</p>
            <p>Роль: {user?.role || 'Пользователь'}</p>
          </SettingsSection>
        );
      default:
        return (
          <>
            {!isGameSelected && <HeroSection theme={currentTheme} />}
            <GamesManager theme={currentTheme} selectedGame={selectedGame} setSelectedGame={setSelectedGame} />
          </>
        );
    }
  };

  const menuItems = [
    { icon: Home, label: 'Главная', href: '#' },
    { icon: Book, label: 'Игры', href: '#' },
    { icon: Book, label: 'Магазин', href: '#' },
    { icon: Settings, label: 'Настройки', href: '#' },
    { icon: LogOut, label: 'Выйти', href: '#' }
  ];

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, setTheme: setCurrentTheme }}>
      <ThemeProvider theme={currentTheme}>
        <SocketProvider>
          <GamesProvider>
            <GlobalStyle />
            <ErrorBoundary>
              <Container>
                <Header
                  theme={currentTheme}
                  toggleTheme={toggleTheme}
                  setShowMobileMenu={setShowMobileMenu}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  onSettingsClick={() => setActiveTab('settings')}
                  setSelectedGame={setSelectedGame}
                  onLogout={logout}
                />

                <Main>
                  {renderContent()}
                </Main>

                <ChatManager theme={currentTheme} />

                <MobileMenu
                  showMobileMenu={showMobileMenu}
                  setShowMobileMenu={setShowMobileMenu}
                  theme={currentTheme}
                  menuItems={menuItems}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  onLogout={logout}
                  setSelectedGame={setSelectedGame}
                />
              </Container>
            </ErrorBoundary>
          </GamesProvider>
        </SocketProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;
