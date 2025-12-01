import styled from 'styled-components';
import SectionTitle from './SectionTitle';
import SectionSubtitle from './SectionSubtitle';
//import ButtonGroup from './ButtonGroup';

const StyledHeroSection = styled(({ theme, ...props }) => <section {...props} />)`
  text-align: center;
  margin-bottom: 3rem;
`;

const HeroSection = ({ theme }) => {
  return (
    <StyledHeroSection theme={theme}>
      <SectionTitle theme={theme}>Настольные игры онлайн</SectionTitle>
      <SectionSubtitle theme={theme}>
        Собирайтесь с друзьями, играйте в любимые настольные игры в удобном онлайн-формате
      </SectionSubtitle>
      {/*<ButtonGroup theme={theme} />*/}
    </StyledHeroSection>
  );
};

export default HeroSection;