import React, { useState, useEffect } from 'react';
import { Header, Sidebar } from '../index';
import TestimonialTable from '../components/TestimonialTable';
import AddTestimonialModal from '../components/AddTestimonialModal';
import EditTestimonialModal from '../components/EditTestimonialModal';
import TestimonialService from '../../services/TestimonialService';
import { toast } from 'react-toastify';

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [webTestimonials, setWebTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'web'
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    unpublished: 0,
    featured: 0
  });

  useEffect(() => {
    fetchTestimonials();
    fetchWebTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await TestimonialService.getTestimonial();
      const testimonialData = response.data || [];
      
      setTestimonials(testimonialData);
      
      // Calculate stats
      const publishedTestimonials = testimonialData.filter(testimonial => testimonial.isPublished).length;
      const featuredTestimonials = testimonialData.filter(testimonial => testimonial.isFeatured).length;
      setStats(prevStats => ({
        ...prevStats,
        total: testimonialData.length,
        published: publishedTestimonials,
        unpublished: testimonialData.length - publishedTestimonials,
        featured: featuredTestimonials
      }));
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast.error('Failed to fetch testimonials');
    } finally {
      setLoading(false);
    }
  };

  const fetchWebTestimonials = async () => {
    try {
      const response = await TestimonialService.getWebTestimonial();
      const webData = response.data || [];
      
      setWebTestimonials(webData);
    } catch (error) {
      console.error('Error fetching web testimonials:', error);
      toast.error('Failed to fetch web testimonials');
    }
  };

  const handleAddTestimonial = async (testimonialData) => {
    try {
      await TestimonialService.createTestimonial(testimonialData);
      toast.success('Testimonial added successfully');
      setIsAddModalOpen(false);
      fetchTestimonials();
      fetchWebTestimonials();
    } catch (error) {
      console.error('Error adding testimonial:', error);
      toast.error('Failed to add testimonial');
      throw error;
    }
  };

  const handleEditTestimonial = async (testimonialData) => {
    try {
      await TestimonialService.updateTestimonial(selectedTestimonial._id, testimonialData);
      toast.success('Testimonial updated successfully');
      setIsEditModalOpen(false);
      fetchTestimonials();
      fetchWebTestimonials();
    } catch (error) {
      console.error('Error updating testimonial:', error);
      toast.error('Failed to update testimonial');
    }
  };

  const handleDeleteTestimonial = async (testimonialId) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await TestimonialService.deleteTestimonial(testimonialId);
        toast.success('Testimonial deleted successfully');
        fetchTestimonials();
        fetchWebTestimonials();
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        toast.error('Failed to delete testimonial');
      }
    }
  };

  const handleEdit = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsEditModalOpen(true);
  };

  const getDisplayedTestimonials = () => {
    if (activeTab === 'web') {
      return webTestimonials.filter(testimonial =>
        testimonial.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.designation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.message?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return testimonials.filter(testimonial =>
        testimonial.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.designation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.message?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  };

  const filteredTestimonials = getDisplayedTestimonials();

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
                  <h1 className="text-4xl font-bold mb-2">Testimonial Management</h1>
                  <p className="text-green-100">Manage and showcase your client testimonials</p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3 text-white">
                    <span className="text-3xl font-bold">{stats.total}</span>
                    <p className="text-sm">Total</p>
                  </div>
                  <div className="bg-green-500/30 backdrop-blur-sm rounded-2xl px-6 py-3 text-white">
                    <span className="text-3xl font-bold">{stats.published}</span>
                    <p className="text-sm">Published</p>
                  </div>
                  <div className="bg-gray-500/30 backdrop-blur-sm rounded-2xl px-6 py-3 text-white">
                    <span className="text-3xl font-bold">{stats.unpublished}</span>
                    <p className="text-sm">Unpublished</p>
                  </div>
                  <div className="bg-yellow-500/30 backdrop-blur-sm rounded-2xl px-6 py-3 text-white">
                    <span className="text-3xl font-bold">{stats.featured}</span>
                    <p className="text-sm">Featured</p>
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
                  All Testimonials
                </button>
                <button
                  onClick={() => setActiveTab('web')}
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    activeTab === 'web' 
                      ? 'text-green-600 border-b-2 border-green-600 bg-green-50' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Web Testimonials
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
                      placeholder="Search testimonials by name, designation or content..."
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
                      Add New Testimonial
                    </button>
                    <button
                      onClick={() => {
                        fetchTestimonials();
                        fetchWebTestimonials();
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

            {/* Testimonials Table */}
            <TestimonialTable
              testimonials={filteredTestimonials}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDeleteTestimonial}
              isWebTab={activeTab === 'web'}
            />
          </div>
        </main>
      </div>

      {/* Modals */}
      {isAddModalOpen && (
        <AddTestimonialModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddTestimonial}
        />
      )}

      {isEditModalOpen && (
        <EditTestimonialModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onEdit={handleEditTestimonial}
          testimonial={selectedTestimonial}
        />
      )}
    </div>
  );
};

export default ManageTestimonials; 