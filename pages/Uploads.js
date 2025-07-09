import React, { useState } from 'react';
import styled from 'styled-components';

const Upload = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    channel: '',
    category_id: ''
  });
  const [videoFile, setVideoFile] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [message, setMessage] = useState('');
  const [categories, setCategories] = useState([]);

  React.useEffect(() => {
    fetch('http://localhost:5000/api/categories')
      .then(res => res.json())
      .then(setCategories);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      if (name === 'video') setVideoFile(files[0]);
      if (name === 'avatar') setAvatarFile(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile) return alert('Please select a video.');

    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val) data.append(key, val);
    });
    data.append('video', videoFile);
    if (avatarFile) data.append('avatar', avatarFile);

    try {
      const res = await fetch('http://localhost:5000/api/videos/upload', {
        method: 'POST',
        headers: {
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
        <Input name="title" placeholder="Video Title" value={formData.title} onChange={handleChange} required />
        <Input name="channel" placeholder="Channel Name" value={formData.channel} onChange={handleChange} />
        <Textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <Select name="category_id" value={formData.category_id} onChange={handleChange} required>
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </Select>
        <FileInput>
          <label>Choose Video:</label>
          <input type="file" name="video" accept="video/*" onChange={handleChange} required />
        </FileInput>
        <FileInput>
          <label>Optional Avatar:</label>
          <input type="file" name="avatar" accept="image/*" onChange={handleChange} />
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

const Select = styled.select`
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
