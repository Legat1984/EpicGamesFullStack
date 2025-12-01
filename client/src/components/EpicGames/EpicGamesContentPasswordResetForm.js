import React, { useState } from 'react';
import styled from 'styled-components';

import Title from './EpicGamesStartAppModalFormTitle';
import Errors from './EpicGamesStartAppErrors';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 350px;
    
    @media (max-width: 768px) {
        width: 100%;
        max-width: 100%;
        height: auto;
        padding: 20px;
        box-sizing: border-box;
        flex: 1;
        justify-content: flex-start;
    }
`;

const FormInputContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 20px;
`;

const Label = styled.label`
    position: absolute;
    top: 0;
    left: 10px;
    font-family: 'fontKaushanScript', ${props => props.theme.fontFamily || "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"};
    font-size: 20px;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 150%;
    letter-spacing: 0.4px;
    transition: all 0.3s ease;
    transform: ${({ $isActive }) => ($isActive ? 'translateY(-35px)' : 'translateY(5px)')};
    cursor: ${({ $isActive }) => ($isActive ? 'default' : 'text')};
`;

const Input = styled.input`
    width: 100%;
    height: 45px;
    padding: 12px 15px;
    border: 1px solid #4A4C50;
    border-radius: 5px;
    background-color: #101117;

    font-family: 'fontKaushanScript', ${props => props.theme.fontFamily || "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"};
    font-size: 16px;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 150%;
    letter-spacing: 0.4px;

    &::placeholder {
        color: transparent;
    }

    &:focus + ${Label} {
        opacity: 1;
        transform: translateY(-35px);
    }
    
    @media (max-width: 768px) {
        height: 50px;
        font-size: 18px;
    }
`;

const Button = styled.button`
    width: 100%;
    height: 50px;
    margin: 4px;
    margin-bottom: 10px;
    background-color: #0074E0;
    font-family: 'fontKaushanScript', ${props => props.theme.fontFamily || "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"};
    font-size: 16px;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: 0.4px;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }

    &:disabled {
        color: #000000;
        background-color: #cccccc;
        cursor: not-allowed;
    }
    
    @media (max-width: 768px) {
        height: 55px;
        min-height: 55px;
        font-size: 18px;
    }
`;

const PasswordReset = ({ errorMessage, clearError, onSubmit, token }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [localErrorMessage, setLocalErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            if (newPassword === confirmPassword) {
                await onSubmit({ newPassword, token });
            } else {
                setLocalErrorMessage("Пароли не совпадают");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Title>Сброс пароля</Title>
            <Errors message={errorMessage || localErrorMessage} clearMessage={clearError} />
            <FormInputContainer>
                <Input 
                    type="password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    required 
                    placeholder="Новый пароль:"
                    id="new-password-input"
                />
                <Label htmlFor="new-password-input" $isActive={newPassword}>Новый пароль:</Label>
            </FormInputContainer>
            <FormInputContainer>
                <Input 
                    type="password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required 
                    placeholder="Подтвердите новый пароль:"
                    id="confirm-password-input"
                />
                <Label htmlFor="confirm-password-input" $isActive={confirmPassword}>Подтвердите новый пароль:</Label>
            </FormInputContainer>
            <Button type="submit" disabled={isSubmitting}>Сбросить пароль</Button>
        </Form>
    );
};

export default PasswordReset;