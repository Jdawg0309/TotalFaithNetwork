import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiInfo, FiBriefcase, FiMail, FiSettings } from 'react-icons/fi';
import styled, { keyframes } from 'styled-components';

// Color variables
const NAV_BG = 'rgba(26, 26, 26, 0.95)';
const TEXT_PRIMARY = '#E0E0FF';
const TEXT_ACTIVE = '#FFCC00';
const ACCENT = '#FFCC00';
const HOVER_BG = 'rgba(255, 204, 0, 0.1)';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const handleToggle = () => setIsOpen(prev => !prev);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close menu when route changes
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <RemoteControl 
        onClick={handleToggle}
        $isScrolled={isScrolled}
        $isOpen={isOpen}
      >
        {isOpen ? (
          <FiX size={24} className="nav-icon" />
        ) : (
          <FiMenu size={24} className="nav-icon" />
        )}
      </RemoteControl>
      
      <RemoteSidebar $isOpen={isOpen}>
        <RemoteHeader>
          <Logo to="/">
            <LogoIcon>📺</LogoIcon>
            <LogoText>Total Faith Network</LogoText>
          </Logo>
        </RemoteHeader>

        <RemoteButtons>
          <RemoteButton 
            to="/" 
            $active={location.pathname === '/'}
            onClick={handleToggle}
          >
            <FiHome className="button-icon" />
            <ButtonText>Home</ButtonText>
          </RemoteButton>
          
          <RemoteButton 
            to="/about" 
            $active={location.pathname === '/about'}
            onClick={handleToggle}
          >
            <FiInfo className="button-icon" />
            <ButtonText>About</ButtonText>
          </RemoteButton>
          
          <RemoteButton 
            to="/portfolio" 
            $active={location.pathname === '/portfolio'}
            onClick={handleToggle}
          >
            <FiBriefcase className="button-icon" />
            <ButtonText>ViewTube</ButtonText>
          </RemoteButton>
          
          <RemoteButton 
            to="/contact" 
            $active={location.pathname === '/contact'}
            onClick={handleToggle}
          >
            <FiMail className="button-icon" />
            <ButtonText>Contact</ButtonText>
          </RemoteButton>
          
          <RemoteButton 
            to="/services" 
            $active={location.pathname === '/services'}
            onClick={handleToggle}
          >
            <FiSettings className="button-icon" />
            <ButtonText>Services</ButtonText>
          </RemoteButton>
        </RemoteButtons>

        <FooterNote>
          <FooterText>© {new Date().getFullYear()} TFNTV</FooterText>
          <FooterText>All Rights Reserved</FooterText>
        </FooterNote>
      </RemoteSidebar>

      {isOpen && <Overlay onClick={handleToggle} />}
    </>
  );
};

export default Navbar;

// === Animations ===
const slideIn = keyframes`
  from { transform: translateX(100%) translateY(-50%); }
  to { transform: translateX(0) translateY(-50%); }
`;

const slideOut = keyframes`
  from { transform: translateX(0) translateY(-50%); }
  to { transform: translateX(100%) translateY(-50%); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

// === Styled Components ===
const RemoteSidebar = styled.div`
  background-color: ${NAV_BG};
  color: ${TEXT_PRIMARY};
  width: 320px;
  height: 80vh;
  max-height: 700px;
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  overflow: hidden;
  z-index: 1000;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.3);
  border-radius: 15px 0 0 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  animation: ${({ $isOpen }) => $isOpen ? slideIn : slideOut} 0.3s ease-in-out forwards;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 280px;
    height: 90vh;
  }
`;

const RemoteHeader = styled.div`
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${TEXT_PRIMARY};
  transition: all 0.3s ease;
  gap: 10px;

  &:hover {
    color: ${ACCENT};
    transform: translateX(5px);
  }
`;

const LogoIcon = styled.span`
  font-size: 1.8rem;
  animation: ${pulse} 2s infinite ease-in-out;
`;

const LogoText = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
`;

const RemoteButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 1.5rem;
  flex: 1;
`;

const RemoteButton = styled(Link)`
  padding: 1rem 1.5rem;
  text-decoration: none;
  color: ${props => (props.$active ? TEXT_ACTIVE : TEXT_PRIMARY)};
  font-weight: ${props => (props.$active ? '600' : '400')};
  transition: all 0.3s ease;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 15px;
  position: relative;
  overflow: hidden;
  background: ${props => (props.$active ? HOVER_BG : 'transparent')};

  &:hover {
    color: ${ACCENT};
    background: ${HOVER_BG};
    transform: translateX(-5px);
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 3px;
    background: ${props => (props.$active ? ACCENT : 'transparent')};
    transition: all 0.3s ease;
  }

  &:hover::before {
    background: ${ACCENT};
  }

  .button-icon {
    font-size: 1.2rem;
    min-width: 24px;
  }
`;

const ButtonText = styled.span`
  transition: all 0.3s ease;
`;

const RemoteControl = styled.button`
  background: ${({ $isScrolled, $isOpen }) => 
    $isOpen ? NAV_BG : $isScrolled ? 'rgba(26, 26, 26, 0.8)' : 'transparent'};
  border: 1px solid ${({ $isScrolled, $isOpen }) => 
    $isOpen || $isScrolled ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${TEXT_PRIMARY};
  cursor: pointer;
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1100;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);

  &:hover {
    background: ${NAV_BG};
    transform: scale(1.1);
    border-color: rgba(255, 204, 0, 0.5);
  }

  .nav-icon {
    transition: all 0.3s ease;
  }

  &:hover .nav-icon {
    color: ${ACCENT};
    transform: scale(1.1);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 900;
`;

const FooterNote = styled.div`
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: center;
`;

const FooterText = styled.p`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
`;