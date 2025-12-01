import styled from 'styled-components';

const StyledGameMeta = styled(({ theme, ...props }) => <div {...props} />)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.75rem;
  color: ${props => props.theme.textSecondary};
`;

const GameMeta = ({ game, theme }) => {
  return (
    <StyledGameMeta theme={theme}>
      <span>Игроки: {game.players}</span>
      <span>Время: {game.time}</span>
      <span>{game.category}</span>
    </StyledGameMeta>
  );
};

export default GameMeta;