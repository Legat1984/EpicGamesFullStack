import React from 'react';
import styled from 'styled-components';
import { GameSettingsProvider, GameList } from '../../contexts/GameSettingsContext';
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

const CreateGameButtonStyled = styled.button`
  display: block;
  margin: 0 auto 30px auto;
  padding: 12px 30px;
  background: ${props => props.theme.buttonPrimary || '#0074E0'};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 116, 224, 0.3);
  transition: all 0.3s ease;
  width: auto;

  &:hover {
    background: ${props => props.theme.buttonPrimaryHover || '#0056b3'};
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 116, 224, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
    padding: 10px 20px;
  }
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
      <CreateGameButtonStyled onClick={() => setShowLobby(true)}>Создать игру</CreateGameButtonStyled>
      <GameList />
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