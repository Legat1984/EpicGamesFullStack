import styled from 'styled-components';
import IconButton from './IconButton';
import MobileMenuButton from './MobileMenuButton';
import UserDropdown from './UserDropdown';
import { Globe, Menu } from 'lucide-react';
import Label from './LableFavorite';
import { useScreen } from '../../../../contexts/ScreenContext';

const StyledHeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
`;

const HeaderActions = ({ favorites, toggleTheme, setShowMobileMenu, theme, onSettingsClick, onLogout }) => {
  const { device } = useScreen();

  return (
    <StyledHeaderActions>
      {favorites && favorites.length > 0 && device === 'mobile' && <Label theme={theme}>ИЗБРАННОЕ:</Label>}
      <ActionsContainer>
        <IconButton onClick={toggleTheme} theme={theme}>
          <Globe size={20} />
        </IconButton>
        <UserDropdown
          theme={theme}
          onSettingsClick={onSettingsClick}
          onLogout={onLogout}
        />
        <MobileMenuButton onClick={() => setShowMobileMenu(true)} theme={theme}>
          <Menu size={20} />
        </MobileMenuButton>
      </ActionsContainer>
    </StyledHeaderActions>
  );
};

export default HeaderActions;