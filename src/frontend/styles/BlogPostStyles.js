import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

// TFN Color Palette
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

// Enhanced Design Tokens
const SPACING = {
  xxs: '4px',
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
};
// ... existing imports ...

// Enhanced Design Tokens
const FONT_SIZES = {
  sm: '0.875rem',
  base: '1rem',
  md: '1.125rem',
  lg: '1.5rem',
  xl: '2rem',
  xxl: '2.5rem',
  hero: '3rem'
};

// New responsive breakpoints
const BREAKPOINTS = {
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px'
};

// ... existing animations ...

// Enhanced Base Components
export const BlogPageContainer = styled.div`
  background: ${COLORS.neutralDark};
  color: ${COLORS.neutralLight};
  min-height: 100vh;
  padding: ${SPACING.xl} 0;
  position: relative;
  overflow-x: hidden;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      linear-gradient(rgba(30, 58, 138, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(30, 58, 138, 0.1) 1px, transparent 1px);
    background-size: 24px 24px;
    pointer-events: none;
    z-index: 0;
  }
`;

export const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Enhanced Loading State
export const LoadingIndicator = styled.div`
  text-align: center;
  padding: ${SPACING.xxl} 0;
  position: relative;
  z-index: 2;

  .spinner {
    width: 48px;
    height: 48px;
    border: 4px solid rgba(251, 191, 36, 0.2);
    border-top-color: ${COLORS.accentYellow};
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
    margin: 0 auto ${SPACING.md};
  }

  p {
    color: ${COLORS.neutralLight};
    font-size: ${FONT_SIZES.md};
    letter-spacing: 0.5px;
  }
`;

// Enhanced Blog Header
export const BlogHeader = styled.header`
  text-align: center;
  margin-bottom: ${SPACING.xxl};
  position: relative;
  z-index: 2;
  padding: 0 ${SPACING.md};
`;

export const BlogTitle = styled.h1`
  font-size: ${FONT_SIZES.hero};
  font-weight: 800;
  color: ${COLORS.accentGold};
  margin: 0;
  line-height: 1.15;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  display: inline-block;
  padding-bottom: ${SPACING.sm};
  background: linear-gradient(to right, ${COLORS.accentYellow}, ${COLORS.accentGold});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: ${BREAKPOINTS.md}) {
    font-size: ${FONT_SIZES.xxl};
  }
`;

export const BlogSubtitle = styled.p`
  font-size: ${FONT_SIZES.lg};
  color: ${COLORS.neutralLight};
  margin-top: ${SPACING.md};
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.85;
  font-weight: 300;
  letter-spacing: 0.5px;
  
  @media (max-width: ${BREAKPOINTS.md}) {
    font-size: ${FONT_SIZES.md};
  }
`;

// Enhanced Search Components
export const SearchContainer = styled.div`
  position: relative;
  max-width: 600px;
  margin: ${SPACING.xl} auto ${SPACING.xxl};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: ${SPACING.md} ${SPACING.lg} ${SPACING.md} 56px;
  font-size: ${FONT_SIZES.md};
  border: none;
  background: rgba(59, 130, 246, 0.1);
  color: ${COLORS.neutralLight};
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(59, 130, 246, 0.3);

  &:focus {
    outline: none;
    background: rgba(59, 130, 246, 0.15);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }

  &::placeholder {
    color: ${COLORS.neutralMid};
    font-style: italic;
  }
`;

export const PostTitle = styled.h2`
  font-size: ${FONT_SIZES.lg};
  margin: 0 0 ${SPACING.sm} 0;
  line-height: 1.3;
  color: ${COLORS.neutralLight};
  font-weight: 700;
  min-height: 3.5em;

  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s ease;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

// Enhanced Posts Grid
export const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${SPACING.lg};
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${SPACING.md};
  position: relative;
  z-index: 2;

  @media (max-width: ${BREAKPOINTS.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const PostImage = styled.div`
  width: 100%;
  height: 220px;
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid ${COLORS.neutralMid};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40%;
    background: linear-gradient(to top, rgba(17, 24, 39, 0.9), transparent);
  }
