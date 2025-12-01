import React, { useState, useEffect } from 'react';
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
        font-size: 18px;
    }
`;

const ResendButton = styled(Button)`
    margin-top: 10px;
`;

const Highlight = styled.span`
    font-weight: 900;
    font-size: 18px;
`;

const ConfirmationForm = ({ tokenNewUser, onSubmit, errorMessage, clearError, onResendCode, stateConfirmationForm }) => {
    const [confirmationCode, setConfirmationCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(60);

    useEffect(() => {
        let timer;
        if (resendTimer > 0) {
            timer = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [resendTimer]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        await onSubmit({ token: tokenNewUser, confirmationCode });
        setIsLoading(false);
    };

    const handleResendCode = async () => {
        setResendTimer(60);
        await onResendCode();
    };

    const title = stateConfirmationForm === 'registration'
        ? 'Подтверждение регистрации'
        : 'Подтверждение сброса пароля';

    return (
        <Form onSubmit={handleSubmit}>
            <Title>{title}</Title>
            <Errors message={errorMessage} clearMessage={clearError} />
            <FormInputContainer>
                <Input
                    type="text"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                    required
                    placeholder="Введите код подтверждения"
                    id="confirmation-code-input"
                />
                <Label htmlFor="confirmation-code-input" $isActive={confirmationCode}>Код подтверждения</Label>
            </FormInputContainer>
            <Button type="submit" disabled={isLoading}>Подтвердить</Button>
            <ResendButton type="button" onClick={handleResendCode} disabled={resendTimer > 0}>
                {resendTimer > 0 ? (
                    <>Выслать код повторно через <Highlight>{resendTimer}</Highlight> секунд</>
                ) : (
                    'Выслать код повторно'
                )}
            </ResendButton>
        </Form>
    );
};

export default ConfirmationForm;