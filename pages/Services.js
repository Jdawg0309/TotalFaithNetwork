import React from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

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
`;

const starTwinkle = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
`;

const Services = () => {
  const services = [
    { icon: '🎥', title: 'Commercials & Logos', text: 'Eye-catching designs to build your brand identity.' },
    { icon: '📢', title: 'PSAs & Intros', text: 'Powerful public service announcements and branded intros.' },
    { icon: '🎞️', title: 'Editing & Post-Production', text: 'Seamless editing for professional-grade visuals.' },
    { icon: '📽️', title: 'Video Promos', text: 'Dynamic promotions tailored to your audience.' },
    { icon: '💼', title: 'PR & Marketing', text: 'Strategic campaigns that elevate your message.' },
    { icon: '📸', title: 'Videography & Photography', text: 'Professional footage to capture every moment.' },
    { icon: '✨', title: 'Branding', text: 'Standout visuals that define your presence.' },
    { icon: '📺', title: 'TV Series Production', text: 'From concept to screen—complete production support.' },
    { icon: '🎙️', title: 'Podcasts & Webcasts', text: 'Engaging audio and video shows tailored to your voice.' },
    { icon: '🔴', title: 'Live Streaming', text: 'Stream events in high definition with zero hassle.' }
  ];

  return (
    <>
      <GlobalStyle />
      <StarryBackground>
        {Array.from({ length: 150 }).map((_, i) => (
          <Star
            key={i}
            size={Math.random() * 3 + 1}
            left={`${Math.random() * 100}%`}
            top={`${Math.random() * 100}%`}
            delay={Math.random() * 5}
            duration={Math.random() * 3 + 2}
          />
        ))}
      </StarryBackground>

      <PageContainer>
        <SectionTitle>Our Services</SectionTitle>
        <OnDemandContent>
          {services.map((service, i) => (
            <OnDemandCard key={i}>
              <CardIcon>{service.icon}</CardIcon>
              <CardTitle>{service.title}</CardTitle>
              <CardText>{service.text}</CardText>
            </OnDemandCard>
          ))}
        </OnDemandContent>
      </PageContainer>
    </>
  );
};

export default Services;

const StarryBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
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

const PageContainer = styled.div`
  position: relative;
  padding: 40px 20px;
  max-width: 1000px;
  margin: 0 auto;
  color: #e0e0ff;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
  color: #ffcc00;
  text-shadow: 0 0 10px rgba(255, 204, 0, 0.4);

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const OnDemandContent = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const OnDemandCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  width: 30%;
  min-width: 250px;
  max-width: 320px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CardIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 10px;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: #ffcc00;
  text-shadow: 0 0 5px rgba(255, 204, 0, 0.5);
`;

const CardText = styled.p`
  font-size: 1rem;
  color: #e0e0ff;
  line-height: 1.5;
  margin: 0;
`;
