import React, { useState, useEffect } from 'react';
import PackageService from '../../services/PackageService';
import CategoryServices from "../../services/CategoryService";
import HealthServices from "../../services/healthService";
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';


const EditPackageModal = ({ packageItem, onClose, onSubmit }) => {
  const [formValues, setFormValues] = useState({
    title: "",
    category: "",
    service: [],
    price: "",
    offerPrice: "",
    gender: "",
    age: "",
    reportTime: "",
    fastingTime: "",
    popular: "",
    include: [{ test: "", description: "" }],
  });
console.log("packageItem",packageItem)
  const [category, setCategory] = useState([]);
  const [service, setService] = useState([]);

  useEffect(() => {
    if (packageItem) {
      setFormValues({
        title: packageItem?.title || "",
        price: packageItem?.price || 0,
        offerPrice: packageItem?.offerPrice || 0,
        category: packageItem?.category?._id || "",
        gender: packageItem?.gender || "",
        age: packageItem?.age || "",
        reportTime: packageItem?.reportTime || "",
        fastingTime: packageItem?.fastingTime || "",
        popular: packageItem?.popular || "",
        service: packageItem?.service?.map((ser) => ser._id) || [], // ✅ Fixed
        include:
          packageItem.include?.map((inc) => ({
            test: inc.test || "",
            description: inc.description || "",
          })) || [{ test: "", description: "" }],
      });
    }
  }, [packageItem]);

  // Fetch Categories
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await CategoryServices.getCat();
        if (res.status) {
          setCategory(res.data);
        } else {
          alert("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Failed to fetch category", error);
        alert("Failed to fetch categories");
      }
    };
    fetchCategory();
  }, []);

  // Fetch Services
  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await HealthServices.getService();
        if (res.status) {
          setService(res.data);
        } else {
          alert("Failed to fetch services");
        }
      } catch (error) {
        console.error("Failed to fetch services", error);
        alert("Failed to fetch services");
      }
    };
    fetchService();
  }, []);

  // Handle Input Change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Handle Service Selection (Multiple Select)
  const handleServiceChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setFormValues({
      ...formValues,
      service: selectedOptions, // ✅ Fixed array handling
    });
  };

  // Handle Include Change
  const handleIncludeChange = (index, field, value) => {
    const updatedInclude = [...formValues.include];
    updatedInclude[index][field] = value;
    setFormValues({ ...formValues, include: updatedInclude });
  };

  // Add Include
  const addInclude = () => {
    setFormValues({
      ...formValues,
      include: [...formValues.include, { test: "", description: "" }],
    });
  };

  // Remove Include
  const removeInclude = (index) => {
    const updatedInclude = formValues.include.filter((_, i) => i !== index);
    setFormValues({
      ...formValues,
      include: updatedInclude.length ? updatedInclude : [{ test: "", description: "" }], // ✅ Ensure at least one
    });
  };

  // Handle Form Submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        ...formValues,
        service: formValues.service, // ✅ Fixed
      };

      await PackageService.updatePackage(packageItem.id, payload);
      alert("Package updated successfully");
      onClose();
    } catch (error) {
      console.error("Failed to update Package", error);
      alert("Failed to update Package");
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Edit Package</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-indigo-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            <div className="bg-purple-50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formValues.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    {category.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service
                  </label>
                  <select
                    name="service"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={formValues.service}
                    onChange={handleInputChange}
                    multiple
                    required
                  >
                    {service?.map((ser) => (
                      <option key={ser._id} value={ser._id}>
                        {ser.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Package Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formValues.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., Premium Health Package"
                  />
                </div>


              </div>
              {/* 
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description *
                      </label>
                      <textarea
                        name="description"
                        value={formValues.description}
                        onChange={handleInputChange}
                        required
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Describe what this package includes..."
                      />
                    </div> */}
            </div>

            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Pricing Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">$</span>
                    <input
                      type="number"
                      name="price"
                      value={formValues.price}
                      onChange={handleInputChange}
                      required
                      step="0.01"
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="99.99"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Original Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">$</span>
                    <input
                      type="number"
                      name="offerPrice"
                      value={formValues.offerPrice}
                      onChange={handleInputChange}
                      step="0.01"
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="149.99"
                    />
                  </div>
                </div>

              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Other Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age Group
                  </label>
                  <input
                    type="text"
                    name="age"
                    value={formValues.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="New age group"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reporting Time
                  </label>
                  <input
                    type="text"
                    name="reportTime"
                    value={formValues.reportTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="New reportTime"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={formValues.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Both">Both</option>
                    <option value="Other">Other</option>

                  </select>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Package Features</h3>
              <div className="space-y-3">
                {formValues.include.map((inc, index) => (
                  <div className="row mb-4" key={index}>
                    <div className="col-lg-12 col-md-12">
                      <div className="input-field">
                        <label>Test</label>
                        <input
                          type="text"
                          className="form-control"
                          value={inc.test}
                          onChange={(e) => handleIncludeChange(index, 'test', e.target.value)}
                          placeholder="Enter Test"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                      <div className="input-field">
                        <label>Description</label>

                        <ReactQuill
                          theme="snow"
                          value={inc.description}
                          onChange={(value) => handleIncludeChange(index, 'description', value)}  // Fix applied here
                          placeholder="Enter Description"
                          required
                        />

                      </div>
                    </div>
                    <div className="col-md-2 d-flex align-items-center" style={{ marginTop: "10px" }}>
                      <button
                        type="button"
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        onClick={() => removeInclude(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                <button type="button" className="mt-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-2" onClick={addInclude}>
                  Add More
                </button>
                {/* {formValues.features.map((feature, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => handleFeatureChange(index, e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Enter a feature"
                          />
                          {formValues.features.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeFeature(index)}
                              className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                      ))} */}
                {/* <button
                        type="button"
                        onClick={addFeature}
                        className="mt-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Feature
                      </button> */}
              </div>
            </div>

            <div className="bg-orange-50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-orange-900 mb-4">Additional Options</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="popular"
                    checked={!!formValues.popular} // Ensure boolean value
                    onChange={(e) =>
                      setFormValues({ ...formValues, popular: e.target.checked })
                    }
                    id="isPopular"

                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isPopular" className="ml-2 text-sm text-gray-700">
                    Mark as Popular Package
                  </label>
                </div>

                {/* <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Status
                        </label>
                        <select
                          name="status"
                          value={formValues.status}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="draft">Draft</option>
                        </select>
                      </div>
      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Image URL
                        </label>
                        <input
                          type="text"
                          name="image"
                          value={formValues.image}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="https://example.com/image.jpg"
                        />
                      </div> */}
              </div>
            </div>
          </div>


          {/* Form Actions */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors shadow-md"
            >
              Create Package
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPackageModal; 