`;


export const PostCard = styled.article`
  background: linear-gradient(145deg, ${COLORS.neutralMid}, #2d3748);
  border: 1px solid rgba(59, 130, 246, 0.1);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  position: relative;
  animation: ${fadeIn} 0.4s ease both;
  transform: translateY(0);
  will-change: transform;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
    border-color: ${COLORS.accentYellow};

    ${PostTitle} a {
      color: ${COLORS.accentYellow};
    }
    
    ${PostImage} {
      transform: scale(1.05);
    }
  }
`;

export const PostImagePlaceholder = styled.div`
  width: 100%;
  height: 220px;
  background: linear-gradient(45deg, ${COLORS.neutralMid}, #2d3748);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.neutralLight};
  opacity: 0.6;
  font-size: 3rem;
`;

export const PostContentWrapper = styled.div`
  padding: ${SPACING.md} ${SPACING.md} ${SPACING.lg};
  flex: 1;
  display: flex;
  flex-direction: column;
`;



export const PostExcerpt = styled.p`
  color: ${COLORS.neutralLight};
  opacity: 0.85;
  line-height: 1.6;
  margin: ${SPACING.sm} 0 ${SPACING.md} 0;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: ${FONT_SIZES.base};
`;

export const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${FONT_SIZES.sm};
  color: ${COLORS.neutralLight};
  opacity: 0.7;
  margin-top: ${SPACING.sm};
  padding-top: ${SPACING.sm};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

export const ReadMoreButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${SPACING.xs};
  background: linear-gradient(to right, ${COLORS.accentYellow}, ${COLORS.accentGold});
  color: ${COLORS.neutralDark};
  padding: ${SPACING.sm} ${SPACING.lg};
  border: none;
  border-radius: 6px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;
  margin-top: auto;
  align-self: flex-start;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: ${FONT_SIZES.sm};
  box-shadow: 0 4px 6px rgba(251, 191, 36, 0.2);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(251, 191, 36, 0.3);
  }
`;

// Enhanced Blog Detail Components
export const DetailBackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${SPACING.xs};
  margin: 0 0 ${SPACING.xl} ${SPACING.xl};
  color: ${COLORS.accentYellow};
  font-size: ${FONT_SIZES.md};
  text-decoration: none;
  transition: all 0.2s ease;
  padding: ${SPACING.sm} ${SPACING.md};
  background: rgba(59, 130, 246, 0.1);
  border-radius: 6px;
  max-width: fit-content;
  position: relative;
  z-index: 3;

  &:hover {
    color: ${COLORS.accentGold};
    background: rgba(59, 130, 246, 0.2);
  }

  @media (max-width: ${BREAKPOINTS.md}) {
    margin-left: ${SPACING.md};
  }
`;

export const DetailHeader = styled.header`
  max-width: 900px;
  margin: 0 auto ${SPACING.xxl};
  padding: 0 ${SPACING.md};
  text-align: center;
  animation: ${fadeIn} 0.4s ease both;
  position: relative;
  z-index: 2;
`;

export const DetailTitle = styled.h1`
  font-size: ${FONT_SIZES.hero};
  margin: ${SPACING.md} 0;
  color: ${COLORS.accentGold};
  line-height: 1.2;
  font-weight: 800;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: ${BREAKPOINTS.md}) {
    font-size: ${FONT_SIZES.xxl};
  }
`;

export const DetailMeta = styled.div`
  display: flex;
  justify-content: center;
  gap: ${SPACING.lg};
  font-size: ${FONT_SIZES.md};
  color: ${COLORS.neutralLight};
  opacity: 0.9;
  margin-bottom: ${SPACING.lg};
  flex-wrap: wrap;
  
  @media (max-width: ${BREAKPOINTS.sm}) {
    gap: ${SPACING.md};
    font-size: ${FONT_SIZES.base};
  }
`;

export const DetailImage = styled.div`
  max-width: 1000px;
  height: 500px;
  margin: 0 auto ${SPACING.xxl};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
  position: relative;
  z-index: 2;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: ${BREAKPOINTS.lg}) {
    height: 400px;
  }
  
  @media (max-width: ${BREAKPOINTS.md}) {
    height: 300px;
  }
  
  @media (max-width: ${BREAKPOINTS.sm}) {
    height: 250px;
    margin-bottom: ${SPACING.xl};
  }
