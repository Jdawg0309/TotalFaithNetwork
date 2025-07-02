import React from 'react';
import styled from 'styled-components';

const FeaturedShows = () => {
  const shows = [
    { id: 1, title: 'Faith & Purpose', category: 'Inspiration', time: '8:00 PM' },
    { id: 2, title: 'Healing Hour', category: 'Health & Wellness', time: '10:00 AM' },
    { id: 3, title: 'Community Focus', category: 'Talk Show', time: '3:00 PM' },
    { id: 4, title: 'Sunday Service', category: 'Worship', time: '11:00 AM' },
    { id: 5, title: 'Youth Empowerment', category: 'Education', time: '4:30 PM' },
    { id: 6, title: 'Global Mission', category: 'Documentary', time: '7:00 PM' }
  ];

  return (
    <ShowsContainer>
      {shows.map(show => (
        <ShowCard key={show.id}>
          <ShowImage $bgColor={getRandomColor()}>
            <ShowTitle>{show.title}</ShowTitle>
          </ShowImage>
          <ShowInfo>
            <ShowCategory>{show.category}</ShowCategory>
            <ShowTime>{show.time}</ShowTime>
          </ShowInfo>
        </ShowCard>
      ))}
    </ShowsContainer>
  );
};

// Helper function to generate random colors
const getRandomColor = () => {
  const colors = [
    'linear-gradient(135deg, #0D47A1, #1976D2)',
    'linear-gradient(135deg, #B71C1C, #F44336)',
    'linear-gradient(135deg, #1B5E20, #4CAF50)',
    'linear-gradient(135deg, #4A148C, #9C27B0)',
    'linear-gradient(135deg, #E65100, #FF9800)',
    'linear-gradient(135deg, #006064, #00BCD4)'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const ShowsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const ShowCard = styled.div`
  background: rgba(30, 30, 46, 0.7);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }
`;

const ShowImage = styled.div`
  height: 180px;
  background: ${props => props.$bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(transparent, rgba(0,0,0,0.5));
  }
`;

const ShowTitle = styled.h3`
  color: white;
  font-size: 1.5rem;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  z-index: 1;
  font-weight: 700;
`;

const ShowInfo = styled.div`
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ShowCategory = styled.span`
  color: #4fc3f7;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
`;

const ShowTime = styled.span`
  background: rgba(25, 118, 210, 0.2);
  color: #e0e0ff;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
`;

export default FeaturedShows;