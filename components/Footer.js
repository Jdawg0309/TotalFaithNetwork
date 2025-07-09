// components/Footer.js
import React from 'react';
import { FaYoutube, FaInstagram, FaVimeoV, FaTwitter, FaTumblr, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const socialLinks = [
    {
      platform: 'YouTube',
      url: 'https://www.youtube.com/@TFNBroadcast',
      icon: <FaYoutube />,
    },
    {
      platform: 'Instagram',
      url: 'https://www.instagram.com/totalfaithnetwork/',
      icon: <FaInstagram />,
    },
    {
      platform: 'Vimeo',
      url: 'https://vimeo.com/totalfaithnetwork',
      icon: <FaVimeoV />,
    },
    {
      platform: 'X (Twitter)',
      url: 'https://x.com/TFNBroadcast',
      icon: <FaTwitter />,
    },
    {
      platform: 'Tumblr',
      url: 'https://www.tumblr.com/tfnbroadcast',
      icon: <FaTumblr />,
    },
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/drcynthiaoriyomiashley/',
      icon: <FaLinkedin />,
    }
  ];

  return (
    <footer style={footerStyles}>
      <div style={contentContainer}>
        <div style={logoSection}>
          <h3 style={logoText}>Total Faith Network</h3>
          <p style={tagline}>Connecting Faith, Empowering Lives</p>
        </div>

        <div style={linksContainer}>
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
              aria-label={`Visit our ${link.platform} page`}
            >
              <span style={iconStyle}>{link.icon}</span>
              <span style={platformStyle}>{link.platform}</span>
            </a>
          ))}
        </div>
      </div>

      <div style={copyrightSection}>
        <p style={copyrightText}>
          © {new Date().getFullYear()} Total Faith Network. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

// Styles
const footerStyles = {
  backgroundColor: '#1a1a1a',
  color: '#ffffff',
  padding: '2rem 1rem',
};

const contentContainer = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: '1fr 2fr',
  gap: '2rem',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  }
};

const logoSection = {
  paddingRight: '2rem',
};

const logoText = {
  fontSize: '1.5rem',
  marginBottom: '0.5rem',
  color: '#ffffff',
};

const tagline = {
  fontSize: '0.9rem',
  color: '#cccccc',
};

const linksContainer = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gap: '1rem',
};

const linkStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  color: '#ffffff',
  textDecoration: 'none',
  padding: '0.5rem',
  borderRadius: '4px',
  transition: 'all 0.3s ease',
  ':hover': {
    backgroundColor: 'rgba(255,255,255,0.1)',
    transform: 'translateX(5px)',
  }
};

const iconStyle = {
  fontSize: '1.2rem',
};

const platformStyle = {
  fontSize: '0.9rem',
};

const copyrightSection = {
  borderTop: '1px solid rgba(255,255,255,0.1)',
  marginTop: '2rem',
  paddingTop: '1.5rem',
  textAlign: 'center',
};

const copyrightText = {
  fontSize: '0.8rem',
  color: '#cccccc',
  margin: 0,
};

export default Footer;