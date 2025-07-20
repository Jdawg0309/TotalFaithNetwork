import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import axios from 'axios';
import { useCookies } from 'react-cookie';

import {
  GlobalStyle, StarryBackground, Star, PageContainer, VideoPlayer, VideoTitle,
  VideoInfo, ChannelAvatar, VideoText, VideoTitleBig, StatsRow, Views, Dot,
  Timestamp, Description, GridSection, GridTitle, Grid, PlayIcon, Card,
  ThumbnailWrapper, Thumbnail, ThumbnailPlaceholder, LoadingSpinner, DurationBadge,
  InfoRow, SmallAvatar, InfoText, CardTitle, ChannelNameSmall, StatsSmall,
  ErrorMessage, RetryButton
} from '../../styles/PortfolioStyles';

import {
  CommentsSection, SectionTitle, CommentList, CommentItem, CommentAuthor,
  CommentDate, CommentText, CommentForm, CommentTextarea, SubmitCommentButton
} from '../../styles/PortfolioStyles';

// Constants
const API_BASE_URL = typeof window !== 'undefined' && window.location.origin
  ? window.location.origin
  : 'http://localhost:5000';

const STARS_COUNT = 150;
const THUMBNAIL_TIMEOUT = 10000;
const SESSION_COOKIE_OPTIONS = { 
  path: '/', 
  maxAge: 30 * 24 * 60 * 60,
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production'
};

// Configure axios
axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000;

