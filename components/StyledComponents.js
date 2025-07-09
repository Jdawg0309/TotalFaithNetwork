import styled, { keyframes } from 'styled-components';

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
  background-color: #0f0f0f;
  color: #f1f1f1;
  font-family: 'Roboto', sans-serif;
`;

export const DashboardHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 64px;
  background-color: #202020;
  border-bottom: 1px solid #303030;
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #ff0000;
  letter-spacing: -0.5px;
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 24px;
`;

export const NavLink = styled.a`
  font-size: 14px;
  font-weight: ${props => props.active ? '500' : '400'};
  color: ${props => props.active ? '#fff' : '#aaa'};
  padding: 6px 0;
  position: relative;
  cursor: pointer;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    background: #ff0000;
    transition: width 0.3s;
  }
  
  &:hover:after {
    width: 100%;
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const SearchContainer = styled.div`
  position: relative;
  width: 360px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 40px 10px 16px;
  background: #121212;
  border: 1px solid #303030;
  border-radius: 24px;
  color: #fff;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #3da6ff;
    background: #181818;
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  
  &:hover {
    color: #fff;
  }
`;

export const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #3da6ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

export const UserDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  width: 200px;
  background: #202020;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  overflow: hidden;
  display: none;
  
  ${UserMenu}:hover & {
    display: block;
    animation: ${fadeIn} 0.2s ease;
  }
`;

export const DropdownItem = styled.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  
  &:hover {
    background: #303030;
  }
`;

export const DashboardContent = styled.div`
  display: flex;
  flex: 1;
`;

export const Sidebar = styled.div`
  width: 240px;
  background: #202020;
  padding: 24px 0;
  border-right: 1px solid #303030;
  overflow-y: auto;
`;

export const SidebarSection = styled.div`
  margin-bottom: 24px;
`;

export const SidebarTitle = styled.h3`
  padding: 0 24px 8px;
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
  color: #aaa;
`;

export const SidebarLink = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 24px;
  font-size: 14px;
  color: ${props => props.active ? '#fff' : '#aaa'};
  background: ${props => props.active ? '#303030' : 'transparent'};
  cursor: pointer;
  
  &:hover {
    background: #303030;
  }
  
  span {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

export const CountBadge = styled.span`
  background: #ff0000;
  color: #fff;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
`;

export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  
  h1 {
    font-size: 24px;
    font-weight: 500;
  }
`;

export const HelpLink = styled.a`
  color: #3da6ff;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const FormContainer = styled.div`
  background: #202020;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #f1f1f1;
`;

export const Input = styled.input`
  padding: 12px 14px;
  background: #121212;
  border: 1px solid #303030;
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #3da6ff;
  }
`;

export const Select = styled.select`
  padding: 12px 14px;
  background: #121212;
  border: 1px solid #303030;
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #3da6ff;
  }
`;

export const Textarea = styled.textarea`
  padding: 12px 14px;
  background: #121212;
  border: 1px solid #303030;
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: #3da6ff;
  }
`;

export const FileUpload = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: #121212;
  border: 1px solid #303030;
  border-radius: 8px;
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
  padding: 12px 14px;
  font-size: 14px;
  color: ${props => props.empty ? '#777' : '#fff'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UploadIcon = styled.div`
  padding: 0 14px;
  color: #aaa;
`;

export const FileHint = styled.div`
  font-size: 12px;
  color: #777;
  margin-top: 4px;
`;

export const PreviewContainer = styled.div`
  margin-top: 10px;
`;

export const VideoPreview = styled.video`
  width: 100%;
  max-height: 300px;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 10px;
`;

export const SubmitButton = styled.button`
  padding: 12px 24px;
  background: #ff0000;
  color: #fff;
  border: none;
  border-radius: 24px;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: background 0.2s;
  min-width: 150px;
  
  &:hover {
    background: #cc0000;
  }
  
  &:disabled {
    background: #606060;
    cursor: not-allowed;
  }
`;

export const CancelButton = styled.button`
  padding: 12px 24px;
  background: transparent;
  color: #aaa;
  border: 1px solid #303030;
  border-radius: 24px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background: #303030;
    color: #fff;
  }
`;

export const Spinner = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: ${spin} 1s linear infinite;
`;

export const SectionDivider = styled.div`
  height: 1px;
  background: #303030;
  margin: 32px 0;
`;

export const SortSelect = styled.select`
  padding: 8px 12px;
  background: #202020;
  border: 1px solid #303030;
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
`;

export const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

export const VideoCard = styled.div`
  background: #202020;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.3);
  }
`;

export const ThumbnailContainer = styled.div`
  position: relative;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  background: #000;
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
  background: linear-gradient(45deg, #ff0000, #ff6b00);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.2);
  font-size: 48px;
  font-weight: bold;
`;

export const DurationBadge = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0,0,0,0.8);
  color: #fff;
  padding: 3px 6px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
`;

export const VideoInfo = styled.div`
  padding: 16px;
`;

export const VideoTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Channel = styled.div`
  font-size: 14px;
  color: #aaa;
  margin-bottom: 8px;
`;

export const Description = styled.p`
  font-size: 14px;
  color: #aaa;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const CategoryBadge = styled.span`
  display: inline-block;
  background: rgba(255,0,0,0.1);
  color: #ff0000;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  margin-bottom: 12px;
`;

export const ViewsCount = styled.div`
  font-size: 12px;
  color: #777;
`;

export const ActionButtons = styled.div`
  display: flex;
  border-top: 1px solid #303030;
`;

export const EditButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  background: transparent;
  color: #aaa;
  border: none;
  border-right: 1px solid #303030;
  cursor: pointer;
  
  &:hover {
    background: #303030;
    color: #fff;
  }
`;

export const DeleteButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  background: transparent;
  color: #aaa;
  border: none;
  cursor: pointer;
  
  &:hover {
    background: #303030;
    color: #ff4d4d;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: #202020;
  border-radius: 12px;
  text-align: center;
  color: #777;
  margin-bottom: 32px;
`;

export const LoadingSpinner = styled(Spinner)`
  margin: 40px auto;
  width: 40px;
  height: 40px;
  border-width: 3px;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 32px;
  margin-bottom: 32px;
`;

export const PaginationButton = styled.button`
  padding: 8px 16px;
  background: #303030;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover:not(:disabled) {
    background: #404040;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PageInfo = styled.span`
  color: #aaa;
  font-size: 14px;
`;

// Category Management Styles
export const CategoryManagerContainer = styled.div`
  background: #202020;
  border-radius: 12px;
  padding: 24px;
  margin-top: 32px;
`;

export const CategoryForm = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
`;

export const CategoryInput = styled.input`
  flex: 1;
  padding: 12px 14px;
  background: #121212;
  border: 1px solid #303030;
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #3da6ff;
  }
`;

export const AddButton = styled.button`
  padding: 12px 20px;
  background: #3da6ff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  
  &:hover {
    background: #2b8fd8;
  }
`;

export const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

export const CategoryItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #2a2a3a;
  border-radius: 8px;
`;

export const CategoryName = styled.span`
  font-size: 14px;
`;

export const DeleteCategoryButton = styled.button`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 50, 50, 0.1);
  color: #ff3232;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 50, 50, 0.2);
  }
`;