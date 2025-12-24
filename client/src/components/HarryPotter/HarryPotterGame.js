import React from 'react';
import styled from 'styled-components';
import { GameSettingsProvider, GameList, CreateGameButton } from '../../contexts/GameSettingsContext';
import Lobby from './components/lobby/Lobby';
import { useGameSettings } from '../../contexts/GameSettingsContext';

const HarryPotterContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${props => props.theme.background || '#101117'};
  color: ${props => props.theme.textColorPrimary || '#FFFFFF'};
  padding: 20px;
  box-sizing: border-box;
`;

const HarryPotterHeader = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: ${props => props.theme.textColorPrimary || '#FFFFFF'};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-family: 'fontHarryPotter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const HarryPotterSubHeader = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 30px;
  color: ${props => props.theme.textColorSecond || '#86898E'};
`;

// Internal component to access context
const HarryPotterGameInternal = () => {
  const { showLobby, setShowLobby } = useGameSettings();

  if (showLobby) {
    return <Lobby />;
  }

  return (
    <HarryPotterContainer>
      <HarryPotterHeader>Гарри Поттер: Битва за Хогвартс</HarryPotterHeader>
      <HarryPotterSubHeader>Выберите существующую игру или создайте новую</HarryPotterSubHeader>
      <GameList />
      <CreateGameButton onClick={() => setShowLobby(true)}>+</CreateGameButton>
    </HarryPotterContainer>
  );
};

const HarryPotterGame = () => {
  return (
    <GameSettingsProvider>
      <HarryPotterGameInternal />
    </GameSettingsProvider>
  );
};

export default HarryPotterGame;