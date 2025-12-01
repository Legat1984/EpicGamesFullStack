import React, { useEffect } from 'react';
import styled from 'styled-components';

const ErrorMessage = styled.div`
    width: 100%;
    padding: 12px;
    display: flex;
    justify-content: center;
    text-align: center;
    color: white;
    margin: 10px 0;
    font-family: 'fontKaushanScript', ${props => props.theme.fontFamily || "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"};
    font-size: 16px;
    background-color: #ff4444;
    border: 1px solid #ff6666;
    border-radius: 8px;
    position: relative;
    word-wrap: break-word;
    
    @media (max-width: 768px) {
        font-size: 14px;
        padding: 10px;
    }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 5px;
    right: 10px;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-family: 'fontKaushanScript', ${props => props.theme.fontFamily || "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"};
    font-size: 16px;
`;

const Errors = ({ message, clearMessage }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                clearMessage();
            }, 8000);

            return () => clearTimeout(timer);
        }
    }, [message, clearMessage]);

    if (!message) return null;

    if (Array.isArray(message)) {
        return (
            <>
                {message.map((error, index) => (
                    <ErrorMessage key={index}>
                        {error.msg || error}
                        <CloseButton onClick={clearMessage}>×</CloseButton>
                    </ErrorMessage>
                ))}
            </>
        );
    }

    return (
        <ErrorMessage>
            {message}
            <CloseButton onClick={clearMessage}>×</CloseButton>
        </ErrorMessage>
    );
};

export default Errors;