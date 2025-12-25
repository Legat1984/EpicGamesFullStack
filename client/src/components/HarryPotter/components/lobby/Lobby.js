import React, { useState } from 'react';
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

// Стили для секции выбора главы
const ChapterSelection = styled.div`
  margin: 20px 0;
`;

const ChapterTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: ${props => props.theme.textColorPrimary || '#FFFFFF'};
`;

const ChapterButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const ChapterButton = styled.button`
  background: ${props => props.available ? (props.selected ? props.theme.buttonPrimary || '#0074E0' : props.theme.surface || '#1a1b23') : '#444444'};
  color: ${props => props.available ? '#FFFFFF' : '#888888'};
  border: 1px solid ${props => props.available ? (props.selected ? props.theme.buttonPrimary || '#0074E0' : props.theme.border || '#4A4C50') : '#555555'};
  padding: 10px 15px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: ${props => props.available ? 'pointer' : 'not-allowed'};
  transition: all 0.3s ease;
  flex: 1;
  min-width: 100px;

  &:hover {
    ${props => props.available && !props.selected ? `
      background: ${props.theme.buttonPrimaryHover || '#0056b3'};
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    ` : ''}
  }

  &:active {
    transform: translateY(0);
  }
`;

// Стили для выбора количества игроков
const PlayerCountSelection = styled.div`
  margin: 20px 0;
`;

const PlayerCountButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const PlayerCountButton = styled.button`
  background: ${props => props.selected ? props.theme.buttonPrimary || '#0074E0' : props.theme.surface || '#1a1b23'};
  color: ${props => props.selected ? 'white' : props.theme.textColorPrimary || '#FFFFFF'};
  border: 1px solid ${props => props.selected ? props.theme.buttonPrimary || '#0074E0' : props.theme.border || '#4A4C50'};
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    ${props => !props.selected ? `
      background: ${props.theme.surfaceHover || '#2a2b33'};
      transform: translateY(-2px);
    ` : ''}
  }

  &:active {
    transform: translateY(0);
  }
`;

// Стили для выбора места
const SeatSelection = styled.div`
  margin: 20px 0;
`;

const SeatButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const SeatButton = styled.button`
  background: ${props => props.selected ? props.theme.buttonPrimary || '#0074E0' : props.theme.surface || '#1a1b23'};
  color: ${props => props.selected ? 'white' : props.theme.textColorPrimary || '#FFFFFF'};
  border: 1px solid ${props => props.selected ? props.theme.buttonPrimary || '#0074E0' : props.theme.border || '#4A4C50'};
  padding: 15px 10px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  min-width: 80px;

  &:hover {
    ${props => !props.selected ? `
      background: ${props.theme.surfaceHover || '#2a2b33'};
      transform: translateY(-2px);
    ` : ''}
  }

  &:active {
    transform: translateY(0);
  }
`;

// Стили для выбора персонажа
const CharacterSelection = styled.div`
  margin: 20px 0;
`;

const CharacterButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const CharacterButton = styled.button`
  background: ${props => props.selected ? props.theme.buttonPrimary || '#0074E0' : props.theme.surface || '#1a1b23'};
  color: ${props => props.selected ? 'white' : props.theme.textColorPrimary || '#FFFFFF'};
  border: 1px solid ${props => props.selected ? props.theme.buttonPrimary || '#0074E0' : props.theme.border || '#4A4C50'};
  padding: 10px 15px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  min-width: 120px;

  &:hover {
    ${props => !props.selected ? `
      background: ${props.theme.surfaceHover || '#2a2b33'};
      transform: translateY(-2px);
    ` : ''}
  }

  &:active {
    transform: translateY(0);
  }
`;

// Стили для кнопки "Назад"
const BackButton = styled.button`
  background: ${props => props.theme.buttonSecondary || '#6c757d'};
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 10px;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.buttonSecondaryHover || '#5a6268'};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

