import styled from 'styled-components';
import GameCard from './GameCard';

const StyledGamesGrid = styled(({ theme, ...props }) => <div {...props} />)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const GamesGrid = ({ games, theme, onGameClick }) => {
  return (
    <StyledGamesGrid theme={theme}>
      {games.map(game => (
        <GameCard 
          key={game.id} 
          game={game} 
          theme={theme} 
          onClick={() => onGameClick && onGameClick(game)}
        />
      ))}
    </StyledGamesGrid>
  );
};

export default GamesGrid;