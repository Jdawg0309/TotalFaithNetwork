import React, { useState, useEffect } from 'react';
import { FiMenu, FiX, FiHome, FiInfo, FiBriefcase, FiMail, FiFileText, FiFilm } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
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
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { to: '/', label: 'Home', icon: <FiHome /> },
    { to: '/about', label: 'About', icon: <FiInfo /> },
    { to: '/portfolio', label: 'ViewTube', icon: <FiBriefcase /> },
    { to: '/contact', label: 'Contact', icon: <FiMail /> },
    { to: '/blog', label: 'Blogs', icon: <FiFileText /> },
    { to: '/shorts', label: 'Shorts', icon: <FiFilm /> }
  ];

  return (
    <>
      <ToggleButton $scrolled={isScrolled} $open={isOpen} onClick={handleToggle} aria-label="Toggle navigation">
        {isOpen ? <FiX size={24} className="icon" /> : <FiMenu size={24} className="icon" />}
      </ToggleButton>

      <Sidebar $open={isOpen}>
        <Logo to="/">
          <LogoText>Total Faith Network</LogoText>
        </Logo>

        <NavList>
          {navItems.map(item => (
            <NavItem
              key={item.to}
              to={item.to}
              $active={location.pathname === item.to}
              onClick={handleToggle}
            >
              <IconWrapper $active={location.pathname === item.to}>{item.icon}</IconWrapper>
              <ItemText>{item.label}</ItemText>
            </NavItem>
          ))}
        </NavList>

        <Footer>
          <FooterText>© {new Date().getFullYear()} TFNTV</FooterText>
        </Footer>
      </Sidebar>

      {isOpen && <Backdrop onClick={handleToggle} />}
    </>
  );
};

export default Navbar;

// Animations
const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;
const slideOut = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(100%); }
`;

// Styled Components
const ToggleButton = styled.button`
  position: fixed;
  top: 16px;
  right: 16px;
  width: 52px;
  height: 52px;
  background: ${({ $scrolled, $open }) => $open ? NAV_BG : ($scrolled ? NAV_BG : 'transparent')};
  border: 2px solid ${({ $scrolled, $open }) => ($open || $scrolled ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)')};
  color: ${TEXT_PRIMARY};
  cursor: pointer;
  z-index: 1001;
  backdrop-filter: blur(5px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: ${NAV_BG};
    transform: scale(1.1);
    border-color: ${ACCENT};
  }

  .icon {
    transition: all 0.3s ease;
  }

  &:hover .icon {
    color: ${ACCENT};
    transform: scale(1.1);
  }
`;

const Sidebar = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background: ${NAV_BG};
  transform: translateX(${props => (props.$open ? '0' : '100%')});
  animation: ${props => (props.$open ? slideIn : slideOut)} 0.3s ease forwards;
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  z-index: 1000;
`;

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  color: ${TEXT_PRIMARY};
  margin-bottom: 2rem;
  font-weight: bold;
`;

const LogoText = styled.span`
  background: linear-gradient(135deg, #ffcc00, #ff9900);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const NavList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: ${props => (props.$active ? TEXT_ACTIVE : TEXT_PRIMARY)};
  background: ${props => (props.$active ? HOVER_BG : 'transparent')};
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    color: ${ACCENT};
    background: ${HOVER_BG};
  }
`;

const IconWrapper = styled.span`
  font-size: 1.25rem;
  color: ${props => (props.$active ? TEXT_ACTIVE : TEXT_PRIMARY)};
`;

const ItemText = styled.span`
  font-size: 1rem;
`;

const Footer = styled.div`
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255,255,255,0.2);
`;

const FooterText = styled.p`
  margin: 0;
  color: rgba(255,255,255,0.6);
  font-size: 0.85rem;
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 999;
`;
