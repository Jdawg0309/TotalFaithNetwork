import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { animated } from '@react-spring/web';

// TFN Palette
export const COLORS = {
  primary: '#1E3A8A',      // TFN Blue
  secondary: '#3B82F6',    // TFN Light Blue
  accentYellow: '#FBBF24',
  accentGold: '#D4AF37',
  neutralDark: '#111827',
  neutralMid: '#374151',
  neutralLight: '#D1D5DB',
  white: '#FFFFFF',
  black: '#000000',
};

// Enhanced Animations
export const fadeIn = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(1.25rem); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

export const pulse = keyframes`
  0%, 100% { 
    transform: scale(1); 
    opacity: 1;
  }
  50% { 
    transform: scale(1.05); 
    opacity: 0.9;
  }
`;

export const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Global Style with enhanced typography and smooth scrolling
export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after { 
    box-sizing: border-box; 
    margin: 0; 
    padding: 0; 
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  body {
    width: 100%; 
    height: 100%; 
    overflow-x: hidden;
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: ${COLORS.neutralDark};
    color: ${COLORS.neutralLight};
    font-size: 1rem; 
    line-height: 1.6;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4 {
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 0.5em;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: all 0.2s ease;
  }
`;

// Layout with subtle pattern
export const PageContainer = styled(animated.div)`
  background: 
    linear-gradient(
      rgba(30, 58, 138, 0.1) 1px, 
      transparent 1px
    ),
    linear-gradient(
      90deg, 
      rgba(30, 58, 138, 0.1) 1px, 
      transparent 1px
    );
  background-size: 20px 20px;
  background-color: ${COLORS.neutralDark};
  min-height: 100vh;
  padding: 0;
`;

// Hero with animated gradient
export const HeroSection = styled.section`
  background: linear-gradient(
    135deg, 
    ${COLORS.neutralDark} 0%, 
    ${COLORS.primary} 100%
  );
  background-size: 200% 200%;
  animation: ${gradientShift} 10s ease infinite;
  padding: 6rem 1rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid rgba(251, 191, 36, 0.2);
`;

export const HeroTitle = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  margin: 0;
  color: ${COLORS.accentGold};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.5px;
`;

export const HeroSubtitle = styled.p`
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
  margin: 1.5rem auto 0;
  color: ${COLORS.neutralLight};
  max-width: 800px;
  font-weight: 300;
  line-height: 1.4;
`;

// Sections with improved spacing and visual hierarchy
export const Section = styled.section`
  max-width: 75rem;
  margin: 0 auto 6rem;
  padding: 0 1.5rem;
  position: relative;
`;

export const SectionTitle = styled.h2`
  font-size: clamp(1.5rem, 3vw, 2rem);
  text-align: center;
  color: ${COLORS.accentYellow};
  margin-bottom: 3.5rem;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  
  &::after {
    content: '';
    display: block;
    width: 4rem;
    height: 0.25rem;
    background: ${COLORS.accentYellow};
    margin: 1rem auto 0;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 6rem;
  }
`;

// Leadership cards with enhanced interactions
export const LeaderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18.75rem, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
`;

export const LeaderCard = styled(animated.div)`
  background: ${COLORS.neutralMid};
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  
  &:hover {
    transform: translateY(-0.625rem);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 6px rgba(0, 0, 0, 0.15);
  }
`;

export const LeaderImageContainer = styled.div`
  width: 100%; 
  height: 20rem;
  overflow: hidden;
  position: relative;
`;

export const LeaderImage = styled.img`
  width: 100%; 
  height: 100%; 
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
  
  ${LeaderCard}:hover & { 
    transform: scale(1.08); 
  }
`;

export const LeaderOverlay = styled.div`
  position: absolute; 
  inset: 0;
  background: linear-gradient(
    to top, 
    rgba(0, 0, 0, 0.7) 0%, 
    rgba(0, 0, 0, 0.3) 50%, 
    transparent 100%
  );
  display: flex; 
  align-items: flex-end; 
  justify-content: center;
  opacity: 0; 
  transition: opacity 0.3s ease;
  padding: 1.5rem;
  
  ${LeaderCard}:hover & { 
    opacity: 1; 
  }
`;

export const LeaderContent = styled.div`
  padding: 1.5rem;
  border-top: 2px solid ${COLORS.accentYellow};
`;

export const LeaderName = styled.h3`
  font-size: 1.375rem;
  margin: 0 0 0.75rem;
  color: ${COLORS.accentYellow};
  font-weight: 600;
`;

export const LeaderDesc = styled.p`
  font-size: 1rem; 
  color: ${COLORS.neutralLight}; 
  margin: 0;
  line-height: 1.5;
`;

export const ViewButton = styled.button`
  padding: 0.875rem 1.75rem;
  background: ${COLORS.accentYellow}; 
  color: ${COLORS.neutralDark};
  border: none; 
  border-radius: 0;
  font-size: 1rem; 
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: ${COLORS.accentGold};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// Modal with enhanced focus states
export const ModalOverlay = styled.div`
  position: fixed; 
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex; 
  align-items: center; 
  justify-content: center;
  padding: 1rem;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

export const ModalWindow = styled.div`
  background: ${COLORS.neutralMid};
  border-radius: 0;
  width: 100%; 
  max-width: 56rem;
  padding: 2.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
`;

export const ModalImage = styled.img`
  width: 100%; 
  height: auto;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const ModalHeader = styled.h2`
  font-size: 1.75rem; 
  color: ${COLORS.accentYellow}; 
  margin-bottom: 1rem;
  line-height: 1.3;
`;

export const ModalRole = styled.p`
  font-size: 1rem; 
  color: ${COLORS.neutralLight}; 
  font-style: italic; 
  margin-bottom: 1.5rem;
  opacity: 0.8;
`;

export const ModalBody = styled.div`
  font-size: 1rem; 
  color: ${COLORS.neutralLight}; 
  line-height: 1.6;
`;

export const ModalText = styled.p`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const CloseButton = styled.button`
  display: block; 
  margin: 2rem auto 0;
  padding: 0.875rem 1.75rem;
  background: ${COLORS.accentYellow}; 
  color: ${COLORS.neutralDark};
  border: none; 
  border-radius: 0; 
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${COLORS.accentGold};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:focus {
    outline: 2px solid ${COLORS.white};
    outline-offset: 2px;
  }
`;

// Swiper with custom styling
export const SwiperContainer = styled.div`
  padding: 0 1rem;
  margin: 3rem 0;
  
  .swiper-pagination-bullet { 
    background: ${COLORS.neutralLight}; 
    opacity: 0.6;
    width: 10px;
    height: 10px;
    transition: all 0.2s ease;
  }
  
  .swiper-pagination-bullet-active { 
    background: ${COLORS.accentYellow}; 
    opacity: 1;
    transform: scale(1.2);
  }
  
  .swiper-button-next, 
  .swiper-button-prev { 
    color: ${COLORS.accentYellow};
    background: rgba(0, 0, 0, 0.5);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    
    &::after {
      font-size: 1.25rem;
      font-weight: bold;
    }
    
    &:hover {
      background: rgba(0, 0, 0, 0.7);
    }
  }
`;

// Advisory with improved image handling
export const AdvisoryImageContainer = styled.div`
  width: 100%; 
  height: 20rem;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom, 
      rgba(0, 0, 0, 0.1) 0%, 
      rgba(0, 0, 0, 0.5) 100%
    );
  }
