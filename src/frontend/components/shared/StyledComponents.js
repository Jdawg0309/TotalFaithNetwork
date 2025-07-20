import styled, { keyframes } from 'styled-components';

// Theme colors
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

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

// Layout Components
export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${COLORS.neutralDark};
  color: ${COLORS.white};
  font-family: 'Roboto', sans-serif;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  padding: 0.5rem;
`;

export const CheckboxInput = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 0.8rem;
  cursor: pointer;
  accent-color: ${COLORS.primary};
`;

export const CheckboxLabel = styled.label`
  font-size: 1rem;
  color: ${COLORS.neutralLight};
  cursor: pointer;
  user-select: none;
`;

export const DashboardHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.8rem;
  height: 72px;
  background-color: ${COLORS.neutralMid};
  border-bottom: 1px solid ${COLORS.neutralDark};
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
`;

export const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${COLORS.accentYellow};
  letter-spacing: -0.5px;
  padding: 0.5rem 0;
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 1.8rem;
`;

export const NavLink = styled.a`
  font-size: 1.05rem;
  font-weight: ${props => props.active ? '600' : '400'};
  color: ${props => props.active ? COLORS.white : COLORS.neutralLight};
  padding: 0.8rem 0;
  position: relative;
  cursor: pointer;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.active ? '100%' : '0'};
    height: 3px;
    background: ${COLORS.secondary};
    transition: width 0.3s;
  }
  
  &:hover:after {
    width: 100%;
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const SearchContainer = styled.div`
  position: relative;
  width: 380px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.8rem 1rem 1.2rem;
  background: ${COLORS.neutralDark};
  border: 1px solid ${COLORS.neutralMid};
  color: ${COLORS.white};
  font-size: 1rem;
  transition: all 0.3s;
  
  &:focus {
    outline: none;
    border-color: ${COLORS.secondary};
    background: ${COLORS.neutralMid};
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  right: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${COLORS.neutralLight};
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${COLORS.neutralLight};
  cursor: pointer;
  font-size: 1.1rem;
  
  &:hover {
    color: ${COLORS.white};
  }
`;

export const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const UserAvatar = styled.div`
  width: 42px;
  height: 42px;
  background: ${COLORS.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.white};
  font-weight: 600;
`;

export const UserDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.8rem;
  width: 220px;
  background: ${COLORS.neutralMid};
  box-shadow: 0 4px 20px rgba(0,0,0,0.4);
  overflow: hidden;
  display: none;
  
  ${UserMenu}:hover & {
    display: block;
    animation: ${fadeIn} 0.2s ease;
  }
`;

export const DropdownItem = styled.div`
  padding: 1.1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
  transition: all 0.2s;
  
  &:hover {
    background: ${COLORS.neutralDark};
  }
`;

export const DashboardContent = styled.div`
  display: flex;
  flex: 1;
  padding: 1rem 0;
`;

export const Sidebar = styled.div`
  width: 280px;
  background: ${COLORS.neutralDark};
  padding: 1.8rem 0;
  border-right: 1px solid ${COLORS.neutralMid};
  overflow-y: auto;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${COLORS.accentYellow};
  }
`;

export const SidebarSection = styled.div`
  margin-bottom: 2.2rem;
  padding: 0 1.2rem;
`;

export const SidebarTitle = styled.h3`
  padding: 0 1rem 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  color: ${COLORS.accentYellow};
  letter-spacing: 1px;
  border-bottom: 1px solid ${COLORS.neutralMid};
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  
  &::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 1.2rem;
    background: ${COLORS.accentYellow};
    margin-right: 0.8rem;
  }
`;

export const SidebarLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.3rem;
  cursor: pointer;
  color: ${({ active }) => (active ? COLORS.accentYellow : COLORS.neutralLight)};
  background: ${({ active }) =>
    active ? 'rgba(30, 58, 138, 0.15)' : 'transparent'};
  font-weight: ${({ active }) => (active ? 600 : 500)};
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  border-left: 3px solid ${({ active }) => active ? COLORS.accentYellow : 'transparent'};

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateX(5px);
  }
