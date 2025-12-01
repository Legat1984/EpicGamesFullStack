import styled from 'styled-components';

const StyledButton = styled(({ primary, theme, ...props }) => <button {...props} />)`
  background-color: ${props => props.primary ? props.theme.primary : props.theme.surface};
  color: ${props => props.primary ? '#fff' : props.theme.text};
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  border: 1px solid ${props => props.primary ? props.theme.primary : props.theme.border};
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

export default StyledButton;