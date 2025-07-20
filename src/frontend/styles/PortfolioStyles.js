// src/styles/PortfolioStyles.js
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { animated } from '@react-spring/web';

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
export const starTwinkle = keyframes`
  0%,100% { opacity:0.3; transform:scale(1); }
  50%     { opacity:1;   transform:scale(1.1); }
`;
export const fadeIn = keyframes`
  from { opacity:0; transform:translateY(1.25rem); }
  to   { opacity:1; transform:translateY(0); }
`;

// Global Styles
export const GlobalStyle = createGlobalStyle`
  *::before,*::after { box-sizing:border-box; margin:0; padding:0; }
  html,body {
    width:100%; height:100%; overflow-x:hidden;
    font-family:'Poppins',sans-serif;
    background-color: ${COLORS.neutralDark};
    color: ${COLORS.neutralLight};
    font-size:1rem; line-height:1.5;
  }
  a { color:inherit; text-decoration:none; }
`;

// Page Container
export const PageContainer = styled.div`
  max-width:75rem;
  margin:0 auto;
  padding:2rem 1rem;
`;

// Hero Section
export const HeroSection = styled.section`
  background: linear-gradient(135deg, ${COLORS.neutralDark} 0%, ${COLORS.primary} 100%);
  padding:5rem 1rem;
  text-align:center;
  position:relative;
  overflow:hidden;
`;
export const HeroTitle = styled.h1`
  font-size:2rem;
  margin:0;
  color:${COLORS.accentGold};
`;

// Comments Section
export const CommentsSection = styled.section`
  margin:2rem 0;
`;
export const SectionTitle = styled.h3`
  font-size:1.25rem;
  color:${COLORS.accentYellow};
  margin-bottom:0.75rem;
`;
export const CommentList = styled.ul`
  list-style:none; padding:0; margin:0 0 1rem;
`;
export const CommentItem = styled.li`
  background: rgba(255,255,255,0.05);
  padding:0.75rem 1rem;
  border-radius:0rem;
  margin-bottom:0.75rem;
`;
export const CommentAuthor = styled.span`
  font-weight:600; margin-right:0.5rem;
`;
export const CommentDate = styled.span`
  font-size:0.875rem; color:${COLORS.neutralLight};
`;
export const CommentText = styled.p`
  margin:0.5rem 0 0; color:${COLORS.neutralLight};
`;
export const CommentForm = styled.form`
  display:flex; flex-direction:column;
`;
export const CommentTextarea = styled.textarea`
  resize:vertical; min-height:3.125rem;
  padding:0.5rem; border-radius:0rem;
  border:1px solid rgba(255,255,255,0.2);
  background:rgba(0,0,0,0.3);
  color:${COLORS.white}; margin-bottom:0.5rem;
`;
export const SubmitCommentButton = styled.button`
  align-self:flex-end;
  padding:0.5rem 1rem;
  background:${COLORS.accentYellow}; color:${COLORS.neutralDark};
  border:none; border-radius:0rem;
  font-weight:600; cursor:pointer;
  &:hover { opacity:0.9; }
`;

// Video Player
export const VideoPlayer = styled.video`
  width:100%; border-radius:0rem;
  background:${COLORS.black}; aspect-ratio:16/9;
  margin-bottom:1.5rem;
`;
export const VideoTitle = styled.h1`
  font-size:1.5rem; margin-bottom:1rem;
`;
export const VideoInfo = styled.div`
  display:flex; gap:1rem; margin-bottom:2rem;
`;
export const ChannelAvatar = styled.img`
  width:3.5rem; height:3.5rem; border-radius:0rem;
  object-fit:cover;
`;
export const VideoText = styled.div`flex:1;`;
export const VideoTitleBig = styled.h2`
  font-size:1.25rem; margin-bottom:0.5rem;
`;
export const StatsRow = styled.div`
  display:flex; align-items:center; gap:0.5rem;
  color:${COLORS.neutralLight}; margin-bottom:1rem;
  font-size:0.875rem;
`;
export const Views = styled.span``;
export const Dot = styled.span``;
export const Timestamp = styled.span``;
export const Description = styled.p`
  color:${COLORS.neutralLight}; line-height:1.6;
`;

