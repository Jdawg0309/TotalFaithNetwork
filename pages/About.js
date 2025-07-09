import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useSpring, useTrail, animated } from '@react-spring/web';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Images
import evelynImg from '../backend/uploads/images/evelyn.jpeg';
import winfieldImg from '../backend/uploads/images/winfield.jpeg';
import cynthiaImg from '../backend/uploads/images/cynthia.jpeg';
import Advisory1 from '../backend/uploads/images/Advisory1.jpg';
import Advisory2 from '../backend/uploads/images/Advisory2.jpg';
import Advisory3 from '../backend/uploads/images/Advisory3.jpg';
import Advisory4 from '../backend/uploads/images/Advisory4.jpg';
import Advisory5 from '../backend/uploads/images/Advisory5.jpg';
import Advisory6 from '../backend/uploads/images/Advisory6.jpg';
import Advisory7 from '../backend/uploads/images/Advisory7.jpg';
import Advisory8 from '../backend/uploads/images/Advisory8.jpg';
import Advisory9 from '../backend/uploads/images/Advisory9.jpg';
import tribute1 from '../backend/uploads/images/IMG_3361.jpeg';
import tribute2 from '../backend/uploads/images/IMG_3362.jpeg';
import tribute3 from '../backend/uploads/images/IMG_3363.jpeg';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const advisoryImages = [Advisory1, Advisory2, Advisory3, Advisory4, Advisory5, Advisory6, Advisory7, Advisory8, Advisory9];

