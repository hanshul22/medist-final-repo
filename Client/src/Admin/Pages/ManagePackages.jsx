import React, { useState, useEffect } from 'react';
import PackageService from '../../services/PackageService';
import PackageTable from '../components/PackageTable';
import AddPackageModal from '../components/AddPackageModal';
import EditPackageModal from '../components/EditPackageModal';
import Notification from '../components/Notification';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const ManagePackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Fetch packages on component mount
  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await PackageService.getPackage();
      setPackages(response.data || []);
    } catch (error) {
      showNotification('Failed to fetch packages', 'error');
    } finally {
      setLoading(false);
    }
  };
console.log("packages",packages);
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const handleAddPackage = async (packageData) => {
    try {
      await PackageService.createPackage(packageData);
      showNotification('Package created successfully');
      fetchPackages();
      setShowAddModal(false);
    } catch (error) {
      showNotification('Failed to create package', 'error');
    }
  };

  const handleEditPackage = async (packageData) => {
    try {
      await PackageService.updatePackage(selectedPackage._id, packageData);
      showNotification('Package updated successfully');
      fetchPackages();
      setShowEditModal(false);
      setSelectedPackage(null);
    } catch (error) {
      showNotification('Failed to update package', 'error');
    }
  };

  const handleDeletePackage = async (packageId) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        await PackageService.deletePackage(packageId);
        showNotification('Package deleted successfully');
        fetchPackages();
      } catch (error) {
        showNotification('Failed to delete package', 'error');
      }
    }
  };

  const openEditModal = (packageItem) => {
    setSelectedPackage(packageItem);
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
            {/* Header Section with Gradient Background */}
            <div className="mb-8 bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 shadow-lg">
              <div className="flex justify-between items-center">
                <div className="text-white">
                  <h1 className="text-3xl font-bold mb-2">Manage Packages</h1>
                  <p className="text-neutral-100 text-lg">
                    Create and manage your service packages with ease
                  </p>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-white text-primary px-6 py-3 rounded-xl hover:bg-neutral-50 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="font-semibold">Add New Package</span>
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Packages</p>
                    <p className="text-2xl font-bold text-gray-800">{packages.length}</p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Active Packages</p>
                    <p className="text-2xl font-bold text-success">{packages.filter(p => p.status === 'active').length}</p>
                  </div>
                  <div className="bg-success/10 p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Popular Packages</p>
                    <p className="text-2xl font-bold text-warning">{packages.filter(p => p.isPopular).length}</p>
                  </div>
                  <div className="bg-warning/10 p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Package Table */}
            <PackageTable
              packages={packages}
              loading={loading}
              onEdit={openEditModal}
              onDelete={handleDeletePackage}
            />

            {/* Add Package Modal */}
            {showAddModal && (
              <AddPackageModal
                onClose={() => setShowAddModal(false)}
                onSubmit={handleAddPackage}
              />
            )}

            {/* Edit Package Modal */}
            {showEditModal && selectedPackage && (
              <EditPackageModal
                packageItem={selectedPackage}
                onClose={() => {
                  setShowEditModal(false);
                  setSelectedPackage(null);
                }}
                onSubmit={handleEditPackage}
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

export default ManagePackages; 