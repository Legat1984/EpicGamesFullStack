import styled from "styled-components";
import closeFormButtonSVG from '../../../../assets/EpicGames/images/CloseFormButton.svg';

const CloseButtonStyled = styled.button`
    position: absolute;
    top: 15px;
    right: 15px;
    width: 20px;
    height: 20px;
    background: url(${closeFormButtonSVG}) no-repeat center center;
    background-size: contain;
    border: none;
    cursor: pointer;
    transition: opacity 0.3s;

    &:hover {
        filter: invert(29%) sepia(86%) saturate(7494%) hue-rotate(355deg) brightness(104%) contrast(101%);
    }
    
    @media (max-width: 768px) {
        top: 10px;
        right: 10px;
    }
`;

const CloseButton = ({ onClick }) => {
    return (
        <CloseButtonStyled onClick={onClick} />
    );
};

export default CloseButton