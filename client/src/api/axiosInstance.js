import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://e-commerce-app-u0il.onrender.com/api',
});

export default axiosInstance;