import React, { useState } from 'react';
import { FaYoutube, FaInstagram, FaVimeoV, FaTwitter, FaTumblr, FaLinkedin, FaPaperPlane, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaTiktok } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';
import { useSpring, animated } from '@react-spring/web';

// Color variables
const PRIMARY_BG = '#0a0a12';
const NAV_BG = 'rgba(26, 26, 26, 0.95)';
const TEXT_PRIMARY = '#E0E0FF';
const TEXT_ACTIVE = '#FFCC00';
const ACCENT = '#FFCC00';
const HOVER_BG = 'rgba(255, 204, 0, 0.1)';
const CARD_BG = 'rgba(20, 20, 30, 0.8)';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Contact = () => {
  const socialLinks = [
    { platform: 'Total Faith Broadcast', url: 'https://www.youtube.com/@TFNBroadcast', icon: <FaYoutube />, color: '#FF0000' },
    { platform: 'Vimeo', url: 'https://vimeo.com/totalfaithnetwork', icon: <FaVimeoV />, color: '#1AB7EA' },
    { platform: 'Total Faith Podcast', url: 'https://www.youtube.com/@TFNpodcast', icon: <FaYoutube />, color: '#FF0000' },
    { platform: 'Total Live Show', url: 'https://www.youtube.com/@TotalFaithLive', icon: <FaYoutube />, color: '#FF0000' },
    { platform: 'Instagram', url: 'https://www.instagram.com/totalfaithnetwork/', icon: <FaInstagram />, color: '#E1306C' },
    { platform: 'X (Twitter)', url: 'https://x.com/TFNBroadcast', icon: <FaTwitter />, color: '#000000' },
    { platform: 'Tumblr', url: 'https://www.tumblr.com/tfnbroadcast', icon: <FaTumblr />, color: '#35465C' },
    { platform: 'TikTok', url: 'https://www.tiktok.com/@totalfaithvisuals?_t=ZT-8x3iR2rSr1e&_r=1', icon: <FaTiktok />, color: '#000000' }, 
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/drcynthiaoriyomiashley/', icon: <FaLinkedin />, color: '#0077B5' }
  ];

  const contactInfo = [
    { icon: <FaEnvelope />, title: 'Email Us', details: 'info@totalfaithnetwork.com', link: 'mailto:info@totalfaithnetwork.com' },
    { icon: <FaPhoneAlt />, title: 'Call Us', details: '+1 (555) 123-4567', link: 'tel:+15551234567' },
    { icon: <FaMapMarkerAlt />, title: 'Visit Us', details: '123 Media Lane, Los Angeles, CA 90001', link: 'https://maps.google.com' }
  ];

  const fadeInSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 170, friction: 20 }
  });

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isHovered, setIsHovered] = useState(null);
  const [activeTab, setActiveTab] = useState('form');

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = e => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <Container style={fadeInSpring}>
      <HeaderSection>
        <HeaderTitle>Connect With TFN</HeaderTitle>
        <HeaderSubtitle>We're here to help with all your media production needs. Reach out through any channel below.</HeaderSubtitle>
      </HeaderSection>

      <ContentWrapper>
        <MainContent>
          <TabContainer>
            <TabButton 
              active={activeTab === 'form'} 
              onClick={() => setActiveTab('form')}
            >
              <FaPaperPlane style={{ marginRight: '8px' }} />
              Send Message
            </TabButton>
            <TabButton 
              active={activeTab === 'social'} 
              onClick={() => setActiveTab('social')}
            >
              <FaTwitter style={{ marginRight: '8px' }} />
              Our Socials
            </TabButton>
          </TabContainer>

          {activeTab === 'form' ? (
            <Form onSubmit={handleSubmit}>
              <FormRow>
                <InputGroup>
                  <Input 
                    type="text" 
                    name="name" 
                    placeholder=" " 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                  />
                  <Label>Your Name</Label>
                </InputGroup>
                
                <InputGroup>
                  <Input 
                    type="email" 
                    name="email" 
                    placeholder=" " 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                  />
                  <Label>Your Email</Label>
                </InputGroup>
              </FormRow>
              
              <InputGroup>
                <Input 
                  type="text" 
                  name="subject" 
                  placeholder=" " 
                  value={formData.subject} 
                  onChange={handleChange} 
                  required 
                />
                <Label>Subject</Label>
              </InputGroup>
              
              <InputGroup>
                <TextArea 
                  name="message" 
                  placeholder=" " 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                />
                <Label>Your Message</Label>
              </InputGroup>
              
              <SubmitButton type="submit">
                <FaPaperPlane style={{ marginRight: '8px' }} />
                Send Message
              </SubmitButton>
              
              {submitted && (
                <SuccessMsg>
                  ✓ Thanks for reaching out! We'll get back to you soon.
                </SuccessMsg>
              )}
            </Form>
          ) : (
            <SocialGrid>
              {socialLinks.map((link, idx) => (
                <SocialCard 
                  key={idx} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  bgcolor={link.color}
                  onMouseEnter={() => setIsHovered(idx)}
                  onMouseLeave={() => setIsHovered(null)}
                  $ishovered={isHovered === idx}
                >
                  <Icon>{link.icon}</Icon>
                  <Platform>{link.platform}</Platform>
                </SocialCard>
              ))}
            </SocialGrid>
          )}
        </MainContent>
      </ContentWrapper>

      <CTASection>
        <CTAWrapper>
          <CTAHeading>Elevate Your Media Presence</CTAHeading>
          <CTAText>
            TFN specializes in comprehensive media solutions including commercials, logos, PSAs, video production, editing, public relations, marketing, branding, TV series production, podcasts, webcasts, and live streaming.
          </CTAText>
          <CTAButton href="mailto:info@totalfaithnetwork.com">
            Start Your Project Today
          </CTAButton>
        </CTAWrapper>
      </CTASection>
    </Container>
  );
};

