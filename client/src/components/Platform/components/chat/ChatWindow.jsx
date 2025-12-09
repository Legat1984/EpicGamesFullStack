import React, { useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Send, Users } from 'lucide-react';
import CloseButton from '../main/CloseButton';

const Overlay = styled(({ show, isMobile, ...props }) => <div {...props} />)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: ${props => props.isMobile ? 1999 : 999};
  display: ${props => props.show ? 'block' : 'none'};
`;

const ChatWindowStyled = styled(({ isMobile, isOpen, ...props }) => <div {...props} />)`
  position: fixed;
  ${props => props.isMobile ? 'bottom: 0; right: 0; left: 0; height: 100%;' : 'bottom: 1rem; right: 1rem; width: 420px; height: 600px;'}
  background-color: ${props => props.theme.chat.background};
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  z-index: ${props => props.isMobile ? 2000 : 1000};
  display: ${props => props.isOpen ? 'flex' : 'none'};
  flex-direction: column;
  border: 1px solid ${props => props.theme.border};
`;

const ChatHeader = styled.div`
  background-color: ${props => props.theme.primary};
  color: white;
  padding: 1rem;
  border-radius: 12px 12px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatTabs = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.border};
`;

const ChatTab = styled(({ active, ...props }) => <button {...props} />)`
  flex: 1;
  padding: 0.75rem;
  text-align: center;
  background: ${props => props.active ? props.theme.surface : 'transparent'};
  color: ${props => props.active ? props.theme.text : props.theme.textSecondary};
  border-bottom: ${props => props.active ? `2px solid ${props.theme.primary}` : 'none'};
  font-weight: 500;

  &:hover {
    color: ${props => props.theme.text};
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  /* Стили для полосы прокрутки */
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: ${props => props.theme.chat.background};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.primary};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.primaryDark || props.theme.primary + 'AA'};
  }

  /* Поддержка для Firefox */
  scrollbar-width: auto;
  scrollbar-color: ${props => props.theme.primary + ' ' + props.theme.chat.background};

   /* Для Firefox при наведении на полосу прокрутки */
   &:hover {
    scrollbar-color: ${props => (props.theme.primaryDark || props.theme.primary + 'AA') + ' ' + props.theme.chat.background};
  }
`;

const Message = styled(({ isOwn, ...props }) => <div {...props} />)`
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;

  ${props => props.isOwn && css`
    flex-direction: row-reverse;
  `}
`;

const MessageAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const MessageContent = styled(({ isOwn, ...props }) => <div {...props} />)`
  background-color: ${props => props.isOwn ? props.theme.primary : props.theme.chat.message};
  color: ${props => props.isOwn ? 'white' : props.theme.chat.text};
  padding: 0.75rem;
  border-radius: 12px;
  max-width: 80%;

  ${props => props.isOwn && css`
    border-bottom-right-radius: 4px;
  `}

  ${props => !props.isOwn && css`
    border-bottom-left-radius: 4px;
  `}
`;

const MessageInfo = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: ${props => props.theme.chat.textSecondary};
`;

const ChatInput = styled.div`
  padding: 1rem;
  border-top: 1px solid ${props => props.theme.border};
  display: flex;
  gap: 0.5rem;
`;

const ChatInputField = styled.input`
  flex: 1;
  background-color: ${props => props.theme.surface};
  color: ${props => props.theme.text};
  border: 1px solid ${props => props.theme.border};
  border-radius: 20px;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
`;

const ChatSendButton = styled.button`
  background-color: ${props => props.theme.primary};
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChatWindow = ({
  isChatOpen,
  toggleChat,
  activeChat,
  setActiveChat,
  messages,
  message,
  setMessage,
  sendMessage,
  isMobile,
  theme,
  rooms = [],
  loading = false,
  isConnected = false,
  user = null
}) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeChat]);

  // Предотвратите фоновую прокрутку, когда чат открыт на мобильном устройстве
  useEffect(() => {
    if (isMobile && isChatOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobile, isChatOpen]);

  return (
    <>
      <Overlay
        show={isMobile && isChatOpen}
        onClick={toggleChat}
        isMobile={isMobile}
      />
      <ChatWindowStyled
        isMobile={isMobile}
        isOpen={isChatOpen}
        theme={theme}
      >
        <ChatHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3>Чат</h3>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>
              {isConnected ? '● Онлайн' : '○ Оффлайн'}
            </div>
          </div>
          <CloseButton onClick={toggleChat} />
        </ChatHeader>

        {loading ? (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            Загрузка комнат...
          </div>
        ) : (
          <>
            <ChatTabs>
              {rooms.map(room => (
                <ChatTab
                  key={room.id}
                  active={activeChat === room.id}
                  onClick={() => setActiveChat(room.id)}
                  theme={theme}
                >
                  <Users size={16} /> {room.name}
                </ChatTab>
              ))}
            </ChatTabs>

            <ChatMessages>
              {messages[activeChat]?.map(msg => {
                // Определяем, является ли сообщение моим
                const isOwn = user && msg.user && ((msg.user._id || msg.user.id) === (user._id || user.id));
                return (
                  <Message key={msg.id} isOwn={isOwn}>
                    <MessageAvatar
                      src={msg.user?.avatar || 'https://placehold.co/32x32'}
                      alt={msg.user?.username || msg.user?.login || 'Аноним'}
                    />
                    <MessageContent isOwn={isOwn}>
                      <div>{msg.text}</div>
                      <MessageInfo>
                        <span>{msg.user?.username || msg.user?.login || 'Аноним'}</span>
                        <span>{msg.time}</span>
                      </MessageInfo>
                    </MessageContent>
                  </Message>
                );
              })}
              {(!messages[activeChat] || messages[activeChat].length === 0) && (
                <div style={{ textAlign: 'center', padding: '20px', color: theme.textSecondary }}>
                  Нет сообщений в этой комнате
                </div>
              )}
              <div ref={chatEndRef} />
            </ChatMessages>
          </>
        )}

        <ChatInput>
          <ChatInputField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Введите сообщение..."
            theme={theme}
            disabled={!activeChat || !isConnected}
          />
          <ChatSendButton
            onClick={sendMessage}
            theme={theme}
            disabled={!activeChat || !isConnected}
            style={{ opacity: (!activeChat || !isConnected) ? 0.5 : 1 }}
          >
            <Send size={18} />
          </ChatSendButton>
        </ChatInput>
      </ChatWindowStyled>
    </>
  );
};

export default ChatWindow;