// Thumbnail & Grid
export const Thumbnail = styled.img`
  width:100%; height:100%; object-fit:cover;
  transition: transform 0.3s ease;
`;
export const StarryBackground = styled.div`
  position:fixed; inset:0; z-index:-1;
`;
export const Star = styled.div`
  position:absolute; background:${COLORS.white}; border-radius:0rem;
  animation: ${starTwinkle} infinite ease-in-out;
`;
export const GridSection = styled(animated.section)`
  margin-bottom:2rem;
`;
export const GridTitle = styled.h3`
  font-size:1.25rem; margin-bottom:1.5rem;
`;
export const Grid = styled.div`
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(17.5rem,1fr));
  gap:1.5rem;
`;
export const Card = styled.div`
  cursor:pointer; transition:transform 0.2s ease;
  &:hover { transform:translateY(-0.3125rem);
    ${Thumbnail} { transform:scale(1.03); }
  }
`;
export const ThumbnailWrapper = styled.div`
  position:relative; border-radius:0rem;
  overflow:hidden; margin-bottom:0.75rem;
  aspect-ratio:16/9; background:${COLORS.neutralMid};
`;
export const ThumbnailPlaceholder = styled.div`
  width:100%; height:100%; display:flex;
  align-items:center; justify-content:center;
  background:${COLORS.neutralMid};
`;
export const PlayIcon = styled.div`
  position:absolute; top:50%; left:50%;
  transform:translate(-50%,-50%);
  width:3.125rem; height:3.125rem;
  background:rgba(0,0,0,0.7);
  border-radius:0rem; display:flex;
  align-items:center; justify-content:center;
  font-size:1.2rem; opacity:0; transition:opacity 0.2s ease;
  ${Card}:hover & { opacity:1; }
`;
export const DurationBadge = styled.span`
  position:absolute; bottom:0.5rem; right:0.5rem;
  background:rgba(0,0,0,0.8);
  padding:0.25rem 0.5rem; border-radius:0rem;
  font-size:0.875rem;
`;
export const InfoRow = styled.div`
  display:flex; gap:0.75rem;
`;
export const SmallAvatar = styled.img`
  width:2.25rem; height:2.25rem; border-radius:0rem;
  object-fit:cover;
`;
export const InfoText = styled.div`flex:1;`;
export const CardTitle = styled.h4`
  font-size:0.95rem; margin-bottom:0.25rem;
  font-weight:500; display:-webkit-box;
  -webkit-line-clamp:2; -webkit-box-orient:vertical;
  overflow:hidden;
`;
export const ChannelNameSmall = styled.p`
  color:${COLORS.neutralLight}; font-size:0.875rem;
  margin-bottom:0.25rem;
`;
export const StatsSmall = styled.p`
  color:${COLORS.neutralLight}; font-size:0.875rem;
`;

// Loading & Error
export const spin = keyframes`
  0% { transform:rotate(0deg); }
  100% { transform:rotate(360deg); }
`;
export const LoadingSpinner = styled.div`
  width:${p=>p.large?'3.125rem':'1.5rem'};
  height:${p=>p.large?'3.125rem':'1.5rem'};
  border:0.1875rem solid rgba(255,255,255,0.1);
  border-top-color:${COLORS.white}; border-radius:0rem;
  animation:${spin} 1s infinite;
`;
export const ErrorMessage = styled.div`
  color:#ff6b6b;
  background:rgba(255,107,107,0.1);
  padding:1.5rem;
  border-radius:0rem;
  text-align:center;
  margin:2rem auto;
  max-width:37.5rem;
  font-size:1.1rem;
`;
export const RetryButton = styled.button`
  display:block; margin:1rem auto 0;
  padding:0.5rem 1.5rem;
  background:#ff6b6b; color:${COLORS.white};
  border:none; border-radius:0rem; cursor:pointer;
  &:hover{ opacity:0.9; }
`;
