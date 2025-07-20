import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BlogPageContainer,
  BlogHeader,
  BlogTitle,
  BlogSubtitle,
  SearchContainer,
  SearchInput,
  SearchIcon,
  PostsGrid,
  PostCard,
  PostImage,
  PostImagePlaceholder,
  PostContentWrapper,
  PostTitle,
  PostExcerpt,
  PostMeta,
  PostAuthor,
  PostDate,
  ReadMoreButton,
  PaginationContainer,
  PaginationButton,
  PageInfo,
  LoadingIndicator,
  ErrorMessage,
  RetryButton,
  EmptyState
} from '../../styles/BlogPostStyles';
import { FiSearch, FiCalendar, FiUser, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { format } from 'date-fns';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || window.location.origin;

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 9;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/posts`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setPosts(data);
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to load blog posts.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const formatDate = date => format(new Date(date), 'MMM dd, yyyy');

  const stripHtml = html => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const filteredPosts = posts.filter(post => {
    const searchLower = searchTerm.toLowerCase();
    return (
      post.title.toLowerCase().includes(searchLower) ||
      (post.author && post.author.toLowerCase().includes(searchLower)) ||
      stripHtml(post.content).toLowerCase().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <BlogPageContainer>
      <BlogHeader>
        <BlogTitle>Insights & Perspectives</BlogTitle>
        <BlogSubtitle>
          Explore our latest articles, industry insights, and expert perspectives
        </BlogSubtitle>

        <SearchContainer>
          <SearchIcon><FiSearch size={20} /></SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search articles, authors, topics..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
      </BlogHeader>

      {isLoading && (
        <LoadingIndicator>
          <div className="spinner" />
          <p>Loading articles…</p>
        </LoadingIndicator>
      )}

      {error && (
        <ErrorMessage>
          <p>{error}</p>
          <RetryButton onClick={fetchPosts}>Try Again</RetryButton>
        </ErrorMessage>
      )}

      {!isLoading && !error && (
        <>
          {filteredPosts.length === 0 ? (
            <EmptyState>
              <div className="empty-icon">🔍</div>
              <h3>No articles found</h3>
              <p>
                We couldn't find any articles matching "{searchTerm}".<br />
                Try different keywords or browse all articles.
              </p>
              <RetryButton onClick={() => setSearchTerm('')}>Clear Search</RetryButton>
            </EmptyState>
          ) : (
            <>
              <PostsGrid>
                {paginatedPosts.map(post => (
                  <PostCard key={post.id}>
                    {post.image_url ? (
                      <PostImage>
                        <img
                          src={`${API_BASE_URL}${post.image_url}`}
                          alt={post.title}
                          loading="lazy"
                        />
                      </PostImage>
                    ) : (
                      <PostImagePlaceholder>
                        <div>📄</div>
                      </PostImagePlaceholder>
                    )}

                    <PostContentWrapper>
                      <PostTitle>
                        <Link to={`/blogs/${post.id}`}>{post.title}</Link>
                      </PostTitle>

                      <PostExcerpt>
                        {stripHtml(post.content).length > 150
                          ? stripHtml(post.content).substring(0, 150) + '…'
                          : stripHtml(post.content)}
                      </PostExcerpt>

                      <PostMeta>
                        {post.author && (
                          <PostAuthor>
                            <FiUser size={16} />
                            <span>{post.author}</span>
                          </PostAuthor>
                        )}
                        <PostDate>
                          <FiCalendar size={16} />
                          <span>{formatDate(post.created_at)}</span>
                        </PostDate>
                      </PostMeta>

                      <ReadMoreButton to={`/blogs/${post.id}`}>
                        Continue Reading
                      </ReadMoreButton>
                    </PostContentWrapper>
                  </PostCard>
                ))}
              </PostsGrid>

              {totalPages > 1 && (
                <PaginationContainer>
                  <PaginationButton
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <FiArrowLeft size={18} /> Previous
                  </PaginationButton>

                  <PageInfo>
                    Page {currentPage} of {totalPages}
                  </PageInfo>

                  <PaginationButton
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next <FiArrowRight size={18} />
                  </PaginationButton>
                </PaginationContainer>
              )}
            </>
          )}
        </>
      )}
    </BlogPageContainer>
  );
}