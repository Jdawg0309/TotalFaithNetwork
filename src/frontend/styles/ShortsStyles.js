import styled from 'styled-components';
import { animated } from '@react-spring/web';

// TFN Color Palette
export const COLORS = {
  primary: '#1E3A8A',
  secondary: '#3B82F6',
  accentYellow: '#FBBF24',
  accentGold: '#D4AF37',
  neutralDark: '#111827',
  neutralMid: '#374151',
  neutralLight: '#D1D5DB',
  white: '#FFFFFF',
  black: '#000000',
};


// YouTube Shorts-inspired Styled Components
export const ShortsContainer = styled(animated.div)`
  position: relative;
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  background: ${COLORS.neutralDark};
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar { display: none; } /* Chrome/Safari */

  /* Smooth scrolling for iOS */
  -webkit-overflow-scrolling: touch;
`;

export const ShortsHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0.8rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  backdrop-filter: blur(8px);
`;

export const ShortsLogo = styled.div`
  color: ${COLORS.white};
  font-weight: 700;
  font-size: 1.3rem;
  letter-spacing: -0.5px;
  
  span {
    color: ${COLORS.accentYellow};
  }
`;

export const SearchButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: ${COLORS.white};
  padding: 0.5rem 1rem;
  border-radius: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
`;

export const ShortsCard = styled.div`
  position: relative;
  scroll-snap-align: start;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  background: ${COLORS.black};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ShortsVideo = styled.video`
  width: 100%;
  height: auto;
  max-height: 100vh;
  object-fit: cover;
  background: black;
`;

export const ShortsOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  padding-bottom: 4rem;
  background: black;
  z-index: 10;
`;

// Letterbox bars top and bottom
export const LetterboxTop = styled.div`
  display: none;
  @media (min-width: 992px) {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc((100vh - (100vw * 9 / 16)) / 2);
    background: black;
    z-index: 9;
  }
`;

export const LetterboxBottom = styled(LetterboxTop)`
  @media (min-width: 992px) {
    top: auto;
    bottom: 0;
  }
`;

export const ChannelInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
`;

export const ChannelAvatar = styled.div`
  width: 40px;
  height: 40px;
  border: 2px solid ${COLORS.accentYellow};
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ChannelName = styled.span`
  font-weight: 600;
  font-size: 1rem;
  color: ${COLORS.white};
`;

export const ShortsTitle = styled.h2`
  margin: 0 0 0.8rem 0;
  font-size: 1.15rem;
  color: ${COLORS.white};
  font-weight: 500;
  line-height: 1.4;
`;

export const MusicBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.2rem;
  
  span {
    font-size: 0.9rem;
    color: ${COLORS.white};
    font-weight: 500;
  }
`;

export const ActionsContainer = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  z-index: 20;
`;

export const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: ${COLORS.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

export const ActionIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.3rem;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  
  svg {
    font-size: 1.5rem;
  }
`;

export const ActionLabel = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
`;

export const LikeButton = styled(ActionButton)`
  ${ActionIcon} {
    background: ${props => props.$active ? 'rgba(225, 48, 108, 0.3)' : 'rgba(0, 0, 0, 0.3)'};
  }
`;

export const CommentButton = styled(ActionButton)``;

export const ShareButton = styled(ActionButton)``;

export const MoreButton = styled(ActionButton)`
  ${ActionIcon} {
    background: rgba(0, 0, 0, 0.3);
  }
`;

export const CommentDrawer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70vh;
  background: ${COLORS.neutralMid};
  border-top: 1px solid ${COLORS.neutralLight};
  border-radius: 0;
  z-index: 1000;
  transform: translateY(${props => props.$open ? '0' : '100%'});
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
`;

export const DrawerHeader = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${COLORS.neutralLight};
  
  h3 {
    margin: 0;
    font-size: 1.2rem;
    color: ${COLORS.white};
  }
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${COLORS.neutralLight};
  font-size: 1.5rem;
  cursor: pointer;
`;

export const CommentList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
`;

export const CommentItem = styled.div`
  padding: 0.8rem 0;
  border-bottom: 1px solid ${COLORS.neutralLight};
  display: flex;
  gap: 0.8rem;
`;

export const CommentAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CommentContent = styled.div`
  flex: 1;
`;

export const CommentAuthor = styled.div`
  font-weight: 600;
  font-size: 0.95rem;
  color: ${COLORS.white};
  margin-bottom: 0.3rem;
`;

export const CommentText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${COLORS.neutralLight};
  line-height: 1.4;
`;

export const CommentForm = styled.form`
  padding: 1rem;
  display: flex;
  gap: 0.8rem;
  border-top: 1px solid ${COLORS.neutralLight};
`;

export const CommentInput = styled.input`
  flex: 1;
  padding: 0.8rem;
  background: ${COLORS.neutralDark};
  border: 1px solid ${COLORS.neutralLight};
  color: ${COLORS.white};
  font-size: 0.95rem;
  border-radius: 0;
  
  &:focus {
    outline: none;
    border-color: ${COLORS.accentYellow};
  }
`;

export const SubmitButton = styled.button`
  background: ${COLORS.accentYellow};
  color: ${COLORS.neutralDark};
  border: none;
  padding: 0 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: ${COLORS.accentGold};
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${COLORS.neutralDark};
  z-index: 1000;
`;

export const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid ${COLORS.neutralMid};
  border-top-color: ${COLORS.accentYellow};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1.5rem;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export const LoadingText = styled.p`
  color: ${COLORS.neutralLight};
  font-size: 1.1rem;
`;

export const ErrorContainer = styled(LoadingContainer)``;

export const ErrorText = styled.p`
  color: ${COLORS.accentYellow};
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  text-align: center;
  max-width: 300px;
`;

export const RetryButton = styled.button`
  background: ${COLORS.accentYellow};
  color: ${COLORS.neutralDark};
  border: none;
  padding: 0.7rem 1.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
  border-radius: 0;
  
  &:hover {
    background: ${COLORS.accentGold};
  }
`;
