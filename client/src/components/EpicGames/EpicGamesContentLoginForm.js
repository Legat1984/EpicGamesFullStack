import React, { useState } from 'react';
import styled from 'styled-components';
import { useScreen } from '../../contexts/ScreenContext';

import Title from './EpicGamesStartAppModalFormTitle'
import Errors from './EpicGamesStartAppErrors'

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
  margin-top: 25px;
  margin-bottom: 15px;
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
    margin: 4px 0;
    margin-bottom: 15px;
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

const ButtonLink = styled.button`
    margin: 8px 4px;
    border: none;
    background-color: unset;
    font-family: 'fontKaushanScript', ${props => props.theme.fontFamily || "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"};
    font-size: 16px;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: 0.4px;
    color: #0070CC;
    cursor: pointer;

    &:hover {
        color: #0056b3;
        text-decoration: underline;
    }
    
    @media (max-width: 768px) {
        font-size: 18px;
    }
`;

const LoginForm = ({ onSubmit, onChangeFormState, errorMessage, clearError }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { orientation, device } = useScreen();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            await onSubmit({ email, password });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Title>Вход в систему</Title>
            <Errors message={errorMessage} clearMessage={clearError} />
            <FormInputContainer>
                <Input 
                    type="text" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    $orientation={orientation}
                    $device={device}
                    placeholder="Логин/Email:"
                    id="email-input"
                />
                <Label htmlFor="email-input" $isActive={email}>Логин/Email:</Label>
            </FormInputContainer>
            <FormInputContainer>
                <Input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    $orientation={orientation}
                    $device={device}
                    placeholder="Пароль:"
                    id="password-input"
                />
                <Label htmlFor="password-input" $isActive={password}>Пароль:</Label>
            </FormInputContainer>
            <Button type="submit" disabled={isSubmitting}>Авторизация</Button>
            <ButtonLink type="button" onClick={() => onChangeFormState('register')}>Зарегистрируйте учетную запись</ButtonLink>
            <ButtonLink type="button" onClick={() => onChangeFormState('requestReset')}>Вы не можете войти?</ButtonLink>
        </Form>
    );
};

export default LoginForm;