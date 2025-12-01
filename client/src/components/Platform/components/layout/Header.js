import styled from 'styled-components';
import { useGames } from '../../contexts/GamesContext';
import HeaderContent from '../header/HeaderContent';
import TopHeader from '../header/TopHeader';
import Logo from '../header/Logo';
import Navigation from '../header/Navigation';
import HeaderActions from '../header/HeaderActions';
import FavoritesBar from '../header/FavoritesBar';

const StyledHeader = styled(({ theme, ...props }) => <header {...props} />)`
  background-color: ${props => props.theme.surface};
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-bottom: 1px solid ${props => props.theme.border};
  position: relative;
`;

const Header = ({ theme, toggleTheme, setShowMobileMenu, activeTab, onTabChange, onSettingsClick, setSelectedGame, onLogout }) => {
  const { favorites } = useGames();
  
  return (
    <StyledHeader theme={theme}>
      <HeaderContent>
        <TopHeader>
          <Logo theme={theme} />
          <Navigation theme={theme} activeTab={activeTab} onTabChange={onTabChange} setSelectedGame={setSelectedGame} />
          <HeaderActions 
            favorites={favorites}
            toggleTheme={toggleTheme} 
            setShowMobileMenu={setShowMobileMenu} 
            theme={theme} 
            onSettingsClick={onSettingsClick}
            onLogout={onLogout}
          />
        </TopHeader>
        <FavoritesBar favorites={favorites} theme={theme} setSelectedGame={setSelectedGame} onTabChange={onTabChange} />
      </HeaderContent>
    </StyledHeader>
  );
};

export default Header;