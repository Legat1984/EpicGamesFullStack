import styled from 'styled-components';

const StyledNavigation = styled(({ theme, ...props }) => <nav {...props} />)`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavButton = styled(({ theme, ...props }) => <button {...props} />)`
  color: ${props => props.theme.textSecondary};
  text-decoration: none;
  font-weight: 500;
  font-size: 24px;
  transition: color 0.2s ease;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  
  &:hover {
    color: ${props => props.theme.text};
    text-decoration: underline;
    text-decoration-color: #148EFF;
  }
  
  &.active {
    color: ${props => props.theme.text};
    text-decoration: underline;
    text-decoration-color: #148EFF;
  }
`;

const Navigation = ({ theme, activeTab, onTabChange, setSelectedGame }) => {
  return (
    <StyledNavigation theme={theme}>
      <NavButton 
        className={activeTab === 'home' ? 'active' : ''} 
        onClick={(e) => {
          e.preventDefault();
          onTabChange('home');
        }}
        theme={theme}
      >
        Главная
      </NavButton>
      <NavButton 
        className={activeTab === 'games' ? 'active' : ''} 
        onClick={(e) => {
          e.preventDefault();
          localStorage.removeItem('SelectedGame');
          setSelectedGame(null);
          onTabChange('games');
        }}
        theme={theme}
      >
        Игры
      </NavButton>
      <NavButton 
        className={activeTab === 'shop' ? 'active' : ''} 
        onClick={(e) => {
          e.preventDefault();
          onTabChange('shop');
        }}
        theme={theme}
      >
        Магазин
      </NavButton>
    </StyledNavigation>
  );
};

export default Navigation;