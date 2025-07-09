import React, { useState } from 'react';
import styled from 'styled-components';

const Upload = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    channel: '',
  });
  const [videoFile, setVideoFile] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile) return alert('Please select a video.');

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('channel', formData.channel);
    data.append('video', videoFile);
    if (avatarFile) data.append('avatar', avatarFile);

    try {
      const res = await fetch('http://localhost:5000/api/videos/upload', {
        method: 'POST',
        headers: {
          // Replace with real token if auth is enforced
          Authorization: 'Bearer dummy-token-for-now'
        },
        body: data
      });

      const text = await res.text();
      setMessage(text);
    } catch (err) {
      console.error(err);
      setMessage('Upload failed.');
    }
  };

  return (
    <Container>
      <h2>Upload New Video</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="title"
          placeholder="Video Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="channel"
          placeholder="Channel Name"
          value={formData.channel}
          onChange={handleChange}
        />
        <Textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <FileInput>
          <label>Choose Video:</label>
          <input type="file" accept="video/mp4" onChange={(e) => setVideoFile(e.target.files[0])} required />
        </FileInput>
        <FileInput>
          <label>Optional Avatar:</label>
          <input type="file" accept="image/*" onChange={(e) => setAvatarFile(e.target.files[0])} />
        </FileInput>
        <SubmitButton type="submit">Upload</SubmitButton>
        {message && <Message>{message}</Message>}
      </Form>
    </Container>
  );
};

export default Upload;

// Styled components
const Container = styled.div`
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem;
  background: #0a0a12;
  color: #e0e0ff;
  border-radius: 12px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border-radius: 8px;
  border: none;
`;

const Textarea = styled.textarea`
  padding: 0.8rem;
  font-size: 1rem;
  border-radius: 8px;
  border: none;
  resize: vertical;
  min-height: 100px;
`;

const FileInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.9rem;
`;

const SubmitButton = styled.button`
  background: #ffcc00;
  color: #000;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
`;

const Message = styled.p`
  margin-top: 1rem;
  color: #4caf50;
  font-weight: bold;
`;
