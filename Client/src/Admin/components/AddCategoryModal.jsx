import React, { useState } from 'react';
import CategoryService from '../../services/CategoryService';

const AddCategoryModal = ({ onClose, onSubmit }) => {
  const [formValues, setFormValues] = useState({
    title: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  const [previewImage, setPreviewImage] = useState('');

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Handle file upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);

      setFormValues((prevValues) => ({
        ...prevValues,
        image: file,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(formValues).forEach((key) => {
        formData.append(key, formValues[key]);
      });

      await CategoryService.createCat(formData);
      alert("Category Added Successfully");
    } catch (error) {
      console.error("Failed to add category details", error);
      alert("Failed to add category details");
    }
  };
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative mx-auto p-8 w-full max-w-2xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Modal Header with Gradient */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white">Create New Category</h3>
              <button
                onClick={onClose}
                className="text-white hover:text-purple-200 transition-colors duration-150"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-6">
              {/* Category Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formValues.title}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 `}
                  placeholder="e.g., Technology, Health, Business"
                />
                {/* {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name}</p>} */}
              </div>



              {/* Icon URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Image
                </label>
                {/* <input
                  type="text"
                  name="icon"
                  value={formValues.icon}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="https://example.com/icon.svg"
                /> */}
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={handleFileChange}
                  required
                />
                <p>
                  
                  Supported formats: png, jpeg, jpg, webp
                </p>
                <div className="file-preview text-center">
                  <img id="uploadFile" src={previewImage} alt="Preview"  style={{ height: '100px', width: '100px', objectFit: 'contain' }} />
                </div>
              </div>


            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating...
                  </span>
                ) : (
                  'Create Category'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal; 