`;

export const AdvisoryImage = styled.img`
  width: 100%; 
  height: 100%; 
  object-fit: cover;
  transition: transform 0.5s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

// Tribute with refined typography
export const TributeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18.75rem, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
`;

export const TributeCard = styled.div`
  background: ${COLORS.neutralMid}; 
  border-radius: 0;
  overflow: hidden; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-0.5rem);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
  }
`;

export const TributeImageContainer = styled.div`
  position: relative; 
  height: 16rem;
  overflow: hidden;
`;

export const TributeImage = styled.img`
  width: 100%; 
  height: 100%; 
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${TributeCard}:hover & { 
    transform: scale(1.05); 
  }
`;

export const TributeOverlay = styled.div`
  position: absolute; 
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex; 
  align-items: center; 
  justify-content: center;
  opacity: 0; 
  transition: opacity 0.3s ease;
  padding: 2rem;
  
  ${TributeCard}:hover & { 
    opacity: 1; 
  }
`;

export const TributeQuote = styled.p`
  color: ${COLORS.white}; 
  font-size: 1.125rem; 
  text-align: center; 
  font-style: italic;
  line-height: 1.6;
  position: relative;
  
  &::before,
  &::after {
    content: '"';
    font-size: 2rem;
    color: ${COLORS.accentYellow};
    opacity: 0.5;
    position: absolute;
  }
  
  &::before {
    top: -1rem;
    left: -1rem;
  }
  
  &::after {
    bottom: -1.5rem;
    right: -1rem;
  }
`;

export const TributeContent = styled.div`
  padding: 1.5rem; 
  text-align: center;
  border-top: 2px solid ${COLORS.accentYellow};
`;

export const TributeName = styled.h3`
  font-size: 1.375rem; 
  color: ${COLORS.accentYellow}; 
  margin: 0 0 0.5rem;
  font-weight: 600;
`;

export const TributeDates = styled.p`
  font-size: 1rem; 
  color: ${COLORS.neutralLight}; 
  margin: 0;
  opacity: 0.8;
`;

// About Content with improved readability
export const AboutContent = styled.div`
  background: rgba(55, 65, 81, 0.5);
  border-radius: 0;
  padding: 2.5rem;
  border-left: 4px solid ${COLORS.accentYellow};
  
  @media (min-width: 768px) {
    padding: 3rem;
  }
`;

export const AboutText = styled.p`
  font-size: 1.125rem; 
  line-height: 1.7; 
  color: ${COLORS.neutralLight}; 
  margin-bottom: 1.5rem;
  
  &:last-child { 
    margin-bottom: 0; 
  }
  
  & strong {
    color: ${COLORS.accentYellow};
    font-weight: 600;
  }
`;

// Mission with subtle animation
export const MissionStatement = styled.section`
  background: ${COLORS.accentYellow};
  padding: 5rem 1rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      to right, 
      ${COLORS.primary}, 
      ${COLORS.accentGold}, 
      ${COLORS.primary}
    );
    animation: ${gradientShift} 5s linear infinite;
  }
`;

export const MissionTitle = styled.h2`
  font-size: clamp(1.75rem, 4vw, 2.5rem); 
  color: ${COLORS.neutralDark}; 
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    display: block;
    width: 50%;
    height: 3px;
    background: ${COLORS.neutralDark};
    margin: 1rem auto 0;
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 75%;
  }
`;

export const MissionText = styled.p`
  font-size: clamp(1.125rem, 2.5vw, 1.375rem); 
  color: ${COLORS.neutralDark}; 
  line-height: 1.6;
  max-width: 56rem; 
  margin: 0 auto;
  font-weight: 500;
`;