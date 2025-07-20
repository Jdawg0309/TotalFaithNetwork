// src/styles/HomeStyles.js
import styled, { keyframes, createGlobalStyle } from 'styled-components';

// TFN Palette - Maintained original color scheme
const COLORS = {
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
export const starTwinkle = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
  75% { opacity: 0.8; transform: scale(1.1); }
`;

export const shootingStar = keyframes`
  0% { transform: translate(0, 0) rotate(-45deg); opacity: 1; }
  70% { opacity: 0.8; }
  100% { transform: translate(100vw, 100vh) rotate(-45deg); opacity: 0; }
`;

export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const scaleUp = keyframes`
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

export const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Enhanced Global Styles
export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
  }

  body {
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: ${COLORS.neutralDark};
    color: ${COLORS.neutralLight};
    line-height: 1.6;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  section {
    padding: 6rem 0;
    position: relative;
  }

  h1, h2, h3, h4 {
    margin-bottom: 1.5rem;
    line-height: 1.2;
    font-weight: 700;
  }

  h2 {
    font-size: 2.5rem;
    color: ${COLORS.accentGold};
    margin-bottom: 3rem;
    text-align: center;
    position: relative;
    text-transform: uppercase;
    letter-spacing: 2px;
    
    &::after {
      content: '';
      display: block;
      width: 100px;
      height: 4px;
      background: linear-gradient(90deg, ${COLORS.secondary}, ${COLORS.accentGold});
      margin: 1.5rem auto;
      border-radius: 2px;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
  }

  button {
    cursor: pointer;
    transition: all 0.3s ease;
  }
`;

// Enhanced Layout Components
export const PageContainer = styled.div`
  position: relative;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

// Enhanced Hero Components
export const HeroContent = styled.div`
  position: relative;
  z-index: 10;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  padding: 5rem 2rem;
  animation: ${fadeIn} 0.8s ease-out;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

export const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin: 0 0 1.5rem;
  color: ${COLORS.white};
  text-shadow: 0 4px 12px rgba(0,0,0,0.6);
  line-height: 1.1;
  
  span {
    color: ${COLORS.accentGold};
    display: block;
    font-size: clamp(2.8rem, 6vw, 5rem);
    margin-top: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-shadow: 0 2px 8px rgba(212, 175, 55, 0.5);
  }
`;

export const HeroSubtitle = styled.p`
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  color: ${COLORS.neutralLight};
  margin-bottom: 3rem;
  opacity: 0;
  animation: ${fadeIn} 1s ease-out 0.3s forwards;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

export const HeroButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  opacity: 0;
  animation: ${fadeIn} 1s ease-out 0.5s forwards;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
`;

export const PrimaryButton = styled.button`
  background: ${COLORS.secondary};
  color: ${COLORS.white};
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
  border: 2px solid ${COLORS.secondary};
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover {
    background: ${COLORS.primary};
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.6);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const SecondaryButton = styled(PrimaryButton)`
  background: transparent;
  border: 2px solid ${COLORS.accentGold};
  color: ${COLORS.accentGold};
  box-shadow: 0 4px 15px rgba(251, 191, 36, 0.3);
  
  &:hover {
    background: rgba(212, 175, 55, 0.1);
    box-shadow: 0 8px 25px rgba(251, 191, 36, 0.4);
    color: ${COLORS.accentGold};
  }
`;

// Enhanced Starry Background
export const StarryBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  background: linear-gradient(to bottom, ${COLORS.neutralDark} 0%, ${COLORS.primary} 100%);
  overflow: hidden;
`;

export const Star = styled.div`
  position: absolute;
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  background-color: ${COLORS.white};
  border-radius: 50%;
  left: ${p => p.left};
  top: ${p => p.top};
  animation: ${starTwinkle} ${p => p.duration || 3}s infinite ease-in-out;
  animation-delay: ${p => p.delay || 0}s;
  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.8));
`;

export const ShootingStar = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  background: ${COLORS.white};
  left: ${p => p.left};
  top: ${p => p.top};
  border-radius: 50%;
  animation: ${shootingStar} ${p => p.duration || 1}s linear;
  animation-delay: ${p => p.delay || 0}s;
  filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.8));

  &::before {
    content: '';
    position: absolute;
    width: 100px;
    height: 1px;
    background: linear-gradient(90deg, 
      ${COLORS.white} 0%, 
      rgba(255,255,255,0.8) 70%, 
      rgba(255,255,255,0) 100%);
    transform: rotate(-45deg);
    transform-origin: left;
  }
