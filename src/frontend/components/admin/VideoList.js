// src/components/admin/VideoList.js
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Pagination from '../shared/Pagination';
import VideoCommentsManager from './videoCommentManager';
import {
  ContentHeader,
  SortSelect,
  VideoGrid,
  VideoCard,
  ThumbnailContainer,
  Thumbnail,
  PlaceholderThumbnail,
  DurationBadge,
  VideoInfo,
  VideoTitle,
  Channel,
  Description,
  CategoryBadge,
  ViewsCount,
  ActionButtons,
  EditButton,
  DeleteButton,
  EmptyState,
  LoadingSpinner
} from '../shared/StyledComponents';

const TabsContainer = styled.div`
  display: flex;
  margin-right: 1rem;
`;

const TabBtn = styled.button`
  background: transparent;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  color: #888;

  ${({ active }) =>
    active &&
    css`
      color: #000;
      border-bottom: 2px solid #000;
      font-weight: 500;
    `}
`;

const VideoList = ({
  videos,
  isLoading,
  handleEdit,
  handleDelete,
  currentPage,
  totalPages,
  setCurrentPage
}) => {
  const [activeTab, setActiveTab] = useState('videos');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const onCommentsTab = () => {
    if (!selectedVideo && videos.length > 0) {
      setSelectedVideo(videos[0]);
    }
    setActiveTab('comments');
  };

  if (isLoading) return <LoadingSpinner />;

  if (!videos.length) return <EmptyState>No videos found. Upload your first video!</EmptyState>;

  return (
    <>
      <ContentHeader>
        <h1>Your Videos</h1>

        <TabsContainer>
          <TabBtn
            active={activeTab === 'videos'}
            onClick={() => setActiveTab('videos')}
          >
            Videos
          </TabBtn>
          <TabBtn
            active={activeTab === 'comments'}
            onClick={onCommentsTab}
          >
            Comments
          </TabBtn>
        </TabsContainer>

        <SortSelect>
          <option>Newest first</option>
          <option>Most popular</option>
          <option>Alphabetical</option>
        </SortSelect>
      </ContentHeader>

      {activeTab === 'videos' ? (
        <>
          <VideoGrid>
            {videos.map(video => (
              <VideoCard key={video.id}>
                <ThumbnailContainer>
                  {video.avatar_url ? (
                    <Thumbnail
                      src={`${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'}${video.avatar_url}`}
                      alt={video.title}
                    />
                  ) : (
                    <PlaceholderThumbnail />
                  )}
                  <DurationBadge>{video.duration}</DurationBadge>
                </ThumbnailContainer>

                <VideoInfo>
                  <VideoTitle>{video.title}</VideoTitle>
                  <Channel>{video.channel}</Channel>
                  <Description>{video.description.substring(0, 100)}…</Description>
                  <CategoryBadge>{video.category_name || 'Uncategorized'}</CategoryBadge>
                  <ViewsCount>{video.views || 0} views</ViewsCount>
                </VideoInfo>

                <ActionButtons>
                  <EditButton onClick={() => handleEdit(video)}>
                    <FiEdit size={16} />
                  </EditButton>
                  <DeleteButton onClick={() => handleDelete(video.id)}>
                    <FiTrash2 size={16} />
                  </DeleteButton>
                </ActionButtons>
              </VideoCard>
            ))}
          </VideoGrid>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        <div style={{ marginTop: '1rem' }}>
          {selectedVideo ? (
            <VideoCommentsManager videoId={selectedVideo.id} />
          ) : (
            <EmptyState>Select a video first to moderate comments</EmptyState>
          )}
        </div>
      )}
    </>
  );
};

export default VideoList;
