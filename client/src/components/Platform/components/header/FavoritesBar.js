import styled from 'styled-components';
import FavoriteGame from './FavoriteGame';
import Label from './LableFavorite';
import { useScreen } from '../../../../contexts/ScreenContext';

const StyledFavoritesBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.5rem 0;
  scrollbar-width: thin;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.surface};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.primary};
    border-radius: 2px;
  }
`;

const GamesContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const FavoritesBar = ({ favorites, theme, setSelectedGame, onTabChange }) => {
  const { device } = useScreen();
  
  if (!favorites || favorites.length === 0) {
    return null;
  }

  return (
    <StyledFavoritesBar theme={theme}>
      {device === 'pc' && <Label theme={theme}>ИЗБРАННОЕ:</Label>}
      <GamesContainer>
        {favorites.map(game => (
          <FavoriteGame key={game.id} game={game} theme={theme} setSelectedGame={setSelectedGame} onTabChange={onTabChange} />
        ))}
      </GamesContainer>
    </StyledFavoritesBar>
  );
};

export default FavoritesBar;