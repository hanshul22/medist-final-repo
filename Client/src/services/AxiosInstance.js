import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `https://react-course-b798e-default-rtdb.firebaseio.com/`,
});

axiosInstance.interceptors.request.use((config) => {
    try {
        // Get token from localStorage instead of store
        const userDetails = localStorage.getItem('userDetails');
        let token = null;
        
        if (userDetails) {
            const userData = JSON.parse(userDetails);
            token = userData.idToken || userData.token;
        }
        
        config.params = config.params || {};
        if (token) {
            config.params['auth'] = token;
        }
        return config;
    } catch (error) {
        console.error('Error in request interceptor:', error);
        return config;
    }
});

export default axiosInstance;
