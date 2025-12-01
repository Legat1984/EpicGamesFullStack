import React from 'react';
import styled from 'styled-components';
import { MessageCircle } from 'lucide-react';

const ChatIconStyled = styled(({ isMobile, theme, ...props }) => <button {...props} />)`
  position: fixed;
  bottom: ${props => props.isMobile ? '1rem' : '1rem'};
  ${props => props.isMobile ? 'right: 1rem;' : 'right: 1rem;'}
  background-color: ${props => props.theme.primary};
  color: white;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  z-index: 1000;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ChatIconButton = ({ isMobile, onClick, theme }) => {
  return (
    <ChatIconStyled
      isMobile={isMobile}
      onClick={onClick}
      theme={theme}
    >
      <MessageCircle size={24} />
    </ChatIconStyled>
  );
};

export default ChatIconButton;