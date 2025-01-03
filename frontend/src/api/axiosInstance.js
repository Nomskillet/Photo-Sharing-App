import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001/api', // Use environment variable for production URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
