import React, { useState, useRef, useEffect } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { useSpring, animated } from '@react-spring/web';

// Import video files
import video1File from '../backend/uploads/videos/video1.mp4';
import video2File from '../backend/uploads/videos/video2.mp4';
import video3File from '../backend/uploads/videos/video3.mp4';
import video4File from '../backend/uploads/videos/video4.mp4';
import video5File from '../backend/uploads/videos/video5.mp4';
import video6File from '../backend/uploads/videos/video6.mp4';
// Import avatar images
import evelynImg from '../backend/uploads/images/evelyn.jpeg';
import winfieldImg from '../backend/uploads/images/winfield.jpeg';
import cynthiaImg from '../backend/uploads/images/cynthia.jpeg';

const dummyProjects = [
  {
    id: 1,
    title: 'Faith in the Fire',
    description: 'A powerful message on perseverance through trials, part of TFNTV\'s inspirational media series.',
    avatar: evelynImg,
    channel: 'Total Faith Network',
    views: '1.2M views',
    timestamp: '2 days ago',
    videoUrl: video1File,
  },
  {
    id: 2,
    title: 'Worship and Wonder',
    description: 'A live worship session that captures the heart of community and faith through music and praise.',
    avatar: winfieldImg,
    channel: 'TFN Worship',
    views: '850K views',
    timestamp: '1 week ago',
    videoUrl: video2File,
  },
  {
    id: 3,
    title: 'Purpose Driven Life',
    description: 'Explore God\'s purpose for your life in this thought-provoking episode on identity and calling.',
    avatar: cynthiaImg,
    channel: 'TFNTV Originals',
    views: '500K views',
    timestamp: '3 weeks ago',
    videoUrl: video3File,
  },
  {
    id: 4,
    title: 'Healed and Whole',
    description: 'Stories of healing, prayers, and spiritual encouragement for those battling autoimmune illness.',
    avatar: evelynImg,
    channel: 'Healing at TFN',
    views: '2M views',
    timestamp: '1 month ago',
    videoUrl: video4File,
  },
  {
    id: 5,
    title: 'Walking in Wisdom',
    description: 'A Bible-based series unpacking timeless wisdom from Proverbs for everyday decision-making.',
    avatar: winfieldImg,
    channel: 'TFN Bible Study',
    views: '3.5M views',
    timestamp: '2 months ago',
    videoUrl: video5File,
  },
  {
    id: 6,
    title: 'Total Faith Youth Session',
    description: 'Young believers share how faith empowers them in school, sports, and life\'s challenges.',
    avatar: cynthiaImg,
    channel: 'TFN Youth Voices',
    views: '950K views',
    timestamp: '2 months ago',
    videoUrl: video6File,
  },
];

const starTwinkle = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
`;

const Portfolio = () => {
  const [selectedVideo, setSelectedVideo] = useState(dummyProjects[0]);
  const [thumbnails, setThumbnails] = useState({});
  const fadeIn = useSpring({ 
    from: { opacity: 0, transform: 'translateY(20px)' }, 
    to: { opacity: 1, transform: 'translateY(0)' }, 
    config: { tension: 200, friction: 20, duration: 800 } 
  });

  // Generate thumbnails for videos
  useEffect(() => {
    const generateThumbnails = async () => {
      const newThumbnails = {};
      
      for (const project of dummyProjects) {
        try {
          const thumbnail = await getVideoThumbnail(project.videoUrl);
          newThumbnails[project.id] = thumbnail;
        } catch (error) {
          console.error('Error generating thumbnail:', error);
          newThumbnails[project.id] = project.avatar; // Fallback to avatar if thumbnail generation fails
        }
      }
      
      setThumbnails(newThumbnails);
    };

    generateThumbnails();
  }, []);

  // Function to capture video thumbnail
  const getVideoThumbnail = (videoUrl) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      video.src = videoUrl;
      video.crossOrigin = 'anonymous';
      
      video.addEventListener('loadedmetadata', () => {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Seek to a specific time (e.g., 2 seconds) to capture frame
        video.currentTime = 2;
      });
      
      video.addEventListener('seeked', () => {
        // Draw video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to data URL
        const thumbnailUrl = canvas.toDataURL('image/jpeg');
        resolve(thumbnailUrl);
      });
      
      video.addEventListener('error', reject);
    });
  };

  return (
    <>
      <GlobalStyle />
      <StarryBackground>
        {Array.from({ length: 150 }).map((_, i) => (
          <Star 
            key={i} 
            size={Math.random() * 3 + 1} 
            left={`${Math.random() * 100}%`} 
            top={`${Math.random() * 100}%`} 
            delay={Math.random() * 5} 
            duration={Math.random() * 3 + 2} 
          />
        ))}
      </StarryBackground>
      <PageContainer>
        <VideoTitle>{selectedVideo.title}</VideoTitle>
        <VideoPlayer controls key={selectedVideo.id}>
          <source src={selectedVideo.videoUrl} type="video/mp4" />
          Your browser does not support video playback.
        </VideoPlayer>
        <VideoInfo>
          <ChannelAvatar src={selectedVideo.avatar} alt={selectedVideo.channel} />
          <VideoText>
            <VideoTitleBig>{selectedVideo.title}</VideoTitleBig>
            <StatsRow>
              <Views>{selectedVideo.views}</Views>
              <Dot>•</Dot>
              <Timestamp>{selectedVideo.timestamp}</Timestamp>
            </StatsRow>
            <Description>{selectedVideo.description}</Description>
          </VideoText>
        </VideoInfo>
        <GridSection style={fadeIn}>
          <GridTitle>Recommended</GridTitle>
          <Grid>
            {dummyProjects.map((project) => (
              <Card key={project.id} onClick={() => setSelectedVideo(project)}>
                <ThumbnailWrapper>
                  {thumbnails[project.id] ? (
                    <Thumbnail src={thumbnails[project.id]} alt={project.title} />
                  ) : (
                    <ThumbnailPlaceholder>
                      <LoadingSpinner />
                    </ThumbnailPlaceholder>
                  )}
                  <PlayIcon>▶</PlayIcon>
                  <DurationBadge>5:42</DurationBadge>
                </ThumbnailWrapper>
                <InfoRow>
                  <SmallAvatar src={project.avatar} alt={project.channel} />
                  <InfoText>
                    <CardTitle>{project.title}</CardTitle>
                    <ChannelNameSmall>{project.channel}</ChannelNameSmall>
                    <StatsSmall>{project.views} • {project.timestamp}</StatsSmall>
                  </InfoText>
                </InfoRow>
              </Card>
            ))}
          </Grid>
        </GridSection>
      </PageContainer>
    </>
  );
};

export default Portfolio;

const GlobalStyle = createGlobalStyle`
  *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    width: 100%; height: 100%; font-family: 'Poppins', sans-serif;
    background-color: #0a0a12; color: #e0e0ff;
  }
  @media (max-width: 768px) {
    html, body {
      font-size: 14px;
    }
  }
