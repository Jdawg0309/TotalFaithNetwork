import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import introVideo from '../backend/uploads/videos/intro.mp4';
import { useSpring, animated, config as springConfig } from 'react-spring';
import styled, { keyframes } from 'styled-components';
import FeaturedShows from '../components/FeaturedShows';
import ChannelGuide from '../components/ChannelGuide';
import TheaterStage from '../components/TheaterStage';
import ContentSection from '../components/ContentSection';

const GlobalStyle = createGlobalStyle`
  *::before, *::after { 
    box-sizing: border-box; 
    margin: 0; 
    padding: 0;
  }
  
  html, body { 
    width: 100%; 
    height: 100%; 
    overflow-x: hidden; 
    font-family: 'Poppins', 'Segoe UI', sans-serif;
    scroll-behavior: smooth;
    background-color: #0a0a12;
    color: #e0e0ff;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #1a1a2e;
  }

  ::-webkit-scrollbar-thumb {
    background: #ffcc00;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #ff9900;
  }
`;

const starTwinkle = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
`;

const shootingStar = keyframes`
  0% { transform: translateX(0) translateY(0); opacity: 1; }
  100% { transform: translateX(100vw) translateY(100vh); opacity: 0; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export default function Home() {
  const [navVisible, setNavVisible] = useState(false);
  const [shootingStars, setShootingStars] = useState([]);

  // Generate shooting stars occasionally
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newStar = {
          id: Date.now(),
          left: `${Math.random() * 20}%`,
          top: `${Math.random() * 20}%`,
          delay: Math.random() * 2,
          duration: Math.random() * 2 + 1
        };
        setShootingStars(prev => [...prev, newStar]);
        
        // Remove star after animation
        setTimeout(() => {
          setShootingStars(prev => prev.filter(star => star.id !== newStar.id));
        }, (newStar.duration + newStar.delay) * 1000);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const curtainAnim = useSpring({
    from: { leftX: 0, rightX: 0 },
    to: { leftX: -100, rightX: 100 },
    config: { ...springConfig.wobbly, friction: 30 },
    delay: 500,
    onRest: () => setNavVisible(true)
  });

  const contentAnim = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1000, ...springConfig.easeOut },
    delay: 2000,
  });

  const stars = Array.from({ length: 150 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2
  }));

  return (
    <>
      <GlobalStyle />
      <StarryBackground>
        {stars.map(star => (
          <Star 
            key={`star-${star.id}`} 
            size={star.size} 
            left={star.left} 
            top={star.top} 
            delay={star.delay}
            duration={star.duration}
          />
        ))}
        {shootingStars.map(star => (
          <ShootingStar
            key={`shooting-${star.id}`}
            left={star.left}
            top={star.top}
            delay={star.delay}
            duration={star.duration}
          />
        ))}
      </StarryBackground>

      <PageContainer>
        <TheaterStage curtainAnim={curtainAnim} introVideo={introVideo} />
        <ContentSection anim={contentAnim} />

        <FeaturedSection>
          <SectionTitle>
            <TitleIcon>🌟</TitleIcon>
            Featured Programs
            <TitleIcon>🌟</TitleIcon>
          </SectionTitle>
          <FeaturedShows />
        </FeaturedSection>

        <ChannelGuideSection>
          <SectionTitle>Channel Guide</SectionTitle>
          <ChannelGuide />
        </ChannelGuideSection>

        <OnDemandSection>
          <SectionTitle>On Demand</SectionTitle>
          <OnDemandContent>
            <OnDemandCard>
              <CardIcon>🎬</CardIcon>
              <CardTitle>Original Series</CardTitle>
              <CardText>Exclusive content only on TFN</CardText>
              <CardButton>Browse Now</CardButton>
            </OnDemandCard>
            <OnDemandCard>
              <CardIcon>🎙️</CardIcon>
              <CardTitle>Podcasts</CardTitle>
              <CardText>Faith and inspiration on the go</CardText>
              <CardButton>Listen Now</CardButton>
            </OnDemandCard>
            <OnDemandCard>
              <CardIcon>📺</CardIcon>
              <CardTitle>Live Events</CardTitle>
              <CardText>Watch our special broadcasts</CardText>
              <CardButton>View Schedule</CardButton>
            </OnDemandCard>
          </OnDemandContent>
        </OnDemandSection>

        <NewsletterSection>
          <NewsletterContainer>
            <NewsletterTitle>Stay Connected</NewsletterTitle>
            <NewsletterText>
              Subscribe to our newsletter for updates on new shows, events, and exclusive content.
            </NewsletterText>
            <NewsletterForm>
              <NewsletterInput type="email" placeholder="Your email address" />
              <NewsletterButton>Subscribe</NewsletterButton>
            </NewsletterForm>
          </NewsletterContainer>
        </NewsletterSection>
      </PageContainer>
    </>
  );
}

const StarryBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
  background: linear-gradient(to bottom, #0a0a12 0%, #1a1a2e 100%);
`;

const Star = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 ${props => props.size / 2}px rgba(255, 255, 255, 0.5);
  left: ${props => props.left};
  top: ${props => props.top};
  animation: ${starTwinkle} ${props => props.duration}s infinite ease-in-out;
  animation-delay: ${props => props.delay}s;
`;

const ShootingStar = styled.div`
  position: absolute;
  width: 3px;
  height: 3px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.8);
  left: ${props => props.left};
  top: ${props => props.top};
  animation: ${shootingStar} ${props => props.duration}s linear infinite;
  animation-delay: ${props => props.delay}s;
  &::before {
    content: '';
    position: absolute;
    width: 100px;
    height: 1px;
    background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
    transform: rotate(-45deg);
    transform-origin: left;
  }
`;

const PageContainer = styled.div`
  position: relative;
  padding: 0 20px;
  max-width: 1400px;
  margin: 0 auto;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

const FeaturedSection = styled.section`
  margin: 60px 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, #ffcc00 50%, transparent 100%);
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 40px 0;
  text-align: center;
  color: #ffcc00;
  text-shadow: 0 0 10px rgba(255, 204, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  position: relative;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    flex-direction: column;
    gap: 10px;
  }
`;

const TitleIcon = styled.span`
  font-size: 1.5rem;
  animation: ${pulse} 2s infinite ease-in-out;
  
  &:nth-child(2) {
    animation-delay: 0.5s;
  }
`;

const ChannelGuideSection = styled.section`
  margin: 60px 0;
  padding: 40px 0;
  background: rgba(30, 30, 47, 0.5);
  border-radius: 20px;
  box-shadow: 0 0 30px rgba(255, 204, 0, 0.1);
`;

const OnDemandSection = styled.section`
  margin: 60px 0;
`;

const OnDemandContent = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 40px;
`;

const OnDemandCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 30px;
  width: 30%;
  min-width: 280px;
  max-width: 350px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 204, 0, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent 0%, rgba(255, 204, 0, 0.05) 100%);
    z-index: -1;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 30px rgba(255, 204, 0, 0.3);
    border-color: rgba(255, 204, 0, 0.5);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CardIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 20px;
  transition: transform 0.3s ease;

  ${OnDemandCard}:hover & {
    transform: scale(1.2);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #ffcc00;
  text-shadow: 0 0 10px rgba(255, 204, 0, 0.5);
`;

const CardText = styled.p`
  font-size: 1.1rem;
  color: #e0e0ff;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const CardButton = styled.button`
  background: linear-gradient(45deg, #ffcc00, #ff9900);
  color: #1a1a2e;
  border: none;
  border-radius: 30px;
  padding: 10px 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(255, 204, 0, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(255, 204, 0, 0.4);
  }
`;

const NewsletterSection = styled.section`
  margin: 80px 0;
  padding: 60px 20px;
  background: linear-gradient(135deg, #1a1a2e 0%, #0a0a12 100%);
  border-radius: 20px;
  box-shadow: 0 0 30px rgba(255, 204, 0, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjA0LDAsMC4wNSkiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=');
    opacity: 0.3;
  }
`;

const NewsletterContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const NewsletterTitle = styled.h3`
  font-size: 2rem;
  color: #ffcc00;
  margin-bottom: 20px;
  text-shadow: 0 0 10px rgba(255, 204, 0, 0.5);
`;

const NewsletterText = styled.p`
  font-size: 1.2rem;
  color: #e0e0ff;
  margin-bottom: 30px;
  line-height: 1.6;
`;

const NewsletterForm = styled.form`
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const NewsletterInput = styled.input`
  padding: 15px 20px;
  border-radius: 30px;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  width: 60%;
  min-width: 300px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    box-shadow: 0 0 15px rgba(255, 204, 0, 0.5);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const NewsletterButton = styled.button`
  padding: 15px 30px;
  background: linear-gradient(45deg, #ffcc00, #ff9900);
  color: #1a1a2e;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(255, 204, 0, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(255, 204, 0, 0.4);
  }
`;