// Styled Components
const Container = styled(animated.div)`
  background: ${PRIMARY_BG};
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  color: ${TEXT_PRIMARY};
`;

const HeaderSection = styled.section`
  padding: 4rem 2rem 2rem;
  text-align: center;
  background: linear-gradient(135deg, #1a1a2e 0%, #0a0a12 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${ACCENT}, #ff9900);
  }
`;

const HeaderTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${TEXT_ACTIVE};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const HeaderSubtitle = styled.p`
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto;
  opacity: 0.9;
  line-height: 1.6;
`;

const ContentWrapper = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

const MainContent = styled.div`
  flex: 2;
  background: ${CARD_BG};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Sidebar = styled.div`
  flex: 1;
  position: relative;

  @media (max-width: 768px) {
    order: -1;
  }
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const TabButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: ${props => props.active ? 'rgba(255, 204, 0, 0.1)' : 'transparent'};
  color: ${props => props.active ? TEXT_ACTIVE : TEXT_PRIMARY};
  border: none;
  border-bottom: 3px solid ${props => props.active ? ACCENT : 'transparent'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  font-size: 0.95rem;

  &:hover {
    color: ${ACCENT};
    background: rgba(255, 204, 0, 0.05);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const InputGroup = styled.div`
  position: relative;
  flex: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: 1.2rem;
  font-size: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(15, 15, 25, 0.5);
  transition: all 0.3s ease;
  outline: none;
  color: #fff;
  
  &:focus {
    border-color: ${ACCENT};
    box-shadow: 0 0 0 3px rgba(255, 204, 0, 0.1);
  }
  
  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: -8px;
    left: 12px;
    font-size: 0.8rem;
    background: #1a1a2e;
    padding: 0 6px;
    color: ${ACCENT};
  }
`;

const Label = styled.label`
  position: absolute;
  top: 1.2rem;
  left: 1.2rem;
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease;
  pointer-events: none;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1.2rem;
  font-size: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  min-height: 160px;
  background: rgba(15, 15, 25, 0.5);
  resize: vertical;
  transition: all 0.3s ease;
  outline: none;
  font-family: inherit;
  color: #fff;
  
  &:focus {
    border-color: ${ACCENT};
    box-shadow: 0 0 0 3px rgba(255, 204, 0, 0.1);
  }
  
  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: -8px;
    left: 12px;
    font-size: 0.8rem;
    background: #1a1a2e;
    padding: 0 6px;
    color: ${ACCENT};
  }
`;

const SubmitButton = styled.button`
  padding: 1rem 1.8rem;
  background: linear-gradient(135deg, ${ACCENT}, #ff9900);
  color: #1a1a2e;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(255, 204, 0, 0.2);
  margin-top: 1rem;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(255, 204, 0, 0.3);
    animation: ${pulse} 1.5s infinite;
  }
`;

const SuccessMsg = styled.div`
  color: #4caf50;
  text-align: center;
  padding: 1rem;
  background: rgba(76, 175, 80, 0.1);
  border-radius: 8px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 1rem;
`;

const SocialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.2rem;
`;

const SocialCard = styled.a`
  display: flex;
  align-items: center;
  background: ${props => props.bgcolor};
  border-radius: 8px;
  padding: 1.2rem 1.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
  transform: ${props => props.$ishovered ? 'translateY(-5px)' : 'translateY(0)'};
  box-shadow: ${props => props.$ishovered ? '0 8px 20px rgba(0,0,0,0.3)' : '0 4px 10px rgba(0,0,0,0.2)'};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.3);
  }
`;

const Icon = styled.div`
  font-size: 1.8rem;
  color: white;
  margin-right: 1rem;
`;

const Platform = styled.span`
  color: white;
  font-size: 1rem;
  font-weight: 600;
`;

const ContactCard = styled.div`
  background: ${CARD_BG};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: ${fadeIn} 0.5s ease-out;
  position: sticky;
  top: 2rem;

  @media (max-width: 768px) {
    position: relative;
    top: auto;
    margin-bottom: 2rem;
  }
`;

const ContactTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  color: ${TEXT_ACTIVE};
  text-align: center;
`;

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  text-decoration: none;
  color: ${TEXT_PRIMARY};
  transition: all 0.3s ease;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.05);

  &:hover {
    background: rgba(255, 204, 0, 0.1);
    transform: translateX(5px);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const ContactIcon = styled.div`
  font-size: 1.5rem;
  margin-right: 1rem;
  color: ${ACCENT};
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContactMethod = styled.span`
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.3rem;
`;

const ContactInfo = styled.span`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const CTASection = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #1a1a2e 0%, #0a0a12 100%);
  text-align: center;
  position: relative;
`;

const CTAWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const CTAHeading = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: ${TEXT_ACTIVE};
`;

const CTAText = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const CTAButton = styled.a`
  padding: 1rem 2rem;
  background: linear-gradient(135deg, ${ACCENT}, #ff9900);
  color: #1a1a2e;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(255, 204, 0, 0.2);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(255, 204, 0, 0.3);
    animation: ${pulse} 1.5s infinite;
  }
`;

export default Contact;