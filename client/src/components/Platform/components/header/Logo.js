import styled from 'styled-components';
import EpicGamesLogotypeImage from '../../../../assets/EpicGames/images/EpicGamesLogotype.png';
import EpicGamesLogotypeText from '../../../../assets/EpicGames/images/EpicGamesLogotypeText.svg';

const StyledLogo = styled(({ theme, ...props }) => <div {...props} />)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  .logo-image {
    width: 120px;
    height: auto;
    max-width: 100%;
  }
  
  .logo-text {
    width: 200px;
    height: auto;
    max-width: 100%;
    filter: ${props => props.theme.mode === 'dark' ? 'invert(0)' : 'invert(1)'};
  }

  @media (max-width: 768px) {
    .logo-image {
      width: 80px;
    }

    .logo-text {
      width: 120px;
    }
  }

  @media (max-width: 480px) {
    .logo-image {
      width: 70px;
    }

    .logo-text {
      width: 100px;
    }
  }
`;

const Logo = ({ theme }) => {
  return (
    <StyledLogo theme={theme}>
      <img src={EpicGamesLogotypeImage} alt="Epic Games Logo" className="logo-image" />
      <img src={EpicGamesLogotypeText} alt="Epic Games" className="logo-text" />
    </StyledLogo>
  );
};

export default Logo;