import React, { useState, useEffect, useCallback } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';
import VideoForm from '../components/VideoForm';
import VideoList from '../components/VideoList';
import CategoryManager from '../components/CategoryManager';
import { DashboardContainer, DashboardContent, MainContent, SectionDivider } from '../components/StyledComponents';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) navigate('/admin/login');
  }, [navigate]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    channel: '',
    category_id: '',
    duration: ''
  });
  const [videoFile, setVideoFile] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [newCategory, setNewCategory] = useState('');
  const videosPerPage = 10;

  const fetchVideos = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/videos?page=${currentPage}&limit=${videosPerPage}&search=${searchTerm}`);
      if (!res.ok) throw new Error('Failed to fetch videos');
      const { videos, totalPages } = await res.json();
      setVideos(videos);
      setTotalPages(totalPages);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchTerm]);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/categories`);
      if (!res.ok) throw new Error('Failed to fetch categories');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
    fetchCategories();
  }, [fetchVideos, fetchCategories]);

  useEffect(() => {
    if (!videoFile) return;
    const objectUrl = URL.createObjectURL(videoFile);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [videoFile]);

  const getAuthToken = () => localStorage.getItem('authToken') || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });
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
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Update failed');
      }
      toast.success('Video updated!');
      resetForm();
      fetchVideos();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/videos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getAuthToken()}` }
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Delete failed');
      }
      toast.info('Video deleted');
      fetchVideos();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEdit = (video) => {
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

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.reload();
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
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Category creation failed');
      }
      setNewCategory('');
      fetchCategories();
      toast.success('Category added!');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/categories/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getAuthToken()}` }
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Delete failed');
      }
      fetchCategories();
      toast.info('Category deleted');
    } catch (err) {
      toast.error(err.message);
    }
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
        <AdminSidebar videosCount={videos.length} />
        <MainContent>
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
        </MainContent>
      </DashboardContent>
    </DashboardContainer>
  );
};

export default AdminDashboard;
