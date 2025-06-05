# Services Context API

This module provides a global store for all service instances using React's Context API. It allows easy access to all API services throughout your application without prop drilling.

## Setup

The `ServicesProvider` is already set up in the main `App.jsx` file, wrapping the entire application. This means all services are available throughout your component tree.

## How to Use Services

### 1. Using the General Services Hook

You can access all services with the `useServices` hook:

```jsx
import { useServices } from '../context';

function MyComponent() {
  const services = useServices();
  
  // Now you can access any service
  const handleLogin = async () => {
    try {
      const response = await services.auth.login('email@example.com', 'password');
      // Handle response
    } catch (error) {
      // Handle error
    }
  };
  
  return (
    // Your component JSX
  );
}
```

### 2. Using Individual Service Hooks

For better code organization and type safety, you can use the individual service hooks:

```jsx
import { useAuthService, useUserService } from '../context';

function UserProfile() {
  const authService = useAuthService();
  const userService = useUserService();
  
  const fetchUserProfile = async () => {
    try {
      const userData = await userService.getUserProfile();
      // Handle user data
    } catch (error) {
      // Handle error
    }
  };
  
  return (
    // Your component JSX
  );
}
```

## Available Services

The following services are available through the context:

- `auth`: Authentication services (login, signup, etc.)
- `admin`: Admin-related services
- `axiosInstance`: Configured Axios instance
- `banner`: Banner management services
- `blog`: Blog post services
- `category`: Category management services
- `contact`: Contact form services
- `health`: Health-related services
- `http`: HTTP request utilities
- `notification`: Notification services
- `package`: Package management services
- `posts`: Post management services
- `testimonial`: Testimonial services
- `user`: User management services

## Example Usage

See the `examples/ServiceUsageExample.jsx` file for a complete example of how to use the services context.

## Benefits

- **Simplified API Access**: No need to import service files directly in each component
- **Consistent Service Usage**: All services are accessed the same way
- **Testability**: Easy to mock services for testing
- **Centralized Configuration**: Service configuration is managed in one place
- **Type Safety**: Each service has its own dedicated hook 