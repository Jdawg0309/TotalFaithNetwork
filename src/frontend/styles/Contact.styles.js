import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { animated } from '@react-spring/web';
import { FaYoutube, FaVimeoV, FaInstagram, FaTumblr, FaTiktok, FaLinkedin } from 'react-icons/fa';

// TFN Palette
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

// Animations
export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(1rem); }
  to   { opacity: 1; transform: translateY(0); }
`;
export const pulse = keyframes`
  0%,100% { transform: scale(1); opacity: 1; }
  50%     { transform: scale(1.05); opacity: 0.9; }
`;
export const slideIn = keyframes`
  from { opacity: 0; transform: translateY(1rem); }
  to   { opacity: 1; transform: translateY(0); }
`;

// Global Styles
export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    width: 100%; height: 100%; overflow-x: hidden;
    background: ${COLORS.neutralDark}; color: ${COLORS.neutralLight};
    font-family: 'Poppins', sans-serif; font-size: 1rem; line-height: 1.6;
    -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;
  }
  h1, h2, h3, h4 { font-weight: 600; line-height: 1.2; margin-bottom: 0.5em; }
  a { color: inherit; text-decoration: none; transition: color 0.2s ease; }
`;

// Config
export const TO_EMAIL = 'totalfaithmediarelations@yahoo.com';

// Data arrays
export const socialLinks = [
  { platform: 'YouTube', url: 'https://www.youtube.com/@TFNBroadcast', icon: FaYoutube, color: '#FF0000' },
  { platform: 'Vimeo', url: 'https://vimeo.com/totalfaithnetwork', icon: FaVimeoV, color: '#1AB7EA' },
  { platform: 'Instagram', url: 'https://www.instagram.com/totalfaithnetwork/', icon: FaInstagram, color: '#E1306C' },
  { platform: 'Tumblr', url: 'https://www.tumblr.com/tfnbroadcast', icon: FaTumblr, color: '#35465C' },
  { platform: 'TikTok', url: 'https://www.tiktok.com/@totalfaithvisuals', icon: FaTiktok, color: '#000000' },
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/company/totalfaithnetwork/', icon: FaLinkedin, color: '#0077B5' }
];
export const services = [
  { icon: '🎥', title: 'Commercials & Logos', description: 'Eye-catching designs to build your brand.', details: ['Concept development', 'Storyboarding', 'High-end production', 'Brand integration'] },
  { icon: '📢', title: 'PSAs & Intros', description: 'Powerful announcements and intros.', details: ['Script writing', 'Voiceover recording', 'Motion graphics', 'Broadcast-ready formats'] },
  { icon: '🎞️', title: 'Editing & Post-Prod', description: 'Seamless editing for pro-grade visuals.', details: ['Color correction', 'Sound design', 'Visual effects', 'Final delivery'] },
  { icon: '📽️', title: 'Video Promos', description: 'Dynamic promos tailored to your audience.', details: ['Target audience analysis', 'Creative concepting', 'Multi-platform optimization', 'Performance tracking'] },
  { icon: '💼', title: 'PR & Marketing', description: 'Strategic campaigns that elevate your message.', details: ['Media relations', 'Press releases', 'Social media strategy', 'Influencer partnerships'] },
  { icon: '📸', title: 'Videography & Photo', description: 'Pro footage to capture every moment.', details: ['4K/8K shooting', 'Drone footage', 'Lighting setup', 'Professional editing'] }
];

// Styled Components
export const Container = styled(animated.div)`
  background: ${COLORS.neutralDark};
  min-height: 100vh;
  max-width: 75rem;
  margin: 0 auto;
  padding: 2rem;
  animation: ${fadeIn} 0.5s ease-in-out;
`;
export const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;
export const H1 = styled.h1`
  font-size: clamp(2rem, 5vw, 2.5rem);
  color: ${COLORS.accentGold};
  margin: 0 0 0.5rem;
`;
export const Sub = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: ${COLORS.neutralLight};
  margin: 0 auto;
`;
export const NavTabs = styled.nav`
  display: flex;
  border-bottom: 0.125rem solid ${COLORS.neutralMid};
  margin-bottom: 2rem;
