import React from 'react';
import { FiSearch, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import { 
  DashboardHeader, 
  HeaderLeft, 
  Logo, 
  NavLinks, 
  NavLink, 
  HeaderRight, 
  SearchContainer, 
  SearchInput, 
  SearchIcon, 
  ClearButton, 
  UserMenu, 
  UserAvatar, 
  UserDropdown, 
  DropdownItem 
} from '../shared/StyledComponents';

const AdminHeader = ({ searchTerm, setSearchTerm, handleLogout, videosCount }) => {
  return (
    <DashboardHeader>
      <HeaderLeft>
        <Logo>TFN Studio</Logo>
        <NavLinks>
          <NavLink active>Dashboard</NavLink>
          <NavLink>Analytics</NavLink>
        </NavLinks>
      </HeaderLeft>
      
      <HeaderRight>
        <SearchContainer>
          <SearchInput 
            type="text" 
            placeholder="Search videos..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm ? (
            <ClearButton onClick={() => setSearchTerm('')}>
              <FiX size={18} />
            </ClearButton>
          ) : (
            <SearchIcon>
              <FiSearch size={18} />
            </SearchIcon>
          )}
        </SearchContainer>
        
        <UserMenu>
          <UserAvatar>
            <FiUser size={20} />
          </UserAvatar>
          <UserDropdown>
            <DropdownItem onClick={handleLogout}>
              <FiLogOut size={16} />
              Logout
            </DropdownItem>
          </UserDropdown>
        </UserMenu>
      </HeaderRight>
    </DashboardHeader>
  );
};

export default AdminHeader;