import React, { useState, useEffect } from 'react';
import BlogService from '../../services/BlogServices';
import BlogTable from '../components/BlogTable';
import AddBlogModal from '../components/AddBlogModal';
import EditBlogModal from '../components/EditBlogModal';
import Notification from '../components/Notification';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await BlogService.getBlog();
      setBlogs(response.data || []);
    } catch (error) {
      showNotification('Failed to fetch blogs', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const handleAddBlog = async (blogData) => {
    try {
      await BlogService.createBlog(blogData);
      showNotification('Blog created successfully');
      fetchBlogs();
      setShowAddModal(false);
    } catch (error) {
      showNotification('Failed to create blog', 'error');
    }
  };

  const handleEditBlog = async (blogData) => {
    try {
      await BlogService.updateBlog(selectedBlog._id, blogData);
      showNotification('Blog updated successfully');
      fetchBlogs();
      setShowEditModal(false);
      setSelectedBlog(null);
    } catch (error) {
      showNotification('Failed to update blog', 'error');
    }
  };

  const handleDeleteBlog = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await BlogService.deleteBlog(blogId);
        showNotification('Blog deleted successfully');
        fetchBlogs();
      } catch (error) {
        showNotification('Failed to delete blog', 'error');
      }
    }
  };

  const openEditModal = (blog) => {
    setSelectedBlog(blog);
    setShowEditModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    window.location.href = '/admin_login';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header onLogout={handleLogout} />
        
        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="p-6">
            {/* Header Section */}
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">Manage Blogs</h1>
                  <p className="mt-1 text-sm text-gray-600">
                    Create, edit, and manage your blog posts
                  </p>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-200 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add New Blog
                </button>
              </div>
            </div>

            {/* Blog Table */}
            <BlogTable
              blogs={blogs}
              loading={loading}
              onEdit={openEditModal}
              onDelete={handleDeleteBlog}
            />

            {/* Add Blog Modal */}
            {showAddModal && (
              <AddBlogModal
                onClose={() => setShowAddModal(false)}
                onSubmit={handleAddBlog}
              />
            )}

            {/* Edit Blog Modal */}
            {showEditModal && selectedBlog && (
              <EditBlogModal
                blog={selectedBlog}
                onClose={() => {
                  setShowEditModal(false);
                  setSelectedBlog(null);
                }}
                onSubmit={handleEditBlog}
              />
            )}

            {/* Notification */}
            {notification.show && (
              <Notification
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification({ show: false, message: '', type: '' })}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManageBlogs; 