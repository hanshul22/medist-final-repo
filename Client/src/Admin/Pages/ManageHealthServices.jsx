import React, { useState, useEffect } from 'react';
import { Header, Sidebar } from '../index';
import HealthServiceTable from '../components/HealthServiceTable';
import AddHealthServiceModal from '../components/AddHealthServiceModal';
import EditHealthServiceModal from '../components/EditHealthServiceModal';
import HealthService from '../../services/healthService';
import { toast } from 'react-toastify';

const ManageHealthServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await HealthService.getService();
      const serviceData = response.data || [];
      
      setServices(serviceData);
      
      // Calculate stats
      const activeServices = serviceData.filter(service => service.status === 'active').length;
      setStats({
        total: serviceData.length,
        active: activeServices,
        inactive: serviceData.length - activeServices
      });
    } catch (error) {
      console.error('Error fetching health services:', error);
      toast.error('Failed to fetch health services');
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = async (serviceData) => {
    try {
      await HealthService.createService(serviceData);
      toast.success('Health service added successfully');
      setIsAddModalOpen(false);
      fetchServices();
    } catch (error) {
      console.error('Error adding health service:', error);
      toast.error('Failed to add health service');
    }
  };

  const handleEditService = async (serviceData) => {
    try {
      await HealthService.updateService(selectedService._id, serviceData);
      toast.success('Health service updated successfully');
      setIsEditModalOpen(false);
      fetchServices();
    } catch (error) {
      console.error('Error updating health service:', error);
      toast.error('Failed to update health service');
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (window.confirm('Are you sure you want to delete this health service?')) {
      try {
        await HealthService.deleteService(serviceId);
        toast.success('Health service deleted successfully');
        fetchServices();
      } catch (error) {
        console.error('Error deleting health service:', error);
        toast.error('Failed to delete health service');
      }
    }
  };

  const handleEdit = (service) => {
    setSelectedService(service);
    setIsEditModalOpen(true);
  };

  const filteredServices = services.filter(service =>
    service.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  <h1 className="text-4xl font-bold mb-2">Health Services</h1>
                  <p className="text-green-100">Manage all your health services in one place</p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3 text-white">
                    <span className="text-3xl font-bold">{stats.total}</span>
                    <p className="text-sm">Total Services</p>
                  </div>
                  <div className="bg-green-500/30 backdrop-blur-sm rounded-2xl px-6 py-3 text-white">
                    <span className="text-3xl font-bold">{stats.active}</span>
                    <p className="text-sm">Active</p>
                  </div>
                  <div className="bg-red-500/30 backdrop-blur-sm rounded-2xl px-6 py-3 text-white">
                    <span className="text-3xl font-bold">{stats.inactive}</span>
                    <p className="text-sm">Inactive</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Add Section */}
            <div className="mb-6 bg-white rounded-2xl shadow-lg p-6">
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
                    placeholder="Search health services by title, description, or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add New Health Service
                </button>
              </div>
            </div>

            {/* Health Services Table */}
            <HealthServiceTable
              services={filteredServices}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDeleteService}
            />
          </div>
        </main>
      </div>

      {/* Modals */}
      {isAddModalOpen && (
        <AddHealthServiceModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddService}
        />
      )}

      {isEditModalOpen && (
        <EditHealthServiceModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onEdit={handleEditService}
          service={selectedService}
        />
      )}
    </div>
  );
};

export default ManageHealthServices; 