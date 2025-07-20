import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../styles/AboutStyles';
import { FiPlus, FiTrash2, FiSave, FiRefreshCw, FiImage } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = window.location.origin;

const AdminAbout = () => {
  const [about, setAbout] = useState([]);
  const [mission, setMission] = useState('');
  const [leaders, setLeaders] = useState([]);
  const [advisoryImages, setAdvisoryImages] = useState([]);
  const [tributes, setTributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [aboutRes, leadersRes, advisoryRes, tributesRes] = await Promise.all([
        fetch(`${BASE_URL}/api/about`),
        fetch(`${BASE_URL}/api/about/leaders`),
        fetch(`${BASE_URL}/api/about/advisory-images`),
        fetch(`${BASE_URL}/api/about/tributes`)
      ]);
      
      if (!aboutRes.ok) throw new Error('Failed to load about content');
      if (!leadersRes.ok) throw new Error('Failed to load leaders');
      if (!advisoryRes.ok) throw new Error('Failed to load advisory images');
      if (!tributesRes.ok) throw new Error('Failed to load tributes');

      const [aboutData, leadersData, advisoryData, tributesData] = await Promise.all([
        aboutRes.json(),
        leadersRes.json(),
        advisoryRes.json(),
        tributesRes.json()
      ]);

      setAbout(aboutData.about || ['']);
      setMission(aboutData.mission || '');
      setLeaders(leadersData || []);
      setAdvisoryImages(advisoryData || []);
      setTributes(tributesData || []);
      
      toast.success('Content loaded successfully!', { autoClose: 2000 });
    } catch (err) {
      console.error(err);
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const results = await Promise.all([
        fetch(`${BASE_URL}/api/about`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ about, mission })
        }),
        fetch(`${BASE_URL}/api/about/leaders`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leaders)
        }),
        fetch(`${BASE_URL}/api/about/advisory-images`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(advisoryImages)
        }),
        fetch(`${BASE_URL}/api/about/tributes`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(tributes)
        })
      ]);

      const allSuccess = results.every(res => res.ok);
      if (!allSuccess) throw new Error('Some updates failed');

      toast.success('All changes saved successfully!', { autoClose: 3000 });
    } catch (err) {
      console.error(err);
      toast.error(`Failed to save: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e, setImageUrl) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${BASE_URL}/api/uploads/images`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Upload failed');
      
      const { url } = await response.json();
      setImageUrl(url);
      toast.success('Image uploaded successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Image upload failed');
    } finally {
      setImageUploading(false);
    }
  };

  const updateList = (list, setList, idx, field, value) => {
    const updated = [...list];
    updated[idx] = { ...updated[idx], [field]: value };
    setList(updated);
  };

  const addItem = (list, setList, template) => {
    setList([...list, template]);
    setTimeout(() => {
      const lastItem = document.querySelector(`.${list === about ? 'about' : list === leaders ? 'leaders' : 'tributes'}-item:last-child input`);
      if (lastItem) lastItem.focus();
    }, 100);
  };

  if (loading) return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>Loading Content...</LoadingText>
    </LoadingContainer>
  );

  return (
    <AdminContainer>
      <ToastContainer position="top-center" />
      
      <Header>
        <Title>About Page Editor</Title>
        <Subtitle>Manage all content for the About page</Subtitle>
      </Header>

      <ContentSection>
        <Section>
          <SectionHeader>
            <SectionHeading>About Content</SectionHeading>
            <SectionActions>
              <AddButton onClick={() => addItem(about, setAbout, '')}>
                <FiPlus /> Add Paragraph
              </AddButton>
            </SectionActions>
          </SectionHeader>
          
          {about.map((text, idx) => (
            <AboutItem key={idx} className="about-item">
              <ContentTextarea
                value={text}
                rows={3}
                placeholder={`About paragraph ${idx + 1}`}
                onChange={e => {
                  const updated = [...about];
                  updated[idx] = e.target.value;
                  setAbout(updated);
                }}
              />
              <DeleteButton onClick={() => setAbout(about.filter((_, i) => i !== idx))}>
                <FiTrash2 />
              </DeleteButton>
            </AboutItem>
          ))}
        </Section>

        <Section>
          <SectionHeader>
            <SectionHeading>Mission Statement</SectionHeading>
          </SectionHeader>
          <ContentTextarea
            value={mission}
            rows={4}
            placeholder="Enter the mission statement..."
            onChange={e => setMission(e.target.value)}
          />
        </Section>

        <Section>
          <SectionHeader>
            <SectionHeading>Leadership Team</SectionHeading>
            <SectionActions>
              <AddButton onClick={() => addItem(leaders, setLeaders, { 
                title: '', description: '', bio: '', image_url: '' 
              })}>
                <FiPlus /> Add Leader
              </AddButton>
            </SectionActions>
          </SectionHeader>
          
          {leaders.map((leader, idx) => (
            <LeaderCard key={idx} className="leaders-item">
              <FormGroup>
                <Label>Name/Title</Label>
                <ContentInput
                  value={leader.title}
                  placeholder="Leader name/title"
                  onChange={e => updateList(leaders, setLeaders, idx, 'title', e.target.value)}
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Position/Description</Label>
                <ContentInput
                  value={leader.description}
                  placeholder="Position description"
                  onChange={e => updateList(leaders, setLeaders, idx, 'description', e.target.value)}
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Bio</Label>
                <ContentTextarea
                  value={leader.bio}
                  rows={3}
                  placeholder="Leader bio"
                  onChange={e => updateList(leaders, setLeaders, idx, 'bio', e.target.value)}
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Profile Image</Label>
                <ImageUploadContainer>
                  <ContentInput
                    value={leader.image_url}
                    placeholder="Image URL"
                    onChange={e => updateList(leaders, setLeaders, idx, 'image_url', e.target.value)}
                  />
                  <ImageUploadButton>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleImageUpload(e, (url) => {
                        updateList(leaders, setLeaders, idx, 'image_url', url);
                      })} 
                      style={{ display: 'none' }} 
                      id={`leader-image-${idx}`}
                    />
                    <label htmlFor={`leader-image-${idx}`}>
                      <FiImage /> Upload
                    </label>
                  </ImageUploadButton>
                </ImageUploadContainer>
                {leader.image_url && (
                  <ImagePreview src={leader.image_url} alt="Preview" />
                )}
              </FormGroup>
              
              <DeleteButton onClick={() => setLeaders(leaders.filter((_, i) => i !== idx))}>
                <FiTrash2 /> Remove Leader
              </DeleteButton>
            </LeaderCard>
          ))}
        </Section>

        <Section>
          <SectionHeader>
            <SectionHeading>Advisory Images</SectionHeading>
            <SectionActions>
              <AddButton onClick={() => addItem(advisoryImages, setAdvisoryImages, '')}>
                <FiPlus /> Add Image
              </AddButton>
            </SectionActions>
          </SectionHeader>
          
          {advisoryImages.map((img, idx) => (
            <AboutItem key={idx} className="advisory-item">
              <ImageUploadContainer>
                <ContentInput
                  value={img}
                  placeholder="Image URL"
                  onChange={e => {
                    const updated = [...advisoryImages];
                    updated[idx] = e.target.value;
                    setAdvisoryImages(updated);
                  }}
                />
                <ImageUploadButton>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => handleImageUpload(e, (url) => {
                      const updated = [...advisoryImages];
                      updated[idx] = url;
                      setAdvisoryImages(updated);
                    })} 
                    style={{ display: 'none' }} 
                    id={`advisory-image-${idx}`}
                  />
                  <label htmlFor={`advisory-image-${idx}`}>
                    <FiImage /> Upload
                  </label>
                </ImageUploadButton>
              </ImageUploadContainer>
              {img && (
                <ImagePreview src={img} alt="Preview" />
              )}
              <DeleteButton onClick={() => setAdvisoryImages(advisoryImages.filter((_, i) => i !== idx))}>
                <FiTrash2 />
              </DeleteButton>
            </AboutItem>
          ))}
        </Section>

        <Section>
          <SectionHeader>
            <SectionHeading>Tributes</SectionHeading>
            <SectionActions>
              <AddButton onClick={() => addItem(tributes, setTributes, { 
                name: '', dates: '', quote: '', image_url: '' 
              })}>
                <FiPlus /> Add Tribute
              </AddButton>
            </SectionActions>
          </SectionHeader>
          
          {tributes.map((tribute, idx) => (
            <LeaderCard key={idx} className="tributes-item">
              <FormGroup>
                <Label>Name</Label>
                <ContentInput
                  value={tribute.name}
                  placeholder="Tribute name"
                  onChange={e => updateList(tributes, setTributes, idx, 'name', e.target.value)}
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Dates</Label>
                <ContentInput
                  value={tribute.dates}
                  placeholder="Birth/Death dates"
                  onChange={e => updateList(tributes, setTributes, idx, 'dates', e.target.value)}
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Quote</Label>
                <ContentTextarea
                  value={tribute.quote}
                  rows={2}
                  placeholder="Memorable quote"
                  onChange={e => updateList(tributes, setTributes, idx, 'quote', e.target.value)}
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Image</Label>
                <ImageUploadContainer>
                  <ContentInput
                    value={tribute.image_url}
                    placeholder="Image URL"
                    onChange={e => updateList(tributes, setTributes, idx, 'image_url', e.target.value)}
                  />
                  <ImageUploadButton>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleImageUpload(e, (url) => {
                        updateList(tributes, setTributes, idx, 'image_url', url);
                      })} 
                      style={{ display: 'none' }} 
                      id={`tribute-image-${idx}`}
                    />
                    <label htmlFor={`tribute-image-${idx}`}>
                      <FiImage /> Upload
                    </label>
                  </ImageUploadButton>
                </ImageUploadContainer>
                {tribute.image_url && (
                  <ImagePreview src={tribute.image_url} alt="Preview" />
                )}
              </FormGroup>
              
              <DeleteButton onClick={() => setTributes(tributes.filter((_, i) => i !== idx))}>
                <FiTrash2 /> Remove Tribute
              </DeleteButton>
            </LeaderCard>
          ))}
        </Section>
      </ContentSection>

      <ActionBar>
        <SaveButton onClick={handleSubmit} disabled={saving || imageUploading}>
          {saving ? <FiRefreshCw className="spin" /> : <FiSave />}
          {saving ? ' Saving...' : ' Save All Changes'}
        </SaveButton>
        <ResetButton onClick={loadData} disabled={saving || imageUploading}>
          <FiRefreshCw /> Reset Changes
        </ResetButton>
      </ActionBar>
    </AdminContainer>
  );
};