`;

// Enhanced Section Components
export const Section = styled.section`
  position: relative;
  padding: 8rem 0;
  
  @media (max-width: 768px) {
    padding: 5rem 0;
  }
`;

export const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 2.5rem);
`;

export const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

// Enhanced Quote Section
export const FeaturedQuote = styled.div`
  padding: 4rem 3rem;
  background: rgba(55, 65, 81, 0.7);
  border-left: 5px solid ${COLORS.accentGold};
  text-align: center;
  max-width: 1000px;
  margin: 0 auto;
  box-shadow: 0 15px 40px rgba(0,0,0,0.4);
  backdrop-filter: blur(5px);
  border-radius: 4px;
  animation: ${scaleUp} 0.8s ease-out;

  @media (max-width: 768px) {
    padding: 3rem 2rem;
  }
`;

export const QuoteText = styled.blockquote`
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-style: italic;
  color: ${COLORS.accentGold};
  margin: 0;
  font-weight: 500;
  line-height: 1.4;
  
  &::before, &::after {
    content: '"';
    color: ${COLORS.secondary};
    font-size: 2.5rem;
    line-height: 0;
    vertical-align: -0.4em;
  }

  &::before {
    margin-right: 0.5rem;
  }

  &::after {
    margin-left: 0.5rem;
  }
`;

// Enhanced Stats Section
export const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2.5rem;
  margin: 4rem 0;
`;

export const StatItem = styled.div`
  padding: 2.5rem;
  background: rgba(30, 58, 138, 0.7);
  text-align: center;
  box-shadow: 0 15px 40px rgba(0,0,0,0.3);
  border-bottom: 4px solid ${COLORS.accentGold};
  border-radius: 4px;
  backdrop-filter: blur(5px);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 50px rgba(0,0,0,0.4);
  }
`;

export const StatNumber = styled.div`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  color: ${COLORS.accentYellow};
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
`;

export const StatLabel = styled.div`
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: ${COLORS.white};
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

// Enhanced Features Section
export const FeaturesSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin: 5rem 0;
`;

export const FeatureIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 2rem;
  color: ${COLORS.accentGold};
  transition: all 0.3s ease;
`;

export const FeatureCard = styled.div`
  padding: 3rem 2.5rem;
  background: rgba(55, 65, 81, 0.7);
  text-align: center;
  box-shadow: 0 15px 40px rgba(0,0,0,0.3);
  border: 1px solid rgba(209, 213, 219, 0.2);
  border-radius: 8px;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  backdrop-filter: blur(5px);
  
  &:hover {
    transform: translateY(-10px);
    border-color: ${COLORS.accentGold};
    box-shadow: 0 20px 50px rgba(0,0,0,0.4);
    
    ${FeatureIcon} {
      animation: ${pulse} 1.5s infinite;
    }
  }
`;


export const FeatureTitle = styled.h3`
  font-size: 1.8rem;
  color: ${COLORS.white};
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const FeatureDescription = styled.p`
  font-size: 1.1rem;
  color: ${COLORS.neutralLight};
  line-height: 1.7;
