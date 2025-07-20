import React, { useState } from 'react';
import {
  FaPaperPlane, FaTwitter, FaThList,
  FaEnvelope, FaPhoneAlt, FaMapMarkerAlt,
  FaChevronRight, FaTimes, FaCheck
} from 'react-icons/fa';
import { useSpring } from '@react-spring/web';

// Correct way to import both named exports and namespace
import { 
  GlobalStyle,
  TO_EMAIL,
  socialLinks,
  services 
} from '../../styles/Contact.styles';
import * as S from '../../styles/Contact.styles';

export default function Contact() {
  const [tab, setTab] = useState('form');
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });
  const [sent, setSent] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const spring = useSpring({ from: { opacity: 0, y: 20 }, to: { opacity: 1, y: 0 }, config: { tension: 300, friction: 20 } });

  const [stars] = useState(
    Array.from({ length:150 }).map((_,i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2
    }))
  );

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setFormSubmitted(true);
    try {
      const baseURL = typeof window !== 'undefined' && window.location.origin
  ? window.location.origin
  : 'http://localhost:5000';

const res = await fetch(`${baseURL}/api/contact`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
});

      if (res.ok) {
        setSent(true);
      } else {
        console.error('Failed to send message');
      }
    } catch (err) {
      console.error('Error sending message:', err);
    }
    setTimeout(() => { setSent(false); setFormSubmitted(false); }, 4000);
    setForm({ name:'', email:'', subject:'', message:'' });
  };

  const openServiceModal = service => setSelectedService(service);
  const closeServiceModal = () => setSelectedService(null);

  return (
    <>
      <GlobalStyle />
      <S.Container style={spring}>
        <S.Header>
          <S.H1>Connect With TFN</S.H1>
          <S.Sub>Choose a tab to get in touch or explore our services</S.Sub>
        </S.Header>

        <S.NavTabs>
          <S.Tab active={tab === 'form'} onClick={() => setTab('form')}><FaPaperPlane/> Message</S.Tab>
          <S.Tab active={tab === 'social'} onClick={() => setTab('social')}><FaTwitter/> Socials</S.Tab>
          <S.Tab active={tab === 'services'} onClick={() => setTab('services')}><FaThList/> Services</S.Tab>
        </S.NavTabs>

        {tab === 'form' && (
          <S.FormContainer>
            <S.ContactForm onSubmit={handleSubmit} formSubmitted={formSubmitted}>
              <S.FormRow>
                <S.FormField>
                  <S.FormInput name="name" value={form.name} onChange={handleChange} required />
                  <S.FloatingLabel>Your Name</S.FloatingLabel>
                </S.FormField>
                <S.FormField>
                  <S.FormInput name="email" type="email" value={form.email} onChange={handleChange} required />
                  <S.FloatingLabel>Your Email</S.FloatingLabel>
                </S.FormField>
              </S.FormRow>
              <S.FormField>
                <S.FormInput name="subject" value={form.subject} onChange={handleChange} required />
                <S.FloatingLabel>Subject</S.FloatingLabel>
              </S.FormField>
              <S.FormField>
                <S.FormTextarea name="message" value={form.message} onChange={handleChange} required />
                <S.FloatingLabel>Your Message</S.FloatingLabel>
              </S.FormField>
              <S.SubmitButton type="submit" disabled={formSubmitted}>
                {formSubmitted ? <><FaCheck /> Sent!</> : <><FaPaperPlane /> Send Message</>}
              </S.SubmitButton>
              {sent && <S.SuccessMessage>✓ Message sent successfully</S.SuccessMessage>}
            </S.ContactForm>
          </S.FormContainer>
        )}

        {tab === 'social' && (
          <S.SocialGrid>
            {socialLinks.map((social, i) => (
              <S.SocialCard key={i} href={social.url} target="_blank" bgcolor={social.color}>
                <S.SocialIcon>{social.icon}</S.SocialIcon>
                <S.SocialPlatform>{social.platform}</S.SocialPlatform>
              </S.SocialCard>
            ))}
          </S.SocialGrid>
        )}

        {tab === 'services' && (
          <>
            <S.ServicesSection>
              <S.SectionTitle>Our Services</S.SectionTitle>
              <S.ServicesGrid>
                {services.map((srv, i) => (
                  <S.ServiceCard key={i} onClick={() => openServiceModal(srv)}>
                    <S.ServiceIcon>{srv.icon}</S.ServiceIcon>
                    <S.ServiceTitle>{srv.title}</S.ServiceTitle>
                    <S.ServiceDescription>{srv.description}</S.ServiceDescription>
                    <S.LearnMore>Learn more <FaChevronRight/></S.LearnMore>
                  </S.ServiceCard>
                ))}
              </S.ServicesGrid>
            </S.ServicesSection>
          </>
        )}
      </S.Container>

      {selectedService && (
        <S.ModalOverlay onClick={closeServiceModal}>
          <S.ModalContent onClick={e => e.stopPropagation()}>
            <S.ModalCloseButton onClick={closeServiceModal}><FaTimes/></S.ModalCloseButton>
            <S.ModalHeader>
              <S.ModalIcon>{selectedService.icon}</S.ModalIcon>
              <S.ModalTitle>{selectedService.title}</S.ModalTitle>
            </S.ModalHeader>
            <S.ModalDescription>{selectedService.description}</S.ModalDescription>
            <S.ServiceFeatures>
              {selectedService.details.map((d, i) => (
                <S.FeatureItem key={i}><S.FeatureCheck><FaCheck/></S.FeatureCheck>{d}</S.FeatureItem>
              ))}
            </S.ServiceFeatures>
            <S.ModalActionButton onClick={() => { setTab('form'); closeServiceModal(); }}>
              <FaPaperPlane /> Inquire About This Service
            </S.ModalActionButton>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </>
  );
}
