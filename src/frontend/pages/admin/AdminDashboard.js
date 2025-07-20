import React, { useState, useEffect, useCallback } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import AdminHeader from '../../components/admin/AdminHeader';
import AdminSidebar from '../../components/admin/AdminSidebar';
import VideoForm from '../../components/admin/VideoForm';
import VideoList from '../../components/admin/VideoList';
import CategoryManager from '../../components/admin/CategoryManager';
import BlogManager from '../../components/admin/BlogManager';
import EventManager from '../../components/admin/EventManager';
import AdminAbout from '../../components/admin/AdminAbout';  // ← Add this import

import {
  DashboardContainer,
  DashboardContent,
  MainContent,
  SectionDivider
} from '../../components/shared/StyledComponents';

const API_BASE_URL = window.location.origin;


const AdminDashboard = () => {
  const navigate = useNavigate();

  const [currentView, setCurrentView] = useState('videos');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 10;

  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '', description: '', channel: '', category_id: '', duration: ''
  });
  const [videoFile, setVideoFile] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  const [postsCount, setPostsCount] = useState(0);
  const [events, setEvents] = useState([]);

  const getAuthToken = () => localStorage.getItem('authToken') || '';

  const fetchVideos = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/videos?page=${currentPage}&limit=${videosPerPage}&search=${searchTerm}`
      );
      if (!res.ok) throw new Error('Failed to fetch videos');
      const { videos: v, totalPages: tp } = await res.json();
      setVideos(v);
      setTotalPages(tp);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchTerm]);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/categories`);
      if (!res.ok) throw new Error('Failed to fetch categories');
      setCategories(await res.json());
    } catch (err) {
      toast.error(err.message);
    }
  }, []);

  const fetchPostsCount = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/posts`);
      if (!res.ok) throw new Error('Failed to fetch posts count');
      const all = await res.json();
      setPostsCount(Array.isArray(all) ? all.length : 0);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchEvents = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/events`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` }
      });
      if (!res.ok) throw new Error('Failed to fetch events');
      setEvents(await res.json());
    } catch (err) {
      toast.error(err.message);
    }
  }, []);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) return navigate('/admin/login');

    fetchVideos();
    fetchCategories();
    fetchPostsCount();
    fetchEvents();
  }, [navigate, fetchVideos, fetchCategories, fetchPostsCount, fetchEvents]);

  useEffect(() => {
    if (!videoFile) return;
    const url = URL.createObjectURL(videoFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [videoFile]);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => v && data.append(k, v));
      if (videoFile) data.append('video', videoFile);
      if (avatarFile) data.append('avatar', avatarFile);

      const res = await fetch(`${API_BASE_URL}/api/videos/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getAuthToken()}` },
        body: data
      });
      if (!res.ok) throw new Error('Upload failed');
      toast.success('Video uploaded!');
      resetForm();
      fetchVideos();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/videos/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Update failed');
      toast.success('Video updated!');
      resetForm();
      fetchVideos();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/videos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getAuthToken()}` }
      });
      if (!res.ok) throw new Error('Delete failed');
      toast.info('Video deleted');
      fetchVideos();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEdit = video => {
    setEditingId(video.id);
    setFormData({
      title: video.title,
      description: video.description,
      channel: video.channel,
      category_id: video.category_id,
      duration: video.duration
    });
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', channel: '', category_id: '', duration: '' });
    setVideoFile(null);
    setAvatarFile(null);
    setEditingId(null);
    setPreviewUrl('');
  };

  const createCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify({ name: newCategory })
      });
      if (!res.ok) throw new Error('Category creation failed');
      setNewCategory('');
      fetchCategories();
      toast.success('Category added!');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteCategory = async id => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/categories/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getAuthToken()}` }
      });
      if (!res.ok) throw new Error('Delete failed');
      fetchCategories();
      toast.info('Category deleted');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.reload();
  };

  return (
    <DashboardContainer>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <AdminHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleLogout={handleLogout}
        videosCount={videos.length}
      />
      <DashboardContent>
        <AdminSidebar
          videosCount={videos.length}
          postsCount={postsCount}
          eventsCount={events.length}
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
        <MainContent>
          {currentView === 'videos' && (
            <>
              <VideoForm
                formData={formData}
                setFormData={setFormData}
                videoFile={videoFile}
                setVideoFile={setVideoFile}
                avatarFile={avatarFile}
                setAvatarFile={setAvatarFile}
                previewUrl={previewUrl}
                editingId={editingId}
                isSubmitting={isSubmitting}
                categories={categories}
                resetForm={resetForm}
                handleSubmit={handleSubmit}
                handleUpdate={handleUpdate}
              />
              <SectionDivider />
              <VideoList
                videos={videos}
                isLoading={isLoading}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                searchTerm={searchTerm}
              />
              <SectionDivider />
              <CategoryManager
                categories={categories}
                newCategory={newCategory}
                setNewCategory={setNewCategory}
                createCategory={createCategory}
                deleteCategory={deleteCategory}
              />
            </>
          )}

          {currentView === 'blog' && <BlogManager />}
          {currentView === 'events' && (
            <EventManager apiBase={API_BASE_URL} token={getAuthToken()} />
          )}
          {currentView === 'about' && <AdminAbout />}
        </MainContent>
      </DashboardContent>
    </DashboardContainer>
  );
};

export default AdminDashboard;