`;

export const CountBadge = styled.span`
  background: ${COLORS.primary};
  color: ${COLORS.white};
  font-size: 0.9rem;
  font-weight: 700;
  padding: 0.3rem 0.7rem;
  min-width: 28px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.2s;

  ${SidebarLink}:hover & {
    transform: scale(1.05);
  }
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 1.8rem;
  overflow-y: auto;
`;

export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${COLORS.neutralMid};
  
  h1 {
    font-size: 1.8rem;
    font-weight: 500;
  }
`;

export const HelpLink = styled.a`
  color: ${COLORS.secondary};
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const FormContainer = styled.div`
  background: ${COLORS.neutralMid};
  padding: 1.8rem;
  margin-bottom: 2.2rem;
  border: 1px solid ${COLORS.neutralDark};
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.8rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: ${COLORS.white};
`;

export const Input = styled.input`
  padding: 1.1rem 1.2rem;
  background: ${COLORS.neutralDark};
  border: 1px solid ${COLORS.neutralMid};
  color: ${COLORS.white};
  font-size: 1rem;
  transition: all 0.3s;
  
  &:focus {
    outline: none;
    border-color: ${COLORS.secondary};
  }
`;

export const Select = styled.select`
  padding: 1.1rem 1.2rem;
  background: ${COLORS.neutralDark};
  border: 1px solid ${COLORS.neutralMid};
  color: ${COLORS.white};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${COLORS.secondary};
  }
`;

export const Textarea = styled.textarea`
  padding: 1.1rem 1.2rem;
  background: ${COLORS.neutralDark};
  border: 1px solid ${COLORS.neutralMid};
  color: ${COLORS.white};
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  
  &:focus {
    outline: none;
    border-color: ${COLORS.secondary};
  }
`;

export const FileUpload = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: ${COLORS.neutralDark};
  border: 1px solid ${COLORS.neutralMid};
  overflow: hidden;
`;

export const FileInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

export const UploadLabel = styled.div`
  flex: 1;
  padding: 1.1rem 1.2rem;
  font-size: 1rem;
  color: ${props => props.empty ? COLORS.neutralLight : COLORS.white};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UploadIcon = styled.div`
  padding: 0 1.2rem;
  color: ${COLORS.neutralLight};
`;

export const FileHint = styled.div`
  font-size: 0.9rem;
  color: ${COLORS.neutralLight};
  margin-top: 0.5rem;
`;

export const PreviewContainer = styled.div`
  margin-top: 1rem;
`;

export const VideoPreview = styled.video`
  width: 100%;
  max-height: 320px;
  background: ${COLORS.black};
  overflow: hidden;
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

export const SubmitButton = styled.button`
  padding: 1.1rem 2.2rem;
  background: ${COLORS.primary};
  color: ${COLORS.white};
  border: none;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  cursor: pointer;
  transition: background 0.3s;
  min-width: 160px;
  
  &:hover {
    background: ${COLORS.secondary};
  }
  
  &:disabled {
    background: ${COLORS.neutralMid};
    cursor: not-allowed;
  }
`;

export const CancelButton = styled.button`
  padding: 1.1rem 2.2rem;
  background: transparent;
  color: ${COLORS.neutralLight};
  border: 1px solid ${COLORS.neutralMid};
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: ${COLORS.neutralDark};
    color: ${COLORS.white};
  }
`;

export const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: ${COLORS.white};
  animation: ${spin} 1s linear infinite;
`;

export const SectionDivider = styled.div`
  height: 1px;
  background: ${COLORS.neutralMid};
  margin: 2.2rem 0;
`;

export const SortSelect = styled.select`
  padding: 0.9rem 1.1rem;
  background: ${COLORS.neutralMid};
  border: 1px solid ${COLORS.neutralDark};
  color: ${COLORS.white};
  font-size: 1rem;
`;

export const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.8rem;
  margin-bottom: 2.2rem;
`;

