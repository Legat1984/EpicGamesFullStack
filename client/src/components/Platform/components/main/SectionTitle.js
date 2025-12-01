import styled from 'styled-components';

const StyledSectionTitle = styled(({ theme, ...props }) => <h2 {...props} />)`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: ${props => props.theme.text};
`;

export default StyledSectionTitle;