import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaCalendarAlt,
  FaUserAlt,
  FaTimes,
  FaFilter,
  FaSync,
  FaImage,
  FaComments
} from 'react-icons/fa';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import debounce from 'lodash.debounce';

import {
  EditorStyles,
  BlogContainer,
  BlogHeader,
  BlogTitle,
  BlogControls,
  TabButton,
  SearchContainer,
  SearchInput,
  SearchIcon,
  ActionButton,
  PostList,
  PostCard,
  PostTitle,
  PostMeta,
  PostContent,
  PostActions,
  EmptyState,
  ModalOverlay,
  ModalContent,
  CloseButton,
  ModalTitle,
  Input,
  SubmitButton,
  FilterContainer,
  FilterLabel,
  FilterSelect,
  LoadingSpinner,
  RefreshButton,
  CharacterCount,
  ImageUploadContainer,
  ImagePreview,
  ImageUploadButton,
  ImageUploadLabel,
  RemoveImageButton,
  FileInputWrapper,
  CommentsList,
  CommentItem,
  CommentMeta,
  CommentText,
  NoComments
} from '../shared/BlogStyles';
import { API_BASE_URL, quillModules, quillFormats } from '../../pages/public/constants';

const BlogManager = () => {
  // posts state
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('newest');

  // modal for create/edit post
  const [showPostModal, setShowPostModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [contentLength, setContentLength] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // comment moderation state
  const [activeTab, setActiveTab] = useState('posts');
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [commentsError, setCommentsError] = useState(null);
  const [moderatedPostId, setModeratedPostId] = useState(null);

  // 1) Fetch posts
  const fetchPosts = useCallback(async () => {
    setLoadingPosts(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/posts`);
      if (!res.ok) throw new Error('Failed to load posts');
      const data = await res.json();
      setPosts(data);
      // Set the first post as default for comments if none selected
      if (data.length > 0 && !moderatedPostId) {
        setModeratedPostId(data[0].id);
      }
    } catch (e) {
      toast.error('Failed to load posts');
    } finally {
      setLoadingPosts(false);
    }
  }, [moderatedPostId]);

  // 2) Fetch comments (admin)
const fetchComments = useCallback(async () => {
  if (!moderatedPostId) return;

  setLoadingComments(true);
  setCommentsError(null);

  try {
    const token = localStorage.getItem('authToken');
    const res = await fetch(
      `${API_BASE_URL}/api/posts/${moderatedPostId}/comments/admin`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    if (res.status === 403) {
      throw new Error('Forbidden: you must be an admin to view these comments');
    }
    if (!res.ok) {
      throw new Error(`Error ${res.status}`);
    }

    const payload = await res.json();
    setComments(Array.isArray(payload) ? payload : []);
  } catch (err) {
    setCommentsError(err.message);
    setComments([]);
  } finally {
    setLoadingComments(false);
  }
}, [moderatedPostId]);


  // 3) Debounce search
  const debouncedSearch = useCallback(debounce(term => setSearchTerm(term), 300), []);
  const onSearchChange = e => debouncedSearch(e.target.value);

  // 4) Image preview
  const handleImageChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    setNewImage(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };
  const removeImage = () => {
    setNewImage(null);
    setImagePreview(null);
  };

  // 5) Open modals
  const openCreate = () => {
    setCurrentPost(null);
    setNewTitle('');
    setNewContent('');
    setContentLength(0);
    setNewImage(null);
    setImagePreview(null);
    setShowPostModal(true);
  };
  const openEdit = post => {
    setCurrentPost(post);
    setNewTitle(post.title);
    setNewContent(post.content);
    setContentLength(post.content.replace(/<[^>]+>/g, '').length);
    setImagePreview(post.image_url);
    setShowPostModal(true);
  };

  // 6) Save post
  const savePost = async () => {
    if (!newTitle.trim() || !newContent.trim()) {
      toast.error('Title and content required');
      return;
    }
    setIsSubmitting(true);
    const token = localStorage.getItem('authToken');
    const method = currentPost ? 'PUT' : 'POST';
    const url = currentPost
      ? `${API_BASE_URL}/api/posts/${currentPost.id}`
      : `${API_BASE_URL}/api/posts`;
    const fd = new FormData();
    fd.append('title', newTitle);
    fd.append('content', newContent);
    if (newImage) fd.append('image', newImage);
    else if (currentPost && !imagePreview) fd.append('remove_image', 'true');

    try {
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: fd
      });
      if (!res.ok) throw new Error();
      toast.success(`Post ${currentPost ? 'updated' : 'created'}`);
      setShowPostModal(false);
      fetchPosts();
    } catch {
      toast.error('Save failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 7) Delete post
  const deletePost = async id => {
    if (!window.confirm('Delete this post?')) return;
    const token = localStorage.getItem('authToken');
    try {
      const res = await fetch(`${API_BASE_URL}/api/posts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error();
      toast.success('Deleted');
      fetchPosts();
    } catch {
      toast.error('Delete failed');
    }
  };

  // 8) Delete comment
const deleteComment = async commentId => {
  if (!window.confirm('Permanently delete this comment?')) return;
  const token = localStorage.getItem('authToken');

  try {
    const res = await fetch(
      `${API_BASE_URL}/api/posts/${moderatedPostId}/comments/admin/${commentId}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || errorData.message || 'Failed to delete comment');
    }
    toast.success('Comment removed');

    setComments(prev => prev.filter(c => c.id !== commentId));
  } catch (err) {
    toast.error(err.message || 'Failed to delete comment');
  }
};


  // 9) Lifecycle
  useEffect(() => {
    fetchPosts();
    return () => debouncedSearch.cancel();
  }, [fetchPosts, debouncedSearch]);

  useEffect(() => {
    if (activeTab === 'comments') {
      fetchComments();
    }
  }, [activeTab, fetchComments]);

  // filter + sort posts
  const filtered = posts.filter(p =>
    [p.title, p.content, p.author || '']
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  const sortedPosts = filtered.sort((a, b) => {
    const da = new Date(a.created_at),
      db = new Date(b.created_at);
    return sortOption === 'newest' ? db - da : da - db;
  });

  return (
    <>
      <EditorStyles />
      <BlogContainer>
        <BlogHeader>
          <BlogTitle>Blog Manager</BlogTitle>
          <BlogControls>
            <TabButton
              active={activeTab === 'posts'}
              onClick={() => setActiveTab('posts')}
            >
              Posts
            </TabButton>
            <TabButton
              active={activeTab === 'comments'}
              onClick={() => setActiveTab('comments')}
            >
              <FaComments /> Comments
            </TabButton>
          </BlogControls>
        </BlogHeader>

        {activeTab === 'posts' ? (
          <>
            <BlogControls>
              <SearchContainer>
                <SearchIcon />
                <SearchInput
                  placeholder="Search posts…"
                  onChange={onSearchChange}
                />
              </SearchContainer>
              <FilterContainer>
                <FilterLabel>
                  <FaFilter /> Sort:
                </FilterLabel>
                <FilterSelect
                  value={sortOption}
                  onChange={e => setSortOption(e.target.value)}
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </FilterSelect>
              </FilterContainer>
              <RefreshButton onClick={fetchPosts}>
                <FaSync />
              </RefreshButton>
              <ActionButton
                variant="primary"
                size="large"
                onClick={openCreate}
              >
                <FaPlus /> New Post
              </ActionButton>
            </BlogControls>

            {loadingPosts ? (
              <EmptyState>
                <LoadingSpinner size={32} /> Loading…
              </EmptyState>
            ) : sortedPosts.length === 0 ? (
              <EmptyState>
                No posts found{' '}
                <ActionButton variant="primary" size="large" onClick={openCreate}>
                  <FaPlus /> Create one
                </ActionButton>
              </EmptyState>
            ) : (
              <PostList>
                  {sortedPosts.map(post => (
                    <PostCard key={post.id}>
                      {post.image_url && (
                        <ImagePreview
                          src={`${API_BASE_URL}${post.image_url}`}
                          alt={post.title}
                        />
                      )}
                      <PostTitle>{post.title}</PostTitle>
                      <PostMeta>
                        <div>
                          <FaCalendarAlt />{' '}
                          {new Date(post.created_at).toLocaleDateString()}
                        </div>
                        <div>
                          <FaUserAlt /> {post.author || 'Admin'}
                        </div>
                      </PostMeta>
                      <PostContent
                        dangerouslySetInnerHTML={{ __html: post.content }}
                      />
                      <PostActions>
                        <ActionButton
                          variant="edit"
                          onClick={() => openEdit(post)}
                        >
                          <FaEdit /> Edit
                        </ActionButton>
                        <ActionButton
                          variant="delete"
                          onClick={() => deletePost(post.id)}
                        >
                          <FaTrash /> Delete
                        </ActionButton>
                      </PostActions>
                    </PostCard>
                  ))}
                </PostList>
            )}

            {showPostModal && (
              <ModalOverlay onClick={() => setShowPostModal(false)}>
                <ModalContent onClick={e => e.stopPropagation()}>
                  <CloseButton
                    onClick={() => setShowPostModal(false)}
                  />
                  <ModalTitle>
                    {currentPost ? 'Edit' : 'New'} Post
                  </ModalTitle>

                  <Input
                    type="text"
                    placeholder="Title"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                  />

                  <ImageUploadContainer>
                    {imagePreview ? (
                      <>
                        <ImagePreview
                          src={imagePreview}
                          alt="preview"
                        />
                        <RemoveImageButton onClick={removeImage}>
                          <FaTimes /> Remove
                        </RemoveImageButton>
                      </>
                    ) : (
                      <FileInputWrapper>
                        <ImageUploadLabel htmlFor="upload">
                          <FaImage /> Add Image
                        </ImageUploadLabel>
                        <ImageUploadButton
                          id="upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </FileInputWrapper>
                    )}
                  </ImageUploadContainer>

                  <ReactQuill
                    theme="snow"
                    modules={quillModules}
                    formats={quillFormats}
                    value={newContent}
                    onChange={(content, _, __, editor) => {
                      setNewContent(content);
                      setContentLength(editor.getText().length - 1);
                    }}
                    style={{ height: 300, marginBottom: 16 }}
                  />

                  <CharacterCount count={contentLength}>
                    {contentLength}/5000
                  </CharacterCount>

                  <SubmitButton
                    onClick={savePost}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <LoadingSpinner />
                    ) : currentPost ? (
                      'Update'
                    ) : (
                      'Publish'
                    )}
                  </SubmitButton>
                </ModalContent>
              </ModalOverlay>
            )}
          </>
        ) : (
          // ── COMMENTS TAB ────────────────────────────────────────────────
          <>
            <BlogControls>
              {posts.length > 0 && (
                <FilterContainer>
                  <FilterLabel>
                    <FaFilter /> Post:
                  </FilterLabel>
                  <FilterSelect
                    value={moderatedPostId || ''}
                    onChange={e => setModeratedPostId(e.target.value)}
                    disabled={loadingPosts}
                  >
                    {posts.map(post => (
                      <option key={post.id} value={post.id}>
                        {post.title}
                      </option>
                    ))}
                  </FilterSelect>
                </FilterContainer>
              )}
              <RefreshButton 
                onClick={fetchComments} 
                disabled={!moderatedPostId || loadingComments}
              >
                <FaSync />
              </RefreshButton>
            </BlogControls>

            {commentsError ? (
              <EmptyState>
                <p>{commentsError}</p>
                <ActionButton onClick={fetchComments}>
                  <FaSync /> Retry
                </ActionButton>
              </EmptyState>
            ) : loadingComments ? (
              <EmptyState>
                <LoadingSpinner size={32} /> Loading comments…
              </EmptyState>
            ) : comments.length === 0 ? (
              <NoComments>
                {moderatedPostId ? 'No comments to moderate' : 'Select a post to view comments'}
              </NoComments>
            ) : (
              <CommentsList>
                {comments.map(c => (
                  <CommentItem key={c.id}>
                    <CommentMeta>
                      <div>
                        <strong>Post:</strong> {posts.find(p => p.id === c.post_id)?.title || c.post_id}
                      </div>
                      <div>
                        <strong>Date:</strong> {new Date(c.created_at).toLocaleString()}
                      </div>
                      <div>
                        <FaTrash
                          style={{ cursor: 'pointer', color: '#ff6b6b' }}
                          onClick={() => deleteComment(c.id)}
                          title="Delete comment"
                        />
                      </div>
                    </CommentMeta>
                    <CommentText>{c.content}</CommentText>
                  </CommentItem>
                ))}
              </CommentsList>
            )}
          </>
        )}
      </BlogContainer>
    </>
  );
};

export default BlogManager;