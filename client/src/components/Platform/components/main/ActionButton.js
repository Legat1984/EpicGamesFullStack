import styled from 'styled-components';

const StyledActionButton = styled(({ theme, ...props }) => <button {...props} />)`
  padding: 0.5rem;
  border-radius: 6px;
  color: ${props => props.theme.textSecondary};
  transition: all 0.2s ease;
  
  &:hover {
    color: ${props => props.theme.text};
    background-color: ${props => props.theme.surface};
  }
`;

export default StyledActionButton;