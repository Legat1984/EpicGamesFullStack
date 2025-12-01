import styled from "styled-components";

const Button = styled.button`
    width: 200px;
    max-width: 100%;
    height: 40px;
    margin: 10px 5px;
    border-radius: 5px; 
    font-size: 16px; 
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: transparent;
        box-shadow: 0 0 10px 2px ${(props) => props.$hoverColor};
        border-width: 2px;
    }
    
    @media (max-width: 768px) {
        width: 100%;
        height: 45px;
        font-size: 18px;
        margin: 8px 0;
    }
`;

export const LoginButton = styled(Button).attrs({
    $hoverColor: 'rgba(46, 204, 113, 0.7)'
})`
    background-color: #2ECC71;
    color: #FFFFFF;
    border: 1px solid #2ECC71;
`;

export const RegisterButton = styled(Button).attrs({
    $hoverColor: 'rgba(52, 152, 219, 0.7)'
})`
    background-color: #3498DB;
    color: #FFFFFF;
    border: 1px solid #3498DB;
`;