// HomeExtrasStyles.js
import styled from 'styled-components';

export const HeroSection = styled.section`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
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
    bottom: 0;
    background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjA0LDAsMC4wNSkiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=');
    opacity: 0.3;
  }
`;

export const HeroTitle = styled.h1`
  font-size: 3rem;
  margin: 0;
  color: #ffcc00;
  position: relative;
  z-index: 1;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;


export const FeaturedQuote = styled.div`
  text-align: center;
  margin: 60px 0;
  padding: 30px;
  background: rgba(255, 204, 0, 0.1);
  border-radius: 15px;
  border-left: 4px solid #ffcc00;
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
    opacity: 0.2;
  }
`;

export const QuoteText = styled.p`
  font-size: 1.8rem;
  color: #ffcc00;
  font-style: italic;
  position: relative;
  z-index: 1;
  margin: 0;
  text-shadow: 0 0 10px rgba(255, 204, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

export const CTASection = styled.div`
  text-align: center;
  margin: 60px 0;
`;

export const CTAButton = styled.button`
  padding: 15px 40px;
  font-size: 1.2rem;
  background: linear-gradient(45deg, #ffcc00, #ff9900);
  color: #1a1a2e;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  box-shadow: 0 5px 20px rgba(255, 204, 0, 0.3);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(255, 204, 0, 0.4);
  }
`;

export const Footer = styled.footer`
  text-align: center;
  padding: 30px 0;
  margin-top: 60px;
  border-top: 1px solid rgba(255, 204, 0, 0.2);
`;

export const FooterText = styled.p`
  color: #aaa;
  font-size: 0.9rem;
  margin-bottom: 15px;
`;

export const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  
  a {
    color: #ffcc00;
    font-size: 1.2rem;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-3px);
      color: #fff;
    }
  }
`;

export const FeaturesSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin: 60px 0;
`;

export const FeatureCard = styled.div`
  background: rgba(30, 30, 47, 0.7);
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 204, 0, 0.1);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px rgba(255, 204, 0, 0.2);
    border-color: rgba(255, 204, 0, 0.3);
  }
`;

export const FeatureIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 20px;
`;

export const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: #ffcc00;
  margin-bottom: 15px;
`;

export const FeatureDescription = styled.p`
  color: #bbb;
  font-size: 1rem;
  line-height: 1.6;
`;

export const StoriesSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin: 60px 0;
`;

export const StoryCard = styled.div`
  background: rgba(30, 30, 47, 0.7);
  border-radius: 15px;
  padding: 25px;
  transition: all 0.3s ease;
  border-left: 3px solid #ffcc00;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

export const StoryTitle = styled.h3`
  font-size: 1.4rem;
  color: #ffcc00;
  margin-bottom: 15px;
`;

export const StoryExcerpt = styled.p`
  color: #ccc;
  font-size: 1rem;
  line-height: 1.6;
`;

export const TestimonialsSection = styled.section`
  margin: 60px 0;
  background: rgba(30, 30, 47, 0.5);
  border-radius: 15px;
  padding: 40px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '"';
    position: absolute;
    top: -30px;
    left: 20px;
    font-size: 10rem;
    color: rgba(255, 204, 0, 0.1);
    font-family: Georgia, serif;
    line-height: 1;
  }
`;

export const TestimonialCard = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
`;

export const TestimonialQuote = styled.blockquote`
  font-size: 1.5rem;
  color: #e0e0ff;
  font-style: italic;
  line-height: 1.6;
  margin-bottom: 20px;
  position: relative;
  
  &::before, &::after {
    content: '"';
    font-size: 2rem;
    color: #ffcc00;
    position: absolute;
  }
  
  &::before {
    top: -15px;
    left: -25px;
  }
  
  &::after {
    bottom: -35px;
    right: -25px;
  }
`;

export const TestimonialAuthor = styled.p`
  color: #ffcc00;
  font-size: 1.1rem;
  font-weight: 600;
`;

export const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin: 40px 0;
  text-align: center;
`;

export const StatItem = styled.div`
  padding: 20px;
  background: rgba(30, 30, 47, 0.5);
  border-radius: 10px;
`;

export const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffcc00;
  margin-bottom: 10px;
`;

export const StatLabel = styled.div`
  font-size: 1rem;
  color: #aaa;
`;