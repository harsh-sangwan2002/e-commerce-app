import axiosInstance from './axiosInstance';

export const loginUser = async ({ email, password }) => {
    console.log(email, password);
    const response = await axiosInstance.post('/users/login', { email, password });
    return response.data;
};

export const registerUser = async ({ name, email, password, role = 'user' }) => {
    const response = await axiosInstance.post('/users/register', { name, email, password, role });
    return response.data;
};