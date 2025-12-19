import React from 'react';
import styled from 'styled-components';

const LobbyContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: ${props => props.theme.background || '#101117'};
  min-height: 100vh;
  color: ${props => props.theme.textColorPrimary || '#FFFFFF'};
`;

const LobbyHeader = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 30px;
  color: ${props => props.theme.textColorPrimary || '#FFFFFF'};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-family: 'fontHarryPotter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const LobbyContent = styled.div`
  background: ${props => props.theme.card || '#21222c'};
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid ${props => props.theme.border || '#4A4C50'};
`;

const LobbyTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: ${props => props.theme.textColorPrimary || '#FFFFFF'};
`;

const LobbyDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${props => props.theme.textColorSecond || '#86898E'};
  margin-bottom: 25px;
`;

const PlayersSection = styled.div`
  margin-top: 30px;
`;

const PlayersTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: ${props => props.theme.textColorPrimary || '#FFFFFF'};
`;

const PlayerList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PlayerItem = styled.li`
  padding: 12px 15px;
  margin-bottom: 8px;
  background: ${props => props.theme.surface || '#1a1b23'};
  border-radius: 8px;
  border-left: 4px solid ${props => props.theme.buttonPrimary || '#0074E0'};
  color: ${props => props.theme.textColorPrimary || '#FFFFFF'};
`;

const StartGameButton = styled.button`
  background: ${props => props.theme.buttonPrimary || '#0074E0'};
  color: white;
  border: none;
  padding: 12px 25px;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 25px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.buttonPrimaryHover || '#0056b3'};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 116, 224, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const Lobby = () => {
  const players = [
    { id: 1, name: 'Гарри Поттер', status: 'Готов' },
    { id: 2, name: 'Рон Уизли', status: 'Готов' },
    { id: 3, name: 'Гермиона Грейнджер', status: 'Не готов' },
    { id: 4, name: 'Невилл Долгопупс', status: 'Готов' }
  ];

  return (
    <LobbyContainer>
      <LobbyHeader>Лобби Игры</LobbyHeader>
      <LobbyContent>
        <LobbyTitle>Добро пожаловать в лобби!</LobbyTitle>
        <LobbyDescription>
          Вы находитесь в лобби игры по вселенной Гарри Поттера. 
          Здесь вы можете дождаться других игроков перед началом игры. 
          Убедитесь, что все игроки готовы, прежде чем начинать игру.
        </LobbyDescription>
        
        <PlayersSection>
          <PlayersTitle>Игроки в лобби:</PlayersTitle>
          <PlayerList>
            {players.map(player => (
              <PlayerItem key={player.id}>
                {player.name} - <span style={{color: player.status === 'Готов' ? '#10b981' : '#f59e0b'}}>{player.status}</span>
              </PlayerItem>
            ))}
          </PlayerList>
        </PlayersSection>
        
        <StartGameButton>Начать игру</StartGameButton>
      </LobbyContent>
    </LobbyContainer>
  );
};

export default Lobby;