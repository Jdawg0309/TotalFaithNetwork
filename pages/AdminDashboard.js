import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    channel: '',
    category_id: ''
  });
  const [videoFile, setVideoFile] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [message, setMessage] = useState('');
  const [videos, setVideos] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchVideos = async () => {
    const res = await fetch('http://localhost:5000/api/videos');
    const data = await res.json();
    setVideos(data);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

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
    data.append('category_id', formData.category_id);
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
      fetchVideos();
    } catch (err) {
      console.error(err);
      setMessage('Upload failed.');
    }
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/videos/${id}`, {
      method: 'DELETE',
      headers: { Authorization: 'Bearer dummy-token-for-now' }
    });
    fetchVideos();
  };

  const handleEdit = (video) => {
    setEditingId(video.id);
    setFormData({
      title: video.title,
      description: video.description,
      channel: video.channel,
      category_id: video.category_id
    });
  };

  const handleUpdate = async () => {
    await fetch(`http://localhost:5000/api/videos/${editingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer dummy-token-for-now'
      },
      body: JSON.stringify(formData)
    });
    setEditingId(null);
    setFormData({ title: '', description: '', channel: '', category_id: '' });
    fetchVideos();
  };

  return (
    <Container>
      <h2>{editingId ? 'Edit Video' : 'Upload New Video'}</h2>
      <Form onSubmit={editingId ? (e) => { e.preventDefault(); handleUpdate(); } : handleSubmit}>
        <Input type="text" name="title" placeholder="Video Title" value={formData.title} onChange={handleChange} required />
        <Input type="text" name="channel" placeholder="Channel Name" value={formData.channel} onChange={handleChange} />
        <Input type="text" name="category_id" placeholder="Category ID" value={formData.category_id} onChange={handleChange} />
        <Textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        {!editingId && (
          <>
            <FileInput>
              <label>Choose Video:</label>
              <input type="file" accept="video/mp4" onChange={(e) => setVideoFile(e.target.files[0])} required />
            </FileInput>
            <FileInput>
              <label>Optional Avatar:</label>
              <input type="file" accept="image/*" onChange={(e) => setAvatarFile(e.target.files[0])} />
            </FileInput>
          </>
        )}
        <SubmitButton type="submit">{editingId ? 'Update' : 'Upload'}</SubmitButton>
        {message && <Message>{message}</Message>}
      </Form>

      <VideoList>
        <h3>Uploaded Videos</h3>
        {videos.map(video => (
          <VideoItem key={video.id}>
            <strong>{video.title}</strong> - {video.channel}
            <ActionButtons>
              <button onClick={() => handleEdit(video)}>Edit</button>
              <button onClick={() => handleDelete(video.id)}>Delete</button>
            </ActionButtons>
          </VideoItem>
        ))}
      </VideoList>
    </Container>
  );
};

export default AdminDashboard;

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

const VideoList = styled.div`
  margin-top: 2rem;
`;

const VideoItem = styled.div`
  background: #1a1a2e;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;

  button {
    background: #444;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 0.4rem 0.8rem;
    cursor: pointer;

    &:hover {
      background: #666;
    }
  }
`;