// Стили для контейнера с кнопками управления
const ControlButtonsContainer = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 10px;
`;

const Lobby = () => {
  // Состояния для различных параметров
  const [selectedChapter, setSelectedChapter] = useState(1); // По умолчанию выбрана 1 глава
  const [playerCount, setPlayerCount] = useState(1); // По умолчанию 1 игрок
  const [selectedSeat, setSelectedSeat] = useState(null); // По умолчанию нет выбранного места
  const [selectedCharacter, setSelectedCharacter] = useState(null); // По умолчанию нет выбранного персонажа
  const [gamePublished, setGamePublished] = useState(false); // Состояние публикации игры

  const players = [
    { id: 1, name: 'Гарри Поттер', status: 'Готов' },
    { id: 2, name: 'Рон Уизли', status: 'Готов' },
    { id: 3, name: 'Гермиона Грейнджер', status: 'Не готов' },
    { id: 4, name: 'Невилл Долгопупс', status: 'Готов' }
  ];

  // Доступные главы (только 1 глава доступна)
  const chapters = [
    { id: 1, title: 'Глава 1', available: true },
    { id: 2, title: 'Глава 2', available: false },
    { id: 3, title: 'Глава 3', available: false },
    { id: 4, title: 'Глава 4', available: false },
    { id: 5, title: 'Глава 5', available: false },
    { id: 6, title: 'Глава 6', available: false },
    { id: 7, title: 'Глава 7', available: false }
  ];

  // Доступные персонажи
  const characters = [
    { id: 1, name: 'Гарри Поттер' },
    { id: 2, name: 'Гермиона Грейнджер' },
    { id: 3, name: 'Рон Уизли' },
    { id: 4, name: 'Невил Долгопупс' }
  ];

  const handlePublishGame = () => {
    setGamePublished(true);
  };

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

        {/* Секция выбора главы */}
        <ChapterSelection>
          <ChapterTitle>Выберите главу:</ChapterTitle>
          <ChapterButtonsContainer>
            {chapters.map(chapter => (
              <ChapterButton
                key={chapter.id}
                available={chapter.available}
                selected={selectedChapter === chapter.id}
                onClick={() => chapter.available && setSelectedChapter(chapter.id)}
              >
                {chapter.title}
              </ChapterButton>
            ))}
          </ChapterButtonsContainer>
        </ChapterSelection>

        {/* Секция выбора количества игроков */}
        <PlayerCountSelection>
          <ChapterTitle>Количество игроков:</ChapterTitle>
          <PlayerCountButtonsContainer>
            {[1, 2, 3, 4].map(count => (
              <PlayerCountButton
                key={count}
                selected={playerCount === count}
                onClick={() => setPlayerCount(count)}
              >
                {count}
              </PlayerCountButton>
            ))}
          </PlayerCountButtonsContainer>
        </PlayerCountSelection>

        {/* Секция выбора места */}
        <SeatSelection>
          <ChapterTitle>Выберите место:</ChapterTitle>
          <SeatButtonsContainer>
            {[1, 2, 3, 4].map(seat => (
              <SeatButton
                key={seat}
                selected={selectedSeat === seat}
                onClick={() => setSelectedSeat(seat)}
              >
                Место {seat}
              </SeatButton>
            ))}
          </SeatButtonsContainer>
        </SeatSelection>

        {/* Секция выбора персонажа */}
        <CharacterSelection>
          <ChapterTitle>Выберите персонажа:</ChapterTitle>
          <CharacterButtonsContainer>
            {characters.map(character => (
              <CharacterButton
                key={character.id}
                selected={selectedCharacter === character.id}
                onClick={() => setSelectedCharacter(character.id)}
              >
                {character.name}
              </CharacterButton>
            ))}
          </CharacterButtonsContainer>
        </CharacterSelection>

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

        <ControlButtonsContainer>
          {!gamePublished && (
            <StartGameButton onClick={() => window.history.back()}>Назад</StartGameButton>
          )}
          <StartGameButton onClick={handlePublishGame}>Опубликовать игру</StartGameButton>
        </ControlButtonsContainer>
      </LobbyContent>
    </LobbyContainer>
  );
};

export default Lobby;