// src/api/axiosInstance.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';

const { logout } = useAuth();

const api = axios.create({
    baseURL: 'http://192.168.1.4:3000/api',
    timeout: 10000,
});

api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
api.interceptors.request.use(
    async (config) => {
        const authEndpoints = ['/auth/login', '/auth/register'];
        if (authEndpoints.some((endpoint) => config.url?.includes(endpoint))) {
            return config;
        }
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            console.warn('Token expirado o inválido');
            logout();
        }
        return Promise.reject(error);
    }
);

export default api;
