import styled, { css, keyframes } from 'styled-components';
import GameImage from './GameImage';
import GameContent from './GameContent';

const highlightPulse = keyframes`
  0% { transform: translateY(-4px) scale(1); }
  50% { transform: translateY(-4px) scale(1.03); }
  100% { transform: translateY(-4px) scale(1); }
`;

const StyledGameCard = styled(({ theme, isHighlighted, ...props }) => <div {...props} />)`
  background-color: ${props => props.theme.card};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  position: relative;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
  }
  
  ${props => props.isHighlighted ? `
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
  ` : ''}
  
  &.highlighted-temporarily {
    animation: ${highlightPulse} 2s ease-in-out;
    transform: translateY(-4px) !important;
    box-shadow: 0 8px 25px rgba(0,0,0,0.4), 0 0 0 3px rgba(128, 204, 128, 0.5) !important;
  }
`;

const PlayButton = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 85%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10;

  ${StyledGameCard}:hover &,
  ${StyledGameCard}[data-is-highlighted="true"] & {
    opacity: 1;
  }
`;

const PlayText = styled.span`
  color: #4a90e2;
  font-size: 1.5rem;
  font-weight: bold;
  opacity: 1;
  transition: opacity 0.3s ease;
  
  /* Полупрозрачный белый фон */
  background-color: rgba(255, 255, 255, 0.7);
  
  /* Граница */
  border: 1px solid rgba(0, 0, 0, 0.2);
  
  /* Отступы */
  padding: 0.5rem 1rem;
  
  /* Опционально: скругление углов для лучшего вида */
  border-radius: 4px;
`;

const GameCard = ({ game, theme, onClick, isHighlighted }) => {
  return (
    <StyledGameCard theme={theme} isHighlighted={isHighlighted} data-is-highlighted={isHighlighted} data-game-id={game.id}>
      <PlayButton onClick={onClick}>
        <PlayText>Играть</PlayText>
      </PlayButton>
      <GameImage src={game.image} alt={game.title} />        
      <GameContent game={game} theme={theme} />
    </StyledGameCard>
  );
};

export default GameCard;