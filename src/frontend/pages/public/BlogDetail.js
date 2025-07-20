import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  BlogPageContainer,
  DetailBackLink,
  DetailHeader,
  DetailTitle,
  DetailMeta,
  PostImage,
  PostImagePlaceholder,
  PostContentWrapper,
  PostAuthor,
  PostDate,
  LikeButton,
  LoadingIndicator,
  ErrorMessage,
  RetryButton,
  EmptyState,
  CommentsSection,
  SectionTitle,
  CommentList,
  CommentItem,
  CommentAuthor,
  CommentDate,
  CommentText,
  CommentForm,
  CommentTextarea,
  SubmitCommentButton,
  DetailImage,
  DetailContent
} from '../../styles/BlogPostStyles';
import { FiUser, FiCalendar, FiArrowLeft } from 'react-icons/fi';
import { format } from 'date-fns';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || window.location.origin;

export default function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [posting, setPosting] = useState(false);

  const fetchPost = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/posts/${id}`);
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      const data = await res.json();
      setPost(data);
    } catch (err) {
      setError(err.message || 'Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const fetchLikes = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/post-likes/${id}`);
      if (!res.ok) throw new Error('Could not fetch likes');
      const data = await res.json();
      setLikes(data.likes);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLike = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/post-likes/${id}`, { method: 'POST' });
      fetchLikes();
    } catch (err) {
      console.error(err);
    }
  };

  const fetchComments = async () => {
    setCommentsLoading(true);
    setCommentsError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/posts/${id}/comments`);
      if (!res.ok) throw new Error('Could not fetch comments');
      const data = await res.json();
      setComments(Array.isArray(data) ? data : []);
    } catch (err) {
      setCommentsError(err.message || 'Failed to load comments');
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setPosting(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/posts/${id}/comments`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: newComment }),
        }
      );
      if (!res.ok) throw new Error('Failed to post comment');
      setNewComment('');
      fetchComments();
    } catch (err) {
      console.error(err);
    } finally {
      setPosting(false);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchLikes();
    fetchComments();
  }, [id]);

  if (loading) {
    return (
      <BlogPageContainer>
        <LoadingIndicator>
          <div className="spinner" />
          <p>Loading post…</p>
        </LoadingIndicator>
      </BlogPageContainer>
    );
  }

  if (error) {
    return (
      <BlogPageContainer>
        <ErrorMessage>
          <p>{error}</p>
          <RetryButton onClick={fetchPost}>Retry</RetryButton>
        </ErrorMessage>
      </BlogPageContainer>
    );
  }

  if (!post) {
    return (
      <BlogPageContainer>
        <EmptyState>
          <div className="empty-icon">📭</div>
          <h3>Post not found</h3>
          <p>This post doesn't exist or has been removed.</p>
          <Link to="/blogs">
            <RetryButton>Back to blog list</RetryButton>
          </Link>
        </EmptyState>
      </BlogPageContainer>
    );
  }

  return (
    <BlogPageContainer>
      <DetailBackLink to="/blog">
        <FiArrowLeft /> Back to all posts
      </DetailBackLink>

      <DetailHeader>
        <DetailTitle>{post.title}</DetailTitle>
        
        <DetailMeta>
          <PostAuthor>
            <FiUser size={18} />
            <span>{post.author || 'Admin'}</span>
          </PostAuthor>
          
          <PostDate>
            <FiCalendar size={18} />
            <span>{format(new Date(post.created_at), 'MMM dd, yyyy')}</span>
          </PostDate>
          
          <LikeButton onClick={handleLike}>
            👍 {likes}
          </LikeButton>
        </DetailMeta>
      </DetailHeader>

      {post.image_url ? (
        <DetailImage>
          <img 
            src={`${API_BASE_URL}${post.image_url}`} 
            alt={post.title} 
            loading="eager"
          />
        </DetailImage>
      ) : (
        <PostImagePlaceholder>
          <span>🖼️</span>
        </PostImagePlaceholder>
      )}

      <DetailContent dangerouslySetInnerHTML={{ __html: post.content }} />

      <CommentsSection>
        <SectionTitle>Comments ({comments.length})</SectionTitle>

        {commentsError ? (
          <ErrorMessage>{commentsError}</ErrorMessage>
        ) : commentsLoading ? (
          <LoadingIndicator>
            <div className="spinner" />
            <p>Loading comments...</p>
          </LoadingIndicator>
        ) : comments.length === 0 ? (
          <p>No comments yet. Be the first to share your thoughts!</p>
        ) : (
          <CommentList>
            {comments.map(c => (
              <CommentItem key={c.id || Math.random()}>
                <CommentAuthor>{c.author || 'Anonymous'}</CommentAuthor>
                <CommentDate>
                  {format(new Date(c.created_at || c.date), 'MMM dd, yyyy • h:mm a')}
                </CommentDate>
                <CommentText>{c.content}</CommentText>
              </CommentItem>
            ))}
          </CommentList>
        )}

        <CommentForm onSubmit={handleCommentSubmit}>
          <h3>Share your thoughts</h3>
          <CommentTextarea
            rows="4"
            placeholder="Write your comment here..."
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            disabled={posting}
          />
          <SubmitCommentButton type="submit" disabled={posting || !newComment.trim()}>
            {posting ? 'Posting…' : 'Submit Comment'}
          </SubmitCommentButton>
        </CommentForm>
      </CommentsSection>
    </BlogPageContainer>
  );
}