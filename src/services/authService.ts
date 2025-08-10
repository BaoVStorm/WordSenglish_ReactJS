// authService.js
import axios from 'axios';

export let accessToken: any = localStorage.getItem('accessToken');
export let refreshToken: any = localStorage.getItem('refreshToken');

// Set base Axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API, // Your backend URL
});

// Set Authorization header for every request
api.interceptors.request.use((config) => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

// Handle expired access token automatically
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && refreshToken && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Call refresh endpoint
                const res = await api.post('/api/auth/refresh', { refreshToken });

                // Save new token
                accessToken = res.data.accessToken;

                // Retry failed request
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return api(originalRequest);
            } catch (err) {
                console.error('Refresh token expired or invalid');
                logout();
            }
        }

        return Promise.reject(error);
    },
);

export const login = async (username: string, password: string) => {
    try {
        const res = await api.post('/api/auth/login', { username, password });

        accessToken = res.data.accessToken;
        refreshToken = res.data.refreshToken;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        // console.log(res.data);

        return res.data;
    } catch (err: any) {
        // Get backend error message if available
        const message =
            err.response?.data?.msg || // your backend's "msg"
            err.response?.data?.message || // fallback if backend uses "message"
            err.message || // network or Axios error
            'Unknown error occurred';

        // Re-throw with a clean message
        throw new Error(message);
    }
};

export const register = async (username: string, password: string) => {
    try {
        const res = await api.post('/api/auth/register', { username, password });

        accessToken = res.data.accessToken;
        refreshToken = res.data.refreshToken;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        // console.log(res.data);

        return res.data;
    } catch (err: any) {
        // Get backend error message if available
        const message =
            err.response?.data?.msg || // your backend's "msg"
            err.response?.data?.message || // fallback if backend uses "message"
            err.message || // network or Axios error
            'Unknown error occurred';

        // Re-throw with a clean message
        throw new Error(message);
    }
};

export const logout = () => {
    accessToken = null;
    refreshToken = null;
    localStorage.removeItem('refreshToken');
};

export const getProfile = async () => {
    const res = await api.get('/api/auth/profile');
    return res.data;
};

