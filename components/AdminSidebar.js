import React from 'react';
import { 
  Sidebar, 
  SidebarSection, 
  SidebarTitle, 
  SidebarLink, 
  CountBadge 
} from './StyledComponents';

const AdminSidebar = ({ videosCount }) => {
  return (
    <Sidebar>
      <SidebarSection>
        <SidebarTitle>Content</SidebarTitle>
        <SidebarLink active>
          <span>Videos</span> <CountBadge>{videosCount}</CountBadge>
        </SidebarLink>
        <SidebarLink><span>Playlists</span></SidebarLink>
        <SidebarLink><span>Shorts</span></SidebarLink>
      </SidebarSection>
      
      <SidebarSection>
        <SidebarTitle>Analytics</SidebarTitle>
        <SidebarLink><span>Overview</span></SidebarLink>
        <SidebarLink><span>Audience</span></SidebarLink>
      </SidebarSection>
      
      <SidebarSection>
        <SidebarTitle>Settings</SidebarTitle>
        <SidebarLink><span>Channel</span></SidebarLink>
        <SidebarLink><span>Permissions</span></SidebarLink>
      </SidebarSection>
    </Sidebar>
  );
};

export default AdminSidebar;