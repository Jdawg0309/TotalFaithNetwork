import React from 'react';
import styled from 'styled-components';
import { animated } from '@react-spring/web';

const TheaterStage = ({ curtainAnim, introVideo }) => {
  return (
    <TheaterContainer>
      <AnimatedCurtainLeft
        style={{ transform: curtainAnim.leftX.to(x => `translateX(${x}%)`) }}
      />
      <AnimatedCurtainRight
        style={{ transform: curtainAnim.rightX.to(x => `translateX(${x}%)`) }}
      />

      <TheaterDetails>
        <TheaterName>TFN BROADCAST STUDIOS</TheaterName>
        <ScreenInfo>NOW PLAYING: TOTAL FAITH NETWORK</ScreenInfo>
      </TheaterDetails>

      <Screen>
        <Video autoPlay muted loop playsInline>
          <source src={introVideo} type="video/mp4" />
        </Video>
        <ScreenOverlay />
        <ScreenFrame />
        <ScreenReflection />
      </Screen>

      <TheaterSeats />
    </TheaterContainer>
  );
};

const TheaterContainer = styled.div`
  position: relative;
  flex: 1;
  width: 100%;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  overflow: hidden;
  perspective: 1200px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at center, transparent 60%, rgba(0, 0, 0, 0.8) 100%),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 1px,
        rgba(0,0,0,0.1) 1px,
        rgba(0,0,0,0.1) 2px
      );
    pointer-events: none;
    z-index: 2;
  }
`;

const Curtain = styled.div`
  position: absolute;
  top: 0; 
  bottom: 0; 
  width: 50%;
  background: 
    linear-gradient(90deg, #0d47a1 0%, #1976d2 100%),
    repeating-linear-gradient(
      to bottom, 
      rgba(0, 0, 0, 0.1) 0px, 
      rgba(0, 0, 0, 0.1) 10px, 
      transparent 10px, 
      transparent 20px
    );
  background-blend-mode: multiply;
  box-shadow: 
    inset -15px 0 30px -10px rgba(0, 0, 0, 0.8),
    0 10px 20px rgba(0, 0, 0, 0.5);
  z-index: 5;
  border-right: 2px solid #0d47a1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 30px;
    background: linear-gradient(90deg, rgba(25, 118, 210, 0.5), transparent);
    right: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 20%;
    right: 20%;
    height: 20px;
    background: #0d47a1;
    border-radius: 50% 50% 0 0;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
`;

const AnimatedCurtainLeft = styled(animated(Curtain))`
  left: 0;
  border-bottom-left-radius: 20px;
`;

const AnimatedCurtainRight = styled(animated(Curtain))`
  right: 0;
  transform: scaleX(-1);
  border-bottom-right-radius: 20px;
`;

const TheaterDetails = styled.div`
  position: absolute;
  top: 20px;
  z-index: 4;
  text-align: center;
  width: 100%;
  pointer-events: none;
`;

const TheaterName = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 8px;
  color: #ffcc00;
  text-transform: uppercase;
  text-shadow: 0 0 10px rgba(255, 204, 0, 0.5);
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    letter-spacing: 4px;
  }
`;

const ScreenInfo = styled.div`
  font-size: 1.2rem;
  color: #ffcc00;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 0 0 5px rgba(255, 204, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Screen = styled.div`
  position: relative;
  width: 70%;
  height: 50vh;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 1;
  border-radius: 8px;
  box-shadow: 
    0 0 20px rgba(25, 118, 210, 0.5),
    0 20px 50px rgba(0,0,0,0.8);
  animation: screenGlow 4s ease-in-out infinite;
  transform: rotateX(5deg);
  
  @keyframes screenGlow {
    0% { box-shadow: 0 0 10px rgba(25, 118, 210, 0.5); }
    50% { box-shadow: 0 0 30px rgba(25, 118, 210, 0.8), 0 0 60px rgba(25, 118, 210, 0.4); }
    100% { box-shadow: 0 0 10px rgba(25, 118, 210, 0.5); }
  }
  
  @media (max-width: 1024px) {
    width: 80%;
    height: 45vh;
  }
  
  @media (max-width: 768px) {
    width: 90%;
    height: 40vh;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ScreenOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.4) 100%);
  pointer-events: none;
  z-index: 2;
`;

const ScreenFrame = styled.div`
  position: absolute;
  inset: -8px;
  border: 3px solid #333;
  border-radius: 12px;
  box-shadow: inset 0 0 30px rgba(0,0,0,0.8);
  pointer-events: none;
  z-index: 3;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    transform: translateY(-50%);
  }
`;

const ScreenReflection = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent,
    rgba(255, 255, 255, 0.05) 40%,
    transparent 80%
  );
  pointer-events: none;
  z-index: 4;
  transform: skewY(-5deg);
`;

const TheaterSeats = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: 
    linear-gradient(transparent, rgba(0,0,0,0.8)),
    repeating-linear-gradient(
      90deg,
      #222,
      #222 20px,
      #333 20px,
      #333 40px
    );
  z-index: 3;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 30px;
    background: 
      repeating-linear-gradient(
        -45deg,
        #111,
        #111 10px,
        #222 10px,
        #222 20px
      );
    border-radius: 10px 10px 0 0;
  }
  
  @media (max-width: 768px) {
    height: 60px;
  }
`;

export default TheaterStage;