import styled, { keyframes } from 'styled-components';
import { animated } from '@react-spring/web';

// ─── COLOR PALETTE ──────────────────────────────────────────────────────────────

export const COLORS = {
  primary:     '#FF0000',
  secondary:   '#282828',
  accent:      '#FFFFFF',
  neutralDark: '#000000',
  neutralMid:  '#333333',
  neutralLight:'#CCCCCC',
};

// ─── ANIMATIONS ────────────────────────────────────────────────────────────────

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const actionHover = keyframes`
  to { transform: scale(1.2); }
`;

// ─── PROGRESS BAR ──────────────────────────────────────────────────────────────

export const ProgressBar = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: ${p => p.$progress};
  height: 3px;
  background: ${COLORS.primary};
  z-index: 1000;
  transition: width 0.1s linear;
`;

// ─── HEADER ────────────────────────────────────────────────────────────────────

export const ShortsHeader = styled(animated.div)`
  position: fixed;
  top: 0; left: 0; right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1rem;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(8px);
  z-index: 1001;
  animation: ${fadeIn} 0.4s ease both;
`;

export const ShortsLogo = styled.h1`
  color: ${COLORS.accent};
  font-size: 1.3rem;
  font-weight: bold;
  margin: 0;
  span { color: ${COLORS.primary}; }
`;

export const SearchButton = styled.button`
  background: rgba(255,255,255,0.1);
  border: none;
  color: ${COLORS.accent};
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover { background: rgba(255,255,255,0.2); }
`;

// ─── LAYOUT ────────────────────────────────────────────────────────────────────

export const ShortsContainer = styled(animated.div)`
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  background: ${COLORS.neutralDark};
  &::-webkit-scrollbar { display: none; }
`;

// ─── CARD ──────────────────────────────────────────────────────────────────────

export const ShortsCard = styled.div`
  position: relative;
  scroll-snap-align: start;
  width: 100%;
  height: 100vh;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.5s ease both;
`;

// ─── VIDEO ─────────────────────────────────────────────────────────────────────

export const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: black; /* letterbox color */
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ShortsVideo = styled.video`
  object-fit: contain;
  /* make it a bit smaller */
  max-width: 90%;
  max-height: 85%;
  background: black; /* fill bars */
`;

// ─── OVERLAY ───────────────────────────────────────────────────────────────────

export const ShortsOverlay = styled.div`
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 1rem;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  color: ${COLORS.accent};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

// ─── CHANNEL INFO ──────────────────────────────────────────────────────────────

export const ChannelInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.6rem;
`;

export const ChannelAvatar = styled.img`
  width: 40px; height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 0.8rem;
  border: 2px solid ${COLORS.accent};
`;

export const ChannelName = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
`;

// ─── TITLE / MUSIC ────────────────────────────────────────────────────────────

export const ShortsTitle = styled.h2`
  margin: 0.4rem 0;
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.3;
`;

export const MusicBadge = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  color: ${COLORS.neutralLight};
  & > svg { margin-right: 0.4rem; }
`;

// ─── ACTIONS ──────────────────────────────────────────────────────────────────

export const ActionsContainer = styled.div`
  position: absolute;
  right: 1rem; bottom: 6rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: ${COLORS.accent};
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover { animation: ${actionHover} 0.2s forwards; }
`;

export const ActionIcon = styled.div`
  & svg { font-size: 1.6rem; }
`;

export const ActionLabel = styled.span`
  font-size: 0.75rem;
  margin-top: 0.2rem;
`;

// ─── COMMENT DRAWER ───────────────────────────────────────────────────────────

export const CommentDrawer = styled(animated.div)`
  position: fixed; bottom: 0; left: 0; right: 0;
  height: 60vh;
  background: ${COLORS.neutralMid};
  transform: translateY(${p => (p.$open ? '0' : '100%')});
  transition: transform 0.3s ease;
  display: flex; flex-direction: column;
`;

export const DrawerHeader = styled.div`
  padding: 1rem;
  display: flex; align-items: center; justify-content: space-between;
  border-bottom: 1px solid ${COLORS.neutralLight};
  & h3 { margin: 0; color: ${COLORS.accent}; }
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${COLORS.accent};
  font-size: 1.4rem;
  cursor: pointer;
`;

export const CommentList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
`;

export const CommentItem = styled.div`
  display: flex;
  gap: 0.6rem;
  padding: 0.6rem 0;
  border-bottom: 1px solid ${COLORS.neutralLight};
`;

export const CommentAvatar = styled.img`
  width: 32px; height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

export const CommentContent = styled.div`
  flex: 1;
`;

export const CommentAuthor = styled.div`
  font-weight: 600;
  font-size: 0.85rem;
  color: ${COLORS.accent};
`;

export const CommentText = styled.p`
  margin: 0.2rem 0;
  font-size: 0.8rem;
  color: ${COLORS.accent};
`;

export const CommentForm = styled.form`
  display: flex;
  padding: 0.8rem;
  border-top: 1px solid ${COLORS.neutralLight};
  & input {
    flex: 1;
    padding: 0.5rem;
    border: none;
    border-radius: 2px;
    margin-right: 0.5rem;
  }
  & button {
    background: ${COLORS.primary};
    border: none;
    padding: 0 1rem;
    color: white;
    border-radius: 2px;
    cursor: pointer;
  }
`;

// ─── LOADING & ERROR ───────────────────────────────────────────────────────────

export const LoadingContainer = styled(animated.div)`
  position: fixed; inset: 0;
  background: ${COLORS.neutralDark};
  display: flex; flex-direction: column;
  justify-content: center; align-items: center;
  color: ${COLORS.accent};
`;

export const Spinner = styled.div`
  width: 48px; height: 48px;
  border: 5px solid ${COLORS.neutralMid};
  border-top-color: ${COLORS.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
  @keyframes spin { to { transform: rotate(360deg); } }
`;

export const LoadingText = styled.p`
  margin: 0;
`;

export const ErrorContainer = styled(LoadingContainer)``;

export const ErrorText = styled.p`
  color: ${COLORS.primary};
  margin-bottom: 1rem;
`;

export const RetryButton = styled.button`
  background: ${COLORS.primary};
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 2px;
  cursor: pointer;
`;

// ─── SWIPE HINT (mobile) ───────────────────────────────────────────────────────

export const SwipeHint = styled.div`
  position: absolute;
  bottom: 1.5rem; left: 50%;
  transform: translateX(-50%);
  color: ${COLORS.neutralLight};
  font-size: 0.85rem;
  display: flex; align-items: center; gap: 0.4rem;
  & svg { animation: ${fadeIn} 1s ease infinite alternate; }
`;
