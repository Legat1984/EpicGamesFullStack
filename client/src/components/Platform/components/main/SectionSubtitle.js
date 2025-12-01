import styled from 'styled-components';

const StyledSectionSubtitle = styled(({ theme, ...props }) => <p {...props} />)`
  font-size: 1.25rem;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 2rem;
  max-width: 48rem; /* 2xl = 48rem = 768px */
  margin-left: auto;
  margin-right: auto;
`;

export default StyledSectionSubtitle;