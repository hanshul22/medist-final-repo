import React, { useState, useEffect } from 'react';
import { useAuthService, useBlogServices, useHttpService } from '../context';

const ServiceUsageExample = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Access services via hooks
  const authService = useAuthService();
  const blogService = useBlogServices();
  const httpService = useHttpService();
  
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        // Check if the method exists before calling it
        if (blogService && typeof blogService.getWebBlog === 'function') {
          const response = await blogService.getWebBlog();
          if (response && response.data) {
            setBlogs(response.data);
            setError(null);
          }
        } else {
          console.error('getWebBlog method not found in blogService');
          setError('Blog service not available');
        }
      } catch (err) {
        setError('Failed to fetch blogs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogs();
  }, [blogService]);
  
  const handleLogin = async (email, password) => {
    try {
      // Check if the method exists before calling it
      if (authService && typeof authService.login === 'function') {
        const response = await authService.login(email, password);
        if (response && response.data && response.data.token) {
          // Save token
          localStorage.setItem('authToken', response.data.token);
          return true;
        }
      } else {
        console.error('login method not found in authService');
        return false;
      }
    } catch (err) {
      console.error('Login failed:', err);
      return false;
    }
    return false;
  };
  
  // Just an example of a custom API call using httpService
  const customApiCall = async (endpoint, data) => {
    try {
      if (httpService && typeof httpService.post === 'function') {
        return await httpService.post(endpoint, data);
      } else {
        console.error('post method not found in httpService');
        throw new Error('HTTP service not available');
      }
    } catch (err) {
      console.error('API call failed:', err);
      throw err;
    }
  };
  
  return (
    <div className="service-example">
      <h2>Blog Posts Example</h2>
      
      {loading && <p>Loading blogs...</p>}
      {error && <p className="error">{error}</p>}
      
      <ul>
        {blogs && blogs.length > 0 ? (
          blogs.map((blog, index) => (
            <li key={blog.id || index}>{blog.title}</li>
          ))
        ) : (
          <li>No blogs found</li>
        )}
      </ul>
      
      {/* Login form example */}
      <h3>Login Example</h3>
      <form onSubmit={(e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        handleLogin(email, password);
      }}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default ServiceUsageExample; 