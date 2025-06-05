import React, { useState, useEffect } from 'react';
import { Header, Sidebar } from '../index';
import NotificationTable from '../components/NotificationTable';
import AddNotificationModal from '../components/AddNotificationModal';
import EditNotificationModal from '../components/EditNotificationModal';
import NotificationService from '../../services/NotificationService';
import { toast } from 'react-toastify';

const ManageNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [pushNotifications, setPushNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'push'
  const [stats, setStats] = useState({
    total: 0,
    read: 0,
    unread: 0,
    push: 0
  });

  useEffect(() => {
    fetchNotifications();
    fetchPushNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await NotificationService.getNotification();
      const notificationData = response.data || [];
      
      setNotifications(notificationData);
      
      // Calculate stats
      const readNotifications = notificationData.filter(notification => notification.isRead).length;
      setStats(prevStats => ({
        ...prevStats,
        total: notificationData.length,
        read: readNotifications,
        unread: notificationData.length - readNotifications
      }));
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast.error('Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  const fetchPushNotifications = async () => {
    try {
      const response = await NotificationService.getPushNotification();
      const pushData = response.data || [];
      
      setPushNotifications(pushData);
      
      // Update push stats
      setStats(prevStats => ({
        ...prevStats,
        push: pushData.length
      }));
    } catch (error) {
      console.error('Error fetching push notifications:', error);
      toast.error('Failed to fetch push notifications');
    }
  };

  const handleAddNotification = async (notificationData) => {
    try {
      const response = await NotificationService.createNotification(notificationData);
      toast.success('Notification added successfully');
      setIsAddModalOpen(false);
      fetchNotifications();
      return response;
    } catch (error) {
      console.error('Error adding notification:', error);
      toast.error('Failed to add notification');
      throw error;
    }
  };

  const handleEditNotification = async (notificationData) => {
    try {
      await NotificationService.updateNotification(selectedNotification._id, notificationData);
      toast.success('Notification updated successfully');
      setIsEditModalOpen(false);
      fetchNotifications();
    } catch (error) {
      console.error('Error updating notification:', error);
      toast.error('Failed to update notification');
    }
  };

  const handleDeleteNotification = async (notificationId, isPush = false) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      try {
        if (isPush) {
          await NotificationService.deletePushNotification(notificationId);
          fetchPushNotifications();
        } else {
          await NotificationService.deleteNotification(notificationId);
          fetchNotifications();
        }
        toast.success('Notification deleted successfully');
      } catch (error) {
        console.error('Error deleting notification:', error);
        toast.error('Failed to delete notification');
      }
    }
  };

  const handleSendPushNotification = async (notificationData) => {
    try {
      await NotificationService.sendPushNotification(notificationData);
      toast.success('Push notification sent successfully');
      fetchPushNotifications();
    } catch (error) {
      console.error('Error sending push notification:', error);
      toast.error('Failed to send push notification');
    }
  };

  const handleEdit = (notification) => {
    setSelectedNotification(notification);
    setIsEditModalOpen(true);
  };

  const getDisplayedNotifications = () => {
    if (activeTab === 'push') {
      return pushNotifications.filter(notification =>
        notification.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.body?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return notifications.filter(notification =>
        notification.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  };

  const filteredNotifications = getDisplayedNotifications();

  return (
    <div className="flex h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent">
          <div className="container mx-auto px-6 py-8">
            {/* Page Header with Gradient Background */}
            <div className="mb-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 shadow-xl">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-white mb-4 md:mb-0">
                  <h1 className="text-4xl font-bold mb-2">Notification Management</h1>
                  <p className="text-green-100">Manage and send notifications to your users</p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3 text-white">
                    <span className="text-3xl font-bold">{stats.total}</span>
                    <p className="text-sm">Total</p>
                  </div>
                  <div className="bg-green-500/30 backdrop-blur-sm rounded-2xl px-6 py-3 text-white">
                    <span className="text-3xl font-bold">{stats.read}</span>
                    <p className="text-sm">Read</p>
                  </div>
                  <div className="bg-yellow-500/30 backdrop-blur-sm rounded-2xl px-6 py-3 text-white">
                    <span className="text-3xl font-bold">{stats.unread}</span>
                    <p className="text-sm">Unread</p>
                  </div>
                  <div className="bg-blue-500/30 backdrop-blur-sm rounded-2xl px-6 py-3 text-white">
                    <span className="text-3xl font-bold">{stats.push}</span>
                    <p className="text-sm">Push</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    activeTab === 'all' 
                      ? 'text-green-600 border-b-2 border-green-600 bg-green-50' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  All Notifications
                </button>
                <button
                  onClick={() => setActiveTab('push')}
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    activeTab === 'push' 
                      ? 'text-green-600 border-b-2 border-green-600 bg-green-50' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Push Notifications
                </button>
              </div>

              {/* Search and Add Section */}
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="relative flex-1 max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="Search notifications by title or message..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsAddModalOpen(true)}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      {activeTab === 'push' ? 'Send Push Notification' : 'Add Notification'}
                    </button>
                    <button
                      onClick={() => {
                        fetchNotifications();
                        fetchPushNotifications();
                      }}
                      className="bg-white border border-gray-200 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all duration-200"
                      title="Refresh"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications Table */}
            <NotificationTable
              notifications={filteredNotifications}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDeleteNotification}
              isPushTab={activeTab === 'push'}
            />
          </div>
        </main>
      </div>

      {/* Modals */}
      {isAddModalOpen && (
        <AddNotificationModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={activeTab === 'push' ? handleSendPushNotification : handleAddNotification}
          isPush={activeTab === 'push'}
        />
      )}

      {isEditModalOpen && (
        <EditNotificationModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onEdit={handleEditNotification}
          notification={selectedNotification}
        />
      )}
    </div>
  );
};

export default ManageNotifications; 