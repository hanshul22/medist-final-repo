import React, { useState, useEffect } from 'react';
import BannerService from '../../services/BannerService';
import BannerTable from '../components/BannerTable';
import AddBannerModal from '../components/AddBannerModal';
import EditBannerModal from '../components/EditBannerModal';
import Notification from '../components/Notification';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const ManageBanners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Fetch banners on component mount
  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await BannerService.getBanner();
      console.log(response)
      setBanners(response.data || []);
    } catch (error) {
      showNotification('Failed to fetch banners', 'error');
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

  const handleAddBanner = async (bannerData) => {
    try {
      await BannerService.createBanner(bannerData);
      showNotification('Banner created successfully');
      fetchBanners();
      setShowAddModal(false);
    } catch (error) {
      showNotification('Failed to create banner', 'error');
    }
  };

  const handleEditBanner = async (bannerData) => {
    try {
      await BannerService.updateBanner(selectedBanner._id, bannerData);
      showNotification('Banner updated successfully');
      fetchBanners();
      setShowEditModal(false);
      setSelectedBanner(null);
    } catch (error) {
      showNotification('Failed to update banner', 'error');
    }
  };

  const handleDeleteBanner = async (bannerId) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      try {
        await BannerService.deleteBanner(bannerId);
        showNotification('Banner deleted successfully');
        fetchBanners();
      } catch (error) {
        showNotification('Failed to delete banner', 'error');
      }
    }
  };

  const openEditModal = (banner) => {
    setSelectedBanner(banner);
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
                  <h1 className="text-2xl font-semibold text-gray-900">Manage Banners</h1>
                  <p className="mt-1 text-sm text-gray-600">
                    Create, edit, and manage your website banners
                  </p>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-200 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add New Banner
                </button>
              </div>
            </div>

            {/* Banner Table */}
            <BannerTable
              banners={banners}
              loading={loading}
              onEdit={openEditModal}
              onDelete={handleDeleteBanner}
            />

            {/* Add Banner Modal */}
            {showAddModal && (
              <AddBannerModal
                onClose={() => setShowAddModal(false)}
                onSubmit={handleAddBanner}
              />
            )}

            {/* Edit Banner Modal */}
            {showEditModal && selectedBanner && (
              <EditBannerModal
                banner={selectedBanner}
                onClose={() => {
                  setShowEditModal(false);
                  setSelectedBanner(null);
                }}
                onSubmit={handleEditBanner}
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

export default ManageBanners; 