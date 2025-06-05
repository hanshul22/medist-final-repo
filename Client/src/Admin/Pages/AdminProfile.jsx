import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminService } from '../../context/ServicesContext';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ProfileHeader from '../components/ProfileHeader';
import ProfileForm from '../components/ProfileForm';
import PasswordChangeForm from '../components/PasswordChangeForm';
import Notification from '../components/Notification';

const AdminProfile = () => {
  const navigate = useNavigate();
  const adminService = useAdminService();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [notification, setNotification] = useState({
    isVisible: false,
    type: '',
    message: ''
  });

  useEffect(() => {
    // Check if user is authenticated
    const isAuth = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');

    if (!isAuth || userRole !== 'admin') {
      navigate('/admin_login');
      return;
    }

    // Fetch profile data
    fetchProfileData();
  }, [navigate]);

  const showNotification = (type, message) => {
    setNotification({
      isVisible: true,
      type,
      message
    });
  };

  const hideNotification = () => {
    setNotification({
      isVisible: false,
      type: '',
      message: ''
    });
  };

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const response = await adminService.getMyProfile();

      if (response && response.data) {
        setProfileData({
          id: response.data.id || 1,
          name: response.data.name || response.data.fullName || 'Admin User',
          email: response.data.email || 'admin@medist.com',
          phone: response.data.phone || response.data.phoneNumber || '',
          role: response.data.role || 'Admin',
          department: response.data.department || 'Administration',
          avatar: response.data.avatar || response.data.profileImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          joinedDate: response.data.createdAt || response.data.joinedDate || '2023-01-15',
          lastLogin: response.data.lastLogin || new Date().toISOString(),
          permissions: response.data.permissions || ['user_management', 'content_management', 'system_settings']
        });
      } else {
        // Fallback to mock data if response structure is different
        setProfileData({
          id: 1,
          name: 'Admin User',
          email: 'admin@medist.com',
          phone: '+1 (555) 123-4567',
          role: 'Super Admin',
          department: 'Administration',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          joinedDate: '2023-01-15',
          lastLogin: new Date().toISOString(),
          permissions: ['user_management', 'content_management', 'system_settings']
        });
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile data:', error);
      setLoading(false);
      showNotification('error', 'Failed to load profile data. Please try again.');
    }
  };

  const handleProfileUpdate = async (updatedData) => {
    try {
      setUpdateLoading(true);
      const response = await adminService.updateMe(updatedData);

      if (response && response.data) {
        setProfileData(prev => ({ ...prev, ...updatedData }));
        showNotification('success', 'Profile updated successfully!');
      } else {
        throw new Error('Update failed');
      }
      setUpdateLoading(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setUpdateLoading(false);
      showNotification('error', 'Failed to update profile. Please try again.');
    }
  };

  const handlePasswordChange = async (passwordData) => {
    try {
      setUpdateLoading(true);
      const response = await adminService.updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });

      if (response) {
        showNotification('success', 'Password changed successfully!');
      } else {
        throw new Error('Password change failed');
      }
      setUpdateLoading(false);
    } catch (error) {
      console.error('Error changing password:', error);
      setUpdateLoading(false);
      showNotification('error', 'Failed to change password. Please check your current password and try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    navigate('/admin_login');
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-neutral-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onLogout={handleLogout} />
          <main className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-neutral-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onLogout={handleLogout} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Profile Settings</h1>

            {/* Profile Header */}
            <ProfileHeader profileData={profileData} />

            {/* Tab Navigation */}
            <div className="bg-white rounded-lg shadow mt-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8 px-6">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'profile'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                  >
                    Profile Information
                  </button>
                  <button
                    onClick={() => setActiveTab('password')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'password'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                  >
                    Change Password
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'profile' && (
                  <ProfileForm
                    profileData={profileData}
                    onUpdate={handleProfileUpdate}
                    loading={updateLoading}
                  />
                )}
                {activeTab === 'password' && (
                  <PasswordChangeForm
                    onPasswordChange={handlePasswordChange}
                    loading={updateLoading}
                  />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Notification */}
      <Notification
        type={notification.type}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
    </div>
  );
};

export default AdminProfile; 