import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminServices from '../../services/AdminService';
import UserService from '../../services/UserService';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import UserTable from '../components/UserTable';
import AddUserModal from '../components/AddUserModal';

const ManageUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [userType, setUserType] = useState('admin'); // 'admin' or 'user'
  const [activeTab, setActiveTab] = useState('admins'); // 'admins' or 'users'

  useEffect(() => {
    // Check if user is authenticated
    const isAuth = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');
    
    if (!isAuth || userRole !== 'admin') {
      navigate('/admin_login');
      return;
    }

    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch admins
      const adminResponse = await AdminServices.getAllAdmin();
      setAdmins(adminResponse.data || []);
      
      // Fetch users
      const userResponse = await UserService.getUser();
      setUsers(userResponse.data || []);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = (type) => {
    setUserType(type);
    setShowAddModal(true);
  };

  const handleCreateUser = async (userData) => {
    try {
      if (userType === 'admin') {
        await AdminServices.createAdmin(userData);
      } else {
        await UserService.createUser(userData);
      }
      
      // Refresh data
      await fetchData();
      setShowAddModal(false);
      
      // Show success message (you can add a toast notification here)
      alert(`${userType === 'admin' ? 'Admin' : 'User'} created successfully!`);
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user. Please try again.');
    }
  };

  const handleDeleteUser = async (id, type) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) {
      return;
    }

    try {
      if (type === 'admin') {
        await AdminServices.deleteAdmin(id);
      } else {
        await UserService.deleteUser(id);
      }
      
      // Refresh data
      await fetchData();
      
      // Show success message
      alert(`${type === 'admin' ? 'Admin' : 'User'} deleted successfully!`);
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    navigate('/admin_login');
  };

  return (
    <div className="flex h-screen bg-neutral-100">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onLogout={handleLogout} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">Manage Users</h1>
              
              <div className="flex gap-3">
                <button
                  onClick={() => handleAddUser('admin')}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Admin
                </button>
                
                <button
                  onClick={() => handleAddUser('user')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add User
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow">
              <div className="border-b">
                <nav className="flex -mb-px">
                  <button
                    onClick={() => setActiveTab('admins')}
                    className={`py-3 px-6 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'admins'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Admins ({admins.length})
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('users')}
                    className={`py-3 px-6 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'users'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Users ({users.length})
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <UserTable
                    data={activeTab === 'admins' ? admins : users}
                    type={activeTab === 'admins' ? 'admin' : 'user'}
                    onDelete={handleDeleteUser}
                  />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <AddUserModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleCreateUser}
          userType={userType}
        />
      )}
    </div>
  );
};

export default ManageUsers; 