export const VideoCard = styled.div`
  background: ${COLORS.neutralMid};
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  border: 1px solid ${COLORS.neutralDark};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.4);
  }
`;

export const ThumbnailContainer = styled.div`
  position: relative;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  background: ${COLORS.black};
`;

export const Thumbnail = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PlaceholderThumbnail = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${COLORS.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.2);
  font-size: 3rem;
  font-weight: bold;
`;

export const DurationBadge = styled.div`
  position: absolute;
  bottom: 0.8rem;
  right: 0.8rem;
  background: rgba(0,0,0,0.8);
  color: ${COLORS.white};
  padding: 0.3rem 0.6rem;
  font-size: 0.9rem;
  font-weight: 500;
`;

export const VideoInfo = styled.div`
  padding: 1.5rem;
`;

export const VideoTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.8rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
`;

export const Channel = styled.div`
  font-size: 1rem;
  color: ${COLORS.neutralLight};
  margin-bottom: 0.8rem;
`;

export const Description = styled.p`
  font-size: 1rem;
  color: ${COLORS.neutralLight};
  margin-bottom: 1.2rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
`;

export const CategoryBadge = styled.span`
  display: inline-block;
  background: rgba(255,0,0,0.1);
  color: ${ERROR};
  font-size: 0.9rem;
  padding: 0.4rem 0.8rem;
  margin-bottom: 1.2rem;
`;

export const ViewsCount = styled.div`
  font-size: 0.9rem;
  color: ${COLORS.neutralLight};
`;

export const ActionButtons = styled.div`
  display: flex;
  border-top: 1px solid ${COLORS.neutralDark};
`;

export const EditButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 1.1rem;
  background: transparent;
  color: ${COLORS.neutralLight};
  border: none;
  border-right: 1px solid ${COLORS.neutralDark};
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: ${COLORS.neutralDark};
    color: ${COLORS.white};
  }
`;

export const DeleteButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 1.1rem;
  background: transparent;
  color: ${COLORS.neutralLight};
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: ${COLORS.neutralDark};
    color: ${ERROR};
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background: ${COLORS.neutralMid};
  text-align: center;
  color: ${COLORS.neutralLight};
  margin-bottom: 2.2rem;
  border: 1px solid ${COLORS.neutralDark};
  gap: 1.5rem;
`;

export const LoadingSpinner = styled(Spinner)`
  margin: 3rem auto;
  width: 42px;
  height: 42px;
  border-width: 3px;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
  margin: 2.2rem 0;
`;

export const PaginationButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: ${COLORS.neutralMid};
  color: ${COLORS.white};
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover:not(:disabled) {
    background: ${COLORS.neutralDark};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PageInfo = styled.span`
  color: ${COLORS.neutralLight};
  font-size: 1rem;
`;

// Category Management Styles
export const CategoryManagerContainer = styled.div`
  background: ${COLORS.neutralMid};
  padding: 1.8rem;
  margin-top: 2.2rem;
  border: 1px solid ${COLORS.neutralDark};
`;

export const CategoryForm = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const CategoryInput = styled.input`
  flex: 1;
  padding: 1.1rem 1.2rem;
  background: ${COLORS.neutralDark};
  border: 1px solid ${COLORS.neutralMid};
  color: ${COLORS.white};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${COLORS.secondary};
  }
`;

export const AddButton = styled.button`
  padding: 1.1rem 1.8rem;
  background: ${COLORS.primary};
  color: ${COLORS.white};
  border: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  transition: background 0.3s;
  
  &:hover {
    background: ${COLORS.secondary};
  }
`;

export const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.2rem;
`;

export const CategoryItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.1rem 1.5rem;
  background: ${COLORS.neutralDark};
  border: 1px solid ${COLORS.neutralMid};
`;

export const CategoryName = styled.span`
  font-size: 1rem;
`;

export const DeleteCategoryButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 50, 50, 0.1);
  color: ${ERROR};
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: rgba(255, 50, 50, 0.2);
  }
`;