export default AdminAbout;

/***** Enhanced Styled Components *****/
const AdminContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background: ${COLORS.neutralDark};
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
`;

const Header = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${COLORS.accentGold};
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: ${COLORS.neutralLight};
  font-size: 1rem;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Section = styled.div`
  background: ${COLORS.neutralDarker};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${COLORS.neutralMid};
`;

const SectionHeading = styled.h2`
  font-size: 1.5rem;
  color: ${COLORS.accentYellow};
  margin: 0;
`;

const SectionActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const AboutItem = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: flex-start;
`;

const LeaderCard = styled.div`
  background: ${COLORS.neutralMid};
  border-radius: 6px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${COLORS.neutralLight};
  font-size: 0.9rem;
  font-weight: 500;
`;

const ContentInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${COLORS.neutralLight};
  border-radius: 4px;
  background: ${COLORS.neutralDark};
  color: ${COLORS.white};
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${COLORS.accentYellow};
    box-shadow: 0 0 0 2px rgba(210, 168, 50, 0.2);
  }
`;

const ContentTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${COLORS.neutralLight};
  border-radius: 4px;
  background: ${COLORS.neutralDark};
  color: ${COLORS.white};
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${COLORS.accentYellow};
    box-shadow: 0 0 0 2px rgba(210, 168, 50, 0.2);
  }
`;

const ImageUploadContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const ImageUploadButton = styled.div`
  padding: 0.75rem 1rem;
  background: ${COLORS.primary};
  color: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background: ${COLORS.primaryDark};
  }

  label {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const ImagePreview = styled.img`
  max-width: 150px;
  max-height: 150px;
  border-radius: 4px;
  border: 1px solid ${COLORS.neutralLight};
  margin-top: 0.5rem;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: ${COLORS.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${COLORS.primaryDark};
  }
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: transparent;
  color: ${COLORS.accentRed};
  border: 1px solid ${COLORS.accentRed};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 0.5rem;

  &:hover {
    background: rgba(255, 80, 80, 0.1);
  }
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid ${COLORS.neutralMid};
`;

const SaveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: ${COLORS.accentGold};
  color: ${COLORS.black};
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #d2a832;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .spin {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    100% { transform: rotate(360deg); }
  }
`;

const ResetButton = styled(SaveButton)`
  background: ${COLORS.neutralMid};
  color: ${COLORS.white};

  &:hover {
    background: ${COLORS.neutralLight};
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  gap: 1rem;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${COLORS.neutralLight};
  border-top: 4px solid ${COLORS.accentGold};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  color: ${COLORS.neutralLight};
  font-size: 1.2rem;
`;