`;

export const DetailContent = styled.div`
  max-width: 800px;
  margin: 0 auto ${SPACING.xxl};
  padding: 0 ${SPACING.md};
  color: ${COLORS.neutralLight};
  line-height: 1.8;
  font-size: ${FONT_SIZES.md};
  position: relative;
  z-index: 2;

  h2, h3, h4 {
    color: ${COLORS.neutralLight};
    margin: ${SPACING.xl} 0 ${SPACING.md} 0;
    position: relative;
    padding-bottom: ${SPACING.xs};
    font-weight: 700;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 80px;
      height: 3px;
      background: ${COLORS.accentYellow};
      border-radius: 2px;
    }
  }

  h2 {
    font-size: ${FONT_SIZES.xl};
  }
  
  h3 {
    font-size: ${FONT_SIZES.lg};
  }

  p {
    margin: ${SPACING.lg} 0;
    font-size: ${FONT_SIZES.md};
    opacity: 0.9;
  }

  a {
    color: ${COLORS.secondary};
    text-decoration: none;
    border-bottom: 1px solid ${COLORS.secondary};
    transition: all 0.2s ease;
    font-weight: 600;

    &:hover {
      color: ${COLORS.accentYellow};
      border-bottom-color: ${COLORS.accentYellow};
    }
  }

  img {
    max-width: 100%;
    height: auto;
    margin: ${SPACING.xl} 0;
    border-radius: 8px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }

  blockquote {
    border-left: 4px solid ${COLORS.accentYellow};
    padding: ${SPACING.lg};
    margin: ${SPACING.xl} 0;
    background: rgba(59, 130, 246, 0.05);
    border-radius: 0 8px 8px 0;
    font-style: italic;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '"';
      position: absolute;
      top: -20px;
      left: 10px;
      font-size: 5rem;
      color: rgba(59, 130, 246, 0.1);
      font-family: serif;
      line-height: 1;
    }
  }
  
  ul, ol {
    margin: ${SPACING.lg} 0;
    padding-left: ${SPACING.lg};
    
    li {
      margin-bottom: ${SPACING.sm};
      padding-left: ${SPACING.sm};
    }
  }
  
  code {
    background: rgba(0, 0, 0, 0.3);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Fira Code', monospace;
    font-size: 0.9em;
  }
  
  pre {
    background: rgba(0, 0, 0, 0.3);
    padding: ${SPACING.md};
    border-radius: 8px;
    overflow-x: auto;
    margin: ${SPACING.lg} 0;
    font-family: 'Fira Code', monospace;
    font-size: ${FONT_SIZES.sm};
    line-height: 1.5;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

// Enhanced Comment Components
export const CommentsSection = styled.section`
  max-width: 800px;
  margin: ${SPACING.xxl} auto;
  padding: 0 ${SPACING.md};
  animation: ${fadeIn} 0.4s ease both;
  position: relative;
  z-index: 2;
`;

export const CommentList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: ${SPACING.md};
`;

export const CommentItem = styled.li`
  background: linear-gradient(145deg, ${COLORS.neutralMid}, #2d3748);
  padding: ${SPACING.lg};
  border-radius: 8px;
  border-left: 4px solid ${COLORS.accentYellow};
  transition: all 0.2s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  }
`;

export const CommentAuthor = styled.span`
  font-weight: 700;
  color: ${COLORS.accentGold};
  font-size: ${FONT_SIZES.md};
`;

export const CommentDate = styled.span`
  font-size: ${FONT_SIZES.sm};
  color: ${COLORS.neutralLight};
  opacity: 0.7;
  margin-left: ${SPACING.sm};
`;

export const CommentText = styled.p`
  margin: ${SPACING.md} 0 0;
  color: ${COLORS.neutralLight};
  line-height: 1.7;
  font-size: ${FONT_SIZES.base};
`;

export const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.md};
  margin-top: ${SPACING.xl};
  background: rgba(59, 130, 246, 0.05);
  padding: ${SPACING.lg};
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.1);
`;

export const CommentTextarea = styled.textarea`
  resize: vertical;
  min-height: 150px;
  padding: ${SPACING.md};
  border: 1px solid rgba(59, 130, 246, 0.2);
  background: rgba(17, 24, 39, 0.5);
  color: ${COLORS.neutralLight};
  font-size: ${FONT_SIZES.base};
  transition: all 0.2s ease;
  border-radius: 8px;
  font-family: inherit;
  line-height: 1.6;

  &:focus {
    outline: none;
    border-color: ${COLORS.accentYellow};
    box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.1);
  }
`;

export const SubmitCommentButton = styled.button`
  align-self: flex-start;
  background: linear-gradient(to right, ${COLORS.accentYellow}, ${COLORS.accentGold});
  color: ${COLORS.neutralDark};
  border: none;
  padding: ${SPACING.md} ${SPACING.xl};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(251, 191, 36, 0.2);
  font-size: ${FONT_SIZES.base};

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(251, 191, 36, 0.3);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

// ... existing pagination and other components ...

// Enhanced Empty State
export const EmptyState = styled.div`
  text-align: center;
  padding: ${SPACING.xxl} 0;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  .empty-icon {
    font-size: 4rem;
    color: ${COLORS.accentYellow};
    margin-bottom: ${SPACING.md};
    opacity: 0.8;
    animation: ${fadeIn} 1s ease;
  }

  h3 {
    color: ${COLORS.neutralLight};
    margin-bottom: ${SPACING.md};
    font-size: ${FONT_SIZES.xl};
    font-weight: 600;
  }

  p {
    color: ${COLORS.neutralLight};
    opacity: 0.8;
    font-size: ${FONT_SIZES.md};
    line-height: 1.7;
    margin-bottom: ${SPACING.xl};
  }
`;

// Enhanced Author/Date components
export const PostAuthor = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${COLORS.neutralLight};
  
  svg {
    color: ${COLORS.accentYellow};
  }
`;

export const PostDate = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${COLORS.neutralLight};
  
  svg {
    color: ${COLORS.accentYellow};
  }
`;

export const SectionTitle = styled.h2`
  font-size: ${FONT_SIZES.xl};
  color: ${COLORS.accentYellow};
  margin: ${SPACING.xxl} 0 ${SPACING.lg};
  position: relative;
  padding-bottom: ${SPACING.sm};
  font-weight: 700;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: ${COLORS.accentYellow};
    border-radius: 2px;
  }
