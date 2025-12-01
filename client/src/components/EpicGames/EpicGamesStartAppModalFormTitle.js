import styled from 'styled-components';

const H1 = styled.h1`
    text-align: center;
    color: white;
    font-family: 'fontKaushanScript', ${props => props.theme.fontFamily || "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"};
    font-size: 24px;
    margin-bottom: 20px;
    font-weight: 600;
    
    @media (max-width: 768px) {
        font-size: 22px;
        margin-bottom: 15px;
    }
`;

const Title = ({ children }) => {
    return <H1>{children}</H1>;
};

export default Title;