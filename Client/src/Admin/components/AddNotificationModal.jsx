import React, { useState } from 'react';

const AddNotificationModal = ({ isOpen, onClose, onAdd, isPush }) => {
  const initialFormData = isPush
    ? {
        title: '',
        body: '',
        topic: '',
        imageUrl: '',
        clickAction: '',
        sender: 'Admin'
      }
    : {
        title: '',
        message: '',
        type: 'info',
        link: '',
        isRead: false
      };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (isPush) {
      if (!formData.body.trim()) {
        newErrors.body = 'Notification body is required';
      }
    } else {
      if (!formData.message.trim()) {
        newErrors.message = 'Message is required';
      }
    }
    
    // Validate URLs
    if (formData.imageUrl && !formData.imageUrl.startsWith('http')) {
      newErrors.imageUrl = 'Image URL must start with http:// or https://';
    }
    
    if (formData.link && !formData.link.startsWith('http')) {
      newErrors.link = 'Link must start with http:// or https://';
    }
    
    if (formData.clickAction && !formData.clickAction.startsWith('http') && !formData.clickAction.startsWith('/')) {
      newErrors.clickAction = 'Click action must be a valid URL or app path';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      await onAdd(formData);
      onClose();
    } catch (error) {
      console.error('Error adding notification:', error);
    } finally {
      setLoading(false);
    }
  };

  const notificationTypes = [
    { value: 'info', label: 'Information' },
    { value: 'success', label: 'Success' },
    { value: 'warning', label: 'Warning' },
    { value: 'error', label: 'Error' }
  ];

  const topics = [
    { value: '', label: 'All Users' },
    { value: 'subscribed', label: 'Subscribed Users' },
    { value: 'premium', label: 'Premium Users' },
    { value: 'new', label: 'New Users' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">
              {isPush ? 'Send Push Notification' : 'Add New Notification'}
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-green-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {/* Basic Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-green-100 text-green-600 p-2 rounded-lg mr-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                Notification Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.title ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200`}
                    placeholder="Enter notification title"
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isPush ? 'Body' : 'Message'} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name={isPush ? 'body' : 'message'}
                    value={isPush ? formData.body : formData.message}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      isPush 
                        ? (errors.body ? 'border-red-500' : 'border-gray-300')
                        : (errors.message ? 'border-red-500' : 'border-gray-300')
                    } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200`}
                    placeholder={`Enter notification ${isPush ? 'body' : 'message'}`}
                  />
                  {isPush
                    ? errors.body && <p className="mt-1 text-sm text-red-500">{errors.body}</p>
                    : errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                  }
                </div>

                {!isPush && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notification Type
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    >
                      {notificationTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {isPush && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Topic
                    </label>
                    <select
                      name="topic"
                      value={formData.topic}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    >
                      {topics.map(topic => (
                        <option key={topic.value} value={topic.value}>
                          {topic.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {isPush && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sender
                    </label>
                    <input
                      type="text"
                      name="sender"
                      value={formData.sender}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="Sender name"
                    />
                  </div>
                )}

                {!isPush && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Read Status
                    </label>
                    <select
                      name="isRead"
                      value={formData.isRead.toString()}
                      onChange={(e) => setFormData({
                        ...formData,
                        isRead: e.target.value === 'true'
                      })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="false">Unread</option>
                      <option value="true">Read</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Options Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-emerald-100 text-emerald-600 p-2 rounded-lg mr-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </span>
                Additional Options
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isPush ? (
                  <>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image URL (Optional)
                      </label>
                      <input
                        type="url"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.imageUrl ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200`}
                        placeholder="https://example.com/image.jpg"
                      />
                      {errors.imageUrl && <p className="mt-1 text-sm text-red-500">{errors.imageUrl}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Click Action (Optional)
                      </label>
                      <input
                        type="text"
                        name="clickAction"
                        value={formData.clickAction}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.clickAction ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200`}
                        placeholder="https://example.com or /app/route"
                      />
                      {errors.clickAction && <p className="mt-1 text-sm text-red-500">{errors.clickAction}</p>}
                    </div>
                  </>
                ) : (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Link (Optional)
                    </label>
                    <input
                      type="url"
                      name="link"
                      value={formData.link}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.link ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200`}
                      placeholder="https://example.com"
                    />
                    {errors.link && <p className="mt-1 text-sm text-red-500">{errors.link}</p>}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isPush ? 'Sending...' : 'Adding...'}
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isPush ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    )}
                  </svg>
                  {isPush ? 'Send Notification' : 'Add Notification'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNotificationModal; 