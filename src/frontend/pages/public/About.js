import React, { useState, useEffect } from 'react';
import { useSpring, useTrail } from '@react-spring/web';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import {
  PageContainer, HeroSection, HeroTitle, HeroSubtitle, Section, SectionTitle,
  LeaderGrid, LeaderCard, LeaderImageContainer, LeaderImage, LeaderOverlay, ViewButton,
  LeaderContent, LeaderName, LeaderDesc, ModalOverlay, ModalWindow, ModalImage, ModalBody,
  ModalHeader, ModalRole, ModalText, CloseButton, SwiperContainer, AdvisoryImageContainer,
  AdvisoryImage, TributeGrid, TributeCard, TributeImageContainer, TributeImage, TributeOverlay,
  TributeQuote, TributeContent, TributeName, TributeDates, AboutContent, AboutText,
  MissionStatement, MissionTitle, MissionText
} from '../../styles/AboutStyles';

// 🔧 FIX: Removed BASE_URL and switched to relative paths

const About = () => {
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [leaders, setLeaders] = useState([]);
  const [advisoryImages, setAdvisoryImages] = useState([]);
  const [tributes, setTributes] = useState([]);
  const [aboutText, setAboutText] = useState([]);
  const [mission, setMission] = useState('');

  const pageFade = useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, config: { duration: 800 } });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [leadersRes, advisoryRes, tributesRes, aboutRes] = await Promise.all([
          fetch('/api/about/leaders'),
          fetch('/api/about/advisory-images'),
          fetch('/api/about/tributes'),
          fetch('/api/about')
        ]);

        const leadersData = await leadersRes.json();
        const advisoryData = await advisoryRes.json();
        const tributesData = await tributesRes.json();
        const aboutData = await aboutRes.json();

        setLeaders(leadersData);
        setAdvisoryImages(advisoryData);
        setTributes(tributesData);
        setAboutText(Array.isArray(aboutData.about) ? aboutData.about : []);
        setMission(aboutData.mission || '');
      } catch (err) {
        console.error('Failed to fetch about page content:', err);
      }
    };
    fetchContent();
  }, []);

  const trail = useTrail(leaders.length, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { mass: 1, tension: 200, friction: 20 },
    delay: 500
  });

  return (
    <PageContainer style={pageFade}>
      <HeroSection>
        <HeroTitle>Our Leadership Team</HeroTitle>
        <HeroSubtitle>Guiding TFNTV with Vision and Purpose</HeroSubtitle>
      </HeroSection>

      {/* Leaders */}
      <Section>
        <SectionTitle>Executive Leadership</SectionTitle>
        <LeaderGrid>
          {trail.map((animation, idx) => {
            const leader = leaders[idx];
            return leader ? (
              <LeaderCard key={leader.id} style={animation}>
                <LeaderImageContainer>
                  <LeaderImage src={leader.image_url} alt={leader.title} />
                  <LeaderOverlay>
                    <ViewButton onClick={() => setSelectedLeader(leader)}>View Profile</ViewButton>
                  </LeaderOverlay>
                </LeaderImageContainer>
                <LeaderContent>
                  <LeaderName>{leader.title}</LeaderName>
                  <LeaderDesc>{leader.description}</LeaderDesc>
                </LeaderContent>
              </LeaderCard>
            ) : null;
          })}
        </LeaderGrid>

        {selectedLeader && (
          <ModalOverlay onClick={() => setSelectedLeader(null)}>
            <ModalWindow onClick={(e) => e.stopPropagation()}>
              <ModalImage src={selectedLeader.image_url} alt={selectedLeader.title} />
              <ModalBody>
                <ModalHeader>{selectedLeader.title}</ModalHeader>
                <ModalRole>{selectedLeader.description}</ModalRole>
                <ModalText>{selectedLeader.bio}</ModalText>
                <CloseButton onClick={() => setSelectedLeader(null)}>Close</CloseButton>
              </ModalBody>
            </ModalWindow>
          </ModalOverlay>
        )}
      </Section>

      {/* Advisory Board */}
      <Section>
        <SectionTitle>Advisory Board</SectionTitle>
        <SwiperContainer>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          >
            {advisoryImages.map((url, index) => (
              <SwiperSlide key={index}>
                <AdvisoryImageContainer>
                  <AdvisoryImage src={url} alt={`Advisory Member ${index + 1}`} />
                </AdvisoryImageContainer>
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperContainer>
      </Section>

      {/* Tributes */}
      <Section>
        <SectionTitle>Gone But Never Forgotten</SectionTitle>
        <TributeGrid>
          {tributes.map((tribute) => (
            <TributeCard key={tribute.id}>
              <TributeImageContainer>
                <TributeImage src={tribute.image_url} alt={tribute.name} />
                <TributeOverlay>
                  <TributeQuote>{tribute.quote}</TributeQuote>
                </TributeOverlay>
              </TributeImageContainer>
              <TributeContent>
                <TributeName>{tribute.name}</TributeName>
                <TributeDates>{tribute.dates}</TributeDates>
              </TributeContent>
            </TributeCard>
          ))}
        </TributeGrid>
      </Section>

      {/* About */}
      <Section>
        <SectionTitle>About Total Faith Network (TFNTV)</SectionTitle>
        <AboutContent>
          {aboutText.map((para, idx) => (
            <AboutText key={idx}>{para}</AboutText>
          ))}
        </AboutContent>
      </Section>

      {/* Mission */}
      <MissionStatement>
        <MissionTitle>Our Mission</MissionTitle>
        <MissionText>{mission}</MissionText>
      </MissionStatement>
    </PageContainer>
  );
};

export default About;
