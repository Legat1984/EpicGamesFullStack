import styled from 'styled-components';
import GameTitle from './GameTitle';
import GameOriginalTitle from './GameOriginalTitle';
import GameDescription from './GameDescription';
import GameMeta from './GameMeta';
import GameActions from './GameActions';

const StyledGameContent = styled(({ theme, ...props }) => <div {...props} />)`
  padding: 1.25rem;
`;

const GameContent = ({ game, theme }) => {
  return (
    <StyledGameContent theme={theme}>
      <GameTitle theme={theme}>{game.title}</GameTitle>
      <GameOriginalTitle theme={theme}>{game.originalTitle}</GameOriginalTitle>
      <GameDescription theme={theme}>{game.description}</GameDescription>
      <GameMeta game={game} theme={theme} />
      <GameActions game={game} theme={theme} />
    </StyledGameContent>
  );
};

export default GameContent;