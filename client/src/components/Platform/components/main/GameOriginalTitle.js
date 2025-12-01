import styled from 'styled-components';

const StyledGameOriginalTitle = styled(({ theme, ...props }) => <p {...props} />)`
  font-size: 0.875rem;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 0.75rem;
`;

export default StyledGameOriginalTitle;