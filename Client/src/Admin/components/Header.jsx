import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = ({ onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  // Get the page title based on the current path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/admin/dashboard')) return 'Dashboard';
    if (path.includes('/admin/users')) return 'User Management';
    if (path.includes('/admin/posts')) return 'Blog Posts';
    if (path.includes('/admin/categories')) return 'Categories';
    if (path.includes('/admin/appointments')) return 'Appointments';
    if (path.includes('/admin/testimonials')) return 'Testimonial Management';
    if (path.includes('/admin/banners')) return 'Banners';
    if (path.includes('/admin/packages')) return 'Packages';
    if (path.includes('/admin/contacts')) return 'Contact Management';
    if (path.includes('/admin/health-services')) return 'Health Services';
    if (path.includes('/admin/notifications')) return 'Notification Management';
    if (path.includes('/admin/profile')) return 'Profile';
    if (path.includes('/admin/settings')) return 'Settings';
    return 'Admin Panel';
  };

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex justify-between items-center px-4 py-3 md:px-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">{getPageTitle()}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            className="p-1 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            aria-label="Notifications"
          >
            <span className="sr-only">View notifications</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          
          <div className="relative">
            <div>
              <button
                className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User avatar"
                />
              </button>
            </div>
            
            {dropdownOpen && (
              <div 
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"
                onClick={() => setDropdownOpen(false)}
              >
                <div className="py-1 bg-white rounded-md shadow-xs">
                  <div className="block px-4 py-2 text-sm text-gray-700 border-b">
                    <p className="font-medium">Admin User</p>
                    <p className="text-sm text-gray-500">admin@example.com</p>
                  </div>
                  
                  <Link
                    to="/admin/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </Link>
                  
                
                  
                  <button
                    onClick={onLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 