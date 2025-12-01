import styled from 'styled-components';
import GameImage from './GameImage';
import GameContent from './GameContent';

const StyledGameCard = styled(({ theme, ...props }) => <div {...props} />)`
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

  ${StyledGameCard}:hover & {
    opacity: 1;
  }
`;

const PlayText = styled.span`
  color: rgba(128, 204, 128, 1);
  font-size: 1.5rem;
  font-weight: bold;
  opacity: 1;
  transition: opacity 0.3s ease;
`;

const GameCard = ({ game, theme, onClick }) => {
  return (
    <StyledGameCard theme={theme}>
      <PlayButton onClick={onClick}>
        <PlayText>Играть</PlayText>
      </PlayButton>
      <GameImage src={game.image} alt={game.title} />        
      <GameContent game={game} theme={theme} />
    </StyledGameCard>
  );
};

export default GameCard;