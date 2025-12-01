import React from 'react';
import styled from 'styled-components';
import { useScreen } from '../../contexts/ScreenContext';

import EpicGamesLogotype from "./EpicGamesLogotype";

import EpicGamesBackgroundImg from '../../assets/EpicGames/images/EpicGamesBackground.png';

const EpicGamesBackgroundImages = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    background: url(${EpicGamesBackgroundImg}) center/cover no-repeat;
    overflow: hidden;
`;

const GradientOverlay = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 35%;
  background: linear-gradient(to top, rgba(30, 37, 56, 1) 0%, rgba(30, 37, 56, 1) 50%, rgba(30, 37, 56, 0.5) 75%, rgba(30, 37, 56, 0.25) 88%, rgba(30, 37, 56, 0) 100%);
  
  @media (max-width: 768px) {
    height: 40%;
  }
`;

const EpicGamesBackground = ({ hideByModality }) => {
    const { orientation, device } = useScreen();
    
    return (
        (!hideByModality || device === 'pc') && (
            <EpicGamesBackgroundImages $orientation={orientation}>
                {!hideByModality && (
                    <>
                        <EpicGamesLogotype
                            isLink={true}
                            linkUrl={process.env.REACT_APP_EPIC_GAMES_URL}
                            hasText={true}
                            horizontalOnly={true}
                        />
                        <GradientOverlay
                            $orientation={orientation}
                            $device={device}
                        />
                    </>
                )}
            </EpicGamesBackgroundImages>
        )
    );
}

export default EpicGamesBackground;