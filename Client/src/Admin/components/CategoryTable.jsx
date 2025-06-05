import React from 'react';

const CategoryTable = ({ categories, loading, onEdit, onDelete }) => {
  // console.log("categories", categories)
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-center items-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200"></div>
            <div className="absolute top-0 left-0 animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12">
        <div className="text-center">
          <div className="mx-auto h-24 w-24 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No categories yet</h3>
          <p className="text-gray-500 mb-6">Start organizing your content by creating your first category.</p>
          <button
            onClick={() => window.location.reload()}
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Refresh page
          </button>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    if (status === 'Active') {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-400 to-green-600 text-white shadow-sm">
          <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
          Active
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-sm">
        <span className="w-2 h-2 bg-white rounded-full mr-2 opacity-50"></span>
        Inactive
      </span>
    );
  };

  const getColorPreview = (color) => {
    return (
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-lg shadow-inner border-2 border-gray-200"
          style={{ backgroundColor: color || '#e5e7eb' }}
        ></div>
        <span className="text-sm text-gray-600 font-mono">{color || 'No color'}</span>
      </div>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Category
              </th>
              {/* <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Title
              </th> */}
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.map((category, index) => (
              <tr
                key={category._id}
                className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all duration-200 group"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 mr-4">
                      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${index % 4 === 0 ? 'from-purple-400 to-purple-600' :
                        index % 4 === 1 ? 'from-blue-400 to-blue-600' :
                          index % 4 === 2 ? 'from-pink-400 to-pink-600' :
                            'from-indigo-400 to-indigo-600'
                        } flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:shadow-lg transition-shadow duration-200`}>
                        {category.title ? category.title.charAt(0).toUpperCase() : 'C'}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        {category.title}
                      </div>

                    </div>
                  </div>
                </td>
                {/* <td className="px-6 py-4">
                  <div className="text-sm text-gray-600 max-w-xs truncate">
                    {category.title || 'No title'}
                  </div>
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={`http://localhost:3002/${category?.image}`}

                    alt=""
                    style={{ height: '70px', width: '70px', objectFit: 'contain' }}
                  />

                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(category.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(category.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(category)}
                    className="text-purple-600 hover:text-purple-800 mr-4 transition-colors duration-150 transform hover:scale-110"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDelete(category._id)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-150 transform hover:scale-110"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryTable; 