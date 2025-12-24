import React from 'react';
import { GameSettingsProvider } from '../../../../contexts/GameSettingsContext';
import HarryPotterGame from '../../../../components/HarryPotter/HarryPotterGame';

const GameSettingsContent = ({ game, theme }) => {
  const isHarryPotterGame = game && game.title && game.title.toLowerCase().includes('гарри поттер');

  if (isHarryPotterGame) {
    return (
      <GameSettingsProvider>
        <HarryPotterGame />
      </GameSettingsProvider>
    );
  }
};

export default GameSettingsContent;