const About = () => {
  const pageFade = useSpring({ 
    from: { opacity: 0 }, 
    to: { opacity: 1 }, 
    config: { duration: 800 } 
  });

const leaders = [
  {
    title: 'Honorable Evelyn Laporte',
    description: 'Newly appointed CEO of TFNTV, bringing a wealth of judicial and leadership experience.',
    bio: `Honorable Evelyn Laporte has been appointed as the new Chief Executive Officer of TFNTV, effective August 14, 2024. She succeeds Dr. Cynthia Ashley, who served over 15 years with distinction. 

Prior to joining TFNTV, Hon. Laporte was elected for two terms as Supreme Court Justice in Kings County, New York, serving on the bench for over 18 years. She is renowned for her strategic vision, integrity, and leadership acumen.

"Hon. Laporte is the right leader for TFNTV as we embark on our next chapter of growth," said Marshayne Winfield, TFNTV COO & Executive Producer. "With her extensive experience and innovative mindset, we are confident she will propel our mission forward."

Expressing excitement about her role, Hon. Laporte stated, "As I enter the market as an entrepreneur, I’m deeply honored to lead Total Faith Network TV & Media Enterprises, Inc. I am committed to building on our legacy and achieving our ambitious goals."

TFNTV reaches over 22 million potential cable subscribers and more than 66 million online viewers via platforms like ROKU. The network produces award-winning content that inspires, empowers, educates, and informs.

She is also the creator of "Confidence with Attitude," a coaching program helping young attorneys boost confidence and fast-track their careers. Known for her excellent communication, leadership, and organizational skills, Hon. Laporte is a disciplined, passionate visionary with a deep love for community impact.`,
    image: evelynImg,
  },
  {
    title: 'Marshayne Winfield aka Sha-Vision',
    description: 'A multi-platinum published recording artist and influential leader in media and arts.',
    bio: `Marshayne L.H. Winfield, known professionally as Sha-Vision, is a multi-platinum published recording artist with over two decades in the music industry. His lyrical talent led to collaborations with icons like Mary J. Blige and Pharrell, including a performance on VH1 Live in Europe.

In 2002, he launched MLHW Publishing, and in 2004, he pioneered the "Battlegroundz" mixtape series—an underground hip-hop platform. His editorial career includes working as Managing Editor for F.E.D.S. Magazine.

Currently, Sha-Vision serves as Executive VP, COO, and Senior Director of Content Development for TFNTV Media Enterprises, Inc. He is also the Executive Director of the ROCMAN Foundation and co-executive producer of the Total Faith Awards & Tribute to the African Diaspora.

His latest creative work includes his book *The Realm of Reality*, which challenges readers to explore thought, existence, and perception. A father of five, Sha-Vision continues to inspire through music, media, literature, and speaking engagements.

For inquiries or bookings, contact: legacbuilders933@gmail.com`,
    image: winfieldImg,
  },
  {
    title: 'Dr. Cynthia O. Ashley',
    description: 'Founder of TFNTV and a global advocate for media literacy and community empowerment.',
    bio: `Dr. Cynthia O. Ashley is a pioneering media literacy educator, ordained minister, and award-winning television host with over 25 years of service in media, ministry, and public leadership. She holds a Doctorate in Media Literacy Pedagogy and Research, along with degrees in divinity, communication, and law.

As founder and President of Total Faith Network, a Minority Business Enterprise and a woman's minority enterprise, she is the executive producers of Total Faith Awards Gala Benefit, the African Diaspora Tribute Image Awards, and *SASSY Women Who Win*, Choosen Handmaiden Retreat, Prayer Meditation and Surrender Prophetic World Summit, Intl' Leadership empowerment and Prophetic Summit.

In 2018, she made history as the first Black woman to register with the NY State Board of Elections to run for Mayor of Yonkers, later transitioning her candidacy to County Legislator. She is also a survivor of traumatic brain injury and advocates for healing and transformation.

Internationally, Dr. Ashley serves as Executive Board Chair of ROCMAN Foundation (USA), Director of Diaspora Affairs for the Pan African Chambers of Commerce (South Africa), and advisor to Ambassadors for Africa (Nigeria).

She has received numerous honors, including from Senator Andrea Stewart-Cousins, Congressman Eliot Engel, and Mayor Mike Spano. Her events draw dignitaries such as Queen Mother Dr. Dòris Blakely and HRM Dr. Olori Temitope Enitan Ogunwusi.

Through her ministries—Cyndi Ashley Network International (CAN-I), PMS: Paradigm Mind Shift. Ashley continues to inspire transformation with a powerful blend of faith, media, and advocacy.`,
    image: cynthiaImg,
  },
];


  const [selectedLeader, setSelectedLeader] = useState(null);
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

      <Section>
        <SectionTitle>Executive Leadership</SectionTitle>
        <LeaderGrid>
          {trail.map((animation, idx) => {
            const leader = leaders[idx];
            return (
              <LeaderCard key={idx} style={animation}>
                <LeaderImageContainer>
                  <LeaderImage src={leader.image} alt={leader.title} />
                  <LeaderOverlay>
                    <ViewButton onClick={() => setSelectedLeader(leader)}>View Profile</ViewButton>
                  </LeaderOverlay>
                </LeaderImageContainer>
                <LeaderContent>
                  <LeaderName>{leader.title}</LeaderName>
                  <LeaderDesc>{leader.description}</LeaderDesc>
                </LeaderContent>
              </LeaderCard>
            );
          })}
        </LeaderGrid>

        {selectedLeader && (
          <ModalOverlay onClick={() => setSelectedLeader(null)}>
            <ModalWindow onClick={(e) => e.stopPropagation()}>
              <ModalImage src={selectedLeader.image} alt={selectedLeader.title} />
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
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              }
            }}
          >
            {advisoryImages.map((img, index) => (
              <SwiperSlide key={index}>
                <AdvisoryImageContainer>
                  <AdvisoryImage src={img} alt={`Advisory Member ${index + 1}`} />
                </AdvisoryImageContainer>
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperContainer>
      </Section>

      <Section>
        <SectionTitle>In Loving Memory</SectionTitle>
        <TributeGrid>
          <TributeCard>
            <TributeImageContainer>
              <TributeImage src={tribute2} alt="Dr. Lane Rolling" />
              <TributeOverlay>
                <TributeQuote>"Their legacy continues to inspire us every day."</TributeQuote>
              </TributeOverlay>
            </TributeImageContainer>
            <TributeContent>
              <TributeName>Dr. Lane Rolling</TributeName>
              <TributeDates>1964 – 2023</TributeDates>
            </TributeContent>
          </TributeCard>
          <TributeCard>
            <TributeImageContainer>
              <TributeImage src={tribute1} alt="Vivian Ashley Smith" />
              <TributeOverlay>
                <TributeQuote>"A life of service and love remembered forever."</TributeQuote>
              </TributeOverlay>
            </TributeImageContainer>
            <TributeContent>
              <TributeName>Queen Mother Vivian Ashley Smith-Militano</TributeName>
              <TributeDates>1944 – 2017</TributeDates>
            </TributeContent>
          </TributeCard>
          <TributeCard>
            <TributeImageContainer>
              <TributeImage src={tribute3} alt="Gene 'Groove' Allen" />
              <TributeOverlay>
                <TributeQuote>"The music may have stopped, but the melody lingers on."</TributeQuote>
              </TributeOverlay>
            </TributeImageContainer>
            <TributeContent>
              <TributeName>Gene "Groove" Allen</TributeName>
              <TributeDates>1962 – 2025</TributeDates>
            </TributeContent>
          </TributeCard>
        </TributeGrid>
      </Section>

      <Section>
        <SectionTitle>About Total Faith Network (TFNTV)</SectionTitle>
        <AboutContent>
          <AboutText>
            Total Faith Network (TFNTV) is more than a media platform — it's a mission-driven movement that blends creativity, purpose, and impact. Founded on the belief that faith-based and values-driven content can uplift communities and change lives, TFNTV delivers powerful storytelling through diverse programming that speaks to the heart and spirit of our time.
          </AboutText>
          <AboutText>
            From inspirational films and groundbreaking documentaries to music, talk shows, and community-centered series, our content reflects real people, real purpose, and real transformation. At TFNTV, we don't just broadcast — we build bridges across cultures, generations, and beliefs.
          </AboutText>
          <AboutText>
            Through our expansive network of partner channels and our growing e-commerce platform, we empower small businesses, ministries, and creators to share their message, grow their influence, and generate meaningful revenue. We're redefining media as a tool for both expression and economic empowerment.
          </AboutText>
          <AboutText>
            At Total Faith Network, we believe our platform must also be a platform for healing. That's why we're deeply committed to Corporate Social Responsibility (CSR) — with a special focus on supporting individuals and families impacted by autoimmune diseases.
          </AboutText>
          <AboutText>
            Autoimmune conditions affect millions of people, often silently and without adequate support or awareness. For every donation we receive, a portion is dedicated directly to funding autoimmune disease research and advocacy. Your contribution doesn't just fuel our mission — it fuels hope, science, and the fight for better treatment and cures.
          </AboutText>
          <AboutText>
            We invite you to stand with us — not only in spreading light through media, but in bringing healing to those who need it most. Every dollar makes a difference. Every act of giving becomes proof that "Everyone wins @ TFN".
          </AboutText>
        </AboutContent>
      </Section>

      <MissionStatement>
        <MissionTitle>Our Mission</MissionTitle>
        <MissionText>
          To empower, educate, and inspire through faith-based media that transforms lives and communities worldwide.
        </MissionText>
      </MissionStatement>
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled(animated.div)`
  padding: 0;
  background: #0a0a12;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  color: #e0e0ff;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 5rem 1rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjA0LDAsMC4wNSkiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=');
    opacity: 0.3;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin: 0;
  color: #ffcc00;
  position: relative;
  z-index: 1;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: rgba(255,255,255,0.9);
  margin: 1rem 0 0;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto 5rem;
  padding: 0 1.5rem;
  position: relative;
`;

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #ffcc00;
  position: relative;
  
  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #ffcc00, #ff9900);
    margin: 1rem auto 0;
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const LeaderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LeaderCard = styled(animated.div)`
  background: #1e1e2f;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }
`;

const LeaderImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
`;

const LeaderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${LeaderCard}:hover & {
    transform: scale(1.05);
  }
`;

const LeaderOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${LeaderCard}:hover & {
    opacity: 1;
  }
`;

const LeaderContent = styled.div`
  padding: 1.5rem;
`;

const LeaderName = styled.h3`
  font-size: 1.4rem;
  margin: 0 0 0.5rem;
  color: #ffcc00;
`;

const LeaderDesc = styled.p`
  color: #bbb;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
`;

const ViewButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: #ffcc00;
  color: #1a1a2e;
  border: none;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  
  &:hover {
    background: #fff;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 204, 0, 0.4);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  backdrop-filter: blur(5px);
`;

const ModalWindow = styled.div`
  background: #1e1e2f;
  border-radius: 12px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  
  @media (min-width: 768px) {
    flex-direction: row;
    max-height: 70vh;
  }
`;

const ModalImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  
  @media (min-width: 768px) {
    width: 40%;
    height: auto;
  }
`;

const ModalBody = styled.div`
  padding: 2rem;
  overflow-y: auto;
  flex: 1;
`;

const ModalHeader = styled.h2`
  font-size: 1.8rem;
  color: #ffcc00;
  margin-bottom: 0.5rem;
`;

const ModalRole = styled.p`
  color: #bbb;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  font-style: italic;
`;

const ModalText = styled.p`
  color: #ddd;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const CloseButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: #ff3333;
  color: white;
  border: none;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  margin-top: 1rem;
  
  &:hover {
    background: #ff0000;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 0, 0, 0.3);
  }
`;

const SwiperContainer = styled.div`
  padding: 0 1rem;
  margin: 0 auto;
  max-width: 1200px;
  
  .swiper-pagination-bullet {
    background: #bbb;
    opacity: 1;
    
    &-active {
      background: #ffcc00;
    }
  }
  
  .swiper-button-next, 
  .swiper-button-prev {
    color: #ffcc00;
    
    &:after {
      font-size: 1.5rem;
    }
  }
`;

const AdvisoryImageContainer = styled.div`
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

const AdvisoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const TributeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const TributeCard = styled.div`
  background: #1e1e2f;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`;

const TributeImageContainer = styled.div`
  position: relative;
  height: 250px;
  overflow: hidden;
`;

const TributeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${TributeCard}:hover & {
    transform: scale(1.05);
  }
`;

const TributeOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${TributeCard}:hover & {
    opacity: 1;
  }
`;

const TributeQuote = styled.p`
  color: white;
  font-size: 1rem;
  text-align: center;
  font-style: italic;
`;

const TributeContent = styled.div`
  padding: 1.5rem;
  text-align: center;
`;

const TributeName = styled.h3`
  font-size: 1.3rem;
  color: #ffcc00;
  margin: 0 0 0.5rem;
`;

const TributeDates = styled.p`
  color: #bbb;
  font-size: 1rem;
  margin: 0;
`;

const AboutContent = styled.div`
  background: rgba(30, 30, 47, 0.5);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const AboutText = styled.p`
  color: #ddd;
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const MissionStatement = styled.section`
  background: linear-gradient(135deg, #ffcc00, #ff9900);
  padding: 4rem 1.5rem;
  text-align: center;
  margin-top: 3rem;
`;

const MissionTitle = styled.h2`
  font-size: 2rem;
  color: #1a1a2e;
  margin-bottom: 1.5rem;
`;

const MissionText = styled.p`
  font-size: 1.3rem;
  color: #1a1a2e;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export default About;