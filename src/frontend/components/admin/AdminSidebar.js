import React from 'react';
import { 
  Sidebar, 
  SidebarSection, 
  SidebarTitle, 
  SidebarLink, 
  CountBadge 
} from '../shared/StyledComponents';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Icon = styled.span`
  margin-right: 12px;
  font-size: 1.2rem;
  opacity: 0.9;
  transition: transform 0.2s ease;
`;

const EnhancedSidebarLink = styled(SidebarLink)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  margin: 4px 0;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateX(4px);
    
    ${Icon} {
      transform: scale(1.1);
      opacity: 1;
    }
  }

  &:active {
    transform: translateX(4px) scale(0.98);
  }

  ${({ active }) => active && `
    background: rgba(255, 255, 255, 0.1);
    border-left: 3px solid #3b82f6;
    font-weight: 500;
    
    ${Icon} {
      opacity: 1;
    }
  `}
`;

const LinkContent = styled.div`
  display: flex;
  align-items: center;
`;

const AdminSidebar = ({ 
  videosCount, 
  postsCount, 
  eventsCount,
  currentView, 
  setCurrentView,
  className 
}) => {
  const menuItems = [
    {
      id: 'videos',
      label: 'Videos',
      icon: '🎬',
      count: videosCount
    },
    {
      id: 'blog',
      label: 'Blog Manager', 
      icon: '📝',
      count: postsCount
    },
    {
      id: 'events',
      label: 'Events',
      icon: '📅',
      count: eventsCount
    },
    {
      id: 'about',
      label: 'About',
      icon: 'ℹ️'
    }
  ];

  const analyticsItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: '📊'
    },
    {
      id: 'audience',
      label: 'Audience',
      icon: '👥'
    }
  ];

  return (
    <Sidebar className={className}>
      <SidebarSection>
        <SidebarTitle>Content</SidebarTitle>
        {menuItems.map((item) => (
          <EnhancedSidebarLink
            key={item.id}
            active={currentView === item.id}
            onClick={() => setCurrentView(item.id)}
            aria-current={currentView === item.id ? 'page' : undefined}
          >
            <LinkContent>
              <Icon>{item.icon}</Icon>
              <span>{item.label}</span>
            </LinkContent>
            {typeof item.count === 'number' && <CountBadge>{item.count}</CountBadge>}
          </EnhancedSidebarLink>
        ))}
      </SidebarSection>

      <SidebarSection>
        <SidebarTitle>Analytics</SidebarTitle>
        {analyticsItems.map((item) => (
          <EnhancedSidebarLink
            key={item.id}
            active={currentView === item.id}
            onClick={() => setCurrentView(item.id)}
            aria-current={currentView === item.id ? 'page' : undefined}
          >
            <LinkContent>
              <Icon>{item.icon}</Icon>
              <span>{item.label}</span>
            </LinkContent>
          </EnhancedSidebarLink>
        ))}
      </SidebarSection>
    </Sidebar>
  );
};

AdminSidebar.propTypes = {
  videosCount: PropTypes.number,
  postsCount:  PropTypes.number,
  eventsCount: PropTypes.number,
  currentView: PropTypes.string.isRequired,
  setCurrentView: PropTypes.func.isRequired,
  className:   PropTypes.string
};

AdminSidebar.defaultProps = {
  videosCount: 0,
  postsCount:  0,
  eventsCount: 0
};

export default AdminSidebar;