`;

const StarryBackground = styled.div`
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  z-index: -1; overflow: hidden; pointer-events: none;
`;

const Star = styled.div`
  position: absolute;
  width: ${props => props.size}px; height: ${props => props.size}px;
  background-color: #fff; border-radius: 50%;
  box-shadow: 0 0 ${props => props.size / 2}px rgba(255, 255, 255, 0.5);
  left: ${props => props.left}; top: ${props => props.top};
  animation: ${starTwinkle} ${props => props.duration}s infinite ease-in-out;
  animation-delay: ${props => props.delay}s;
`;

const PageContainer = styled.div`
  padding: 20px; max-width: 1000px; margin: 0 auto;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const VideoPlayer = styled.video`
  width: 100%; max-height: 500px; background: #000; border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const VideoTitle = styled.h2`
  font-size: 2rem; margin-bottom: 12px; color: #ffcc00;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const VideoInfo = styled.div`
  display: flex; margin-top: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ChannelAvatar = styled.img`
  width: 48px; height: 48px; border-radius: 50%; flex-shrink: 0;
  object-fit: cover;
  @media (max-width: 768px) {
    width: 40px; height: 40px;
  }
`;

const VideoText = styled.div`
  margin-left: 12px; flex-grow: 1;
  @media (max-width: 768px) {
    margin-left: 0; margin-top: 10px;
  }
`;

const VideoTitleBig = styled.h3`
  font-size: 1.4rem; margin-bottom: 6px; color: #ffcc00;
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const StatsRow = styled.div`
  display: flex; align-items: center; font-size: 0.9rem; color: #aaa;
`;

const Views = styled.span``;
const Dot = styled.span` margin: 0 6px; `;
const Timestamp = styled.span``;

const Description = styled.p`
  margin-top: 10px; font-size: 1rem; color: #ccc;
  line-height: 1.5;
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const GridSection = styled(animated.div)` 
  margin-top: 40px; 
`;

const GridTitle = styled.h3`
  font-size: 1.5rem; margin-bottom: 16px; color: #ffcc00;
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const Grid = styled.div`
  display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); 
  gap: 20px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
`;

const PlayIcon = styled.div`
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 50px; height: 50px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: white; font-size: 20px;
  opacity: 0.7;
  transition: all 0.2s ease;
`;

const Card = styled.div`
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    
    ${PlayIcon} {
      transform: scale(1.1);
      opacity: 0.9;
    }
  }
  
  @media (max-width: 768px) {
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`;

const ThumbnailWrapper = styled.div`
  width: 100%; padding-top: 56.25%; 
  background: #222; border-radius: 6px; overflow: hidden;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const Thumbnail = styled.img`
  position: absolute; top: 0; left: 0; 
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.3s ease;
`;

const ThumbnailPlaceholder = styled.div`
  position: absolute; top: 0; left: 0;
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #333, #111);
`;

const LoadingSpinner = styled.div`
  width: 30px; height: 30px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #ffcc00;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;


const DurationBadge = styled.div`
  position: absolute; bottom: 8px; right: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white; padding: 3px 6px;
  border-radius: 4px; font-size: 0.8rem;
`;

const InfoRow = styled.div` 
  display: flex; margin-top: 10px; 
`;

const SmallAvatar = styled.img`
  width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;
  object-fit: cover;
  @media (max-width: 768px) {
    width: 32px; height: 32px;
  }
`;

const InfoText = styled.div`
  margin-left: 10px; flex-grow: 1;
`;

const CardTitle = styled.h4`
  font-size: 1rem; margin: 0; color: #e0e0ff;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ChannelNameSmall = styled.p`
  font-size: 0.85rem; color: #bbb; margin: 4px 0 0;
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const StatsSmall = styled.p`
  font-size: 0.8rem; color: #999; margin: 2px 0 0;
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;