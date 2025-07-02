import React from 'react';
import styled from 'styled-components';
import { animated } from '@react-spring/web';

const ContentSection = ({ anim }) => {
  return (
    <ContentContainer style={anim}>
      <Title>Welcome to Total Faith Network</Title>
      <Subtitle>
        Empowering communities worldwide through faith-driven initiatives and innovative solutions
        for a better tomorrow.
      </Subtitle>
      <ExploreButton>Explore Our Mission</ExploreButton>
    </ContentContainer>
  );
};

const ContentContainer = styled(animated.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  text-align: center;
  color: #fff;
  position: relative;
  z-index: 2;
  background: linear-gradient(transparent, #0a0a12 30%);
`;

const Title = styled.h1`
  font-size: 3rem;
  margin: 0 0 1.5rem;
  background: linear-gradient(90deg, #4fc3f7, #1976d2);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 800;
  letter-spacing: 1px;
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.4rem;
  margin: 0 0 2.5rem;
  max-width: 700px;
  color: #e0e0ff;
  line-height: 1.6;
  font-weight: 300;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    max-width: 90%;
  }
`;

const ExploreButton = styled.button`
  padding: 1rem 3rem;
  font-size: 1.2rem;
  background: linear-gradient(135deg, #1976d2, #0d47a1);
  color: #fff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(25, 118, 210, 0.4);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: 0.5s;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(25, 118, 210, 0.6);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(1px);
  }
  
  @media (max-width: 768px) {
    padding: 0.9rem 2rem;
    font-size: 1rem;
  }
`;

export default ContentSection;