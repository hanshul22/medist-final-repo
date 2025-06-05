import React, { useState, useEffect } from 'react';
import { Header, Sidebar } from '../index';
import ContactTable from '../components/ContactTable';
import AddContactModal from '../components/AddContactModal';
import EditContactModal from '../components/EditContactModal';
import ContactServices from '../../services/ContactServices';
import { toast } from 'react-toastify';

const ManageContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await ContactServices.getAllContacts();
      setContacts(response.data || []);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleAddContact = async (contactData) => {
    try {
      await ContactServices.createContact(contactData);
      toast.success('Contact added successfully');
      setIsAddModalOpen(false);
      fetchContacts();
    } catch (error) {
      console.error('Error adding contact:', error);
      toast.error('Failed to add contact');
    }
  };

  const handleEditContact = async (contactData) => {
    try {
      await ContactServices.updateContactDetail(selectedContact._id, contactData);
      toast.success('Contact updated successfully');
      setIsEditModalOpen(false);
      fetchContacts();
    } catch (error) {
      console.error('Error updating contact:', error);
      toast.error('Failed to update contact');
    }
  };

  const handleDeleteContact = async (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await ContactServices.deleteContact(contactId);
        toast.success('Contact deleted successfully');
        fetchContacts();
      } catch (error) {
        console.error('Error deleting contact:', error);
        toast.error('Failed to delete contact');
      }
    }
  };

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setIsEditModalOpen(true);
  };

  // const filteredContacts = contacts.filter(contact =>
  //   contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   contact.phone?.includes(searchTerm)
  // );

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
                  <h1 className="text-4xl font-bold mb-2">Contact Management</h1>
                  <p className="text-green-100">Manage all your contact information in one place</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3 text-white">
                    <span className="text-3xl font-bold">{contacts.length}</span>
                    <p className="text-sm">Total Contacts</p>
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
                    placeholder="Search contacts by name, email, or phone..."
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
                  Add New Contact
                </button>
              </div>
            </div>

            {/* Contacts Table */}
            <ContactTable
              contacts={contacts}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDeleteContact}
            />
          </div>
        </main>
      </div>

      {/* Modals */}
      {isAddModalOpen && (
        <AddContactModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddContact}
        />
      )}

      {isEditModalOpen && (
        <EditContactModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onEdit={handleEditContact}
          contact={selectedContact}
        />
      )}
    </div>
  );
};

export default ManageContacts; 