const Portfolio = () => {
  // State management
  const [cookies, setCookie] = useCookies(['sessionId']);
  const [projects, setProjects] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [thumbnails, setThumbnails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [togglingLike, setTogglingLike] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [postingComment, setPostingComment] = useState(false);
  const [commentError, setCommentError] = useState(null);

  // Animation
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 200, friction: 20, duration: 800 }
  });

  // Memoized utility functions
  const formatDate = useMemo(() => (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }, []);

  const formatDuration = useMemo(() => (duration) => {
    if (typeof duration !== 'number') return '0:00';
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  }, []);

  // Data fetching
  const fetchVideos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/videos`, { 
        params: { page: 1, limit: 100 },
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (data?.videos?.length) {
        setProjects(data.videos);
        setSelectedVideo(data.videos[0]);
      } else {
        setError('No videos available');
      }
    } catch (err) {
      console.error('Failed to fetch videos:', err);
      setError(err.response?.data?.message || 'Failed to load videos. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchLikes = useCallback(async (videoId) => {
    if (!videoId) return;
    
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/video-likes/${videoId}`);
      setLikes(data.likes || 0);
      setLiked(!!data.liked);
    } catch (err) {
      console.error('Failed to fetch likes:', err);
      // Don't show error to user for likes
    }
  }, []);

  const fetchComments = useCallback(async (videoId) => {
    if (!videoId) return;
    
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/videos/${videoId}/comments`);
      const commentsArray = Array.isArray(data)
        ? data
        : Array.isArray(data?.comments)
          ? data.comments
          : [];
      setComments(commentsArray);
      setCommentError(null);
    } catch (err) {
      console.error('Failed to fetch comments:', err);
      setComments([]);
      setCommentError('Failed to load comments');
    }
  }, []);

  // Thumbnail generation
  const getVideoThumbnail = useCallback((videoUrl) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      video.src = videoUrl;
      video.crossOrigin = 'anonymous';
      video.muted = true;
      video.preload = 'metadata';
      
      let timeout = setTimeout(() => {
        cleanup();
        reject(new Error('Thumbnail generation timed out'));
      }, THUMBNAIL_TIMEOUT);

      const cleanup = () => {
        clearTimeout(timeout);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('seeked', handleSeeked);
        video.removeEventListener('error', handleError);
      };

      const handleLoadedMetadata = () => {
        canvas.width = 320;
        canvas.height = video.videoHeight / (video.videoWidth / 320);
        video.currentTime = Math.min(2, video.duration * 0.1);
      };

      const handleSeeked = () => {
        try {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          cleanup();
          resolve(canvas.toDataURL('image/jpeg'));
        } catch (err) {
          cleanup();
          reject(err);
        }
      };

      const handleError = (e) => {
        cleanup();
        reject(e);
      };

      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('seeked', handleSeeked);
      video.addEventListener('error', handleError);
    });
  }, []);

  const generateThumbnails = useCallback(async () => {
    if (!projects.length) return;
    
    const newThumbs = {};
    const thumbnailPromises = projects.map(async (video) => {
      try {
        newThumbs[video.id] = video.thumbnail_url 
          ? video.thumbnail_url 
          : await getVideoThumbnail(video.video_url);
      } catch (err) {
        console.error(`Failed to generate thumbnail for video ${video.id}:`, err);
        newThumbs[video.id] = video.avatar_url || '';
      }
    });

    await Promise.all(thumbnailPromises);
    setThumbnails(newThumbs);
  }, [projects, getVideoThumbnail]);

  // Effects
  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  useEffect(() => {
    if (selectedVideo) {
      fetchLikes(selectedVideo.id);
      fetchComments(selectedVideo.id);
    }
  }, [selectedVideo, fetchLikes, fetchComments]);

  useEffect(() => {
    if (projects.length) {
      generateThumbnails();
    }
  }, [projects, generateThumbnails]);

  // Event handlers
  const handleLikeToggle = async () => {
    if (!selectedVideo || togglingLike) return;
    
    setTogglingLike(true);
    try {
      let response;
      
      if (liked) {
        response = await axios.delete(`${API_BASE_URL}/api/video-likes/${selectedVideo.id}`);
      } else {
        response = await axios.post(`${API_BASE_URL}/api/video-likes/${selectedVideo.id}`);
        if (response.data?.sessionId) {
          setCookie('sessionId', response.data.sessionId, SESSION_COOKIE_OPTIONS);
        }
      }
      
      setLikes(response.data?.likes || 0);
      setLiked(!liked);
    } catch (err) {
      console.error('Failed to toggle like:', err);
    } finally {
      setTogglingLike(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim() || !selectedVideo || postingComment) return;
    
    setPostingComment(true);
    setCommentError(null);
    
    try {
      await axios.post(
        `${API_BASE_URL}/api/videos/${selectedVideo.id}/comments`, 
        { content: newComment },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      setNewComment('');
      await fetchComments(selectedVideo.id);
    } catch (err) {
      console.error('Failed to post comment:', err);
      setCommentError(err.response?.data?.message || 'Failed to post comment. Please try again.');
    } finally {
      setPostingComment(false);
    }
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    // Scroll to top when new video is selected
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Group videos by category
  const groupedVideos = useMemo(() => {
    return projects.reduce((acc, video) => {
      const category = video.category_name || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(video);
      return acc;
    }, {});
  }, [projects]);

  // Render loading state
  if (loading) {
    return (
      <PageContainer>
        <LoadingSpinner large />
        <p>Loading portfolio...</p>
      </PageContainer>
    );
  }

  // Render error state
  if (error) {
    return (
      <PageContainer>
        <ErrorMessage>
          {error}
          <RetryButton onClick={fetchVideos}>Retry</RetryButton>
        </ErrorMessage>
      </PageContainer>
    );
  }

  // Render no videos state
  if (!selectedVideo || !projects.length) {
    return (
      <PageContainer>
        <ErrorMessage>No videos found</ErrorMessage>
      </PageContainer>
    );
  }

  return (
    <>
      <GlobalStyle />
      <StarryBackground>
        {Array.from({ length: STARS_COUNT }).map((_, index) => (
          <Star
            key={index}
            size={Math.random() * 3 + 1}
            left={`${Math.random() * 100}%`}
            top={`${Math.random() * 100}%`}
            delay={Math.random() * 5}
            duration={Math.random() * 3 + 2}
          />
        ))}
      </StarryBackground>

      <PageContainer>
        {/* Main Video Section */}
        <VideoTitle>{selectedVideo.title}</VideoTitle>
        <VideoPlayer 
          controls 
          poster={thumbnails[selectedVideo.id]}
          key={selectedVideo.id} // Force re-render when video changes
        >
          <source src={selectedVideo.video_url} type="video/mp4" />
          Your browser does not support the video tag.
        </VideoPlayer>

        <VideoInfo>
          <ChannelAvatar 
            src={selectedVideo.avatar_url} 
            alt={selectedVideo.channel || 'Channel avatar'}
            onError={(e) => {
              e.target.src = '/default-avatar.png';
            }}
          />
          <VideoText>
            <VideoTitleBig>{selectedVideo.title}</VideoTitleBig>
            <StatsRow>
              <Views>{selectedVideo.views || 0} views</Views>
              <Dot>•</Dot>
              <Timestamp>{formatDate(selectedVideo.created_at)}</Timestamp>
              <Dot>•</Dot>
              <LikeButton 
                onClick={handleLikeToggle} 
                disabled={togglingLike} 
                liked={liked}
                aria-label={liked ? 'Unlike this video' : 'Like this video'}
              >
                {liked ? '❤️' : '🤍'} {likes}
              </LikeButton>
            </StatsRow>
            <Description>
              {selectedVideo.description || 'No description available'}
            </Description>
          </VideoText>
        </VideoInfo>

        {/* Comments Section */}
        <CommentsSection>
          <SectionTitle>Comments ({comments.length})</SectionTitle>
          
          {commentError && (
            <ErrorMessage small>{commentError}</ErrorMessage>
          )}
          
          {comments.length === 0 ? (
            <p>No comments yet. Be the first to comment!</p>
          ) : (
            <CommentList>
              {comments.map(comment => (
                <CommentItem key={comment.id}>
                  <CommentAuthor>Anonymous</CommentAuthor>
                  <CommentDate>
                    {new Date(comment.created_at).toLocaleString()}
                  </CommentDate>
                  <CommentText>{comment.content}</CommentText>
                </CommentItem>
              ))}
            </CommentList>
          )}
          
          <CommentForm onSubmit={handleCommentSubmit}>
            <CommentTextarea
              rows="3"
              placeholder="Write an anonymous comment…"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={postingComment}
              maxLength="500"
            />
            <SubmitCommentButton 
              type="submit" 
              disabled={postingComment || !newComment.trim()}
            >
              {postingComment ? 'Posting…' : 'Submit Comment'}
            </SubmitCommentButton>
            {newComment.length > 400 && (
              <small>{500 - newComment.length} characters remaining</small>
            )}
          </CommentForm>
        </CommentsSection>

        {/* Video Grid Sections */}
        {Object.entries(groupedVideos).map(([category, videos]) => (
          <animated.div key={category} style={fadeIn}>
            <GridSection>
              <GridTitle>{category}</GridTitle>
              <Grid>
                {videos.map(video => (
                  <Card 
                    key={video.id} 
                    onClick={() => handleVideoSelect(video)}
                    aria-label={`Select video: ${video.title}`}
                  >
                    <ThumbnailWrapper>
                      {thumbnails[video.id] ? (
                        <Thumbnail 
                          src={thumbnails[video.id]} 
                          alt={video.title}
                          onError={(e) => {
                            e.target.src = '/default-thumbnail.jpg';
                          }}
                        />
                      ) : (
                        <ThumbnailPlaceholder>
                          <LoadingSpinner small />
                        </ThumbnailPlaceholder>
                      )}
                      <PlayIcon>▶</PlayIcon>
                      <DurationBadge>
                        {formatDuration(video.duration)}
                      </DurationBadge>
                    </ThumbnailWrapper>
                    <InfoRow>
                      <SmallAvatar 
                        src={video.avatar_url} 
                        alt={video.channel}
                        onError={(e) => {
                          e.target.src = '/default-avatar.png';
                        }}
                      />
                      <InfoText>
                        <CardTitle>{video.title}</CardTitle>
                        <ChannelNameSmall>
                          {video.channel || 'Unknown channel'}
                        </ChannelNameSmall>
                        <StatsSmall>
                          {video.views || 0} views • {formatDate(video.created_at)}
                        </StatsSmall>
                      </InfoText>
                    </InfoRow>
                  </Card>
                ))}
              </Grid>
            </GridSection>
          </animated.div>
        ))}
      </PageContainer>
    </>
  );
};

export default Portfolio;

// Styled components
const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: 1rem;
  margin-left: 8px;
  padding: 4px 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s ease;
  background-color: ${props => props.liked ? 'rgba(231, 76, 60, 0.1)' : 'transparent'};
  color: ${props => props.liked ? '#e74c3c' : '#555'};
  outline: none;

  &:hover {
    background-color: ${props =>
      props.disabled
        ? 'transparent'
        : props.liked
          ? 'rgba(231, 76, 60, 0.2)'
          : 'rgba(0, 0, 0, 0.05)'};
  }

  &:active {
    transform: ${props => props.disabled ? 'none' : 'scale(0.95)'};
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.3);
  }
`;