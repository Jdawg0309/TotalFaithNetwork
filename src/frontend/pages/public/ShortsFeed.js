import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { useSpring, animated } from '@react-spring/web';
import { FaSearch, FaHeart, FaComment, FaShare, FaEllipsisH, FaMusic, FaPaperPlane, FaUser } from 'react-icons/fa';

// Import the Shorts styles
import {
  COLORS,
  ShortsContainer,
  ShortsHeader,
  ShortsLogo,
  SearchButton,
  ShortsCard,
  ShortsVideo,
  ShortsOverlay,
  ChannelInfo,
  ChannelAvatar,
  ChannelName,
  ShortsTitle,
  MusicBadge,
  ActionsContainer,
  ActionIcon,
  ActionLabel,
  LikeButton,
  CommentButton,
  ShareButton,
  MoreButton,
  CommentDrawer,
  DrawerHeader,
  CloseButton,
  CommentList,
  CommentItem,
  CommentAvatar,
  CommentContent,
  CommentAuthor,
  CommentText,
  CommentForm,
  CommentInput,
  SubmitButton,
  LoadingContainer,
  Spinner,
  LoadingText,
  ErrorContainer,
  ErrorText,
  RetryButton
} from '../../styles/ShortsStyles';

const API_BASE_URL = typeof window !== 'undefined' && window.location.origin
  ? window.location.origin
  : 'http://localhost:5000';


axios.defaults.withCredentials = true;

