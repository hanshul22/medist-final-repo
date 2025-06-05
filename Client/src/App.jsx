import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Blogs from './pages/Blogs';
import AppointmentPage from './pages/AppointmentPage';
import { AdminDashboard, AdminLogin, AdminProfile, ManageUsers, ManageBlogs, ManageBanners, ManagePackages, ManageCategories, ManageContacts, ManageHealthServices, ManageNotifications, ManageTestimonials } from './Admin';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { ServicesProvider } from './context/index';

function App() {
  return (
    <ServicesProvider>
      <Routes>
        <Route path="/admin_login" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/admin/profile" 
          element={
            <ProtectedRoute>
              <AdminProfile />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute>
              <ManageUsers />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/admin/blogs" 
          element={
            <ProtectedRoute>
              <ManageBlogs />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/admin/categories" 
          element={
            <ProtectedRoute>
              <ManageCategories />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/admin/banners" 
          element={
            <ProtectedRoute>
              <ManageBanners />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/admin/packages" 
          element={
            <ProtectedRoute>
              <ManagePackages />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/admin/contacts" 
          element={
            <ProtectedRoute>
              <ManageContacts />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/admin/health-services" 
          element={
            <ProtectedRoute>
              <ManageHealthServices />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/admin/notifications" 
          element={
            <ProtectedRoute>
              <ManageNotifications />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/admin/testimonials" 
          element={
            <ProtectedRoute>
              <ManageTestimonials />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="appoint_booking" element={<AppointmentPage />} />
        </Route>
      </Routes>
    </ServicesProvider>
  );
}

export default App;