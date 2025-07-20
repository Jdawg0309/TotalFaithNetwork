// src/pages/public/Home.js
import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import introVideo from '../../../backend/uploads/videos/intro.mp4';
import TheaterStage from '../../components/homepage/TheaterStage';
import {
  GlobalStyle,
  StarryBackground,
  Star,
  ShootingStar,
  PageContainer,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  HeroButtons,
  PrimaryButton,
  SecondaryButton,
  Section,
  SectionTitle,
  SectionContent,
  FeaturedQuote,
  QuoteText,
  FeaturesSection,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
  StatsSection,
  StatItem,
  StatNumber,
  StatLabel,
  TestimonialsSection,
  TestimonialCard,
  TestimonialQuote,
  TestimonialAuthor,
  UpcomingEvents,
  EventCard,
  EventDate,
  EventTitle,
  EventLocation,
  EventImageContainer,
  EventDetails,
  EventButton
} from '../../styles/HomeStyles';

export const COLORS = {
  primary: '#1E3A8A',
  secondary: '#3B82F6',
  accentYellow: '#FBBF24',
  accentGold: '#D4AF37',
  neutralDark: '#111827',
  neutralMid: '#374151',
  neutralLight: '#D1D5DB',
  white: '#FFFFFF',
  black: '#000000',
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const AnimatedEventCard = ({ event, index, hoveredEvent, setHoveredEvent }) => {
  const animation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: index * 100,
    config: { tension: 300, friction: 20 }
  });

  return (
    <animated.div style={animation}>
      <EventCard
        onMouseEnter={() => setHoveredEvent(event.id)}
        onMouseLeave={() => setHoveredEvent(null)}
        isHovered={hoveredEvent === event.id}
      >
        {event.image_url && (
          <EventImageContainer>
            <img
              src={event.image_url}
              alt={event.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease',
                transform: hoveredEvent === event.id ? 'scale(1.05)' : 'scale(1)'
              }}
            />
          </EventImageContainer>
        )}
        <EventDetails>
          <EventDate>{event.formatted_date}</EventDate>
          <EventTitle>{event.title}</EventTitle>
          <EventLocation>{event.location}</EventLocation>
          {event.description && (
            <p style={{
              margin: '10px 0',
              fontSize: '0.9rem',
              color: COLORS.neutralMid,
              lineHeight: '1.4'
            }}>
              {event.description.length > 100 
                ? `${event.description.substring(0, 100)}...` 
                : event.description}
            </p>
          )}
          <EventButton
            href={event.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </EventButton>
        </EventDetails>
      </EventCard>
    </animated.div>
  );
};

