import React, {
  useState,
  useEffect,
  useCallback,
  useRef
} from 'react';
import axios from 'axios';
import { useSpring } from '@react-spring/web';
import {
  FaComment, FaMusic, FaUser, FaPaperPlane
} from 'react-icons/fa';

import {
  COLORS,
  ShortsContainer,
  ShortsCard,
  ShortsVideo,
  ShortsOverlay,
  ChannelInfo,
  ChannelAvatar,
  ChannelName,
  ShortsTitle,
  MusicBadge,
  ActionsContainer,
  ActionButton,
  ActionIcon,
  ActionLabel,
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
  LoadingContainer,
  Spinner,
  LoadingText,
  ErrorContainer,
  ErrorText,
  RetryButton
} from '../../styles/ShortsStyles';

const API = window.location.origin;

axios.defaults.withCredentials = true;

export default function ShortsPage() {
  const [videos, setVideos]         = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [comments, setComments]     = useState({});
  const [newComment, setNewComment] = useState('');
  const [posting, setPosting]       = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  const videoRefs = useRef({});
  const fadeIn    = useSpring({ from:{ opacity:0 }, to:{ opacity:1 } });

  // fetch videos
  const fetchVideos = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const { data } = await axios.get(`${API}/api/videos`, {
        params: { page:1, limit:50 }
      });
      setVideos(data.videos);
    } catch (e) {
      setError('Failed to load shorts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchVideos(); }, [fetchVideos]);

  // IntersectionObserver autoplay
  useEffect(() => {
    if (!videos.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const id = e.target.dataset.id;
        if (e.isIntersecting) {
          videoRefs.current[id]?.play().catch(()=>{});
        } else {
          videoRefs.current[id]?.pause();
        }
      });
    }, { threshold: 0.75 });

    videos.forEach(v => {
      const el = videoRefs.current[v.id];
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [videos]);

  // open drawer & load comments
  const openComments = async (id) => {
    setActiveVideo(id);
    setDrawerOpen(true);
    if (!comments[id]) {
      try {
        const { data } = await axios.get(`${API}/api/videos/${id}/comments`);
        setComments(c => ({ ...c, [id]: data.comments || [] }));
      } catch {
        setComments(c => ({ ...c, [id]: [] }));
      }
    }
  };

  // post comment
  const submitComment = async e => {
    e.preventDefault();
    if (!newComment.trim() || !activeVideo) return;
    setPosting(true);
    try {
      await axios.post(`${API}/api/videos/${activeVideo}/comments`, {
        content: newComment
      });
      const updated = await axios.get(`${API}/api/videos/${activeVideo}/comments`);
      setComments(c => ({ ...c, [activeVideo]: updated.data.comments || [] }));
      setNewComment('');
    } catch {
      // ignore
    } finally {
      setPosting(false);
    }
  };

  if (loading) return (
    <LoadingContainer style={fadeIn}>
      <Spinner /><LoadingText>Loading Shorts…</LoadingText>
    </LoadingContainer>
  );
  if (error) return (
    <ErrorContainer style={fadeIn}>
      <ErrorText>{error}</ErrorText>
      <RetryButton onClick={fetchVideos}>Retry</RetryButton>
    </ErrorContainer>
  );

  return (
    <>
      <ShortsContainer style={fadeIn}>
        {videos.map(video => (
          <ShortsCard key={video.id}>
            <ShortsVideo
              data-id={video.id}
              ref={el => (videoRefs.current[video.id] = el)}
              src={`${API}${video.video_url}`}
              loop
              muted
              playsInline
            />

            <ShortsOverlay>
              <ChannelInfo>
                <ChannelAvatar
                  src={`${API}${video.avatar_url}`}
                  alt={video.channel_name}
                  onError={e=>{e.target.onerror=null; e.target.src=FaUser;}}
                />
                <ChannelName>{video.channel_name}</ChannelName>
              </ChannelInfo>

              <ShortsTitle>{video.title}</ShortsTitle>

              <MusicBadge><FaMusic /> Original Sound • {video.channel_name}</MusicBadge>
            </ShortsOverlay>

            <ActionsContainer>
              <ActionButton onClick={() => openComments(video.id)}>
                <ActionIcon><FaComment /></ActionIcon>
                <ActionLabel>{(comments[video.id]||[]).length}</ActionLabel>
              </ActionButton>
            </ActionsContainer>
          </ShortsCard>
        ))}
      </ShortsContainer>

      <CommentDrawer $open={drawerOpen} style={fadeIn}>
        <DrawerHeader>
          <h3>Comments ({(comments[activeVideo]||[]).length})</h3>
          <CloseButton onClick={()=>setDrawerOpen(false)}>×</CloseButton>
        </DrawerHeader>

        <CommentList>
          {(comments[activeVideo]||[]).map(c => (
            <CommentItem key={c.id}>
              <CommentAvatar
                src={`${API}${c.avatar_url}`}
                alt={c.username}
                onError={e=>{e.target.onerror=null; e.target.src=FaUser;}}
              />
              <CommentContent>
                <CommentAuthor>{c.username||'Anonymous'}</CommentAuthor>
                <CommentText>{c.content}</CommentText>
              </CommentContent>
            </CommentItem>
          ))}
          {(comments[activeVideo]||[]).length === 0 && (
            <p style={{ color: COLORS.neutralLight, textAlign:'center', padding:'1rem' }}>
              No comments yet.
            </p>
          )}
        </CommentList>

        <CommentForm onSubmit={submitComment}>
          <input
            value={newComment}
            onChange={e=>setNewComment(e.target.value)}
            placeholder="Add a comment…"
          />
          <button type="submit" disabled={posting}>
            {posting ? 'Posting…' : <FaPaperPlane />}
          </button>
        </CommentForm>
      </CommentDrawer>
    </>
  );
}
