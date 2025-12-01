import styled from 'styled-components';
import ActionButton from './ActionButton';
import { Heart } from 'lucide-react';
import { useGames } from '../../contexts/GamesContext';

const StyledGameActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const GameActions = ({ game, theme }) => {
  const { toggleFavorite } = useGames();

  const handleToggleFavorite = () => {
    toggleFavorite(game.id);
  };

  return (
    <StyledGameActions>
      <ActionsContainer>
        <ActionButton theme={theme} onClick={handleToggleFavorite}>
          <Heart size={16} fill={game.favorite ? theme.primary : 'none'} color={game.favorite ? theme.primary : theme.textSecondary} />
        </ActionButton>
        {/*<ActionButton theme={theme}>
          <Share2 size={16} />
        </ActionButton>*/}
      </ActionsContainer>
    </StyledGameActions>
  );
};

export default GameActions;