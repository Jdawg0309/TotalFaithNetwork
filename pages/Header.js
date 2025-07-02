// components/Header.js
import styled from 'styled-components';
import { animated, useSpring } from '@react-spring/web';

const Header = () => {
  const fadeIn = useSpring({
    from: { opacity: 0, y: -20 },
    to: { opacity: 1, y: 0 },
    config: { duration: 800 }
  });

  return (
    <StyledHeader style={fadeIn}>
      <Title>Total Faith Network</Title>
    </StyledHeader>
  );
};

const StyledHeader = styled(animated.header)`
  background: #1A237E;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(25, 118, 210, 0.1);
`;

const Title = styled.h1`
  color: #E3F2FD;
  font-size: 1.8rem;
  text-align: center;
  margin: 0;
  font-weight: 600;
`;

export default Header;