import styled from 'styled-components';

const LabelFavorite = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.5rem 0;
  scrollbar-width: thin;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.surface};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.primary};
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: clamp(0.7rem, 2vw, 0.8rem);
  }
`;

export default LabelFavorite;