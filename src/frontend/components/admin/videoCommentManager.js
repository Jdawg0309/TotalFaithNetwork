// src/components/admin/VideoCommentsManager.js
import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_BASE_URL } from '../../pages/public/constants';

const VideoCommentsManager = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('authToken');
      const { data } = await axios.get(
        `${API_BASE_URL}/api/videos/${videoId}/comments/admin`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // backend returns { comments: [...] }
      setComments(data.comments);
    } catch (err) {
      console.error(err);
      setError('Failed to load comments');
      toast.error('Could not fetch comments');
    } finally {
      setLoading(false);
    }
  }, [videoId]);

  const handleDelete = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return;
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(
        `${API_BASE_URL}/api/videos/${videoId}/comments/admin/${commentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Comment deleted');
      fetchComments();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete comment');
    }
  };

  useEffect(() => {
    if (videoId) fetchComments();
  }, [videoId, fetchComments]);

  if (loading) return <Centered>Loading comments…</Centered>;
  if (error)   return <Centered>Error: {error}</Centered>;
  if (!comments.length) return <Centered>No comments to moderate.</Centered>;

  return (
    <Container>
      <Header>Comments for Video #{videoId}</Header>
      <List>
        {comments.map(c => (
          <CommentCard key={c.id}>
            <InfoRow>
              <CommentDate>{new Date(c.created_at).toLocaleString()}</CommentDate>
            </InfoRow>
            <CommentText>{c.content}</CommentText>
            <Footer>
              <Author>
                {c.author_email || 'Anonymous'}{' '}
                {c.session_id && <small>(session)</small>}
              </Author>
              <DeleteButton onClick={() => handleDelete(c.id)}>
                Delete
              </DeleteButton>
            </Footer>
          </CommentCard>
        ))}
      </List>
    </Container>
  );
};

export default VideoCommentsManager;

/* === Styled Components === */
const Centered = styled.div`
  padding: 2rem;
  text-align: center;
  color: #555;
`;

const Container = styled.div`
  padding: 1rem;
  background: #fafafa;
  border-radius: 4px;
`;

const Header = styled.h2`
  margin-bottom: 1rem;
  color: #333;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CommentCard = styled.div`
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  padding: 1rem;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
`;

const CommentDate = styled.span`
  font-size: 0.8rem;
  color: #777;
`;

const CommentText = styled.p`
  margin: 0 0 1rem;
  color: #444;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Author = styled.span`
  font-size: 0.9rem;
  color: #555;
`;

const DeleteButton = styled.button`
  background: #e53935;
  color: #fff;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s;

  &:hover {
    background: #d32f2f;
  }
`;
