import React, { useEffect } from 'react';
import styled from 'styled-components';
import CloseButton from '../main/CloseButton';

const MobileMenuStyled = styled(({ isOpen, theme, ...props }) => <div {...props} />)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.theme.background};
  z-index: 2001;
  display: ${props => props.isOpen ? 'flex' : 'none'};
  flex-direction: column;
`;

const MobileMenuHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MobileMenuNav = styled.nav`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MenuItemButton = styled(({ theme, ...props }) => <button {...props} />)`
  color: ${props => props.theme.text};
  text-decoration: none;
  padding: 1rem;
  border-radius: 8px;
  background-color: ${props => props.theme.surface};
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: none;
  width: 100%;
  cursor: pointer;
  text-align: left;
  
  &:hover {
    background-color: ${props => props.theme.card};
  }
  
  &.active {
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.primaryText};
  }
`;

const Overlay = styled(({ show, ...props }) => <div {...props} />)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 1999;
  display: ${props => props.show ? 'block' : 'none'};
`;

const MobileMenu = ({ 
  showMobileMenu, 
  setShowMobileMenu, 
  theme, 
  menuItems,
  activeTab,
  onTabChange,
  onLogout,
  setSelectedGame
}) => {
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showMobileMenu]);

  const handleTabChange = (label, index) => {
    setShowMobileMenu(false);
    
    if(label === 'Главная') {
      onTabChange('home');
    } else if(label === 'Игры') {
      localStorage.removeItem('SelectedGame');
      setSelectedGame(null);
      onTabChange('games');
    } else if(label === 'Магазин') {
      onTabChange('shop');
    } else if(label === 'Настройки') {
      onTabChange('settings');
    } else if(label === 'Выйти') {
      if(onLogout) {
        onLogout();
      }
    }
  };

  return (
    <>
      <MobileMenuStyled isOpen={showMobileMenu} theme={theme}>
        <MobileMenuHeader>
          <h3>Меню</h3>
          <CloseButton onClick={() => setShowMobileMenu(false)} />
        </MobileMenuHeader>
        <MobileMenuNav>
          {menuItems.map((item, index) => (
            <MenuItemButton 
              key={index} 
              onClick={(e) => {
                e.preventDefault();
                handleTabChange(item.label, index);
              }}
              className={activeTab === (item.label === 'Главная' ? 'home' : item.label === 'Игры' ? 'games' : item.label === 'Магазин' ? 'shop' : item.label === 'Настройки' ? 'settings' : '') ? 'active' : ''}
              theme={theme}
            >
              <item.icon size={20} />
              {item.label}
            </MenuItemButton>
          ))}
        </MobileMenuNav>
      </MobileMenuStyled>
      
      <Overlay 
        show={showMobileMenu} 
        onClick={() => setShowMobileMenu(false)} 
      />
    </>
  );
};

export default MobileMenu;