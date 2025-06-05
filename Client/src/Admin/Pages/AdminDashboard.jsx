import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminService } from '../../context/ServicesContext';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DashboardStats from '../components/DashboardStats';
import RecentActivity from '../components/RecentActivity';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const adminService = useAdminService();
  const [stats, setStats] = useState({
    users: 0,
    posts: 0,
    appointments: 0,
    pendingRequests: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const isAuth = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');

    if (!isAuth || userRole !== 'admin') {
      navigate('/admin_login');
      return;
    }

    // Fetch dashboard stats
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // This would normally call the actual service
        // const response = await adminService.getDashboardStats();

        // For now, using mock data
        setTimeout(() => {
          setStats({
            users: 245,
            posts: 32,
            appointments: 18,
            pendingRequests: 7
          });
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate, adminService]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    navigate('/admin_login');
  };

  return (
    <div className="flex h-screen bg-neutral-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onLogout={handleLogout} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard Overview</h1>

            <DashboardStats stats={stats} loading={loading} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
                <RecentActivity />
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => navigate('/admin/users')} className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg flex flex-col items-center justify-center transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span className="text-sm font-medium">Manage Users</span>
                  </button>

                  <button onClick={() => navigate('/admin/posts')} className="p-4 bg-green-50 hover:bg-green-100 rounded-lg flex flex-col items-center justify-center transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    <span className="text-sm font-medium">Manage Posts</span>
                  </button>

                  <button onClick={() => navigate('/admin/appointments')} className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg flex flex-col items-center justify-center transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium">Appointments</span>
                  </button>

                  <button onClick={() => navigate('/admin/settings')} className="p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg flex flex-col items-center justify-center transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm font-medium">Settings</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard; 