export default function Home() {
  const [shootingStars, setShootingStars] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [events, setEvents] = useState([]);
  const [eventsError, setEventsError] = useState(null);
  const [hoveredEvent, setHoveredEvent] = useState(null);

  useEffect(() => {
    // Shooting stars effect
    const starInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newStar = {
          id: Date.now(),
          left: `${Math.random() * 20}%`,
          top: `${Math.random() * 20}%`,
          delay: Math.random() * 2,
          duration: Math.random() * 2 + 1
        };
        setShootingStars(prev => [...prev, newStar]);
        setTimeout(() => {
          setShootingStars(prev => prev.filter(s => s.id !== newStar.id));
        }, (newStar.duration + newStar.delay) * 1000);
      }
    }, 3000);

    // Testimonial rotation
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 8000);

    // Fetch events
    const fetchEvents = async () => {
      try {
        const baseUrl = typeof window !== 'undefined' && window.location.origin
  ? window.location.origin
  : 'http://localhost:5000';
const res = await fetch(`${baseUrl}/api/events`);

        if (!res.ok) throw new Error(`Failed to load events (${res.status})`);
        const data = await res.json();
        setEvents(data.map(ev => ({
          ...ev,
          image_url: ev.image_url ? `${baseUrl}${ev.image_url}` : null,
          formatted_date: formatDate(ev.date)
        })));
      } catch (err) {
        console.error(err);
        setEventsError(err.message);
      }
    };

    fetchEvents();

    return () => {
      clearInterval(starInterval);
      clearInterval(testimonialInterval);
    };
  }, []);

  const curtainAnim = useSpring({
    from: { leftX: 0, rightX: 0 },
    to: { leftX: -100, rightX: 100 },
    config: { friction: 30 },
    delay: 500
  });

  // Static data
  const stars = Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2
  }));

  const features = [
    { icon: '🎥', title: 'Original Content', description: 'Films, Documentaries, Podcasts, and Faith based content produced in collaboration with other creators to watch on TFNTV' },
    { icon: '🌍', title: 'Global Reach', description: 'Content webcast, cablecast, telecast, and stream to countries worldwide.' },
    { icon: '💖', title: 'Community Driven', description: 'Content created by and for our faithful community.' }
  ];

  const stats = [
    { number: '22M+', label: 'Potential Viewers' },
    { number: '150+', label: 'Original Programs' },
    { number: '50+', label: 'Countries Reached' }
  ];

  const testimonials = [
    { quote: "TFNTV's content brings hope and joy into our home.", author: "Sarah from NY" },
    { quote: "A platform that truly uplifts and empowers.", author: "James from Atlanta" },
    { quote: "Quality programming that aligns with our values.", author: "Maria from Texas" }
  ];

  return (
    <>
      <GlobalStyle />
      <StarryBackground>
        {stars.map(s => <Star key={s.id} {...s} />)}
        {shootingStars.map(s => <ShootingStar key={s.id} {...s} />)}
      </StarryBackground>

      <TheaterStage curtainAnim={curtainAnim} introVideo={introVideo}>
        <HeroContent>
          <HeroTitle>
            Trinity Faith Network
            <span>Where Faith Meets Media</span>
          </HeroTitle>
          <HeroSubtitle>
            Broadcasting hope, inspiration, and faith-based content to millions worldwide
          </HeroSubtitle>
          <HeroButtons>
            <PrimaryButton onClick={() => window.location.href = '/watch'}>
              Watch Now
            </PrimaryButton>
            <SecondaryButton onClick={() => window.location.href = '/about'}>
              Our Mission
            </SecondaryButton>
          </HeroButtons>
        </HeroContent>
      </TheaterStage>

      <PageContainer>
        <Section>
          <SectionContent>
            <FeaturedQuote>
              <QuoteText>Inspiring Faith, Empowering Lives, Transforming Media.</QuoteText>
            </FeaturedQuote>
          </SectionContent>
        </Section>

                <Section>
          <SectionTitle>Upcoming Events</SectionTitle>
          <SectionContent>
            <UpcomingEvents>
              {eventsError && (
                <p style={{ color: COLORS.accentYellow, textAlign: 'center' }}>
                  Error loading events: {eventsError}
                </p>
              )}
              {!eventsError && events.length === 0 && (
                <p style={{ textAlign: 'center', color: COLORS.neutralLight }}>
                  No upcoming events. Check back soon!
                </p>
              )}
              {events.map((event, index) => (
                <AnimatedEventCard
                  key={event.id}
                  event={event}
                  index={index}
                  hoveredEvent={hoveredEvent}
                  setHoveredEvent={setHoveredEvent}
                />
              ))}
            </UpcomingEvents>
          </SectionContent>
        </Section>

        <Section style={{ backgroundColor: 'rgba(30, 58, 138, 0.2)' }}>
          <SectionTitle>Our Impact</SectionTitle>
          <SectionContent>
            <StatsSection>
              {stats.map((stat, i) => (
                <StatItem key={i}>
                  <StatNumber>{stat.number}</StatNumber>
                  <StatLabel>{stat.label}</StatLabel>
                </StatItem>
              ))}
            </StatsSection>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>What We Offer</SectionTitle>
          <SectionContent>
            <FeaturesSection>
              {features.map((feat, i) => (
                <FeatureCard key={i}>
                  <FeatureIcon>{feat.icon}</FeatureIcon>
                  <FeatureTitle>{feat.title}</FeatureTitle>
                  <FeatureDescription>{feat.description}</FeatureDescription>
                </FeatureCard>
              ))}
            </FeaturesSection>
          </SectionContent>
        </Section>

        <Section style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}>
          <SectionTitle>What Our Viewers Say</SectionTitle>
          <SectionContent>
            <TestimonialsSection>
              <TestimonialCard>
                <TestimonialQuote>
                  {testimonials[currentTestimonial].quote}
                </TestimonialQuote>
                <TestimonialAuthor>
                  - {testimonials[currentTestimonial].author}
                </TestimonialAuthor>
              </TestimonialCard>
            </TestimonialsSection>
          </SectionContent>
        </Section>

      </PageContainer>
    </>
  );
}