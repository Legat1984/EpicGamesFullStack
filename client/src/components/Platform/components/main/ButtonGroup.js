import styled from 'styled-components';
import Button from './Button';

const StyledButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
`;

const ButtonGroup = ({ theme }) => {
  return (
    <StyledButtonGroup>
      <Button primary theme={theme}>Начать Играть</Button>
      <Button theme={theme}>Просмотреть Каталог</Button>
    </StyledButtonGroup>
  );
};

export default ButtonGroup;