export default function ReelsPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState({});
  const [likedStatus, setLikedStatus] = useState({});
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [posting, setPosting] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);
  const videoRefs = useRef({});
  
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { tension: 200, friction: 20, duration: 800 }
  });

  // Fetch all reels
  const fetchReels = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/videos`, {
        params: { page: 1, limit: 50 }
      });
      setVideos(data.videos);
      
      // Initialize states
      const initialLikes = {};
      const initialLikedStatus = {};
      const initialComments = {};
      
      data.videos.forEach(video => {
        initialLikes[video.id] = 0;
        initialLikedStatus[video.id] = false;
        initialComments[video.id] = [];
      });
      
      setLikes(initialLikes);
      setLikedStatus(initialLikedStatus);
      setComments(initialComments);
      
      // Set first video as playing
      if (data.videos.length > 0) {
        setPlayingVideo(data.videos[0].id);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load reels. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { 
    fetchReels(); 
  }, [fetchReels]);

  // Fetch likes for a video
  const fetchLikes = useCallback(async (id) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/video-likes/${id}`);
      setLikes(prev => ({ ...prev, [id]: data.likes }));
      setLikedStatus(prev => ({ ...prev, [id]: data.liked }));
    } catch (e) {
      console.error(e);
      setError('Failed to load likes');
    }
  }, []);

  // Fetch comments for a video
  const fetchComments = useCallback(async (id) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/videos/${id}/comments`);
      const commentsData = Array.isArray(data) ? data : (data.comments || []);
      setComments(prev => ({ ...prev, [id]: commentsData }));
    } catch (e) {
      console.error(e);
      setComments(prev => ({ ...prev, [id]: [] }));
      setError('Failed to load comments');
    }
  }, []);

  // Toggle like for a video
  const toggleLike = async (id) => {
    try {
      const currentLiked = likedStatus[id];
      const res = currentLiked
        ? await axios.delete(`${API_BASE_URL}/api/video-likes/${id}`)
        : await axios.post(`${API_BASE_URL}/api/video-likes/${id}`);
      
      setLikes(prev => ({ ...prev, [id]: res.data.likes }));
      setLikedStatus(prev => ({ ...prev, [id]: !currentLiked }));
    } catch (e) {
      console.error(e);
      setError('Failed to update like');
    }
  };

  // Submit a comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !currentVideoId) return;
    
    setPosting(true);
    try {
      await axios.post(
        `${API_BASE_URL}/api/videos/${currentVideoId}/comments`,
        { content: newComment }
      );
      
      setNewComment('');
      // Refresh comments
      fetchComments(currentVideoId);
    } catch (e) {
      console.error(e);
      setError('Failed to post comment');
    } finally {
      setPosting(false);
    }
  };

  // Handle video visibility for autoplay
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const videoId = entry.target.dataset.videoid;
          if (entry.isIntersecting) {
            // Play the video when it's in view
            if (videoRefs.current[videoId]) {
              videoRefs.current[videoId].play().catch(e => {
                console.log("Autoplay prevented:", e);
              });
              setPlayingVideo(videoId);
            }
          } else {
            // Pause the video when it's not in view
            if (videoRefs.current[videoId]) {
              videoRefs.current[videoId].pause();
            }
          }
        });
      },
      { threshold: 0.8 } // When 80% of video is visible
    );

    // Observe all video elements
    Object.values(videoRefs.current).forEach(video => {
      if (video) {
        observer.observe(video);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [videos]);

  // Open comments drawer for a specific video
  const openComments = (videoId) => {
    setCurrentVideoId(videoId);
    setCommentsOpen(true);
    
    // Fetch comments if not already loaded
    if (!comments[videoId] || comments[videoId].length === 0) {
      fetchComments(videoId);
    }
  };

  if (loading) return (
    <LoadingContainer style={fadeIn}>
      <Spinner />
      <LoadingText>Loading reels...</LoadingText>
    </LoadingContainer>
  );
  
  if (error) return (
    <ErrorContainer style={fadeIn}>
      <ErrorText>{error}</ErrorText>
      <RetryButton onClick={fetchReels}>Try Again</RetryButton>
    </ErrorContainer>
  );
  
  if (!videos || videos.length === 0) return (
    <ErrorContainer style={fadeIn}>
      <ErrorText>No reels found</ErrorText>
      <RetryButton onClick={fetchReels}>Reload</RetryButton>
    </ErrorContainer>
  );

  return (
    <>
      <ShortsContainer>

        
        {videos.map(video => (
          <ShortsCard key={video.id}>
            <ShortsVideo 
              ref={el => videoRefs.current[video.id] = el}
              data-videoid={video.id}
              controls={false}
              poster={`${API_BASE_URL}${video.thumbnail_url}`}
              loop
              muted={false}
              playsInline
            >
              <source src={`${API_BASE_URL}${video.video_url}`} type="video/mp4" />
            </ShortsVideo>
            
            <ShortsOverlay>
              <ChannelInfo>
                <ChannelAvatar>
                  <img 
                    src={`${API_BASE_URL}${video.avatar_url}`} 
                    alt={video.channel_name} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.parentNode.innerHTML = '<FaUser />';
                    }}
                  />
                </ChannelAvatar>
                <ChannelName>{video.channel_name}</ChannelName>
              </ChannelInfo>
              
              <ShortsTitle>{video.title}</ShortsTitle>
              
              <MusicBadge>
                <FaMusic /> Original Sound - {video.channel_name}
              </MusicBadge>
            </ShortsOverlay>
            
            <ActionsContainer>
              
              <CommentButton onClick={() => openComments(video.id)}>
                <ActionIcon>
                  <FaComment />
                </ActionIcon>
                <ActionLabel>{comments[video.id]?.length || 0}</ActionLabel>
              </CommentButton>

            </ActionsContainer>
          </ShortsCard>
        ))}
      </ShortsContainer>
      
      <CommentDrawer $open={commentsOpen}>
        <DrawerHeader>
          <h3>Comments ({comments[currentVideoId]?.length || 0})</h3>
          <CloseButton onClick={() => setCommentsOpen(false)}>×</CloseButton>
        </DrawerHeader>
        
        <CommentList>
          {comments[currentVideoId]?.map(comment => (
            <CommentItem key={comment.id}>
              <CommentAvatar>
                {comment.avatar_url ? (
                  <img 
                    src={`${API_BASE_URL}${comment.avatar_url}`} 
                    alt={comment.username}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.parentNode.innerHTML = '<FaUser />';
                    }}
                  />
                ) : <FaUser />}
              </CommentAvatar>
              <CommentContent>
                <CommentAuthor>{comment.username || 'Anonymous'}</CommentAuthor>
                <CommentText>{comment.content}</CommentText>
              </CommentContent>
            </CommentItem>
          ))}
          
          {(!comments[currentVideoId] || comments[currentVideoId].length === 0) && (
            <p style={{ color: COLORS.neutralLight, textAlign: 'center', padding: '1rem' }}>
              No comments yet. Be the first to comment!
            </p>
          )}
        </CommentList>
        
        <CommentForm onSubmit={handleCommentSubmit}>
          <CommentInput 
            value={newComment} 
            onChange={e => setNewComment(e.target.value)} 
            placeholder="Add a comment..." 
          />
          <SubmitButton type="submit" disabled={posting}>
            {posting ? 'Posting...' : 'Post'}
          </SubmitButton>
        </CommentForm>
      </CommentDrawer>
    </>
  );
}