import styled from 'styled-components';

const StyledIconButton = styled(({ theme, ...props }) => <button {...props} />)`
  color: ${props => props.theme.textSecondary};
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${props => props.theme.text};
    background-color: ${props => props.theme.card};
  }
`;

export default StyledIconButton;