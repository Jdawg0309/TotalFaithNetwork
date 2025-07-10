import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Pagination from './Pagination';
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
} from './StyledComponents';

const VideoList = ({
  videos,
  isLoading,
  handleEdit,
  handleDelete,
  currentPage,
  totalPages,
  setCurrentPage,
  searchTerm
}) => {
  const renderVideoList = () => {
    if (isLoading) return <LoadingSpinner />;
    
    if (videos.length === 0) {
      return <EmptyState>No videos found. Upload your first video!</EmptyState>;
    }

    return (
      <>
        <VideoGrid>
          {videos.map(video => (
            <VideoCard key={video.id}>
              <ThumbnailContainer>
                {video.avatar_url ? (
                  <Thumbnail src={`${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'}${video.avatar_url}`} alt={video.title} />
                ) : (
                  <PlaceholderThumbnail />
                )}
                <DurationBadge>{video.duration || '0:00'}</DurationBadge>
              </ThumbnailContainer>
              <VideoInfo>
                <VideoTitle>{video.title}</VideoTitle>
                <Channel>{video.channel}</Channel>
                <Description>{video.description.substring(0, 100)}...</Description>
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
    );
  };

  return (
    <>
      <ContentHeader>
        <h1>Your Videos</h1>
        <SortSelect>
          <option>Newest first</option>
          <option>Most popular</option>
          <option>Alphabetical</option>
        </SortSelect>
      </ContentHeader>
      
      {renderVideoList()}
    </>
  );
};

export default VideoList;
