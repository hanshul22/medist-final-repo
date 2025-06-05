/** @jsx React.createElement */
import React, { createContext, useContext } from 'react';

// Import all services
import * as AuthService from '../services/AuthService';
import * as AdminService from '../services/AdminService';
import axiosInstance from '../services/AxiosInstance';
import * as BannerService from '../services/BannerService';
import BlogService from '../services/BlogServices';
import * as CategoryService from '../services/CategoryService';
import * as ContactServices from '../services/ContactServices';
import * as HealthService from '../services/healthService';
import httpService from '../services/httpService';
import * as NotificationService from '../services/NotificationService';
import * as PackageService from '../services/PackageService';
import * as PostsService from '../services/PostsService';
import * as TestimonialService from '../services/TestimonialService';
import * as UserService from '../services/UserService';

// Create the services context
const ServicesContext = createContext(null);

// Create the provider component
export const ServicesProvider = ({ children }) => {
  // Create an object with all services
  const services = {
    auth: AuthService,
    admin: AdminService,
    axiosInstance,
    banner: BannerService,
    blog: BlogService,
    category: CategoryService,
    contact: ContactServices,
    health: HealthService,
    http: httpService,
    notification: NotificationService,
    package: PackageService,
    posts: PostsService,
    testimonial: TestimonialService,
    user: UserService,
  };

  return React.createElement(
    ServicesContext.Provider,
    { value: services },
    children
  );
};

// Custom hook to use the services context
export const useServices = () => {
  const context = useContext(ServicesContext);
  if (context === null) {
    console.error('useServices must be used within a ServicesProvider');
    return {}; // Return empty object instead of throwing to prevent app crashes
  }
  return context;
};

// Individual service hooks for convenience
export const useAuthService = () => {
  const services = useServices();
  return services.auth || {};
};

export const useAdminService = () => {
  const services = useServices();
  return services.admin || {};
};

export const useAxiosInstance = () => {
  const services = useServices();
  return services.axiosInstance || {};
};

export const useBannerService = () => {
  const services = useServices();
  return services.banner || {};
};

export const useBlogServices = () => {
  const services = useServices();
  return services.blog || {};
};

export const useCategoryService = () => {
  const services = useServices();
  return services.category || {};
};

export const useContactServices = () => {
  const services = useServices();
  return services.contact || {};
};

export const useHealthService = () => {
  const services = useServices();
  return services.health || {};
};

export const useHttpService = () => {
  const services = useServices();
  return services.http || {};
};

export const useNotificationService = () => {
  const services = useServices();
  return services.notification || {};
};

export const usePackageService = () => {
  const services = useServices();
  return services.package || {};
};

export const usePostsService = () => {
  const services = useServices();
  return services.posts || {};
};

export const useTestimonialService = () => {
  const services = useServices();
  return services.testimonial || {};
};

export const useUserService = () => {
  const services = useServices();
  return services.user || {};
}; 