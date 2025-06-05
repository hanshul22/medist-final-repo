import React, { useState, useEffect } from 'react';
import CategoryService from '../../services/CategoryService';
import CategoryTable from '../components/CategoryTable';
import AddCategoryModal from '../components/AddCategoryModal';
import EditCategoryModal from '../components/EditCategoryModal';
import Notification from '../components/Notification';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0
  });

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await CategoryService.getCat();
      const categoriesData = response.data || [];
      setCategories(categoriesData);
      
      // Calculate stats
      setStats({
        total: categoriesData.length,
        active: categoriesData.filter(cat => cat.status === 'active').length,
        inactive: categoriesData.filter(cat => cat.status === 'inactive').length
      });
    } catch (error) {
      showNotification('Failed to fetch categories', 'error');
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

  const handleAddCategory = async (categoryData) => {
    try {
      await CategoryService.createCat(categoryData);
      showNotification('Category created successfully');
      fetchCategories();
      setShowAddModal(false);
    } catch (error) {
      showNotification('Failed to create category', 'error');
    }
  };

  const handleEditCategory = async (categoryData) => {
    try {
      await CategoryService.updateCat(selectedCategory._id, categoryData);
      showNotification('Category updated successfully');
      fetchCategories();
      setShowEditModal(false);
      setSelectedCategory(null);
    } catch (error) {
      showNotification('Failed to update category', 'error');
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      try {
        await CategoryService.deleteCat(categoryId);
        showNotification('Category deleted successfully');
        fetchCategories();
      } catch (error) {
        showNotification('Failed to delete category', 'error');
      }
    }
  };

  const openEditModal = (category) => {
    setSelectedCategory(category);
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
                  <h1 className="text-2xl font-semibold text-gray-900">Category Management</h1>
                  <p className="mt-1 text-sm text-gray-600">
                    Organize your content with powerful categories
                  </p>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-200 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Category
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Total Categories Card */}
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total Categories</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">{stats.total}</p>
                  </div>
                  <div className="bg-primary p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Active Categories Card */}
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Active Categories</p>
                    <p className="text-3xl font-bold text-green-600 mt-1">{stats.active}</p>
                  </div>
                  <div className="bg-green-500 p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Inactive Categories Card */}
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Inactive Categories</p>
                    <p className="text-3xl font-bold text-gray-600 mt-1">{stats.inactive}</p>
                  </div>
                  <div className="bg-gray-500 p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Table */}
            <CategoryTable
              categories={categories}
              loading={loading}
              onEdit={openEditModal}
              onDelete={handleDeleteCategory}
            />

            {/* Add Category Modal */}
            {showAddModal && (
              <AddCategoryModal
                onClose={() => setShowAddModal(false)}
                onSubmit={handleAddCategory}
              />
            )}

            {/* Edit Category Modal */}
            {showEditModal && selectedCategory && (
              <EditCategoryModal
                category={selectedCategory}
                onClose={() => {
                  setShowEditModal(false);
                  setSelectedCategory(null);
                }}
                onSubmit={handleEditCategory}
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

export default ManageCategories; 