import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001/api', // Adjust the baseURL to your backend server
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
