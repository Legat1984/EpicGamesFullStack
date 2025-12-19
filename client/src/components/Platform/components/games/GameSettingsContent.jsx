import React, { useState } from 'react';
import styled from 'styled-components';
import { GameSettingsProvider, GameList, CreateGameButton } from '../../../../contexts/GameSettingsContext';
import HarryPotterGame from '../../../../components/HarryPotter/HarryPotterGame';

const GameSettingsContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: ${props => props.theme.background || '#101117'};
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const GameTitle = styled.h2`
  margin: 0 0 1.5rem 0;
  color: ${props => props.theme.text || props.theme.textColorPrimary || '#FFFFFF'};
  font-size: 1.8rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const GameDescription = styled.p`
  color: ${props => props.theme.text || props.theme.textColorSecond || '#86898E'};
  line-height: 1.6;
  margin: 0 0 2rem 0;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
  }
`;

const GameSections = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Section = styled.div`
  padding: 1.5rem;
  border: 1px solid ${props => props.theme.border || '#4A4C50'};
  border-radius: 8px;
  background: ${props => props.theme.card || '#21222c'};

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const SectionTitle = styled.h3`
  margin: 0 0 1rem 0;
  color: ${props => props.theme.text || props.theme.textColorPrimary || '#FFFFFF'};
  font-size: 1.4rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
  }
`;

const Button = styled.button`
  background: ${props => props.theme.buttonPrimary || '#0074E0'};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.buttonPrimaryHover || '#0056b3'};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 116, 224, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.95rem;
    width: 100%;
    margin-bottom: 1rem;
  }
`;

const GameSettingsContent = ({ game, theme }) => {
  // Check if this is the Harry Potter game by title
  const isHarryPotterGame = game && game.title && game.title.toLowerCase().includes('гарри поттер');

  // If it's the Harry Potter game, render the specialized Harry Potter lobby
  if (isHarryPotterGame) {
    return (
      <GameSettingsProvider>
        <HarryPotterGame />
      </GameSettingsProvider>
    );
  }

  // For other games, render the default game settings content
  return (
    <GameSettingsContainer theme={theme}>
      <Button 
        theme={theme} 
        onClick={() => console.log('Создать игру')}
      >
        Создать игру
      </Button>

      <GameTitle theme={theme}>{game ? game.title : "Настройки игр"}</GameTitle>
      <GameDescription theme={theme}>
        {game ? game.description : "Управление вашими играми, приглашениями и активными сессиями"}
      </GameDescription>

      <GameSections>
        <Section theme={theme}>
          <SectionTitle theme={theme}>Список текущих игр</SectionTitle>
          <p style={{ color: theme?.text || theme?.textColorSecond || '#86898E' }}>
            Здесь будут отображаться текущие игры в формате списка, как в Epic Games.
          </p>
        </Section>

        <Section theme={theme}>
          <SectionTitle theme={theme}>Список приглашений</SectionTitle>
          <p style={{ color: theme?.text || theme?.textColorSecond || '#86898E' }}>
            Здесь будут отображаться приглашения в формате списка, как в Epic Games.
          </p>
        </Section>

        <Section theme={theme}>
          <SectionTitle theme={theme}>Список активных игр</SectionTitle>
          <p style={{ color: theme?.text || theme?.textColorSecond || '#86898E' }}>
            Здесь будут отображаться активные игры в формате списка, как в Epic Games.
          </p>
        </Section>
      </GameSections>
    </GameSettingsContainer>
  );
};

export default GameSettingsContent;