`;

// Like Button
export const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${FONT_SIZES.md};
  margin-left: ${SPACING.md};
  padding: ${SPACING.xs} ${SPACING.sm};
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${COLORS.neutralLight};
  background: rgba(251, 191, 36, 0.1);
  transition: all 0.2s ease;
  font-weight: 600;

  &:hover {
    background: rgba(251, 191, 36, 0.2);
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${COLORS.neutralLight};
`;

export const ErrorMessage = styled.div`
  max-width: 800px;
  margin: ${SPACING.lg} auto;
  background: rgba(191, 97, 106, 0.1);
  border: 1px solid #BF616A;
  border-radius: 0;
  padding: ${SPACING.lg};
  text-align: center;
  border-left: 4px solid #BF616A;

  p {
    color: #BF616A;
    margin-bottom: ${SPACING.md};
    font-weight: 600;
  }
`;

export const RetryButton = styled.button`
  background: ${COLORS.accentYellow};
  color: ${COLORS.neutralDark};
  border: none;
  padding: 8px 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${COLORS.accentGold};
  }
`;

// Pagination Components
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${SPACING.md};
  margin: ${SPACING.xxl} 0 ${SPACING.xl};
`;

export const PaginationButton = styled.button`
  background: ${COLORS.neutralMid};
  color: ${COLORS.neutralLight};
  border: 1px solid ${COLORS.neutralMid};
  padding: ${SPACING.sm} ${SPACING.lg};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${SPACING.xs};

  &:hover:not(:disabled) {
    background: ${COLORS.accentYellow};
    color: ${COLORS.neutralDark};
    border-color: ${COLORS.accentYellow};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PageInfo = styled.span`
  display: flex;
  align-items: center;
  padding: ${SPACING.sm} ${SPACING.lg};
  color: ${COLORS.neutralLight};
  font-weight: 600;
`;

