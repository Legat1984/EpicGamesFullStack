import React, { useState } from "react";
import styled from "styled-components";
import { useScreen } from '../../contexts/ScreenContext';
import { LoginButton, RegisterButton } from './EpicGamesStartAppButton';
import EpicGamesStartAppModalForm from './EpicGamesStartAppModalForm';

const Container = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;
    gap: 20px;
    
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        padding: 20px 10px 30px;
        gap: 15px;
    }
    
    @media (min-width: 769px) {
        max-width: 800px;
        left: 50%;
        transform: translateX(-50%);
    }
`;

const EpicGamesStartAppButtonContainer = ({ setHideByModality }) => {
    const { orientation, device } = useScreen();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formState, setFormState] = useState("login");

    const openModal = (state) => {
        setIsModalOpen(true);
        setHideByModality(true);
        setFormState(state);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setHideByModality(false);
    };

    return (
        <>
            {!isModalOpen && (
                <Container $orientation={orientation} $device={device}>
                    <LoginButton onClick={() => openModal('login')}>Войти в аккаунт</LoginButton>
                    <RegisterButton onClick={() => openModal('register')}>Зарегистрироваться</RegisterButton>
                </Container>
            )}
            {isModalOpen && (
                <EpicGamesStartAppModalForm
                    $orientation={orientation}
                    $device={device}
                    closeModal={closeModal}
                    formState={formState}
                />
            )}
        </>
    );
};

export default EpicGamesStartAppButtonContainer;