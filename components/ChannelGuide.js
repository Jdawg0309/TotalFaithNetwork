import React, { useState } from 'react';
import styled from 'styled-components';

const ChannelGuide = () => {
  const [selectedDay, setSelectedDay] = useState(0);
  
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  const timeSlots = [
    '6:00 AM', '8:00 AM', '10:00 AM', '12:00 PM', 
    '2:00 PM', '4:00 PM', '6:00 PM', '8:00 PM', '10:00 PM'
  ];
  
  const programs = [
    { time: '6:00 AM', title: 'Morning Devotion', duration: 120 },
    { time: '8:00 AM', title: 'Faith & Family', duration: 60 },
    { time: '10:00 AM', title: 'Health & Wellness', duration: 120 },
    { time: '12:00 PM', title: 'News Update', duration: 30 },
    { time: '2:00 PM', title: 'Community Talk', duration: 60 },
    { time: '4:00 PM', title: 'Youth Empowerment', duration: 60 },
    { time: '6:00 PM', title: 'Evening News', duration: 60 },
    { time: '8:00 PM', title: 'Prime Time Special', duration: 120 },
    { time: '10:00 PM', title: 'Night Reflection', duration: 60 }
  ];

  return (
    <GuideContainer>
      <DaySelector>
        {days.map((day, index) => (
          <DayButton 
            key={index}
            $active={selectedDay === index}
            onClick={() => setSelectedDay(index)}
          >
            {day}
          </DayButton>
        ))}
      </DaySelector>
      
      <ScheduleContainer>
        <TimeColumn>
          {timeSlots.map((time, index) => (
            <TimeSlot key={index}>{time}</TimeSlot>
          ))}
        </TimeColumn>
        
        <ProgramsGrid>
          {programs.map((program, index) => (
            <ProgramItem 
              key={index}
              $duration={program.duration / 30}
              $colorIndex={index % 4}
            >
              <ProgramTitle>{program.title}</ProgramTitle>
              <ProgramTime>{program.time}</ProgramTime>
            </ProgramItem>
          ))}
        </ProgramsGrid>
      </ScheduleContainer>
    </GuideContainer>
  );
};

const GuideContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(20, 20, 35, 0.7);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(25, 118, 210, 0.3);
`;

const DaySelector = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const DayButton = styled.button`
  padding: 0.5rem 1.5rem;
  background: ${props => props.$active 
    ? 'linear-gradient(135deg, #1976d2, #0d47a1)' 
    : 'rgba(30, 30, 50, 0.8)'};
  color: ${props => props.$active ? '#fff' : '#e0e0ff'};
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.$active 
      ? 'linear-gradient(135deg, #1976d2, #0d47a1)' 
      : 'rgba(25, 118, 210, 0.3)'};
    transform: translateY(-2px);
  }
`;

const ScheduleContainer = styled.div`
  display: flex;
  background: rgba(15, 15, 25, 0.8);
  border-radius: 12px;
  overflow: hidden;
`;

const TimeColumn = styled.div`
  width: 100px;
  background: rgba(25, 25, 40, 0.9);
  padding: 1rem 0;
`;

const TimeSlot = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4fc3f7;
  font-weight: 600;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ProgramsGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: 40px;
  gap: 10px;
  padding: 1rem;
`;

const ProgramItem = styled.div`
  grid-row: span ${props => props.$duration};
  background: ${props => {
    const colors = [
      'linear-gradient(135deg, rgba(25, 118, 210, 0.3), rgba(25, 118, 210, 0.2))',
      'linear-gradient(135deg, rgba(76, 175, 80, 0.3), rgba(76, 175, 80, 0.2))',
      'linear-gradient(135deg, rgba(156, 39, 176, 0.3), rgba(156, 39, 176, 0.2))',
      'linear-gradient(135deg, rgba(255, 152, 0, 0.3), rgba(255, 152, 0, 0.2))'
    ];
    return colors[props.$colorIndex];
  }};
  border-radius: 8px;
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const ProgramTitle = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
`;

const ProgramTime = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
`;

export default ChannelGuide;