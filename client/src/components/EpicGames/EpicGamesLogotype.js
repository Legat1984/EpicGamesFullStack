import React from 'react';
import styled from 'styled-components';
import { useScreen } from '../../contexts/ScreenContext';

import EpicGamesLogotypeImage from '../../assets/EpicGames/images/EpicGamesLogotype.png';
import EpicGamesLogotypeText from '../../assets/EpicGames/images/EpicGamesLogotypeText.svg';

const LogoContainer = styled.div`
  position: ${({ $forTheForm }) => ($forTheForm ? 'relative' : 'absolute')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px;
  
  @media (max-width: 768px) {
    padding: 5px;
    position: relative;
  }
`;

const LogoImage = styled.img`
  position: relative;
  width: 150px;
  height: auto;
  max-width: 200px;
  
  @media (max-width: 768px) {
    width: 120px;
  }
`;

const LogoText = styled.img`
  margin-top: 10px;
  width: 200px;
  max-width: 300px;
  height: auto;
  
  @media (max-width: 768px) {
    width: 160px;
  }
`;

const StyledLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EpicGamesLogotype = ({ hasText = true, isLink = false, linkUrl = '/', horizontalOnly = false, forTheForm = false }) => {
  const { orientation, device } = useScreen();

  return (
    <LogoContainer $orientation={orientation} $device={device} $horizontalOnly={horizontalOnly} $forTheForm={forTheForm} >
      {isLink ? (
        <StyledLink href={linkUrl}>
          <LogoImage src={EpicGamesLogotypeImage} alt="Epic Games Logo" $forTheForm={forTheForm} $orientation={orientation} $device={device} />
        </StyledLink>
      ) : (
        <LogoImage src={EpicGamesLogotypeImage} alt="Epic Games Logo" $forTheForm={forTheForm} $orientation={orientation} $device={device} />
      )}
      {hasText && (
        <LogoText src={EpicGamesLogotypeText} alt="Epic Games Logotype Text" $orientation={orientation} $forTheForm={forTheForm} $device={device} />
      )}
    </LogoContainer>
  );
};

export default EpicGamesLogotype;