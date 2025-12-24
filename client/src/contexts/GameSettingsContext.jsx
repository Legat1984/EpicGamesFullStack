import React, { createContext, useContext, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

// Create the context
const GameSettingsContext = createContext();

// Provider component
export const GameSettingsProvider = ({ children }) => {
  const [gamesList, setGamesList] = useState([
    {
      id: 1,
      createdAt: new Date(Date.now() - 3600000), // 1 hour ago
      gameName: 'Игра в Хогвартсе',
      chapter: 'Глава 1: Вступление в школу',
      playersJoined: 3,
      maxPlayers: 6
    },
    {
      id: 2,
      createdAt: new Date(Date.now() - 7200000), // 2 hours ago
      gameName: 'Поиск Кубка Огня',
      chapter: 'Глава 3: Третий испытательный турнир',
      playersJoined: 5,
      maxPlayers: 6
    },
    {
      id: 3,
      createdAt: new Date(Date.now() - 10800000), // 3 hours ago
      gameName: 'Сражение с Инферналами',
      chapter: 'Глава 5: Защита Хогвартса',
      playersJoined: 2,
      maxPlayers: 6
    },
    {
      id: 4,
      createdAt: new Date(Date.now() - 14400000), // 4 hours ago
      gameName: 'Полёт на Метеорах',
      chapter: 'Глава 2: Квиддич на высоте',
      playersJoined: 6,
      maxPlayers: 6
    }
  ]);

  const [showLobby, setShowLobby] = useState(false);

  const value = {
    gamesList,
    setGamesList,
    showLobby,
    setShowLobby
  };

  return (
    <GameSettingsContext.Provider value={value}>
      {children}
    </GameSettingsContext.Provider>
  );
};

// Custom hook to use the context
export const useGameSettings = () => {
  const context = useContext(GameSettingsContext);
  if (!context) {
    throw new Error('useGameSettings must be used within a GameSettingsProvider');
  }
  return context;
};

// Keyframes for animations
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(0, 116, 224, 0.3); }
  50% { box-shadow: 0 0 20px rgba(0, 116, 224, 0.6); }
  100% { box-shadow: 0 0 5px rgba(0, 116, 224, 0.3); }
`;

// Styled components for the game list
export const GameListContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export const GameItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  margin-bottom: 12px;
  background: ${props => props.theme.card || '#21222c'};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid ${props => props.theme.border || '#4A4C50'};
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 116, 224, 0.3);
    border-color: ${props => props.theme.buttonPrimary || '#0074E0'};
    animation: ${() => css`${pulse}`} 1.5s infinite;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

export const GameInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const GameHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 5px;
  }
`;

export const GameDate = styled.span`
  color: ${props => props.theme.textColorSecond || '#86898E'};
  font-size: 0.9rem;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const GameTitle = styled.h3`
  color: ${props => props.theme.textColorPrimary || '#FFFFFF'};
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const GameChapter = styled.p`
  color: ${props => props.theme.textColorSecond || '#86898E'};
  font-size: 0.95rem;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

export const PlayerCount = styled.div`
  display: flex;
  align-items: center;
  background: ${props => props.theme.surface || '#1a1b23'};
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.border || '#4A4C50'};
  
  @media (max-width: 768px) {
    align-self: flex-end;
  }
`;

export const PlayerCountText = styled.span`
  color: ${props => props.theme.textColorPrimary || '#FFFFFF'};
  font-size: 0.9rem;
  margin-right: 5px;
`;

export const PlayerCountBar = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

export const PlayerSlot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.$filled ? (props.theme.buttonPrimary || '#0074E0') : (props.theme.surface || '#1a1b23')};
  border: 1px solid ${props => props.$filled ? (props.theme.buttonPrimary || '#0074E0') : (props.theme.border || '#4A4C50')};
  transition: all 0.3s ease;
  
  ${props => props.$filled && css`
    animation: ${glow} 2s infinite;
  `}
`;

export const CreateGameButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.theme.buttonPrimary || '#0074E0'};
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 116, 224, 0.4);
  transition: all 0.3s ease;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${() => css`${pulse}`} 3s infinite;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 25px rgba(0, 116, 224, 0.6);
    background: ${props => props.theme.buttonPrimaryHover || '#0056b3'};
    animation: none;
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 20px;
    bottom: 20px;
    right: 20px;
  }
`;

// Component to display the list of games
export const GameList = () => {
  const { gamesList, setShowLobby } = useGameSettings();
  
  const formatDate = (date) => {
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const handleGameClick = () => {
    setShowLobby(true);
  };
  
  return (
    <GameListContainer>
      {gamesList.map((game) => {
        const playerSlots = [];
        for (let i = 0; i < game.maxPlayers; i++) {
          playerSlots.push(<PlayerSlot key={i} $filled={i < game.playersJoined} />);
        }
        
        return (
          <GameItem key={game.id} onClick={handleGameClick}>
            <GameInfo>
              <GameHeader>
                <GameDate>{formatDate(game.createdAt)}</GameDate>
                <GameTitle>{game.gameName}</GameTitle>
              </GameHeader>
              <GameChapter>{game.chapter}</GameChapter>
            </GameInfo>
            <PlayerCount>
              <PlayerCountText>{game.playersJoined}/{game.maxPlayers}</PlayerCountText>
              <PlayerCountBar>
                {playerSlots}
              </PlayerCountBar>
            </PlayerCount>
          </GameItem>
        );
      })}
    </GameListContainer>
  );
};