// src/components/admin/BlogStyles.js
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import {
  FaSearch,
  FaSpinner,
  FaTimes
} from 'react-icons/fa';

// ——— Theme colors —————————————————————————————————————————————
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

const ERROR_LIGHT = 'rgba(255,85,85,0.2)';
const ERROR = '#ff5555';

// ——— Global Quill overrides —————————————————————————————————————
export const EditorStyles = createGlobalStyle`
  .ql-container.ql-snow {
    z-index: 1000 !important;
    background: ${COLORS.white} !important;
    color: ${COLORS.black} !important;
    border: 1px solid ${COLORS.neutralLight} !important;
  }
  .ql-toolbar.ql-snow {
    z-index: 1000 !important;
    background: ${COLORS.neutralLight} !important;
    border: 1px solid ${COLORS.neutralLight} !important;
  }
`;

// ——— Layout wrappers ——————————————————————————————————————————
export const BlogContainer = styled.div`
  padding: 2rem;
  background: ${COLORS.neutralDark};
  border-radius: 0;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  max-width: 1200px;
  margin: 2rem auto;
  border: 1px solid ${COLORS.neutralMid};
`;

export const BlogHeader = styled.header`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${COLORS.neutralMid};
`;

export const BlogTitle = styled.h2`
  font-size: 2.5rem;
  color: ${COLORS.accentYellow};
  margin: 0;
  padding: 0.5rem 0;
`;

// ——— Controls ———————————————————————————————————————————————
export const BlogControls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: center;
`;

export const SearchContainer = styled.div`
  position: relative;
`;

export const SearchInput = styled.input`
  padding: 0.9rem 1.3rem 0.9rem 2.8rem;
  width: 260px;
  border-radius: 0;
  border: 1px solid ${COLORS.neutralMid};
  background: ${COLORS.neutralDark};
  color: ${COLORS.white};
  font-size: 1rem;
  transition: all 0.3s;
  margin: 0.5rem 0;

  &:focus {
    width: 320px;
    background: ${COLORS.neutralMid};
    border-color: ${COLORS.secondary};
    outline: none;
  }
`;

export const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${COLORS.neutralLight};
`;

export const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  padding: ${({ size }) => (size === 'large' ? '1rem 1.8rem' : '0.7rem 1.3rem')};
  font-size: ${({ size }) => (size === 'large' ? '1.1rem' : '0.95rem')};
  font-weight: 600;
  border: none;
  border-radius: 0;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  transition: all 0.2s;
  margin: 0.5rem 0;

  ${({ variant }) =>
    variant === 'delete'
      ? `
    background: ${ERROR_LIGHT};
    color: ${ERROR};

    &:hover { background: rgba(255,85,85,0.3); }
  `
      : variant === 'edit'
      ? `
    background: rgba(251, 191, 36, 0.2);
    color: ${COLORS.accentYellow};

    &:hover { background: rgba(251, 191, 36, 0.3); }
  `
      : `
    background: ${COLORS.primary};
    color: ${COLORS.white};

    &:hover { 
      background: ${COLORS.secondary};
      transform: translateY(-2px);
    }
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

// ——— Post grid & cards ——————————————————————————————————————
export const PostList = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  margin-top: 1.5rem;
`;

export const PostCard = styled.article`
  background: ${COLORS.neutralMid};
  padding: 1.8rem;
  border-radius: 0;
  border: 1px solid ${COLORS.neutralLight};
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
  margin: 0.5rem 0;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
    border-color: ${COLORS.accentYellow};
  }
`;

export const PostTitle = styled.h3`
  color: ${COLORS.white};
  margin: 0 0 1rem 0;
  font-size: 1.4rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
`;

export const PostMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  margin-bottom: 1.2rem;
  font-size: 0.9rem;
  color: ${COLORS.neutralLight};
  padding-bottom: 1rem;
  border-bottom: 1px solid ${COLORS.neutralDark};
`;

export const PostContent = styled.div`
  color: ${COLORS.neutralLight};
  flex-grow: 1;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.6;
`;

export const PostActions = styled.footer`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

// ——— Empty & loading states ——————————————————————————————————
export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: ${COLORS.neutralLight};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin: 2rem 0;
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

export const LoadingSpinner = styled(FaSpinner)`
  animation: ${spin} 1s linear infinite;
  font-size: 2.5rem;
  color: ${COLORS.secondary};
  margin: 1rem 0;
`;

export const RefreshButton = styled.button`
  border: none;
  background: transparent;
  color: ${COLORS.primary};
  cursor: pointer;
  font-size: 1.2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1.5rem;
  transition: all 0.3s;
  margin-top: 1rem;

  &:hover { 
    color: ${COLORS.secondary};
    transform: scale(1.05);
  }
`;

// ——— Modal ————————————————————————————————————————————————
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

export const ModalContent = styled.div`
  background: ${COLORS.neutralDark};
  padding: 2.5rem;
  border-radius: 0;
  width: 80%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  border: 1px solid ${COLORS.neutralMid};
  box-shadow: 0 15px 40px rgba(0,0,0,0.5);
  margin: 1rem;

  @media (max-width: 768px) {
    width: 95%;
    padding: 1.8rem;
  }
`;

export const CloseButton = styled(FaTimes)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  color: ${COLORS.neutralLight};
  cursor: pointer;
  font-size: 1.5rem;
  transition: color 0.2s;
  padding: 0.5rem;

  &:hover { 
    color: ${COLORS.accentYellow};
  }
`;

export const ModalTitle = styled.h3`
  margin: 0 0 2rem 0;
  color: ${COLORS.accentYellow};
  font-size: 1.8rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${COLORS.neutralMid};
`;

// ——— Form elements ——————————————————————————————————————————
export const Input = styled.input`
  width: 100%;
  padding: 1.1rem;
  border-radius: 0;
  border: 1px solid ${COLORS.neutralMid};
  background: ${COLORS.neutralDark};
  color: ${COLORS.white};
  font-size: 1rem;
  margin-bottom: 1.8rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: ${COLORS.secondary};
  }
