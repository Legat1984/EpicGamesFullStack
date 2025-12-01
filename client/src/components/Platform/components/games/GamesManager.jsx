import React from 'react';
import { useGames } from '../../contexts/GamesContext';
import GamesGrid from '../main/GamesGrid';
import GameSettingsContent from './GameSettingsContent';
import styled from 'styled-components';

const LoadingMessage = styled(({ theme, ...props }) => <div {...props} />)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: ${props => props.theme.text};
  font-size: 1.2rem;
`;

const ErrorMessage = styled(({ theme, ...props }) => <div {...props} />)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: #ff6b6b;
  font-size: 1.2rem;
`;

const GamesManager = ({ theme, selectedGame, setSelectedGame }) => {
  const { games, loading, error } = useGames();

  const handleGameClick = (game) => {
    setSelectedGame(game);
  };

  if (error) {
    return <ErrorMessage theme={theme}>Ошибка загрузки игр: {error}</ErrorMessage>;
  }

  if (loading) {
    return <LoadingMessage theme={theme}>Загрузка игр...</LoadingMessage>;
  }

  const renderContent = () => {
    if (selectedGame) {
      return <GameSettingsContent
       game={selectedGame}
       theme={theme}
     />
   } else {
     return <GamesGrid
       games={games}
       theme={theme}
       onGameClick={handleGameClick}
     />
   }
  }

  return (
    <>
      {renderContent()}
    </>
  );
};

export default GamesManager;