`;

// Enhanced Testimonials Section
export const TestimonialsSection = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

export const TestimonialCard = styled.div`
  padding: 4rem 3rem;
  background: rgba(55, 65, 81, 0.7);
  box-shadow: 0 15px 40px rgba(0,0,0,0.3);
  border-top: 4px solid ${COLORS.accentGold};
  text-align: center;
  border-radius: 4px;
  backdrop-filter: blur(5px);
  animation: ${scaleUp} 0.8s ease-out;

  @media (max-width: 768px) {
    padding: 3rem 2rem;
  }
`;

export const TestimonialQuote = styled.blockquote`
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  font-style: italic;
  color: ${COLORS.neutralLight};
  margin-bottom: 2.5rem;
  line-height: 1.7;
  
  &::before, &::after {
    content: '"';
    color: ${COLORS.secondary};
    font-size: 2rem;
    line-height: 0;
    vertical-align: -0.4em;
  }

  &::before {
    margin-right: 0.5rem;
  }

  &::after {
    margin-left: 0.5rem;
  }
`;

export const TestimonialAuthor = styled.div`
  font-size: 1.3rem;
  color: ${COLORS.accentGold};
  font-weight: 600;
  letter-spacing: 1px;
`;

// Enhanced Events Section
export const UpcomingEvents = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  margin-top: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const EventImageContainer = styled.div`
  width: 100%;
  height: 220px;
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
`;

export const EventCard = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(55, 65, 81, 0.7); /* Match TestimonialCard */
  border-radius: 4px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.3);
  border-top: 4px solid ${COLORS.accentGold};
  backdrop-filter: blur(5px);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  height: 100%;
  
  &:hover {
    box-shadow: 0 20px 50px rgba(0,0,0,0.4);
    transform: translateY(-8px);
    
    ${EventImageContainer} img {
      transform: scale(1.05);
    }
  }
`;

export const EventDetails = styled.div`
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: rgba(55, 65, 81, 0.7);;
`;

export const EventDate = styled.div`
  font-size: 1.1rem;
  color: ${COLORS.accentYellow};
  margin-bottom: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  
  &::before {
    content: '📅';
    margin-right: 0.5rem;
    font-size: 1.2rem;
  }
`;

export const EventTitle = styled.h3`
  font-size: 1.7rem;
  color: ${COLORS.accentYellow};
  margin-bottom: 1rem;
  line-height: 1.3;
`;

export const EventLocation = styled.div`
  font-size: 1.1rem;
  color: ${COLORS.neutralMid};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  
  &::before {
    content: '📍';
    font-size: 1.2rem;
  }
`;

export const EventButton = styled.a`
  display: inline-block;
  margin-top: auto;
  padding: 0.75rem 1.5rem;
  background-color: ${COLORS.secondary};
  color: ${COLORS.white};
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  align-self: flex-start;
  text-align: center;
  
  &:hover {
    background-color: ${COLORS.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(30, 58, 138, 0.3);
  }
`;

// Enhanced CTA Section
export const CTASection = styled.div`
  padding: 6rem 2rem;
  text-align: center;
  background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.neutralDark} 100%);
  border: 1px solid ${COLORS.secondary};
  border-radius: 8px;
  margin: 4rem 0;
  box-shadow: 0 15px 40px rgba(0,0,0,0.3);
`;

export const CTAButton = styled(PrimaryButton)`
  padding: 1.2rem 3.5rem;
  font-size: 1.2rem;
  margin-top: 2.5rem;
  font-weight: 700;
  letter-spacing: 1px;
`;

// Enhanced Footer
export const Footer = styled.footer`
  padding: 4rem 0;
  text-align: center;
  background: ${COLORS.neutralDark};
  border-top: 1px solid ${COLORS.neutralMid};
  margin-top: 4rem;
`;

export const FooterText = styled.p`
  color: ${COLORS.neutralLight};
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
`;

export const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  
  a {
    color: ${COLORS.neutralLight};
    font-size: 1.8rem;
    transition: all 0.3s ease;
    
    &:hover {
      color: ${COLORS.accentGold};
      transform: translateY(-3px);
    }
  }
`;