`;
export const Tab = styled.button`
  flex: 1;
  padding: 1rem;
  background: transparent;
  color: ${p => (p.active ? COLORS.accentYellow : COLORS.neutralLight)};
  border: none;
  border-bottom: 0.25rem solid ${p => (p.active ? COLORS.accentYellow : 'transparent')};
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.2s ease;
  &:hover { color: ${COLORS.accentYellow}; }
`;
export const FormContainer = styled.div`
  display: grid;
  gap: 2rem;
`;
export const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: ${COLORS.neutralMid};
  padding: 2rem;
  border-radius: 0;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;
export const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  @media(max-width: 48rem) { flex-direction: column; }
`;
export const FormField = styled.div`
  position: relative;
  flex: 1;
`;
export const FormInput = styled.input`
  width: 100%;
  padding: 1rem;
  background: ${COLORS.neutralMid};
  border: none;
  color: ${COLORS.white};
  font-size: 1rem;
`;
export const FormTextarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  background: ${COLORS.neutralMid};
  border: none;
  color: ${COLORS.white};
  font-size: 1rem;
  min-height: 10rem;
`;
export const FloatingLabel = styled.label`
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: rgba(255,255,255,0.6);
  pointer-events: none;
  font-size: 1rem;
`;
export const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, ${COLORS.accentYellow}, ${COLORS.accentGold});
  color: ${COLORS.neutralDark};
  padding: 1rem;
  border: none;
  border-radius: 0;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: transform 0.2s ease;
  &:hover { transform: translateY(-0.25rem); }
`;
export const SuccessMessage = styled.div`
  color: #4caf50;
  text-align: center;
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(76, 175, 80, 0.1);
  border-left: 0.25rem solid #4caf50;
`;
export const LearnMore = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  color: ${COLORS.accentYellow};
  font-weight: 600;
  transition: transform 0.2s ease;
  &:hover { transform: translateX(0.5rem); }
`;
export const SocialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: 2rem;
`;
export const SocialCard = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: ${({ bgcolor }) => bgcolor};
  border-radius: 0;
  color: ${COLORS.white};
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
  &:hover { transform: translateY(-0.25rem); }
`;
export const SocialIcon = styled.div`
  font-size: 1.5rem;
`;
export const SocialPlatform = styled.div`
  font-weight: 600;
  font-size: 1rem;
`;

export const ServicesSection = styled.section`
  max-width: 75rem;
  margin: 4rem auto;
  padding: 0 1rem;
`;
export const SectionTitle = styled.h2`
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  color: ${COLORS.accentYellow};
  text-align: center;
  margin-bottom: 3rem;
`;
export const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: 2rem;
`;
export const ServiceCard = styled.div`
  background: ${COLORS.neutralMid};
  border-radius: 0;
  padding: 2rem;
  text-align: center;
  transition: transform 0.2s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  &:hover { transform: translateY(-0.5rem); }
`;
export const ServiceIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;
export const ServiceTitle = styled.h3`
  font-size: 1.25rem;
  color: ${COLORS.accentYellow};
  margin-bottom: 0.5rem;
`;
export const ServiceDescription = styled.p`
  color: ${COLORS.neutralLight};
  line-height: 1.5;
  margin-bottom: 1rem;
`;
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 1000;
`;
export const ModalContent = styled.div`
  background: ${COLORS.neutralMid};
  border-radius: 0;
  width: 100%;
  max-width: 56rem;
  padding: 2rem;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
`;
export const ModalCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: ${COLORS.neutralLight};
  font-size: 1.25rem;
  cursor: pointer;
`;
export const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;
export const ModalIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;
export const ModalTitle = styled.h2`
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: ${COLORS.accentYellow};
  margin-bottom: 0.75rem;
`;
export const ModalDescription = styled.p`
  color: ${COLORS.neutralLight};
  line-height: 1.6;
  text-align: center;
  margin-bottom: 1.5rem;
`;
export const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
`;
export const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: ${COLORS.neutralDark};
`;
export const FeatureCheck = styled.div`
  color: ${COLORS.accentYellow};
`;
export const ModalActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, ${COLORS.accentYellow}, ${COLORS.accentGold});
  color: ${COLORS.neutralDark};
  padding: 1rem;
  border: none;
  border-radius: 0;
  cursor: pointer;
  font-weight: 600;
`;
