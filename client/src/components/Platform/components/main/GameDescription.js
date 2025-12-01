import styled from 'styled-components';

const StyledGameDescription = styled(({ theme, ...props }) => <p {...props} />)`
  font-size: 0.875rem;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 1rem;
  line-height: 1.5;
`;

export default StyledGameDescription;