`;

export const SubmitButton = styled.button.attrs({ type: 'button' })`
  width: 100%;
  padding: 1.2rem;
  margin: 1.5rem 0 0.5rem 0;
  border: none;
  border-radius: 0;
  background: ${COLORS.primary};
  color: ${COLORS.white};
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  box-shadow: 0 6px 18px rgba(0,0,0,0.3);
  transition: all 0.3s;

  &:hover {
    background: ${COLORS.secondary};
    transform: translateY(-3px);
  }

  &:disabled {
    background: ${COLORS.neutralMid};
    transform: none;
    cursor: not-allowed;
  }
`;

// ——— Filters & character count ——————————————————————————————————
export const FilterContainer = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  background: ${COLORS.neutralMid};
  border-radius: 0;
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
`;

export const FilterLabel = styled.span`
  color: ${COLORS.neutralLight};
  font-size: 1rem;
  font-weight: 500;
`;

export const FilterSelect = styled.select`
  background: ${COLORS.neutralDark};
  border: 1px solid ${COLORS.neutralMid};
  color: ${COLORS.white};
  font-size: 1rem;
  padding: 0.7rem 1.2rem;
  cursor: pointer;
  min-width: 150px;

  &:focus { 
    outline: none;
    border-color: ${COLORS.secondary};
  }

  option {
    background: ${COLORS.neutralDark};
    padding: 1rem;
  }
`;

export const CharacterCount = styled.div`
  text-align: right;
  font-size: 0.9rem;
  color: ${props => (props.count > 500 ? ERROR : COLORS.neutralLight)};
  margin: -1.2rem 0 1.5rem 0;
  padding: 0.3rem 0;
`;

// ——— Image upload inside modal —————————————————————————————————
export const ImageUploadContainer = styled.div`
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 250px;
  border-radius: 0;
  object-fit: contain;
  margin: 1rem 0;
  border: 1px solid ${COLORS.neutralMid};
`;

export const FileInputWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

export const ImageUploadButton = styled.input`
  display: none;
`;

export const ImageUploadLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 1.8rem;
  background: ${COLORS.primary};
  color: ${COLORS.white};
  border-radius: 0;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
  margin-right: 1rem;

  &:hover {
    background: ${COLORS.secondary};
  }
`;

export const RemoveImageButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  padding: 1rem 1.5rem;
  background: ${ERROR_LIGHT};
  color: ${ERROR};
  border: none;
  border-radius: 0;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;

  &:hover {
    background: ${ERROR};
    color: ${COLORS.white};
  }
`;

// Tabs and comments
export const TabButton = styled.button`
  background: transparent;
  border: none;
  padding: 1rem 1.5rem;
  font-weight: ${p => (p.active ? '700' : '500')};
  border-bottom: 3px solid ${p => (p.active ? COLORS.secondary : 'transparent')};
  cursor: pointer;
  color: ${p => (p.active ? COLORS.white : COLORS.neutralLight)};
  font-size: 1.1rem;
  transition: all 0.2s;
  margin-right: 1rem;

  &:hover { 
    color: ${COLORS.white};
  }
`;

export const CommentsList = styled.div`
  padding: 1.5rem 0;
  margin-top: 1.5rem;
  border-top: 1px solid ${COLORS.neutralMid};
`;

export const CommentItem = styled.div`
  background: ${COLORS.neutralMid};
  margin-bottom: 1.2rem;
  padding: 1.5rem;
  border-radius: 0;
  border: 1px solid ${COLORS.neutralLight};
`;

export const CommentMeta = styled.div`
  font-size: 0.95rem;
  color: ${COLORS.neutralLight};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.8rem;
`;

export const CommentText = styled.p`
  margin: 1rem 0 0 0;
  line-height: 1.6;
  color: ${COLORS.white};
  padding: 0.5rem 0;
`;

export const NoComments = styled.div`
  padding: 2rem;
  text-align: center;
  color: ${COLORS.neutralLight};
  font-size: 1.1rem;
  margin: 1rem 0;
`;

export const ErrorMessage = styled.div`
  padding: 1.2rem;
  background: rgba(255,85,85,0.15);
  color: ${ERROR};
  border-radius: 0;
  margin: 1.5rem 0;
  border: 1px solid ${ERROR};
  font-weight: 500;
`;