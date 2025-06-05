import React, { useState, useEffect } from 'react';

const ContactForm = ({ contact, loading, onUpdate }) => {
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    whatsApp: '',
    status: '',
    createdAt: '',
    updatedAt: '',
    version: '',
    faceBook: '',
    instagram: '',
    linkedin: '',
    twitter: '',
    youtube: '',
  });

  useEffect(() => {
    if (contact) {
      setFormData({
        phone: contact.phone || '',
        email: contact.email || '',
        whatsApp: contact.whatsApp || '',
        status: contact.status || '',
        createdAt: contact.createdAt || '',
        updatedAt: contact.updatedAt || '',
        version: contact.version || '',
        faceBook: contact.faceBook || '',
        instagram: contact.instagram || '',
        linkedin: contact.linkedin || '',
        twitter: contact.twitter || '',
        youtube: contact.youtube || '',
      });
    }
  }, [contact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <div className="flex justify-center items-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200"></div>
            <div className="absolute top-0 left-0 animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
        <p className="text-gray-500">No contact selected</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-3xl p-8 space-y-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="whatsApp" className="block text-sm font-medium text-gray-700">WhatsApp</label>
          <input
            type="text"
            name="whatsApp"
            id="whatsApp"
            value={formData.whatsApp}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <input
            type="text"
            name="status"
            id="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="createdAt" className="block text-sm font-medium text-gray-700">Created At</label>
          <input
            type="text"
            name="createdAt"
            id="createdAt"
            value={formData.createdAt}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="updatedAt" className="block text-sm font-medium text-gray-700">Updated At</label>
          <input
            type="text"
            name="updatedAt"
            id="updatedAt"
            value={formData.updatedAt}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="version" className="block text-sm font-medium text-gray-700">Version</label>
          <input
            type="text"
            name="version"
            id="version"
            value={formData.version}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="faceBook" className="block text-sm font-medium text-gray-700">Facebook</label>
          <input
            type="url"
            name="faceBook"
            id="faceBook"
            value={formData.faceBook}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">Instagram</label>
          <input
            type="url"
            name="instagram"
            id="instagram"
            value={formData.instagram}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">LinkedIn</label>
          <input
            type="url"
            name="linkedin"
            id="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">Twitter</label>
          <input
            type="url"
            name="twitter"
            id="twitter"
            value={formData.twitter}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="youtube" className="block text-sm font-medium text-gray-700">YouTube</label>
          <input
            type="url"
            name="youtube"
            id="youtube"
            value={formData.youtube}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Update Contact
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
